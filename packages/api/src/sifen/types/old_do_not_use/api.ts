// SIFEN API Type Definitions v150
// Based on SIFEN Technical Manual v150 - Pages 44-112

/**
 * Base response protocol structure
 */
export interface SifenResponseProtocol {
  codigo: number;
  mensaje: string;
  estado: 'Aprobado' | 'Aprobado con observación' | 'Rechazado';
  transaccion?: string;
  digestValue?: string;
}

// ============================================================================
// 9.1. WS recepción documento electrónico – siRecepDE
// ============================================================================

/**
 * GRSch01 | rEnviDe | Raíz | Elemento raíz | Pagina 45
 */
export interface SiRecepDERequest {
  /**
   * ASch01 | rEnviDe | Raíz | Elemento raíz | Pagina 45
   */
  envioDE: {
    /**
     * ASch02 | dId | Identificador de control de envío | Número secuencial autoincremental, para identificación del archivo enviado. La responsabilidad de generar y controlar este número es exclusiva del contribuyente. | Pagina 45
     */
    identificadorControlEnvio: string;
    /**
     * ASch03 | xDE | XML del documento electrónico |  | Pagina 45
     */
    xmlDE: string;
  };
}

/**
 * ARSch01 | rRetEnviDe | Raíz | Elemento raíz | Pagina 46
 */
export interface SiRecepDEResponse {
  /**
   * ARSch01 | rRetEnviDe | Raíz | Elemento raíz | Pagina 46
   */
  respuestaEnvioDE: {
    /**
     * ARSch02 | xProtDe | Protocolo de procesamiento del DE | Schema XML 4 | Pagina 46
     */
    xmlProtocoloProcesamiento: ProtocoloProcesamientoDE;
  };
}

/**
 * PP01 | rProtDe | Raíz |  | Pagina 46
 */
export interface ProtocoloProcesamientoDE {
  /**
   * PP01 | rProtDe | Raíz |  | Pagina 46
   */
  protocoloProcesamiento: {
    /**
     * PP02 | id | CDC del DE Procesado |  | Pagina 46
     */
    codigoControlDigital: string;
    /**
     * PP03 | dFecProc | Fecha y hora del procesamiento | Formato: "AAAA-MM-DD-hh:mm:ss" | Pagina 46
     */
    fechaHoraProcesamiento: string;
    /**
     * PP04 | dDigVal | DigestValue del DE procesado | Permite verificar la correspondencia con el DE transmitido por el contribuyente | Pagina 46
     */
    digestValue: string;
    /**
     * PP05 | gResProc | Grupo Resultado de Procesamiento | Para producción se limitará a 5 mensajes máximos sin modificación de esta especificación. | Pagina 53
     */
    resultadoProcesamiento: ResultadoProcesamiento[];
  };
}

/**
 * Grupo | PP052 | dCodRes | Código del resultado de procesamiento | Definido en el tópico correspondiente del capítulo 12 | Pagina 53
 */
export interface ResultadoProcesamiento {
  /**
   * PP052 | dCodRes | Código del resultado de procesamiento | Definido en el tópico correspondiente del capítulo 12 | Pagina 53
   */
  codigoResultado: number;
  /**
   * PP053 | dMsgRes | Mensaje del resultado de procesamiento | Definido en el tópico correspondiente del capítulo 12 | Pagina 53
   */
  mensajeResultado: string;
  /**
   * PP050 | dEstRes | Estado del resultado | Aprobado<br/>Aprobado con observación<br/>Rechazado | Pagina 53
   */
  estadoResultado: string;
  /**
   * PP051 | dProtAut | Número de Transacción |  | Pagina 53
   */
  protocoloAutorizacion?: number;
}

// ============================================================================
// 9.2. WS recepción lote DE – siRecepLoteDE
// ============================================================================

/**
 * BSch01 | rEnvioLote | Raíz | Elemento raíz | Pagina 47
 */
export interface SiRecepLoteDERequest {
  /**
   * BSch01 | rEnvioLote | Raíz | Elemento raíz | Pagina 47
   */
  envioLoteDE: {
    /**
     * BSch02 | dId | Identificador de control de envío | Número secuencial autoincremental, para identificación del mensaje enviado. La responsabilidad de generar y controlar este número es exclusiva del contribuyente. | Pagina 47
     */
    identificadorControlEnvio: string;
    /**
     * BSch03 | xDE | Archivo de Lote comprimido | Campo comprimido en formato Base64 según el esquema del Protocolo de procesamiento del Lote | Pagina 47
     */
    xmlLoteComprimido: string;
  };
}

/**
 * BRSch01 | rResEnviLoteDe | Raíz | Elemento raíz | Pagina 48
 */
export interface SiRecepLoteDEResponse {
  /**
   * BRSch01 | rResEnviLoteDe | Raíz | Elemento raíz | Pagina 48
   */
  respuestaEnvioLoteDE: {
    /**
     * BRSch02 | dFecProc | Fecha y hora de recepción | Formato: AAAA-MM-DD-hh:mm:ss | Pagina 48
     */
    fechaHoraRecepcion: string;
    /**
     * BRSch03 | dCodRes | Código del resultado de recepción | Definido en el tópico correspondiente del capítulo 12 | Pagina 48
     */
    codigoResultado: number;
    /**
     * BRSch04 | dMsgRes | Mensaje del resultado de recepción | Definido en el tópico correspondiente del capítulo 12 | Pagina 48
     */
    mensajeResultado: string;
    /**
     * BRSch05 | dProtConsLote | Número de Lote | Generado solamente si dCodRes=0300, Definido en el tópico correspondiente del capítulo 12 | Pagina 48
     */
    protocoloConsultaLote?: number;
    /**
     * BRSch06 | dTpoProces | Tiempo medio de procesamiento en segundos | Conforme a la sección correspondiente en el presente manual | Pagina 48
     */
    tiempoProcesamiento: number;
  };
}

/**
 * LSch01 | rLoteDE | Raíz | Elemento raíz | Pagina 47
 */
export interface ProtocoloProcesamientoLoteDE {
  /**
   * LSch01 | rLoteDE | Raíz | Elemento raíz | Pagina 47
   */
  loteDE: {
    /**
     * LSch02 | rDE | Protocolo de procesamiento del DE | Sigue las definiciones del Capítulo Formato de los DE | Pagina 47
     */
    protocoloProcesamiento: ProtocoloProcesamientoDE[];
  };
}

// ============================================================================
// 9.3. WS consulta resultado de lote DE – siResultLoteDE
// ============================================================================

/**
 * CSch01 | rEnviConsLoteDe | Raíz |  | Pagina 49
 */
export interface SiResultLoteDERequest {
  /**
   * CSch01 | rEnviConsLoteDe | Raíz |  | Pagina 49
   */
  envioConsultaLoteDE: {
    /**
     * CSch02 | dId | Identificador de control de envío | Número secuencial autoincremental, para identificación del mensaje enviado. La responsabilidad de generar y controlar este número es exclusiva del contribuyente. | Pagina 49
     */
    identificadorControlEnvio: string;
    /**
     * CSch03 | dProtConsLote | Número del lote | Obtenido a partir del mensaje de respuesta al WS soRecepLoteDE(Schema XML 5) | Pagina 49
     */
    protocoloConsultaLote: string;
  };
}

/**
 * CRSch01 | rResConsLoteDe | Raíz |  | Pagina 50
 */
export interface SiResultLoteDEResponse {
  /**
   * CRSch01 | rResConsLoteDe | Raíz |  | Pagina 50
   */
  respuestaConsultaLoteDE: {
    /**
     * CRSch02 | dFecProc | Fecha y hora de procesamiento | Formato: AAAA-MM-DD-hh:mm:ss | Pagina 50
     */
    fechaHoraProcesamiento: string;
    /**
     * CRSch03 | dCodRes | Código del resultado | Definido en el tópico correspondiente del capítulo 12 | Pagina 50
     */
    codigoResultado: number;
    /**
     * CRSch04 | dMsgRes | Mensaje del resultado | Definido en el tópico correspondiente del capítulo 12 | Pagina 50
     */
    mensajeResultado: string;
    /**
     * CRSch05 | gResProcLote | Grupo Resultado de Procesamiento del Lote |  | Pagina 50
     */
    resultadoProcesamientoLote: ResultadoProcesamientoLote[];
  };
}

/**
 * Grupo |  | rDE | Protocolo de procesamiento del DE |  | Pagina 50
 */
export interface ResultadoProcesamientoLote {
  /**
   *  | rDE | Protocolo de procesamiento del DE |  | Pagina 50
   */
  protocoloProcesamiento: ProtocoloProcesamientoDE;
}

// ============================================================================
// 9.4. WS consulta DE – siConsDE
// ============================================================================

/**
 * DSch01 | rEnviConsDe | Raíz |  | Pagina 51
 */
export interface SiConsDERequest {
  /**
   * DSch01 | rEnviConsDe | Raíz |  | Pagina 51
   */
  envioConsultaDE: {
    /**
     * DSch02 | dId | Identificador de control de envío | Número secuencial autoincremental, para identificación del mensaje enviado. La responsabilidad de generar y controlar este número es exclusiva del contribuyente. | Pagina 51
     */
    identificadorControlEnvio: string;
    /**
     * DSch03 | dCDC | CDC del DE |  | Pagina 51
     */
    codigoControlDigital: string;
  };
}

/**
 * DRSch01 | rResConsDe | Raíz |  | Pagina 52
 */
export interface SiConsDEResponse {
  /**
   * DRSch01 | rResConsDe | Raíz |  | Pagina 52
   */
  respuestaConsultaDE: {
    /**
     * DRSch02 | dFecProc | Fecha y hora de procesamiento | Formato: AAAA-MM-DD-hh:mm:ss | Pagina 52
     */
    fechaHoraProcesamiento: string;
    /**
     * DRSch03 | dCodRes | Código del resultado | Definido en el tópico correspondiente del capítulo 12 | Pagina 52
     */
    codigoResultado: number;
    /**
     * DRSch04 | dMsgRes | Mensaje del resultado | Definido en el tópico correspondiente del capítulo 12 | Pagina 52
     */
    mensajeResultado: string;
    /**
     * DRSch05 | dProtCons | Protocolo de consulta |  | Pagina 52
     */
    protocoloConsulta?: string;
    /**
     * DRSch06 | gDatDE | Datos del DE |  | Pagina 52
     */
    datosDocumento?: DatosDE;
  };
}

/**
 * Grupo |  | gDatDE | Datos del DE | Structure depends on DE type (Factura, Nota de Crédito, etc.) | Pagina 52
 */
export interface DatosDE {
  // Structure depends on DE type (Factura, Nota de Crédito, etc.)
  [key: string]: unknown;
}

// ============================================================================
// 9.5. WS recepción evento – siRecepEvento
// ============================================================================

/**
 * ESch01 | rEnviEvento | Raíz |  | Pagina 53
 */
export interface SiRecepEventoRequest {
  /**
   * ESch01 | rEnviEvento | Raíz |  | Pagina 53
   */
  envioEvento: {
    /**
     * ESch02 | dId | Identificador de control de envío | Número secuencial autoincremental, para identificación del mensaje enviado. La responsabilidad de generar y controlar este número es exclusiva del contribuyente. | Pagina 53
     */
    identificadorControlEnvio: string;
    /**
     * ESch03 | xEvento | XML del evento transmitido |  | Pagina 53
     */
    xmlEvento: string;
  };
}

/**
 * ERSch01 | rRetEnviEvento | Raíz |  | Pagina 54
 */
export interface SiRecepEventoResponse {
  /**
   * ERSch01 | rRetEnviEvento | Raíz |  | Pagina 54
   */
  respuestaEnvioEvento: {
    /**
     * ERSch02 | xProtEv | Protocolo de procesamiento del evento |  | Pagina 54
     */
    xmlProtocoloEvento: ProtocoloProcesamientoEvento;
  };
}

/**
 * EP01 | rProtEv | Raíz |  | Pagina 54
 */
export interface ProtocoloProcesamientoEvento {
  /**
   * EP01 | rProtEv | Raíz |  | Pagina 54
   */
  protocoloProcesamientoEvento: {
    /**
     * EP02 | id | CDC del DE Procesado |  | Pagina 54
     */
    codigoControlDigital: string;
    /**
     * EP03 | dFecProc | Fecha y hora del procesamiento | Formato: "AAAA-MM-DD-hh:mm:ss" | Pagina 54
     */
    fechaHoraProcesamiento: string;
    /**
     * EP04 | dDigVal | DigestValue del DE procesado | Permite verificar la correspondencia con el DE transmitido por el contribuyente | Pagina 54
     */
    digestValue: string;
    /**
     * EP05 | gResProc | Grupo Resultado de Procesamiento | Para producción se limitará a 5 mensajes máximos sin modificación de esta especificación. | Pagina 54
     */
    resultadoProcesamiento: ResultadoProcesamiento[];
  };
}

// ============================================================================
// 9.6. WS consulta RUC – siConsRUC
// ============================================================================

/**
 * FSch01 | rEnviConsRuc | Raíz |  | Pagina 54
 */
export interface SiConsRUCRequest {
  /**
   * FSch01 | rEnviConsRuc | Raíz |  | Pagina 54
   */
  envioConsultaRUC: {
    /**
     * FSch02 | dId | Identificador de control de envío | Número secuencial autoincremental, para identificación del mensaje enviado. La responsabilidad de generar y controlar este número es exclusiva del contribuyente. | Pagina 54
     */
    identificadorControlEnvio: string;
    /**
     * FSch03 | dRUC | RUC a consultar |  | Pagina 54
     */
    rucConsultar: string;
  };
}

/**
 * FRSch01 | rResConsRuc | Raíz |  | Pagina 54
 */
export interface SiConsRUCResponse {
  /**
   * FRSch01 | rResConsRuc | Raíz |  | Pagina 54
   */
  respuestaConsultaRUC: {
    /**
     * FRSch02 | dFecProc | Fecha y hora de procesamiento | Formato: AAAA-MM-DD-hh:mm:ss | Pagina 54
     */
    fechaHoraProcesamiento: string;
    /**
     * FRSch03 | dCodRes | Código del resultado | Definido en el tópico correspondiente del capítulo 12 | Pagina 54
     */
    codigoResultado: number;
    /**
     * FRSch04 | dMsgRes | Mensaje del resultado | Definido en el tópico correspondiente del capítulo 12 | Pagina 54
     */
    mensajeResultado: string;
    /**
     * FRSch05 | gDatRuc | Datos del RUC |  | Pagina 54
     */
    datosRUC?: DatosRUC;
  };
}

/**
 * Grupo |  | gDatRuc | Datos del RUC |  | Pagina 54
 */
export interface DatosRUC {
  /**
   *  | dRUC | RUC |  | Pagina 54
   */
  ruc: string;
  /**
   *  | dDV | Dígito Verificador |  | Pagina 54
   */
  digitoVerificador: string;
  /**
   *  | dNomRazonSocial | Nombre o Razón Social |  | Pagina 54
   */
  nombreRazonSocial: string;
  /**
   *  | dNomFantasia | Nombre de Fantasía |  | Pagina 54
   */
  nombreFantasia?: string;
  /**
   *  | dDir | Dirección |  | Pagina 54
   */
  direccion: string;
  /**
   *  | dNumCasa | Número de Casa |  | Pagina 54
   */
  numeroCasa?: string;
  /**
   *  | dCompl | Complemento |  | Pagina 54
   */
  complemento?: string;
  /**
   *  | dCiudad | Ciudad |  | Pagina 54
   */
  ciudad: string;
  /**
   *  | dDepartamento | Departamento |  | Pagina 54
   */
  departamento: string;
  /**
   *  | dPais | País |  | Pagina 54
   */
  pais: string;
  /**
   *  | dTel | Teléfono |  | Pagina 54
   */
  telefono?: string;
  /**
   *  | dCorreo | Correo Electrónico |  | Pagina 54
   */
  correo?: string;
  /**
   *  | dActEco | Actividades Económicas |  | Pagina 54
   */
  actividadesEconomicas?: string[];
  /**
   *  | dEst | Estado |  | Pagina 54
   */
  estado: string;
  /**
   *  | dFecIniAct | Fecha de Inicio de Actividades |  | Pagina 54
   */
  fechaInicioActividades?: string;
  /**
   *  | dFecFinAct | Fecha de Fin de Actividades |  | Pagina 54
   */
  fechaFinActividades?: string;
}

// ============================================================================
// SOAP Client Configuration
// ============================================================================

export interface SifenConfig {
  environment: 'test' | 'prod';
  certificatePath: string;
  password: string;
  timeout?: number;
  retryAttempts?: number;
}

export interface SifenEndpoints {
  test: string;
  prod: string;
}

export const SIFEN_ENDPOINTS: SifenEndpoints = {
  test: 'https://sifen-test.set.gov.py/de/ws/',
  prod: 'https://sifen.set.gov.py/de/ws/'
};

// ============================================================================
// Error Codes (Chapter 12)
// ============================================================================

export const SIFEN_ERROR_CODES = {
  // Success
  SUCCESS: '0300',

  // Validation errors
  INVALID_SCHEMA: '0101',
  INVALID_SIGNATURE: '0102',
  INVALID_CERTIFICATE: '0103',
  INVALID_FORMAT: '0104',

  // Business logic errors
  DUPLICATE_DOCUMENT: '0201',
  INVALID_RUC: '0202',
  INVALID_TIMBRADO: '0203',

  // System errors
  SYSTEM_ERROR: '0901',
  TIMEOUT: '0902',
  SERVICE_UNAVAILABLE: '0903'
} as const;

export type SifenErrorCode = (typeof SIFEN_ERROR_CODES)[keyof typeof SIFEN_ERROR_CODES];

// ============================================================================
// Utility Types
// ============================================================================

export type SifenWebService =
  | 'siRecepDE'
  | 'siRecepLoteDE'
  | 'siResultLoteDE'
  | 'siConsDE'
  | 'siRecepEvento'
  | 'siConsRUC';

export type SifenRequestType<T extends SifenWebService> = T extends 'siRecepDE'
  ? SiRecepDERequest
  : T extends 'siRecepLoteDE'
    ? SiRecepLoteDERequest
    : T extends 'siResultLoteDE'
      ? SiResultLoteDERequest
      : T extends 'siConsDE'
        ? SiConsDERequest
        : T extends 'siRecepEvento'
          ? SiRecepEventoRequest
          : T extends 'siConsRUC'
            ? SiConsRUCRequest
            : never;

export type SifenResponseType<T extends SifenWebService> = T extends 'siRecepDE'
  ? SiRecepDEResponse
  : T extends 'siRecepLoteDE'
    ? SiRecepLoteDEResponse
    : T extends 'siResultLoteDE'
      ? SiResultLoteDEResponse
      : T extends 'siConsDE'
        ? SiConsDEResponse
        : T extends 'siRecepEvento'
          ? SiRecepEventoResponse
          : T extends 'siConsRUC'
            ? SiConsRUCResponse
            : never;
