import { DOMParser, XMLSerializer } from '@xmldom/xmldom';
import crypto from 'crypto';
import { Err, Ok, type Result } from '../result';
import { ErrorFactory } from '@praha/error-factory';

export class QRGenError extends ErrorFactory({
  name: 'QRGenError',
  message: (f) => f.details ?? 'Fallo al generar QR.',
  fields: ErrorFactory.fields<{ details?: string }>()
}) {}

interface ReceptorQR {
  paramName: 'dRucRec' | 'dNumIDRec';
  value: string;
}

interface QRData {
  cdc: string;
  fechaEmision: string;
  receptor: ReceptorQR;
  totalOperacion: string;
  totalIVA: string;
  cantidadItems: number;
  digestValue: string;
}

const BASE_URLS = {
  prod: 'https://ekuatia.set.gov.py/consultas/qr',
  test: 'https://ekuatia.set.gov.py/consultas-test/qr'
} as const;

const toHex = (s: string) => Buffer.from(s).toString('hex');
const sha256 = (s: string) => crypto.createHash('sha256').update(s, 'utf8').digest('hex');

/** Lee el contenido de texto del primer elemento que coincida con `tag`. */
function text(doc: Document, tag: string, required = true): string {
  const el = doc.getElementsByTagName(tag)[0];
  const value = el?.textContent?.trim() ?? '';
  if (!value && required) throw new Error(`Elemento requerido <${tag}> no encontrado o vacio.`);
  return value;
}

function extractQRData(doc: Document): QRData {
  const deElement = doc.getElementsByTagName('DE')[0];
  if (!deElement) throw new Error('Elemento DE no encontrado.');

  const cdc = deElement.getAttribute('Id');
  if (!cdc) throw new Error('CDC no encontrado en elemento DE.');

  let dvElements = doc.getElementsByTagNameNS('http://www.w3.org/2000/09/xmldsig#', 'DigestValue');
  if (!dvElements.length) dvElements = doc.getElementsByTagName('DigestValue');

  const digestValue = dvElements[0]?.textContent?.trim();
  if (!digestValue) throw new Error('DigestValue no encontrado o vacio en XML firmado.');

  const iNatRec = text(doc, 'iNatRec', false);
  const receptor: ReceptorQR =
    iNatRec === '1'
      ? { paramName: 'dRucRec', value: text(doc, 'dRucRec', false) || '0' }
      : { paramName: 'dNumIDRec', value: text(doc, 'dNumIDRec', false) || '0' };

  return {
    cdc,
    fechaEmision: text(doc, 'dFeEmiDE'),
    receptor,
    totalOperacion: text(doc, 'dTotGralOpe', false) || '0',
    totalIVA: text(doc, 'dTotIVA', false) || '0',
    cantidadItems: doc.getElementsByTagName('gCamItem').length,
    digestValue
  };
}

function buildQRUrl(data: QRData, idCSC: string, csc: string, env: 'test' | 'prod'): string {
  const params = [
    'nVersion=150',
    `Id=${data.cdc}`,
    `dFeEmiDE=${toHex(data.fechaEmision)}`,
    `${data.receptor.paramName}=${data.receptor.value}`,
    `dTotGralOpe=${data.totalOperacion}`,
    `dTotIVA=${data.totalIVA}`,
    `cItems=${data.cantidadItems}`,
    `DigestValue=${toHex(data.digestValue)}`,
    `IdCSC=${idCSC}`
  ].join('&');

  const cHashQR = sha256(params + csc);
  return `${BASE_URLS[env]}?${params}&cHashQR=${cHashQR}`;
}

/**
 * Adjunta la URL del codigo QR a un XML firmado de SIFEN.
 *
 * Extrae los campos requeridos del XML firmado, calcula la URL del QR y la agrega al documento.
 *
 */
export function attachQRToSignedXML(
  signedXml: string,
  idCSC: string,
  csc: string,
  env: 'test' | 'prod'
): Result<string, QRGenError> {
  try {
    const doc = new DOMParser().parseFromString(signedXml, 'text/xml');
    if (!doc.documentElement) {
      return Err(new QRGenError({ details: 'Elemento raiz no encontrado en XML firmado.' }));
    }

    const qrUrl = buildQRUrl(extractQRData(doc), idCSC, csc, env);

    const gCamFuFD = doc.createElement('gCamFuFD');
    const dCarQR = doc.createElement('dCarQR');
    dCarQR.textContent = qrUrl;
    gCamFuFD.appendChild(dCarQR);
    doc.documentElement.appendChild(gCamFuFD);

    return Ok(new XMLSerializer().serializeToString(doc));
  } catch (error) {
    return Err(
      new QRGenError({
        details: 'Error desconocido al generar QR',
        cause: error
      })
    );
  }
}

/**
 * Construye y retorna unicamente la URL del codigo QR.
 *
 * Extrae los campos requeridos del XML firmado y calcula la URL del QR,
 * sin modificar el XML.
 */
export function getQRUrl(
  signedXml: string,
  idCSC: string,
  csc: string,
  env: 'test' | 'prod'
): Result<string, QRGenError> {
  try {
    const doc = new DOMParser().parseFromString(signedXml, 'text/xml');
    if (!doc.documentElement) {
      return Err(new QRGenError({ details: 'Elemento raiz no encontrado en XML firmado.' }));
    }

    return Ok(buildQRUrl(extractQRData(doc), idCSC, csc, env));
  } catch (error) {
    return Err(
      new QRGenError({
        details: 'Error desconocido al generar URL QR',
        cause: error
      })
    );
  }
}
