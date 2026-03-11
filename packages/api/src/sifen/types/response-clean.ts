// ============================================================================
// SIFEN CLEAN RESPONSE TYPES (Developer-friendly field names)
// ============================================================================

/**
 * Clean response from siRecepDE - Document Reception
 */
export interface SIFENRecepDEResponse {
  cdc: string; // Clave de Contingencia Digital
  processingDateTime: string; // Fecha y hora del procesamiento
  digestValue: string; // DigestValue del DE procesado
  status: 'Approved' | 'ApprovedWithObservation' | 'Rejected';
  transactionNumber?: string; // Número de Transacción
  resultCode: string; // Código del resultado
  resultMessage: string; // Mensaje del resultado
}

/**
 * Clean response from siRecepLoteDE - Batch Reception
 */
export interface SIFENRecepLoteDEResponse {
  batchCdc: string; // CDC del lote
  processingDateTime: string; // Fecha y hora del procesamiento
  digestValue: string; // DigestValue del lote
  results: Array<{
    resultCode: string; // Código del resultado
    resultMessage: string; // Mensaje del resultado
    documentCdc: string; // CDC del DE procesado
  }>;
  batchNumber: string; // Número de lote
  documentCount: number; // Cantidad de DE
}

/**
 * Clean response from siResultLoteDE - Batch Result Query
 */
export interface SIFENResultLoteDEResponse {
  batchCdc: string; // CDC del lote
  processingDateTime: string; // Fecha y hora del procesamiento
  digestValue: string; // DigestValue del lote
  results: Array<{
    resultCode: string; // Código del resultado
    resultMessage: string; // Mensaje del resultado
    documentCdc: string; // CDC del DE procesado
    transactionNumber?: string; // Número de Transacción
  }>;
}

/**
 * Clean response from siConsDE - Document Query
 */
export interface SIFENConsDEResponse {
  resultCode: string; // Código del resultado
  resultMessage: string; // Mensaje del resultado
  document?: {
    cdc: string; // CDC
    processingDateTime: string; // Fecha y hora del procesamiento
    digestValue: string; // DigestValue
    transactionNumber: string; // Número de Transacción
    status: 'Approved' | 'ApprovedWithObservation' | 'Rejected';
    protocolNumber?: string; // Número de protocolo de consulta
    content?: unknown; // Contenido del DE (XML)
  };
}

/**
 * Clean response from siRecepEvento - Event Reception
 */
export interface SIFENRecepEventoResponse {
  eventCdc: string; // CDC del evento
  processingDateTime: string; // Fecha y hora del procesamiento
  digestValue: string; // DigestValue del evento
  status: 'Approved' | 'ApprovedWithObservation' | 'Rejected';
  transactionNumber?: string; // Número de Transacción
  resultCode: string; // Código del resultado
  resultMessage: string; // Mensaje del resultado
}

/**
 * Clean response from siConsRUC - RUC Query
 */
export interface SIFENConsRUCResponse {
  resultCode: string; // Código del resultado
  resultMessage: string; // Mensaje del resultado
  taxpayer?: {
    ruc: string; // RUC
    checkDigit: string; // Dígito verificador
    name: string; // Nombre o razón social
    tradeName?: string; // Nombre de fantasía
    address: string; // Dirección
    houseNumber?: string; // Número de casa
    phone?: string; // Teléfono
    email?: string; // Correo electrónico
    economicActivities?: Array<{
      // Actividades económicas
      code: string; // Código de actividad
      description: string; // Descripción de actividad
    }>;
    status: string; // Estado
    activityStartDate?: string; // Fecha inicio de actividades
    activityEndDate?: string; // Fecha fin de actividades
    registration?: string; // Matrícula
    taxpayerType?: string; // Tipo de contribuyente
    location?: string; // Ubicación geográfica
    profession?: string; // Profesión
    department?: string; // Departamento
    district?: string; // Distrito
    city?: string; // Ciudad
    neighborhood?: string; // Barrio
  };
}

// Union type for all possible clean responses
export type SIFENCleanResponse =
  | SIFENRecepDEResponse
  | SIFENRecepLoteDEResponse
  | SIFENResultLoteDEResponse
  | SIFENConsDEResponse
  | SIFENRecepEventoResponse
  | SIFENConsRUCResponse;

// Response wrapper for all SIFEN operations
export interface SIFENResponse<T extends SIFENCleanResponse = SIFENCleanResponse> {
  success: boolean;
  data?: T;
  error?: string;
}
