import type { LiteralUnion } from 'type-fest';
import type { CaracteristicasCarga, UnidadMedida } from '../enums';

/**
 * G - G001 | gCamGen | Campos de uso general | Pagina 106
 */
export interface UsoGeneral {
  /**
   * G - G002 | dOrdCompra | Número de orden de compra | Pagina 106
   */
  ordenCompra?: string;
  /**
   * G - G003 | dOrdVta | Número de orden de venta | Pagina 106
   */
  ordenVenta?: string;
  /**
   * G - G004 | dAsiento | Número de asiento contable | Pagina 107
   */
  asientoContable?: string;
  /**
   * G1 - G050 | gCamCarg | Campos generales de la carga | Pagina 107
    *
    * Observaciones:
    *   Opcional cuando C002=1 o C002=7
    *   No informar para C002 ≠ 1 y C002≠7
   */
  carga?: Carga;
}

/**
 * G1 - G050 | gCamCarg | Campos generales de la carga | Pagina 107
    *
    * Observaciones:
    *   Opcional cuando C002=1 o C002=7
    *   No informar para C002 ≠ 1 y C002≠7
 */
export interface Carga {
  /**
   * G1 - G051 | cUniMedTotVol | Unidad de medida del total de volumen de la mercadería | Pagina 107
    *
    * Observaciones:
    *   Según Tabla 5 – Unidad de Medida
    *   Si D202 = 3 utilizar los datos del WS del link de la DNCP
    *   Utilizar el atributo “ID”
   */
  unidadMedidaTotalVolumen?: LiteralUnion<UnidadMedida, number>;
  /**
   * G1 - G053 | dTotVolMerc | Total volumen de la mercadería | Pagina 107
    * Observaciones: Corresponde al volumen total de ítems que se han informado
   */
  totalVolumenMercaderia?: number;
  /**
   * G1 - G054 | cUniMedTotPes | Unidad de medida del peso total de la mercadería | Pagina 107
    *
    * Observaciones:
    *   Según Tabla 5 – Unidad de Medida
    *   Si D202 = 3 utilizar los datos del WS del link de la DNCP
    *   Utilizar el atributo “ID”
   */
  unidadMedidaTotalPeso?: LiteralUnion<UnidadMedida, number>;
  /**
   * G1 - G056 | dTotPesMerc | Total peso de la mercadería | Pagina 107
    * Observaciones: Corresponde al peso total de ítems que se han informado
   */
  totalPesoMercaderia?: number;
  /**
   * G1 - G057 | iCarCarga | Características de la Carga | Pagina 108
    *
    * Observaciones:
    *   1 – Mercaderías con cadena de frío
    *   2 – Carga peligrosa
    *   3 – Otro de características similares (especificar)
    *   Obligatorio cuando lo exige la RG 41/14
   */
  caracteristicasCarga?: LiteralUnion<CaracteristicasCarga, number>;
}
