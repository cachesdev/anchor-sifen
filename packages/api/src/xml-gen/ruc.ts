/**
 * Extrae la porcion del frente del ruc, quitando el dash y el DV.
 *
 * Ejemplo: "12345678 -  9" -> "12345678"
 */
export function extraerRuc(ruc: string): string {
  if (!ruc) {
    return '';
  }

  // Partimos en dash. si no hay dash, retorna el original
  const parts = ruc.split('-');
  const frontPart = parts[0];
  return frontPart!.trim();
}

/**
 * Calcula el dígito verificador numérico para un valor alfanumérico
 * usando el algoritmo módulo 11.
 */
export function calcularDv(input: string): number {
  const baseMax = 11;
  let numeroExpandido = '';
  for (const char of input) {
    const upper = char.toUpperCase();
    const code = upper.charCodeAt(0);
    if (code >= 48 && code <= 57) {
      numeroExpandido += upper;
    } else {
      numeroExpandido += code.toString();
    }
  }

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
