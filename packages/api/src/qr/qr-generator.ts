import { DOMParser, XMLSerializer } from '@xmldom/xmldom';
import crypto from 'crypto';

interface QRData {
  cdc: string;
  fechaEmision: string;
  rucReceptor: string;
  totalOperacion: number;
  totalIVA: number;
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
  if (!value && required) throw new Error(`Elemento requerido <${tag}> no encontrado o vacío`);
  return value;
}

/** Lee el contenido de texto del primer elemento que coincida con `tag`, parseado como número. */
function num(doc: Document, tag: string): number {
  return Number(text(doc, tag, false)) || 0;
}

function extractQRData(doc: Document): QRData {
  const deElement = doc.getElementsByTagName('DE')[0];
  if (!deElement) throw new Error('Elemento DE no encontrado');

  const cdc = deElement.getAttribute('Id');
  if (!cdc) throw new Error('CDC no encontrado en elemento DE');

  // Intenta primero con NS, luego con nombre local
  let dvElements = doc.getElementsByTagNameNS('http://www.w3.org/2000/09/xmldsig#', 'DigestValue');
  if (!dvElements.length) dvElements = doc.getElementsByTagName('DigestValue');

  const digestValue = dvElements[0]?.textContent?.trim();
  if (!digestValue) throw new Error('DigestValue no encontrado o vacío en XML firmado');

  return {
    cdc,
    fechaEmision: text(doc, 'dFeEmiDE'),
    rucReceptor: text(doc, 'dRucRec', false) || '0',
    totalOperacion: num(doc, 'dTotGralOpe'),
    totalIVA: num(doc, 'dTotIVA'),
    cantidadItems: doc.getElementsByTagName('gCamItem').length,
    digestValue
  };
}

function buildQRUrl(data: QRData, idCSC: string, csc: string, env: 'test' | 'prod'): string {
  const params = [
    `nVersion=150`,
    `Id=${data.cdc}`,
    `dFeEmiDE=${toHex(data.fechaEmision)}`,
    `dRucRec=${data.rucReceptor}`,
    `dTotGralOpe=${Math.round(data.totalOperacion)}`,
    `dTotIVA=${Math.round(data.totalIVA)}`,
    `cItems=${data.cantidadItems}`,
    `DigestValue=${toHex(data.digestValue)}`,
    `IdCSC=${idCSC}`
  ].join('&');

  const cHashQR = sha256(params + csc);
  return `${BASE_URLS[env]}?${params}&cHashQR=${cHashQR}`;
}

/**
 * Adjunta una URL de código QR a un XML firmado de SIFEN (Manual Técnico §13.8).
 *
 * Extrae todos los campos requeridos del XML firmado, calcula la URL del QR
 * (incluyendo el hash CSC), y agrega un elemento `<gCamFuFD><dCarQR>`.
 *
 * @returns La cadena XML completa con el elemento QR agregado.
 */
export function attachQRToSignedXML(
  signedXml: string,
  idCSC: string,
  csc: string,
  env: 'test' | 'prod'
): string {
  const doc = new DOMParser().parseFromString(signedXml, 'text/xml');
  if (!doc.documentElement) throw new Error('Elemento raíz no encontrado en XML firmado');

  const qrUrl = buildQRUrl(extractQRData(doc), idCSC, csc, env);

  const gCamFuFD = doc.createElement('gCamFuFD');
  const dCarQR = doc.createElement('dCarQR');
  dCarQR.textContent = qrUrl;
  gCamFuFD.appendChild(dCarQR);
  doc.documentElement.appendChild(gCamFuFD);

  return new XMLSerializer().serializeToString(doc);
}

/**
 * Construye y retorna la URL QR Code.
 *
 * Extrae todos los campos requeridos del XML firmado, calcula la URL del QR y la retorna.
 *
 * @returns URL de QR Code.
 */
export function getQRUrl(
  signedXml: string,
  idCSC: string,
  csc: string,
  env: 'test' | 'prod'
): string {
  const doc = new DOMParser().parseFromString(signedXml, 'text/xml');
  if (!doc.documentElement) throw new Error('Elemento raíz no encontrado en XML firmado');

  return buildQRUrl(extractQRData(doc), idCSC, csc, env);
}
