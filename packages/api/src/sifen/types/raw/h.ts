// SIFEN H group - Documentos asociados (H001-H049)

/**
 * H - H001 | Campos que identifican al DE asociado | Pagina 108
 */
export interface gCamDEAsoc {
  /** H - H002 | Tipo de documento asociado | Pagina 108 */
  iTipDocAso: ITipDocAso;
  /** H - H003 | Descripción del tipo de documento asociado | Pagina 108 */
  dDesTipDocAso: string;
  /** H - H004 | CDC del DTE referenciado | Pagina 108 */
  dCdCDERef?: string;
  /** H - H005 | Nro. timbrado documento impreso de referencia | Pagina 108 */
  dNTimDI?: number;
  /** H - H006 | Establecimiento documento impreso de referencia | Pagina 108 */
  dEstDI?: string;
  /** H - H007 | Punto de expedición documento impreso de referencia | Pagina 108 */
  dPunExpDI?: string;
  /** H - H008 | Nº documento impreso de referencia | Pagina 108 */
  dNumDocDI?: string;
}

export const ITipDocAsoValues = {
  Electronico: 1,
  Impreso: 2,
  ConstanciaElectronica: 3
} as const;
export type ITipDocAso = (typeof ITipDocAsoValues)[keyof typeof ITipDocAsoValues];
export const DDesTipDocAsoValues = {
  Electronico: 'Electrónico',
  Impreso: 'Impreso',
  ConstanciaElectronica: 'Constancia Electrónica'
} as const;
export type DDesTipDocAso = (typeof DDesTipDocAsoValues)[keyof typeof DDesTipDocAsoValues];
