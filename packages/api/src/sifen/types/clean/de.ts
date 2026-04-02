import type { LiteralUnion } from 'type-fest';
import type { Receptor, Emisor, OperacionComercial } from './d';
import type {
  AutofacturaElectronica,
  CondicionOperacion,
  UsoComercial,
  CamposFacturaElectronica,
  ItemOperacion,
  NotaCreditoDebitoElectronica,
  NotaRemisionElectronica,
  Transporte
} from './e';
import type { TipoDocumentoElectronico, TipoEmision } from '../enums';
import type { SubtotalesTotales } from './f';
import type { UsoGeneral } from './g';
import type { DocumentoElectronicoAsociado } from './h';

/**
 * NOTAS:
 * DocumentoElectronico y DE tienen un sufijo `C` ya que sus tipos se llaman igual
 * en `raw`.
 */

/**
 * AA | Documento Electrónico | Pagina 61
 */
export interface DocumentoElectronicoC {
  /**
   * AA - AA001 | rDE | Documento Electrónico elemento raíz | Pagina 61
   */
  rDE: {
    /**
     * AA - AA002 | dVerFor | Versión del formato | Pagina 61
     */
    versionFormato: 150;
    /**
     * A - A001 | DE | Campos firmados del DE | Pagina 61
     */
    DE: DEC;
  };
}

/**
 * A - A001 | DE | Campos firmados del DE | Pagina 61
 *
 * A002 (CDC) Omitido, ya que es un atributo y no un campo del DE.
 */
export interface DEC {
  /**
   * A - A003 | dDVId | Dígito verificador del identificador del DE | Pagina 61
   */
  digitoVerificadorId: number;
  /**
   * A - A004 | dFecFirma | Fecha de la firma | Pagina 62
   *
   * Formato: AAAA-MM-DDThh:mm:ss
   */
  fechaFirma: Date;
  /**
   * B - B001 | gOpeDE | Campos inherentes a la operación de DE | Pagina 62
   */
  operacionDE: OperacionDE;
  /**
   * C - C001 | gTimb | Datos del timbrado | Pagina 63
   */
  timbrado: Timbrado;
  /**
   * D - D001 | gDatGralOpe | Campos generales del DE | Pagina 65
   */
  datosGeneralesOperacion: DatosGeneralesOperacion;
  /**
   * E - E001 | gDtipDE | Campos específicos por tipo de Documento Electrónico | Pagina 73
   */
  datosEspecificosPorTipoDE: DatosEspecificosPorTipoDE;
  /**
   * F - F001 | gTotSub | Campos de subtotales y totales | Pagina 102
   */
  subtotalesTotales?: SubtotalesTotales;
  /**
   * G - G001 | gCamGen | Campos de uso general | Pagina 106
   */
  camposUsoGeneral?: UsoGeneral;
  /**
   * H - H001 | gCamDEAsoc | Campos que identifican al DE asociado | Pagina 108
   */
  camposDocumentoElectronicoAsociado?: DocumentoElectronicoAsociado;
}

/**
 * B - B001 | gOpeDE | Campos inherentes a la operación de DE | Pagina 62
 */
export interface OperacionDE {
  /**
   * B - B002 | iTipEmi | Tipo de emisión | Pagina 62
   */
  tipoEmision: LiteralUnion<TipoEmision, number>;
  /**
   * B - B004 | dCodSeg | Código de seguridad | Pagina 62
   *
   * Si no es proveido, entonces es autogenerado.
   */
  codigoSeguridad?: number;
  /**
   * B - B005 | dInfoEmi | Información de interés del emisor respecto al DE | Pagina 62
   */
  informacionEmisor?: string;
  /**
   * B - B006 | dInfoFisc | Información de interés del Fisco respecto al DE | Pagina 63
   */
  informacionFisco?: string;
}

/**
 * C - C001 | gTimb | Datos del timbrado | Pagina 63
 */
export interface Timbrado {
  /**
   * C - C002 | iTiDE | Tipo de Documento Electrónico | Pagina 63
   */
  tipoDocumento: LiteralUnion<TipoDocumentoElectronico, number>;
  /**
   * C - C004 | dNumTim | Número del timbrado | Pagina 63
   */
  numeroTimbrado: number;
  /**
   * C - C005 | dEst | Establecimiento | Pagina 64
   *
   * Padding agregado automaticamente
   */
  establecimiento: number;
  /**
   * C - C006 | dPunExp | Punto de expedición | Pagina 64
   *
   * Padding agregado automaticamente
   */
  puntoExpedicion: number;
  /**
   * C - C007 | dNumDoc | Número del documento | Pagina 64
   *
   * Padding agregado automaticamente
   */
  numeroDocumento: number;
  /**
   * C - C010 | dSerieNum | Serie del número de timbrado | Pagina 64
   */
  serieNumero?: string;
  /**
   * C - C008 | dFeIniT | Fecha inicio de vigencia del timbrado | Pagina 64
   *
   * Formato: AAAA-MM-DD
   */
  fechaInicioVigencia: Date;
}

/**
 * D - D001 | gDatGralOpe | Campos generales del DE | Pagina 65
 */
export interface DatosGeneralesOperacion {
  /**
   * D - D002 | dFeEmiDE | Fecha y hora de emisión del DE | Pagina 65
   *
   * Formato: AAAA-MM-DDThh:mm:ss
   */
  fechaEmisionDE: Date;
  /**
   * D1 - D010 | gOpeCom | Campos inherentes a la operación comercial | Pagina 65
   */
  operacionComercial?: OperacionComercial;
  /**
   * D2 - D100 | gEmis | Grupo de campos que identifican al emisor | Pagina 67
   */
  emisor: Emisor;
  /**
   * D3 - D200 | gDatRec | Grupo de campos que identifican al receptor | Pagina 70
   */
  receptor: Receptor;
}

/**
 * E - E001 | gDtipDE | Campos específicos por tipo de Documento Electrónico | Pagina 73
 */
export interface DatosEspecificosPorTipoDE {
  /**
   * E1 - E010 | gCamFE | Campos que componen la FE | Pagina 73
   */
  facturaElectronica?: CamposFacturaElectronica;
  /**
   * E4 - E300 | gCamAE | Campos que componen la Autofactura Electrónica | Pagina 75
   */
  autofacturaElectronica?: AutofacturaElectronica;
  /**
   * E5 - E400 | gCamNCDE | Campos de la Nota de Crédito/Débito Electrónica | Pagina 77
   */
  notaCreditoDebitoElectronica?: NotaCreditoDebitoElectronica;
  /**
   * E6 - E500 | gCamNRE | Campos que componen la Nota de Remisión Electrónica | Pagina 77
   */
  notaRemisionElectronica?: NotaRemisionElectronica;
  /**
   * E7 - E600 | gCamCond | Campos que describen la condición de la operación | Pagina 80
   */
  condicionOperacion?: CondicionOperacion;
  /**
   * E8 - E700 | gCamItem | Campos que describen los ítems de la operación | Pagina 85
   */
  itemsOperacion?: ItemOperacion[];
  /**
   * E9 - E790 | gCamEsp | Campos complementarios comerciales de uso específico | Pagina 93
   */
  usosComerciales?: UsoComercial;
  /**
   * E10 - E900 | gTransp | Campos que describen el transporte de mercaderías | Pagina 96
   */
  transporte?: Transporte;
}
