// SIFEN Common Type Definitions v150
// Shared types used across different DTE types

// ============================================================================
// Enums with clear values from field descriptions
// ============================================================================

/**
 * Tipo de emisión - B002 | Pagina 65
 */
export const tipoEmision = {
  Normal: 1,
  Contingencia: 2
} as const;

/**
 * Tipo de emisión - B002 | Pagina 65
 */
export type TipoEmision = (typeof tipoEmision)[keyof typeof tipoEmision];

export const descripcionTipoEmision = {
  [tipoEmision.Normal]: 'Normal',
  [tipoEmision.Contingencia]: 'Contingencia'
} as const;
export type DescripcionTipoEmision =
  (typeof descripcionTipoEmision)[keyof typeof descripcionTipoEmision];

/**
 * Tipo de impuesto afectado - D013 | Pagina 66
 */
export const tipoImpuesto = {
  IVA: 1,
  ISC: 2,
  Renta: 3,
  Ninguno: 4,
  IVARenta: 5
} as const;
/**
 * Tipo de impuesto afectado - D013 | Pagina 66
 */
export type TipoImpuesto = (typeof tipoImpuesto)[keyof typeof tipoImpuesto];

/**
 * Condición del tipo de cambio - D017 | Pagina 66
 */
export const condicionTipoCambio = {
  Global: 1,
  PorItem: 2
} as const;
/**
 * Condición del tipo de cambio - D017 | Pagina 66
 */
export type CondicionTipoCambio = (typeof condicionTipoCambio)[keyof typeof condicionTipoCambio];

/**
 * Condición del Anticipo - D019 | Pagina 66
 */
export const condicionAnticipo = {
  Global: 1,
  PorItem: 2
} as const;
/**
 * Condición del Anticipo - D019 | Pagina 66
 */
export type CondicionAnticipo = (typeof condicionAnticipo)[keyof typeof condicionAnticipo];

/**
 * Tipo de contribuyente - D103 | Pagina 67
 */
export const tipoContribuyente = {
  PersonaFisica: 1,
  PersonaJuridica: 2
} as const;
/**
 * Tipo de contribuyente - D103 | Pagina 67
 */
export type TipoContribuyente = (typeof tipoContribuyente)[keyof typeof tipoContribuyente];

/**
 * Tipo de documento de identidad del receptor - D202 | Pagina 69
 */
export const tipoDocumentoIdentidad = {
  CedulaParaguaya: 1,
  RUC: 2,
  Pasaporte: 3,
  CedulaExtranjera: 4,
  CarnetResidencia: 5
} as const;
/**
 * Tipo de documento de identidad del receptor - D202 | Pagina 69
 */
export type TipoDocumentoIdentidad =
  (typeof tipoDocumentoIdentidad)[keyof typeof tipoDocumentoIdentidad];

/**
 * Tipo de operación - D220 | Pagina 69
 */
export const tipoOperacion = {
  OperacionInterna: 1,
  Exportacion: 2,
  Importacion: 3
} as const;
/**
 * Tipo de operación - D220 | Pagina 69
 */
export type TipoOperacion = (typeof tipoOperacion)[keyof typeof tipoOperacion];

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
   * B003 | dDesTipEmi | Descripción del tipo de emisión | Pagina 65
   */
  descripcionTipoEmision: DescripcionTipoEmision;
  /**
   * B004 | dCodSeg | Código de seguridad | Pagina 65
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
  fechaHoraEmision: string; // Format: AAAA-MM-DDThh:mm:ss
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
  tipoTransaccion?: number; // TODO: Define enum (1=Venta mercadería, 2=Prestación servicios, etc.)
  /**
   * D012 | dDesTipTra | Descripción del tipo de transacción | Pagina 66
   */
  descripcionTipoTransaccion?: string;
  /**
   * D013 | iTImp | Tipo de impuesto afectado | Pagina 66
   */
  tipoImpuesto: TipoImpuesto;
  /**
   * D014 | dDesTImp | Descripción del tipo de impuesto afectado | Pagina 66
   */
  descripcionTipoImpuesto: string;
  /**
   * D015 | cMoneOpe | Moneda de la operación | Pagina 66
   */
  monedaOperacion: string; // TODO: Define enum based on ISO 4217
  /**
   * D016 | dDesMoneOpe | Descripción de la moneda de la operación | Pagina 66
   */
  descripcionMonedaOperacion: string;
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
  tipoRegimen?: number; // TODO: Define enum based on Tabla 1
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
  codigoDepartamento: number; // TODO: Define enum based on XSD Departamentos
  /**
   * D112 | dDesDepEmi | Descripción del departamento de emisión | Pagina 67
   */
  descripcionDepartamento: string;
  /**
   * D113 | cDisEmi | Código del distrito de emisión | Pagina 67
   */
  codigoDistrito?: number; // TODO: Define enum based on Tabla 2.1
  /**
   * D114 | dDesDisEmi | Descripción del distrito de emisión | Pagina 67
   */
  descripcionDistrito?: string;
  /**
   * D115 | cCiuEmi | Código de la ciudad de emisión | Pagina 68
   */
  codigoCiudad: number; // TODO: Define enum based on Tabla 2.2
  /**
   * D116 | dDesCiuEmi | Descripción de la ciudad de emisión | Pagina 68
   */
  descripcionCiudad: string;
  /**
   * D130 | gActEco | Campos que describen la actividad económica del emisor | Pagina 68
   */
  actividadesEconomicas: ActividadEconomica[];
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
 * D200 | gDatRec | Grupo de campos que identifican al receptor | Pagina 69
 */
export interface Receptor {
  /**
   * D201 | dRucRec | RUC del receptor | Pagina 69
   */
  ruc?: string;
  /**
   * D202 | iTipIDRec | Tipo de documento de identidad del receptor | Pagina 69
   */
  tipoDocumentoIdentidad: TipoDocumentoIdentidad;
  /**
   * D203 | dNumIDRec | Número de documento de identidad del receptor | Pagina 69
   */
  numeroDocumentoIdentidad: string;
  /**
   * D204 | dDVRec | Dígito verificador del documento del receptor | Pagina 69
   */
  digitoVerificador?: number;
  /**
   * D205 | iTipContRec | Tipo de contribuyente del receptor | Pagina 69
   */
  tipoContribuyente?: TipoContribuyente;
  /**
   * D206 | dNomRec | Nombre o razón social del receptor | Pagina 69
   */
  nombre: string;
  /**
   * D207 | dNomFanRec | Nombre de fantasía del receptor | Pagina 69
   */
  nombreFantasia?: string;
  /**
   * D208 | dDirRec | Dirección del receptor | Pagina 69
   */
  direccion?: string;
  /**
   * D209 | dNumCasRec | Número de casa del receptor | Pagina 69
   */
  numeroCasa?: number;
  /**
   * D210 | dCompDir1Rec | Complemento de dirección 1 del receptor | Pagina 69
   */
  complementoDireccion1?: string;
  /**
   * D211 | dCompDir2Rec | Complemento de dirección 2 del receptor | Pagina 69
   */
  complementoDireccion2?: string;
  /**
   * D212 | cDepRec | Código del departamento del receptor | Pagina 69
   */
  codigoDepartamento?: number; // TODO: Define enum based on XSD Departamentos
  /**
   * D213 | dDesDepRec | Descripción del departamento del receptor | Pagina 69
   */
  descripcionDepartamento?: string;
  /**
   * D214 | cDisRec | Código del distrito del receptor | Pagina 69
   */
  codigoDistrito?: number; // TODO: Define enum based on Tabla 2.1
  /**
   * D215 | dDesDisRec | Descripción del distrito del receptor | Pagina 69
   */
  descripcionDistrito?: string;
  /**
   * D216 | cCiuRec | Código de la ciudad del receptor | Pagina 69
   */
  codigoCiudad?: number; // TODO: Define enum based on Tabla 2.2
  /**
   * D217 | dDesCiuRec | Descripción de la ciudad del receptor | Pagina 69
   */
  descripcionCiudad?: string;
  /**
   * D218 | dTelRec | Teléfono del receptor | Pagina 69
   */
  telefono?: string;
  /**
   * D219 | dCorRec | Correo electrónico del receptor | Pagina 69
   */
  correo?: string;
  /**
   * D220 | iTiOpe | Tipo de operación | Pagina 69
   */
  tipoOperacion: TipoOperacion;
  /**
   * D221 | dDesTiOpe | Descripción del tipo de operación | Pagina 69
   */
  descripcionTipoOperacion: string;
  /**
   * D222 | iTiContRec | Tipo de contribuyente receptor | Pagina 69
   */
  tipoContribuyenteReceptor?: number; // TODO: Define enum (1=Contribuyente IVA, 2=Consumidor final, etc.)
  /**
   * D223 | dDesTiContRec | Descripción del tipo de contribuyente receptor | Pagina 69
   */
  descripcionTipoContribuyenteReceptor?: string;
  /**
   * D224 | dCodIntRec | Código interno del receptor | Pagina 69
   */
  codigoInterno?: string;
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
