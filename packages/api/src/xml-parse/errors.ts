import { ErrorFactory } from '@praha/error-factory';

export class XMLParseError extends ErrorFactory({
  name: 'XMLParseError',
  message: (f) => `Error durante parseo de XML DE: ${f.details}.`,
  fields: ErrorFactory.fields<{ details: string }>()
}) {}
