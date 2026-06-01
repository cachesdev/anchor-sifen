import { Big } from 'big.js';
import { describe, expect, it } from 'vitest';
import { createItemOperacion, createValorRestaItem } from '../../../test-utils/factories/base';
import { mapItemOperacionToRaw, mapValorRestaItemToRaw } from '../e';
import { mapGCamItemToClean, mapGValorRestaItemToClean } from './e';

describe('mapper reverse — e', () => {
  describe('mapGCamItemToClean', () => {
    it('parsea importes decimales y omite descripciones raw', () => {
      const raw = mapItemOperacionToRaw(
        createItemOperacion({ cantidadProductoServicio: new Big('2.5000') })
      );

      const clean = mapGCamItemToClean({ ...raw, dDesUniMed: 'descripcion raw ignorada' as never });

      expect(clean.cantidadProductoServicio.toFixed(4)).toBe('2.5000');
      expect(clean.unidadMedida).toBe(raw.cUniMed);
    });
  });

  describe('mapGValorRestaItemToClean', () => {
    it('preserva ceros raw de anticipos y descuentos', () => {
      const raw = mapValorRestaItemToRaw(
        createValorRestaItem({
          descuentoParticularItem: new Big(0),
          anticipoParticularItem: new Big(0),
          anticipoGlobalItem: new Big(0),
          valorTotalOperacionItem: new Big(50000)
        })
      );

      const clean = mapGValorRestaItemToClean(raw);

      expect(clean.descuentoParticularItem).toBeUndefined();
      expect(clean.anticipoParticularItem?.toFixed(8)).toBe('0.00000000');
      expect(clean.anticipoGlobalItem?.toFixed(8)).toBe('0.00000000');
    });
  });
});
