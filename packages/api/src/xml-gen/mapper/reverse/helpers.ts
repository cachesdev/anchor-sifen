import { Big } from 'big.js';
import { DateTime } from 'luxon';

export function optionalMapper<T, R>(mapper: (value: T) => R, value: T | undefined): R | undefined {
  return value !== undefined ? mapper(value) : undefined;
}

export function parseBig(value: string, field: string): Big {
  try {
    return new Big(value);
  } catch (error) {
    throw new Error(`Valor decimal invalido para ${field}: ${value}`, {
      cause: error instanceof Error ? error : undefined
    });
  }
}

export function parseOptionalBig(value: string | undefined, field: string): Big | undefined {
  return value !== undefined ? parseBig(value, field) : undefined;
}

export function parseRawDate(value: string, format: 'date' | 'date-time', field: string): Date {
  const dt =
    format === 'date'
      ? DateTime.fromISO(value, { zone: 'America/Asuncion' }).startOf('day')
      : DateTime.fromISO(value, { zone: 'America/Asuncion' });

  if (!dt.isValid) {
    throw new Error(`Fecha invalida para ${field}: ${value}`);
  }

  return dt.toJSDate();
}

export function parseOptionalRawDate(
  value: string | undefined,
  format: 'date' | 'date-time',
  field: string
): Date | undefined {
  return value !== undefined ? parseRawDate(value, format, field) : undefined;
}

export function parsePaddedNumber(value: string, field: string): number {
  if (!/^\d+$/.test(value)) {
    throw new Error(`Numero invalido para ${field}: ${value}`);
  }

  return Number(value);
}

export function parseOptionalPaddedNumber(
  value: string | undefined,
  field: string
): number | undefined {
  return value !== undefined ? parsePaddedNumber(value, field) : undefined;
}

export function requireValue<T>(value: T | undefined, field: string): T {
  if (value === undefined) {
    throw new Error(`Campo requerido ausente para ${field}`);
  }

  return value;
}
