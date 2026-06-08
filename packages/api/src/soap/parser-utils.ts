import * as v from 'valibot';
import { DOMParser } from '@xmldom/xmldom';
import { Err, type Result } from '../result';
import { SifenError } from './sifen-error';

/**
 * node-soap deserializa elementos XML con ocurrencia 0-n como un objeto
 * cuando hay un solo elemento. Esta funcion normaliza el valor a siempre Array.
 */
export function ensureArray<T>(value: unknown): T[] {
  if (!value) return [];
  return Array.isArray(value) ? (value as T[]) : [value as T];
}

export const gResProcSchema = v.object({
  dCodRes: v.string(),
  dMsgRes: v.string()
});

const SOAP_ENV_NS_12 = 'http://www.w3.org/2003/05/soap-envelope';
const SOAP_ENV_NS_11 = 'http://schemas.xmlsoap.org/soap/envelope/';
const SIFEN_XSD_NS = 'http://ekuatia.set.gov.py/sifen/xsd';

/**
 * Crea un SifenError para fallas locales al interpretar la respuesta.
 *
 * Usar cuando no hay un codigo de rechazo de SIFEN: XML SOAP inesperado,
 * respuesta deserializada con otra forma, validacion Valibot fallida, o error
 * de un parser interno. Conserva `raw` para depuracion y `cause` si existe,
 * pero deja `sifenCodigo` sin definir para que `isSifenRejection` sea false.
 */
export function fail(raw: unknown, details: string, cause?: unknown): SifenError {
  if (raw instanceof SifenError) return raw;
  return new SifenError({ details, rawObject: raw, cause });
}

/**
 * Crea un SifenError para rechazos reportados por SIFEN.
 *
 * Usar cuando la respuesta tiene una estructura valida pero dCodRes/dEstRes o
 * gResProc indican rechazo: el servicio entendio la solicitud y devolvio un
 * codigo/mensaje de negocio. Completa `sifenCodigo` y `sifenMessage`, por lo
 * que `isSifenRejection` es true y el mensaje principal del error es el texto
 * devuelto por SIFEN.
 */
export function failSifen(sifenCodigo: string, sifenMessage: string, raw: unknown): SifenError {
  return new SifenError({
    sifenCodigo,
    sifenMessage,
    details: `SIFEN rechazo codigo ${sifenCodigo}`,
    rawObject: raw
  });
}

const retEnviDeRejectionSchema = v.object({
  dFecProc: v.optional(v.string()),
  dEstRes: v.optional(v.string()),
  gResProc: v.optional(v.array(gResProcSchema))
});

function getElementText(parent: Element, ns: string, localName: string): string | undefined {
  const elements = parent.getElementsByTagNameNS(ns, localName);
  const el = elements[0];
  if (!el) return undefined;
  return el.textContent?.trim() || undefined;
}

/**
 * Extrae el rechazo generico rRetEnviDe desde el XML SOAP crudo.
 *
 * El WSDL de cada servicio declara su propio elemento de respuesta, excepto
 * siRecepDE que declara rRetEnviDe. En la practica SIFEN puede devolver
 * rRetEnviDe tambien desde otros endpoints cuando rechaza el request antes de
 * llegar al parser especifico del servicio, por ejemplo por XML mal formado o
 * por invocar un endpoint con el payload de otro servicio. En esos casos
 * node-soap no puede mapear la respuesta al tipo esperado y `parsed` llega como
 * undefined/null, pero el XML crudo todavia contiene dCodRes/dMsgRes utiles.
 */
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
 * respuesta generica de rechazo rRetEnviDe desde el XML crudo (`raw`) y
 * devuelve un SifenError con los codigos de SIFEN. Si incluso eso falla,
 * devuelve un error generico incluyendo `raw` como rawObject para depuracion.
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
