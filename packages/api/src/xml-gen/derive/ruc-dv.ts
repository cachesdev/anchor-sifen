import type { FacturaElectronica } from '../../sifen/types';
import {
  getEmisor,
  getPagoContadoEntregaInicial,
  getReceptor,
  getTransportista
} from '../fe-accessors';
import { calcularDv, extraerRuc } from '../ruc';

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

/** Deriva todos los digitos verificadores */
export function applyDvDerivedFields(out: FacturaElectronica): void {
  const emisor = getEmisor(out);
  emisor.digitoVerificadorEmisor = deriveDv(emisor.rucEmisor);

  const receptor = getReceptor(out);
  if (receptor.rucReceptor) {
    receptor.digitoVerificadorReceptor = deriveDv(receptor.rucReceptor);
  }

  for (const pago of getPagoContadoEntregaInicial(out) ?? []) {
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
