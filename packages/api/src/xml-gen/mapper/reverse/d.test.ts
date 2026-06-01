import { describe, expect, it } from 'vitest';
import { createEmisor } from '../../../test-utils/factories/base';
import { mapEmisorToRaw } from '../d';
import { mapGEmisToClean } from './d';

describe('mapper reverse — d', () => {
  describe('mapGEmisToClean', () => {
    it('mapea el RUC y DV del emisor como valores separados', () => {
      const raw = mapEmisorToRaw(
        createEmisor({ rucEmisor: '80001234-5', digitoVerificadorEmisor: 5 })
      );

      const clean = mapGEmisToClean(raw);

      expect(clean.rucEmisor).toBe('80001234');
      expect(clean.digitoVerificadorEmisor).toBe(5);
    });
  });
});
