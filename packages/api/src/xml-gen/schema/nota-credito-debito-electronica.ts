import * as v from 'valibot';
import type {
  DatosEspecificosPorTipoDE,
  NotaCreditoElectronica,
  NotaCreditoElectronicaInput,
  NotaDebitoElectronica,
  NotaDebitoElectronicaInput,
  OperacionComercial
} from '../../sifen/types';
import { toBig, toOptionalBig } from '../big';
import { clone } from '../clone';
import { trimStrings } from '../trim';
import { enumsSchema } from './schema';

type NotaElectronica = NotaCreditoElectronica | NotaDebitoElectronica;
type NotaElectronicaInput = NotaCreditoElectronicaInput | NotaDebitoElectronicaInput;
type NotaElectronicaType = NotaElectronica['tipoDE'];

function normalizeOperacionComercial(out: NotaElectronica): void {
  out.datosGeneralesOperacion.operacionComercial.tipoCambioOperacion = toOptionalBig(
    out.datosGeneralesOperacion.operacionComercial.tipoCambioOperacion
  );
}

function normalizeItem(
  item: NotaElectronica['datosEspecificosPorTipoDE']['itemsOperacion'][number]
): void {
  item.cantidadProductoServicio = toBig(item.cantidadProductoServicio);
  item.cantidadQuiebraMerma = toOptionalBig(item.cantidadQuiebraMerma);
  item.porcentajeQuiebraMerma = toOptionalBig(item.porcentajeQuiebraMerma);

  const valorItem = item.valorItem;
  valorItem.precioUnitario = toBig(valorItem.precioUnitario);
  valorItem.tipoCambioItem = toOptionalBig(valorItem.tipoCambioItem);
  valorItem.totalBrutoOperacionItem = toBig(0);

  const valorResta = valorItem.valorRestaItem;
  valorResta.descuentoParticularItem = toOptionalBig(valorResta.descuentoParticularItem);
  valorResta.descuentoGlobalItem = toBig(0);
  valorResta.anticipoParticularItem = toOptionalBig(valorResta.anticipoParticularItem);
  valorResta.anticipoGlobalItem = toOptionalBig(valorResta.anticipoGlobalItem);
  valorResta.porcentajeDescuentoItem = toBig(0);
  valorResta.valorTotalOperacionItem = toBig(0);
  valorResta.valorTotalOperacionItemGs = undefined;

  const vehiculo = item.vehiculoNuevo;
  if (vehiculo) {
    vehiculo.pesoNeto = toOptionalBig(vehiculo.pesoNeto);
    vehiculo.pesoBruto = toOptionalBig(vehiculo.pesoBruto);
    vehiculo.capacidadMaximaTraccion = toOptionalBig(vehiculo.capacidadMaximaTraccion);
  }

  if (!item.ivaItem) return;
  item.ivaItem.proporcionGravadaIva = toBig(item.ivaItem.proporcionGravadaIva);
  item.ivaItem.baseGravadaIvaItem = toBig(0);
  item.ivaItem.liquidacionIvaItem = toBig(0);
  item.ivaItem.baseExenta = toBig(0);
}

function normalizeUsosComerciales(out: NotaElectronica): void {
  const usos = out.datosEspecificosPorTipoDE.usosComerciales;
  if (!usos) return;

  if (usos.sectorEnergiaElectrica) {
    usos.sectorEnergiaElectrica.lecturaAnterior = toOptionalBig(
      usos.sectorEnergiaElectrica.lecturaAnterior
    );
    usos.sectorEnergiaElectrica.lecturaActual = toOptionalBig(
      usos.sectorEnergiaElectrica.lecturaActual
    );
    usos.sectorEnergiaElectrica.consumoKwh = toOptionalBig(usos.sectorEnergiaElectrica.consumoKwh);
  }

  for (const poliza of usos.sectorSeguros?.polizaSeguros ?? [])
    poliza.vigenciaPoliza = toBig(poliza.vigenciaPoliza);

  if (usos.sectorSupermercados) {
    usos.sectorSupermercados.efectivo = toOptionalBig(usos.sectorSupermercados.efectivo);
    usos.sectorSupermercados.vuelto = toOptionalBig(usos.sectorSupermercados.vuelto);
    usos.sectorSupermercados.montoDonacion = toOptionalBig(usos.sectorSupermercados.montoDonacion);
  }

  if (usos.datosAdicionalesUsoComercial)
    usos.datosAdicionalesUsoComercial.saldoAnterior = toOptionalBig(
      usos.datosAdicionalesUsoComercial.saldoAnterior
    );
}

function normalizeNotaElectronica(
  input: NotaElectronicaInput,
  tipoDE: NotaElectronicaType,
  tipoDocumento: 5 | 6
): NotaElectronica {
  const out = clone(input, 'input') as unknown as NotaElectronica;
  trimStrings(out);

  out.tipoDE = tipoDE;
  out.timbrado.tipoDocumento = tipoDocumento;
  out.digitoVerificadorId = 0;
  out.fechaFirma = new Date(0);
  out.operacionDE.codigoSeguridad = 0;
  normalizeOperacionComercial(out);
  (out.datosGeneralesOperacion.operacionComercial as OperacionComercial).tipoTransaccion =
    undefined;
  out.datosGeneralesOperacion.emisor.digitoVerificadorEmisor = 0;
  out.datosGeneralesOperacion.receptor.digitoVerificadorReceptor = undefined;

  const notaEspecificos = out.datosEspecificosPorTipoDE;
  const todosEspecificos = notaEspecificos as DatosEspecificosPorTipoDE;
  todosEspecificos.facturaElectronica = undefined;
  todosEspecificos.autofacturaElectronica = undefined;
  todosEspecificos.notaRemisionElectronica = undefined;
  todosEspecificos.condicionOperacion = undefined;
  todosEspecificos.transporte = undefined;

  for (const item of notaEspecificos.itemsOperacion) normalizeItem(item);
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
    porcentajeDescuentoGlobal: toBig(out.subtotalesTotales.porcentajeDescuentoGlobal ?? 0),
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

export function normalizeNotaCreditoElectronica(
  input: NotaCreditoElectronicaInput
): NotaCreditoElectronica {
  return normalizeNotaElectronica(input, 'NotaCreditoElectronica', 5) as NotaCreditoElectronica;
}

export function normalizeNotaDebitoElectronica(
  input: NotaDebitoElectronicaInput
): NotaDebitoElectronica {
  return normalizeNotaElectronica(input, 'NotaDebitoElectronica', 6) as NotaDebitoElectronica;
}

export const notaCreditoElectronicaSchema = v.pipe(
  enumsSchema,
  v.rawTransform(({ dataset, NEVER }) => {
    if (!dataset.typed) return NEVER;
    return normalizeNotaCreditoElectronica(dataset.value as unknown as NotaCreditoElectronicaInput);
  })
);

export const notaDebitoElectronicaSchema = v.pipe(
  enumsSchema,
  v.rawTransform(({ dataset, NEVER }) => {
    if (!dataset.typed) return NEVER;
    return normalizeNotaDebitoElectronica(dataset.value as unknown as NotaDebitoElectronicaInput);
  })
);
