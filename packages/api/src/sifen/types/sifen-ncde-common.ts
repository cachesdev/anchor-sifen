// SIFEN NC/ND common types v150
// Shared types for Nota de Crédito/Débito

/**
 * Motivo de emisión de Nota de Crédito/Débito - E401 | Pagina 77
 */
export const motivoEmisionNCDE = {
  DevolucionAjustePrecios: 1,
  Devolucion: 2,
  Descuento: 3,
  Bonificacion: 4,
  CreditoIncobrable: 5,
  RecuperoCosto: 6,
  RecuperoGasto: 7,
  AjustePrecio: 8
} as const;
export type MotivoEmisionNCDE = (typeof motivoEmisionNCDE)[keyof typeof motivoEmisionNCDE];

/**
 * E400 | gCamNCDE | Campos de la Nota de Crédito/Débito Electrónica | Pagina 77
 */
export interface CamposNCDE {
  /**
   * E401 | iMotEmi | Motivo de emisión | Pagina 77
   */
  motivoEmision: MotivoEmisionNCDE;
  /**
   * E402 | dDesMotEmi | Descripción del motivo de emisión | Pagina 77
   */
  descripcionMotivoEmision: string;
}
