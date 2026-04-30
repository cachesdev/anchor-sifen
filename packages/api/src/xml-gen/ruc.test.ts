import { describe, expect, it } from 'vitest';
import { calcularDv, extraerRuc } from './ruc';

describe('ruc', () => {
  describe('extraerRuc', () => {
    it('extrae la parte numerica antes del guion', () => {
      expect(extraerRuc('12345678-9')).toBe('12345678');
    });

    it('limpia espacios alrededor del RUC', () => {
      expect(extraerRuc(' 80001234-5')).toBe('80001234');
    });

    it('retorna el RUC completo si no tiene guion', () => {
      expect(extraerRuc('80001234')).toBe('80001234');
    });

    it('retorna cadena vacia si la entrada es vacia', () => {
      expect(extraerRuc('')).toBe('');
    });

    it('tolera espacios entre el RUC y el guion', () => {
      expect(extraerRuc('12345678 -  9')).toBe('12345678');
    });

    it('toma solo el primer segmento si hay multiples guiones', () => {
      expect(extraerRuc('1234-5678-9')).toBe('1234');
    });
  });

  describe('calcularDv', () => {
    it('calcula el DV correcto para RUC numericos', () => {
      // Pares conocidos de RUC -> DV (fuente: base de DNIT)
      expect(calcularDv('616159')).toBe(6);
      expect(calcularDv('616162')).toBe(6);
      expect(calcularDv('616168')).toBe(5);
      expect(calcularDv('616170')).toBe(7);
      expect(calcularDv('616172')).toBe(3);
      expect(calcularDv('616173')).toBe(1);
      expect(calcularDv('616174')).toBe(0);
      expect(calcularDv('616178')).toBe(2);
      expect(calcularDv('616180')).toBe(4);
      expect(calcularDv('616181')).toBe(2);
    });

    it('calcula el DV correcto para RUC alfanumericos', () => {
      // Pares conocidos donde el RUC incluye letras
      expect(calcularDv('870066B')).toBe(8);
      expect(calcularDv('870067A')).toBe(6);
      expect(calcularDv('870067B')).toBe(4);
      expect(calcularDv('872685A')).toBe(9);
      expect(calcularDv('873756A')).toBe(7);
      expect(calcularDv('875104A')).toBe(7);
      expect(calcularDv('885865A')).toBe(0);
      expect(calcularDv('887082B')).toBe(1);
      expect(calcularDv('899200A')).toBe(6);
      expect(calcularDv('927478A')).toBe(0);
    });

    it('es deterministico: mismo RUC → mismo DV', () => {
      expect(calcularDv('80001234')).toBe(calcularDv('80001234'));
    });

    it('trata mayusculas y minusculas por igual', () => {
      expect(calcularDv('abc123')).toBe(calcularDv('ABC123'));
      expect(calcularDv('870066b')).toBe(calcularDv('870066B'));
    });

    it('no falla con cadena vacia', () => {
      const dv = calcularDv('');
      expect(Number.isInteger(dv)).toBe(true);
    });
  });

  describe('integracion', () => {
    it('extraerRuc + calcularDv encadenan correctamente', () => {
      const rucCi = extraerRuc('80001234-5');
      const dv = calcularDv(rucCi);
      expect(Number.isInteger(dv)).toBe(true);
      expect(dv).toBeGreaterThanOrEqual(0);
    });
  });
});
