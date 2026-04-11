import { Big } from 'big.js';
import {
  condicionTipoCambio,
  formaAfectacionTributariaIVA,
  type FacturaElectronica
} from '../../sifen/types';
import { HUNDRED, quantizeRedondeo, ZERO } from './big';

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

interface RedondeoDistribution {
  iva5: Big;
  iva10: Big;
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
  liquidacionTotalIva5?: Big;
  liquidacionTotalIva10?: Big;
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

  for (const item of doc.datosEspecificosPorTipoDE.itemsOperacion) {
    const valorItem = item.valorItem;
    const valorRestaItem = valorItem.valorRestaItem;
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
  const operacionComercial = doc.datosGeneralesOperacion.operacionComercial;
  const comisionOperacion = bigOrZero(doc.subtotalesTotales.comisionOperacion);
  const comisionOperacionNormalizada = comisionOperacion.gt(0) ? comisionOperacion : ZERO;

  const redondeoOperacion = calculateRedondeo(
    acc.totalBrutoOperacion,
    operacionComercial.monedaOperacion
  );

  const totalDescuentosOperacion = acc.totalDescuentoParticular.plus(acc.totalDescuentoGlobal);
  const totalAnticiposOperacion = acc.totalAnticipoItem.plus(acc.totalAnticipoGlobal);
  const totalNetoOperacion = acc.totalBrutoOperacion
    .minus(totalDescuentosOperacion)
    .minus(totalAnticiposOperacion)
    .minus(redondeoOperacion);
  const redondeoDistribuido = distributeRedondeo(redondeoOperacion, acc);
  const liquidacionIva5 = acc.hasIva5 ? acc.liquidacionIva5 : undefined;
  const liquidacionIva10 = acc.hasIva10 ? acc.liquidacionIva10 : undefined;
  const liquidacionTotalIva5 = redondeoDistribuido.iva5.gt(0)
    ? redondeoDistribuido.iva5.times(5).div(105)
    : undefined;
  const liquidacionTotalIva10 = redondeoDistribuido.iva10.gt(0)
    ? redondeoDistribuido.iva10.times(10).div(110)
    : undefined;
  const liquidacionIvaComision = comisionOperacionNormalizada.gt(0)
    ? comisionOperacionNormalizada.times(10).div(110)
    : undefined;

  const hasAnyIva = acc.hasIva5 || acc.hasIva10;
  const liquidacionTotalIva = hasAnyIva
    ? bigOrZero(liquidacionIva5).plus(bigOrZero(liquidacionIva10))
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
    comisionOperacion: comisionOperacionNormalizada.gt(0)
      ? comisionOperacionNormalizada
      : undefined,
    totalNetoOperacion,
    liquidacionIva5,
    liquidacionIva10,
    liquidacionTotalIva5,
    liquidacionTotalIva10,
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
  subtotales.liquidacionTotalIva5 = derived.liquidacionTotalIva5;
  subtotales.liquidacionTotalIva10 = derived.liquidacionTotalIva10;
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
    return quantizeRedondeo(totalBrutoOperacion.minus(rounded));
  }

  const rounded = totalBrutoOperacion.times(2).round(0, Big.roundDown).div(2);
  return quantizeRedondeo(totalBrutoOperacion.minus(rounded));
}

function distributeRedondeo(redondeoOperacion: Big, acc: ItemAccumulation): RedondeoDistribution {
  if (redondeoOperacion.lte(0)) {
    return { iva5: ZERO, iva10: ZERO };
  }

  if (acc.hasIva5 && acc.hasIva10) {
    const totalSubIva = acc.subtotalIva5.plus(acc.subtotalIva10);
    if (totalSubIva.gt(0)) {
      const iva5 = redondeoOperacion.times(acc.subtotalIva5).div(totalSubIva);
      return {
        iva5,
        iva10: redondeoOperacion.minus(iva5)
      };
    }
  }

  if (acc.hasIva5) {
    return { iva5: redondeoOperacion, iva10: ZERO };
  }

  if (acc.hasIva10) {
    return { iva5: ZERO, iva10: redondeoOperacion };
  }

  return { iva5: ZERO, iva10: ZERO };
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
