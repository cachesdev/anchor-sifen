/**
 * Respuesta limpia siRecepLoteDE
 */
export interface SIFENRecepLoteDEResponse {
  /**
   * BRSch02 | dFecProc | Fecha y hora de recepción | Pagina 48
   */
  fechaProcesamiento: Date;
  /**
   * BRSch03 | dCodRes | Código del resultado de recepción | Pagina 48
   */
  codigoResultado: number;
  /**
   * BRSch04 | dMsgRes | Mensaje del resultado de recepción | Pagina 48
   */
  mensajeResultado: string;
  /**
   * BRSch05 | dProtConsLote | Número de Lote | Pagina 48
   */
  numeroLote: number;
  /**
   * BRSch06 | dTpoProces | Tiempo medio de procesamiento en segundos | Pagina 48
   */
  tiempoProcesamiento: number;
}

/**
 * Respuesta limpia siConsRUC
 */
export interface SIFENConsRUCResponse {
  /**
   * RRSch02 | dCodRes | Código del resultado de la consulta RUC | Pagina 54
   */
  codigoResultado: string;
  /**
   * RRSch03 | dMsgRes | Mensaje del resultado de la consulta RUC | Pagina 54
   */
  mensajeResultado: string;
  /**
   * RRSch04 | xContRuc | Contenedor del RUC | Pagina 55
   */
  contenedorRuc?: {
    /**
     * ContRUC02 | dRucCons | RUC Consultado | Pagina 55
     */
    rucConsultado: string;
    /**
     * ContRUC03 | dRazCons | Razón social del RUC Consultado | Pagina 55
     */
    razonSocial: string;
    /**
     * ContRUC04 | dCodEstCons | Código del Estado del RUC Consultado | Pagina 55
     */
    codigoEstado: string;
    /**
     * ContRUC05 | dDesEstCons | Descripción Código del Estado del RUC Consultado | Pagina 55
     */
    descripcionEstado: string;
    /**
     * ContRUC06 | dRUCFactElec | RUC consultado es facturador electrónico | Pagina 55
     */
    esFacturadorElectronico: string;
  };
}
