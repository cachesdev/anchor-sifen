// SIFEN G group - Complementary commercial fields (G001-G099) and load (G050-G099)

/**
 * G - G001 | Campos de uso general | Pagina 106
 */
export interface gCamGen {
  /** G - G002 | Número de orden de compra | Pagina 106 */
  dOrdCompra?: string;
  /** G - G003 | Número de orden de venta | Pagina 106 */
  dOrdVta?: string;
  /** G - G004 | Número de asiento contable | Pagina 106 */
  dAsiento?: string;
  /** G1 - G050 | Campos generales de la carga | Pagina 107 */
  gCamCarg?: gCamCarg;
}

/**
 * G1 - G050 | Campos generales de la carga | Pagina 107
 */
export interface gCamCarg {
  /** G1 - G051 | Unidad de medida del total de volumen de la mercadería | Pagina 107 */
  cUniMedTotVol?: number;
  /** G1 - G052 | Descripción de la unidad de medida del total de volumen | Pagina 107 */
  dDesUniMedTotVol?: string;
  /** G1 - G053 | Total volumen de la mercadería | Pagina 107 */
  dTotVolMerc?: number;
  /** G1 - G054 | Unidad de medida del peso total | Pagina 107 */
  cUniMedTotPes?: number;
  /** G1 - G055 | Descripción de la unidad de medida del peso total | Pagina 107 */
  dDesUniMedTotPes?: string;
  /** G1 - G056 | Total peso de la mercadería | Pagina 107 */
  dTotPesMerc?: number;
  /** G1 - G057 | Características de la Carga | Pagina 107 */
  iCarCarga?: number; // 1=Cadena de frío, 2=Carga peligrosa, 3=Otro
  /** G1 - G058 | Descripción de las características de la carga | Pagina 107 */
  dDesCarCarga?: string;
}
