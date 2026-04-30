import type { Carga, UsoGeneral } from '../../../sifen/types/clean';

export function createCarga(overrides?: Partial<Carga>): Carga {
  return {
    unidadMedidaTotalVolumen: undefined,
    totalVolumenMercaderia: undefined,
    unidadMedidaTotalPeso: undefined,
    totalPesoMercaderia: undefined,
    caracteristicasCarga: undefined,
    ...overrides
  };
}

export function createUsoGeneral(overrides?: Partial<UsoGeneral>): UsoGeneral {
  return {
    ordenCompra: undefined,
    ordenVenta: undefined,
    asientoContable: undefined,
    carga: undefined,
    ...overrides
  };
}
