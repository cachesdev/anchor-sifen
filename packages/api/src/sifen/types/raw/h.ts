import type {
  DescripcionTipoConstancia,
  DescripcionTipoDocumentoAsociado,
  DescripcionTipoDocumentoImpreso,
  TipoConstancia,
  TipoDocumentoAsociado,
  TipoDocumentoImpreso
} from '../enums';

/**
 * H - H001 | Campos que identifican al DE asociado | Pagina 108
 */
export interface GCamDEAsoc {
  /**
   * H - H002 | Tipo de documento asociado | Pagina 108
   */
  iTipDocAso: TipoDocumentoAsociado;
  /**
   * H - H003 | Descripción del tipo de documento asociado | Pagina 108
   */
  dDesTipDocAso: DescripcionTipoDocumentoAsociado;
  /**
   * H - H004 | CDC del DTE referenciado | Pagina 108
   */
  dCdCDERef?: string;
  /**
   * H - H005 | Nro. timbrado documento impreso de referencia | Pagina 108
   */
  dNTimDI?: number;
  /**
   * H - H006 | Establecimiento | Pagina 108
   */
  dEstDocAso?: string;
  /**
   * H - H007 | Punto de expedición | Pagina 109
   */
  dPExpDocAso?: string;
  /**
   * H - H008 | Número del documento | Pagina 109
   */
  dNumDocAso?: string;
  /**
   * H - H009 | Tipo de documento impreso | Pagina 109
   */
  iTipoDocAso?: TipoDocumentoImpreso;
  /**
   * H - H010 | Descripción del tipo de documento impreso | Pagina 109
   */
  dDTipoDocAso?: DescripcionTipoDocumentoImpreso;
  /**
   * H - H011 | Fecha de emisión del documento impreso de referencia | Pagina 109
   *
   * Formato: AAAA-MM-DD
   */
  dFecEmiDI?: string;
  /**
   * H - H012 | Número de comprobante de retención | Pagina 109
   */
  dNumComRet?: string;
  /**
   * H - H013 | Número de resolución de crédito fiscal | Pagina 109
   */
  dNumResCF?: string;
  /**
   * H - H014 | Tipo de constancia | Pagina 110
   */
  iTipCons?: TipoConstancia;
  /**
   * H - H015 | Descripción del tipo de constancia | Pagina 110
   */
  dDesTipCons?: DescripcionTipoConstancia;
  /**
   * H - H016 | Número de constancia | Pagina 110
   */
  dNumCons?: number;
  /**
   * H - H017 | Número de control de la constancia | Pagina 110
   */
  dNumControl?: string;
  /**
   * H - H018 | RUC fusionado | Pagina 2 NT-23
   */
  dRucFus?: string;
}
