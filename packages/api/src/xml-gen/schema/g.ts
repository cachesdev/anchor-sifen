import * as v from 'valibot';
import { caracteristicasCarga, unidadMedida } from '../../sifen/types/enums';

const cargaEnumSchema = v.looseObject({
  unidadMedidaTotalVolumen: v.optional(v.enum(unidadMedida)),
  unidadMedidaTotalPeso: v.optional(v.enum(unidadMedida)),
  caracteristicasCarga: v.optional(v.enum(caracteristicasCarga))
});

export const camposUsoGeneralEnumSchema = v.looseObject({
  carga: v.optional(cargaEnumSchema)
});
