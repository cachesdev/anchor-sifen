import type { FacturaElectronica } from '../../sifen/types';

/** Deriva campos calculables base */
export function applyBaseDerivedFields(out: FacturaElectronica): void {
  const parsed = Number.parseInt(out.id_cdc.slice(-1), 10);
  if (Number.isNaN(parsed)) {
    throw new Error('No se pudo derivar digito verificador del CDC.');
  }

  out.digitoVerificadorId = parsed;
  out.fechaFirma = new Date();
}
