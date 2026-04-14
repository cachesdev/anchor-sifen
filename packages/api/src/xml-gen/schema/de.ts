import * as v from 'valibot';
import type { OperacionDE_FE_Input, Timbrado_FE_Input } from '../../sifen/types';
import { tipoEmision } from '../../sifen/types/enums';

export const operacionDESchema = v.object({
  tipoEmision: v.enum(tipoEmision),
  informacionEmisor: v.optional(v.string()),
  informacionFisco: v.optional(v.string())
}) satisfies v.GenericSchema<OperacionDE_FE_Input>;

export const timbradoFESchema = v.object({
  numeroTimbrado: v.number(),
  establecimiento: v.number(),
  puntoExpedicion: v.number(),
  numeroDocumento: v.number(),
  serieNumero: v.optional(v.string()),
  fechaInicioVigencia: v.date()
}) satisfies v.GenericSchema<Timbrado_FE_Input>;
