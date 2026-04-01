import type { LiteralUnion } from 'type-fest';
import type { UnidadMedida } from '../old_do_not_use/enums';
import type { CaracteristicasCarga } from '../enums';

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
   */
  carga?: Carga;
}

/**
 * G1 - G050 | gCamCarg | Campos generales de la carga | Pagina 107
 */
export interface Carga {
  /**
   * G1 - G051 | cUniMedTotVol | Unidad de medida del total de volumen de la mercadería | Pagina 107
   */
  unidadMedidaTotalVolumen?: LiteralUnion<UnidadMedida, number>;
  /**
   * G1 - G053 | dTotVolMerc | Total volumen de la mercadería | Pagina 107
   */
  totalVolumenMercaderia?: number;
  /**
   * G1 - G054 | cUniMedTotPes | Unidad de medida del peso total de la mercadería | Pagina 107
   */
  unidadMedidaTotalPeso?: LiteralUnion<UnidadMedida, number>;
  /**
   * G1 - G056 | dTotPesMerc | Total peso de la mercadería | Pagina 107
   */
  totalPesoMercaderia?: number;
  /**
   * G1 - G057 | iCarCarga | Características de la Carga | Pagina 108
   */
  caracteristicasCarga?: LiteralUnion<CaracteristicasCarga, number>;
}
