import type { FacturaElectronica } from '../sifen/types';
import type { Get } from 'type-fest';

export function getOperacionComercial(
  doc: FacturaElectronica
): Get<FacturaElectronica, 'datosGeneralesOperacion.operacionComercial'> {
  return doc.datosGeneralesOperacion.operacionComercial;
}

export function getMonedaOperacion(doc: FacturaElectronica) {
  return getOperacionComercial(doc).monedaOperacion;
}

export function getCondicionTipoCambio(doc: FacturaElectronica) {
  return getOperacionComercial(doc).condicionTipoCambio;
}

export function getTipoCambioOperacion(doc: FacturaElectronica) {
  return getOperacionComercial(doc).tipoCambioOperacion;
}

export function getSubtotales(
  doc: FacturaElectronica
): Get<FacturaElectronica, 'subtotalesTotales'> {
  return doc.subtotalesTotales;
}

export function getEmisor(
  doc: FacturaElectronica
): Get<FacturaElectronica, 'datosGeneralesOperacion.emisor'> {
  return doc.datosGeneralesOperacion.emisor;
}

export function getReceptor(
  doc: FacturaElectronica
): Get<FacturaElectronica, 'datosGeneralesOperacion.receptor'> {
  return doc.datosGeneralesOperacion.receptor;
}

export function getTransportista(
  doc: FacturaElectronica
): Get<FacturaElectronica, 'datosEspecificosPorTipoDE.transporte.transportista'> {
  return doc.datosEspecificosPorTipoDE.transporte?.transportista;
}

export function getPagoContadoEntregaInicial(
  doc: FacturaElectronica
): Get<
  FacturaElectronica,
  'datosEspecificosPorTipoDE.condicionOperacion.pagoContadoEntregaInicial'
> {
  return doc.datosEspecificosPorTipoDE.condicionOperacion.pagoContadoEntregaInicial;
}

export function getItemsOperacion(
  doc: FacturaElectronica
): Get<FacturaElectronica, 'datosEspecificosPorTipoDE.itemsOperacion'> {
  return doc.datosEspecificosPorTipoDE.itemsOperacion;
}
