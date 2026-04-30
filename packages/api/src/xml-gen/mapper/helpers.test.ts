import { Big } from 'big.js';
import { describe, expect, it } from 'vitest';
import {
  bigToFixed,
  formatDateOnly,
  formatDateTime,
  optionalBigToFixed,
  parseRuc,
  requireDefined,
  resolveCityDescription,
  resolveCountryDescription,
  resolveCurrencyDescription,
  resolveDepartmentDescription,
  resolveDistrictDescription,
  resolveOptionalDescription,
  resolveOptionalNumericDv,
  resolveOptionalStringDv,
  resolveRequiredDescription,
  resolveRequiredNumericDv
} from './helpers';

describe('mapper — helpers', () => {
  describe('bigToFixed', () => {
    it('formatea Big a string con decimales fijos', () => {
      expect(bigToFixed(new Big(123.456), 2)).toBe('123.46');
    });

    it('formatea enteros con relleno de decimales', () => {
      expect(bigToFixed(new Big(100), 2)).toBe('100.00');
    });

    it('formatea cero', () => {
      expect(bigToFixed(new Big(0), 2)).toBe('0.00');
    });

    it('respeta precision de 8 decimales', () => {
      expect(bigToFixed(new Big(1.123456789), 8)).toBe('1.12345679');
    });
  });

  describe('optionalBigToFixed', () => {
    it('formatea Big definido', () => {
      expect(optionalBigToFixed(new Big(50), 2)).toBe('50.00');
    });

    it('retorna undefined para undefined', () => {
      expect(optionalBigToFixed(undefined, 2)).toBeUndefined();
    });
  });

  describe('formatDateOnly', () => {
    it('formatea fecha a ISO date', () => {
      const date = new Date(2024, 0, 15);
      const result = formatDateOnly(date);
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('retorna undefined para undefined', () => {
      expect(formatDateOnly(undefined)).toBeUndefined();
    });
  });

  describe('formatDateTime', () => {
    it('formatea fecha a date-time en zona Asuncion', () => {
      const date = new Date(2024, 0, 15, 10, 30, 0);
      const result = formatDateTime(date);
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/);
    });

    it('retorna undefined para undefined', () => {
      expect(formatDateTime(undefined)).toBeUndefined();
    });
  });

  describe('resolveRequiredDescription', () => {
    const lookup = { 1: 'uno', 2: 'dos' } as const;

    it('resuelve un codigo conocido', () => {
      expect(resolveRequiredDescription('test', 1, lookup)).toBe('uno');
    });

    it('usa fallback si el codigo no esta en el lookup', () => {
      expect(resolveRequiredDescription('test', 99, lookup, 'default')).toBe('default');
    });

    it('lanza si no hay lookup ni fallback', () => {
      expect(() => resolveRequiredDescription('test', 99, lookup)).toThrow(/Missing description/);
    });
  });

  describe('resolveOptionalDescription', () => {
    const lookup = { 1: 'uno', 2: 'dos' } as const;

    it('resuelve un codigo conocido', () => {
      expect(resolveOptionalDescription(1, lookup)).toBe('uno');
    });

    it('retorna undefined para codigo desconocido sin fallback', () => {
      expect(resolveOptionalDescription(99, lookup)).toBeUndefined();
    });

    it('usa fallback para codigo desconocido', () => {
      expect(resolveOptionalDescription(99, lookup, 'default')).toBe('default');
    });

    it('usa fallback para undefined', () => {
      expect(resolveOptionalDescription(undefined, lookup, 'default')).toBe('default');
    });
  });

  describe('requireDefined', () => {
    it('retorna el valor si esta definido', () => {
      expect(requireDefined('hola', 'campo')).toBe('hola');
    });

    it('lanza si el valor es undefined', () => {
      expect(() => requireDefined(undefined, 'campo')).toThrow(/Missing required value/);
    });
  });

  describe('resolveCurrencyDescription', () => {
    it('resuelve PYG a Guarani', () => {
      expect(resolveCurrencyDescription('PYG')).toBe('Guarani');
    });

    it('resuelve USD a US Dollar', () => {
      expect(resolveCurrencyDescription('USD')).toBe('US Dollar');
    });

    it('lanza para moneda inexistente', () => {
      expect(() => resolveCurrencyDescription('ZZZ')).toThrow(/Missing description/);
    });
  });

  describe('resolveCountryDescription', () => {
    it('resuelve PRY a Paraguay', () => {
      expect(resolveCountryDescription('PRY')).toBe('Paraguay');
    });

    it('resuelve BRA a Brasil', () => {
      expect(resolveCountryDescription('BRA')).toBe('Brasil');
    });

    it('lanza para pais inexistente', () => {
      expect(() => resolveCountryDescription('ZZZ')).toThrow(/Missing description/);
    });
  });

  describe('resolveDepartmentDescription', () => {
    it('resuelve 1 a CAPITAL', () => {
      expect(resolveDepartmentDescription(1)).toBe('CAPITAL');
    });

    it('resuelve 2 a CONCEPCION', () => {
      expect(resolveDepartmentDescription(2)).toBe('CONCEPCION');
    });

    it('lanza para departamento inexistente', () => {
      expect(() => resolveDepartmentDescription(999)).toThrow(/Missing description/);
    });
  });

  describe('resolveDistrictDescription', () => {
    it('resuelve un distrito conocido', () => {
      const desc = resolveDistrictDescription(1);
      expect(typeof desc).toBe('string');
    });

    it('retorna undefined para distrito desconocido', () => {
      expect(resolveDistrictDescription(999999)).toBeUndefined();
    });

    it('retorna undefined para undefined', () => {
      expect(resolveDistrictDescription(undefined)).toBeUndefined();
    });
  });

  describe('resolveCityDescription', () => {
    it('resuelve una ciudad conocida', () => {
      const desc = resolveCityDescription(1);
      expect(typeof desc).toBe('string');
    });

    it('retorna undefined para ciudad desconocida', () => {
      expect(resolveCityDescription(999999)).toBeUndefined();
    });

    it('retorna undefined para undefined', () => {
      expect(resolveCityDescription(undefined)).toBeUndefined();
    });
  });

  describe('parseRuc', () => {
    it('separa RUC y DV normalmente', () => {
      expect(parseRuc('12345678-9')).toEqual({ ruc: '12345678', dv: '9' });
    });

    it('separa usando el ultimo guion', () => {
      expect(parseRuc('1234-567-8')).toEqual({ ruc: '1234-567', dv: '8' });
    });

    it('limpia espacios internos', () => {
      expect(parseRuc('12345678 - 9')).toEqual({ ruc: '12345678', dv: '9' });
    });

    it('retorna solo ruc si no hay guion', () => {
      expect(parseRuc('80001234')).toEqual({ ruc: '80001234' });
    });

    it('retorna solo ruc si el guion esta al inicio', () => {
      const result = parseRuc('-123');
      expect(result.ruc).toBeDefined();
      expect(result.dv).toBeUndefined();
    });

    it('retorna solo ruc si el guion esta al final', () => {
      const result = parseRuc('123-');
      expect(result.ruc).toBeDefined();
      expect(result.dv).toBeUndefined();
    });
  });

  describe('resolveOptionalNumericDv', () => {
    it('retorna DV explicito si esta definido', () => {
      expect(resolveOptionalNumericDv(5, '1234-9')).toBe(5);
    });

    it('extrae DV del RUC si no hay explicito', () => {
      expect(resolveOptionalNumericDv(undefined, '12345678-9')).toBe(9);
    });

    it('retorna undefined si no hay RUC ni explicito', () => {
      expect(resolveOptionalNumericDv(undefined, undefined)).toBeUndefined();
    });

    it('retorna undefined si el DV del RUC no es numerico', () => {
      expect(resolveOptionalNumericDv(undefined, '870066B')).toBeUndefined();
    });
  });

  describe('resolveRequiredNumericDv', () => {
    it('retorna DV explicito', () => {
      expect(resolveRequiredNumericDv(5, '1234-9', 'campo')).toBe(5);
    });

    it('extrae DV del RUC', () => {
      expect(resolveRequiredNumericDv(undefined, '12345678-9', 'campo')).toBe(9);
    });

    it('lanza si no se puede resolver', () => {
      expect(() => resolveRequiredNumericDv(undefined, 'ABCDEF', 'campo')).toThrow(
        /Missing required DV/
      );
    });
  });

  describe('resolveOptionalStringDv', () => {
    it('retorna DV string explicito', () => {
      expect(resolveOptionalStringDv('B', '1234-9')).toBe('B');
    });

    it('extrae DV string del RUC con guion', () => {
      expect(resolveOptionalStringDv(undefined, '870066-B')).toBe('B');
    });

    it('retorna undefined si no hay nada', () => {
      expect(resolveOptionalStringDv(undefined, undefined)).toBeUndefined();
    });
  });
});
