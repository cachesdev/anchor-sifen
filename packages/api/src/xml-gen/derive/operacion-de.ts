import type { DEC } from '../../sifen/types';
import { parseCDC } from '../cdc';

/**
 * Deriva campos relacionados con operacionDE.
 * Extrae el codigo de seguridad del CDC, garantizando consistencia
 * entre el CDC y el contenido del DE.
 */
export function applyOperacionDerivedFields(out: DEC): void {
  out.operacionDE.codigoSeguridad = parseCDC(out.id_cdc).codigoSeguridad;
}
