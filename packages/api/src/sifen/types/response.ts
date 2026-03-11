// ============================================================================
// SIFEN RAW RESPONSE TYPES (Exact XML field names from manual)
// ============================================================================

/**
 * Raw response from siRecepDE - Document Reception
 * Schema: resRecepDE_v150.xsd
 */
export interface SIFENRecepDERawResponse {
  rRetEnviDe: {
    rProtDe: {
      dId: string; // CDC del DE Procesado (PP02)
      dFecProc: string; // Fecha y hora del procesamiento (PP03)
      dDigVal: string; // DigestValue del DE procesado (PP04)
      gResProc: {
        dEstRes: string; // Estado del resultado (PP050)
        dProtAut: string; // Número de Transacción (PP051)
        dCodRes: string; // Código del resultado (PP052)
        dMsgRes: string; // Mensaje del resultado (PP053)
      };
    };
  };
}

/**
 * Raw response from siRecepLoteDE - Batch Reception
 * Schema: resRecepLoteDE_v150.xsd
 */
export interface SIFENRecepLoteDERawResponse {
  rRetEnviLoteDe: {
    rProtLoteDe: {
      dId: string; // CDC del lote (BL01)
      dFecProc: string; // Fecha y hora del procesamiento (BL02)
      dDigVal: string; // DigestValue del lote (BL03)
      gResProc: Array<{
        dCodRes: string; // Código del resultado (BL04)
        dMsgRes: string; // Mensaje del resultado (BL05)
        dId: string; // CDC del DE procesado (BL06)
      }>;
      dProtAut: string; // Número de lote (BL07)
      dCantDE: number; // Cantidad de DE (BL08)
    };
  };
}

/**
 * Raw response from siResultLoteDE - Batch Result Query
 * Schema: resResultLoteDE_v150.xsd
 */
export interface SIFENResultLoteDERawResponse {
  rResuLoteDe: {
    rProtLoteDe: {
      dId: string; // CDC del lote (RL01)
      dFecProc: string; // Fecha y hora del procesamiento (RL02)
      dDigVal: string; // DigestValue del lote (RL03)
      gResProc: Array<{
        dCodRes: string; // Código del resultado (RL04)
        dMsgRes: string; // Mensaje del resultado (RL05)
        dId: string; // CDC del DE procesado (RL06)
        dProtAut: string; // Número de Transacción (RL07)
      }>;
    };
  };
}

/**
 * Raw response from siConsDE - Document Query
 * Schema: resConsDE_v150.xsd
 */
export interface SIFENConsDERawResponse {
  rConsDe: {
    dCodRes: string; // Código del resultado (CD01)
    dMsgRes: string; // Mensaje del resultado (CD02)
    gDatRecDE?: {
      dCDC: string; // CDC (CD03)
      dFecProc: string; // Fecha y hora del procesamiento (CD04)
      dDigVal: string; // DigestValue (CD05)
      dProtAut: string; // Número de Transacción (CD06)
      dEstRes: string; // Estado del resultado (CD07)
      dNumProtCons?: string; // Número de protocolo de consulta (CD08)
      xContDE?: Record<string, unknown>; // Contenido del DE (XML)
    };
  };
}

/**
 * Raw response from siRecepEvento - Event Reception
 * Schema: resRecepEvento_v150.xsd
 */
export interface SIFENRecepEventoRawResponse {
  rRetEve: {
    rProtEve: {
      dId: string; // CDC del evento (EV01)
      dFecProc: string; // Fecha y hora del procesamiento (EV02)
      dDigVal: string; // DigestValue del evento (EV03)
      gResProc: {
        dCodRes: string; // Código del resultado (EV04)
        dMsgRes: string; // Mensaje del resultado (EV05)
        dEstRes: string; // Estado del resultado (EV06)
        dProtAut: string; // Número de Transacción (EV07)
      };
    };
  };
}

/**
 * Raw response from siConsRUC - RUC Query
 * Schema: resConsRUC_v150.xsd
 */
export interface SIFENConsRUCRawResponse {
  rConsRuc: {
    dCodRes: string; // Código del resultado (RC01)
    dMsgRes: string; // Mensaje del resultado (RC02)
    gDatRuc?: {
      dRuc: string; // RUC (RC03)
      dDV: string; // Dígito verificador (RC04)
      dNom: string; // Nombre o razón social (RC05)
      dNomFan?: string; // Nombre de fantasía (RC06)
      dDir: string; // Dirección (RC07)
      dNumCas?: string; // Número de casa (RC08)
      dTel?: string; // Teléfono (RC09)
      dMail?: string; // Correo electrónico (RC10)
      dActEco?: Array<{
        // Actividades económicas
        dCodAct: string; // Código de actividad (RC11)
        dDesAct: string; // Descripción de actividad (RC12)
      }>;
      dEst: string; // Estado (RC13)
      dFecIniAct?: string; // Fecha inicio de actividades (RC14)
      dFecFinAct?: string; // Fecha fin de actividades (RC15)
      dMat?: string; // Matrícula (RC16)
      dTipCon?: string; // Tipo de contribuyente (RC17)
      dUbi?: string; // Ubicación geográfica (RC18)
      dProf?: string; // Profesión (RC19)
      dDep?: string; // Departamento (RC20)
      dDis?: string; // Distrito (RC21)
      dCiu?: string; // Ciudad (RC22)
      dBar?: string; // Barrio (RC23)
    };
  };
}

// Union type for all possible raw responses
export type SIFENRawResponse =
  | SIFENRecepDERawResponse
  | SIFENRecepLoteDERawResponse
  | SIFENResultLoteDERawResponse
  | SIFENConsDERawResponse
  | SIFENRecepEventoRawResponse
  | SIFENConsRUCRawResponse;
