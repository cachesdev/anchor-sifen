/**
 * Respuesta limpia siRecepLoteDE
 */
export interface SIFENRecepLoteDEResponse {
  fechaProcesamiento: Date;
  codigoResultado: number;
  mensajeResultado: string;
  numeroLote?: number;
  tiempoProcesamiento: number;
}

/**
 * Respuesta limpia siConsRUC
 */
export interface SIFENConsRUCResponse {
  codigoResultado: string;
  mensajeResultado: string;
  contenedorRuc?: {
    rucConsultado: string;
    razonSocial: string;
    codigoEstado: string;
    descripcionEstado: string;
    esFacturadorElectronico: string;
  };
}

/**
 * Respuesta limpia siConsDE
 */
export interface SIFENConsultaResponse {
  codigoResultado: string;
  mensajeResultado: string;
  fechaProcesamiento?: Date;
  xmlDE?: string;
}

/**
 * Respuesta limpia siResultLoteDE
 */
export interface SIFENConsultaLoteResponse {
  codigoResultado: string;
  mensajeResultado: string;
  fechaProcesamiento?: Date;
  resultados?: Array<{
    cdc: string;
    estado: string;
    numeroTransaccion?: string;
    validaciones: Array<{ codigo: string; mensaje: string }>;
  }>;
}

/**
 * Respuesta limpia siRecepDE
 */
export interface SIFENRecibeResponse {
  cdc: string;
  estado: string;
  numeroTransaccion?: number;
  fechaProcesamiento: Date;
  validaciones: Array<{ codigo: string; mensaje: string }>;
}

/**
 * Respuesta limpia siRecepEvento
 */
export interface SIFENEventoResponse {
  fechaProcesamiento?: Date;
  resultados: Array<{
    id: string;
    estado: string;
    numeroTransaccion?: number;
    validaciones: Array<{ codigo: string; mensaje: string }>;
  }>;
}
