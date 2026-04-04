const SCALE_GENERAL = 8;

export function quantize(value: number, decimals = SCALE_GENERAL): number {
  return Number(value.toFixed(decimals));
}

export function equalsCalculated(
  expected: number,
  received: number,
  decimals = SCALE_GENERAL
): boolean {
  return quantize(expected, decimals) === quantize(received, decimals);
}

export function valueOrZero(value: number | undefined): number {
  return value ?? 0;
}
