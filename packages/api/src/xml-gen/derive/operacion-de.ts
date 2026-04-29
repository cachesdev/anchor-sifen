import type { DEC } from '../../sifen/types';

/**
 * Genera un numero de 9 digitos enteros criptograficamente aleatorio.
 * Segun MT v150, p. 62, campo B004 (dCodSeg).
 */
function generateCodigoSeguridad(): number {
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);
  return (buffer[0]! % 900_000_000) + 100_000_000;
}

/**
 * Deriva campos relacionados con operacionDE.
 * Aplica a todos los tipos de DE (C002 = 1 a 8).
 * MT v150, p. 62, campo B004 — Codigo de seguridad generado aleatoriamente.
 */
export function applyOperacionDerivedFields(out: DEC): void {
  out.operacionDE.codigoSeguridad = generateCodigoSeguridad();
}
