import * as v from 'valibot';
import {
  tipoConstancia,
  tipoDocumentoAsociado,
  tipoDocumentoImpreso
} from '../../sifen/types/enums';

export const camposDocumentoElectronicoAsociadoEnumSchema = v.looseObject({
  tipoDocumentoAsociado: v.enum(tipoDocumentoAsociado),
  tipoDocumentoImpreso: v.optional(v.enum(tipoDocumentoImpreso)),
  tipoConstancia: v.optional(v.enum(tipoConstancia))
});
