import type { LiteralUnion } from 'type-fest';
import type { TipoConstancia, TipoDocumentoAsociado, TipoDocumentoImpreso } from '../enums';

/**
 * H - H001 | gCamDEAsoc | Campos que identifican al DE asociado | Pagina 108
 */
export interface DocumentoElectronicoAsociado {
  /**
   * H - H002 | iTipDocAso | Tipo de documento asociado | Pagina 108
   */
  tipoDocumentoAsociado: LiteralUnion<TipoDocumentoAsociado, number>;
  /**
   * H - H004 | dCdCDERef | CDC del DTE referenciado | Pagina 108
   */
  cdcDocumentoReferenciado?: string;
  /**
   * H - H005 | dNTimDI | Nro. timbrado documento impreso de referencia | Pagina 108
   */
  numeroTimbradoDocumentoImpreso?: number;
  /**
   * H - H006 | dEstDocAso | Establecimiento | Pagina 108
   */
  establecimiento?: string;
  /**
   * H - H007 | dPExpDocAso | Punto de expedición | Pagina 109
   */
  puntoExpedicion?: string;
  /**
   * H - H008 | dNumDocAso | Número del documento | Pagina 109
   */
  numeroDocumento?: string;
  /**
   * H - H009 | iTipoDocAso | Tipo de documento impreso | Pagina 109
   */
  tipoDocumentoImpreso?: LiteralUnion<TipoDocumentoImpreso, number>;
  /**
   * H - H011 | dFecEmiDI | Fecha de emisión del documento impreso de referencia | Pagina 109
   *
   * Formato: AAAA-MM-DD
   */
  fechaEmisionDocumentoImpreso?: Date;
  /**
   * H - H012 | dNumComRet | Número de comprobante de retención | Pagina 109
   */
  numeroComprobanteRetencion?: string;
  /**
   * H - H013 | dNumResCF | Número de resolución de crédito fiscal | Pagina 109
   */
  numeroResolucionCreditoFiscal?: string;
  /**
   * H - H014 | iTipCons | Tipo de constancia | Pagina 110
   */
  tipoConstancia?: LiteralUnion<TipoConstancia, number>;
  /**
   * H - H016 | dNumCons | Número de constancia | Pagina 110
   */
  numeroConstancia?: number;
  /**
   * H - H017 | dNumControl | Número de control de la constancia | Pagina 110
   */
  numeroControlConstancia?: string;
  /**
   * H - H018 | dRucFus | RUC Fusionado | Pagina 2 NT-23
   */
  rucFusionado?: string;
}
