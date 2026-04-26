import type { LiteralUnion } from 'type-fest';
import type { TipoConstancia, TipoDocumentoAsociado, TipoDocumentoImpreso } from '../enums';

/**
 * H - H001 | gCamDEAsoc | Campos que identifican al DE asociado | Pagina 108
 *
 * Observaciones:
 *   Obligatorio si C002 = 4, 5, 6
 *   Opcional si C002=1 o 7
 */
export interface DocumentoElectronicoAsociado {
  /**
   * H - H002 | iTipDocAso | Tipo de documento asociado | Pagina 108
   *
   * Observaciones:
   *   1= Electrónico
   *   2= Impreso
   *   3= Constancia Electrónica
   */
  tipoDocumentoAsociado: LiteralUnion<TipoDocumentoAsociado, number>;
  /**
   * H - H004 | dCdCDERef | CDC del DTE referenciado | Pagina 108
   *
   * Observaciones:
   *   Obligatorio si H002=1
   *   No informar si H002 = 2 o 3
   */
  cdcDocumentoReferenciado?: string;
  /**
   * H - H005 | dNTimDI | Nro. timbrado documento impreso de referencia | Pagina 108
   *
   * Observaciones:
   *   Obligatorio si H002=2
   *   No informar si H002 = 1 o 3
   */
  numeroTimbradoDocumentoImpreso?: number;
  /**
   * H - H006 | dEstDocAso | Establecimiento | Pagina 108
   *
   * Observaciones:
   *   Obligatorio si H002=2
   *   Completar con 0 (cero) a la izquierda
   *   No informar si H002 = 1 o 3
   */
  establecimiento?: string;
  /**
   * H - H007 | dPExpDocAso | Punto de expedición | Pagina 109
   *
   * Observaciones:
   *   Obligatorio si H002=2
   *   Completar con 0 (cero) a la izquierda
   *   No informar si H002 = 1 o 3
   */
  puntoExpedicion?: string;
  /**
   * H - H008 | dNumDocAso | Número del documento | Pagina 109
   *
   * Observaciones:
   *   Obligatorio si H002=2
   *   Completar con 0 (cero) a la izquierda hasta alcanzar 7 (siete) cifras
   *   No informar si H002 = 1 o 3
   */
  numeroDocumento?: string;
  /**
   * H - H009 | iTipoDocAso | Tipo de documento impreso | Pagina 109
   *
   * Observaciones:
   *   Obligatorio si H002=2
   *   No informar si H002 = 1 o 3
   *   1= Factura
   *   2= Nota de crédito
   *   3= Nota de débito
   *   4= Nota de remisión
   *   5= Comprobante de retención
   */
  tipoDocumentoImpreso?: LiteralUnion<TipoDocumentoImpreso, number>;
  /**
   * H - H011 | dFecEmiDI | Fecha de emisión del documento impreso de referencia | Pagina 109
   *
   * Formato: AAAA-MM-DD
   *
   * Observaciones:
   *   Obligatorio si existe el campo H005
   *   Formato AAAA-MM-DD
   *   No Informar si campo H005 no existe
   */
  fechaEmisionDocumentoImpreso?: Date;
  /**
   * H - H012 | dNumComRet | Número de comprobante de retención | Pagina 109
   *
   * Observaciones:
   *   Si E606 = 10, es opcional informar número de comprobante de retención (Cambio temporal).
   *   No informar si E606 ≠ 10
   */
  numeroComprobanteRetencion?: string;
  /**
   * H - H013 | dNumResCF | Número de resolución de crédito fiscal | Pagina 109
   *
   * Observaciones:
   *   Si D011 = 12 obligatorio informar número de resolución de crédito fiscal
   *   No informar si D011 ≠ 12
   */
  numeroResolucionCreditoFiscal?: string;
  /**
   * H - H014 | iTipCons | Tipo de constancia | Pagina 110
   *
   * Observaciones:
   *   Obligatorio cuando H002 = 3
   *   No informar cuando H002 ≠ 3
   *   1= Constancia de no ser contribuyente
   *   2= Constancia de microproductores
   */
  tipoConstancia?: LiteralUnion<TipoConstancia, number>;
  /**
   * H - H016 | dNumCons | Número de constancia | Pagina 110
   *
   * Observaciones:
   *   Obligatorio cuando H002 = 3 y H014 = 2
   *   No informar cuando H002 ≠ 3
   */
  numeroConstancia?: number;
  /**
   * H - H017 | dNumControl | Número de control de la constancia | Pagina 110
   *
   * Observaciones:
   *   Obligatorio cuando H002 = 3 y H014 = 2
   *   No informar cuando H002 ≠ 3
   */
  numeroControlConstancia?: string;
  /**
   * H - H018 | dRucFus | RUC Fusionado | Pagina 2 NT-23
   */
  rucFusionado?: string;
}
