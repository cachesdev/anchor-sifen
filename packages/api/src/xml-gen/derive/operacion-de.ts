import type { FacturaElectronica } from '../../sifen/types';

/** Genera un numero de 9 digitos enteros cryptograficamente aleatorio. */
function generateCodigoSeguridad(): number {
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);
  return (buffer[0]! % 900_000_000) + 100_000_000;
}

/** Deriva campos relacionados con operacionDE */
export function applyOperacionDerivedFields(out: FacturaElectronica): void {
  out.operacionDE.codigoSeguridad = generateCodigoSeguridad();
}
