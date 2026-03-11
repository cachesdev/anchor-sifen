// SIFEN Nota de Remisión Electrónica Type Definitions v150
// Based on SIFEN Technical Manual v150 - DE_v150.xsd

// Import common types
import type { OperacionDE, DatosGenerales, Emisor, Receptor, ItemDE } from './common';

// ============================================================================
// Enums with clear values from field descriptions
// ============================================================================

/**
 * Motivo de emisión - E501 | Pagina 77
 */
/**
 * Motivo de emisión - E501 | Pagina 77
 */
export const motivoEmisionNRE = {
  TrasladoPorVenta: 1,
  TrasladoPorConsignacion: 2,
  Exportacion: 3,
  TrasladoPorCompra: 4,
  Importacion: 5,
  TrasladoPorDevolucion: 6,
  TrasladoEntreLocalesEmpresa: 7,
  TrasladoBienesPorTransformacion: 8,
  TrasladoBienesPorReparacion: 9,
  TrasladoPorEmisorMovil: 10,
  ExhibicionDemostracion: 11,
  ParticipacionFerias: 12,
  TrasladoEncomienda: 13,
  Decomiso: 14,
  Otro: 99
} as const;
/**
 * Motivo de emisión - E501 | Pagina 77
 */
export type MotivoEmisionNRE = (typeof motivoEmisionNRE)[keyof typeof motivoEmisionNRE];

/**
 * Responsable de la emisión de la Nota Remisión Electrónica - E503 | Pagina 78
 */
/**
 * Responsable de la emisión de la Nota Remisión Electrónica - E503 | Pagina 78
 */
export const responsableEmisionNRE = {
  EmisorFactura: 1,
  PoseedorFacturaBienes: 2,
  EmpresaTransportista: 3,
  DespachanteAduanas: 4,
  AgenteTransporteIntermediario: 5
} as const;
/**
 * Responsable de la emisión de la Nota Remisión Electrónica - E503 | Pagina 78
 */
export type ResponsableEmisionNRE =
  (typeof responsableEmisionNRE)[keyof typeof responsableEmisionNRE];

/**
 * Tipo de transporte - E901 | Pagina 96
 */
/**
 * Tipo de transporte - E901 | Pagina 96
 */
export const tipoTransporte = {
  Propio: 1,
  Tercero: 2
} as const;
/**
 * Tipo de transporte - E901 | Pagina 96
 */
export type TipoTransporte = (typeof tipoTransporte)[keyof typeof tipoTransporte];

/**
 * Modalidad del transporte - E903 | Pagina 96
 */
/**
 * Modalidad del transporte - E903 | Pagina 96
 */
export const modalidadTransporte = {
  Terrestre: 1,
  Fluvial: 2,
  Aereo: 3,
  Multimodal: 4
} as const;
/**
 * Modalidad del transporte - E903 | Pagina 96
 */
export type ModalidadTransporte = (typeof modalidadTransporte)[keyof typeof modalidadTransporte];

/**
 * Responsable del costo del flete - E905 | Pagina 96
 */
/**
 * Responsable del costo del flete - E905 | Pagina 96
 */
export const responsableFlete = {
  EmisorFacturaElectronica: 1,
  ReceptorFacturaElectronica: 2,
  Tercero: 3,
  AgenteIntermediarioTransporte: 4,
  TransportePropio: 5
} as const;
/**
 * Responsable del costo del flete - E905 | Pagina 96
 */
export type ResponsableFlete = (typeof responsableFlete)[keyof typeof responsableFlete];

/**
 * Tipo de identificación del vehículo - E967 | Pagina 99
 */
/**
 * Tipo de identificación del vehículo - E967 | Pagina 99
 */
export const tipoIdentificacionVehiculo = {
  NumeroIdentificacion: 1,
  NumeroMatricula: 2
} as const;
/**
 * Tipo de identificación del vehículo - E967 | Pagina 99
 */
export type TipoIdentificacionVehiculo =
  (typeof tipoIdentificacionVehiculo)[keyof typeof tipoIdentificacionVehiculo];

// ============================================================================
// Nota de Remisión Electrónica (NRE) Types
// ============================================================================

/**
 * Nota de Remisión Electrónica - Complete structure for electronic remission notes
 * Based on SIFEN Technical Manual v150 - DE_v150.xsd
 */
export interface NotaRemisionElectronica {
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
    camposFirmados: CamposFirmadosNRE;
  };
}

/**
 * A001 | DE | Campos firmados del DE | Pagina 64
 */
export interface CamposFirmadosNRE {
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
  timbrado: TimbradoNRE;
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
   * E500 | gCamNRE | Campos que componen la Nota de Remisión Electrónica | Pagina 77
   */
  camposNRE: CamposNRE;
  /**
   * E700 | gItems | Campos que describen los ítems de la operación | Pagina 88
   */
  items: ItemDE[];
  /**
   * E900 | gTransp | Campos que describen el transporte de mercaderías | Pagina 96
   */
  transporte?: TransporteMercancias;
}

/**
 * C001 | gTimb | Datos del timbrado | Pagina 64
 */
export interface TimbradoNRE {
  /**
   * C002 | iTiDE | Tipo de Documento Electrónico | Pagina 64
   */
  tipoDocumento: number; // 7=Nota de remisión electrónica
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
 * E500 | gCamNRE | Campos que componen la Nota de Remisión Electrónica | Pagina 77
 */
export interface CamposNRE {
  /**
   * E501 | iMotEmiNR | Motivo de emisión | Pagina 77
   */
  motivoEmision: MotivoEmisionNRE;
  /**
   * E502 | dDesMotEmiNR | Descripción del motivo de emisión | Pagina 78
   */
  descripcionMotivoEmision: string;
  /**
   * E503 | iRespEmiNR | Responsable de la emisión de la Nota Remisión Electrónica | Pagina 78
   */
  responsableEmision: ResponsableEmisionNRE;
  /**
   * E504 | dDesRespEmiNR | Descripción del responsable de la emisión de la Nota de Remisión Electrónica | Pagina 78
   */
  descripcionResponsableEmision: string;
  /**
   * E505 | dKmR | Kilómetros estimados de recorrido | Pagina 78
   */
  kilometrosEstimados?: number;
  /**
   * E506 | dFecEm | Fecha futura de emisión de la factura | Pagina 79
   */
  fechaEmisionFactura?: string; // Format: AAAA-MM-DD
}

/**
 * E900 | gTransp | Campos que describen el transporte de mercaderías | Pagina 96
 */
export interface TransporteMercancias {
  /**
   * E901 | iTipTrans | Tipo de transporte | Pagina 96
   */
  tipoTransporte: TipoTransporte;
  /**
   * E902 | dDesTipTrans | Descripción del tipo de transporte | Pagina 96
   */
  descripcionTipoTransporte: string;
  /**
   * E903 | iModTrans | Modalidad del transporte | Pagina 96
   */
  modalidadTransporte: ModalidadTransporte;
  /**
   * E904 | dDesModTrans | Descripción de la modalidad del transporte | Pagina 96
   */
  descripcionModalidadTransporte: string;
  /**
   * E905 | iRespFlete | Responsable del costo del flete | Pagina 96
   */
  responsableFlete: ResponsableFlete;
  /**
   * E906 | cCondNeg | Condición de la negociación | Pagina 96
   */
  condicionNegociacion?: string; // TODO: Define enum based on Tabla 10 - Incoterms
  /**
   * E907 | dNuManif | Número de manifiesto o conocimiento de carga | Pagina 97
   */
  numeroManifiesto?: string;
  /**
   * E908 | dNuDespImp | Número de despacho de importación | Pagina 97
   */
  numeroDespachoImportacion?: string;
  /**
   * E909 | dIniTras | Fecha estimada de inicio de traslado | Pagina 97
   */
  fechaInicioTraslado: string; // Format: AAAA-MM-DD
  /**
   * E910 | dFinTras | Fecha estimada de fin de traslado | Pagina 97
   */
  fechaFinTraslado?: string; // Format: AAAA-MM-DD
  /**
   * E911 | cPaisDest | Código del país de destino | Pagina 97
   */
  codigoPaisDestino?: string; // TODO: Define enum based on XSD de Codificación de Países
  /**
   * E912 | dDesPaisDest | Descripción del país de destino | Pagina 97
   */
  descripcionPaisDestino?: string;
  /**
   * E920 | gCamSal | Campos que identifican el local de salida de las mercaderías | Pagina 97
   */
  localSalida: LocalSalida;
  /**
   * E940 | gCamEnt | Campos que identifican el local de la entrega de las mercaderías | Pagina 99
   */
  localesEntrega: LocalEntrega[];
  /**
   * E960 | gVehTras | Campos que identifican al vehículo del traslado de mercaderías | Pagina 99
   */
  vehiculos: VehiculoTraslado[];
  /**
   * E980 | gTransp | Campos que identifican al transportista | Pagina 100
   */
  transportista?: Transportista;
}

/**
 * E920 | gCamSal | Campos que identifican el local de salida de las mercaderías | Pagina 97
 */
export interface LocalSalida {
  /**
   * E921 | dDirLocSal | Dirección del local de salida | Pagina 97
   */
  direccion: string;
  /**
   * E922 | dNumCasSal | Número de casa de salida | Pagina 97
   */
  numeroCasa: number;
  /**
   * E923 | dComp1Sal | Complemento de dirección 1 salida | Pagina 97
   */
  complementoDireccion1?: string;
  /**
   * E924 | dComp2Sal | Complemento de dirección 2 salida | Pagina 97
   */
  complementoDireccion2?: string;
  /**
   * E925 | cDepSal | Código del departamento del local de salida | Pagina 98
   */
  codigoDepartamento: number; // TODO: Define enum based on XSD Departamentos
  /**
   * E926 | dDesDepSal | Descripción del departamento del local de salida | Pagina 98
   */
  descripcionDepartamento: string;
  /**
   * E927 | cDisSal | Código del distrito del local de salida | Pagina 98
   */
  codigoDistrito?: number; // TODO: Define enum based on Tabla 2.1
  /**
   * E928 | dDesDisSal | Descripción de distrito del local de salida | Pagina 98
   */
  descripcionDistrito?: string;
  /**
   * E929 | cCiuSal | Código de la ciudad del local de salida | Pagina 98
   */
  codigoCiudad: number; // TODO: Define enum based on Tabla 2.2
  /**
   * E930 | dDesCiuSal | Descripción de ciudad del local de salida | Pagina 98
   */
  descripcionCiudad: string;
  /**
   * E931 | dTelSal | Teléfono de contacto del local de salida | Pagina 98
   */
  telefono?: string;
}

/**
 * E940 | gCamEnt | Campos que identifican el local de la entrega de las mercaderías | Pagina 99
 */
export interface LocalEntrega {
  /**
   * E941 | dDirLocEnt | Dirección del local de la entrega | Pagina 99
   */
  direccion: string;
  /**
   * E942 | dNumCasEnt | Número de casa de entrega | Pagina 99
   */
  numeroCasa: number;
  /**
   * E943 | dComp1Ent | Complemento de dirección 1 entrega | Pagina 99
   */
  complementoDireccion1?: string;
  /**
   * E944 | dComp2Ent | Complemento de dirección 2 entrega | Pagina 99
   */
  complementoDireccion2?: string;
  /**
   * E945 | cDepEnt | Código del departamento del local de entrega | Pagina 99
   */
  codigoDepartamento: number; // TODO: Define enum based on XSD Departamentos
  /**
   * E946 | dDesDepEnt | Descripción del departamento del local de entrega | Pagina 99
   */
  descripcionDepartamento: string;
  /**
   * E947 | cDisEnt | Código del distrito del local de entrega | Pagina 99
   */
  codigoDistrito?: number; // TODO: Define enum based on Tabla 2.1
  /**
   * E948 | dDesDisEnt | Descripción de distrito del local de entrega | Pagina 99
   */
  descripcionDistrito?: string;
  /**
   * E949 | cCiuEnt | Código de la ciudad del local de entrega | Pagina 99
   */
  codigoCiudad: number; // TODO: Define enum based on Tabla 2.2
  /**
   * E950 | dDesCiuEnt | Descripción de ciudad del local de entrega | Pagina 99
   */
  descripcionCiudad: string;
  /**
   * E951 | dTelEnt | Teléfono de contacto del local de entrega | Pagina 99
   */
  telefono?: string;
}

/**
 * E960 | gVehTras | Campos que identifican al vehículo del traslado de mercaderías | Pagina 99
 */
export interface VehiculoTraslado {
  /**
   * E961 | dTiVehTras | Tipo de vehículo | Pagina 99
   */
  tipoVehiculo: string; // TODO: Define enum based on available vehicle types
  /**
   * E962 | dMarVeh | Marca del vehículo | Pagina 99
   */
  marca?: string;
  /**
   * E963 | dNroIDVeh | Número de identificación del vehículo | Pagina 99
   */
  numeroIdentificacion: string;
  /**
   * E964 | dPlaVeh | Placa del vehículo | Pagina 99
   */
  placa?: string;
  /**
   * E965 | dNomCon | Nombre del conductor | Pagina 99
   */
  nombreConductor?: string;
  /**
   * E966 | dNumLic | Número de licencia de conducir | Pagina 99
   */
  numeroLicencia?: string;
  /**
   * E967 | dTipIdenVeh | Tipo de identificación del vehículo | Pagina 99
   */
  tipoIdentificacion: TipoIdentificacionVehiculo;
  /**
   * E968 | dNroChasis | Número de chasis | Pagina 99
   */
  numeroChasis?: string;
  /**
   * E969 | dNroMotor | Número de motor | Pagina 99
   */
  numeroMotor?: string;
}

/**
 * E980 | gTransp | Campos que identifican al transportista | Pagina 100
 */
export interface Transportista {
  /**
   * E981 | iTipIDTrans | Tipo de documento de identidad del transportista | Pagina 100
   */
  tipoDocumentoIdentidad: number; // TODO: Define enum (1=Cédula, 2=RUC, etc.)
  /**
   * E982 | dNumIDTrans | Número de documento de identidad del transportista | Pagina 100
   */
  numeroDocumentoIdentidad: string;
  /**
   * E983 | dDVTrans | Dígito verificador del documento del transportista | Pagina 100
   */
  digitoVerificador?: number;
  /**
   * E984 | dNomTrans | Nombre o razón social del transportista | Pagina 100
   */
  nombre: string;
  /**
   * E985 | dNomFanTrans | Nombre de fantasía del transportista | Pagina 100
   */
  nombreFantasia?: string;
  /**
   * E986 | dDirTrans | Dirección del transportista | Pagina 100
   */
  direccion?: string;
  /**
   * E987 | dNumCasTrans | Número de casa del transportista | Pagina 100
   */
  numeroCasa?: number;
  /**
   * E988 | dComp1Trans | Complemento de dirección 1 del transportista | Pagina 100
   */
  complementoDireccion1?: string;
  /**
   * E989 | dComp2Trans | Complemento de dirección 2 del transportista | Pagina 100
   */
  complementoDireccion2?: string;
  /**
   * E990 | cDepTrans | Código del departamento del transportista | Pagina 100
   */
  codigoDepartamento?: number; // TODO: Define enum based on XSD Departamentos
  /**
   * E991 | dDesDepTrans | Descripción del departamento del transportista | Pagina 100
   */
  descripcionDepartamento?: string;
  /**
   * E992 | cDisTrans | Código del distrito del transportista | Pagina 100
   */
  codigoDistrito?: number; // TODO: Define enum based on Tabla 2.1
  /**
   * E993 | dDesDisTrans | Descripción del distrito del transportista | Pagina 100
   */
  descripcionDistrito?: string;
  /**
   * E994 | cCiuTrans | Código de la ciudad del transportista | Pagina 100
   */
  codigoCiudad?: number; // TODO: Define enum based on Tabla 2.2
  /**
   * E995 | dDesCiuTrans | Descripción de la ciudad del transportista | Pagina 100
   */
  descripcionCiudad?: string;
  /**
   * E996 | dTelTrans | Teléfono del transportista | Pagina 100
   */
  telefono?: string;
  /**
   * E997 | dCorTrans | Correo electrónico del transportista | Pagina 100
   */
  correo?: string;
}
