import * as v from 'valibot';
import type {
  DatosEspecificosPorTipoDE_FE_Input,
  DatosGeneralesOperacion_FE_Input,
  FacturaElectronica,
  FacturaElectronicaInput
} from '../../sifen/types';
import { toBig, toOptionalBig } from '../big';
import { emisorSchema, operacionComercialSchema, receptorSchema } from './d';
import { operacionDESchema, timbradoFESchema } from './de';
import {
  camposFacturaElectronicaSchema,
  condicionOperacionSchema,
  itemOperacionSchema,
  transporteSchema,
  usoComercialSchema
} from './e';
import { subtotalesTotalesSchema } from './f';
import { camposUsoGeneralSchema } from './g';
import { camposDocumentoElectronicoAsociadoSchema } from './h';

const datosGeneralesOperacionFESchema = v.object({
  fechaEmisionDE: v.date(),
  operacionComercial: operacionComercialSchema,
  emisor: emisorSchema,
  receptor: receptorSchema
}) satisfies v.GenericSchema<DatosGeneralesOperacion_FE_Input>;

const datosEspecificosPorTipoDESchema = v.object({
  facturaElectronica: camposFacturaElectronicaSchema,
  condicionOperacion: condicionOperacionSchema,
  itemsOperacion: v.array(itemOperacionSchema),
  usosComerciales: v.optional(usoComercialSchema),
  transporte: v.optional(transporteSchema)
}) satisfies v.GenericSchema<DatosEspecificosPorTipoDE_FE_Input>;

export const facturaElectronicaInputSchema = v.object({
  id_cdc: v.string(),
  operacionDE: operacionDESchema,
  timbrado: timbradoFESchema,
  datosGeneralesOperacion: datosGeneralesOperacionFESchema,
  datosEspecificosPorTipoDE: datosEspecificosPorTipoDESchema,
  subtotalesTotales: subtotalesTotalesSchema,
  camposUsoGeneral: v.optional(camposUsoGeneralSchema),
  camposDocumentoElectronicoAsociado: v.optional(camposDocumentoElectronicoAsociadoSchema)
}) satisfies v.GenericSchema<FacturaElectronicaInput>;

function normalizeOperacionComercial(out: FacturaElectronica): void {
  out.datosGeneralesOperacion.operacionComercial.tipoCambioOperacion = toOptionalBig(
    out.datosGeneralesOperacion.operacionComercial.tipoCambioOperacion
  );
}

function normalizeCondicionOperacion(out: FacturaElectronica): void {
  const condicionOperacion = out.datosEspecificosPorTipoDE.condicionOperacion;

  for (const pago of condicionOperacion.pagoContadoEntregaInicial ?? []) {
    pago.montoTipoPago = toBig(pago.montoTipoPago);
    pago.tipoCambioTipoPago = toOptionalBig(pago.tipoCambioTipoPago);

    if (pago.pagoTarjetaCreditoDebito) {
      pago.pagoTarjetaCreditoDebito.digitoVerificadorProcesadoraTarjeta = undefined;
    }
  }

  const pagoCredito = condicionOperacion.pagoCredito;
  if (!pagoCredito) {
    return;
  }

  pagoCredito.montoEntregaInicial = toOptionalBig(pagoCredito.montoEntregaInicial);

  for (const cuota of pagoCredito.cuotas ?? []) {
    cuota.montoCuota = toBig(cuota.montoCuota);
  }
}

function normalizeItem(
  item: FacturaElectronica['datosEspecificosPorTipoDE']['itemsOperacion'][number]
): void {
  item.cantidadProductoServicio = toBig(item.cantidadProductoServicio);
  item.cantidadQuiebraMerma = toOptionalBig(item.cantidadQuiebraMerma);
  item.porcentajeQuiebraMerma = toOptionalBig(item.porcentajeQuiebraMerma);

  const valorItem = item.valorItem;
  valorItem.precioUnitario = toBig(valorItem.precioUnitario);
  valorItem.tipoCambioItem = toOptionalBig(valorItem.tipoCambioItem);
  valorItem.totalBrutoOperacionItem = toBig(0);

  const valorRestaItem = valorItem.valorRestaItem;
  valorRestaItem.descuentoParticularItem = toOptionalBig(valorRestaItem.descuentoParticularItem);
  valorRestaItem.descuentoGlobalItem = toOptionalBig(valorRestaItem.descuentoGlobalItem);
  valorRestaItem.anticipoParticularItem = toOptionalBig(valorRestaItem.anticipoParticularItem);
  valorRestaItem.anticipoGlobalItem = toOptionalBig(valorRestaItem.anticipoGlobalItem);
  valorRestaItem.porcentajeDescuentoItem = toBig(0);
  valorRestaItem.valorTotalOperacionItem = toBig(0);
  valorRestaItem.valorTotalOperacionItemGs = undefined;

  const vehiculoNuevo = item.vehiculoNuevo;
  if (vehiculoNuevo) {
    vehiculoNuevo.pesoNeto = toOptionalBig(vehiculoNuevo.pesoNeto);
    vehiculoNuevo.pesoBruto = toOptionalBig(vehiculoNuevo.pesoBruto);
    vehiculoNuevo.capacidadMaximaTraccion = toOptionalBig(vehiculoNuevo.capacidadMaximaTraccion);
  }

  if (!item.ivaItem) {
    return;
  }

  item.ivaItem.proporcionGravadaIva = toBig(item.ivaItem.proporcionGravadaIva);
  item.ivaItem.baseGravadaIvaItem = toBig(0);
  item.ivaItem.liquidacionIvaItem = toBig(0);
  item.ivaItem.baseExenta = toBig(0);
}

function normalizeUsosComerciales(out: FacturaElectronica): void {
  const usosComerciales = out.datosEspecificosPorTipoDE.usosComerciales;
  if (!usosComerciales) {
    return;
  }

  const sectorEnergiaElectrica = usosComerciales.sectorEnergiaElectrica;
  if (sectorEnergiaElectrica) {
    sectorEnergiaElectrica.lecturaAnterior = toOptionalBig(sectorEnergiaElectrica.lecturaAnterior);
    sectorEnergiaElectrica.lecturaActual = toOptionalBig(sectorEnergiaElectrica.lecturaActual);
    sectorEnergiaElectrica.consumoKwh = toOptionalBig(sectorEnergiaElectrica.consumoKwh);
  }

  for (const poliza of usosComerciales.sectorSeguros?.polizaSeguros ?? []) {
    poliza.vigenciaPoliza = toBig(poliza.vigenciaPoliza);
  }

  const sectorSupermercados = usosComerciales.sectorSupermercados;
  if (sectorSupermercados) {
    sectorSupermercados.efectivo = toOptionalBig(sectorSupermercados.efectivo);
    sectorSupermercados.vuelto = toOptionalBig(sectorSupermercados.vuelto);
    sectorSupermercados.montoDonacion = toOptionalBig(sectorSupermercados.montoDonacion);
  }

  const datosAdicionalesUsoComercial = usosComerciales.datosAdicionalesUsoComercial;
  if (datosAdicionalesUsoComercial) {
    datosAdicionalesUsoComercial.saldoAnterior = toOptionalBig(
      datosAdicionalesUsoComercial.saldoAnterior
    );
  }
}

function normalizeTransportista(out: FacturaElectronica): void {
  const transportista = out.datosEspecificosPorTipoDE.transporte?.transportista;
  if (!transportista) {
    return;
  }

  transportista.digitoVerificadorRucTransportista = undefined;
  transportista.digitoVerificadorRucAgente = undefined;
}

function initializeSubtotales(out: FacturaElectronica): void {
  out.subtotalesTotales = {
    subtotalExenta: undefined,
    subtotalExonerada: undefined,
    subtotalIva5: undefined,
    subtotalIva10: undefined,
    totalBrutoOperacion: toBig(0),
    totalDescuentoParticular: toBig(0),
    totalDescuentoGlobal: toBig(0),
    totalAnticipoItem: toBig(0),
    totalAnticipoGlobal: toBig(0),
    porcentajeDescuentoGlobal: toBig(0),
    totalDescuentosOperacion: toBig(0),
    totalAnticiposOperacion: toBig(0),
    redondeoOperacion: toBig(0),
    comisionOperacion: toOptionalBig(out.subtotalesTotales.comisionOperacion),
    totalNetoOperacion: toBig(0),
    liquidacionIva5: undefined,
    liquidacionIva10: undefined,
    liquidacionTotalIva5: undefined,
    liquidacionTotalIva10: undefined,
    liquidacionIvaComision: undefined,
    liquidacionTotalIva: undefined,
    totalBaseGravada5: undefined,
    totalBaseGravada10: undefined,
    totalBaseGravadaIva: undefined,
    totalOperacionGs: undefined
  };
}

export function normalizeFacturaElectronica(input: FacturaElectronicaInput): FacturaElectronica {
  const out = structuredClone(input) as unknown as FacturaElectronica;

  out.digitoVerificadorId = 0;
  out.fechaFirma = new Date(0);
  out.operacionDE.codigoSeguridad = 0;

  normalizeOperacionComercial(out);

  out.datosGeneralesOperacion.emisor.digitoVerificadorEmisor = 0;
  out.datosGeneralesOperacion.receptor.digitoVerificadorReceptor = undefined;

  normalizeCondicionOperacion(out);
  normalizeTransportista(out);

  for (const item of out.datosEspecificosPorTipoDE.itemsOperacion) {
    normalizeItem(item);
  }

  normalizeUsosComerciales(out);
  initializeSubtotales(out);

  return out;
}

export const facturaElectronicaSchema = v.pipe(
  facturaElectronicaInputSchema,
  v.rawTransform(({ dataset, NEVER }) => {
    if (!dataset.typed) {
      return NEVER;
    }

    return normalizeFacturaElectronica(dataset.value);
  })
) satisfies v.GenericSchema<FacturaElectronicaInput, FacturaElectronica>;

type Assert<T extends true> = T;

// Checkea en tiempo de compilacion si hay type drift entre el schema de entrada y el tipo concreto.
type _CheckInput = Assert<
  [v.InferInput<typeof facturaElectronicaInputSchema>] extends [FacturaElectronicaInput]
    ? true
    : false
>;
declare const _: _CheckInput;

type _CheckOutput = Assert<
  [v.InferOutput<typeof facturaElectronicaSchema>] extends [FacturaElectronica] ? true : false
>;
declare const __: _CheckOutput;
