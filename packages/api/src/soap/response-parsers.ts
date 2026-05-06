import * as v from 'valibot';
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

const SUCCESS_RECIBE_LOTE = '0300';
const SUCCESS_CONSULTA_RUC = '0502';
const SUCCESS_CONSULTA_DE = '0422';
const SUCCESS_CONSULTA_LOTE = '0362';
const SUCCESS_RECIBE = 'Aprobado';

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

// ---- recibeLote ----

const recibeLoteSchema = v.object({
  dFecProc: v.string(),
  dCodRes: v.string(),
  dMsgRes: v.string(),
  dProtConsLote: v.optional(v.string()),
  dTpoProces: v.optional(v.number())
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

  const withExtra = raw as { dFecProc?: string; gResProcLote?: Array<unknown> };
  const resultados = (withExtra.gResProcLote ?? [])
    .map((item) => {
      const i = v.safeParse(gResProcLoteSchema, item);
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
  Id: v.string(),
  dFecProc: v.string(),
  dEstRes: v.string(),
  dProtAut: v.optional(v.number()),
  gResProc: v.optional(v.array(gResProcSchema))
});

export function parseRecibe(raw: unknown): Result<SIFENRecibeResponse, SifenError> {
  const root = raw as { rProtDe?: unknown };
  const parsed = v.safeParse(recibeSchema, root.rProtDe);
  if (!parsed.success) return Err(fail(raw, v.summarize(parsed.issues)));

  const r = parsed.output;
  if (r.dEstRes !== SUCCESS_RECIBE && r.dEstRes !== 'Aprobado con observación') {
    const firstError = r.gResProc?.[0];
    return Err(failSifen(firstError?.dCodRes ?? '0000', firstError?.dMsgRes ?? r.dEstRes, raw));
  }

  return Ok({
    cdc: r.Id,
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
  const withExtra = raw as { dFecProc?: string; gResProcEVe?: Array<unknown> };
  const eves = withExtra.gResProcEVe ?? [];
  if (eves.length === 0) {
    return Err(fail(raw, 'Respuesta de evento sin resultados.'));
  }

  const resultados = eves
    .map((item) => {
      const i = v.safeParse(gResProcEVeSchema, item);
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
