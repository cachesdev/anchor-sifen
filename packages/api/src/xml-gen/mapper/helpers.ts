import type { Big } from 'big.js';
import { DateTime } from 'luxon';

export function optionalBigToFixed(
  value: Big | undefined,
  decimalPlaces: number,
  opts?: { keepZero?: boolean }
): string | undefined {
  if (value === undefined) return undefined;
  if (!opts?.keepZero && value.eq(0)) return undefined;
  return value.toFixed(decimalPlaces);
}

export function formatDate(value: Date, format: 'date' | 'date-time'): string;
export function formatDate(
  value: Date | undefined,
  format: 'date' | 'date-time'
): string | undefined;
export function formatDate(
  value: Date | undefined,
  format: 'date' | 'date-time'
): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  const dt = DateTime.fromJSDate(value, { zone: 'America/Asuncion' });

  if (format === 'date') {
    const iso = dt.toISODate();
    if (iso === null) {
      throw new Error(`Fecha invalida: ${String(value)}`);
    }
    return iso;
  }

  return dt.toFormat("yyyy-MM-dd'T'HH:mm:ss");
}

export function optionalMapper<T, R>(mapper: (value: T) => R, value: T | undefined): R | undefined {
  return value !== undefined ? mapper(value) : undefined;
}
