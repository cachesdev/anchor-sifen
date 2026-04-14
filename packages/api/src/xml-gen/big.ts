import { Big } from 'big.js';

export { Big };

export function toBig(value: number | Big): Big {
  return value instanceof Big ? value : new Big(value);
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
