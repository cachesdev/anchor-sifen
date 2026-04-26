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
    *
    * Observaciones:
    *   Obligatorio si C002 = 4, 5, 6
    *   Opcional si C002=1 o 7
 */
export interface GCamDEAsoc {
  /**
   * H - H002 | Tipo de documento asociado | Pagina 108
    *
    * Observaciones:
    *   1= Electrónico
    *   2= Impreso
    *   3= Constancia Electrónica
   */
  iTipDocAso: TipoDocumentoAsociado;
  /**
   * H - H003 | Descripción del tipo de documento asociado | Pagina 108
    *
    * Observaciones:
    *   Referente al campo H002
    *   1= “Electrónico”
    *   2= “Impreso”
    *   3= “Constancia Electrónica”
   */
  dDesTipDocAso: DescripcionTipoDocumentoAsociado;
  /**
   * H - H004 | CDC del DTE referenciado | Pagina 108
    *
    * Observaciones:
    *   Obligatorio si H002=1
    *   No informar si H002 = 2 o 3
   */
  dCdCDERef?: string;
  /**
   * H - H005 | Nro. timbrado documento impreso de referencia | Pagina 108
    *
    * Observaciones:
    *   Obligatorio si H002=2
    *   No informar si H002 = 1 o 3
   */
  dNTimDI?: number;
  /**
   * H - H006 | Establecimiento | Pagina 108
    *
    * Observaciones:
    *   Obligatorio si H002=2
    *   Completar con 0 (cero) a la izquierda
    *   No informar si H002 = 1 o 3
   */
  dEstDocAso?: string;
  /**
   * H - H007 | Punto de expedición | Pagina 109
    *
    * Observaciones:
    *   Obligatorio si H002=2
    *   Completar con 0 (cero) a la izquierda
    *   No informar si H002 = 1 o 3
   */
  dPExpDocAso?: string;
  /**
   * H - H008 | Número del documento | Pagina 109
    *
    * Observaciones:
    *   Obligatorio si H002=2
    *   Completar con 0 (cero) a la izquierda hasta alcanzar 7 (siete) cifras
    *   No informar si H002 = 1 o 3
   */
  dNumDocAso?: string;
  /**
   * H - H009 | Tipo de documento impreso | Pagina 109
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
  iTipoDocAso?: TipoDocumentoImpreso;
  /**
   * H - H010 | Descripción del tipo de documento impreso | Pagina 109
    *
    * Observaciones:
    *   Obligatorio si existe el campo H009
    *   1= “Factura”
    *   2= “Nota de crédito”
    *   3= “Nota de débito”
    *   4= “Nota de remisión”
    *   5= “Comprobante de retención”
   */
  dDTipoDocAso?: DescripcionTipoDocumentoImpreso;
  /**
   * H - H011 | Fecha de emisión del documento impreso de referencia | Pagina 109
   *
   * Formato: AAAA-MM-DD
    *
    * Observaciones:
    *   Obligatorio si existe el campo H005
    *   Formato AAAA-MM-DD
    *   No Informar si campo H005 no existe
   */
  dFecEmiDI?: string;
  /**
   * H - H012 | Número de comprobante de retención | Pagina 109
    *
    * Observaciones:
    *   Si E606 = 10, es opcional informar número de comprobante de retención (Cambio temporal).
    *   No informar si E606 ≠ 10
   */
  dNumComRet?: string;
  /**
   * H - H013 | Número de resolución de crédito fiscal | Pagina 109
    *
    * Observaciones:
    *   Si D011 = 12 obligatorio informar número de resolución de crédito fiscal
    *   No informar si D011 ≠ 12
   */
  dNumResCF?: string;
  /**
   * H - H014 | Tipo de constancia | Pagina 110
    *
    * Observaciones:
    *   Obligatorio cuando H002 = 3
    *   No informar cuando H002 ≠ 3
    *   1= Constancia de no ser contribuyente
    *   2= Constancia de microproductores
   */
  iTipCons?: TipoConstancia;
  /**
   * H - H015 | Descripción del tipo de constancia | Pagina 110
    *
    * Observaciones:
    *   Obligatorio si se informa H014
    *   Referente al campo H014
    *   1= “Constancia de no ser contribuyente”
    *   2=“Constancia de microproductores”
   */
  dDesTipCons?: DescripcionTipoConstancia;
  /**
   * H - H016 | Número de constancia | Pagina 110
    *
    * Observaciones:
    *   Obligatorio cuando H002 = 3 y H014 = 2
    *   No informar cuando H002 ≠ 3
   */
  dNumCons?: number;
  /**
   * H - H017 | Número de control de la constancia | Pagina 110
    *
    * Observaciones:
    *   Obligatorio cuando H002 = 3 y H014 = 2
    *   No informar cuando H002 ≠ 3
   */
  dNumControl?: string;
  /**
   * H - H018 | RUC fusionado | Pagina 2 NT-23
   */
  dRucFus?: string;
}
