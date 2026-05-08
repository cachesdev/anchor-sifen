import { Big } from 'big.js';
import { describe, expect, it } from 'vitest';
import { bigOrZero, HUNDRED, isBig, ONE, toBig, toOptionalBig, ZERO } from './big';

function makeForeignBig(value: string): object {
  const b = new Big(value);
  return {
    c: b.c,
    e: b.e,
    s: b.s,
    toString() {
      return value;
    },
  };
}

describe('big', () => {
  describe('isBig', () => {
    it('retorna true para un Big local', () => {
      expect(isBig(new Big(42))).toBe(true);
      expect(isBig(new Big('0.01'))).toBe(true);
      expect(isBig(new Big(-100))).toBe(true);
    });

    it('retorna true para un Big foraneo (chequeo estructural)', () => {
      const fb = makeForeignBig('42');
      expect(fb instanceof Big).toBe(false);
      expect(isBig(fb)).toBe(true);
    });

    it('retorna false para number', () => {
      expect(isBig(42)).toBe(false);
      expect(isBig(0)).toBe(false);
    });

    it('retorna false para string', () => {
      expect(isBig('42')).toBe(false);
    });

    it('retorna false para null y undefined', () => {
      expect(isBig(null)).toBe(false);
      expect(isBig(undefined)).toBe(false);
    });

    it('retorna false para objetos planos', () => {
      expect(isBig({})).toBe(false);
      expect(isBig({ c: [1], e: 1 })).toBe(false);
    });
  });

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

    it('convierte un Big foraneo extrayendo su valor via String()', () => {
      const fb = makeForeignBig('3.14');
      expect(fb instanceof Big).toBe(false);

      const result = toBig(fb as unknown as Big);
      expect(result).toBeInstanceOf(Big);
      expect(result.eq(3.14)).toBe(true);
    });

    it('no crashea con un Big foraneo (regresion)', () => {
      const fb = makeForeignBig('0.01');
      expect(() => toBig(fb as unknown as Big)).not.toThrow();
    });

    it('no crashea con un objeto plano corrupto (regresion de clone corrupto)', () => {
      const corrupted = { s: 1, e: 0, c: [0] };
      expect(() => toBig(corrupted as unknown as Big)).toThrow('[big.js] Invalid number');
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

    it('convierte un Big foraneo a Big local', () => {
      const fb = makeForeignBig('99');
      const result = toOptionalBig(fb as unknown as Big);
      expect(result).toBeInstanceOf(Big);
      expect(result!.eq(99)).toBe(true);
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
