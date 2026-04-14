import * as v from 'valibot';
import type { UsoGeneral } from '../../sifen/types/clean/g';
import { caracteristicasCarga, unidadMedida } from '../../sifen/types/enums';

const cargaSchema = v.object({
  unidadMedidaTotalVolumen: v.optional(v.enum(unidadMedida)),
  totalVolumenMercaderia: v.optional(v.number()),
  unidadMedidaTotalPeso: v.optional(v.enum(unidadMedida)),
  totalPesoMercaderia: v.optional(v.number()),
  caracteristicasCarga: v.optional(v.enum(caracteristicasCarga))
});

export const camposUsoGeneralSchema = v.object({
  ordenCompra: v.optional(v.string()),
  ordenVenta: v.optional(v.string()),
  asientoContable: v.optional(v.string()),
  carga: v.optional(cargaSchema)
}) satisfies v.GenericSchema<UsoGeneral>;
