import * as v from 'valibot';
import type { AutofacturaElectronicaDE, AutofacturaElectronicaInput } from '../../sifen/types';
import { toBig, toOptionalBig } from '../big';
import { enumsSchema } from './schema';

function normalizeOperacionComercial(out: AutofacturaElectronicaDE): void {
  out.datosGeneralesOperacion.operacionComercial.tipoCambioOperacion = toOptionalBig(
    out.datosGeneralesOperacion.operacionComercial.tipoCambioOperacion
  );
}

function normalizeCondicionOperacion(out: AutofacturaElectronicaDE): void {
  const co = out.datosEspecificosPorTipoDE.condicionOperacion;
  for (const pago of co.pagoContadoEntregaInicial ?? []) {
    pago.montoTipoPago = toBig(pago.montoTipoPago);
    pago.tipoCambioTipoPago = toOptionalBig(pago.tipoCambioTipoPago);
    if (pago.pagoTarjetaCreditoDebito)
      pago.pagoTarjetaCreditoDebito.digitoVerificadorProcesadoraTarjeta = undefined;
  }
}

function normalizeItem(
  item: AutofacturaElectronicaDE['datosEspecificosPorTipoDE']['itemsOperacion'][number]
): void {
  item.cantidadProductoServicio = toBig(item.cantidadProductoServicio);
  item.cantidadQuiebraMerma = toOptionalBig(item.cantidadQuiebraMerma);
  item.porcentajeQuiebraMerma = toOptionalBig(item.porcentajeQuiebraMerma);
  const vi = item.valorItem;
  vi.precioUnitario = toBig(vi.precioUnitario);
  vi.tipoCambioItem = toOptionalBig(vi.tipoCambioItem);
  vi.totalBrutoOperacionItem = toBig(0);
  const vr = vi.valorRestaItem;
  vr.descuentoParticularItem = undefined;
  vr.descuentoGlobalItem = undefined;
  vr.anticipoParticularItem = undefined;
  vr.anticipoGlobalItem = undefined;
  vr.porcentajeDescuentoItem = toBig(0);
  vr.valorTotalOperacionItem = toBig(0);
  vr.valorTotalOperacionItemGs = undefined;
  const vn = item.vehiculoNuevo;
  if (vn) {
    vn.pesoNeto = toOptionalBig(vn.pesoNeto);
    vn.pesoBruto = toOptionalBig(vn.pesoBruto);
    vn.capacidadMaximaTraccion = toOptionalBig(vn.capacidadMaximaTraccion);
  }
}

function normalizeUsosComerciales(out: AutofacturaElectronicaDE): void {
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

export function normalizeAutofacturaElectronica(
  input: AutofacturaElectronicaInput
): AutofacturaElectronicaDE {
  const out = structuredClone(input) as unknown as AutofacturaElectronicaDE;
  out.tipoDE = 'AutofacturaElectronica';
  out.timbrado.tipoDocumento = 4;
  out.digitoVerificadorId = 0;
  out.fechaFirma = new Date(0);
  out.operacionDE.codigoSeguridad = 0;
  normalizeOperacionComercial(out);
  out.datosGeneralesOperacion.emisor.digitoVerificadorEmisor = 0;
  out.datosGeneralesOperacion.receptor.digitoVerificadorReceptor = undefined;
  normalizeCondicionOperacion(out);
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
    comisionOperacion: toOptionalBig(out.subtotalesTotales?.comisionOperacion),
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

export const autofacturaElectronicaSchema = v.pipe(
  enumsSchema,
  v.rawTransform(({ dataset, NEVER }) => {
    if (!dataset.typed) return NEVER;
    return normalizeAutofacturaElectronica(dataset.value as unknown as AutofacturaElectronicaInput);
  })
);
