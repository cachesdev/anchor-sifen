import { Big } from 'big.js';
import { describe, expect, it } from 'vitest';
import {
  createCondicionOperacion,
  createIvaItem,
  createItemOperacion,
  createPagoContadoEntregaInicial,
  createPagoCredito,
  createPagoTarjetaCreditoDebito,
  createTransporte,
  createTransportista,
  createValorItem,
  createValorRestaItem
} from '../../test-utils/factories/base';
import {
  mapCondicionOperacionToRaw,
  mapIvaItemToRaw,
  mapItemOperacionToRaw,
  mapPagoContadoEntregaInicialToRaw,
  mapPagoCreditoToRaw,
  mapPagoTarjetaCreditoDebitoToRaw,
  mapTransporteToRaw,
  mapTransportistaToRaw,
  mapValorItemToRaw,
  mapValorRestaItemToRaw
} from './e';

describe('mapper — e', () => {
  describe('mapItemOperacionToRaw', () => {
    it('formatea cantidadProductoServicio a 4 decimales', () => {
      const input = createItemOperacion({ cantidadProductoServicio: new Big(5) });
      expect(mapItemOperacionToRaw(input).dCantProSer).toBe('5.0000');
    });

    it('formatea cantidad con decimales', () => {
      const input = createItemOperacion({ cantidadProductoServicio: new Big(2.5) });
      expect(mapItemOperacionToRaw(input).dCantProSer).toBe('2.5000');
    });

    it('resuelve descripcion de unidadMedida 77 a UNI', () => {
      const input = createItemOperacion({ unidadMedida: 77 });
      expect(mapItemOperacionToRaw(input).dDesUniMed).toBe('UNI');
    });

    it('resuelve descripcion de paisOrigen PRY a Paraguay', () => {
      const input = createItemOperacion({ paisOrigen: 'PRY' });
      expect(mapItemOperacionToRaw(input).dDesPaisOrig).toBe('Paraguay');
    });

    it('deja dDesPaisOrig undefined cuando paisOrigen es undefined', () => {
      const input = createItemOperacion({ paisOrigen: undefined });
      expect(mapItemOperacionToRaw(input).dDesPaisOrig).toBeUndefined();
    });
  });

  describe('mapValorItemToRaw', () => {
    it('formatea precioUnitario a 8 decimales', () => {
      const input = createValorItem({ precioUnitario: new Big(5000) });
      expect(mapValorItemToRaw(input).dPUniProSer).toBe('5000.00000000');
    });

    it('formatea precioUnitario con decimales a 8 posiciones', () => {
      const input = createValorItem({ precioUnitario: new Big(123.456) });
      expect(mapValorItemToRaw(input).dPUniProSer).toBe('123.45600000');
    });
  });

  describe('mapIvaItemToRaw', () => {
    it('formatea baseGravada y liquidacion a 8 decimales', () => {
      const input = createIvaItem({
        formaAfectacionTributariaIVA: 1,
        baseGravadaIvaItem: new Big(9090.91),
        liquidacionIvaItem: new Big(909.091),
        baseExenta: new Big(0)
      });
      const result = mapIvaItemToRaw(input);
      expect(result.dBasGravIVA).toBe('9090.91000000');
      expect(result.dLiqIVAItem).toBe('909.09100000');
      expect(result.dBasExe).toBe('0.00000000');
    });

    it('resuelve descripcion de formaAfectacionIVA 1 a Gravado IVA', () => {
      const input = createIvaItem({ formaAfectacionTributariaIVA: 1 });
      expect(mapIvaItemToRaw(input).dDesAfecIVA).toBe('Gravado IVA');
    });
  });

  describe('mapCondicionOperacionToRaw', () => {
    it('resuelve descripcion condicion 1 a Contado', () => {
      const input = createCondicionOperacion({ condicionOperacion: 1 });
      expect(mapCondicionOperacionToRaw(input).dDCondOpe).toBe('Contado');
    });

    it('resuelve descripcion condicion 2 a Credito', () => {
      const input = createCondicionOperacion({ condicionOperacion: 2 });
      expect(mapCondicionOperacionToRaw(input).dDCondOpe).toBe('Crédito');
    });
  });

  describe('mapPagoContadoEntregaInicialToRaw', () => {
    it('formatea monto a 4 decimales', () => {
      const input = createPagoContadoEntregaInicial({
        monedaTipoPago: 'PYG',
        montoTipoPago: new Big(100000)
      });
      expect(mapPagoContadoEntregaInicialToRaw(input).dMonTiPag).toBe('100000.0000');
    });

    it('formatea monto con centavos', () => {
      const input = createPagoContadoEntregaInicial({
        monedaTipoPago: 'PYG',
        montoTipoPago: new Big(50000.5)
      });
      expect(mapPagoContadoEntregaInicialToRaw(input).dMonTiPag).toBe('50000.5000');
    });

    it('resuelve descripcion de tipoPago 1 a Efectivo', () => {
      const input = createPagoContadoEntregaInicial({ tipoPago: 1, monedaTipoPago: 'PYG' });
      expect(mapPagoContadoEntregaInicialToRaw(input).dDesTiPag).toBe('Efectivo');
    });

    it('resuelve descripcion de moneda del pago PYG a Guarani', () => {
      const input = createPagoContadoEntregaInicial({ monedaTipoPago: 'PYG' });
      expect(mapPagoContadoEntregaInicialToRaw(input).dDMoneTiPag).toBe('Guarani');
    });
  });

  describe('mapPagoTarjetaCreditoDebitoToRaw', () => {
    it('resuelve descripcion de denominacionTarjeta 1 a Visa', () => {
      const input = createPagoTarjetaCreditoDebito({ denominacionTarjeta: 1 });
      expect(mapPagoTarjetaCreditoDebitoToRaw(input).dDesDenTarj).toBe('Visa');
    });

    it('normaliza RUC de la procesadora', () => {
      const input = createPagoTarjetaCreditoDebito({ rucProcesadoraTarjeta: '80001234-5' });
      expect(mapPagoTarjetaCreditoDebitoToRaw(input).dRUCProTar).toBe('80001234');
    });
  });

  describe('mapPagoCreditoToRaw', () => {
    it('resuelve descripcion condicion credito 1 a Plazo', () => {
      const input = createPagoCredito({ condicionOperacionCredito: 1 });
      expect(mapPagoCreditoToRaw(input).dDCondCred).toBe('Plazo');
    });

    it('formatea montoEntregaInicial a 4 decimales', () => {
      const input = createPagoCredito({ montoEntregaInicial: new Big(500000) });
      expect(mapPagoCreditoToRaw(input).dMonEnt).toBe('500000.0000');
    });
  });

  describe('mapTransporteToRaw', () => {
    it('resuelve descripcion modalidadTransporte 1 a Terrestre', () => {
      const input = createTransporte({ modalidadTransporte: 1 });
      expect(mapTransporteToRaw(input).dDesModTrans).toBe('Terrestre');
    });

    it('resuelve descripcion de paisDestino PRY a Paraguay', () => {
      const input = createTransporte({ paisDestino: 'PRY' });
      expect(mapTransporteToRaw(input).dDesPaisDest).toBe('Paraguay');
    });
  });

  describe('mapTransportistaToRaw', () => {
    it('extrae RUC sin DV del formato con guion', () => {
      const input = createTransportista({ rucTransportista: '80001234-5' });
      expect(mapTransportistaToRaw(input).dRucTrans).toBe('80001234');
    });

    it('pasa el DV precalculado por el paso de derive', () => {
      const input = createTransportista({
        rucTransportista: '616159-6',
        digitoVerificadorRucTransportista: 6
      });
      expect(mapTransportistaToRaw(input).dDVTrans).toBe(6);
    });

    it('pasa el DV string del agente precalculado por el paso de derive', () => {
      const input = createTransportista({
        rucAgente: '870066-B',
        digitoVerificadorRucAgente: 'B'
      });
      expect(mapTransportistaToRaw(input).dDVAg).toBe('B');
    });
  });

  describe('mapValorRestaItemToRaw', () => {
    it('omite campos de descuento cuando son cero', () => {
      const input = createValorRestaItem({
        descuentoParticularItem: new Big(0),
        descuentoGlobalItem: new Big(0),
        porcentajeDescuentoItem: new Big(0),
        valorTotalOperacionItem: new Big(100000)
      });
      const result = mapValorRestaItemToRaw(input);
      expect(result.dDescItem).toBeUndefined();
      expect(result.dPorcDesIt).toBeUndefined();
      expect(result.dDescGloItem).toBeUndefined();
      expect(result.dTotOpeItem).toBe('100000.00000000');
    });

    it('conserva campos de anticipo cuando son cero', () => {
      const input = createValorRestaItem({
        anticipoParticularItem: new Big(0),
        anticipoGlobalItem: new Big(0),
        valorTotalOperacionItem: new Big(50000)
      });
      const result = mapValorRestaItemToRaw(input);
      expect(result.dAntPreUniIt).toBe('0.00000000');
      expect(result.dAntGloPreUniIt).toBe('0.00000000');
    });

    it('incluye campos de descuento cuando no son cero', () => {
      const input = createValorRestaItem({
        descuentoParticularItem: new Big(5000),
        porcentajeDescuentoItem: new Big(10),
        valorTotalOperacionItem: new Big(45000)
      });
      const result = mapValorRestaItemToRaw(input);
      expect(result.dDescItem).toBe('5000.00000000');
      expect(result.dPorcDesIt).toBe('10.00000000');
    });
  });
});
