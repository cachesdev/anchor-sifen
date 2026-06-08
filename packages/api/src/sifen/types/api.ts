import type { ConsultaDEXML, EventoRecepcion } from './clean';

/**
 * Respuesta limpia siRecepLoteDE
 */
export interface SIFENRecepLoteDEResponse {
  fechaProcesamiento: Date;
  codigoResultado: string;
  mensajeResultado: string;
  numeroLote?: string;
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
  fechaProcesamiento: Date;
  codigoResultado: string;
  mensajeResultado: string;
  contenedorDE: ConsultaDEXML;
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
  numeroTransaccion?: string;
  digestValue?: string;
  fechaProcesamiento: Date;
  validaciones: Array<{ codigo: string; mensaje: string }>;
}

/**
 * Respuesta limpia siRecepEvento
 */
export type SIFENEventoResponse = EventoRecepcion;
