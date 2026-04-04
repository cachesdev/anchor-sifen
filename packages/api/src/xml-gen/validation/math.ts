import { Big } from 'big.js';

const SCALE_GENERAL = 8;
const ZERO = new Big(0);

export function num(value: number): Big {
  return new Big(value);
}

export function quantize(value: Big, decimals = SCALE_GENERAL): Big {
  return value.round(decimals, Big.roundHalfUp);
}

export function equalsCalculated(expected: Big, received: Big, decimals = SCALE_GENERAL): boolean {
  return quantize(expected, decimals).eq(quantize(received, decimals));
}

export function valueOrZero(value: Big | undefined): Big {
  return value ?? ZERO;
}
