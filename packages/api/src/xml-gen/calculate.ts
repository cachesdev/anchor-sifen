import type { FacturaElectronica } from '../sifen/types';
import { condicionTipoCambio, formaAfectacionTributariaIVA } from '../sifen/types/enums';

const SCALE_GENERAL = 8;
const SCALE_REDONDEO = 4;

export type CalculateFieldsResult =
  | { ok: true; value: FacturaElectronica }
  | { ok: false; error: Error };

/** Genera un numero de 9 digitos enteros cryptograficamente aleatorio. */
function generateCodigoSeguridad(): number {
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);
  return (buffer[0]! % 900_000_000) + 100_000_000;
}

/**
 * Calcula el dígito verificador numérico para un RUC/CI alfanumérico
 * usando el algoritmo módulo 11.
 */
export function calcularDV(rucCi: string, baseMax = 11): number {
  let numeroExpandido = '';
  for (const char of rucCi) {
    const upper = char.toUpperCase();
    const code = upper.charCodeAt(0);
    if (code >= 48 && code <= 57) {
      numeroExpandido += upper;
    } else {
      numeroExpandido += code.toString();
    }
  }

  let k = 2;
  let total = 0;
  for (let i = numeroExpandido.length - 1; i >= 0; i--) {
    if (k > baseMax) k = 2;
    const digitValue = Number(numeroExpandido[i]);
    total += digitValue * k;
    k++;
  }

  const resto = total % 11;
  return resto > 1 ? 11 - resto : 0;
}

function quantize(value: number, decimals = SCALE_GENERAL): number {
  if (!Number.isFinite(value)) {
    throw new Error(`Valor numerico invalido en calculo: ${String(value)}.`);
  }

  return Number(value.toFixed(decimals));
}

function valueOrZero(value: number | undefined): number {
  return value ?? 0;
}

function normalizeRucForDv(rawRuc: string): string {
  const normalized = rawRuc.trim().toUpperCase();
  const separatorIndex = normalized.lastIndexOf('-');
  const withoutDv = separatorIndex > 0 ? normalized.slice(0, separatorIndex) : normalized;
  const compact = withoutDv.replace(/[^0-9A-Z]/g, '');

  if (!compact) {
    throw new Error(`No se pudo normalizar RUC para calcular DV: ${rawRuc}.`);
  }

  return compact;
}

function deriveNumericDvFromRuc(rawRuc?: string): number | undefined {
  if (!rawRuc) {
    return undefined;
  }

  return calcularDV(normalizeRucForDv(rawRuc));
}

function deriveStringDvFromRuc(rawRuc?: string): string | undefined {
  const dv = deriveNumericDvFromRuc(rawRuc);
  return dv !== undefined ? String(dv) : undefined;
}

function calculateRedondeo(totalBrutoOperacion: number, monedaOperacion: string): number {
  if (totalBrutoOperacion <= 0) {
    return 0;
  }

  if (monedaOperacion === 'PYG') {
    const rounded = Math.floor(totalBrutoOperacion / 50) * 50;
    return quantize(totalBrutoOperacion - rounded, SCALE_REDONDEO);
  }

  const rounded = Math.floor(totalBrutoOperacion * 2) / 2;
  return quantize(totalBrutoOperacion - rounded, SCALE_REDONDEO);
}

function applyOperacionDerivedFields(out: FacturaElectronica): void {
  if (out.operacionDE.codigoSeguridad === undefined) {
    out.operacionDE.codigoSeguridad = generateCodigoSeguridad();
  }
}

function applyDvDerivedFields(out: FacturaElectronica): void {
  const emisor = out.datosGeneralesOperacion.emisor;
  if (emisor.digitoVerificadorEmisor === undefined) {
    emisor.digitoVerificadorEmisor = deriveNumericDvFromRuc(emisor.rucEmisor);
  }

  const receptor = out.datosGeneralesOperacion.receptor;
  if (receptor.rucReceptor && receptor.digitoVerificadorReceptor === undefined) {
    receptor.digitoVerificadorReceptor = deriveNumericDvFromRuc(receptor.rucReceptor);
  }

  for (const pago of out.datosEspecificosPorTipoDE.condicionOperacion.pagoContadoEntregaInicial ??
    []) {
    const tarjeta = pago.pagoTarjetaCreditoDebito;
    if (!tarjeta?.rucProcesadoraTarjeta) {
      continue;
    }

    if (tarjeta.digitoVerificadorProcesadoraTarjeta === undefined) {
      tarjeta.digitoVerificadorProcesadoraTarjeta = deriveNumericDvFromRuc(
        tarjeta.rucProcesadoraTarjeta
      );
    }
  }

  const transportista = out.datosEspecificosPorTipoDE.transporte?.transportista;
  if (!transportista) {
    return;
  }

  if (
    transportista.rucTransportista &&
    transportista.digitoVerificadorRucTransportista === undefined
  ) {
    transportista.digitoVerificadorRucTransportista = deriveNumericDvFromRuc(
      transportista.rucTransportista
    );
  }

  if (transportista.rucAgente && transportista.digitoVerificadorRucAgente === undefined) {
    transportista.digitoVerificadorRucAgente = deriveStringDvFromRuc(transportista.rucAgente);
  }
}

function applyItemDerivedFields(out: FacturaElectronica): void {
  for (const item of out.datosEspecificosPorTipoDE.itemsOperacion) {
    const valorItem = item.valorItem;
    const valorRestaItem = valorItem.valorRestaItem;

    const cantidad = item.cantidadProductoServicio;
    const precioUnitario = valorItem.precioUnitario;

    valorItem.totalBrutoOperacionItem = quantize(precioUnitario * cantidad);

    const descuentoParticular = valueOrZero(valorRestaItem.descuentoParticularItem);
    const descuentoGlobal = valueOrZero(valorRestaItem.descuentoGlobalItem);
    const anticipoParticular = valueOrZero(valorRestaItem.anticipoParticularItem);
    const anticipoGlobal = valueOrZero(valorRestaItem.anticipoGlobalItem);

    if (valorRestaItem.porcentajeDescuentoItem === undefined) {
      valorRestaItem.porcentajeDescuentoItem =
        precioUnitario > 0 ? quantize((descuentoParticular * 100) / precioUnitario) : 0;
    }

    const totalOperacionItem =
      (precioUnitario -
        descuentoParticular -
        descuentoGlobal -
        anticipoParticular -
        anticipoGlobal) *
      cantidad;
    valorRestaItem.valorTotalOperacionItem = quantize(totalOperacionItem);

    if (valorRestaItem.valorTotalOperacionItemGs === undefined) {
      valorRestaItem.valorTotalOperacionItemGs =
        valorItem.tipoCambioItem !== undefined
          ? quantize(valorRestaItem.valorTotalOperacionItem * valorItem.tipoCambioItem)
          : undefined;
    }

    const ivaItem = item.ivaItem;
    if (!ivaItem) {
      continue;
    }

    const forma = ivaItem.formaAfectacionTributariaIVA;
    const proporcion = ivaItem.proporcionGravadaIva;
    const tasa = ivaItem.tasaIva;

    let baseGravada = 0;
    let liquidacion = 0;

    if (
      forma !== formaAfectacionTributariaIVA.Exonerado &&
      forma !== formaAfectacionTributariaIVA.Exento &&
      tasa > 0 &&
      proporcion > 0
    ) {
      const baseCalculo = quantize((valorRestaItem.valorTotalOperacionItem * proporcion) / 100);

      if (tasa === 10) {
        baseGravada = quantize(baseCalculo / 1.1);
      } else if (tasa === 5) {
        baseGravada = quantize(baseCalculo / 1.05);
      } else {
        baseGravada = quantize(baseCalculo / (1 + tasa / 100));
      }

      liquidacion = quantize((baseGravada * tasa) / 100);
    }

    if (ivaItem.baseGravadaIvaItem === undefined) {
      ivaItem.baseGravadaIvaItem = baseGravada;
    }
    if (ivaItem.liquidacionIvaItem === undefined) {
      ivaItem.liquidacionIvaItem = liquidacion;
    }
    if (ivaItem.baseExenta === undefined) {
      ivaItem.baseExenta = quantize(
        Math.max(0, valorRestaItem.valorTotalOperacionItem - baseGravada - liquidacion)
      );
    }
  }
}

function applySubtotalesDerivedFields(out: FacturaElectronica): void {
  const subtotales = out.subtotalesTotales;
  const operacionComercial = out.datosGeneralesOperacion.operacionComercial;

  let subtotalExenta = 0;
  let subtotalExonerada = 0;
  let subtotalIva5 = 0;
  let subtotalIva10 = 0;

  let totalBrutoOperacion = 0;
  let totalDescuentoParticular = 0;
  let totalDescuentoGlobal = 0;
  let totalAnticipoItem = 0;
  let totalAnticipoGlobal = 0;

  let liquidacionIva5 = 0;
  let liquidacionIva10 = 0;
  let totalBaseGravada5 = 0;
  let totalBaseGravada10 = 0;
  let totalOperacionGsPorItem = 0;

  let hasIva5 = false;
  let hasIva10 = false;
  let hasExenta = false;
  let hasExonerada = false;

  for (const item of out.datosEspecificosPorTipoDE.itemsOperacion) {
    const valorItem = item.valorItem;
    const valorRestaItem = valorItem.valorRestaItem;
    const valorTotalItem = valorRestaItem.valorTotalOperacionItem;

    totalBrutoOperacion += valorTotalItem;

    const cantidad = item.cantidadProductoServicio;
    totalDescuentoParticular += valueOrZero(valorRestaItem.descuentoParticularItem) * cantidad;
    totalDescuentoGlobal += valueOrZero(valorRestaItem.descuentoGlobalItem) * cantidad;
    totalAnticipoItem += valueOrZero(valorRestaItem.anticipoParticularItem) * cantidad;
    totalAnticipoGlobal += valueOrZero(valorRestaItem.anticipoGlobalItem) * cantidad;

    if (valorRestaItem.valorTotalOperacionItemGs !== undefined) {
      totalOperacionGsPorItem += valorRestaItem.valorTotalOperacionItemGs;
    } else if (valorItem.tipoCambioItem !== undefined) {
      totalOperacionGsPorItem += valorTotalItem * valorItem.tipoCambioItem;
    }

    const ivaItem = item.ivaItem;
    if (!ivaItem) {
      continue;
    }

    if (ivaItem.formaAfectacionTributariaIVA === formaAfectacionTributariaIVA.Exento) {
      hasExenta = true;
      subtotalExenta += valorTotalItem;
    }

    if (ivaItem.formaAfectacionTributariaIVA === formaAfectacionTributariaIVA.Exonerado) {
      hasExonerada = true;
      subtotalExonerada += valorTotalItem;
    }

    const isGravado =
      ivaItem.formaAfectacionTributariaIVA === formaAfectacionTributariaIVA.Gravado ||
      ivaItem.formaAfectacionTributariaIVA === formaAfectacionTributariaIVA.GravadoParcial;

    if (isGravado && ivaItem.tasaIva === 5) {
      hasIva5 = true;
      subtotalIva5 += valorTotalItem;
      liquidacionIva5 += ivaItem.liquidacionIvaItem;
      totalBaseGravada5 += ivaItem.baseGravadaIvaItem;
    }

    if (isGravado && ivaItem.tasaIva === 10) {
      hasIva10 = true;
      subtotalIva10 += valorTotalItem;
      liquidacionIva10 += ivaItem.liquidacionIvaItem;
      totalBaseGravada10 += ivaItem.baseGravadaIvaItem;
    }
  }

  totalBrutoOperacion = quantize(totalBrutoOperacion);
  totalDescuentoParticular = quantize(totalDescuentoParticular);
  totalDescuentoGlobal = quantize(totalDescuentoGlobal);
  totalAnticipoItem = quantize(totalAnticipoItem);
  totalAnticipoGlobal = quantize(totalAnticipoGlobal);

  if (subtotales.subtotalExenta === undefined) {
    subtotales.subtotalExenta = hasExenta ? quantize(subtotalExenta) : undefined;
  }
  if (subtotales.subtotalExonerada === undefined) {
    subtotales.subtotalExonerada = hasExonerada ? quantize(subtotalExonerada) : undefined;
  }
  if (subtotales.subtotalIva5 === undefined) {
    subtotales.subtotalIva5 = hasIva5 ? quantize(subtotalIva5) : undefined;
  }
  if (subtotales.subtotalIva10 === undefined) {
    subtotales.subtotalIva10 = hasIva10 ? quantize(subtotalIva10) : undefined;
  }

  subtotales.totalBrutoOperacion = totalBrutoOperacion;
  subtotales.totalDescuentoParticular = totalDescuentoParticular;
  subtotales.totalDescuentoGlobal = totalDescuentoGlobal;
  subtotales.totalAnticipoItem = totalAnticipoItem;
  subtotales.totalAnticipoGlobal = totalAnticipoGlobal;
  subtotales.porcentajeDescuentoGlobal =
    totalBrutoOperacion > 0 ? quantize((totalDescuentoGlobal * 100) / totalBrutoOperacion) : 0;
  subtotales.totalDescuentosOperacion = quantize(totalDescuentoParticular + totalDescuentoGlobal);
  subtotales.totalAnticiposOperacion = quantize(totalAnticipoItem + totalAnticipoGlobal);

  subtotales.redondeoOperacion = calculateRedondeo(
    totalBrutoOperacion,
    operacionComercial.monedaOperacion
  );

  const comisionOperacion = quantize(valueOrZero(subtotales.comisionOperacion));
  if (subtotales.comisionOperacion === undefined) {
    subtotales.comisionOperacion = comisionOperacion > 0 ? comisionOperacion : undefined;
  }

  subtotales.totalNetoOperacion = quantize(
    totalBrutoOperacion - subtotales.redondeoOperacion + comisionOperacion
  );

  const redondeo = subtotales.redondeoOperacion;
  let redondeoIva5 = 0;
  let redondeoIva10 = 0;

  if (redondeo > 0) {
    if (hasIva5 && hasIva10) {
      const totalSubIva =
        valueOrZero(subtotales.subtotalIva5) + valueOrZero(subtotales.subtotalIva10);
      if (totalSubIva > 0) {
        redondeoIva5 = quantize((redondeo * valueOrZero(subtotales.subtotalIva5)) / totalSubIva);
        redondeoIva10 = quantize(redondeo - redondeoIva5);
      }
    } else if (hasIva5) {
      redondeoIva5 = redondeo;
    } else if (hasIva10) {
      redondeoIva10 = redondeo;
    }
  }

  const liquidacionTotalIva5 = quantize((redondeoIva5 * 5) / 105);
  const liquidacionTotalIva10 = quantize((redondeoIva10 * 10) / 110);
  const liquidacionIvaComision =
    comisionOperacion > 0 ? quantize((comisionOperacion * 10) / 110) : 0;

  if (subtotales.liquidacionIva5 === undefined) {
    subtotales.liquidacionIva5 = hasIva5 ? quantize(liquidacionIva5) : undefined;
  }
  if (subtotales.liquidacionIva10 === undefined) {
    subtotales.liquidacionIva10 = hasIva10 ? quantize(liquidacionIva10) : undefined;
  }
  if (subtotales.liquidacionTotalIva5 === undefined) {
    subtotales.liquidacionTotalIva5 = redondeoIva5 > 0 ? liquidacionTotalIva5 : undefined;
  }
  if (subtotales.liquidacionTotalIva10 === undefined) {
    subtotales.liquidacionTotalIva10 = redondeoIva10 > 0 ? liquidacionTotalIva10 : undefined;
  }
  if (subtotales.liquidacionIvaComision === undefined) {
    subtotales.liquidacionIvaComision =
      liquidacionIvaComision > 0 ? liquidacionIvaComision : undefined;
  }

  const totalLiqIva = quantize(
    valueOrZero(subtotales.liquidacionIva5) +
      valueOrZero(subtotales.liquidacionIva10) -
      valueOrZero(subtotales.liquidacionTotalIva5) -
      valueOrZero(subtotales.liquidacionTotalIva10) +
      valueOrZero(subtotales.liquidacionIvaComision)
  );

  if (subtotales.liquidacionTotalIva === undefined) {
    subtotales.liquidacionTotalIva =
      hasIva5 || hasIva10 || liquidacionIvaComision > 0 ? totalLiqIva : undefined;
  }

  if (subtotales.totalBaseGravada5 === undefined) {
    subtotales.totalBaseGravada5 = hasIva5 ? quantize(totalBaseGravada5) : undefined;
  }
  if (subtotales.totalBaseGravada10 === undefined) {
    subtotales.totalBaseGravada10 = hasIva10 ? quantize(totalBaseGravada10) : undefined;
  }
  if (subtotales.totalBaseGravadaIva === undefined) {
    subtotales.totalBaseGravadaIva =
      hasIva5 || hasIva10
        ? quantize(
            valueOrZero(subtotales.totalBaseGravada5) + valueOrZero(subtotales.totalBaseGravada10)
          )
        : undefined;
  }

  if (operacionComercial.monedaOperacion === 'PYG') {
    return;
  }

  if (
    operacionComercial.condicionTipoCambio === condicionTipoCambio.Global &&
    operacionComercial.tipoCambioOperacion !== undefined
  ) {
    if (subtotales.totalOperacionGs === undefined) {
      subtotales.totalOperacionGs = quantize(
        subtotales.totalNetoOperacion * operacionComercial.tipoCambioOperacion
      );
    }
    return;
  }

  if (operacionComercial.condicionTipoCambio === condicionTipoCambio.PorItem) {
    if (subtotales.totalOperacionGs === undefined) {
      subtotales.totalOperacionGs = quantize(totalOperacionGsPorItem);
    }
    return;
  }

  if (subtotales.totalOperacionGs === undefined) {
    subtotales.totalOperacionGs =
      operacionComercial.tipoCambioOperacion !== undefined
        ? quantize(subtotales.totalNetoOperacion * operacionComercial.tipoCambioOperacion)
        : undefined;
  }
}

export function calculateFields(fe: FacturaElectronica): FacturaElectronica {
  const out = structuredClone(fe);

  applyOperacionDerivedFields(out);
  applyDvDerivedFields(out);
  applyItemDerivedFields(out);
  applySubtotalesDerivedFields(out);

  return out;
}

export function calculateFieldsResult(fe: FacturaElectronica): CalculateFieldsResult {
  try {
    return { ok: true, value: calculateFields(fe) };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error : new Error('Error desconocido durante calculo de campos.')
    };
  }
}
