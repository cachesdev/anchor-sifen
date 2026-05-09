import { Big } from 'big.js';
import { describe, expect, it } from 'vitest';
import { formatDate, optionalBigToFixed, optionalMapper } from './helpers';

describe('mapper — helpers', () => {
  describe('optionalBigToFixed', () => {
    it('formatea Big definido', () => {
      expect(optionalBigToFixed(new Big(50), 2)).toBe('50.00');
    });

    it('retorna undefined para undefined', () => {
      expect(optionalBigToFixed(undefined, 2)).toBeUndefined();
    });

    it('omite Big cero por defecto', () => {
      expect(optionalBigToFixed(new Big(0), 8)).toBeUndefined();
    });

    it('conserva Big cero con keepZero: true', () => {
      expect(optionalBigToFixed(new Big(0), 8, { keepZero: true })).toBe('0.00000000');
    });

    it('conserva Big no-cero sin keepZero', () => {
      expect(optionalBigToFixed(new Big(100), 8)).toBe('100.00000000');
    });
  });

  describe('formatDate', () => {
    it('formatea fecha a ISO date', () => {
      const date = new Date(2024, 0, 15);
      const result = formatDate(date, 'date');
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('formatea fecha a date-time en zona Asuncion', () => {
      const date = new Date(2024, 0, 15, 10, 30, 0);
      const result = formatDate(date, 'date-time');
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/);
    });

    it('retorna undefined para undefined', () => {
      expect(formatDate(undefined, 'date')).toBeUndefined();
      expect(formatDate(undefined, 'date-time')).toBeUndefined();
    });
  });

  describe('optionalMapper', () => {
    it('aplica el mapper cuando el valor esta definido', () => {
      expect(optionalMapper((x: string) => x.toUpperCase(), 'hola')).toBe('HOLA');
    });

    it('retorna undefined cuando el valor es undefined', () => {
      expect(optionalMapper((x: string) => x.toUpperCase(), undefined)).toBeUndefined();
    });
  });
});
