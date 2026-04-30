import { Big } from 'big.js';
import { describe, expect, it } from 'vitest';
import { createSubtotalesTotales } from '../../test-utils/factories/base';
import { mapSubtotalesTotalesToRaw } from './f';

describe('mapper — f', () => {
  describe('mapSubtotalesTotalesToRaw', () => {
    it('formatea campos requeridos con 8 decimales', () => {
      const result = mapSubtotalesTotalesToRaw(
        createSubtotalesTotales({
          totalBrutoOperacion: new Big(1000000),
          totalNetoOperacion: new Big(900000)
        })
      );
      expect(result.dTotOpe).toBe('1000000.00000000');
      expect(result.dTotGralOpe).toBe('900000.00000000');
    });

    it('formatea campos opcionales undefined como undefined', () => {
      const result = mapSubtotalesTotalesToRaw(
        createSubtotalesTotales({
          subtotalExenta: undefined,
          subtotalExonerada: new Big(50000)
        })
      );
      expect(result.dSubExe).toBeUndefined();
      expect(result.dSubExo).toBe('50000.00000000');
    });

    it('formatea redondeo con 4 decimales', () => {
      const result = mapSubtotalesTotalesToRaw(
        createSubtotalesTotales({ redondeoOperacion: new Big(25) })
      );
      expect(result.dRedon).toBe('25.0000');
    });

    it('formatea comision como opcional undefined', () => {
      const result = mapSubtotalesTotalesToRaw(
        createSubtotalesTotales({ comisionOperacion: undefined })
      );
      expect(result.dComi).toBeUndefined();
    });

    it('formatea totalOperacionGs como opcional', () => {
      const result = mapSubtotalesTotalesToRaw(
        createSubtotalesTotales({ totalOperacionGs: new Big(7500000) })
      );
      expect(result.dTotalGs).toBe('7500000.00000000');
    });

    it('formatea IVA liquidacion a 8 decimales', () => {
      const result = mapSubtotalesTotalesToRaw(
        createSubtotalesTotales({
          liquidacionIva5: new Big(1000),
          liquidacionIva10: new Big(2000),
          liquidacionTotalIva: new Big(3000)
        })
      );
      expect(result.dIVA5).toBe('1000.00000000');
      expect(result.dIVA10).toBe('2000.00000000');
      expect(result.dTotIVA).toBe('3000.00000000');
    });
  });
});
