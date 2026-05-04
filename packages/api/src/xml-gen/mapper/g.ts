import type { Carga, UsoGeneral } from '../../sifen/types/clean/g';
import { descripcionCaracteristicasCarga, descripcionUnidadMedida } from '../../sifen/types/enums';
import type { GCamCarg, GCamGen } from '../../sifen/types/raw/g';
import { asLiteral } from '../../sifen/types/union';
import { optionalMapper } from './helpers';

export function mapUsoGeneralToRaw(data: UsoGeneral): GCamGen {
  return {
    dOrdCompra: data.ordenCompra,
    dOrdVta: data.ordenVenta,
    dAsiento: data.asientoContable,
    gCamCarg: optionalMapper(mapCargaToRaw, data.carga)
  };
}

export function mapCargaToRaw(data: Carga): GCamCarg {
  const unidadMedidaTotalVolumen = asLiteral(data.unidadMedidaTotalVolumen);
  const unidadMedidaTotalPeso = asLiteral(data.unidadMedidaTotalPeso);
  const caracteristicasCarga = asLiteral(data.caracteristicasCarga);

  return {
    cUniMedTotVol: unidadMedidaTotalVolumen,
    dDesUniMedTotVol:
      unidadMedidaTotalVolumen !== undefined
        ? descripcionUnidadMedida[unidadMedidaTotalVolumen]
        : undefined,
    dTotVolMerc: data.totalVolumenMercaderia,
    cUniMedTotPes: unidadMedidaTotalPeso,
    dDesUniMedTotPes:
      unidadMedidaTotalPeso !== undefined
        ? descripcionUnidadMedida[unidadMedidaTotalPeso]
        : undefined,
    dTotPesMerc: data.totalPesoMercaderia,
    iCarCarga: caracteristicasCarga,
    dDesCarCarga:
      caracteristicasCarga !== undefined
        ? descripcionCaracteristicasCarga[caracteristicasCarga]
        : undefined
  };
}
