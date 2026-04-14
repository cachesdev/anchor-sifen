import * as v from 'valibot';
import type { DocumentoElectronicoAsociado } from '../../sifen/types/clean/h';
import {
  tipoConstancia,
  tipoDocumentoAsociado,
  tipoDocumentoImpreso
} from '../../sifen/types/enums';

export const camposDocumentoElectronicoAsociadoSchema = v.object({
  tipoDocumentoAsociado: v.enum(tipoDocumentoAsociado),
  cdcDocumentoReferenciado: v.optional(v.string()),
  numeroTimbradoDocumentoImpreso: v.optional(v.number()),
  establecimiento: v.optional(v.string()),
  puntoExpedicion: v.optional(v.string()),
  numeroDocumento: v.optional(v.string()),
  tipoDocumentoImpreso: v.optional(v.enum(tipoDocumentoImpreso)),
  fechaEmisionDocumentoImpreso: v.optional(v.date()),
  numeroComprobanteRetencion: v.optional(v.string()),
  numeroResolucionCreditoFiscal: v.optional(v.string()),
  tipoConstancia: v.optional(v.enum(tipoConstancia)),
  numeroConstancia: v.optional(v.number()),
  numeroControlConstancia: v.optional(v.string()),
  rucFusionado: v.optional(v.string())
}) satisfies v.GenericSchema<DocumentoElectronicoAsociado>;
