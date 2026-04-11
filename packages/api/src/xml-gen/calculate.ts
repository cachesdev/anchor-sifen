import { Big } from 'big.js';
import { Err, Ok, type Result } from '../result';
import type { FacturaElectronica } from '../sifen/types';
import { condicionTipoCambio, formaAfectacionTributariaIVA } from '../sifen/types/enums';
import { XMLGenCalculationError } from './errors';
import { getEmisor, getReceptor, getTransportista } from './fe-accessors';
import { calcularDv, extraerRuc } from './ruc';

const SCALE_GENERAL = 8;
const SCALE_REDONDEO = 4;

function num(value: number): Big {
  return new Big(value);
}

const ZERO = num(0);
const ONE = num(1);
const HUNDRED = num(100);

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

/** Genera un numero de 9 digitos enteros cryptograficamente aleatorio. */
function generateCodigoSeguridad(): number {
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);
  return (buffer[0]! % 900_000_000) + 100_000_000;
}

function quantizeGeneral(value: Big): Big {
  return value.round(SCALE_GENERAL, Big.roundHalfUp);
}

function quantizeRedondeo(value: Big): Big {
  return value.round(SCALE_REDONDEO, Big.roundHalfUp);
}

function bigOrZero(value: Big | undefined): Big {
  return value ?? ZERO;
}

/**
 * Deriva DV manejando campos opcionales. en caso de que el ruc sea indefinido,
 * retornamos undefined.
 */
function deriveDv(rawRuc: string): number;
function deriveDv(rawRuc?: string): number | undefined;
function deriveDv(rawRuc?: string): number | undefined {
  if (!rawRuc) {
    return undefined;
  }

  return calcularDv(extraerRuc(rawRuc));
}

function deriveDvString(rawRuc?: string): string | undefined {
  const dv = deriveDv(rawRuc);
  return dv !== undefined ? String(dv) : undefined;
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

/** Deriva campos calculables base */
function applyBaseDerivedFields(out: FacturaElectronica): void {
  const parsed = Number.parseInt(out.id_cdc.slice(-1), 10);
  if (Number.isNaN(parsed)) {
    throw new Error('No se pudo derivar digito verificador del CDC.');
  }

  out.digitoVerificadorId = parsed;
  out.fechaFirma = new Date();
}

/** Deriva campos relacionados con operacionDE */
function applyOperacionDerivedFields(out: FacturaElectronica): void {
  out.operacionDE.codigoSeguridad = generateCodigoSeguridad();
}

/** Deriva todos los digitos verificadores */
function applyDvDerivedFields(out: FacturaElectronica): void {
  const emisor = getEmisor(out);
  emisor.digitoVerificadorEmisor = deriveDv(emisor.rucEmisor);

  const receptor = getReceptor(out);
  if (receptor.rucReceptor) {
    receptor.digitoVerificadorReceptor = deriveDv(receptor.rucReceptor);
  }

  for (const pago of out.datosEspecificosPorTipoDE.condicionOperacion.pagoContadoEntregaInicial ??
    []) {
    const tarjeta = pago.pagoTarjetaCreditoDebito;
    if (!tarjeta?.rucProcesadoraTarjeta) {
      continue;
    }

    tarjeta.digitoVerificadorProcesadoraTarjeta = deriveDv(tarjeta.rucProcesadoraTarjeta);
  }

  const transportista = getTransportista(out);
  if (!transportista) {
    return;
  }

  if (transportista.rucTransportista) {
    transportista.digitoVerificadorRucTransportista = deriveDv(transportista.rucTransportista);
  }

  if (transportista.rucAgente) {
    transportista.digitoVerificadorRucAgente = deriveDvString(transportista.rucAgente);
  }
}

function applyItemDerivedFields(out: FacturaElectronica): void {
  for (const item of out.datosEspecificosPorTipoDE.itemsOperacion) {
    const valorItem = item.valorItem;
    const valorRestaItem = valorItem.valorRestaItem;

    const cantidad = item.cantidadProductoServicio;
    const precioUnitario = valorItem.precioUnitario;

    const totalBrutoOperacionItem = quantizeGeneral(precioUnitario.times(cantidad));
    valorItem.totalBrutoOperacionItem = totalBrutoOperacionItem;

    const descuentoParticular = bigOrZero(valorRestaItem.descuentoParticularItem);
    const descuentoGlobal = bigOrZero(valorRestaItem.descuentoGlobalItem);
    const anticipoParticular = bigOrZero(valorRestaItem.anticipoParticularItem);
    const anticipoGlobal = bigOrZero(valorRestaItem.anticipoGlobalItem);

    valorRestaItem.porcentajeDescuentoItem = quantizeGeneral(
      precioUnitario.gt(0) ? descuentoParticular.times(HUNDRED).div(precioUnitario) : ZERO
    );

    const totalOperacionItem = quantizeGeneral(
      precioUnitario
        .minus(descuentoParticular)
        .minus(descuentoGlobal)
        .minus(anticipoParticular)
        .minus(anticipoGlobal)
        .times(cantidad)
    );

    valorRestaItem.valorTotalOperacionItem = totalOperacionItem;
    valorRestaItem.valorTotalOperacionItemGs =
      valorItem.tipoCambioItem !== undefined
        ? quantizeGeneral(totalOperacionItem.times(valorItem.tipoCambioItem))
        : undefined;

    const ivaItem = item.ivaItem;
    if (!ivaItem) {
      continue;
    }

    const forma = ivaItem.formaAfectacionTributariaIVA;
    const proporcion = ivaItem.proporcionGravadaIva;
    const tasa = ivaItem.tasaIva;

    let baseGravada = ZERO;
    let liquidacion = ZERO;

    if (
      forma !== formaAfectacionTributariaIVA.Exonerado &&
      forma !== formaAfectacionTributariaIVA.Exento &&
      tasa.gt(0) &&
      proporcion.gt(0)
    ) {
      const baseCalculo = totalOperacionItem.times(proporcion).div(HUNDRED);

      if (tasa.eq(10)) {
        baseGravada = baseCalculo.div(1.1);
      } else if (tasa.eq(5)) {
        baseGravada = baseCalculo.div(1.05);
      } else {
        baseGravada = baseCalculo.div(ONE.plus(tasa.div(HUNDRED)));
      }

      liquidacion = baseGravada.times(tasa).div(HUNDRED);
    }

    ivaItem.baseGravadaIvaItem = quantizeGeneral(baseGravada);
    ivaItem.liquidacionIvaItem = quantizeGeneral(liquidacion);
    const baseExenta = totalOperacionItem.minus(baseGravada).minus(liquidacion);
    ivaItem.baseExenta = quantizeGeneral(baseExenta.gt(0) ? baseExenta : ZERO);
  }
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
    return quantizeGeneral(totalNetoOperacion.times(operacionComercial.tipoCambioOperacion));
  }

  if (operacionComercial.condicionTipoCambio === condicionTipoCambio.PorItem) {
    return quantizeGeneral(acc.totalOperacionGsPorItem);
  }

  return operacionComercial.tipoCambioOperacion !== undefined
    ? quantizeGeneral(totalNetoOperacion.times(operacionComercial.tipoCambioOperacion))
    : undefined;
}

function deriveSubtotales(acc: ItemAccumulation, doc: FacturaElectronica): DerivedSubtotales {
  const operacionComercial = doc.datosGeneralesOperacion.operacionComercial;
  const comisionOperacion = bigOrZero(doc.subtotalesTotales.comisionOperacion);
  const comisionOperacionNormalizada = comisionOperacion.gt(0)
    ? quantizeGeneral(comisionOperacion)
    : ZERO;

  const redondeoOperacion = calculateRedondeo(
    acc.totalBrutoOperacion,
    operacionComercial.monedaOperacion
  );

  const totalDescuentosOperacion = quantizeGeneral(
    acc.totalDescuentoParticular.plus(acc.totalDescuentoGlobal)
  );
  const totalAnticiposOperacion = quantizeGeneral(
    acc.totalAnticipoItem.plus(acc.totalAnticipoGlobal)
  );

  const totalNetoOperacion = quantizeGeneral(
    acc.totalBrutoOperacion
      .minus(totalDescuentosOperacion)
      .minus(totalAnticiposOperacion)
      .minus(redondeoOperacion)
  );

  const redondeoDistribuido = distributeRedondeo(redondeoOperacion, acc);
  const liquidacionIva5 = acc.hasIva5 ? quantizeGeneral(acc.liquidacionIva5) : undefined;
  const liquidacionIva10 = acc.hasIva10 ? quantizeGeneral(acc.liquidacionIva10) : undefined;
  const liquidacionTotalIva5 = redondeoDistribuido.iva5.gt(0)
    ? quantizeGeneral(redondeoDistribuido.iva5.times(5).div(105))
    : undefined;
  const liquidacionTotalIva10 = redondeoDistribuido.iva10.gt(0)
    ? quantizeGeneral(redondeoDistribuido.iva10.times(10).div(110))
    : undefined;
  const liquidacionIvaComision = comisionOperacionNormalizada.gt(0)
    ? quantizeGeneral(comisionOperacionNormalizada.times(10).div(110))
    : undefined;

  const hasAnyIva = acc.hasIva5 || acc.hasIva10;
  const liquidacionTotalIva = hasAnyIva
    ? quantizeGeneral(bigOrZero(liquidacionIva5).plus(bigOrZero(liquidacionIva10)))
    : undefined;

  const totalBaseGravada5 = acc.hasIva5 ? quantizeGeneral(acc.totalBaseGravada5) : undefined;
  const totalBaseGravada10 = acc.hasIva10 ? quantizeGeneral(acc.totalBaseGravada10) : undefined;
  const totalBaseGravadaIva = hasAnyIva
    ? quantizeGeneral(bigOrZero(totalBaseGravada5).plus(bigOrZero(totalBaseGravada10)))
    : undefined;

  return {
    subtotalExenta: acc.hasExenta ? quantizeGeneral(acc.subtotalExenta) : undefined,
    subtotalExonerada: acc.hasExonerada ? quantizeGeneral(acc.subtotalExonerada) : undefined,
    subtotalIva5: acc.hasIva5 ? quantizeGeneral(acc.subtotalIva5) : undefined,
    subtotalIva10: acc.hasIva10 ? quantizeGeneral(acc.subtotalIva10) : undefined,
    totalBrutoOperacion: quantizeGeneral(acc.totalBrutoOperacion),
    totalDescuentoParticular: quantizeGeneral(acc.totalDescuentoParticular),
    totalDescuentoGlobal: quantizeGeneral(acc.totalDescuentoGlobal),
    totalAnticipoItem: quantizeGeneral(acc.totalAnticipoItem),
    totalAnticipoGlobal: quantizeGeneral(acc.totalAnticipoGlobal),
    porcentajeDescuentoGlobal: acc.totalBrutoOperacion.gt(0)
      ? quantizeGeneral(acc.totalDescuentoGlobal.times(HUNDRED).div(acc.totalBrutoOperacion))
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

function applySubtotalesDerivedFields(out: FacturaElectronica): void {
  const accumulation = accumulateItems(out);
  const derived = deriveSubtotales(accumulation, out);
  applySubtotales(out, derived);
}

/**
 * Orden de cálculo explícito:
 * 1) Cabecera (DV de CDC y fecha de firma)
 * 2) Operación DE (codigo de seguridad)
 * 3) DV de RUC relacionados
 * 4) Derivaciones a nivel item
 * 5) Subtotales y totales (accumulate -> derive -> apply)
 */
export function calculateFields(fe: FacturaElectronica): FacturaElectronica {
  const out = structuredClone(fe);

  applyBaseDerivedFields(out);
  applyOperacionDerivedFields(out);
  applyDvDerivedFields(out);
  applyItemDerivedFields(out);
  applySubtotalesDerivedFields(out);

  return out;
}

export function calculateFieldsResult(
  fe: FacturaElectronica
): Result<FacturaElectronica, XMLGenCalculationError> {
  try {
    return Ok(calculateFields(fe));
  } catch (error) {
    const details =
      error instanceof Error ? error.message : 'Error desconocido durante calculo de campos.';

    return Err(
      new XMLGenCalculationError({
        details,
        cause: error instanceof Error ? error : undefined
      })
    );
  }
}
