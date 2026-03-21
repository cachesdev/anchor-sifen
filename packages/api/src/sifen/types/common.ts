// SIFEN Common Type Definitions v150
// Shared types used across different DTE types

import type { CodigoCiudad } from '../../gen/ciudades';
import type { CodigoDepartamento } from '../../gen/departamentos';
import type { CodigoDistrito } from '../../gen/distritos';
import type { CodigoMoneda } from '../../gen/iso4217';
import type { CodigoPais } from '../../gen/paises';
import type {
  CondicionAnticipo,
  CondicionTipoCambio,
  NaturalezaReceptor,
  TipoContribuyente,
  TipoContribuyenteReceptor,
  TipoDocumentoIdentidadReceptor,
  TipoDocumentoResponsable,
  TipoEmision,
  TipoImpuesto,
  TipoOperacion,
  TipoRegimen,
  TipoTransaccion
} from './enums';

// ============================================================================
// Enums with clear values from field descriptions
// ============================================================================

// ============================================================================
// Common Interfaces
// ============================================================================

/**
 * B001 | gOpeDE | Campos inherentes a la operación de DE | Pagina 65
 */
export interface OperacionDE {
  /**
   * B002 | iTipEmi | Tipo de emisión | Pagina 65
   */
  tipoEmision: TipoEmision;
  /**
   * B004 | dCodSeg | Código de seguridad | Pagina 65
   *
   * Codigo de 9 digitos generado aleatoriamente por el emisor
   */
  codigoSeguridad: number;
  /**
   * B005 | dInfoEmi | Información de interés del emisor respecto al DE | Pagina 65
   */
  informacionEmisor?: string;
  /**
   * B006 | dInfoFisc | Información de interés del Fisco respecto al DE | Pagina 65
   */
  informacionFisco?: string;
}

/**
 * D001 | gDatGralOpe | Campos generales del DE | Pagina 65
 */
export interface DatosGenerales {
  /**
   * D002 | dFeEmiDE | Fecha y hora de emisión del DE | Pagina 65
   */
  fechaHoraEmision: Date; // Format: AAAA-MM-DDThh:mm:ss
  /**
   * D010 | gOpeCom | Campos inherentes a la operación comercial | Pagina 65
   */
  operacionComercial?: OperacionComercial;
}

/**
 * D010 | gOpeCom | Campos inherentes a la operación comercial | Pagina 65
 */
export interface OperacionComercial {
  /**
   * D011 | iTipTra | Tipo de transacción | Pagina 66
   */
  tipoTransaccion?: TipoTransaccion;
  /**
   * D013 | iTImp | Tipo de impuesto afectado | Pagina 66
   */
  tipoImpuesto: TipoImpuesto;
  /**
   * D015 | cMoneOpe | Moneda de la operación | Pagina 66
   */
  monedaOperacion: CodigoMoneda;
  /**
   * D017 | dCondTiCam | Condición del tipo de cambio | Pagina 66
   */
  condicionTipoCambio?: CondicionTipoCambio;
  /**
   * D018 | dTiCam | Tipo de cambio de la operación | Pagina 66
   */
  tipoCambio?: number;
  /**
   * D019 | iCondAnt | Condición del Anticipo | Pagina 66
   */
  condicionAnticipo?: CondicionAnticipo;
  /**
   * D020 | dDesCondAnt | Descripción de la condición del Anticipo | Pagina 66
   */
  descripcionCondicionAnticipo?: string;
}

/**
 * D100 | gEmis | Grupo de campos que identifican al emisor | Pagina 67
 */
export interface Emisor {
  /**
   * D101 | dRucEm | RUC del contribuyente emisor | Pagina 67
   */
  ruc: string;
  /**
   * D102 | dDVEmi | Dígito verificador del RUC del contribuyente emisor | Pagina 67
   */
  digitoVerificadorRuc: number;
  /**
   * D103 | iTipCont | Tipo de contribuyente | Pagina 67
   */
  tipoContribuyente: TipoContribuyente;
  /**
   * D104 | cTipReg | Tipo de régimen | Pagina 67
   */
  tipoRegimen?: TipoRegimen;
  /**
   * D105 | dNomEmi | Nombre o razón social del emisor del DE | Pagina 67
   */
  nombre: string;
  /**
   * D106 | dNomFanEmi | Nombre de fantasía | Pagina 67
   */
  nombreFantasia?: string;
  /**
   * D107 | dDirEmi | Dirección del local donde se emite el DE | Pagina 67
   */
  direccion: string;
  /**
   * D108 | dNumCas | Número de casa | Pagina 67
   */
  numeroCasa: number;
  /**
   * D109 | dCompDir1 | Complemento de dirección 1 | Pagina 67
   */
  complementoDireccion1?: string;
  /**
   * D110 | dCompDir2 | Complemento de dirección 2 | Pagina 67
   */
  complementoDireccion2?: string;
  /**
   * D111 | cDepEmi | Código del departamento de emisión | Pagina 67
   */
  codigoDepartamento: CodigoDepartamento;
  /**
   * D113 | cDisEmi | Código del distrito de emisión | Pagina 67
   */
  codigoDistrito?: CodigoDistrito;
  /**
   * D115 | cCiuEmi | Código de la ciudad de emisión | Pagina 68
   */
  codigoCiudad: CodigoCiudad;
  /**
   * D117 | dTelEmi | Teléfono local de emisión de DE | Pagina 69
   */
  telefonoEmisor: string;
  /**
   * D118 | dEmailE | Correo electrónico del emisor | Pagina 69
   */
  emailEmisor: string;
  /**
   * D119 | dDenSuc | Denominación comercial de la sucursal | Pagina 69
   */
  denominacionSucursal?: string;
  /**
   * D130 | gActEco | Campos que describen la actividad económica del emisor | Pagina 68
   */
  actividadesEconomicas: ActividadEconomica[];
  /**
   * D140 | gRespDE | Grupo de campos que identifican al responsable de la generacion DE | Pagina 70
   */
  responsableDE?: ResponsableDE;
}

/**
 * D140 | gRespDE | Campos que identifican al responsable de la generación del DE | Pagina 69
 */
export interface ResponsableDE {
  /**
   * D141 | Tipo de documento de identidad del responsable de la generación del DE | Pagina 69
   */
  tipoDocumentoResponsable: TipoDocumentoResponsable;
  /**
   * D143 | Número de documento de identidad del responsable de la generación del DE | Pagina 69
   */
  numeroDocumentoResponsable: string;
  /**
   * D144 | Nombre o razón social del responsable de la generación del DE | Pagina 69
   */
  nombreResponsable: string;
  /**
   * D145 | Cargo del responsable de la generación del DE | Pagina 69
   */
  cargoResponsable: string;
}

/**
 * D130 | gActEco | Campos que describen la actividad económica del emisor | Pagina 68
 */
export interface ActividadEconomica {
  /**
   * D131 | cActEco | Código de la actividad económica | Pagina 68
   */
  codigo: number; // TODO: Define enum based on available codes
  /**
   * D132 | dDesActEco | Descripción de la actividad económica | Pagina 68
   */
  descripcion: string;
}

/**
 * D200 | gDatRec | Grupo de campos que identifican al receptor | Pagina 70
 */
export interface Receptor {
  /**
   * D201 | iNatRec | Naturaleza del receptor | Pagina 71
   */
  naturalezaReceptor: NaturalezaReceptor;
  /**
   * D202 | iTiOpe | Tipo de operación | Pagina 71
   */
  tipoOperacion: TipoOperacion;
  /**
   * D203 | cPaisRec | Código de país del receptor | Pagina 71
   */
  codigoPais: CodigoPais;
  /**
   * D205 | iTiContRec | Tipo de contribuyente receptor | Pagina 71
   */
  tipoContribuyente?: TipoContribuyenteReceptor;
  /**
   * D206 | dRucRec | RUC del receptor | Pagina 71
   */
  ruc?: string;
  /**
   * D207 | dDVRec | Dígito verificador del RUC del receptor | Pagina 71
   */
  digitoVerificadorRuc?: number;
  /**
   * D208 | iTipIDRec | Tipo de documento de identidad del receptor | Pagina 71
   */
  tipoDocumentoIdentidad?: TipoDocumentoIdentidadReceptor;
  /**
   * D209 | dDTipIDRec | Descripcion de tipo documento de identidad del receptor | Pagina 71
   *
   * solo pasar si tipoDocumentoIdentidad es Otro (9)
   */
  descripcionDocumentoIdentidad?: string;
  /**
   * D210 | dNumIDRec | Número de documento de identidad | Pagina 72
   */
  numeroDocumentoIdentidad?: string;
  /**
   * D211 | dNomRec | Nombre o razón social del receptor del DE | Pagina 72
   */
  nombre: string;
  /**
   * D212 | dNomFanRec | Nombre de fantasía | Pagina 72
   */
  nombreFantasia?: string;
  /**
   * D213 | dDirRec | Dirección del receptor | Pagina 72
   */
  direccion?: string;
  /**
   * D218 | dNumCasRec | Número de casa del receptor | Pagina 72
   */
  numeroCasa?: number;
  /**
   * D219 | dDepRec | Código del departamento del receptor | Pagina 72
   */
  codigoDepartamento?: CodigoDepartamento;
  /**
   * D221 | dDisRec | Código del distrito del receptor | Pagina 72
   */
  codigoDistrito?: CodigoDistrito;
  /**
   * D223 | cCiuRec | Código de la ciudad del receptor | Pagina 73
   */
  codigoCiudad?: CodigoCiudad;
  /**
   * D214 | dTelRec | Número de teléfono del receptor | Pagina 73
   */
  telefono?: string;
  /**
   * D215 | dCelRec | Número de celular del receptor | Pagina 73
   */
  celular?: string;
  /**
   * D216 | dEmailRec | Correo electrónico del receptor | Pagina 73
   */
  email?: string;
  /**
   * D217 | dCodCliente | Código del cliente | Pagina 73
   */
  codigoCliente?: string;
}

/**
 * E700 | gItems | Campos que describen los ítems de la operación | Pagina 88
 */
export interface ItemDE {
  /**
   * E710 | dCodInt | Código interno del ítem | Pagina 88
   */
  codigoInterno?: string;
  /**
   * E711 | dDesPro | Descripción del producto/servicio | Pagina 88
   */
  descripcion: string;
  /**
   * E712 | cUniMed | Código de unidad de medida | Pagina 88
   */
  codigoUnidadMedida: number; // TODO: Define enum based on available units
  /**
   * E713 | dDesUniMed | Descripción de la unidad de medida | Pagina 88
   */
  descripcionUnidadMedida: string;
  /**
   * E714 | dCantPro | Cantidad del producto/servicio | Pagina 88
   */
  cantidad: number;
  /**
   * E715 | dPreUniPro | Precio unitario del producto/servicio | Pagina 88
   */
  precioUnitario: number;
  /**
   * E716 | dPreTotPro | Precio total del producto/servicio | Pagina 88
   */
  precioTotal: number;
  /**
   * E717 | dTotGralItem | Total general del ítem | Pagina 88
   */
  totalGeneralItem: number;
  /**
   * E730 | gCamIVA | Campos que describen el IVA de la operación por ítem | Pagina 89
   */
  iva?: IVAItem;
  /**
   * E740 | gCamISC | Campos que describen el ISC de la operación por ítem | Pagina 89
   */
  isc?: ISCItem;
}

/**
 * E730 | gCamIVA | Campos que describen el IVA de la operación por ítem | Pagina 89
 */
export interface IVAItem {
  /**
   * E731 | iTasaIVA | Tasa de IVA | Pagina 89
   */
  tasaIVA: number; // TODO: Define enum (5=5%, 10=10%, etc.)
  /**
   * E732 | dDesTasaIVA | Descripción de la tasa de IVA | Pagina 89
   */
  descripcionTasaIVA: string;
  /**
   * E733 | dBaseGravIVA | Base gravada de IVA | Pagina 89
   */
  baseGravadaIVA: number;
  /**
   * E734 | dLiqIVA | Líquido IVA | Pagina 89
   */
  liquidadoIVA: number;
}

/**
 * E740 | gCamISC | Campos que describen el ISC de la operación por ítem | Pagina 89
 */
export interface ISCItem {
  /**
   * E741 | iTasaISC | Tasa de ISC | Pagina 89
   */
  tasaISC: number; // TODO: Define enum based on available rates
  /**
   * E742 | dDesTasaISC | Descripción de la tasa de ISC | Pagina 89
   */
  descripcionTasaISC: string;
  /**
   * E743 | dBaseGravISC | Base gravada de ISC | Pagina 89
   */
  baseGravadaISC: number;
  /**
   * E744 | dLiqISC | Líquido ISC | Pagina 89
   */
  liquidadoISC: number;
}
