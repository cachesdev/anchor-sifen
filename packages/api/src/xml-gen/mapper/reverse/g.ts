import type { Carga, UsoGeneral } from '../../../sifen/types/clean/g';
import type { GCamCarg, GCamGen } from '../../../sifen/types/raw/g';
import { optionalMapper } from './helpers';

export function mapGCamGenToClean(data: GCamGen): UsoGeneral {
  return {
    ordenCompra: data.dOrdCompra,
    ordenVenta: data.dOrdVta,
    asientoContable: data.dAsiento,
    carga: optionalMapper(mapGCamCargToClean, data.gCamCarg)
  };
}

export function mapGCamCargToClean(data: GCamCarg): Carga {
  return {
    unidadMedidaTotalVolumen: data.cUniMedTotVol,
    totalVolumenMercaderia: data.dTotVolMerc,
    unidadMedidaTotalPeso: data.cUniMedTotPes,
    totalPesoMercaderia: data.dTotPesMerc,
    caracteristicasCarga: data.iCarCarga
  };
}
