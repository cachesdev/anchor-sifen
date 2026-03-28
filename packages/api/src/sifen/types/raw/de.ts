import type { CodigoCiudad, DescripcionCodigoCiudad } from '../../../gen/ciudades';
import type { CodigoDepartamento, DescripcionCodigoDepartamento } from '../../../gen/departamentos';
import type { CodigoDistrito, DescripcionCodigoDistrito } from '../../../gen/distritos';
import type { CodigoMoneda, DescripcionCodigoMoneda } from '../../../gen/monedas';
import type { CodigoPais, DescripcionCodigoPais } from '../../../gen/paises';
import type { GCamAE, GCamCond, GCamEsp, GCamFE, GCamItem, GCamNCDE, GCamNRE, GTransp } from './e';
import type {
  DDesCondAnt,
  DDesTiDE,
  DDesTImp,
  DDesTipEmi,
  DDesTipTra,
  DDTipIDRec,
  DDTipIDRespDE,
  DSisFact,
  ICondAnt,
  ICondTiCam,
  INatRec,
  ITiContRec,
  ITiDE,
  ITImp,
  ITiOpe,
  ITipCont,
  ITipEmi,
  ITipIDRec,
  ITipIDRespDE,
  ITipTra
} from './enums';
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
 * D1 - D010 | Campos inherentes a la operación comercial | Pagina 65
 */
export interface GOpeCom {
  /**
   * D1 - D011 | Tipo de transacción | Pagina 66
   */
  iTipTra?: ITipTra;
  /**
   * D1 - D012 | Descripción del tipo de transacción | Pagina 66
   */
  dDesTipTra?: DDesTipTra;
  /**
   * D1 - D013 | Tipo de impuesto afectado | Pagina 66
   */
  iTImp: ITImp;
  /**
   * D1 - D014 | Descripción del tipo de impuesto afectado | Pagina 67
   */
  dDesTImp: DDesTImp;
  /**
   * D1 - D015 | Moneda de la operación | Pagina 67
   */
  cMoneOpe: CodigoMoneda;
  /**
   * D1 - D016 | Descripción de la moneda de la operación | Pagina 67
   */
  dDesMoneOpe: DescripcionCodigoMoneda;
  /**
   * D1 - D017 | Condición del tipo de cambio | Pagina 67
   */
  dCondTiCam?: ICondTiCam;
  /**
   * D1 - D018 | Tipo de cambio de la operación | Pagina 67
   */
  dTiCam?: number;
  /**
   * D1 - D019 | Condición del Anticipo | Pagina 67
   */
  iCondAnt?: ICondAnt;
  /**
   * D1 - D020 | Descripción de la condición del Anticipo | Pagina 67
   */
  dDesCondAnt?: DDesCondAnt;
}

/**
 * D2 - D100 | Grupo de campos que identifican al emisor | Pagina 67
 */
export interface GEmis {
  /**
   * D2 - D101 | RUC del contribuyente emisor | Pagina 68
   */
  dRucEm: string;
  /**
   * D2 - D102 | Dígito verificador del RUC del contribuyente emisor | Pagina 68
   */
  dDVEmi: number;
  /**
   * D2 - D103 | Tipo de contribuyente | Pagina 68
   */
  iTipCont: ITipCont;
  /**
   * D2 - D104 | Tipo de régimen | Pagina 68
   */
  cTipReg?: number;
  /**
   * D2 - D105 | Nombre o razón social del emisor del DE | Pagina 68
   */
  dNomEmi: string;
  /**
   * D2 - D106 | Nombre de fantasía | Pagina 68
   */
  dNomFanEmi?: string;
  /**
   * D2 - D107 | Dirección del local donde se emite el DE | Pagina 68
   */
  dDirEmi: string;
  /**
   * D2 - D108 | Número de casa | Pagina 68
   */
  dNumCas: number;
  /**
   * D2 - D109 | Complemento de dirección 1 | Pagina 68
   */
  dCompDir1?: string;
  /**
   * D2 - D110 | Complemento de dirección 2 | Pagina 68
   */
  dCompDir2?: string;
  /**
   * D2 - D111 | Código del departamento de emisión | Pagina 68
   */
  cDepEmi: CodigoDepartamento;
  /**
   * D2 - D112 | Descripción del departamento de emisión | Pagina 68
   */
  dDesDepEmi: DescripcionCodigoDepartamento;
  /**
   * D2 - D113 | Código del distrito de emisión | Pagina 68
   */
  cDisEmi?: CodigoDistrito;
  /**
   * D2 - D114 | Descripción del distrito de emisión | Pagina 68
   */
  dDesDisEmi?: DescripcionCodigoDistrito;
  /**
   * D2 - D115 | Código de la ciudad de emisión | Pagina 69
   */
  cCiuEmi: CodigoCiudad;
  /**
   * D2 - D116 | Descripción de la ciudad de emisión | Pagina 69
   */
  dDesCiuEmi: DescripcionCodigoCiudad;
  /**
   * D2 - D117 | Teléfono local de emisión de DE | Pagina 69
   */
  dTelEmi: string;
  /**
   * D2 - D118 | Correo electrónico del emisor | Pagina 69
   */
  dEmailE: string;
  /**
   * D2 - D119 | Denominación comercial de la sucursal | Pagina 69
   */
  dDenSuc?: string;
  /**
   * D2.1 - D130 | Grupo de campos que describen la actividad económica del emisor | Pagina 69
   */
  gActEco: GActEco[];
  /**
   * D2.2 - D140 | Grupo de campos que identifican al responsable de la generación del DE | Pagina 70
   */
  gRespDE?: GRespDE;
}

/**
 * D2.1 - D130 | Campos que describen la actividad económica del emisor | Pagina 69
 */
export interface GActEco {
  /**
   * D2.1 - D131 | Código de la actividad económica del emisor | Pagina 69
   */
  cActEco: string;
  /**
   * D2.1 - D132 | Descripción de la actividad económica del emisor | Pagina 69
   */
  dDesActEco: string;
}

/**
 * D2.2 - D140 | Campos que identifican al responsable de la generación del DE | Pagina 70
 */
export interface GRespDE {
  /**
   * D2.2 - D141 | Tipo de documento de identidad del responsable de la generación del DE | Pagina 70
   */
  iTipIDRespDE: ITipIDRespDE;
  /**
   * D2.2 - D142 | Descripción del tipo de documento de identidad del responsable de la generación del DE | Pagina 70
   */
  dDTipIDRespDE: DDTipIDRespDE;
  /**
   * D2.2 - D143 | Número de documento de identidad del responsable de la generación del DE | Pagina 70
   */
  dNumIDRespDE: string;
  /**
   * D2.2 - D144 | Nombre o razón social del responsable de la generación del DE | Pagina 70
   */
  dNomRespDE: string;
  /**
   * D2.2 - D145 | Cargo del responsable de la generación del DE | Pagina 70
   */
  dCarRespDE: string;
}

/**
 * D3 - D200 | Grupo de campos que identifican al receptor | Pagina 70
 */
export interface GDatRec {
  /**
   * D3 - D201 | Naturaleza del receptor | Pagina 71
   */
  iNatRec: INatRec;
  /**
   * D3 - D202 | Tipo de operación | Pagina 71
   */
  iTiOpe: ITiOpe;
  /**
   * D3 - D203 | Código de país del receptor | Pagina 71
   */
  cPaisRec: CodigoPais;
  /**
   * D3 - D204 | Descripción del país receptor | Pagina 71
   */
  dDesPaisRe: DescripcionCodigoPais;
  /**
   * D3 - D205 | Tipo de contribuyente receptor | Pagina 71
   */
  iTiContRec?: ITiContRec;
  /**
   * D3 - D206 | RUC del receptor | Pagina 71
   */
  dRucRec?: string;
  /**
   * D3 - D207 | Dígito verificador del RUC del receptor | Pagina 71
   */
  dDVRec?: number;
  /**
   * D3 - D208 | Tipo de documento de identidad del receptor | Pagina 71
   */
  iTipIDRec?: ITipIDRec;
  /**
   * D3 - D209 | Descripción del tipo de documento de identidad | Pagina 72
   */
  dDTipIDRec?: DDTipIDRec;
  /**
   * D3 - D210 | Número de documento de identidad | Pagina 72
   */
  dNumIDRec?: string;
  /**
   * D3 - D211 | Nombre o razón social del receptor del DE | Pagina 72
   */
  dNomRec: string;
  /**
   * D3 - D212 | Nombre de fantasía | Pagina 72
   */
  dNomFanRec?: string;
  /**
   * D3 - D213 | Dirección del receptor | Pagina 72
   */
  dDirRec?: string;
  /**
   * D3 - D218 | Número de casa del receptor | Pagina 72
   */
  dNumCasRec?: number;
  /**
   * D3 - D219 | Código del departamento del receptor | Pagina 72
   */
  dDepRec?: CodigoDepartamento;
  /**
   * D3 - D220 | Descripción del departamento del receptor | Pagina 72
   */
  dDesDepRec?: DescripcionCodigoDepartamento;
  /**
   * D3 - D221 | Código del distrito del receptor | Pagina 72
   */
  dDisRec?: CodigoDistrito;
  /**
   * D3 - D222 | Descripción del distrito del receptor | Pagina 72
   */
  dDesDisRec?: DescripcionCodigoDistrito;
  /**
   * D3 - D223 | Código de la ciudad del receptor | Pagina 73
   */
  cCiuRec?: CodigoCiudad;
  /**
   * D3 - D224 | Descripción de la ciudad del receptor | Pagina 73
   */
  dDesCiuRec?: DescripcionCodigoCiudad;
  /**
   * D3 - D214 | Número de teléfono del receptor | Pagina 73
   */
  dTelRec?: string;
  /**
   * D3 - D215 | Número de celular del receptor | Pagina 73
   */
  dCelRec?: string;
  /**
   * D3 - D216 | Correo electrónico del receptor | Pagina 73
   */
  dEmailRec?: string;
  /**
   * D3 - D217 | Código del cliente | Pagina 73
   */
  dCodCliente?: string;
}
