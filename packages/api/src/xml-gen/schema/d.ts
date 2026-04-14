import * as v from 'valibot';
import type { DatosGeneralesOperacion_FE_Input } from '../../sifen/types';
import {
  condicionAnticipo,
  condicionTipoCambio,
  naturalezaReceptor,
  tipoContribuyente,
  tipoContribuyenteReceptor,
  tipoDocumentoReceptor,
  tipoDocumentoResponsableDE,
  tipoImpuestoAfectado,
  tipoObligacion,
  tipoOperacion,
  tipoTransaccion
} from '../../sifen/types/enums';

type OperacionComercialInput = DatosGeneralesOperacion_FE_Input['operacionComercial'];
type EmisorInput = DatosGeneralesOperacion_FE_Input['emisor'];
type ReceptorInput = DatosGeneralesOperacion_FE_Input['receptor'];

const obligacionesAfectadasSchema = v.object({
  codigoObligacion: v.enum(tipoObligacion)
});

export const operacionComercialSchema = v.object({
  tipoTransaccion: v.optional(v.enum(tipoTransaccion)),
  tipoImpuestoAfectado: v.enum(tipoImpuestoAfectado),
  monedaOperacion: v.string(),
  condicionTipoCambio: v.optional(v.enum(condicionTipoCambio)),
  tipoCambioOperacion: v.optional(v.number()),
  condicionAnticipo: v.optional(v.enum(condicionAnticipo)),
  obligacionesAfectadas: v.optional(v.array(obligacionesAfectadasSchema))
}) satisfies v.GenericSchema<OperacionComercialInput>;

const actividadEconomicaSchema = v.object({
  codigoActividadEconomica: v.string(),
  descripcionActividadEconomica: v.string()
});

const responsableDESchema = v.object({
  tipoDocumentoIdentidadResponsableDE: v.enum(tipoDocumentoResponsableDE),
  numeroDocumentoIdentidadResponsableDE: v.string(),
  nombreResponsableDE: v.string(),
  cargoResponsableDE: v.string()
});

export const emisorSchema = v.object({
  rucEmisor: v.string(),
  tipoContribuyente: v.enum(tipoContribuyente),
  tipoRegimen: v.optional(v.number()),
  nombreEmisor: v.string(),
  nombreFantasiaEmi: v.optional(v.string()),
  direccionEmision: v.string(),
  numeroCasa: v.number(),
  complementoDireccion1: v.optional(v.string()),
  complementoDireccion2: v.optional(v.string()),
  departamentoEmision: v.number(),
  distritoEmision: v.optional(v.number()),
  ciudadEmision: v.number(),
  telefonoEmision: v.string(),
  correoElectronicoEmisor: v.string(),
  denominacionSucursal: v.optional(v.string()),
  actividadesEconomicas: v.array(actividadEconomicaSchema),
  responsableDE: v.optional(responsableDESchema)
}) satisfies v.GenericSchema<EmisorInput>;

export const receptorSchema = v.object({
  naturalezaReceptor: v.enum(naturalezaReceptor),
  tipoOperacion: v.enum(tipoOperacion),
  paisReceptor: v.string(),
  tipoContribuyenteReceptor: v.optional(v.enum(tipoContribuyenteReceptor)),
  rucReceptor: v.optional(v.string()),
  tipoDocumentoIdentidadReceptor: v.optional(v.enum(tipoDocumentoReceptor)),
  numeroDocumentoIdentidad: v.optional(v.string()),
  nombreReceptor: v.string(),
  nombreFantasiaReceptor: v.optional(v.string()),
  direccionReceptor: v.optional(v.string()),
  numeroCasaReceptor: v.optional(v.number()),
  departamentoReceptor: v.optional(v.number()),
  distritoReceptor: v.optional(v.number()),
  ciudadReceptor: v.optional(v.number()),
  telefonoReceptor: v.optional(v.string()),
  celularReceptor: v.optional(v.string()),
  correoElectronicoReceptor: v.optional(v.string()),
  codigoCliente: v.optional(v.string())
}) satisfies v.GenericSchema<ReceptorInput>;
