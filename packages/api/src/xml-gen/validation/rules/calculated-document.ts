import type { FacturaElectronica } from '../../../sifen/types';
import { condicionTipoCambio, tipoImpuestoAfectado } from '../../../sifen/types/enums';
import {
  getCondicionTipoCambio,
  getItems,
  getMonedaOperacion,
  getSubtotales,
  getTipoCambioOperacion
} from '../accessors';
import { equalsCalculated, quantize, valueOrZero } from '../math';
import type { ValidationRule } from '../types';

export const calculatedDocumentRules: ValidationRule<FacturaElectronica>[] = [
  {
    id: 'F011',
    description: 'Total descuentos debe ser F009 + F033',
    tags: ['totales', 'descuentos', 'f011'],
    when: () => true,
    check: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected = subtotales.totalDescuentoParticular + subtotales.totalDescuentoGlobal;
      return equalsCalculated(expected, subtotales.totalDescuentosOperacion);
    },
    message: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected = quantize(
        subtotales.totalDescuentoParticular + subtotales.totalDescuentoGlobal
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
      const expected = subtotales.totalAnticipoItem + subtotales.totalAnticipoGlobal;
      return equalsCalculated(expected, subtotales.totalAnticiposOperacion);
    },
    message: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected = quantize(subtotales.totalAnticipoItem + subtotales.totalAnticipoGlobal);
      return `F012 inválido: totalAnticiposOperacion=${subtotales.totalAnticiposOperacion}, esperado=${expected}.`;
    }
  },
  {
    id: 'F014',
    description: 'Total neto debe cumplir F008 - F013 + F025',
    tags: ['totales', 'neto', 'f014'],
    when: () => true,
    check: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected =
        subtotales.totalBrutoOperacion -
        subtotales.redondeoOperacion +
        valueOrZero(subtotales.comisionOperacion);
      return equalsCalculated(expected, subtotales.totalNetoOperacion);
    },
    message: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected = quantize(
        subtotales.totalBrutoOperacion -
          subtotales.redondeoOperacion +
          valueOrZero(subtotales.comisionOperacion)
      );
      return `F014 inválido: totalNetoOperacion=${subtotales.totalNetoOperacion}, esperado=${expected}.`;
    }
  },
  {
    id: 'F017',
    description: 'Total IVA debe cumplir F015 + F016 - F036 - F037 + F026',
    tags: ['totales', 'iva', 'f017'],
    when: (doc) => getSubtotales(doc).liquidacionTotalIva !== undefined,
    check: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected =
        valueOrZero(subtotales.liquidacionIva5) +
        valueOrZero(subtotales.liquidacionIva10) -
        valueOrZero(subtotales.liquidacionTotalIva5) -
        valueOrZero(subtotales.liquidacionTotalIva10) +
        valueOrZero(subtotales.liquidacionIvaComision);

      return equalsCalculated(expected, valueOrZero(subtotales.liquidacionTotalIva));
    },
    message: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected = quantize(
        valueOrZero(subtotales.liquidacionIva5) +
          valueOrZero(subtotales.liquidacionIva10) -
          valueOrZero(subtotales.liquidacionTotalIva5) -
          valueOrZero(subtotales.liquidacionTotalIva10) +
          valueOrZero(subtotales.liquidacionIvaComision)
      );
      return `F017 inválido: liquidacionTotalIva=${subtotales.liquidacionTotalIva}, esperado=${expected}.`;
    }
  },
  {
    id: 'F020',
    description: 'Total base gravada IVA debe ser F018 + F019',
    tags: ['totales', 'iva', 'f020'],
    when: (doc) => getSubtotales(doc).totalBaseGravadaIva !== undefined,
    check: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected =
        valueOrZero(subtotales.totalBaseGravada5) + valueOrZero(subtotales.totalBaseGravada10);
      return equalsCalculated(expected, valueOrZero(subtotales.totalBaseGravadaIva));
    },
    message: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected = quantize(
        valueOrZero(subtotales.totalBaseGravada5) + valueOrZero(subtotales.totalBaseGravada10)
      );
      return `F020 inválido: totalBaseGravadaIva=${subtotales.totalBaseGravadaIva}, esperado=${expected}.`;
    }
  },
  {
    id: 'F008',
    description: 'Total bruto debe sumar subtotales para impuestos IVA/Renta/Ninguno/IVA-Renta',
    tags: ['totales', 'f008', 'impuesto'],
    when: (doc) => getOperacionImpuesto(doc) !== tipoImpuestoAfectado.ISC,
    check: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected =
        valueOrZero(subtotales.subtotalExenta) +
        valueOrZero(subtotales.subtotalExonerada) +
        valueOrZero(subtotales.subtotalIva5) +
        valueOrZero(subtotales.subtotalIva10);
      return equalsCalculated(expected, subtotales.totalBrutoOperacion);
    },
    message: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected = quantize(
        valueOrZero(subtotales.subtotalExenta) +
          valueOrZero(subtotales.subtotalExonerada) +
          valueOrZero(subtotales.subtotalIva5) +
          valueOrZero(subtotales.subtotalIva10)
      );
      return `F008 inválido: totalBrutoOperacion=${subtotales.totalBrutoOperacion}, esperado=${expected}.`;
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
      const expected = subtotales.totalNetoOperacion * tipoCambio;
      return equalsCalculated(expected, valueOrZero(subtotales.totalOperacionGs));
    },
    message: (doc) => {
      const subtotales = getSubtotales(doc);
      const expected = quantize(subtotales.totalNetoOperacion * getTipoCambioOperacion(doc)!);
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

      const expected = items.reduce(
        (acc, item) => acc + valueOrZero(item.valorItem.valorRestaItem.valorTotalOperacionItemGs),
        0
      );

      return equalsCalculated(expected, valueOrZero(getSubtotales(doc).totalOperacionGs));
    },
    message: (doc) => {
      const items = getItems(doc);
      const expected = quantize(
        items.reduce(
          (acc, item) => acc + valueOrZero(item.valorItem.valorRestaItem.valorTotalOperacionItemGs),
          0
        )
      );

      return `F023b inválido: totalOperacionGs=${getSubtotales(doc).totalOperacionGs}, esperado=${expected}.`;
    }
  }
];

function getOperacionImpuesto(doc: FacturaElectronica): number {
  return doc.datosGeneralesOperacion.operacionComercial.tipoImpuestoAfectado;
}
