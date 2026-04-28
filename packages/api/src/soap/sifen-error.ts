import { ErrorFactory } from '@praha/error-factory';

export class SifenError extends ErrorFactory({
  name: 'SifenError',
  message: (f) => f.sifenMessage ?? f.details ?? 'Error desconocido de SIFEN.',
  fields: ErrorFactory.fields<{
    sifenCodigo?: string;
    sifenMessage?: string;
    details?: string;
    rawObject?: unknown;
  }>()
}) {
  get isSifenRejection(): boolean {
    return this.sifenCodigo !== undefined;
  }
}
