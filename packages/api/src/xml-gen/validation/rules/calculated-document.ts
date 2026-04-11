import type { FacturaElectronica } from '../../../sifen/types';
import {
  condicionTipoCambio,
  formaAfectacionTributariaIVA,
  tipoImpuestoAfectado
} from '../../../sifen/types/enums';
import {
  getCondicionTipoCambio,
  getItems,
  getMonedaOperacion,
  getSubtotales,
  getTipoCambioOperacion
} from '../../fe-accessors';
import { equalsCalculated, num, quantize, valueOrZero } from '../math';
import type { ValidationRule } from '../types';

export const calculatedDocumentRules: ValidationRule<FacturaElectronica>[] = [
  {
    id: 'F008',
    description: 'Total bruto debe sumar subtotales para impuestos IVA/Renta/Ninguno/IVA-Renta',
    tags: ['totales', 'f008', 'impuesto'],
    when: (doc) => getOperacionImpuesto(doc) !== tipoImpuestoAfectado.ISC,
    check: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected = valueOrZero(subtotales.subtotalExenta)
        .plus(valueOrZero(subtotales.subtotalExonerada))
        .plus(valueOrZero(subtotales.subtotalIva5))
        .plus(valueOrZero(subtotales.subtotalIva10));
      return equalsCalculated(expected, subtotales.totalBrutoOperacion);
    },
    message: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected = quantize(
        valueOrZero(subtotales.subtotalExenta)
          .plus(valueOrZero(subtotales.subtotalExonerada))
          .plus(valueOrZero(subtotales.subtotalIva5))
          .plus(valueOrZero(subtotales.subtotalIva10))
      );
      return `F008 inválido: totalBrutoOperacion=${subtotales.totalBrutoOperacion}, esperado=${expected}.`;
    }
  },
  {
    id: 'F009',
    description: 'Total descuento particular por item debe ser suma de EA002 * E711',
    tags: ['totales', 'descuentos', 'f009'],
    when: () => true,
    check: (doc) => {
      const expected = sumItemComponentByQuantity(
        doc,
        (item) => item.valorItem.valorRestaItem.descuentoParticularItem
      );
      return equalsCalculated(expected, getSubtotales(doc).totalDescuentoParticular);
    },
    message: (doc) => {
      const expected = quantize(
        sumItemComponentByQuantity(
          doc,
          (item) => item.valorItem.valorRestaItem.descuentoParticularItem
        )
      );
      return `F009 inválido: totalDescuentoParticular=${getSubtotales(doc).totalDescuentoParticular}, esperado=${expected}.`;
    }
  },
  {
    id: 'F033',
    description: 'Total descuento global por item debe ser suma de EA004 * E711',
    tags: ['totales', 'descuentos', 'f033'],
    when: () => true,
    check: (doc) => {
      const expected = sumItemComponentByQuantity(
        doc,
        (item) => item.valorItem.valorRestaItem.descuentoGlobalItem
      );
      return equalsCalculated(expected, getSubtotales(doc).totalDescuentoGlobal);
    },
    message: (doc) => {
      const expected = quantize(
        sumItemComponentByQuantity(doc, (item) => item.valorItem.valorRestaItem.descuentoGlobalItem)
      );
      return `F033 inválido: totalDescuentoGlobal=${getSubtotales(doc).totalDescuentoGlobal}, esperado=${expected}.`;
    }
  },
  {
    id: 'F034',
    description: 'Total anticipo particular por item debe ser suma de EA006 * E711',
    tags: ['totales', 'anticipos', 'f034'],
    when: () => true,
    check: (doc) => {
      const expected = sumItemComponentByQuantity(
        doc,
        (item) => item.valorItem.valorRestaItem.anticipoParticularItem
      );
      return equalsCalculated(expected, getSubtotales(doc).totalAnticipoItem);
    },
    message: (doc) => {
      const expected = quantize(
        sumItemComponentByQuantity(
          doc,
          (item) => item.valorItem.valorRestaItem.anticipoParticularItem
        )
      );
      return `F034 inválido: totalAnticipoItem=${getSubtotales(doc).totalAnticipoItem}, esperado=${expected}.`;
    }
  },
  {
    id: 'F035',
    description: 'Total anticipo global por item debe ser suma de EA007 * E711',
    tags: ['totales', 'anticipos', 'f035'],
    when: () => true,
    check: (doc) => {
      const expected = sumItemComponentByQuantity(
        doc,
        (item) => item.valorItem.valorRestaItem.anticipoGlobalItem
      );
      return equalsCalculated(expected, getSubtotales(doc).totalAnticipoGlobal);
    },
    message: (doc) => {
      const expected = quantize(
        sumItemComponentByQuantity(doc, (item) => item.valorItem.valorRestaItem.anticipoGlobalItem)
      );
      return `F035 inválido: totalAnticipoGlobal=${getSubtotales(doc).totalAnticipoGlobal}, esperado=${expected}.`;
    }
  },
  {
    id: 'F011',
    description: 'Total descuentos debe ser F009 + F033',
    tags: ['totales', 'descuentos', 'f011'],
    when: () => true,
    check: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected = subtotales.totalDescuentoParticular.plus(subtotales.totalDescuentoGlobal);
      return equalsCalculated(expected, subtotales.totalDescuentosOperacion);
    },
    message: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected = quantize(
        subtotales.totalDescuentoParticular.plus(subtotales.totalDescuentoGlobal)
      );
      return `F011 inválido: totalDescuentosOperacion=${subtotales.totalDescuentosOperacion}, esperado=${expected}.`;
    }
  },
  {
    id: 'F012',
    description: 'Total anticipos debe ser F034 + F035',
    tags: ['totales', 'anticipos', 'f012'],
    when: () => true,
    check: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected = subtotales.totalAnticipoItem.plus(subtotales.totalAnticipoGlobal);
      return equalsCalculated(expected, subtotales.totalAnticiposOperacion);
    },
    message: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected = quantize(subtotales.totalAnticipoItem.plus(subtotales.totalAnticipoGlobal));
      return `F012 inválido: totalAnticiposOperacion=${subtotales.totalAnticiposOperacion}, esperado=${expected}.`;
    }
  },
  {
    id: 'F014',
    description: 'Total neto debe cumplir F008 - F011 - F012 - F013',
    tags: ['totales', 'neto', 'f014'],
    when: () => true,
    check: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected = subtotales.totalBrutoOperacion
        .minus(subtotales.totalDescuentosOperacion)
        .minus(subtotales.totalAnticiposOperacion)
        .minus(subtotales.redondeoOperacion);

      return equalsCalculated(expected, subtotales.totalNetoOperacion);
    },
    message: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected = quantize(
        subtotales.totalBrutoOperacion
          .minus(subtotales.totalDescuentosOperacion)
          .minus(subtotales.totalAnticiposOperacion)
          .minus(subtotales.redondeoOperacion)
      );
      return `F014 inválido: totalNetoOperacion=${subtotales.totalNetoOperacion}, esperado=${expected}.`;
    }
  },
  {
    id: 'F015',
    description: 'Liquidación IVA 5% es obligatoria cuando hay items gravados tasa 5',
    tags: ['totales', 'iva', 'f015', 'presencia'],
    when: (doc) => hasGravadoIvaRate(doc, 5),
    check: (doc) => getSubtotales(doc).liquidacionIva5 !== undefined,
    message: () => 'F015 requerido cuando existen items gravados con tasa IVA 5%.'
  },
  {
    id: 'F015a',
    description: 'Liquidación IVA 5% debe ser suma de E736 para tasa 5',
    tags: ['totales', 'iva', 'f015', 'formula'],
    when: (doc) => hasGravadoIvaRate(doc, 5) && getSubtotales(doc).liquidacionIva5 !== undefined,
    check: (doc) => {
      const expected = sumIvaLiquidacionByRate(doc, 5);
      return equalsCalculated(expected, valueOrZero(getSubtotales(doc).liquidacionIva5));
    },
    message: (doc) => {
      const expected = quantize(sumIvaLiquidacionByRate(doc, 5));
      return `F015a inválido: liquidacionIva5=${getSubtotales(doc).liquidacionIva5}, esperado=${expected}.`;
    }
  },
  {
    id: 'F016',
    description: 'Liquidación IVA 10% es obligatoria cuando hay items gravados tasa 10',
    tags: ['totales', 'iva', 'f016', 'presencia'],
    when: (doc) => hasGravadoIvaRate(doc, 10),
    check: (doc) => getSubtotales(doc).liquidacionIva10 !== undefined,
    message: () => 'F016 requerido cuando existen items gravados con tasa IVA 10%.'
  },
  {
    id: 'F016a',
    description: 'Liquidación IVA 10% debe ser suma de E736 para tasa 10',
    tags: ['totales', 'iva', 'f016', 'formula'],
    when: (doc) => hasGravadoIvaRate(doc, 10) && getSubtotales(doc).liquidacionIva10 !== undefined,
    check: (doc) => {
      const expected = sumIvaLiquidacionByRate(doc, 10);
      return equalsCalculated(expected, valueOrZero(getSubtotales(doc).liquidacionIva10));
    },
    message: (doc) => {
      const expected = quantize(sumIvaLiquidacionByRate(doc, 10));
      return `F016a inválido: liquidacionIva10=${getSubtotales(doc).liquidacionIva10}, esperado=${expected}.`;
    }
  },
  {
    id: 'F017',
    description: 'F017 es obligatorio cuando existe F015 y/o F016',
    tags: ['totales', 'iva', 'f017', 'presencia'],
    when: (doc) => {
      const subtotales = getSubtotales(doc);
      return subtotales.liquidacionIva5 !== undefined || subtotales.liquidacionIva10 !== undefined;
    },
    check: (doc) => getSubtotales(doc).liquidacionTotalIva !== undefined,
    message: () => 'F017 requerido cuando existe F015 y/o F016.'
  },
  {
    id: 'F017a',
    description: 'Total IVA debe cumplir F015 + F016',
    tags: ['totales', 'iva', 'f017', 'formula'],
    when: (doc) => getSubtotales(doc).liquidacionTotalIva !== undefined,
    check: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected = valueOrZero(subtotales.liquidacionIva5).plus(
        valueOrZero(subtotales.liquidacionIva10)
      );

      return equalsCalculated(expected, valueOrZero(subtotales.liquidacionTotalIva));
    },
    message: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected = quantize(
        valueOrZero(subtotales.liquidacionIva5).plus(valueOrZero(subtotales.liquidacionIva10))
      );
      return `F017a inválido: liquidacionTotalIva=${subtotales.liquidacionTotalIva}, esperado=${expected}.`;
    }
  },
  {
    id: 'F018',
    description: 'Total base gravada 5% es obligatorio cuando hay base gravada de items tasa 5',
    tags: ['totales', 'iva', 'f018', 'presencia'],
    when: (doc) => hasGravadoIvaRate(doc, 5),
    check: (doc) => getSubtotales(doc).totalBaseGravada5 !== undefined,
    message: () => 'F018 requerido cuando existen bases gravadas de items con tasa IVA 5%.'
  },
  {
    id: 'F018a',
    description: 'Total base gravada 5% debe ser suma de E735 para tasa 5',
    tags: ['totales', 'iva', 'f018', 'formula'],
    when: (doc) => hasGravadoIvaRate(doc, 5) && getSubtotales(doc).totalBaseGravada5 !== undefined,
    check: (doc) => {
      const expected = sumIvaBaseByRate(doc, 5);
      return equalsCalculated(expected, valueOrZero(getSubtotales(doc).totalBaseGravada5));
    },
    message: (doc) => {
      const expected = quantize(sumIvaBaseByRate(doc, 5));
      return `F018a inválido: totalBaseGravada5=${getSubtotales(doc).totalBaseGravada5}, esperado=${expected}.`;
    }
  },
  {
    id: 'F019',
    description: 'Total base gravada 10% es obligatorio cuando hay base gravada de items tasa 10',
    tags: ['totales', 'iva', 'f019', 'presencia'],
    when: (doc) => hasGravadoIvaRate(doc, 10),
    check: (doc) => getSubtotales(doc).totalBaseGravada10 !== undefined,
    message: () => 'F019 requerido cuando existen bases gravadas de items con tasa IVA 10%.'
  },
  {
    id: 'F019a',
    description: 'Total base gravada 10% debe ser suma de E735 para tasa 10',
    tags: ['totales', 'iva', 'f019', 'formula'],
    when: (doc) =>
      hasGravadoIvaRate(doc, 10) && getSubtotales(doc).totalBaseGravada10 !== undefined,
    check: (doc) => {
      const expected = sumIvaBaseByRate(doc, 10);
      return equalsCalculated(expected, valueOrZero(getSubtotales(doc).totalBaseGravada10));
    },
    message: (doc) => {
      const expected = quantize(sumIvaBaseByRate(doc, 10));
      return `F019a inválido: totalBaseGravada10=${getSubtotales(doc).totalBaseGravada10}, esperado=${expected}.`;
    }
  },
  {
    id: 'F020',
    description: 'F020 es obligatorio cuando existe F018 y/o F019',
    tags: ['totales', 'iva', 'f020', 'presencia'],
    when: (doc) => {
      const subtotales = getSubtotales(doc);
      return (
        subtotales.totalBaseGravada5 !== undefined || subtotales.totalBaseGravada10 !== undefined
      );
    },
    check: (doc) => getSubtotales(doc).totalBaseGravadaIva !== undefined,
    message: () => 'F020 requerido cuando existe F018 y/o F019.'
  },
  {
    id: 'F020a',
    description: 'Total base gravada IVA debe ser F018 + F019',
    tags: ['totales', 'iva', 'f020', 'formula'],
    when: (doc) => getSubtotales(doc).totalBaseGravadaIva !== undefined,
    check: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected = valueOrZero(subtotales.totalBaseGravada5).plus(
        valueOrZero(subtotales.totalBaseGravada10)
      );
      return equalsCalculated(expected, valueOrZero(subtotales.totalBaseGravadaIva));
    },
    message: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected = quantize(
        valueOrZero(subtotales.totalBaseGravada5).plus(valueOrZero(subtotales.totalBaseGravada10))
      );
      return `F020a inválido: totalBaseGravadaIva=${subtotales.totalBaseGravadaIva}, esperado=${expected}.`;
    }
  },
  {
    id: 'F023',
    description: 'F023 es obligatorio cuando la moneda de operación no es PYG',
    tags: ['moneda', 'f023', 'presencia'],
    when: (doc) => getMonedaOperacion(doc) !== 'PYG',
    check: (doc) => getSubtotales(doc).totalOperacionGs !== undefined,
    message: (doc) => `F023 requerido para moneda ${getMonedaOperacion(doc)}.`
  },
  {
    id: 'F023',
    description: 'F023 no debe existir cuando la moneda de operación es PYG',
    tags: ['moneda', 'f023', 'ausencia'],
    when: (doc) => getMonedaOperacion(doc) === 'PYG',
    check: (doc) => getSubtotales(doc).totalOperacionGs === undefined,
    message: () => 'F023 no debe informarse cuando la moneda de operación es PYG.'
  },
  {
    id: 'F023a',
    description: 'F023 con tipo de cambio global debe ser F014 * D018',
    tags: ['moneda', 'f023', 'tipo-cambio-global'],
    when: (doc) => {
      const subtotal = getSubtotales(doc).totalOperacionGs;
      return (
        getMonedaOperacion(doc) !== 'PYG' &&
        getCondicionTipoCambio(doc) === condicionTipoCambio.Global &&
        getTipoCambioOperacion(doc) !== undefined &&
        subtotal !== undefined
      );
    },
    check: (doc) => {
      const subtotales = getSubtotales(doc);
      const tipoCambio = getTipoCambioOperacion(doc)!;
      const expected = subtotales.totalNetoOperacion.times(tipoCambio);
      return equalsCalculated(expected, valueOrZero(subtotales.totalOperacionGs));
    },
    message: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected = quantize(subtotales.totalNetoOperacion.times(getTipoCambioOperacion(doc)!));
      return `F023a inválido: totalOperacionGs=${subtotales.totalOperacionGs}, esperado=${expected}.`;
    }
  },
  {
    id: 'F023b',
    description: 'F023 con tipo de cambio por item debe ser suma de EA009',
    tags: ['moneda', 'f023', 'tipo-cambio-por-item'],
    when: (doc) => {
      const totalOperacionGs = getSubtotales(doc).totalOperacionGs;
      return (
        getMonedaOperacion(doc) !== 'PYG' &&
        getCondicionTipoCambio(doc) === condicionTipoCambio.PorItem &&
        totalOperacionGs !== undefined
      );
    },
    check: (doc) => {
      const items = getItems(doc);
      if (
        items.some((item) => item.valorItem.valorRestaItem.valorTotalOperacionItemGs === undefined)
      ) {
        return false;
      }

      const expected = items.reduce((acc, item) => {
        return acc.plus(valueOrZero(item.valorItem.valorRestaItem.valorTotalOperacionItemGs));
      }, num(0));

      return equalsCalculated(expected, valueOrZero(getSubtotales(doc).totalOperacionGs));
    },
    message: (doc) => {
      const items = getItems(doc);
      const expected = quantize(
        items.reduce((acc, item) => {
          return acc.plus(valueOrZero(item.valorItem.valorRestaItem.valorTotalOperacionItemGs));
        }, num(0))
      );

      return `F023b inválido: totalOperacionGs=${getSubtotales(doc).totalOperacionGs}, esperado=${expected}.`;
    }
  }
];

function getOperacionImpuesto(doc: FacturaElectronica): number {
  return doc.datosGeneralesOperacion.operacionComercial.tipoImpuestoAfectado;
}

function isGravadoIvaForma(forma: number): boolean {
  return (
    forma === formaAfectacionTributariaIVA.Gravado ||
    forma === formaAfectacionTributariaIVA.GravadoParcial
  );
}

function hasGravadoIvaRate(doc: FacturaElectronica, rate: number): boolean {
  return getItems(doc).some(
    (item) =>
      item.ivaItem !== undefined &&
      isGravadoIvaForma(item.ivaItem.formaAfectacionTributariaIVA) &&
      item.ivaItem.tasaIva.eq(rate)
  );
}

function sumIvaLiquidacionByRate(doc: FacturaElectronica, rate: number): ReturnType<typeof num> {
  return getItems(doc).reduce((acc, item) => {
    if (
      item.ivaItem === undefined ||
      !isGravadoIvaForma(item.ivaItem.formaAfectacionTributariaIVA) ||
      !item.ivaItem.tasaIva.eq(rate)
    ) {
      return acc;
    }

    return acc.plus(item.ivaItem.liquidacionIvaItem);
  }, num(0));
}

function sumIvaBaseByRate(doc: FacturaElectronica, rate: number): ReturnType<typeof num> {
  return getItems(doc).reduce((acc, item) => {
    if (
      item.ivaItem === undefined ||
      !isGravadoIvaForma(item.ivaItem.formaAfectacionTributariaIVA) ||
      !item.ivaItem.tasaIva.eq(rate)
    ) {
      return acc;
    }

    return acc.plus(item.ivaItem.baseGravadaIvaItem);
  }, num(0));
}

function sumItemComponentByQuantity(
  doc: FacturaElectronica,
  picker: (
    item: FacturaElectronica['datosEspecificosPorTipoDE']['itemsOperacion'][number]
  ) => ReturnType<typeof num> | undefined
): ReturnType<typeof num> {
  return getItems(doc).reduce((acc, item) => {
    const component = picker(item);
    if (component === undefined) {
      return acc;
    }

    return acc.plus(component.times(item.cantidadProductoServicio));
  }, num(0));
}
