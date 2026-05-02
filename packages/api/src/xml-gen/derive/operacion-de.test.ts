import { describe, expect, it } from 'vitest';
import type { DEC } from '../../sifen/types/clean/de';
import { generateCodigoSeguridad, applyOperacionDerivedFields } from './operacion-de';

describe('derive — operacion-de', () => {
  describe('generateCodigoSeguridad', () => {
    it('genera un entero de 9 digitos en el rango 100_000_000 a 999_999_999', () => {
      for (let i = 0; i < 100; i++) {
        const codigo = generateCodigoSeguridad();
        expect(Number.isInteger(codigo)).toBe(true);
        expect(codigo).toBeGreaterThanOrEqual(100_000_000);
        expect(codigo).toBeLessThanOrEqual(999_999_999);
        expect(String(codigo).length).toBe(9);
      }
    });

    it('genera valores distintos en llamadas consecutivas', () => {
      const results = new Set<number>();
      for (let i = 0; i < 100; i++) {
        results.add(generateCodigoSeguridad());
      }
      // Prácticamente imposible que 100 llamadas consecutivas produzcan solo 1 valor distinto
      expect(results.size).toBeGreaterThan(1);
    });
  });

  describe('applyOperacionDerivedFields', () => {
    it('asigna codigoSeguridad en operacionDE', () => {
      const de = {
        operacionDE: { tipoEmision: 1, codigoSeguridad: 0 }
      };
      applyOperacionDerivedFields(de as DEC);
      expect(de.operacionDE.codigoSeguridad).toBeGreaterThanOrEqual(100_000_000);
    });

    it('sobrescribe codigoSeguridad existente', () => {
      const de = {
        operacionDE: { tipoEmision: 1, codigoSeguridad: 999 }
      };
      applyOperacionDerivedFields(de as DEC);
      expect(de.operacionDE.codigoSeguridad).not.toBe(999);
      expect(de.operacionDE.codigoSeguridad).toBeGreaterThanOrEqual(100_000_000);
    });
  });
});
