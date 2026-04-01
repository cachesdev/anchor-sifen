import type { Carga, UsoGeneral } from '../../sifen/types/clean/g';
import { descripcionCaracteristicasCarga, descripcionUnidadMedida } from '../../sifen/types/enums';
import type { GCamCarg, GCamGen } from '../../sifen/types/raw/g';
import { resolveOptionalDescription } from './helpers';

export function mapUsoGeneralToRaw(data: UsoGeneral): GCamGen {
  return {
    dOrdCompra: data.ordenCompra,
    dOrdVta: data.ordenVenta,
    dAsiento: data.asientoContable,
    gCamCarg: data.carga ? mapCargaToRaw(data.carga) : undefined
  } as GCamGen;
}

export function mapCargaToRaw(data: Carga): GCamCarg {
  return {
    cUniMedTotVol: data.unidadMedidaTotalVolumen,
    dDesUniMedTotVol: resolveOptionalDescription(
      data.unidadMedidaTotalVolumen,
      descripcionUnidadMedida as Record<string, string>
    ),
    dTotVolMerc: data.totalVolumenMercaderia,
    cUniMedTotPes: data.unidadMedidaTotalPeso,
    dDesUniMedTotPes: resolveOptionalDescription(
      data.unidadMedidaTotalPeso,
      descripcionUnidadMedida as Record<string, string>
    ),
    dTotPesMerc: data.totalPesoMercaderia,
    iCarCarga: data.caracteristicasCarga,
    dDesCarCarga: resolveOptionalDescription(
      data.caracteristicasCarga,
      descripcionCaracteristicasCarga as Record<string, string>
    )
  } as GCamCarg;
}
