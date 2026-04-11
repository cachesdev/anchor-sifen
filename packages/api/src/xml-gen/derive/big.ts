import { Big } from 'big.js';

export function num(value: number): Big {
  return new Big(value);
}

export const ZERO = num(0);
export const ONE = num(1);
export const HUNDRED = num(100);

export function bigOrZero(value: Big | undefined): Big {
  return value ?? ZERO;
}
