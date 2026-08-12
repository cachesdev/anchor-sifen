import {
  condicionTipoCambio,
  formaAfectacionTributariaIVA,
  tipoImpuestoAfectado
} from '../../sifen/types';
import type { DEC } from '../../sifen/types';
import type { ItemOperacion } from '../../sifen/types/clean/e';
import type { OperacionComercial } from '../../sifen/types/clean/d';
import { Big, bigOrZero, ZERO } from '../big';
import { getItemsOperacion, getOperacionComercial } from './accessors';
import type { DerivationConfig } from './config';

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

export function applySubtotalesDerivedFields(out: DEC, config: DerivationConfig): void {
  if (!config.aplicaSubtotales) {
    return;
  }

  const operacionComercial = getOperacionComercial(out);
  const incluyeCamposIva = shouldDeriveIvaSubtotalFields(config, operacionComercial);
  const accumulation = accumulateItems(out, config.subtotalesIncluyeIva);
  const derived = deriveSubtotales(accumulation, out, config, incluyeCamposIva);
  applySubtotales(out, derived);
}

function accumulateItems(doc: DEC, acumulaAfectacionIva: boolean): ItemAccumulation {
  const acc = createEmptyItemAccumulation();

  const items = getItemsOperacion(doc);

  for (const item of items) {
    const valorItem = item.valorItem;
    if (!valorItem) {
      continue;
    }

    const valorRestaItem = valorItem.valorRestaItem;
    // MT v150, p. 89, campo EA008: valor total de la operacion por item
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

    if (acumulaAfectacionIva) {
      accumulateIva(acc, item.ivaItem, valorTotalItem);
    }
  }

  return acc;
}

function deriveSubtotales(
  acc: ItemAccumulation,
  doc: DEC,
  config: DerivationConfig,
  incluyeCamposIva: boolean
): DerivedSubtotales {
  const operacionComercial = getOperacionComercial(doc);
  const subtotalesExistentes = doc.subtotalesTotales;
  const comisionOperacion = config.aplicaComisionOperacion
    ? bigOrZero(subtotalesExistentes?.comisionOperacion)
    : ZERO;

  // MT v150, p. 102-103, campo F013 (dRedon):
  // Se realiza sobre el campo F008. Redondeo a multiplos de 50 guaranies
  // para PYG, o 50 centimos para monedas extranjeras.
  const redondeoOperacion = calculateRedondeo(
    acc.totalBrutoOperacion,
    operacionComercial?.monedaOperacion
  );

  const totalDescuentosOperacion = acc.totalDescuentoParticular.plus(acc.totalDescuentoGlobal);
  const totalAnticiposOperacion = acc.totalAnticipoItem.plus(acc.totalAnticipoGlobal);

  // MT v150, p. 104, campo F014 (dTotGralOpe):
  // Total Neto de la operacion: F008 - F013 + F025
  const totalNetoOperacion = acc.totalBrutoOperacion
    .minus(redondeoOperacion)
    .plus(comisionOperacion);

  const liquidacionIva5 = incluyeCamposIva && acc.hasIva5 ? acc.liquidacionIva5 : undefined;
  const liquidacionIva10 = incluyeCamposIva && acc.hasIva10 ? acc.liquidacionIva10 : undefined;
  const hasIva5Only = incluyeCamposIva && acc.hasIva5 && !acc.hasIva10;
  const hasIva10Only = incluyeCamposIva && acc.hasIva10 && !acc.hasIva5;

  // MT v150, p. 104, campos F036 y F037 (dLiqTotIVA5, dLiqTotIVA10):
  // Liquidacion total del IVA por redondeo.
  // Solo cuando la operacion tiene exclusivamente IVA 5% o 10%.
  const liquidacionIvaRedondeo5 =
    hasIva5Only && redondeoOperacion.gt(0) ? redondeoOperacion.times(5).div(105) : undefined;
  const liquidacionIvaRedondeo10 =
    hasIva10Only && redondeoOperacion.gt(0) ? redondeoOperacion.times(10).div(110) : undefined;

  // MT v150, p. 104, campo F026 (dIVAComi):
  // Liquidacion total del IVA de la comision. Se aplica la tasa del 10%.
  const liquidacionIvaComision =
    incluyeCamposIva && comisionOperacion.gt(0) ? comisionOperacion.times(10).div(110) : undefined;

  // MT v150, p. 104, campo F017 (dTotIVA):
  // Liquidacion total del IVA: F015 + F016 - F036 - F037 + F026
  const hasAnyIva = incluyeCamposIva && (acc.hasIva5 || acc.hasIva10);
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

  // MT v150, p. 105, campo F020 (dTBasGraIVA):
  // Total de la base gravada de IVA: F018 + F019
  const totalBaseGravadaIva = hasAnyIva
    ? bigOrZero(totalBaseGravada5).plus(bigOrZero(totalBaseGravada10))
    : undefined;

  return {
    subtotalExenta: config.subtotalesIncluyeIva && acc.hasExenta ? acc.subtotalExenta : undefined,
    subtotalExonerada:
      config.subtotalesIncluyeIva && acc.hasExonerada ? acc.subtotalExonerada : undefined,
    subtotalIva5: incluyeCamposIva && acc.hasIva5 ? acc.subtotalIva5 : undefined,
    subtotalIva10: incluyeCamposIva && acc.hasIva10 ? acc.subtotalIva10 : undefined,
    totalBrutoOperacion: deriveTotalBrutoOperacion(acc, config, incluyeCamposIva),
    totalDescuentoParticular: acc.totalDescuentoParticular,
    totalDescuentoGlobal: acc.totalDescuentoGlobal,
    totalAnticipoItem: acc.totalAnticipoItem,
    totalAnticipoGlobal: acc.totalAnticipoGlobal,
    totalDescuentosOperacion,
    totalAnticiposOperacion,
    redondeoOperacion,
    comisionOperacion: comisionOperacion.gt(0) ? comisionOperacion : undefined,
    totalNetoOperacion,
    liquidacionIva5,
    liquidacionIva10,
    liquidacionIvaRedondeo5: incluyeCamposIva ? liquidacionIvaRedondeo5 : undefined,
    liquidacionIvaRedondeo10: incluyeCamposIva ? liquidacionIvaRedondeo10 : undefined,
    liquidacionIvaComision: incluyeCamposIva ? liquidacionIvaComision : undefined,
    liquidacionTotalIva: incluyeCamposIva ? liquidacionTotalIva : undefined,
    totalBaseGravada5: incluyeCamposIva ? totalBaseGravada5 : undefined,
    totalBaseGravada10: incluyeCamposIva ? totalBaseGravada10 : undefined,
    totalBaseGravadaIva: incluyeCamposIva ? totalBaseGravadaIva : undefined,
    totalOperacionGs: deriveTotalOperacionGs(acc, operacionComercial, totalNetoOperacion, config)
  };
}

function deriveTotalBrutoOperacion(
  acc: ItemAccumulation,
  config: DerivationConfig,
  incluyeCamposIva: boolean
): Big {
  if (
    config.totalBrutoFormula === 'sumaSubtotales' &&
    config.subtotalesIncluyeIva &&
    (acc.hasExenta || acc.hasExonerada || (incluyeCamposIva && (acc.hasIva5 || acc.hasIva10)))
  ) {
    // MT v150, p. 103, F008 = F002 + F003 + F004 + F005 cuando existen
    // subtotales por afectacion. F002/F003 tambien aplican a Renta/Ninguno.
    return bigOrZero(acc.hasExenta ? acc.subtotalExenta : undefined)
      .plus(bigOrZero(acc.hasExonerada ? acc.subtotalExonerada : undefined))
      .plus(bigOrZero(incluyeCamposIva && acc.hasIva5 ? acc.subtotalIva5 : undefined))
      .plus(bigOrZero(incluyeCamposIva && acc.hasIva10 ? acc.subtotalIva10 : undefined));
  }

  return acc.totalBrutoOperacion;
}

function shouldDeriveIvaSubtotalFields(
  config: DerivationConfig,
  operacionComercial: OperacionComercial | undefined
): boolean {
  return (
    config.subtotalesIncluyeIva &&
    (operacionComercial?.tipoImpuestoAfectado === tipoImpuestoAfectado.IVA ||
      operacionComercial?.tipoImpuestoAfectado === tipoImpuestoAfectado.IVA_Renta)
  );
}

function applySubtotales(out: DEC, derived: DerivedSubtotales): void {
  const subtotales = out.subtotalesTotales;
  if (!subtotales) {
    return;
  }

  subtotales.subtotalExenta = derived.subtotalExenta;
  subtotales.subtotalExonerada = derived.subtotalExonerada;
  subtotales.subtotalIva5 = derived.subtotalIva5;
  subtotales.subtotalIva10 = derived.subtotalIva10;
  subtotales.totalBrutoOperacion = derived.totalBrutoOperacion;
  subtotales.totalDescuentoParticular = derived.totalDescuentoParticular;
  subtotales.totalDescuentoGlobal = derived.totalDescuentoGlobal;
  subtotales.totalAnticipoItem = derived.totalAnticipoItem;
  subtotales.totalAnticipoGlobal = derived.totalAnticipoGlobal;
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
      accumulateGravado(acc, ivaItem, totalItem, false);
      return;

    case formaAfectacionTributariaIVA.GravadoParcial:
      // NT-13, p. 2, campo F002: la base exenta (E737) del item
      // gravado parcial se suma al subtotal exenta.
      if (ivaItem.baseExenta.gt(0)) {
        acc.hasExenta = true;
        acc.subtotalExenta = acc.subtotalExenta.plus(ivaItem.baseExenta);
      }
      accumulateGravado(acc, ivaItem, totalItem, true);
      return;

    default:
      return;
  }
}

function calculateRedondeo(totalBrutoOperacion: Big, monedaOperacion?: string): Big {
  if (totalBrutoOperacion.lte(0)) {
    return ZERO;
  }

  if (monedaOperacion === 'PYG') {
    // MT v150, p. 102: Redondeo a multiplos de 50 guaranies.
    const rounded = totalBrutoOperacion.div(50).round(0, Big.roundDown).times(50);
    return totalBrutoOperacion.minus(rounded);
  }

  // MT v150, p. 102: Para monedas extranjeras, redondeo a 50 centimos.
  const rounded = totalBrutoOperacion.times(2).round(0, Big.roundDown).div(2);
  return totalBrutoOperacion.minus(rounded);
}

function deriveTotalOperacionGs(
  acc: ItemAccumulation,
  operacionComercial: OperacionComercial | undefined,
  totalNetoOperacion: Big,
  config: DerivationConfig
): Big | undefined {
  // MT v150, p. 105, campo F023 (dTotalGs):
  // Si C002 = 4 (AFE): F023 = F014
  if (config.totalGsFormula === 'igualF014') {
    return totalNetoOperacion;
  }

  if (!operacionComercial || operacionComercial.monedaOperacion === 'PYG') {
    return undefined;
  }

  // MT v150, p. 105: Si D017 = 1 (global): F014 * D018
  if (
    operacionComercial.condicionTipoCambio === condicionTipoCambio.Global &&
    operacionComercial.tipoCambioOperacion !== undefined
  ) {
    return totalNetoOperacion.times(operacionComercial.tipoCambioOperacion);
  }

  // MT v150, p. 105: Si D017 = 2 (por item): suma de todas las ocurrencias de EA009
  if (operacionComercial.condicionTipoCambio === condicionTipoCambio.PorItem) {
    return acc.totalOperacionGsPorItem;
  }

  return operacionComercial.tipoCambioOperacion !== undefined
    ? totalNetoOperacion.times(operacionComercial.tipoCambioOperacion)
    : undefined;
}

/**
 * Acumula valores de IVA para un item.
 *
 * Para Gravado (E731=1): el subtotal es EA008.
 * Para GravadoParcial (E731=4): el subtotal es (E735 + E736),
 * segun NT-13, p. 2, campos F004 y F005.
 */
function accumulateGravado(
  acc: ItemAccumulation,
  ivaItem: IvaItem,
  totalItem: Big,
  esParcial: boolean
): void {
  // NT-13, p. 2: para GravadoParcial, F004/F005 = E735 + E736
  const montoSubtotal = esParcial
    ? ivaItem.baseGravadaIvaItem.plus(ivaItem.liquidacionIvaItem)
    : totalItem;

  if (ivaItem.tasaIva === 5) {
    acc.hasIva5 = true;
    acc.subtotalIva5 = acc.subtotalIva5.plus(montoSubtotal);
    acc.liquidacionIva5 = acc.liquidacionIva5.plus(ivaItem.liquidacionIvaItem);
    acc.totalBaseGravada5 = acc.totalBaseGravada5.plus(ivaItem.baseGravadaIvaItem);
    return;
  }

  if (ivaItem.tasaIva === 10) {
    acc.hasIva10 = true;
    acc.subtotalIva10 = acc.subtotalIva10.plus(montoSubtotal);
    acc.liquidacionIva10 = acc.liquidacionIva10.plus(ivaItem.liquidacionIvaItem);
    acc.totalBaseGravada10 = acc.totalBaseGravada10.plus(ivaItem.baseGravadaIvaItem);
  }
}
