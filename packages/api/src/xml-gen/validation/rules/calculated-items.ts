import type { FacturaElectronica, ItemOperacion_FE } from '../../../sifen/types';
import { formaAfectacionTributariaIVA, tipoImpuestoAfectado } from '../../../sifen/types/enums';
import { equalsCalculated, num, quantize, valueOrZero } from '../math';
import type { ItemValidationRule } from '../types';

export const calculatedItemRules: ItemValidationRule<FacturaElectronica, ItemOperacion_FE>[] = [
  {
    id: 'E730',
    description: 'Grupo IVA por item es obligatorio para D013=1,3,4,5',
    tags: ['item', 'iva', 'e730', 'presencia'],
    when: (_, __, doc) => requiresIvaGroup(doc),
    check: (item) => item.ivaItem !== undefined,
    message: (_, index) =>
      `Item ${index + 1}: E730 inválido, el grupo IVA es obligatorio para este tipo de impuesto.`
  },
  {
    id: 'E730b',
    description: 'Grupo IVA por item no debe existir para D013=ISC',
    tags: ['item', 'iva', 'e730b', 'ausencia'],
    when: (_, __, doc) => getOperacionImpuesto(doc) === tipoImpuestoAfectado.ISC,
    check: (item) => item.ivaItem === undefined,
    message: (_, index) =>
      `Item ${index + 1}: E730b inválido, el grupo IVA no debe informarse cuando D013=ISC.`
  },
  {
    id: 'E733',
    description: 'Proporción gravada debe ser 100 para forma Gravado',
    tags: ['item', 'iva', 'e733'],
    when: (item) =>
      item.ivaItem?.formaAfectacionTributariaIVA === formaAfectacionTributariaIVA.Gravado,
    check: (item) => item.ivaItem!.proporcionGravadaIva.eq(100),
    message: (item, index) =>
      `Item ${index + 1}: E733 inválido, proporcionGravadaIva=${item.ivaItem!.proporcionGravadaIva}, esperado=100.`
  },
  {
    id: 'E733a',
    description: 'Proporción gravada debe ser 0 para forma Exonerado o Exento',
    tags: ['item', 'iva', 'e733a'],
    when: (item) =>
      item.ivaItem?.formaAfectacionTributariaIVA === formaAfectacionTributariaIVA.Exonerado ||
      item.ivaItem?.formaAfectacionTributariaIVA === formaAfectacionTributariaIVA.Exento,
    check: (item) => item.ivaItem!.proporcionGravadaIva.eq(0),
    message: (item, index) =>
      `Item ${index + 1}: E733a inválido, proporcionGravadaIva=${item.ivaItem!.proporcionGravadaIva}, esperado=0.`
  },
  {
    id: 'E733b',
    description: 'Proporción gravada debe estar entre 0 y 100 para forma Gravado Parcial',
    tags: ['item', 'iva', 'e733b'],
    when: (item) =>
      item.ivaItem?.formaAfectacionTributariaIVA === formaAfectacionTributariaIVA.GravadoParcial,
    check: (item) =>
      item.ivaItem!.proporcionGravadaIva.gt(0) && item.ivaItem!.proporcionGravadaIva.lt(100),
    message: (item, index) =>
      `Item ${index + 1}: E733b inválido, proporcionGravadaIva=${item.ivaItem!.proporcionGravadaIva}, esperado entre 0 y 100.`
  },
  {
    id: 'E734',
    description: 'Tasa IVA debe ser 0 para forma Exonerado o Exento',
    tags: ['item', 'iva', 'e734'],
    when: (item) =>
      item.ivaItem?.formaAfectacionTributariaIVA === formaAfectacionTributariaIVA.Exonerado ||
      item.ivaItem?.formaAfectacionTributariaIVA === formaAfectacionTributariaIVA.Exento,
    check: (item) => item.ivaItem!.tasaIva.eq(0),
    message: (item, index) =>
      `Item ${index + 1}: E734 inválido, tasaIva=${item.ivaItem!.tasaIva}, esperado=0.`
  },
  {
    id: 'E734a',
    description: 'Tasa IVA debe ser 5 o 10 para forma Gravado o Gravado Parcial',
    tags: ['item', 'iva', 'e734a'],
    when: (item) =>
      item.ivaItem?.formaAfectacionTributariaIVA === formaAfectacionTributariaIVA.Gravado ||
      item.ivaItem?.formaAfectacionTributariaIVA === formaAfectacionTributariaIVA.GravadoParcial,
    check: (item) => item.ivaItem!.tasaIva.eq(5) || item.ivaItem!.tasaIva.eq(10),
    message: (item, index) =>
      `Item ${index + 1}: E734a inválido, tasaIva=${item.ivaItem!.tasaIva}, esperado=5 o 10.`
  },
  {
    id: 'E727',
    description: 'Total bruto por item debe ser precio unitario por cantidad',
    tags: ['item', 'e727', 'precio'],
    when: () => true,
    check: (item) => {
      const expected = item.valorItem.precioUnitario.times(item.cantidadProductoServicio);
      return equalsCalculated(expected, item.valorItem.totalBrutoOperacionItem);
    },
    message: (item, index) => {
      const expected = quantize(item.valorItem.precioUnitario.times(item.cantidadProductoServicio));
      return `Item ${index + 1}: E727 inválido, dTotBruOpeItem=${item.valorItem.totalBrutoOperacionItem}, esperado=${expected}.`;
    }
  },
  {
    id: 'EA003',
    description:
      'Porcentaje de descuento particular debe coincidir con EA002*100/E721 cuando EA002 > 0',
    tags: ['item', 'ea003', 'descuento'],
    when: (item) => valueOrZero(item.valorItem.valorRestaItem.descuentoParticularItem).gt(0),
    check: (item) => {
      if (item.valorItem.valorRestaItem.porcentajeDescuentoItem === undefined) {
        return false;
      }

      const precioUnitario = item.valorItem.precioUnitario;
      const descuento = valueOrZero(item.valorItem.valorRestaItem.descuentoParticularItem);
      const expected = precioUnitario.gt(0)
        ? descuento.times(num(100)).div(precioUnitario)
        : num(0);

      const received = item.valorItem.valorRestaItem.porcentajeDescuentoItem;
      return equalsCalculated(expected, received) || withinTolerance(expected, received, num(0.8));
    },
    message: (item, index) => {
      const precioUnitario = item.valorItem.precioUnitario;
      const descuento = valueOrZero(item.valorItem.valorRestaItem.descuentoParticularItem);
      const expected = precioUnitario.gt(0)
        ? quantize(descuento.times(num(100)).div(precioUnitario))
        : quantize(num(0));
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
      const expected = item.valorItem.precioUnitario
        .minus(valueOrZero(valorResta.descuentoParticularItem))
        .minus(valueOrZero(valorResta.descuentoGlobalItem))
        .minus(valueOrZero(valorResta.anticipoParticularItem))
        .minus(valueOrZero(valorResta.anticipoGlobalItem))
        .times(item.cantidadProductoServicio);

      return equalsCalculated(expected, valorResta.valorTotalOperacionItem);
    },
    message: (item, index) => {
      const valorResta = item.valorItem.valorRestaItem;
      const expected = quantize(
        item.valorItem.precioUnitario
          .minus(valueOrZero(valorResta.descuentoParticularItem))
          .minus(valueOrZero(valorResta.descuentoGlobalItem))
          .minus(valueOrZero(valorResta.anticipoParticularItem))
          .minus(valueOrZero(valorResta.anticipoGlobalItem))
          .times(item.cantidadProductoServicio)
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

      const expected = item.valorItem.valorRestaItem.valorTotalOperacionItem.times(
        item.valorItem.tipoCambioItem!
      );
      return equalsCalculated(expected, valorGs);
    },
    message: (item, index) => {
      const expected = quantize(
        item.valorItem.valorRestaItem.valorTotalOperacionItem.times(item.valorItem.tipoCambioItem!)
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
    description: 'Base exenta por item debe seguir formula NT-13',
    tags: ['item', 'iva', 'e737'],
    when: (item) => item.ivaItem !== undefined,
    check: (item) => {
      const iva = item.ivaItem!;
      const expected = expectedBaseExenta(item);
      return equalsCalculated(expected, iva.baseExenta);
    },
    message: (item, index) => {
      const expected = quantize(expectedBaseExenta(item));
      return `Item ${index + 1}: E737 inválido, dBasExe=${item.ivaItem!.baseExenta}, esperado=${expected}.`;
    }
  }
];

function expectedBaseGravada(item: ItemOperacion_FE): ReturnType<typeof num> {
  const iva = item.ivaItem!;
  if (
    iva.formaAfectacionTributariaIVA === formaAfectacionTributariaIVA.Exento ||
    iva.formaAfectacionTributariaIVA === formaAfectacionTributariaIVA.Exonerado ||
    iva.tasaIva.lte(0) ||
    iva.proporcionGravadaIva.lte(0)
  ) {
    return num(0);
  }

  const baseCalculo = item.valorItem.valorRestaItem.valorTotalOperacionItem
    .times(iva.proporcionGravadaIva)
    .div(num(100));

  if (iva.tasaIva.eq(10)) {
    return baseCalculo.div(1.1);
  }

  if (iva.tasaIva.eq(5)) {
    return baseCalculo.div(1.05);
  }

  return baseCalculo.div(num(1).plus(iva.tasaIva.div(num(100))));
}

function expectedLiquidacion(item: ItemOperacion_FE): ReturnType<typeof num> {
  const iva = item.ivaItem!;
  if (
    iva.formaAfectacionTributariaIVA === formaAfectacionTributariaIVA.Exento ||
    iva.formaAfectacionTributariaIVA === formaAfectacionTributariaIVA.Exonerado ||
    iva.tasaIva.lte(0)
  ) {
    return num(0);
  }

  const base = expectedBaseGravada(item);
  return base.times(iva.tasaIva).div(num(100));
}

function expectedBaseExenta(item: ItemOperacion_FE): ReturnType<typeof num> {
  const iva = item.ivaItem!;
  if (iva.formaAfectacionTributariaIVA !== formaAfectacionTributariaIVA.GravadoParcial) {
    return num(0);
  }

  const totalOperacionItem = item.valorItem.valorRestaItem.valorTotalOperacionItem;
  const numerador = num(100)
    .times(totalOperacionItem)
    .times(num(100).minus(iva.proporcionGravadaIva));
  const denominador = num(10000).plus(iva.tasaIva.times(iva.proporcionGravadaIva));
  if (denominador.lte(0)) {
    return num(0);
  }

  const baseExenta = numerador.div(denominador);
  return baseExenta.gt(0) ? baseExenta : num(0);
}

function getOperacionImpuesto(doc: FacturaElectronica): number {
  return doc.datosGeneralesOperacion.operacionComercial.tipoImpuestoAfectado;
}

function requiresIvaGroup(doc: FacturaElectronica): boolean {
  const impuesto = getOperacionImpuesto(doc);
  return (
    impuesto === tipoImpuestoAfectado.IVA ||
    impuesto === tipoImpuestoAfectado.Renta ||
    impuesto === tipoImpuestoAfectado.Ninguno ||
    impuesto === tipoImpuestoAfectado.IVA_Renta
  );
}

function withinTolerance(
  expected: ReturnType<typeof num>,
  received: ReturnType<typeof num>,
  tolerance: ReturnType<typeof num>
): boolean {
  return expected.minus(received).abs().lte(tolerance);
}
