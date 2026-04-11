import { Big } from 'big.js';

export function num(value: number): Big {
  return new Big(value);
}

export const SCALE_GENERAL = 8;
const SCALE_REDONDEO = 4;

export const ZERO = num(0);
export const ONE = num(1);
export const HUNDRED = num(100);

export function bigOrZero(value: Big | undefined): Big {
  return value ?? ZERO;
}

export function quantizeRedondeo(value: Big): Big {
  return value.round(SCALE_REDONDEO, Big.roundHalfUp);
}
