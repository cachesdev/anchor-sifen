import type { Big } from 'big.js';

export type NumBig = number | Big;

export type DeepNumBig<T> = T extends Big
  ? NumBig
  : T extends Date
    ? T
    : T extends readonly (infer U)[]
      ? DeepNumBig<U>[]
      : T extends object
        ? { [K in keyof T]: DeepNumBig<T[K]> }
        : T;
