import { Big } from 'big.js';
import { describe, expect, it } from 'vitest';
import { formaAfectacionTributariaIVA } from '../../sifen/types/enums';
import {
  createFacturaElectronicaDec,
  createItemOperacion,
  createValorItem,
  createIvaItem,
  createOperacionComercial
} from '../../test-utils/factories';
import { applySubtotalesDerivedFields } from './subtotal';
import { applyItemDerivedFields } from './item';
import type { DerivationConfig } from './config';

const feConfig: DerivationConfig = {
  ea008Formula: 'estandar',
  aplicaValorItem: true,
  aplicaIvaItem: true,
  aplicaCondicionOperacion: true,
  aplicaTransporte: true,
  aplicaSubtotales: true,
  subtotalesIncluyeIva: true,
  totalBrutoFormula: 'sumaSubtotales',
  totalGsFormula: 'tipoCambio'
};

function itemGravado10(precio: number, cantidad = 1) {
  return createItemOperacion({
    cantidadProductoServicio: new Big(cantidad),
    valorItem: createValorItem({ precioUnitario: new Big(precio) }),
    ivaItem: createIvaItem({ formaAfectacionTributariaIVA: 1, tasaIva: 10 })
  });
}

describe('derive — subtotal', () => {
  describe('F008: totalBrutoOperacion = suma de subtotales por IVA', () => {
    it('acumula items gravados al 10%', () => {
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [itemGravado10(100000, 1), itemGravado10(50000, 1)]
        }
      });
      applyItemDerivedFields(de, feConfig);
      applySubtotalesDerivedFields(de, feConfig);
      const sub = de.subtotalesTotales!;
      expect(sub.totalBrutoOperacion.gt(0)).toBe(true);
      expect(sub.subtotalIva10!.gt(0)).toBe(true);
    });
  });

  describe('F013: redondeo — multiplos de 50 PYG o 0.50 extranjera', () => {
    it('para PYG: redondea a multiplos de 50', () => {
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [itemGravado10(10025, 1)]
        }
      });
      de.datosGeneralesOperacion.operacionComercial = createOperacionComercial({
        monedaOperacion: 'PYG'
      });
      applyItemDerivedFields(de, feConfig);
      applySubtotalesDerivedFields(de, feConfig);
      expect(de.subtotalesTotales!.redondeoOperacion.eq(25)).toBe(true);
    });

    it('para PYG: sin redondeo si ya es multiplo de 50', () => {
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [itemGravado10(10050, 1)]
        }
      });
      de.datosGeneralesOperacion.operacionComercial = createOperacionComercial({
        monedaOperacion: 'PYG'
      });
      applyItemDerivedFields(de, feConfig);
      applySubtotalesDerivedFields(de, feConfig);
      expect(de.subtotalesTotales!.redondeoOperacion.eq(0)).toBe(true);
    });

    it('para moneda extranjera: redondea a 0.50', () => {
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [itemGravado10(10.3, 1)]
        }
      });
      de.datosGeneralesOperacion.operacionComercial = createOperacionComercial({
        monedaOperacion: 'USD'
      });
      applyItemDerivedFields(de, feConfig);
      applySubtotalesDerivedFields(de, feConfig);
      const redondeo = de.subtotalesTotales!.redondeoOperacion;
      expect(redondeo.gt(0.29)).toBe(true);
      expect(redondeo.lt(0.31)).toBe(true);
    });
  });

  describe('F023: totalOperacionGs', () => {
    it('para PYG retorna undefined', () => {
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [itemGravado10(100000, 1)]
        }
      });
      de.datosGeneralesOperacion.operacionComercial = createOperacionComercial({
        monedaOperacion: 'PYG'
      });
      applyItemDerivedFields(de, feConfig);
      applySubtotalesDerivedFields(de, feConfig);
      expect(de.subtotalesTotales!.totalOperacionGs).toBeUndefined();
    });
  });

  describe('no aplicaSubtotales', () => {
    it('sale temprano sin modificar subtotales', () => {
      const configSinSub = { ...feConfig, aplicaSubtotales: false };
      const de = createFacturaElectronicaDec();
      const original = de.subtotalesTotales!.totalBrutoOperacion;
      applySubtotalesDerivedFields(de, configSinSub);
      expect(de.subtotalesTotales!.totalBrutoOperacion).toBe(original);
    });
  });

  describe('clasificacion de items por tipo de IVA', () => {
    it('items exentos van a subtotalExenta', () => {
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [
            createItemOperacion({
              cantidadProductoServicio: new Big(1),
              valorItem: createValorItem({ precioUnitario: new Big(100000) }),
              ivaItem: createIvaItem({
                formaAfectacionTributariaIVA: formaAfectacionTributariaIVA.Exento,
                proporcionGravadaIva: new Big(0),
                tasaIva: 0
              })
            })
          ]
        }
      });
      applyItemDerivedFields(de, feConfig);
      applySubtotalesDerivedFields(de, feConfig);
      expect(de.subtotalesTotales!.subtotalExenta!.gt(0)).toBe(true);
      expect(de.subtotalesTotales!.subtotalIva10).toBeUndefined();
    });

    it('items exonerados van a subtotalExonerada', () => {
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [
            createItemOperacion({
              cantidadProductoServicio: new Big(1),
              valorItem: createValorItem({ precioUnitario: new Big(50000) }),
              ivaItem: createIvaItem({
                formaAfectacionTributariaIVA: formaAfectacionTributariaIVA.Exonerado,
                proporcionGravadaIva: new Big(0),
                tasaIva: 0
              })
            })
          ]
        }
      });
      applyItemDerivedFields(de, feConfig);
      applySubtotalesDerivedFields(de, feConfig);
      expect(de.subtotalesTotales!.subtotalExonerada!.gt(0)).toBe(true);
    });

    it('items gravado parcial: base exenta a subtotalExenta, gravado a IVA', () => {
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [
            createItemOperacion({
              cantidadProductoServicio: new Big(1),
              valorItem: createValorItem({ precioUnitario: new Big(100000) }),
              ivaItem: createIvaItem({
                formaAfectacionTributariaIVA: formaAfectacionTributariaIVA.GravadoParcial,
                proporcionGravadaIva: new Big(50),
                tasaIva: 10
              })
            })
          ]
        }
      });
      applyItemDerivedFields(de, feConfig);
      applySubtotalesDerivedFields(de, feConfig);
      expect(de.subtotalesTotales!.subtotalExenta!.gt(0)).toBe(true);
      expect(de.subtotalesTotales!.subtotalIva10!.gt(0)).toBe(true);
    });
  });
});
