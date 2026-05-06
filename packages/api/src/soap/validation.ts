import * as v from 'valibot';
import { MAX_SIRECEPDE_SIZE_BYTES } from './config';

export function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const SignedXmlSchema = v.pipe(
  v.string('signedXml debe ser un string.'),
  v.transform((value) => value.trim()),
  v.minLength(1, 'signedXml no puede estar vacio.')
);

const ControlIdSchema = v.pipe(
  v.string('controlId debe ser un string.'),
  v.transform((value) => value.trim()),
  v.regex(/^\d{1,15}$/, 'controlId debe ser numerico con 1 a 15 digitos.')
);

export function normalizeSignedXml(signedXml: string): string {
  const normalized = v.parse(SignedXmlSchema, signedXml);
  const size = Buffer.byteLength(normalized, 'utf8');

  if (size > MAX_SIRECEPDE_SIZE_BYTES) {
    throw new Error(`signedXml no puede exceder 1000 KB. Tamano actual: ${size} bytes.`);
  }

  return normalized;
}

export function normalizeControlId(controlId: string | number): string {
  return v.parse(ControlIdSchema, String(controlId));
}
