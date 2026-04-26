import * as v from 'valibot';
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

export const operacionComercialEnumSchema = v.looseObject({
  tipoTransaccion: v.optional(v.enum(tipoTransaccion)),
  tipoImpuestoAfectado: v.enum(tipoImpuestoAfectado),
  condicionTipoCambio: v.optional(v.enum(condicionTipoCambio)),
  condicionAnticipo: v.optional(v.enum(condicionAnticipo)),
  obligacionesAfectadas: v.optional(
    v.array(v.looseObject({ codigoObligacion: v.enum(tipoObligacion) }))
  )
});

export const emisorEnumSchema = v.looseObject({
  tipoContribuyente: v.enum(tipoContribuyente),
  responsableDE: v.optional(
    v.looseObject({
      tipoDocumentoIdentidadResponsableDE: v.enum(tipoDocumentoResponsableDE)
    })
  )
});

export const receptorEnumSchema = v.looseObject({
  naturalezaReceptor: v.enum(naturalezaReceptor),
  tipoOperacion: v.enum(tipoOperacion),
  tipoContribuyenteReceptor: v.optional(v.enum(tipoContribuyenteReceptor)),
  tipoDocumentoIdentidadReceptor: v.optional(v.enum(tipoDocumentoReceptor))
});
