// SIFEN H group - Documentos asociados (H001-H049)

/**
 * H - H001 | Campos que identifican al DE asociado | Pagina 108
 */
export interface gCamDEAsoc {
  /** H - H002 | Tipo de documento asociado | Pagina 108 */
  iTipDocAso: ITipDocAso;
  /** H - H003 | Descripción del tipo de documento asociado | Pagina 108 */
  dDesTipDocAso: DDesTipDocAso;
  /** H - H004 | CDC del DTE referenciado | Pagina 108 */
  dCdCDERef?: string;
  /** H - H005 | Nro. timbrado documento impreso de referencia | Pagina 108 */
  dNTimDI?: number;
  /** H - H006 | Establecimiento | Pagina 108 */
  dEstDocAso?: string;
  /** H - H007 | Punto de expedición | Pagina 108 */
  dPExpDocAso?: string;
  /** H - H008 | Número del documento | Pagina 108 */
  dNumDocAso?: string;
  /** H - H009 | Tipo de documento impreso | Pagina 108 */
  iTipoDocAso?: ITipoDocAsoImpreso;
  /** H - H010 | Descripción del tipo de documento impreso | Pagina 108 */
  dDTipoDocAso?: DDTipoDocAsoImpreso;
  /** H - H011 | Fecha de emisión del documento impreso de referencia | Pagina 108 */
  dFecEmiDI?: string;
  /** H - H012 | Número de comprobante de retención | Pagina 108 */
  dNumComRet?: string;
  /** H - H013 | Número de resolución de crédito fiscal | Pagina 108 */
  dNumResCF?: string;
  /** H - H014 | Tipo de constancia | Pagina 109 */
  iTipCons?: ITipCons;
  /** H - H015 | Descripción del tipo de constancia | Pagina 109 */
  dDesTipCons?: DDesTipCons;
  /** H - H016 | Número de constancia | Pagina 109 */
  dNumCons?: number;
  /** H - H017 | Número de control de la constancia | Pagina 109 */
  dNumControl?: string;
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

export const ITipoDocAsoImpresoValues = {
  Factura: 1,
  NotaCredito: 2,
  NotaDebito: 3,
  NotaRemision: 4,
  ComprobanteRetencion: 5
} as const;
export type ITipoDocAsoImpreso =
  (typeof ITipoDocAsoImpresoValues)[keyof typeof ITipoDocAsoImpresoValues];
export const DDTipoDocAsoImpresoValues = {
  Factura: 'Factura',
  NotaCredito: 'Nota de crédito',
  NotaDebito: 'Nota de débito',
  NotaRemision: 'Nota de remisión',
  ComprobanteRetencion: 'Comprobante de retención'
} as const;
export type DDTipoDocAsoImpreso =
  (typeof DDTipoDocAsoImpresoValues)[keyof typeof DDTipoDocAsoImpresoValues];

export const ITipConsValues = {
  ConstanciaNoContribuyente: 1,
  ConstanciaMicroproductores: 2
} as const;
export type ITipCons = (typeof ITipConsValues)[keyof typeof ITipConsValues];
export const DDesTipConsValues = {
  ConstanciaNoContribuyente: 'Constancia de no ser contribuyente',
  ConstanciaMicroproductores: 'Constancia de microproductores'
} as const;
export type DDesTipCons = (typeof DDesTipConsValues)[keyof typeof DDesTipConsValues];
