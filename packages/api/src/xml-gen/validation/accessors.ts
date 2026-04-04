import type { FacturaElectronica, ItemOperacion_FE } from '../../sifen/types';

export function getOperacionComercial(doc: FacturaElectronica) {
  return doc.datosGeneralesOperacion.operacionComercial;
}

export function getMonedaOperacion(doc: FacturaElectronica): string {
  return getOperacionComercial(doc).monedaOperacion;
}

export function getCondicionTipoCambio(doc: FacturaElectronica): number | undefined {
  return getOperacionComercial(doc).condicionTipoCambio;
}

export function getTipoCambioOperacion(doc: FacturaElectronica): number | undefined {
  return getOperacionComercial(doc).tipoCambioOperacion;
}

export function getItems(doc: FacturaElectronica): ReadonlyArray<ItemOperacion_FE> {
  return doc.datosEspecificosPorTipoDE.itemsOperacion;
}

export function getSubtotales(doc: FacturaElectronica) {
  return doc.subtotalesTotales;
}
