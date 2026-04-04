import type { FacturaElectronica, ItemOperacion_FE } from '../../../sifen/types';
import { formaAfectacionTributariaIVA } from '../../../sifen/types/enums';
import { equalsCalculated, quantize, valueOrZero } from '../math';
import type { ItemValidationRule } from '../types';

export const calculatedItemRules: ItemValidationRule<FacturaElectronica, ItemOperacion_FE>[] = [
  {
    id: 'E727',
    description: 'Total bruto por item debe ser precio unitario por cantidad',
    tags: ['item', 'e727', 'precio'],
    when: () => true,
    check: (item) => {
      const expected = item.valorItem.precioUnitario * item.cantidadProductoServicio;
      return equalsCalculated(expected, item.valorItem.totalBrutoOperacionItem);
    },
    message: (item, index) => {
      const expected = quantize(item.valorItem.precioUnitario * item.cantidadProductoServicio);
      return `Item ${index + 1}: E727 inválido, dTotBruOpeItem=${item.valorItem.totalBrutoOperacionItem}, esperado=${expected}.`;
    }
  },
  {
    id: 'EA003',
    description:
      'Porcentaje de descuento particular debe coincidir con EA002*100/E721 cuando EA002 > 0',
    tags: ['item', 'ea003', 'descuento'],
    when: (item) => valueOrZero(item.valorItem.valorRestaItem.descuentoParticularItem) > 0,
    check: (item) => {
      if (item.valorItem.valorRestaItem.porcentajeDescuentoItem === undefined) {
        return false;
      }

      const precioUnitario = item.valorItem.precioUnitario;
      const descuento = valueOrZero(item.valorItem.valorRestaItem.descuentoParticularItem);
      const expected = precioUnitario > 0 ? (descuento * 100) / precioUnitario : 0;
      return equalsCalculated(expected, item.valorItem.valorRestaItem.porcentajeDescuentoItem);
    },
    message: (item, index) => {
      const precioUnitario = item.valorItem.precioUnitario;
      const descuento = valueOrZero(item.valorItem.valorRestaItem.descuentoParticularItem);
      const expected = precioUnitario > 0 ? quantize((descuento * 100) / precioUnitario) : 0;
      return `Item ${index + 1}: EA003 inválido, dPorcDesIt=${item.valorItem.valorRestaItem.porcentajeDescuentoItem}, esperado=${expected}.`;
    }
  },
  {
    id: 'EA008',
    description: 'Valor total por item debe seguir formula aritmética del item',
    tags: ['item', 'ea008', 'totales'],
    when: () => true,
    check: (item) => {
      const valorResta = item.valorItem.valorRestaItem;
      const expected =
        (item.valorItem.precioUnitario -
          valueOrZero(valorResta.descuentoParticularItem) -
          valueOrZero(valorResta.descuentoGlobalItem) -
          valueOrZero(valorResta.anticipoParticularItem) -
          valueOrZero(valorResta.anticipoGlobalItem)) *
        item.cantidadProductoServicio;

      return equalsCalculated(expected, valorResta.valorTotalOperacionItem);
    },
    message: (item, index) => {
      const valorResta = item.valorItem.valorRestaItem;
      const expected = quantize(
        (item.valorItem.precioUnitario -
          valueOrZero(valorResta.descuentoParticularItem) -
          valueOrZero(valorResta.descuentoGlobalItem) -
          valueOrZero(valorResta.anticipoParticularItem) -
          valueOrZero(valorResta.anticipoGlobalItem)) *
          item.cantidadProductoServicio
      );

      return `Item ${index + 1}: EA008 inválido, dTotOpeItem=${valorResta.valorTotalOperacionItem}, esperado=${expected}.`;
    }
  },
  {
    id: 'EA009',
    description: 'Valor total por item en guaraníes debe existir y seguir EA008 * E725',
    tags: ['item', 'ea009', 'moneda'],
    when: (item) => item.valorItem.tipoCambioItem !== undefined,
    check: (item) => {
      const valorGs = item.valorItem.valorRestaItem.valorTotalOperacionItemGs;
      if (valorGs === undefined) {
        return false;
      }

      const expected =
        item.valorItem.valorRestaItem.valorTotalOperacionItem * item.valorItem.tipoCambioItem!;
      return equalsCalculated(expected, valorGs);
    },
    message: (item, index) => {
      const expected = quantize(
        item.valorItem.valorRestaItem.valorTotalOperacionItem * item.valorItem.tipoCambioItem!
      );

      return `Item ${index + 1}: EA009 inválido, dTotOpeGs=${item.valorItem.valorRestaItem.valorTotalOperacionItemGs}, esperado=${expected}.`;
    }
  },
  {
    id: 'E735',
    description: 'Base gravada por item debe seguir formula de tasa y proporción',
    tags: ['item', 'iva', 'e735'],
    when: (item) => item.ivaItem !== undefined,
    check: (item) => {
      const iva = item.ivaItem!;
      const expected = expectedBaseGravada(item);
      return equalsCalculated(expected, iva.baseGravadaIvaItem);
    },
    message: (item, index) => {
      const expected = quantize(expectedBaseGravada(item));
      return `Item ${index + 1}: E735 inválido, dBasGravIVA=${item.ivaItem!.baseGravadaIvaItem}, esperado=${expected}.`;
    }
  },
  {
    id: 'E736',
    description: 'Liquidación IVA por item debe seguir base gravada por tasa',
    tags: ['item', 'iva', 'e736'],
    when: (item) => item.ivaItem !== undefined,
    check: (item) => {
      const iva = item.ivaItem!;
      const expected = expectedLiquidacion(item);
      return equalsCalculated(expected, iva.liquidacionIvaItem);
    },
    message: (item, index) => {
      const expected = quantize(expectedLiquidacion(item));
      return `Item ${index + 1}: E736 inválido, dLiqIVAItem=${item.ivaItem!.liquidacionIvaItem}, esperado=${expected}.`;
    }
  },
  {
    id: 'E737',
    description: 'Base exenta por item debe ser EA008 - E735 - E736',
    tags: ['item', 'iva', 'e737'],
    when: (item) => item.ivaItem !== undefined,
    check: (item) => {
      const iva = item.ivaItem!;
      const expected = Math.max(
        0,
        item.valorItem.valorRestaItem.valorTotalOperacionItem -
          iva.baseGravadaIvaItem -
          iva.liquidacionIvaItem
      );
      return equalsCalculated(expected, iva.baseExenta);
    },
    message: (item, index) => {
      const iva = item.ivaItem!;
      const expected = quantize(
        Math.max(
          0,
          item.valorItem.valorRestaItem.valorTotalOperacionItem -
            iva.baseGravadaIvaItem -
            iva.liquidacionIvaItem
        )
      );
      return `Item ${index + 1}: E737 inválido, dBasExe=${iva.baseExenta}, esperado=${expected}.`;
    }
  }
];

function expectedBaseGravada(item: ItemOperacion_FE): number {
  const iva = item.ivaItem!;
  if (
    iva.formaAfectacionTributariaIVA === formaAfectacionTributariaIVA.Exento ||
    iva.formaAfectacionTributariaIVA === formaAfectacionTributariaIVA.Exonerado ||
    iva.tasaIva <= 0 ||
    iva.proporcionGravadaIva <= 0
  ) {
    return 0;
  }

  const baseCalculo =
    (item.valorItem.valorRestaItem.valorTotalOperacionItem * iva.proporcionGravadaIva) / 100;

  if (iva.tasaIva === 10) {
    return baseCalculo / 1.1;
  }

  if (iva.tasaIva === 5) {
    return baseCalculo / 1.05;
  }

  return baseCalculo / (1 + iva.tasaIva / 100);
}

function expectedLiquidacion(item: ItemOperacion_FE): number {
  const iva = item.ivaItem!;
  if (
    iva.formaAfectacionTributariaIVA === formaAfectacionTributariaIVA.Exento ||
    iva.formaAfectacionTributariaIVA === formaAfectacionTributariaIVA.Exonerado ||
    iva.tasaIva <= 0
  ) {
    return 0;
  }

  const base = expectedBaseGravada(item);
  return (base * iva.tasaIva) / 100;
}
