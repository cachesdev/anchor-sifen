import type { DEC } from '../../sifen/types';

/**
 * Deriva campos calculables base.
 * Aplica a todos los tipos de DE (C002 = 1 a 8).
 */
export function applyBaseDerivedFields(out: DEC): void {
  const parsed = Number.parseInt(out.id_cdc.slice(-1), 10);
  if (Number.isNaN(parsed)) {
    throw new Error('No se pudo derivar digito verificador del CDC.');
  }

  out.digitoVerificadorId = parsed;
  out.fechaFirma = new Date();
}
