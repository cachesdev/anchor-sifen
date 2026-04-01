import { DateTime } from 'luxon';
import { descripcionCodigoCiudad } from '../../gen/ciudades';
import { descripcionCodigoDepartamento } from '../../gen/departamentos';
import { descripcionCodigoDistrito } from '../../gen/distritos';
import { codigoMoneda } from '../../gen/monedas';
import { descripcionCodigoPais } from '../../gen/paises';

type LookupRecord<TDescription extends string> = Record<PropertyKey, TDescription>;

type LookupValue = string | number;

function getLookupValue<TDescription extends string>(
  value: LookupValue | undefined,
  lookup: LookupRecord<TDescription>
): TDescription | undefined {
  if (value === undefined) {
    return undefined;
  }

  return (lookup as Record<string, TDescription>)[String(value)];
}

function formatDate(value: Date, format: 'date' | 'date-time'): string {
  const dt = DateTime.fromJSDate(value, { zone: 'America/Asuncion' });

  if (format === 'date') {
    return dt.toISODate()!;
  }

  return dt.toFormat("yyyy-MM-dd'T'HH:mm:ss");
}

export function formatDateOnly(value?: Date): string | undefined {
  if (!value) {
    return undefined;
  }

  return formatDate(value, 'date');
}

export function formatDateTime(value?: Date): string | undefined {
  if (!value) {
    return undefined;
  }

  return formatDate(value, 'date-time');
}

export function resolveRequiredDescription<TDescription extends string>(
  fieldName: string,
  value: LookupValue,
  lookup: LookupRecord<TDescription>,
  fallback?: TDescription
): TDescription {
  const derived = getLookupValue(value, lookup);

  if (derived !== undefined) {
    return derived;
  }

  if (fallback !== undefined) {
    return fallback;
  }

  throw new Error(`Missing description for ${fieldName} using value ${String(value)}.`);
}

export function resolveOptionalDescription<TDescription extends string>(
  value: LookupValue | undefined,
  lookup: LookupRecord<TDescription>,
  fallback?: TDescription
): TDescription | undefined;
export function resolveOptionalDescription<TDescription extends string>(
  value: LookupValue | undefined,
  lookup: LookupRecord<TDescription>,
  fallback?: TDescription
): TDescription | undefined {
  if (value === undefined) {
    return fallback;
  }

  return getLookupValue(value, lookup) ?? fallback;
}

export function requireDefined<T>(value: T | undefined, fieldName: string): T {
  if (value !== undefined) {
    return value;
  }

  throw new Error(`Missing required value for ${fieldName}.`);
}

export function resolveCurrencyDescription(
  currencyCode: string,
  fallback?: (typeof codigoMoneda)[keyof typeof codigoMoneda]
): (typeof codigoMoneda)[keyof typeof codigoMoneda] {
  return resolveRequiredDescription('currencyCode', currencyCode, codigoMoneda, fallback);
}

export function resolveCountryDescription(
  countryCode: string,
  fallback?: (typeof descripcionCodigoPais)[keyof typeof descripcionCodigoPais]
): (typeof descripcionCodigoPais)[keyof typeof descripcionCodigoPais] {
  return resolveRequiredDescription('countryCode', countryCode, descripcionCodigoPais, fallback);
}

export function resolveDepartmentDescription(
  departmentCode: number,
  fallback?: (typeof descripcionCodigoDepartamento)[keyof typeof descripcionCodigoDepartamento]
): (typeof descripcionCodigoDepartamento)[keyof typeof descripcionCodigoDepartamento] {
  return resolveRequiredDescription(
    'departmentCode',
    departmentCode,
    descripcionCodigoDepartamento,
    fallback
  );
}

export function resolveDistrictDescription(
  districtCode: number | undefined,
  fallback?: (typeof descripcionCodigoDistrito)[keyof typeof descripcionCodigoDistrito]
): (typeof descripcionCodigoDistrito)[keyof typeof descripcionCodigoDistrito] | undefined {
  return resolveOptionalDescription(districtCode, descripcionCodigoDistrito, fallback);
}

export function resolveCityDescription(
  cityCode: number | undefined,
  fallback?: (typeof descripcionCodigoCiudad)[keyof typeof descripcionCodigoCiudad]
): (typeof descripcionCodigoCiudad)[keyof typeof descripcionCodigoCiudad] | undefined {
  return resolveOptionalDescription(cityCode, descripcionCodigoCiudad, fallback);
}

export interface ParsedRuc {
  ruc: string;
  dv?: string;
}

export function parseRuc(rawRuc: string): ParsedRuc {
  const normalized = rawRuc.replace(/\s+/g, '');
  const separatorIndex = normalized.lastIndexOf('-');

  if (separatorIndex <= 0 || separatorIndex >= normalized.length - 1) {
    return { ruc: normalized };
  }

  return {
    ruc: normalized.slice(0, separatorIndex),
    dv: normalized.slice(separatorIndex + 1)
  };
}

export function resolveOptionalNumericDv(
  explicitDv: number | undefined,
  rawRuc?: string
): number | undefined {
  if (explicitDv !== undefined) {
    return explicitDv;
  }

  if (!rawRuc) {
    return undefined;
  }

  const parsed = parseRuc(rawRuc);

  if (!parsed.dv) {
    return undefined;
  }

  const parsedDv = Number.parseInt(parsed.dv, 10);
  return Number.isNaN(parsedDv) ? undefined : parsedDv;
}

export function resolveRequiredNumericDv(
  explicitDv: number | undefined,
  rawRuc: string,
  fieldName: string
): number {
  const resolved = resolveOptionalNumericDv(explicitDv, rawRuc);

  if (resolved !== undefined) {
    return resolved;
  }

  throw new Error(
    `Missing required DV for ${fieldName}. Provide explicit DV or include RUC as 1234567-8.`
  );
}

export function resolveOptionalStringDv(
  explicitDv: string | undefined,
  rawRuc?: string
): string | undefined {
  if (explicitDv !== undefined) {
    return explicitDv;
  }

  if (!rawRuc) {
    return undefined;
  }

  return parseRuc(rawRuc).dv;
}
