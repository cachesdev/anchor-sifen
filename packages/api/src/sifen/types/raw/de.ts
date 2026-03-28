import type { GDatRec, GEmis, GOpeCom } from './d';
import type { GCamAE, GCamCond, GCamEsp, GCamFE, GCamItem, GCamNCDE, GCamNRE, GTransp } from './e';
import type { DDesTiDE, DDesTipEmi, DSisFact, ITiDE, ITipEmi } from './enums';
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
   */
  dDVId: number;
  /**
   * A - A004 | Fecha de la firma | Pagina 62
   *
   * Formato: AAAA-MM-DDThh:mm:ss
   */
  dFecFirma: string;
  /**
   * A - A005 | Sistema de facturación | Pagina 62
   */
  dSisFact: DSisFact;
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
   */
  gTotSub?: GTotSub;
  /**
   * G - G001 | Campos de uso general | Pagina 106
   */
  gCamGen?: GCamGen;
  /**
   * H - H001 | Campos que identifican al DE asociado | Pagina 108
   */
  gCamDEAsoc?: GCamDEAsoc;
}

/**
 * B - B001 | Campos inherentes a la operación de DE | Pagina 62
 */
export interface GOpeDE {
  /**
   * B - B002 | Tipo de emisión | Pagina 62
   */
  iTipEmi: ITipEmi;
  /**
   * B - B003 | Descripción del tipo de emisión | Pagina 62
   */
  dDesTipEmi: DDesTipEmi;
  /**
   * B - B004 | Código de seguridad | Pagina 62
   */
  dCodSeg: number;
  /**
   * B - B005 | Información de interés del emisor respecto al DE | Pagina 62
   */
  dInfoEmi?: string;
  /**
   * B - B006 | Información de interés del Fisco respecto al DE | Pagina 63
   */
  dInfoFisc?: string;
}

/**
 * C - C001 | Datos del timbrado | Pagina 63
 */
export interface GTimb {
  /**
   * C - C002 | Tipo de Documento Electrónico | Pagina 63
   */
  iTiDE: ITiDE;
  /**
   * C - C003 | Descripción del tipo de documento electrónico | Pagina 63
   */
  dDesTiDE: DDesTiDE;
  /**
   * C - C004 | Número del timbrado | Pagina 63
   */
  dNumTim: number;
  /**
   * C - C005 | Establecimiento | Pagina 64
   */
  dEst: string;
  /**
   * C - C006 | Punto de expedición | Pagina 64
   */
  dPunExp: string;
  /**
   * C - C007 | Número del documento | Pagina 64
   */
  dNumDoc: string;
  /**
   * C - C010 | Serie del número de timbrado | Pagina 64
   */
  dSerieNum?: string;
  /**
   * C - C008 | Fecha inicio de vigencia del timbrado | Pagina 64
   *
   * Formato: AAAA-MM-DD
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
   */
  dFeEmiDE: string;
  /**
   * D1 - D010 | Campos inherentes a la operación comercial | Pagina 65
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
   */
  gCamFE?: GCamFE;
  /**
   * E4 - E300 | Campos que componen la Autofactura Electrónica | Pagina 75
   */
  gCamAE?: GCamAE;
  /**
   * E5 - E400 | Campos de la Nota de Crédito/Débito Electrónica | Pagina 77
   */
  gCamNCDE?: GCamNCDE;
  /**
   * E6 - E500 | Campos que componen la Nota de Remisión Electrónica | Pagina 77
   */
  gCamNRE?: GCamNRE;
  /**
   * E7 - E600 | Campos que describen la condición de la operación | Pagina 80
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
   */
  gTransp?: GTransp;
}
