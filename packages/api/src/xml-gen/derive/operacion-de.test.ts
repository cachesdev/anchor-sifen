import { describe, expect, it } from 'vitest';
import type { DEC } from '../../sifen/types/clean/de';
import { applyOperacionDerivedFields } from './operacion-de';

const validCDC = '01800160967037005063661922026050715015984480';

describe('derive — operacion-de', () => {
  describe('applyOperacionDerivedFields', () => {
    it('extrae codigoSeguridad del CDC', () => {
      const de = {
        id_cdc: validCDC,
        operacionDE: { tipoEmision: 1, codigoSeguridad: 0 }
      };
      applyOperacionDerivedFields(de as unknown as DEC);
      expect(de.operacionDE.codigoSeguridad).toBe(501598448);
    });

    it('sobrescribe codigoSeguridad existente con el valor del CDC', () => {
      const de = {
        id_cdc: validCDC,
        operacionDE: { tipoEmision: 1, codigoSeguridad: 999 }
      };
      applyOperacionDerivedFields(de as unknown as DEC);
      expect(de.operacionDE.codigoSeguridad).toBe(501598448);
    });

    it('lanza error si el CDC tiene longitud invalida', () => {
      const de = {
        id_cdc: '123',
        operacionDE: { tipoEmision: 1, codigoSeguridad: 0 }
      };
      expect(() => applyOperacionDerivedFields(de as unknown as DEC)).toThrow('44');
    });
  });
});
