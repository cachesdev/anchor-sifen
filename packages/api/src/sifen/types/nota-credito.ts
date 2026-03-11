// SIFEN Nota de Crédito Electrónica Type Definitions v150
// Based on SIFEN Technical Manual v150 - DE_v150.xsd

import type { OperacionDE, DatosGenerales, Emisor, Receptor, ItemDE } from './common';
import type { CamposNCDE } from './sifen-ncde-common';

/**
 * Nota de Crédito Electrónica - Complete structure for credit notes
 * Based on SIFEN Technical Manual v150 - DE_v150.xsd
 */
export interface NotaCreditoElectronica {
  /**
   * AA001 | rDE | Documento Electrónico elemento raíz | Pagina 64
   */
  documentoElectronico: {
    /**
     * AA002 | dVerFor | Versión del formato | Pagina 64
     */
    versionFormato: number;
    /**
     * A001 | DE | Campos firmados del DE | Pagina 64
     */
    camposFirmados: CamposFirmadosNCE;
  };
}

/**
 * A001 | DE | Campos firmados del DE | Pagina 64
 */
export interface CamposFirmadosNCE {
  /**
   * A002 | Id | Identificador del DE | Pagina 64
   */
  identificador: string; // CDC
  /**
   * A003 | dDVId | Dígito verificador del identificador del DE | Pagina 64
   */
  digitoVerificador: number;
  /**
   * A004 | dFecFirma | Fecha de la firma | Pagina 64
   */
  fechaFirma: string; // Format: AAAA-MM-DDThh:mm:ss
  /**
   * A005 | dSisFact | Sistema de facturación | Pagina 64
   */
  sistemaFacturacion: number; // TODO: Define enum based on available values
  /**
   * B001 | gOpeDE | Campos inherentes a la operación de DE | Pagina 65
   */
  operacionDE: OperacionDE;
  /**
   * C001 | gTimb | Datos del timbrado | Pagina 64
   */
  timbrado: TimbradoNCE;
  /**
   * D001 | gDatGralOpe | Campos generales del DE | Pagina 65
   */
  datosGenerales: DatosGenerales;
  /**
   * D100 | gEmis | Grupo de campos que identifican al emisor | Pagina 67
   */
  emisor: Emisor;
  /**
   * D200 | gDatRec | Grupo de campos que identifican al receptor | Pagina 69
   */
  receptor?: Receptor;
  /**
   * E400 | gCamNCDE | Campos de la Nota de Crédito/Débito Electrónica | Pagina 77
   */
  camposNCDE: CamposNCDE;
  /**
   * E700 | gItems | Campos que describen los ítems de la operación | Pagina 88
   */
  items: ItemDE[];
}

/**
 * C001 | gTimb | Datos del timbrado | Pagina 64
 */
export interface TimbradoNCE {
  /**
   * C002 | iTiDE | Tipo de Documento Electrónico | Pagina 64
   */
  tipoDocumento: number; // 5=Nota de crédito electrónica
  /**
   * C003 | dDesTiDE | Descripción del tipo de documento electrónico | Pagina 64
   */
  descripcionTipoDocumento: string;
  /**
   * C004 | dNumTim | Número del timbrado | Pagina 64
   */
  numeroTimbrado: number;
  /**
   * C005 | dEst | Establecimiento | Pagina 64
   */
  establecimiento: string;
  /**
   * C006 | dPunExp | Punto de expedición | Pagina 64
   */
  puntoExpedicion: string;
  /**
   * C007 | dNumDoc | Número del documento | Pagina 64
   */
  numeroDocumento: string;
  /**
   * C008 | dFeIniT | Fecha inicio de vigencia del timbrado | Pagina 64
   */
  fechaInicioVigencia: string; // Format: AAAA-MM-DD
  /**
   * C009 | dFeFinT | Fecha fin de vigencia del timbrado | Pagina 64
   */
  fechaFinVigencia: string; // Format: AAAA-MM-DD
  /**
   * C010 | dSerieNum | Serie del número de timbrado | Pagina 64
   */
  serieNumero?: string;
}
