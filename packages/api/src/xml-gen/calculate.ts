import type { FacturaElectronica } from '../sifen/types';

/** Genera un numero de 9 digitos enteros cryptograficamente aleatorio. */
function generateCodigoSeguridad(): number {
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);
  return (buffer[0]! % 900_000_000) + 100_000_000;
}

/**
 * Calcula el dígito verificador numérico para un RUC/CI alfanumérico
 * usando el algoritmo módulo 11.
 */
function calcularDV(rucCi: string, baseMax = 11): number {
  // Reemplazar caracteres no numéricos por su código ASCII
  let numeroExpandido = '';
  for (const char of rucCi) {
    const upper = char.toUpperCase();
    const code = upper.charCodeAt(0);
    if (code >= 48 && code <= 57) {
      numeroExpandido += upper;
    } else {
      numeroExpandido += code.toString();
    }
  }

  // Calcular el DV iterando de derecha a izquierda
  let k = 2;
  let total = 0;
  for (let i = numeroExpandido.length - 1; i >= 0; i--) {
    if (k > baseMax) k = 2;
    const digitValue = Number(numeroExpandido[i]);
    total += digitValue * k;
    k++;
  }

  const resto = total % 11;
  return resto > 1 ? 11 - resto : 0;
}

/**
 * Extrae la porcion del frente del ruc, quitando el dash y el DV.
 */
export function extraerRuc(ruc: string): string {
  if (!ruc) {
    return '';
  }

  // Partimos en dash. si no hay dash, retorna el original
  const parts = ruc.split('-');
  const frontPart = parts[0]!;
  return frontPart.trim();
}

export function calculateFields(fe: FacturaElectronica): FacturaElectronica {
  const out = structuredClone(fe);

  if (!out.operacionDE.codigoSeguridad) {
    out.operacionDE.codigoSeguridad = generateCodigoSeguridad();
  }

  if (!out.datosGeneralesOperacion.emisor.digitoVerificadorEmisor) {
    out.datosGeneralesOperacion.emisor.digitoVerificadorEmisor = calcularDV(
      out.datosGeneralesOperacion.emisor.rucEmisor
    );
  }

  //   if (!out.datosGeneralesOperacion.receptor.digitoVerificadorReceptor) {
  //     out.datosGeneralesOperacion.receptor.digitoVerificadorReceptor = calcularDV(
  //       out.datosGeneralesOperacion.receptor.rucReceptor
  //     );
  //   }

  return out;
}
