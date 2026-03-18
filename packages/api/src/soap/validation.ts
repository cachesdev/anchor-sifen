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
  v.string('signedXml must be a string.'),
  v.transform((value) => value.trim()),
  v.minLength(1, 'signedXml cannot be empty.')
);

const ControlIdSchema = v.pipe(
  v.string('controlId must be a string.'),
  v.transform((value) => value.trim()),
  v.regex(/^\d{1,15}$/, 'controlId must be numeric with 1 to 15 digits.')
);

let lastGeneratedControlId = 0;

function nextControlId(): string {
  const now = Date.now();
  lastGeneratedControlId = Math.max(lastGeneratedControlId + 1, now);
  return String(lastGeneratedControlId).slice(-15);
}

export function normalizeSignedXml(signedXml: string): string {
  const normalized = v.parse(SignedXmlSchema, signedXml);
  const size = Buffer.byteLength(normalized, 'utf8');

  if (size > MAX_SIRECEPDE_SIZE_BYTES) {
    throw new Error(`signedXml cannot exceed 1000 KB. Current size: ${size} bytes.`);
  }

  return normalized;
}

export function normalizeControlId(controlId?: string | number): string {
  return v.parse(ControlIdSchema, String(controlId ?? nextControlId()));
}
