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
    *
    * Observaciones:
    *   Opcional cuando C002=1 o C002=7
    *   No informar para C002 ≠ 1 y C002≠7
   */
  gCamCarg?: GCamCarg;
}

/**
 * G1 - G050 | Campos generales de la carga | Pagina 107
    *
    * Observaciones:
    *   Opcional cuando C002=1 o C002=7
    *   No informar para C002 ≠ 1 y C002≠7
 */
export interface GCamCarg {
  /**
   * G1 - G051 | Unidad de medida del total de volumen de la mercadería | Pagina 107
    *
    * Observaciones:
    *   Según Tabla 5 – Unidad de Medida
    *   Si D202 = 3 utilizar los datos del WS del link de la DNCP
    *   Utilizar el atributo “ID”
   */
  cUniMedTotVol?: UnidadMedida;
  /**
   * G1 - G052 | Descripción de la unidad de medida del total de volumen de la mercadería | Pagina 107
    *
    * Observaciones:
    *   Referente al campo F027
    *   Utilizar el atributo “Código”
    *   Ejemplo: UNI
   */
  dDesUniMedTotVol?: DescripcionUnidadMedida;
  /**
   * G1 - G053 | Total volumen de la mercadería | Pagina 107
    * Observaciones: Corresponde al volumen total de ítems que se han informado
   */
  dTotVolMerc?: number;
  /**
   * G1 - G054 | Unidad de medida del peso total de la mercadería | Pagina 107
    *
    * Observaciones:
    *   Según Tabla 5 – Unidad de Medida
    *   Si D202 = 3 utilizar los datos del WS del link de la DNCP
    *   Utilizar el atributo “ID”
   */
  cUniMedTotPes?: UnidadMedida;
  /**
   * G1 - G055 | Descripción de la unidad de medida del peso total | Pagina 107
    *
    * Observaciones:
    *   Referente al campo F030
    *   Utilizar el atributo “Código”
    *   Ejemplo: UNI
   */
  dDesUniMedTotPes?: DescripcionUnidadMedida;
  /**
   * G1 - G056 | Total peso de la mercadería | Pagina 107
    * Observaciones: Corresponde al peso total de ítems que se han informado
   */
  dTotPesMerc?: number;
  /**
   * G1 - G057 | Características de la Carga | Pagina 108
    *
    * Observaciones:
    *   1 – Mercaderías con cadena de frío
    *   2 – Carga peligrosa
    *   3 – Otro de características similares (especificar)
    *   Obligatorio cuando lo exige la RG 41/14
   */
  iCarCarga?: CaracteristicasCarga;
  /**
   * G1 - G058 | Descripción de las características de la carga | Pagina 108
    *
    * Observaciones:
    *   1 – “Mercaderías con cadena de frío”
    *   2 – “Carga peligrosa”
    *   Si G057 = 3, informar la característica de la carga
    *   Obligatorio cuando lo exige la RG 41/14 – Obligatorio para KUDE
   */
  dDesCarCarga?: DescripcionCaracteristicasCarga;
}
