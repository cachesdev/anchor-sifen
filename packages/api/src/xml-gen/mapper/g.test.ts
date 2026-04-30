import { describe, expect, it } from 'vitest';
import { createCarga, createUsoGeneral } from '../../test-utils/factories/base';
import { mapCargaToRaw, mapUsoGeneralToRaw } from './g';

describe('mapper — g', () => {
  describe('mapUsoGeneralToRaw', () => {
    it('deja gCamCarg undefined cuando carga no esta presente', () => {
      const input = createUsoGeneral({ carga: undefined });
      expect(mapUsoGeneralToRaw(input).gCamCarg).toBeUndefined();
    });

    it('incluye carga anidada cuando esta presente', () => {
      const input = createUsoGeneral({
        carga: createCarga({ totalVolumenMercaderia: 50.5, totalPesoMercaderia: 1200 })
      });
      const result = mapUsoGeneralToRaw(input).gCamCarg!;
      expect(result.dTotVolMerc).toBe(50.5);
      expect(result.dTotPesMerc).toBe(1200);
    });
  });

  describe('mapCargaToRaw', () => {
    it('resuelve descripcion de unidadMedida 77 a UNI para volumen', () => {
      const result = mapCargaToRaw(createCarga({ unidadMedidaTotalVolumen: 77 }));
      expect(result.cUniMedTotVol).toBe('77');
      expect(result.dDesUniMedTotVol).toBe('UNI');
    });

    it('deja descripcion undefined si no hay unidad de medida', () => {
      const result = mapCargaToRaw(createCarga({ unidadMedidaTotalVolumen: undefined }));
      expect(result.cUniMedTotVol).toBeUndefined();
      expect(result.dDesUniMedTotVol).toBeUndefined();
    });

    it('resuelve descripcion de unidadMedida 77 a UNI para peso', () => {
      const result = mapCargaToRaw(createCarga({ unidadMedidaTotalPeso: 77 }));
      expect(result.cUniMedTotPes).toBe('77');
      expect(result.dDesUniMedTotPes).toBe('UNI');
    });

    it('resuelve descripcion de caracteristicasCarga 1', () => {
      const result = mapCargaToRaw(createCarga({ caracteristicasCarga: 1 }));
      expect(result.iCarCarga).toBe(1);
      expect(result.dDesCarCarga).toBe('Mercaderías con cadena de frío');
    });

    it('transfiere volumen y peso como number', () => {
      const result = mapCargaToRaw(
        createCarga({ totalVolumenMercaderia: 100, totalPesoMercaderia: 500 })
      );
      expect(result.dTotVolMerc).toBe(100);
      expect(result.dTotPesMerc).toBe(500);
    });
  });
});
