import { Big } from 'big.js';

export { Big };

/**
 * Verifica de forma estructural si un valor es una instancia de Big,
 * evitando el problema de `instanceof` que falla cuando el constructor
 * Big proviene de una copia distinta del módulo (común en monorepos
 * pnpm donde cada paquete resuelve su propia dependencia de big.js).
 *
 * Se verifican las tres propiedades internas que definen una instancia
 * de Big: `c` (coeficiente, array de dígitos), `e` (exponente) y `s`
 * (signo, 1 o -1).
 */
export function isBig(value: unknown): value is Big {
  return (
    typeof value === 'object' &&
    value !== null &&
    'c' in value &&
    Array.isArray((value as { c: unknown }).c) &&
    'e' in value &&
    typeof (value as { e: unknown }).e === 'number' &&
    's' in value &&
    typeof (value as { s: unknown }).s === 'number'
  );
}

/**
 * Normaliza `number | Big` a una instancia de Big.
 *
 * Si el valor es un Big foráneo (isBig true pero instanceof false),
 * se extrae su representación decimal mediante String() y se construye
 * un nuevo Big con la copia local del módulo. Esto evita errores de
 * `[big.js] Invalid number` al operar entre instancias de distintas
 * copias del módulo, y también corrige el clonado silencioso de Big
 * foráneos (ver clone.ts) que los convertía en objetos planos {s, e, c}
 * causando luego el fallo en parse().
 */
export function toBig(value: number | Big): Big {
  if (value instanceof Big) return value;
  if (isBig(value)) return new Big(String(value));
  return new Big(value);
}

export function toOptionalBig(value: number | Big | undefined): Big | undefined {
  return value !== undefined ? toBig(value) : undefined;
}

export const ZERO = toBig(0);
export const ONE = toBig(1);
export const HUNDRED = toBig(100);

export function bigOrZero(value: Big | undefined): Big {
  return value ?? ZERO;
}
