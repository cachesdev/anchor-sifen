import { Big } from 'big.js';
import { describe, expect, it } from 'vitest';
import { formaAfectacionTributariaIVA } from '../../sifen/types/enums';
import {
  createFacturaElectronicaDec,
  createItemOperacion,
  createValorItem,
  createValorRestaItem,
  createIvaItem,
  createSubtotalesTotales
} from '../../test-utils/factories';
import { applyDescuentoGlobalDerivedFields, applyItemDerivedFields } from './item';
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

describe('derive - item', () => {
  describe('E727: totalBrutoOperacionItem = precioUnitario * cantidad', () => {
    it('precio=5000, cantidad=3 → 15000', () => {
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [
            createItemOperacion({
              cantidadProductoServicio: new Big(3),
              valorItem: createValorItem({ precioUnitario: new Big(5000) })
            })
          ]
        }
      });
      applyItemDerivedFields(de, feConfig);
      const item = de.datosEspecificosPorTipoDE.itemsOperacion![0]!;
      expect(item.valorItem!.totalBrutoOperacionItem.eq(15000)).toBe(true);
    });

    it('precio=100.50, cantidad=2 → 201', () => {
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [
            createItemOperacion({
              cantidadProductoServicio: new Big(2),
              valorItem: createValorItem({ precioUnitario: new Big(100.5) })
            })
          ]
        }
      });
      applyItemDerivedFields(de, feConfig);
      const item = de.datosEspecificosPorTipoDE.itemsOperacion![0]!;
      expect(item.valorItem!.totalBrutoOperacionItem.eq(201)).toBe(true);
    });
  });

  describe('EA003: porcentajeDescuentoItem = descParticular * 100 / precioUnitario', () => {
    it('desc=1000, precio=10000 → 10', () => {
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [
            createItemOperacion({
              cantidadProductoServicio: new Big(1),
              valorItem: createValorItem({
                precioUnitario: new Big(10000),
                valorRestaItem: createValorRestaItem({ descuentoParticularItem: new Big(1000) })
              })
            })
          ]
        }
      });
      applyItemDerivedFields(de, feConfig);
      const pct =
        de.datosEspecificosPorTipoDE.itemsOperacion![0]!.valorItem!.valorRestaItem
          .porcentajeDescuentoItem!;
      expect(pct.eq(10)).toBe(true);
    });

    it('desc=0 → 0', () => {
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [
            createItemOperacion({
              cantidadProductoServicio: new Big(1),
              valorItem: createValorItem({
                precioUnitario: new Big(10000),
                valorRestaItem: createValorRestaItem({ descuentoParticularItem: new Big(0) })
              })
            })
          ]
        }
      });
      applyItemDerivedFields(de, feConfig);
      const pct =
        de.datosEspecificosPorTipoDE.itemsOperacion![0]!.valorItem!.valorRestaItem
          .porcentajeDescuentoItem!;
      expect(pct.eq(0)).toBe(true);
    });
  });

  describe('EA008: valorTotalOperacionItem (formula estandar)', () => {
    it('(10000 - 1000 - 500) * 2 = 17000', () => {
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [
            createItemOperacion({
              cantidadProductoServicio: new Big(2),
              valorItem: createValorItem({
                precioUnitario: new Big(10000),
                valorRestaItem: createValorRestaItem({
                  descuentoParticularItem: new Big(1000),
                  descuentoGlobalItem: new Big(500)
                })
              })
            })
          ]
        }
      });
      applyItemDerivedFields(de, feConfig);
      const result =
        de.datosEspecificosPorTipoDE.itemsOperacion![0]!.valorItem!.valorRestaItem
          .valorTotalOperacionItem;
      expect(result.eq(17000)).toBe(true);
    });

    it('todos los descuentos en cero → precioUnitario * cantidad', () => {
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [
            createItemOperacion({
              cantidadProductoServicio: new Big(3),
              valorItem: createValorItem({ precioUnitario: new Big(5000) })
            })
          ]
        }
      });
      applyItemDerivedFields(de, feConfig);
      const result =
        de.datosEspecificosPorTipoDE.itemsOperacion![0]!.valorItem!.valorRestaItem
          .valorTotalOperacionItem;
      expect(result.eq(15000)).toBe(true);
    });
  });

  describe('EA008: autofactura = precioUnitario * cantidad', () => {
    it('ignora descuentos en modalidad autofactura', () => {
      const afConfig: DerivationConfig = { ...feConfig, ea008Formula: 'autofactura' };
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [
            createItemOperacion({
              cantidadProductoServicio: new Big(2),
              valorItem: createValorItem({
                precioUnitario: new Big(10000),
                valorRestaItem: createValorRestaItem({
                  descuentoParticularItem: new Big(1000),
                  descuentoGlobalItem: new Big(500)
                })
              })
            })
          ]
        }
      });
      applyItemDerivedFields(de, afConfig);
      const result =
        de.datosEspecificosPorTipoDE.itemsOperacion![0]!.valorItem!.valorRestaItem
          .valorTotalOperacionItem;
      expect(result.eq(20000)).toBe(true);
    });
  });

  describe('EA009: valorTotalOperacionItemGs = EA008 * tipoCambioItem', () => {
    it('EA008=17000, tipoCambio=7500 → 127500000', () => {
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [
            createItemOperacion({
              cantidadProductoServicio: new Big(2),
              valorItem: createValorItem({
                precioUnitario: new Big(10000),
                tipoCambioItem: new Big(7500),
                valorRestaItem: createValorRestaItem({
                  descuentoParticularItem: new Big(1000),
                  descuentoGlobalItem: new Big(500)
                })
              })
            })
          ]
        }
      });
      applyItemDerivedFields(de, feConfig);
      const gs =
        de.datosEspecificosPorTipoDE.itemsOperacion![0]!.valorItem!.valorRestaItem
          .valorTotalOperacionItemGs!;
      expect(gs.eq(127500000)).toBe(true);
    });

    it('undefined si tipoCambioItem no esta definido', () => {
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [
            createItemOperacion({
              cantidadProductoServicio: new Big(1),
              valorItem: createValorItem({ precioUnitario: new Big(5000) })
            })
          ]
        }
      });
      applyItemDerivedFields(de, feConfig);
      const gs =
        de.datosEspecificosPorTipoDE.itemsOperacion![0]!.valorItem!.valorRestaItem
          .valorTotalOperacionItemGs;
      expect(gs).toBeUndefined();
    });
  });

  describe('E735 + E736: baseGravada y liquidacion (NT-13)', () => {
    it('EA008=100000, proporcion=100, tasa=10 → baseGravada ~90909', () => {
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [
            createItemOperacion({
              cantidadProductoServicio: new Big(1),
              valorItem: createValorItem({ precioUnitario: new Big(100000) }),
              ivaItem: createIvaItem({
                formaAfectacionTributariaIVA: 1,
                proporcionGravadaIva: new Big(100),
                tasaIva: 10
              })
            })
          ]
        }
      });
      applyItemDerivedFields(de, feConfig);
      const iva = de.datosEspecificosPorTipoDE.itemsOperacion![0]!.ivaItem!;
      expect(iva.baseGravadaIvaItem.gt(90909)).toBe(true);
      expect(iva.baseGravadaIvaItem.lt(90910)).toBe(true);
      expect(iva.liquidacionIvaItem.gt(0)).toBe(true);
    });
  });

  describe('E737: baseExenta (gravado parcial)', () => {
    it('solo aplica cuando E731=4 (GravadoParcial)', () => {
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
      const baseExenta = de.datosEspecificosPorTipoDE.itemsOperacion![0]!.ivaItem!.baseExenta;
      expect(baseExenta.gt(0)).toBe(true);
    });

    it('baseExenta = 0 cuando E731=1 (Gravado)', () => {
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [
            createItemOperacion({
              cantidadProductoServicio: new Big(1),
              valorItem: createValorItem({ precioUnitario: new Big(100000) }),
              ivaItem: createIvaItem({
                formaAfectacionTributariaIVA: 1
              })
            })
          ]
        }
      });
      applyItemDerivedFields(de, feConfig);
      const baseExenta = de.datosEspecificosPorTipoDE.itemsOperacion![0]!.ivaItem!.baseExenta;
      expect(baseExenta.eq(0)).toBe(true);
    });
  });

  describe('no aplicaValorItem', () => {
    it('sale temprano sin modificar items', () => {
      const configSinValor = { ...feConfig, aplicaValorItem: false };
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [
            createItemOperacion({
              cantidadProductoServicio: new Big(2),
              valorItem: createValorItem({
                precioUnitario: new Big(5000),
                totalBrutoOperacionItem: new Big(999)
              })
            })
          ]
        }
      });
      applyItemDerivedFields(de, configSinValor);
      expect(
        de.datosEspecificosPorTipoDE.itemsOperacion![0]!.valorItem!.totalBrutoOperacionItem.eq(999)
      ).toBe(true);
    });
  });

  describe('F010 → EA004: descuento global por item', () => {
    it('F010=10%, precioUnitario=50000 → descuentoGlobalItem=5000', () => {
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [
            createItemOperacion({
              cantidadProductoServicio: new Big(2),
              valorItem: createValorItem({ precioUnitario: new Big(50000) })
            })
          ]
        },
        subtotalesTotales: createSubtotalesTotales({
          porcentajeDescuentoGlobal: new Big(10)
        })
      });
      applyDescuentoGlobalDerivedFields(de);
      const item = de.datosEspecificosPorTipoDE.itemsOperacion![0]!;
      expect(item.valorItem!.valorRestaItem.descuentoGlobalItem!.eq(5000)).toBe(true);
    });

    it('F010=10%, precioUnitario=100000 → descuentoGlobalItem=10000', () => {
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [
            createItemOperacion({
              cantidadProductoServicio: new Big(1),
              valorItem: createValorItem({ precioUnitario: new Big(100000) })
            })
          ]
        },
        subtotalesTotales: createSubtotalesTotales({
          porcentajeDescuentoGlobal: new Big(10)
        })
      });
      applyDescuentoGlobalDerivedFields(de);
      const item = de.datosEspecificosPorTipoDE.itemsOperacion![0]!;
      expect(item.valorItem!.valorRestaItem.descuentoGlobalItem!.eq(10000)).toBe(true);
    });

    it('F010 fraccionario: 10.5%, precioUnitario=100000 → descuentoGlobalItem=10500', () => {
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [
            createItemOperacion({
              cantidadProductoServicio: new Big(1),
              valorItem: createValorItem({ precioUnitario: new Big(100000) })
            })
          ]
        },
        subtotalesTotales: createSubtotalesTotales({
          porcentajeDescuentoGlobal: new Big(10.5)
        })
      });
      applyDescuentoGlobalDerivedFields(de);
      const item = de.datosEspecificosPorTipoDE.itemsOperacion![0]!;
      expect(item.valorItem!.valorRestaItem.descuentoGlobalItem!.eq(10500)).toBe(true);
    });

    it('F010=0 → descuentoGlobalItem no se modifica (sin descuento)', () => {
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [
            createItemOperacion({
              cantidadProductoServicio: new Big(1),
              valorItem: createValorItem({ precioUnitario: new Big(100000) })
            })
          ]
        },
        subtotalesTotales: createSubtotalesTotales({
          porcentajeDescuentoGlobal: new Big(0)
        })
      });
      applyDescuentoGlobalDerivedFields(de);
      const item = de.datosEspecificosPorTipoDE.itemsOperacion![0]!;
      expect(item.valorItem!.valorRestaItem.descuentoGlobalItem!.eq(0)).toBe(true);
    });

    it('F010=10% con EA008 estandar: el descuento se aplica', () => {
      const de = createFacturaElectronicaDec({
        datosEspecificosPorTipoDE: {
          itemsOperacion: [
            createItemOperacion({
              cantidadProductoServicio: new Big(2),
              valorItem: createValorItem({ precioUnitario: new Big(50000) })
            })
          ]
        },
        subtotalesTotales: createSubtotalesTotales({
          porcentajeDescuentoGlobal: new Big(10)
        })
      });
      applyDescuentoGlobalDerivedFields(de);
      applyItemDerivedFields(de, feConfig);
      const item = de.datosEspecificosPorTipoDE.itemsOperacion![0]!;
      const ea008 = item.valorItem!.valorRestaItem.valorTotalOperacionItem;
      expect(ea008.eq(90000)).toBe(true);
    });
  });
});
