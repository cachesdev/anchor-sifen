import type { Big } from 'big.js';
import type { FacturaElectronica, ItemOperacion_FE } from '../sifen/types';

export function getOperacionComercial(doc: FacturaElectronica) {
  return doc.datosGeneralesOperacion.operacionComercial;
}

export function getMonedaOperacion(doc: FacturaElectronica): string {
  return getOperacionComercial(doc).monedaOperacion;
}

export function getCondicionTipoCambio(doc: FacturaElectronica): number | undefined {
  return getOperacionComercial(doc).condicionTipoCambio;
}

export function getTipoCambioOperacion(doc: FacturaElectronica): Big | undefined {
  return getOperacionComercial(doc).tipoCambioOperacion;
}

export function getItems(doc: FacturaElectronica): ReadonlyArray<ItemOperacion_FE> {
  return doc.datosEspecificosPorTipoDE.itemsOperacion;
}

export function getSubtotales(doc: FacturaElectronica) {
  return doc.subtotalesTotales;
}

export function getEmisor(doc: FacturaElectronica) {
  return doc.datosGeneralesOperacion.emisor;
}

export function getReceptor(doc: FacturaElectronica) {
  return doc.datosGeneralesOperacion.receptor;
}

export function getTransportista(doc: FacturaElectronica) {
  return doc.datosEspecificosPorTipoDE.transporte?.transportista;
}
