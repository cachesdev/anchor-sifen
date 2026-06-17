import { Big } from 'big.js';
import { describe, expect, it } from 'vitest';
import { formaAfectacionTributariaIVA, tipoImpuestoAfectado } from '../../sifen/types/enums';
import {
  createFacturaElectronicaDec,
  createItemOperacion,
  createValorItem,
  createIvaItem,
  createOperacionComercial,
  createSubtotalesTotales
} from '../../test-utils/factories';
import { applyDescuentoGlobalDerivedFields, applyItemDerivedFields } from './item';
import { applySubtotalesDerivedFields } from './subtotal';
import type { DerivationConfig } from './config';

const feConfig: DerivationConfig = {
  ea008Formula: 'estandar',
  aplicaValorItem: true,
  aplicaIvaItem: true,
  aplicaCondicionOperacion: true,
  aplicaTransporte: true,
  aplicaSubtotales: true,
  subtotalesIncluyeIva: true,
  aplicaComisionOperacion: true,
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

function createOperacionComercialIva(
  overrides: Parameters<typeof createOperacionComercial>[0] = {}
) {
  return createOperacionComercial({
    tipoImpuestoAfectado: tipoImpuestoAfectado.IVA,
    ...overrides
  });
}

function createFacturaElectronicaDecIva(
  overrides?: Parameters<typeof createFacturaElectronicaDec>[0]
) {
  const de = createFacturaElectronicaDec(overrides);
  const tipoImpuesto =
    overrides?.datosGeneralesOperacion?.operacionComercial?.tipoImpuestoAfectado ??
    tipoImpuestoAfectado.IVA;

  de.datosGeneralesOperacion.operacionComercial = createOperacionComercial({
    ...de.datosGeneralesOperacion.operacionComercial,
    tipoImpuestoAfectado: tipoImpuesto
  });
  return de;
}

describe('derive — subtotal', () => {
  describe('F008: totalBrutoOperacion = suma de subtotales por IVA', () => {
    it('acumula items gravados al 10%', () => {
      const de = createFacturaElectronicaDecIva({
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

  describe('D013: campos F de IVA', () => {
    it('no deriva campos F de IVA cuando D013 no es IVA ni IVA-Renta', () => {
      const de = createFacturaElectronicaDecIva({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [
            createItemOperacion({
              cantidadProductoServicio: new Big(1),
              valorItem: createValorItem({ precioUnitario: new Big(10025) }),
              ivaItem: createIvaItem({
                formaAfectacionTributariaIVA: formaAfectacionTributariaIVA.Gravado,
                tasaIva: 10
              })
            })
          ]
        },
        subtotalesTotales: createSubtotalesTotales({ comisionOperacion: new Big(11000) })
      });
      de.datosGeneralesOperacion.operacionComercial = createOperacionComercialIva({
        monedaOperacion: 'PYG',
        tipoImpuestoAfectado: tipoImpuestoAfectado.Renta
      });

      applyItemDerivedFields(de, feConfig);
      applySubtotalesDerivedFields(de, feConfig);

      const sub = de.subtotalesTotales!;
      expect(sub.totalBrutoOperacion.eq(10025)).toBe(true);
      expect(sub.comisionOperacion?.eq(11000)).toBe(true);
      expect(sub.subtotalExenta).toBeUndefined();
      expect(sub.subtotalExonerada).toBeUndefined();
      expect(sub.subtotalIva5).toBeUndefined();
      expect(sub.subtotalIva10).toBeUndefined();
      expect(sub.liquidacionIva5).toBeUndefined();
      expect(sub.liquidacionIva10).toBeUndefined();
      expect(sub.liquidacionTotalIva5).toBeUndefined();
      expect(sub.liquidacionTotalIva10).toBeUndefined();
      expect(sub.liquidacionIvaComision).toBeUndefined();
      expect(sub.liquidacionTotalIva).toBeUndefined();
      expect(sub.totalBaseGravada5).toBeUndefined();
      expect(sub.totalBaseGravada10).toBeUndefined();
      expect(sub.totalBaseGravadaIva).toBeUndefined();
    });

    it('calcula F008 desde items valorados cuando D013=Ninguno no tiene ivaItem', () => {
      const de = createFacturaElectronicaDecIva({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [
            createItemOperacion({
              cantidadProductoServicio: new Big(1),
              valorItem: createValorItem({ precioUnitario: new Big(123456) }),
              ivaItem: undefined
            })
          ]
        }
      });
      de.datosGeneralesOperacion.operacionComercial = createOperacionComercialIva({
        monedaOperacion: 'PYG',
        tipoImpuestoAfectado: tipoImpuestoAfectado.Ninguno
      });

      applyItemDerivedFields(de, feConfig);
      applySubtotalesDerivedFields(de, feConfig);

      const sub = de.subtotalesTotales!;
      expect(sub.totalBrutoOperacion.eq(123456)).toBe(true);
      expect(sub.subtotalIva5).toBeUndefined();
      expect(sub.subtotalIva10).toBeUndefined();
      expect(sub.liquidacionTotalIva).toBeUndefined();
    });
  });

  describe('F013: redondeo — multiplos de 50 PYG o 0.50 extranjera', () => {
    it('para PYG: redondea a multiplos de 50', () => {
      const de = createFacturaElectronicaDecIva({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [itemGravado10(10025, 1)]
        }
      });
      de.datosGeneralesOperacion.operacionComercial = createOperacionComercialIva({
        monedaOperacion: 'PYG'
      });
      applyItemDerivedFields(de, feConfig);
      applySubtotalesDerivedFields(de, feConfig);
      expect(de.subtotalesTotales!.redondeoOperacion.eq(25)).toBe(true);
    });

    it('para PYG: sin redondeo si ya es multiplo de 50', () => {
      const de = createFacturaElectronicaDecIva({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [itemGravado10(10050, 1)]
        }
      });
      de.datosGeneralesOperacion.operacionComercial = createOperacionComercialIva({
        monedaOperacion: 'PYG'
      });
      applyItemDerivedFields(de, feConfig);
      applySubtotalesDerivedFields(de, feConfig);
      expect(de.subtotalesTotales!.redondeoOperacion.eq(0)).toBe(true);
    });

    it('para moneda extranjera: redondea a 0.50', () => {
      const de = createFacturaElectronicaDecIva({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [itemGravado10(10.3, 1)]
        }
      });
      de.datosGeneralesOperacion.operacionComercial = createOperacionComercialIva({
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
      const de = createFacturaElectronicaDecIva({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [itemGravado10(100000, 1)]
        }
      });
      de.datosGeneralesOperacion.operacionComercial = createOperacionComercialIva({
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
      const de = createFacturaElectronicaDecIva();
      const original = de.subtotalesTotales!.totalBrutoOperacion;
      applySubtotalesDerivedFields(de, configSinSub);
      expect(de.subtotalesTotales!.totalBrutoOperacion).toBe(original);
    });
  });

  describe('clasificacion de items por tipo de IVA', () => {
    it('items exentos van a subtotalExenta', () => {
      const de = createFacturaElectronicaDecIva({
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
      const de = createFacturaElectronicaDecIva({
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
      const de = createFacturaElectronicaDecIva({
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

  describe('F013: redondeo moneda extranjera — edge cases', () => {
    it('USD 10.26 → redondeo ~0.26', () => {
      const de = createFacturaElectronicaDecIva({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [itemGravado10(10.26, 1)]
        }
      });
      de.datosGeneralesOperacion.operacionComercial = createOperacionComercialIva({
        monedaOperacion: 'USD'
      });
      applyItemDerivedFields(de, feConfig);
      applySubtotalesDerivedFields(de, feConfig);
      const redondeo = de.subtotalesTotales!.redondeoOperacion;
      expect(redondeo.gt(0.25)).toBe(true);
      expect(redondeo.lt(0.27)).toBe(true);
    });

    it('USD 10.50 → redondeo 0', () => {
      const de = createFacturaElectronicaDecIva({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [itemGravado10(10.5, 1)]
        }
      });
      de.datosGeneralesOperacion.operacionComercial = createOperacionComercialIva({
        monedaOperacion: 'USD'
      });
      applyItemDerivedFields(de, feConfig);
      applySubtotalesDerivedFields(de, feConfig);
      expect(de.subtotalesTotales!.redondeoOperacion.eq(0)).toBe(true);
    });
  });

  describe('F010 → EA004 → F033: consistencia descuento global', () => {
    it('F010=10%, item 50000*2 → F033 = 10000 (10% del total bruto)', () => {
      const de = createFacturaElectronicaDecIva({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [
            createItemOperacion({
              cantidadProductoServicio: new Big(2),
              valorItem: createValorItem({ precioUnitario: new Big(50000) }),
              ivaItem: createIvaItem({ formaAfectacionTributariaIVA: 1, tasaIva: 10 })
            })
          ]
        },
        subtotalesTotales: createSubtotalesTotales({ porcentajeDescuentoGlobal: new Big(10) })
      });
      applyDescuentoGlobalDerivedFields(de);
      applyItemDerivedFields(de, feConfig);
      applySubtotalesDerivedFields(de, feConfig);
      const sub = de.subtotalesTotales!;
      expect(sub.totalDescuentoGlobal.eq(10000)).toBe(true);
      expect(sub.porcentajeDescuentoGlobal.eq(10)).toBe(true);
    });
  });
});
