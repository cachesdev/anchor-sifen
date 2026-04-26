import type {
  DescripcionTipoDocumentoElectronico,
  DescripcionTipoEmision,
  TipoDocumentoElectronico,
  TipoEmision
} from '../enums';
import type { GDatRec, GEmis, GOpeCom } from './d';
import type { GCamAE, GCamCond, GCamEsp, GCamFE, GCamItem, GCamNCDE, GCamNRE, GTransp } from './e';
import type { GTotSub } from './f';
import type { GCamGen } from './g';
import type { GCamDEAsoc } from './h';

/**
 * AA | Documento Electrónico | Pagina 61
 */
export interface DocumentoElectronico {
  /**
   * AA - AA001 | Documento Electrónico elemento raíz | Pagina 61
   */
  rDE: {
    /**
     * AA - AA002 | Versión del formato | Pagina 61
    *
    * Observaciones:
    *   Control de versiones
    *   Este campo debe contener la versión 150
     */
    dVerFor: 150;
    /**
     * A - A001 | Campos firmados del DE | Pagina 61
     */
    DE: DE;
  };
}

/**
 * A - A001 | Campos firmados del DE | Pagina 61
 *
 * A002 (CDC) Omitido, ya que es un atributo y no un campo del DE.
 */
export interface DE {
  /**
   * A - A003 | Dígito verificador del identificador del DE | Pagina 61
    * Observaciones: Según algoritmo módulo 11
   */
  dDVId: number;
  /**
   * A - A004 | Fecha de la firma | Pagina 62
   *
   * Formato: AAAA-MM-DDThh:mm:ss
    *
    * Observaciones:
    *   La fecha y hora de la firma digital debe ser anterior a la fecha y hora de transmisión al SIFEN
    *   El certificado digital debe estar vigente al momento de la firma digital del DE
    *   Fecha y hora en el formato AAAA-MM-DDThh:mm:ss
    *   El plazo límite de transmisión del DE al SIFEN para la aprobación normal es de 72 h contadas a partir de la fecha y hora de la firma digital.
   */
  dFecFirma: string;
  /**
   * A - A005 | Sistema de facturación | Pagina 62
    *
    * Observaciones:
    *   1=Sistema de facturación del contribuyente
    *   2=SIFEN solución gratuita
   */
  dSisFact: 1;
  /**
   * B - B001 | Campos inherentes a la operación de DE | Pagina 62
   */
  gOpeDE: GOpeDE;
  /**
   * C - C001 | Datos del timbrado | Pagina 63
   */
  gTimb: GTimb;
  /**
   * D - D001 | Campos generales del DE | Pagina 65
   */
  gDatGralOpe: GDatGralOpe;
  /**
   * E - E001 | Campos específicos por tipo de Documento Electrónico | Pagina 73
   */
  gDtipDE: GDtipDE;
  /**
   * F - F001 | Campos de subtotales y totales | Pagina 102
    *
    * Observaciones:
    *   Obligatorio si C002 ≠ 7
    *   No informar si C002 = 7
    *   Cuando C002= 4, no informar F002, F003, F004, F005, F015, F016, F017, F018, F019, F020, F023, F025 y F026
   */
  gTotSub?: GTotSub;
  /**
   * G - G001 | Campos de uso general | Pagina 106
   */
  gCamGen?: GCamGen;
  /**
   * H - H001 | Campos que identifican al DE asociado | Pagina 108
    *
    * Observaciones:
    *   Obligatorio si C002 = 4, 5, 6
    *   Opcional si C002=1 o 7
   */
  gCamDEAsoc?: GCamDEAsoc;
}

/**
 * B - B001 | Campos inherentes a la operación de DE | Pagina 62
 */
export interface GOpeDE {
  /**
   * B - B002 | Tipo de emisión | Pagina 62
    *
    * Observaciones:
    *   1= Normal
    *   2= Contingencia
   */
  iTipEmi: TipoEmision;
  /**
   * B - B003 | Descripción del tipo de emisión | Pagina 62
    *
    * Observaciones:
    *   Referente al campo B002
    *   1= “Normal”
    *   2= “Contingencia”
   */
  dDesTipEmi: DescripcionTipoEmision;
  /**
   * B - B004 | Código de seguridad | Pagina 62
    * Observaciones: Código generado por el emisor de manera aleatoria para asegurar la confidencialidad de la consulta pública del DE
   */
  dCodSeg: number;
  /**
   * B - B005 | Información de interés del emisor respecto al DE | Pagina 62
   */
  dInfoEmi?: string;
  /**
   * B - B006 | Información de interés del Fisco respecto al DE | Pagina 63
    *
    * Observaciones:
    *   Esta información debe ser impresa en el KuDE.
    *   Cuando el tipo de documento es Nota de remisión (C002=7) es obligatorio informar el mensaje según el Art. 3 Inc. 7 de la Resolución general Nro. 41/2014
   */
  dInfoFisc?: string;
}

/**
 * C - C001 | Datos del timbrado | Pagina 63
 */
export interface GTimb {
  /**
   * C - C002 | Tipo de Documento Electrónico | Pagina 63
    *
    * Observaciones:
    *   1= Factura electrónica
    *   2= Factura electrónica de exportación (Futuro)
    *   3= Factura electrónica de importación (Futuro)
    *   4= Autofactura electrónica
    *   5= Nota de crédito electrónica
    *   6= Nota de débito electrónica
    *   7= Nota de remisión electrónica
    *   8= Comprobante de retención electrónico (Futuro)
   */
  iTiDE: TipoDocumentoElectronico;
  /**
   * C - C003 | Descripción del tipo de documento electrónico | Pagina 63
    *
    * Observaciones:
    *   Referente al campo C002
    *   1= Factura electrónica
    *   2= Factura electrónica de exportación
    *   3= Factura electrónica de importación
    *   4= Autofactura electrónica
    *   5= Nota de crédito electrónica
    *   6= Nota de débito electrónica
    *   7= Nota de remisión electrónica
    *   8= Comprobante de retención electrónico
   */
  dDesTiDE: DescripcionTipoDocumentoElectronico;
  /**
   * C - C004 | Número del timbrado | Pagina 63
    * Observaciones: Debe coincidir con la estructura de timbrado
   */
  dNumTim: number;
  /**
   * C - C005 | Establecimiento | Pagina 64
    *
    * Observaciones:
    *   Completar con 0 (cero) a la izquierda
    *   Debe coincidir con la estructura de timbrado
   */
  dEst: string;
  /**
   * C - C006 | Punto de expedición | Pagina 64
    *
    * Observaciones:
    *   Completar con 0 (cero) a la izquierda
    *   Debe coincidir con la estructura de timbrado
   */
  dPunExp: string;
  /**
   * C - C007 | Número del documento | Pagina 64
    *
    * Observaciones:
    *   Debe empezar con 1 (uno) para un nuevo timbrado.
    *   Completar con 0 (cero) a la izquierda hasta alcanzar 7 (siete) cifras
    *   Debe coincidir con la estructura de timbrado
    *   Una vez que se haya agotado la numeración permitida por el sistema (9999999), la numeración de los comprobantes electrónicos se reinicia con la utilización de la serie, para evitar rechazos por duplicidad
   */
  dNumDoc: string;
  /**
   * C - C010 | Serie del número de timbrado | Pagina 64
    *
    * Observaciones:
    *   Campo obligatorio cuando ya se ha consumido la totalidad de la numeración permitida por el sistema (9999999).
    *   Referirse a la sección Manejo del timbrado y Numeración.
   */
  dSerieNum?: string;
  /**
   * C - C008 | Fecha inicio de vigencia del timbrado | Pagina 64
   *
   * Formato: AAAA-MM-DD
    *
    * Observaciones:
    *   Formato AAAA-MM-DD
    *   Para el KuDE el formato de la fecha de inicio de vigencia debe contener los guiones separadores. Ejemplo: 2018-05-31
   */
  dFeIniT: string;
}

/**
 * D - D001 | Campos generales del DE | Pagina 65
 */
export interface GDatGralOpe {
  /**
   * D - D002 | Fecha y hora de emisión del DE | Pagina 65
   *
   * Formato: AAAA-MM-DDThh:mm:ss
    *
    * Observaciones:
    *   Fecha y hora en el formato AAAA-MM-DDThh:mm:ss
    *   Para el KuDE el formato de la fecha de emisión debe contener los guiones separadores. Ejemplo: 2018-05-31T12:00:00
    *   Se aceptará como límites técnicos del sistema, que la fecha de emisión del DE sea atrasada hasta 720 horas (30 días) y adelantada hasta 120 horas (5 días) en relación a la fecha y hora de transmisión al SIFEN
   */
  dFeEmiDE: string;
  /**
   * D1 - D010 | Campos inherentes a la operación comercial | Pagina 65
    *
    * Observaciones:
    *   Obligatorio si C002 ≠ 7
    *   No informar si C002 = 7
   */
  gOpeCom?: GOpeCom;
  /**
   * D2 - D100 | Grupo de campos que identifican al emisor | Pagina 67
   */
  gEmis: GEmis;
  /**
   * D3 - D200 | Grupo de campos que identifican al receptor | Pagina 70
   */
  gDatRec: GDatRec;
}

/**
 * E - E001 | Campos específicos por tipo de Documento Electrónico | Pagina 73
 */
export interface GDtipDE {
  /**
   * E1 - E010 | Campos que componen la FE | Pagina 73
    *
    * Observaciones:
    *   Obligatorio si C002 = 1
    *   No informar si C002 ≠ 1
   */
  gCamFE?: GCamFE;
  /**
   * E4 - E300 | Campos que componen la Autofactura Electrónica | Pagina 75
    *
    * Observaciones:
    *   Obligatorio si C002 = 4
    *   No informar si C002 ≠ 4
   */
  gCamAE?: GCamAE;
  /**
   * E5 - E400 | Campos de la Nota de Crédito/Débito Electrónica | Pagina 77
    *
    * Observaciones:
    *   Obligatorio si C002 = 5 o 6 (NCE y NDE)
    *   No informar si C002 ≠ 5 o 6
   */
  gCamNCDE?: GCamNCDE;
  /**
   * E6 - E500 | Campos que componen la Nota de Remisión Electrónica | Pagina 77
    *
    * Observaciones:
    *   Obligatorio si C002 = 7
    *   No informar si C002 ≠ 7
   */
  gCamNRE?: GCamNRE;
  /**
   * E7 - E600 | Campos que describen la condición de la operación | Pagina 80
    *
    * Observaciones:
    *   Obligatorio si C002 = 1 o 4
    *   No informar si C002 ≠ 1 o 4
   */
  gCamCond?: GCamCond;
  /**
   * E8 - E700 | Campos que describen los ítems de la operación | Pagina 85
   */
  gCamItem?: GCamItem[];
  /**
   * E9 - E790 | Campos complementarios comerciales de uso específico | Pagina 93
   */
  gCamEsp?: GCamEsp;
  /**
   * E10 - E900 | Campos que describen el transporte de mercaderías | Pagina 96
    *
    * Observaciones:
    *   Obligatorio si C002 = 7
    *   Opcional si C002 = 1
    *   No informar si C002= 4, 5, 6
   */
  gTransp?: GTransp;
}
