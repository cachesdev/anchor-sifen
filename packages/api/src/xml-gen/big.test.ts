import { Big } from 'big.js';
import { describe, expect, it } from 'vitest';
import { bigOrZero, HUNDRED, ONE, toBig, toOptionalBig, ZERO } from './big';

describe('big', () => {
  describe('toBig', () => {
    it('convierte number a Big', () => {
      const result = toBig(42);
      expect(result).toBeInstanceOf(Big);
      expect(result.eq(42)).toBe(true);
    });

    it('retorna la misma instancia si ya es Big', () => {
      const input = new Big(100);
      const result = toBig(input);
      expect(result).toBe(input);
    });

    it('convierte cero', () => {
      expect(toBig(0).eq(0)).toBe(true);
    });

    it('convierte numeros negativos', () => {
      expect(toBig(-50).eq(-50)).toBe(true);
    });

    it('convierte decimales', () => {
      expect(toBig(3.14).eq(3.14)).toBe(true);
    });
  });

  describe('toOptionalBig', () => {
    it('convierte number a Big', () => {
      const result = toOptionalBig(10);
      expect(result).toBeInstanceOf(Big);
      expect(result!.eq(10)).toBe(true);
    });

    it('retorna el mismo Big sin cambios', () => {
      const input = new Big(20);
      const result = toOptionalBig(input);
      expect(result).toBe(input);
    });

    it('retorna undefined si el valor es undefined', () => {
      expect(toOptionalBig(undefined)).toBeUndefined();
    });
  });

  describe('constantes', () => {
    it('ZERO equivale a 0', () => {
      expect(ZERO).toBeInstanceOf(Big);
      expect(ZERO.eq(0)).toBe(true);
    });

    it('ONE equivale a 1', () => {
      expect(ONE).toBeInstanceOf(Big);
      expect(ONE.eq(1)).toBe(true);
    });

    it('HUNDRED equivale a 100', () => {
      expect(HUNDRED).toBeInstanceOf(Big);
      expect(HUNDRED.eq(100)).toBe(true);
    });
  });

  describe('bigOrZero', () => {
    it('retorna el valor si esta definido', () => {
      const value = new Big(50);
      expect(bigOrZero(value)).toBe(value);
    });

    it('retorna ZERO si el valor es undefined', () => {
      expect(bigOrZero(undefined)).toBe(ZERO);
    });

    it('no muta el valor de entrada', () => {
      const value = new Big(75);
      bigOrZero(value);
      expect(value.eq(75)).toBe(true);
    });
  });
});
