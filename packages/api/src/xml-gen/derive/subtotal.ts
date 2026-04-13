import { Big } from 'big.js';
import {
  condicionTipoCambio,
  formaAfectacionTributariaIVA,
  type FacturaElectronica
} from '../../sifen/types';
import { HUNDRED, ZERO } from './big';
import { getItemsOperacion, getOperacionComercial } from '../fe-accessors';

type OperacionComercial = FacturaElectronica['datosGeneralesOperacion']['operacionComercial'];
type ItemOperacion = FacturaElectronica['datosEspecificosPorTipoDE']['itemsOperacion'][number];
type IvaItem = NonNullable<ItemOperacion['ivaItem']>;

interface ItemAccumulation {
  totalBrutoOperacion: Big;
  totalDescuentoParticular: Big;
  totalDescuentoGlobal: Big;
  totalAnticipoItem: Big;
  totalAnticipoGlobal: Big;
  subtotalExenta: Big;
  subtotalExonerada: Big;
  subtotalIva5: Big;
  subtotalIva10: Big;
  liquidacionIva5: Big;
  liquidacionIva10: Big;
  totalBaseGravada5: Big;
  totalBaseGravada10: Big;
  totalOperacionGsPorItem: Big;
  hasIva5: boolean;
  hasIva10: boolean;
  hasExenta: boolean;
  hasExonerada: boolean;
}

interface DerivedSubtotales {
  subtotalExenta?: Big;
  subtotalExonerada?: Big;
  subtotalIva5?: Big;
  subtotalIva10?: Big;
  totalBrutoOperacion: Big;
  totalDescuentoParticular: Big;
  totalDescuentoGlobal: Big;
  totalAnticipoItem: Big;
  totalAnticipoGlobal: Big;
  porcentajeDescuentoGlobal: Big;
  totalDescuentosOperacion: Big;
  totalAnticiposOperacion: Big;
  redondeoOperacion: Big;
  comisionOperacion?: Big;
  totalNetoOperacion: Big;
  liquidacionIva5?: Big;
  liquidacionIva10?: Big;
  liquidacionIvaRedondeo5?: Big;
  liquidacionIvaRedondeo10?: Big;
  liquidacionIvaComision?: Big;
  liquidacionTotalIva?: Big;
  totalBaseGravada5?: Big;
  totalBaseGravada10?: Big;
  totalBaseGravadaIva?: Big;
  totalOperacionGs?: Big;
}

function bigOrZero(value: Big | undefined): Big {
  return value ?? ZERO;
}

export function applySubtotalesDerivedFields(out: FacturaElectronica): void {
  const accumulation = accumulateItems(out);
  const derived = deriveSubtotales(accumulation, out);
  applySubtotales(out, derived);
}

function accumulateItems(doc: FacturaElectronica): ItemAccumulation {
  const acc = createEmptyItemAccumulation();

  for (const item of getItemsOperacion(doc)) {
    const valorItem = item.valorItem;
    const valorRestaItem = valorItem.valorRestaItem;
    // EA008
    const valorTotalItem = valorRestaItem.valorTotalOperacionItem;
    const cantidad = item.cantidadProductoServicio;

    acc.totalBrutoOperacion = acc.totalBrutoOperacion.plus(valorTotalItem);
    acc.totalDescuentoParticular = acc.totalDescuentoParticular.plus(
      bigOrZero(valorRestaItem.descuentoParticularItem).times(cantidad)
    );
    acc.totalDescuentoGlobal = acc.totalDescuentoGlobal.plus(
      bigOrZero(valorRestaItem.descuentoGlobalItem).times(cantidad)
    );
    acc.totalAnticipoItem = acc.totalAnticipoItem.plus(
      bigOrZero(valorRestaItem.anticipoParticularItem).times(cantidad)
    );
    acc.totalAnticipoGlobal = acc.totalAnticipoGlobal.plus(
      bigOrZero(valorRestaItem.anticipoGlobalItem).times(cantidad)
    );

    if (valorRestaItem.valorTotalOperacionItemGs !== undefined) {
      acc.totalOperacionGsPorItem = acc.totalOperacionGsPorItem.plus(
        valorRestaItem.valorTotalOperacionItemGs
      );
    } else if (valorItem.tipoCambioItem !== undefined) {
      acc.totalOperacionGsPorItem = acc.totalOperacionGsPorItem.plus(
        valorTotalItem.times(valorItem.tipoCambioItem)
      );
    }

    accumulateIva(acc, item.ivaItem, valorTotalItem);
  }

  return acc;
}

function deriveSubtotales(acc: ItemAccumulation, doc: FacturaElectronica): DerivedSubtotales {
  const operacionComercial = getOperacionComercial(doc);
  const comisionOperacion = bigOrZero(doc.subtotalesTotales.comisionOperacion);

  const redondeoOperacion = calculateRedondeo(
    acc.totalBrutoOperacion,
    operacionComercial.monedaOperacion
  );

  const totalDescuentosOperacion = acc.totalDescuentoParticular.plus(acc.totalDescuentoGlobal);
  const totalAnticiposOperacion = acc.totalAnticipoItem.plus(acc.totalAnticipoGlobal);
  const totalNetoOperacion = acc.totalBrutoOperacion
    .minus(redondeoOperacion)
    .plus(comisionOperacion);
  const liquidacionIva5 = acc.hasIva5 ? acc.liquidacionIva5 : undefined;
  const liquidacionIva10 = acc.hasIva10 ? acc.liquidacionIva10 : undefined;
  const hasIva5Only = acc.hasIva5 && !acc.hasIva10;
  const hasIva10Only = acc.hasIva10 && !acc.hasIva5;
  const liquidacionIvaRedondeo5 =
    hasIva5Only && redondeoOperacion.gt(0) ? redondeoOperacion.times(5).div(105) : undefined;
  const liquidacionIvaRedondeo10 =
    hasIva10Only && redondeoOperacion.gt(0) ? redondeoOperacion.times(10).div(110) : undefined;
  const liquidacionIvaComision = comisionOperacion.gt(0)
    ? comisionOperacion.times(10).div(110)
    : undefined;

  const hasAnyIva = acc.hasIva5 || acc.hasIva10;
  const hasAnyLiquidacionIva =
    hasAnyIva ||
    liquidacionIvaRedondeo5 !== undefined ||
    liquidacionIvaRedondeo10 !== undefined ||
    liquidacionIvaComision !== undefined;
  const liquidacionTotalIva = hasAnyLiquidacionIva
    ? bigOrZero(liquidacionIva5)
        .plus(bigOrZero(liquidacionIva10))
        .minus(bigOrZero(liquidacionIvaRedondeo5))
        .minus(bigOrZero(liquidacionIvaRedondeo10))
        .plus(bigOrZero(liquidacionIvaComision))
    : undefined;

  const totalBaseGravada5 = acc.hasIva5 ? acc.totalBaseGravada5 : undefined;
  const totalBaseGravada10 = acc.hasIva10 ? acc.totalBaseGravada10 : undefined;
  const totalBaseGravadaIva = hasAnyIva
    ? bigOrZero(totalBaseGravada5).plus(bigOrZero(totalBaseGravada10))
    : undefined;

  return {
    subtotalExenta: acc.hasExenta ? acc.subtotalExenta : undefined,
    subtotalExonerada: acc.hasExonerada ? acc.subtotalExonerada : undefined,
    subtotalIva5: acc.hasIva5 ? acc.subtotalIva5 : undefined,
    subtotalIva10: acc.hasIva10 ? acc.subtotalIva10 : undefined,
    totalBrutoOperacion: acc.totalBrutoOperacion,
    totalDescuentoParticular: acc.totalDescuentoParticular,
    totalDescuentoGlobal: acc.totalDescuentoGlobal,
    totalAnticipoItem: acc.totalAnticipoItem,
    totalAnticipoGlobal: acc.totalAnticipoGlobal,
    porcentajeDescuentoGlobal: acc.totalBrutoOperacion.gt(0)
      ? acc.totalDescuentoGlobal.times(HUNDRED).div(acc.totalBrutoOperacion)
      : ZERO,
    totalDescuentosOperacion,
    totalAnticiposOperacion,
    redondeoOperacion,
    comisionOperacion: comisionOperacion.gt(0) ? comisionOperacion : undefined,
    totalNetoOperacion,
    liquidacionIva5,
    liquidacionIva10,
    liquidacionIvaRedondeo5,
    liquidacionIvaRedondeo10,
    liquidacionIvaComision,
    liquidacionTotalIva,
    totalBaseGravada5,
    totalBaseGravada10,
    totalBaseGravadaIva,
    totalOperacionGs: deriveTotalOperacionGs(acc, operacionComercial, totalNetoOperacion)
  };
}

function applySubtotales(out: FacturaElectronica, derived: DerivedSubtotales): void {
  const subtotales = out.subtotalesTotales;

  subtotales.subtotalExenta = derived.subtotalExenta;
  subtotales.subtotalExonerada = derived.subtotalExonerada;
  subtotales.subtotalIva5 = derived.subtotalIva5;
  subtotales.subtotalIva10 = derived.subtotalIva10;
  subtotales.totalBrutoOperacion = derived.totalBrutoOperacion;
  subtotales.totalDescuentoParticular = derived.totalDescuentoParticular;
  subtotales.totalDescuentoGlobal = derived.totalDescuentoGlobal;
  subtotales.totalAnticipoItem = derived.totalAnticipoItem;
  subtotales.totalAnticipoGlobal = derived.totalAnticipoGlobal;
  subtotales.porcentajeDescuentoGlobal = derived.porcentajeDescuentoGlobal;
  subtotales.totalDescuentosOperacion = derived.totalDescuentosOperacion;
  subtotales.totalAnticiposOperacion = derived.totalAnticiposOperacion;
  subtotales.redondeoOperacion = derived.redondeoOperacion;
  subtotales.comisionOperacion = derived.comisionOperacion;
  subtotales.totalNetoOperacion = derived.totalNetoOperacion;
  subtotales.liquidacionIva5 = derived.liquidacionIva5;
  subtotales.liquidacionIva10 = derived.liquidacionIva10;
  subtotales.liquidacionTotalIva5 = derived.liquidacionIvaRedondeo5;
  subtotales.liquidacionTotalIva10 = derived.liquidacionIvaRedondeo10;
  subtotales.liquidacionIvaComision = derived.liquidacionIvaComision;
  subtotales.liquidacionTotalIva = derived.liquidacionTotalIva;
  subtotales.totalBaseGravada5 = derived.totalBaseGravada5;
  subtotales.totalBaseGravada10 = derived.totalBaseGravada10;
  subtotales.totalBaseGravadaIva = derived.totalBaseGravadaIva;
  subtotales.totalOperacionGs = derived.totalOperacionGs;
}

function createEmptyItemAccumulation(): ItemAccumulation {
  return {
    totalBrutoOperacion: ZERO,
    totalDescuentoParticular: ZERO,
    totalDescuentoGlobal: ZERO,
    totalAnticipoItem: ZERO,
    totalAnticipoGlobal: ZERO,
    subtotalExenta: ZERO,
    subtotalExonerada: ZERO,
    subtotalIva5: ZERO,
    subtotalIva10: ZERO,
    liquidacionIva5: ZERO,
    liquidacionIva10: ZERO,
    totalBaseGravada5: ZERO,
    totalBaseGravada10: ZERO,
    totalOperacionGsPorItem: ZERO,
    hasIva5: false,
    hasIva10: false,
    hasExenta: false,
    hasExonerada: false
  };
}

function accumulateIva(
  acc: ItemAccumulation,
  ivaItem: ItemOperacion['ivaItem'],
  totalItem: Big
): void {
  if (!ivaItem) {
    return;
  }

  switch (ivaItem.formaAfectacionTributariaIVA) {
    case formaAfectacionTributariaIVA.Exento:
      acc.hasExenta = true;
      acc.subtotalExenta = acc.subtotalExenta.plus(totalItem);
      return;

    case formaAfectacionTributariaIVA.Exonerado:
      acc.hasExonerada = true;
      acc.subtotalExonerada = acc.subtotalExonerada.plus(totalItem);
      return;

    case formaAfectacionTributariaIVA.Gravado:
    case formaAfectacionTributariaIVA.GravadoParcial:
      accumulateGravado(acc, ivaItem, totalItem);
      return;

    default:
      return;
  }
}

function calculateRedondeo(totalBrutoOperacion: Big, monedaOperacion: string): Big {
  if (totalBrutoOperacion.lte(0)) {
    return ZERO;
  }

  if (monedaOperacion === 'PYG') {
    const rounded = totalBrutoOperacion.div(50).round(0, Big.roundDown).times(50);
    return totalBrutoOperacion.minus(rounded);
  }

  // FIXME: Segun manual tecnico se redondea a 50 centimos mas cercano, pero aparentemente esto tiene que funcionar con todas las monedas del XSD.
  const rounded = totalBrutoOperacion.times(2).round(0, Big.roundDown).div(2);
  return totalBrutoOperacion.minus(rounded);
}

function deriveTotalOperacionGs(
  acc: ItemAccumulation,
  operacionComercial: OperacionComercial,
  totalNetoOperacion: Big
): Big | undefined {
  if (operacionComercial.monedaOperacion === 'PYG') {
    return undefined;
  }

  if (
    operacionComercial.condicionTipoCambio === condicionTipoCambio.Global &&
    operacionComercial.tipoCambioOperacion !== undefined
  ) {
    return totalNetoOperacion.times(operacionComercial.tipoCambioOperacion);
  }

  if (operacionComercial.condicionTipoCambio === condicionTipoCambio.PorItem) {
    return acc.totalOperacionGsPorItem;
  }

  return operacionComercial.tipoCambioOperacion !== undefined
    ? totalNetoOperacion.times(operacionComercial.tipoCambioOperacion)
    : undefined;
}

function accumulateGravado(acc: ItemAccumulation, ivaItem: IvaItem, totalItem: Big): void {
  if (ivaItem.tasaIva.eq(5)) {
    acc.hasIva5 = true;
    acc.subtotalIva5 = acc.subtotalIva5.plus(totalItem);
    acc.liquidacionIva5 = acc.liquidacionIva5.plus(ivaItem.liquidacionIvaItem);
    acc.totalBaseGravada5 = acc.totalBaseGravada5.plus(ivaItem.baseGravadaIvaItem);
    return;
  }

  if (ivaItem.tasaIva.eq(10)) {
    acc.hasIva10 = true;
    acc.subtotalIva10 = acc.subtotalIva10.plus(totalItem);
    acc.liquidacionIva10 = acc.liquidacionIva10.plus(ivaItem.liquidacionIvaItem);
    acc.totalBaseGravada10 = acc.totalBaseGravada10.plus(ivaItem.baseGravadaIvaItem);
  }
}
