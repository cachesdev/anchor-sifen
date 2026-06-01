import { Big } from 'big.js';
import { describe, expect, it } from 'vitest';
import { createSubtotalesTotales } from '../../../test-utils/factories/base';
import { mapSubtotalesTotalesToRaw } from '../f';
import { mapGTotSubToClean } from './f';

describe('mapper reverse — f', () => {
  describe('mapGTotSubToClean', () => {
    it('preserva subtotales y totales calculados recibidos en raw', () => {
      const raw = mapSubtotalesTotalesToRaw(
        createSubtotalesTotales({
          totalBrutoOperacion: new Big('1000000'),
          totalNetoOperacion: new Big('999999.5000')
        })
      );

      const clean = mapGTotSubToClean(raw);

      expect(clean.totalBrutoOperacion.toFixed(8)).toBe('1000000.00000000');
      expect(clean.totalNetoOperacion.toFixed(8)).toBe('999999.50000000');
    });
  });
});
