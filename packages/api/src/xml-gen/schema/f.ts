import * as v from 'valibot';
import type { SubtotalesTotales_FE_Input } from '../../sifen/types';

export const subtotalesTotalesSchema = v.object({
  comisionOperacion: v.optional(v.number())
}) satisfies v.GenericSchema<SubtotalesTotales_FE_Input>;
