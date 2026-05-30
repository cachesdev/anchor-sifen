import { describe, expect, it } from 'vitest';
import { createOperacionDE, createTimbrado, createItemOperacion } from '../../test-utils/factories/base';
import { mapDatosEspecificosPorTipoDEToRaw, mapOperacionDEToRaw, mapTimbradoToRaw } from './de';
import type { DatosEspecificosPorTipoDE } from '../../sifen/types/clean/de';

describe('mapper — de', () => {
  describe('mapTimbradoToRaw', () => {
    it('padea establecimiento a 3 digitos con ceros a la izquierda', () => {
      expect(mapTimbradoToRaw(createTimbrado({ establecimiento: 5 })).dEst).toBe('005');
      expect(mapTimbradoToRaw(createTimbrado({ establecimiento: 99 })).dEst).toBe('099');
      expect(mapTimbradoToRaw(createTimbrado({ establecimiento: 1 })).dEst).toBe('001');
    });

    it('padea puntoExpedicion a 3 digitos con ceros a la izquierda', () => {
      expect(mapTimbradoToRaw(createTimbrado({ puntoExpedicion: 7 })).dPunExp).toBe('007');
      expect(mapTimbradoToRaw(createTimbrado({ puntoExpedicion: 123 })).dPunExp).toBe('123');
    });

    it('padea numeroDocumento a 7 digitos con ceros a la izquierda', () => {
      const result = mapTimbradoToRaw(createTimbrado({ numeroDocumento: 42 }));
      expect(result.dNumDoc).toBe('0000042');
    });

    it('formatea fechaInicioVigencia como fecha ISO en zona Asuncion', () => {
      const result = mapTimbradoToRaw(
        createTimbrado({ fechaInicioVigencia: new Date(2024, 5, 15) })
      );
      expect(result.dFeIniT).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('mapOperacionDEToRaw', () => {
    it('resuelve descripcion para tipoEmision Normal', () => {
      const result = mapOperacionDEToRaw(createOperacionDE({ tipoEmision: 1 }));
      expect(result.dDesTipEmi).toBe('Normal');
    });

    it('resuelve descripcion para tipoEmision Contingencia', () => {
      const result = mapOperacionDEToRaw(createOperacionDE({ tipoEmision: 2 }));
      expect(result.dDesTipEmi).toBe('Contingencia');
    });

    it('transfiere informacionEmisor como dInfoEmi', () => {
      const result = mapOperacionDEToRaw(
        createOperacionDE({ informacionEmisor: 'Info personalizada' })
      );
      expect(result.dInfoEmi).toBe('Info personalizada');
    });
  });

  describe('mapDatosEspecificosPorTipoDEToRaw — itemsOperacion obligatorio', () => {
    it('mapea itemsOperacion a gCamItem', () => {
      const data: DatosEspecificosPorTipoDE = {
        itemsOperacion: [createItemOperacion()]
      };
      const result = mapDatosEspecificosPorTipoDEToRaw(data);
      expect(result.gCamItem).toBeDefined();
      expect(result.gCamItem).toHaveLength(1);
    });

    it('mapea multiples items correctamente', () => {
      const data: DatosEspecificosPorTipoDE = {
        itemsOperacion: [createItemOperacion(), createItemOperacion(), createItemOperacion()]
      };
      const result = mapDatosEspecificosPorTipoDEToRaw(data);
      expect(result.gCamItem).toHaveLength(3);
    });

    it('gCamItem siempre es un array (no undefined)', () => {
      const data: DatosEspecificosPorTipoDE = {
        itemsOperacion: [createItemOperacion()]
      };
      const result = mapDatosEspecificosPorTipoDEToRaw(data);
      expect(Array.isArray(result.gCamItem)).toBe(true);
    });
  });
});
