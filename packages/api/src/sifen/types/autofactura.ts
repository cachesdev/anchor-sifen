// SIFEN Autofactura Electrónica Type Definitions v150
// Based on SIFEN Technical Manual v150 - DE_v150.xsd

// Import common types
import type { OperacionDE, DatosGenerales, Emisor, Receptor, ItemDE } from './common';

// ============================================================================
// Enums with clear values from field descriptions
// ============================================================================

/**
 * Naturaleza del vendedor - E301 | Pagina 75
 */
export const naturalezaVendedor = {
  NoContribuyente: 1,
  Extranjero: 2
} as const;
/**
 * Naturaleza del vendedor - E301 | Pagina 75
 */
export type NaturalezaVendedor = (typeof naturalezaVendedor)[keyof typeof naturalezaVendedor];

/**
 * Tipo de documento de identidad del vendedor - E304 | Pagina 75
 */
export const tipoDocumentoIdentidadVendedor = {
  CedulaParaguaya: 1,
  Pasaporte: 2,
  CedulaExtranjera: 3,
  CarnetResidencia: 4
} as const;
/**
 * Tipo de documento de identidad del vendedor - E304 | Pagina 75
 */
export type TipoDocumentoIdentidadVendedor =
  (typeof tipoDocumentoIdentidadVendedor)[keyof typeof tipoDocumentoIdentidadVendedor];

// ============================================================================
// Autofactura Electrónica (AFE) Types
// ============================================================================

/**
 * Autofactura Electrónica - Complete structure for self-invoices
 * Based on SIFEN Technical Manual v150 - DE_v150.xsd
 */
export interface AutofacturaElectronica {
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
    camposFirmados: CamposFirmadosAFE;
  };
}

/**
 * A001 | DE | Campos firmados del DE | Pagina 64
 */
export interface CamposFirmadosAFE {
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
  timbrado: TimbradoAFE;
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
   * E300 | gCamAE | Campos que componen la Autofactura Electrónica | Pagina 75
   */
  camposAFE: CamposAFE;
  /**
   * E700 | gItems | Campos que describen los ítems de la operación | Pagina 88
   */
  items: ItemDE[];
}

/**
 * C001 | gTimb | Datos del timbrado | Pagina 64
 */
export interface TimbradoAFE {
  /**
   * C002 | iTiDE | Tipo de Documento Electrónico | Pagina 64
   */
  tipoDocumento: number; // 4=Autofactura electrónica
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

/**
 * E300 | gCamAE | Campos que componen la Autofactura Electrónica | Pagina 75
 */
export interface CamposAFE {
  /**
   * E301 | iNatVen | Naturaleza del vendedor | Pagina 75
   */
  naturalezaVendedor: NaturalezaVendedor;
  /**
   * E302 | dDesNatVen | Descripción de la naturaleza del vendedor | Pagina 75
   */
  descripcionNaturalezaVendedor: string;
  /**
   * E304 | iTipIDVen | Tipo de documento de identidad del vendedor | Pagina 75
   */
  tipoDocumentoIdentidadVendedor: TipoDocumentoIdentidadVendedor;
  /**
   * E305 | dDTipIDVen | Descripción del tipo de documento de identidad del vendedor | Pagina 75
   */
  descripcionTipoDocumentoIdentidadVendedor: string;
  /**
   * E306 | dNumIDVen | Número de documento de identidad del vendedor | Pagina 75
   */
  numeroDocumentoIdentidadVendedor: string;
  /**
   * E307 | dNomVen | Nombre y apellido del vendedor | Pagina 75
   */
  nombreVendedor: string;
  /**
   * E308 | dDirVen | Dirección del vendedor | Pagina 75
   */
  direccionVendedor: string;
  /**
   * E309 | dNumCasVen | Número de casa del vendedor | Pagina 75
   */
  numeroCasaVendedor: number;
  /**
   * E310 | cDepVen | Código del departamento del vendedor | Pagina 76
   */
  codigoDepartamentoVendedor: number; // TODO: Define enum based on XSD Departamentos
  /**
   * E311 | dDesDepVen | Descripción del departamento del vendedor | Pagina 76
   */
  descripcionDepartamentoVendedor: string;
  /**
   * E312 | cDisVen | Código del distrito del vendedor | Pagina 76
   */
  codigoDistritoVendedor?: number; // TODO: Define enum based on Tabla 2.1
  /**
   * E313 | dDesDisVen | Descripción del distrito del vendedor | Pagina 76
   */
  descripcionDistritoVendedor?: string;
  /**
   * E314 | cCiuVen | Código de la ciudad del vendedor | Pagina 76
   */
  codigoCiudadVendedor: number; // TODO: Define enum based on Tabla 2.2
  /**
   * E315 | dDesCiuVen | Descripción de la ciudad del vendedor | Pagina 76
   */
  descripcionCiudadVendedor: string;
  /**
   * E316 | dDirProv | Lugar de la transacción | Pagina 76
   */
  lugarTransaccion: string;
  /**
   * E317 | cDepProv | Código del departamento donde se realiza la transacción | Pagina 76
   */
  codigoDepartamentoTransaccion: number; // TODO: Define enum based on XSD Departamentos
  /**
   * E318 | dDesDepProv | Descripción del departamento donde se realiza la transacción | Pagina 76
   */
  descripcionDepartamentoTransaccion: string;
  /**
   * E319 | cDisProv | Código del distrito donde se realiza la transacción | Pagina 76
   */
  codigoDistritoTransaccion?: number; // TODO: Define enum based on Tabla 2.1
  /**
   * E320 | dDesDisProv | Descripción del distrito donde se realiza la transacción | Pagina 76
   */
  descripcionDistritoTransaccion?: string;
  /**
   * E321 | cCiuProv | Código de la ciudad donde se realiza la transacción | Pagina 76
   */
  codigoCiudadTransaccion: number; // TODO: Define enum based on Tabla 2.2
  /**
   * E322 | dDesCiuProv | Descripción de la ciudad donde se realiza la transacción | Pagina 76
   */
  descripcionCiudadTransaccion: string;
}
