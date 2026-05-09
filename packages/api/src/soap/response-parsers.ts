import * as v from 'valibot';
import { DOMParser } from '@xmldom/xmldom';
import type {
  SIFENRecepLoteDEResponse,
  SIFENConsRUCResponse,
  SIFENConsultaResponse,
  SIFENConsultaLoteResponse,
  SIFENRecibeResponse,
  SIFENEventoResponse
} from '../sifen/types/api';
import { Err, Ok, type Result } from '../result';
import { SifenError } from './sifen-error';

/**
 * node-soap deserializa elementos XML con ocurrencia 0-n como un objeto
 * cuando hay un solo elemento. Esta funcion normaliza el valor a siempre Array.
 */
function ensureArray<T>(value: unknown): T[] {
  if (!value) return [];
  return Array.isArray(value) ? (value as T[]) : [value as T];
}

const SUCCESS_RECIBE_LOTE = '0300';
const SUCCESS_CONSULTA_RUC = '0502';
const SUCCESS_CONSULTA_DE = '0422';
const SUCCESS_CONSULTA_LOTE = '0362';
const SUCCESS_RECIBE = 'Aprobado';

const SOAP_ENV_NS_12 = 'http://www.w3.org/2003/05/soap-envelope';
const SOAP_ENV_NS_11 = 'http://schemas.xmlsoap.org/soap/envelope/';
const SIFEN_XSD_NS = 'http://ekuatia.set.gov.py/sifen/xsd';

function fail(raw: unknown, details: string, cause?: unknown): SifenError {
  if (raw instanceof SifenError) return raw;
  return new SifenError({ details, rawObject: raw, cause });
}

function failSifen(sifenCodigo: string, sifenMessage: string, raw: unknown): SifenError {
  return new SifenError({
    sifenCodigo,
    sifenMessage,
    details: `SIFEN rechazo codigo ${sifenCodigo}`,
    rawObject: raw
  });
}

// ---- rRetEnviDe (rechazo genérico de SIFEN) ----

const retEnviDeRejectionSchema = v.object({
  dFecProc: v.optional(v.string()),
  dEstRes: v.optional(v.string()),
  gResProc: v.optional(
    v.array(
      v.object({
        dCodRes: v.string(),
        dMsgRes: v.string()
      })
    )
  )
});

function getElementText(parent: Element, ns: string, localName: string): string | undefined {
  const elements = parent.getElementsByTagNameNS(ns, localName);
  const el = elements[0];
  if (!el) return undefined;
  return el.textContent?.trim() || undefined;
}

function parseRetEnviDe(raw: unknown): v.InferOutput<typeof retEnviDeRejectionSchema> | null {
  if (typeof raw !== 'string') return null;

  let doc: Document;
  try {
    doc = new DOMParser().parseFromString(raw, 'text/xml');
  } catch {
    return null;
  }

  const body =
    doc.getElementsByTagNameNS(SOAP_ENV_NS_12, 'Body')[0] ??
    doc.getElementsByTagNameNS(SOAP_ENV_NS_11, 'Body')[0];
  if (!body) return null;

  const retEnviDe = body.getElementsByTagNameNS(SIFEN_XSD_NS, 'rRetEnviDe')[0];
  if (!retEnviDe) return null;

  const rProtDe = retEnviDe.getElementsByTagNameNS(SIFEN_XSD_NS, 'rProtDe')[0];
  if (!rProtDe) return null;

  const gResProcElements = rProtDe.getElementsByTagNameNS(SIFEN_XSD_NS, 'gResProc');
  const gResProc: Array<{ dCodRes: string; dMsgRes: string }> = [];
  for (let i = 0; i < gResProcElements.length; i++) {
    const el = gResProcElements[i];
    if (!el) continue;
    const dCodRes = getElementText(el, SIFEN_XSD_NS, 'dCodRes');
    const dMsgRes = getElementText(el, SIFEN_XSD_NS, 'dMsgRes');
    if (dCodRes && dMsgRes) {
      gResProc.push({ dCodRes, dMsgRes });
    }
  }

  const extracted = {
    dFecProc: getElementText(rProtDe, SIFEN_XSD_NS, 'dFecProc') || undefined,
    dEstRes: getElementText(rProtDe, SIFEN_XSD_NS, 'dEstRes') || undefined,
    gResProc: gResProc.length > 0 ? gResProc : undefined
  };

  const parsed = v.safeParse(retEnviDeRejectionSchema, extracted);
  return parsed.success ? parsed.output : null;
}

/**
 * Aplica `responseParser` a `parsed` si el valor fue deserializado correctamente
 * por el cliente SOAP. Si `parsed` es undefined o null, intenta extraer la
 * respuesta genérica de rechazo rRetEnviDe desde el XML crudo (`raw`) y
 * devuelve un SifenError con los códigos de SIFEN. Si incluso eso falla,
 * devuelve un error genérico incluyendo `raw` como rawObject para depuración.
 */
export function parseSIFENResponse<T>(
  parsed: unknown,
  raw: unknown,
  responseParser: (p: unknown) => Result<T, SifenError>
): Result<T, SifenError> {
  if (parsed !== undefined && parsed !== null) {
    return responseParser(parsed);
  }

  const rejection = parseRetEnviDe(raw);
  if (rejection) {
    const firstError = rejection.gResProc?.[0];
    const sifenCodigo = firstError?.dCodRes;
    const sifenMessage = firstError?.dMsgRes ?? rejection.dEstRes;
    const info = rejection.dEstRes
      ? [rejection.dEstRes, sifenCodigo, firstError?.dMsgRes].filter(Boolean).join(' — ')
      : sifenCodigo
        ? `${sifenCodigo} — ${sifenMessage ?? ''}`
        : '';
    return Err(
      new SifenError({
        sifenCodigo,
        sifenMessage,
        details: `SIFEN ${info || 'rechazó la solicitud sin detalles adicionales'}.`,
        rawObject: raw
      })
    );
  }

  return Err(
    new SifenError({
      details: 'El servicio SOAP no devolvió la estructura esperada.',
      rawObject: raw
    })
  );
}

// ---- recibeLote ----

const recibeLoteSchema = v.object({
  dFecProc: v.string(),
  dCodRes: v.string(),
  dMsgRes: v.string(),
  dProtConsLote: v.optional(v.string()),
  dTpoProces: v.optional(v.pipe(v.union([v.string(), v.number()]), v.toNumber()))
});

export function parseRecibeLote(raw: unknown): Result<SIFENRecepLoteDEResponse, SifenError> {
  const parsed = v.safeParse(recibeLoteSchema, raw);
  if (!parsed.success) return Err(fail(raw, v.summarize(parsed.issues)));

  const r = parsed.output;
  if (r.dCodRes !== SUCCESS_RECIBE_LOTE) {
    return Err(failSifen(r.dCodRes, r.dMsgRes, raw));
  }

  return Ok({
    fechaProcesamiento: new Date(r.dFecProc),
    codigoResultado: r.dCodRes,
    mensajeResultado: r.dMsgRes,
    numeroLote: r.dProtConsLote ? Number(r.dProtConsLote) : undefined,
    tiempoProcesamiento: r.dTpoProces ?? 0
  });
}

// ---- consultaRuc ----

const consultaRucSchema = v.object({
  dCodRes: v.string(),
  dMsgRes: v.string()
});

const contenedorRucSchema = v.object({
  dRUCCons: v.string(),
  dRazCons: v.string(),
  dCodEstCons: v.string(),
  dDesEstCons: v.string(),
  dRUCFactElec: v.string()
});

export function parseConsultaRuc(raw: unknown): Result<SIFENConsRUCResponse, SifenError> {
  const parsed = v.safeParse(consultaRucSchema, raw);
  if (!parsed.success) return Err(fail(raw, v.summarize(parsed.issues)));

  const r = parsed.output;
  if (r.dCodRes !== SUCCESS_CONSULTA_RUC) {
    return Err(failSifen(r.dCodRes, r.dMsgRes, raw));
  }

  const resp: SIFENConsRUCResponse = {
    codigoResultado: r.dCodRes,
    mensajeResultado: r.dMsgRes
  };

  const withContainer = raw as { xContRUC?: unknown };
  const containerResult = v.safeParse(contenedorRucSchema, withContainer.xContRUC);
  if (containerResult.success) {
    const c = containerResult.output;
    resp.contenedorRuc = {
      rucConsultado: c.dRUCCons,
      razonSocial: c.dRazCons,
      codigoEstado: c.dCodEstCons,
      descripcionEstado: c.dDesEstCons,
      esFacturadorElectronico: c.dRUCFactElec
    };
  }

  return Ok(resp);
}

// ---- consulta DE ----

const consultaDESchema = v.object({
  dCodRes: v.string(),
  dMsgRes: v.string()
});

export function parseConsultaDE(raw: unknown): Result<SIFENConsultaResponse, SifenError> {
  const parsed = v.safeParse(consultaDESchema, raw);
  if (!parsed.success) return Err(fail(raw, v.summarize(parsed.issues)));

  const r = parsed.output;
  if (r.dCodRes !== SUCCESS_CONSULTA_DE) {
    return Err(failSifen(r.dCodRes, r.dMsgRes, raw));
  }

  const withExtra = raw as { dFecProc?: string; xContenDE?: string };
  return Ok({
    codigoResultado: r.dCodRes,
    mensajeResultado: r.dMsgRes,
    fechaProcesamiento: withExtra.dFecProc ? new Date(withExtra.dFecProc) : undefined,
    xmlDE: withExtra.xContenDE
  });
}

// ---- consultaLote ----

const consultaLoteSchema = v.object({
  dCodResLot: v.string(),
  dMsgResLot: v.string()
});

const gResProcSchema = v.object({
  dCodRes: v.string(),
  dMsgRes: v.string()
});

const gResProcLoteSchema = v.object({
  id: v.string(),
  dEstRes: v.string(),
  dProtAut: v.optional(v.string()),
  gResProc: v.optional(v.array(gResProcSchema))
});

export function parseConsultaLote(raw: unknown): Result<SIFENConsultaLoteResponse, SifenError> {
  const parsed = v.safeParse(consultaLoteSchema, raw);
  if (!parsed.success) return Err(fail(raw, v.summarize(parsed.issues)));

  const r = parsed.output;
  if (r.dCodResLot !== SUCCESS_CONSULTA_LOTE) {
    return Err(failSifen(r.dCodResLot, r.dMsgResLot, raw));
  }

  const withExtra = raw as { dFecProc?: string; gResProcLote?: unknown };
  const resultados = ensureArray<Record<string, unknown>>(withExtra.gResProcLote)
    .map((rawItem) => {
      const gResProc = ensureArray<v.InferInput<typeof gResProcSchema>>(rawItem.gResProc);
      const i = v.safeParse(gResProcLoteSchema, {
        ...rawItem,
        gResProc: gResProc.length ? gResProc : undefined
      });
      if (!i.success) return null;
      const vv = i.output;
      return {
        cdc: vv.id,
        estado: vv.dEstRes,
        numeroTransaccion: vv.dProtAut,
        validaciones: (vv.gResProc ?? []).map((p) => ({ codigo: p.dCodRes, mensaje: p.dMsgRes }))
      };
    })
    .filter(Boolean) as SIFENConsultaLoteResponse['resultados'];

  return Ok({
    codigoResultado: r.dCodResLot,
    mensajeResultado: r.dMsgResLot,
    fechaProcesamiento: withExtra.dFecProc ? new Date(withExtra.dFecProc) : undefined,
    resultados
  });
}

// ---- recibe (sync) ----

const recibeSchema = v.object({
  Id: v.optional(v.string()),
  dFecProc: v.string(),
  dEstRes: v.string(),
  dProtAut: v.optional(v.number()),
  gResProc: v.optional(v.array(gResProcSchema))
});

export function parseRecibe(raw: unknown): Result<SIFENRecibeResponse, SifenError> {
  const root = raw as { rProtDe?: Record<string, unknown> };
  const rprot = root.rProtDe;
  if (!rprot) return Err(fail(raw, 'rProtDe no encontrado en la respuesta.'));

  const gResProc = ensureArray<v.InferInput<typeof gResProcSchema>>(rprot.gResProc);
  const parsed = v.safeParse(recibeSchema, {
    ...rprot,
    gResProc: gResProc.length ? gResProc : undefined
  });
  if (!parsed.success) return Err(fail(raw, v.summarize(parsed.issues)));

  const r = parsed.output;
  if (r.dEstRes !== SUCCESS_RECIBE && r.dEstRes !== 'Aprobado con observación') {
    const firstError = r.gResProc?.[0];
    return Err(failSifen(firstError?.dCodRes ?? '0000', firstError?.dMsgRes ?? r.dEstRes, raw));
  }

  return Ok({
    cdc: r.Id!,
    estado: r.dEstRes,
    numeroTransaccion: r.dProtAut,
    fechaProcesamiento: new Date(r.dFecProc),
    validaciones: (r.gResProc ?? []).map((p) => ({ codigo: p.dCodRes, mensaje: p.dMsgRes }))
  });
}

// ---- evento ----

const gResProcEVeSchema = v.object({
  id: v.string(),
  dEstRes: v.string(),
  dProtAut: v.optional(v.number()),
  gResProc: v.optional(v.array(gResProcSchema))
});

export function parseEvento(raw: unknown): Result<SIFENEventoResponse, SifenError> {
  const withExtra = raw as { dFecProc?: string; gResProcEVe?: unknown };
  const gResProcEVe = ensureArray<Record<string, unknown>>(withExtra.gResProcEVe);
  if (gResProcEVe.length === 0) {
    return Err(fail(raw, 'Respuesta de evento sin resultados.'));
  }

  const resultados = gResProcEVe
    .map((rawItem) => {
      const gResProc = ensureArray<v.InferInput<typeof gResProcSchema>>(rawItem.gResProc);
      const i = v.safeParse(gResProcEVeSchema, {
        ...rawItem,
        gResProc: gResProc.length ? gResProc : undefined
      });
      if (!i.success) return null;
      const vv = i.output;
      return {
        id: vv.id,
        estado: vv.dEstRes,
        numeroTransaccion: vv.dProtAut,
        validaciones: (vv.gResProc ?? []).map((p) => ({ codigo: p.dCodRes, mensaje: p.dMsgRes }))
      };
    })
    .filter(Boolean) as SIFENEventoResponse['resultados'];

  const allOk = resultados.every((r) => r.estado.startsWith('Aprobado'));
  if (!allOk) {
    const firstFail = resultados.find((r) => !r.estado.startsWith('Aprobado'));
    return Err(
      failSifen(
        firstFail?.validaciones?.[0]?.codigo ?? '0000',
        firstFail?.validaciones?.[0]?.mensaje ?? firstFail?.estado ?? 'Error desconocido',
        raw
      )
    );
  }

  return Ok({
    fechaProcesamiento: withExtra.dFecProc ? new Date(withExtra.dFecProc) : undefined,
    resultados
  });
}
