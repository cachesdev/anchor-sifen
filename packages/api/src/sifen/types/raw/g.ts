import type {
  CaracteristicasCarga,
  DescripcionCaracteristicasCarga,
  DescripcionUnidadMedida,
  UnidadMedida
} from '../enums';

/**
 * G - G001 | Campos de uso general | Pagina 106
 */
export interface GCamGen {
  /**
   * G - G002 | Número de orden de compra | Pagina 106
   */
  dOrdCompra?: string;
  /**
   * G - G003 | Número de orden de venta | Pagina 106
   */
  dOrdVta?: string;
  /**
   * G - G004 | Número de asiento contable | Pagina 107
   */
  dAsiento?: string;
  /**
   * G1 - G050 | Campos generales de la carga | Pagina 107
   */
  gCamCarg?: GCamCarg;
}

/**
 * G1 - G050 | Campos generales de la carga | Pagina 107
 */
export interface GCamCarg {
  /**
   * G1 - G051 | Unidad de medida del total de volumen de la mercadería | Pagina 107
   */
  cUniMedTotVol?: UnidadMedida;
  /**
   * G1 - G052 | Descripción de la unidad de medida del total de volumen de la mercadería | Pagina 107
   */
  dDesUniMedTotVol?: DescripcionUnidadMedida;
  /**
   * G1 - G053 | Total volumen de la mercadería | Pagina 107
   */
  dTotVolMerc?: number;
  /**
   * G1 - G054 | Unidad de medida del peso total de la mercadería | Pagina 107
   */
  cUniMedTotPes?: UnidadMedida;
  /**
   * G1 - G055 | Descripción de la unidad de medida del peso total | Pagina 107
   */
  dDesUniMedTotPes?: DescripcionUnidadMedida;
  /**
   * G1 - G056 | Total peso de la mercadería | Pagina 107
   */
  dTotPesMerc?: number;
  /**
   * G1 - G057 | Características de la Carga | Pagina 108
   */
  iCarCarga?: CaracteristicasCarga;
  /**
   * G1 - G058 | Descripción de las características de la carga | Pagina 108
   */
  dDesCarCarga?: DescripcionCaracteristicasCarga;
}
