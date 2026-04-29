import type { DEC } from '../../sifen/types';
import {
  getEmisor,
  getPagoContadoEntregaInicial,
  getReceptor,
  getTransportista
} from './accessors';
import { calcularDv, extraerRuc } from '../ruc';
import type { DerivationConfig } from './config';

/**
 * Deriva DV manejando campos opcionales. En caso de que el RUC sea indefinido,
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

/**
 * Deriva todos los digitos verificadores de RUC.
 *
 * - Emisor: aplica a todos los DE. MT v150, p. 67.
 * - Receptor: aplica a todos los DE. MT v150, p. 70.
 * - Procesadora de tarjeta: solo si E600 (condicion operacion) aplica
 *   (C002 = 1 o 4). MT v150, p. 83, campo E625.
 * - Transportista y agente: solo si E900 (transporte) aplica
 *   (C002 = 1 opcional, C002 = 7 obligatorio). MT v150, p. 100-102,
 *   campos E984 y E996.
 */
export function applyDvDerivedFields(out: DEC, config: DerivationConfig): void {
  const emisor = getEmisor(out);
  emisor.digitoVerificadorEmisor = deriveDv(emisor.rucEmisor);

  const receptor = getReceptor(out);
  if (receptor.rucReceptor) {
    receptor.digitoVerificadorReceptor = deriveDv(receptor.rucReceptor);
  }

  if (config.aplicaCondicionOperacion) {
    for (const pago of getPagoContadoEntregaInicial(out) ?? []) {
      const tarjeta = pago.pagoTarjetaCreditoDebito;
      if (!tarjeta?.rucProcesadoraTarjeta) {
        continue;
      }

      tarjeta.digitoVerificadorProcesadoraTarjeta = deriveDv(tarjeta.rucProcesadoraTarjeta);
    }
  }

  if (!config.aplicaTransporte) {
    return;
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
