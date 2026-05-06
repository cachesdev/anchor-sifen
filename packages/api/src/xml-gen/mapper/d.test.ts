import { Big } from 'big.js';
import { describe, expect, it } from 'vitest';
import {
  createEmisor,
  createOperacionComercial,
  createReceptor
} from '../../test-utils/factories/base';
import { mapEmisorToRaw, mapOperacionComercialToRaw, mapReceptorToRaw } from './d';

describe('mapper — d', () => {
  describe('mapOperacionComercialToRaw', () => {
    it('formatea tipoCambioOperacion a 4 decimales', () => {
      const input = createOperacionComercial({
        monedaOperacion: 'PYG',
        tipoCambioOperacion: new Big(7250.5)
      });
      expect(mapOperacionComercialToRaw(input).dTiCam).toBe('7250.5000');
    });

    it('formatea tipoCambioOperacion entero a 4 decimales', () => {
      const input = createOperacionComercial({
        monedaOperacion: 'PYG',
        tipoCambioOperacion: new Big(7000)
      });
      expect(mapOperacionComercialToRaw(input).dTiCam).toBe('7000.0000');
    });

    it('resuelve descripcion de moneda PYG', () => {
      const input = createOperacionComercial({ monedaOperacion: 'PYG' });
      expect(mapOperacionComercialToRaw(input).dDesMoneOpe).toBe('Guarani');
    });

    it('resuelve descripcion de tipoImpuestoAfectado', () => {
      const input = createOperacionComercial({ monedaOperacion: 'PYG', tipoImpuestoAfectado: 1 });
      expect(mapOperacionComercialToRaw(input).dDesTImp).toBe('IVA');
    });
  });

  describe('mapEmisorToRaw', () => {
    it('extrae RUC sin DV del formato con guion', () => {
      const input = createEmisor({ rucEmisor: '80001234-5' });
      expect(mapEmisorToRaw(input).dRucEm).toBe('80001234');
    });

    it('extrae DV numerico del RUC cuando se provee explicitamente', () => {
      const input = createEmisor({ rucEmisor: '80001234-5', digitoVerificadorEmisor: 5 });
      expect(mapEmisorToRaw(input).dDVEmi).toBe(5);
    });

    it('pasa el DV precalculado por el paso de derive', () => {
      const input = createEmisor({ rucEmisor: '616159-6', digitoVerificadorEmisor: 6 });
      expect(mapEmisorToRaw(input).dDVEmi).toBe(6);
    });

    it('resuelve descripcion de departamento Capital', () => {
      const input = createEmisor({ departamentoEmision: 1 });
      expect(mapEmisorToRaw(input).dDesDepEmi).toBe('CAPITAL');
    });
  });

  describe('mapReceptorToRaw', () => {
    it('resuelve descripcion del pais PRY', () => {
      const input = createReceptor({ paisReceptor: 'PRY' });
      expect(mapReceptorToRaw(input).dDesPaisRe).toBe('Paraguay');
    });

    it('extrae RUC sin DV del formato con guion', () => {
      const input = createReceptor({ rucReceptor: '80001234-5' });
      expect(mapReceptorToRaw(input).dRucRec).toBe('80001234');
    });

    it('deja dRucRec undefined cuando no hay RUC', () => {
      const input = createReceptor({ rucReceptor: undefined });
      expect(mapReceptorToRaw(input).dRucRec).toBeUndefined();
    });

    it('pasa el DV precalculado por el paso de derive', () => {
      const input = createReceptor({
        rucReceptor: '616159-6',
        digitoVerificadorReceptor: 6
      });
      expect(mapReceptorToRaw(input).dDVRec).toBe(6);
    });
  });
});
