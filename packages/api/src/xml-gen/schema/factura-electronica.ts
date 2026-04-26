import * as v from 'valibot';
import type { FacturaElectronica, FacturaElectronicaInput } from '../../sifen/types';
import { toBig, toOptionalBig } from '../big';
import { operacionDEEnumSchema } from './de';
import { operacionComercialEnumSchema, emisorEnumSchema, receptorEnumSchema } from './d';
import {
  facturaElectronicaEnumSchema,
  condicionOperacionEnumSchema,
  itemOperacionEnumSchema,
  transporteEnumSchema
} from './e';
import { subtotalesTotalesEnumSchema } from './f';
import { camposUsoGeneralEnumSchema } from './g';
import { camposDocumentoElectronicoAsociadoEnumSchema } from './h';

const facturaElectronicaInputEnumSchema = v.looseObject({
  id_cdc: v.string(),
  operacionDE: operacionDEEnumSchema,
  timbrado: v.looseObject({}),
  datosGeneralesOperacion: v.looseObject({
    operacionComercial: v.optional(operacionComercialEnumSchema),
    emisor: emisorEnumSchema,
    receptor: receptorEnumSchema
  }),
  datosEspecificosPorTipoDE: v.looseObject({
    facturaElectronica: facturaElectronicaEnumSchema,
    condicionOperacion: v.optional(condicionOperacionEnumSchema),
    itemsOperacion: v.array(itemOperacionEnumSchema),
    transporte: v.optional(transporteEnumSchema)
  }),
  subtotalesTotales: subtotalesTotalesEnumSchema,
  camposUsoGeneral: v.optional(camposUsoGeneralEnumSchema),
  camposDocumentoElectronicoAsociado: v.optional(camposDocumentoElectronicoAsociadoEnumSchema)
});

function normalizeOperacionComercial(out: FacturaElectronica): void {
  out.datosGeneralesOperacion.operacionComercial.tipoCambioOperacion = toOptionalBig(
    out.datosGeneralesOperacion.operacionComercial.tipoCambioOperacion
  );
}

function normalizeCondicionOperacion(out: FacturaElectronica): void {
  const co = out.datosEspecificosPorTipoDE.condicionOperacion;
  for (const pago of co.pagoContadoEntregaInicial ?? []) {
    pago.montoTipoPago = toBig(pago.montoTipoPago);
    pago.tipoCambioTipoPago = toOptionalBig(pago.tipoCambioTipoPago);
    if (pago.pagoTarjetaCreditoDebito)
      pago.pagoTarjetaCreditoDebito.digitoVerificadorProcesadoraTarjeta = undefined;
  }
  const pc = co.pagoCredito;
  if (!pc) return;
  pc.montoEntregaInicial = toOptionalBig(pc.montoEntregaInicial);
  for (const cuota of pc.cuotas ?? []) cuota.montoCuota = toBig(cuota.montoCuota);
}

function normalizeItem(
  item: FacturaElectronica['datosEspecificosPorTipoDE']['itemsOperacion'][number]
): void {
  item.cantidadProductoServicio = toBig(item.cantidadProductoServicio);
  item.cantidadQuiebraMerma = toOptionalBig(item.cantidadQuiebraMerma);
  item.porcentajeQuiebraMerma = toOptionalBig(item.porcentajeQuiebraMerma);
  const vi = item.valorItem;
  vi.precioUnitario = toBig(vi.precioUnitario);
  vi.tipoCambioItem = toOptionalBig(vi.tipoCambioItem);
  vi.totalBrutoOperacionItem = toBig(0);
  const vr = vi.valorRestaItem;
  vr.descuentoParticularItem = toOptionalBig(vr.descuentoParticularItem);
  vr.descuentoGlobalItem = toOptionalBig(vr.descuentoGlobalItem);
  vr.anticipoParticularItem = toOptionalBig(vr.anticipoParticularItem);
  vr.anticipoGlobalItem = toOptionalBig(vr.anticipoGlobalItem);
  vr.porcentajeDescuentoItem = toBig(0);
  vr.valorTotalOperacionItem = toBig(0);
  vr.valorTotalOperacionItemGs = undefined;
  const vn = item.vehiculoNuevo;
  if (vn) {
    vn.pesoNeto = toOptionalBig(vn.pesoNeto);
    vn.pesoBruto = toOptionalBig(vn.pesoBruto);
    vn.capacidadMaximaTraccion = toOptionalBig(vn.capacidadMaximaTraccion);
  }
  if (!item.ivaItem) return;
  item.ivaItem.proporcionGravadaIva = toBig(item.ivaItem.proporcionGravadaIva);
  item.ivaItem.baseGravadaIvaItem = toBig(0);
  item.ivaItem.liquidacionIvaItem = toBig(0);
  item.ivaItem.baseExenta = toBig(0);
}

function normalizeUsosComerciales(out: FacturaElectronica): void {
  const uc = out.datosEspecificosPorTipoDE.usosComerciales;
  if (!uc) return;
  if (uc.sectorEnergiaElectrica) {
    const se = uc.sectorEnergiaElectrica;
    se.lecturaAnterior = toOptionalBig(se.lecturaAnterior);
    se.lecturaActual = toOptionalBig(se.lecturaActual);
    se.consumoKwh = toOptionalBig(se.consumoKwh);
  }
  for (const p of uc.sectorSeguros?.polizaSeguros ?? []) p.vigenciaPoliza = toBig(p.vigenciaPoliza);
  if (uc.sectorSupermercados) {
    const ss = uc.sectorSupermercados;
    ss.efectivo = toOptionalBig(ss.efectivo);
    ss.vuelto = toOptionalBig(ss.vuelto);
    ss.montoDonacion = toOptionalBig(ss.montoDonacion);
  }
  if (uc.datosAdicionalesUsoComercial)
    uc.datosAdicionalesUsoComercial.saldoAnterior = toOptionalBig(
      uc.datosAdicionalesUsoComercial.saldoAnterior
    );
}

function normalizeTransportista(out: FacturaElectronica): void {
  const t = out.datosEspecificosPorTipoDE.transporte?.transportista;
  if (!t) return;
  t.digitoVerificadorRucTransportista = undefined;
  t.digitoVerificadorRucAgente = undefined;
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
  for (const item of out.datosEspecificosPorTipoDE.itemsOperacion) normalizeItem(item);
  normalizeUsosComerciales(out);
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
  return out;
}

export const facturaElectronicaSchema = v.pipe(
  facturaElectronicaInputEnumSchema,
  v.rawTransform(({ dataset, NEVER }) => {
    if (!dataset.typed) return NEVER;
    return normalizeFacturaElectronica(dataset.value as FacturaElectronicaInput);
  })
);
