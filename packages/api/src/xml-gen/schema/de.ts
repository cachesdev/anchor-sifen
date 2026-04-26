import * as v from 'valibot';
import { tipoEmision } from '../../sifen/types/enums';

export const operacionDEEnumSchema = v.looseObject({
  tipoEmision: v.enum(tipoEmision)
});
