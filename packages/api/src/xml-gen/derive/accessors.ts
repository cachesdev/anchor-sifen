import type { Big } from 'big.js';
import type { DEC, Timbrado } from '../../sifen/types/clean/de';
import type { Emisor, OperacionComercial, Receptor } from '../../sifen/types/clean/d';
import type {
  CondicionOperacion,
  ItemOperacion,
  PagoContadoEntregaInicial,
  Transporte,
  Transportista
} from '../../sifen/types/clean/e';
import type { SubtotalesTotales } from '../../sifen/types/clean/f';
import type { TipoDocumentoElectronicoLabel } from '../../sifen/types/enums';

export function getOperacionComercial(doc: DEC): OperacionComercial | undefined {
  return doc.datosGeneralesOperacion.operacionComercial;
}

export function getMonedaOperacion(doc: DEC): string | undefined {
  return doc.datosGeneralesOperacion.operacionComercial?.monedaOperacion;
}

export function getCondicionTipoCambio(doc: DEC): number | undefined {
  return doc.datosGeneralesOperacion.operacionComercial?.condicionTipoCambio;
}

export function getTipoCambioOperacion(doc: DEC): Big | undefined {
  return doc.datosGeneralesOperacion.operacionComercial?.tipoCambioOperacion;
}

export function getSubtotales(doc: DEC): SubtotalesTotales | undefined {
  return doc.subtotalesTotales;
}

export function getTimbrado(doc: DEC): Timbrado {
  return doc.timbrado;
}

export function getEmisor(doc: DEC): Emisor {
  return doc.datosGeneralesOperacion.emisor;
}

export function getReceptor(doc: DEC): Receptor {
  return doc.datosGeneralesOperacion.receptor;
}

export function getTransporte(doc: DEC): Transporte | undefined {
  return doc.datosEspecificosPorTipoDE.transporte;
}

export function getTransportista(doc: DEC): Transportista | undefined {
  return doc.datosEspecificosPorTipoDE.transporte?.transportista;
}

export function getCondicionOperacion(doc: DEC): CondicionOperacion | undefined {
  return doc.datosEspecificosPorTipoDE.condicionOperacion;
}

export function getPagoContadoEntregaInicial(doc: DEC): PagoContadoEntregaInicial[] | undefined {
  return doc.datosEspecificosPorTipoDE.condicionOperacion?.pagoContadoEntregaInicial;
}

export function getItemsOperacion(doc: DEC): ItemOperacion[] {
  return doc.datosEspecificosPorTipoDE.itemsOperacion;
}

export function getTipoDE(doc: DEC): TipoDocumentoElectronicoLabel {
  return doc.tipoDE;
}
