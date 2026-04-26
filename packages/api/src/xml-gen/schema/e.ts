import * as v from 'valibot';
import {
  codigoDatosRelevanciaMercaderias,
  condicionNegociacion,
  condicionOperacionCredito,
  condicionOperacionEnum,
  denominacionTarjeta,
  formaAfectacionTributariaIVA,
  formaProcesamientoPago,
  indicadorPresencia,
  modalidadTransporte,
  naturalezaTransportista,
  responsableCostoFlete,
  tipoCombustible,
  tipoDocumentoTransportista,
  tipoIdentificacionVehiculo,
  tipoOperacionVentaVehiculos,
  tipoPago,
  tipoTransporte,
  unidadMedida
} from '../../sifen/types/enums';

export const facturaElectronicaEnumSchema = v.looseObject({
  indicadorPresencia: v.enum(indicadorPresencia)
});

export const condicionOperacionEnumSchema = v.looseObject({
  condicionOperacion: v.enum(condicionOperacionEnum),
  pagoContadoEntregaInicial: v.optional(
    v.array(
      v.looseObject({
        tipoPago: v.enum(tipoPago),
        pagoTarjetaCreditoDebito: v.optional(
          v.looseObject({
            denominacionTarjeta: v.enum(denominacionTarjeta),
            formaProcesamientoPago: v.enum(formaProcesamientoPago)
          })
        )
      })
    )
  ),
  pagoCredito: v.optional(
    v.looseObject({ condicionOperacionCredito: v.enum(condicionOperacionCredito) })
  )
});

export const itemOperacionEnumSchema = v.looseObject({
  unidadMedida: v.enum(unidadMedida),
  codigoDatosRelevanciaMercaderias: v.optional(v.enum(codigoDatosRelevanciaMercaderias)),
  ivaItem: v.optional(
    v.looseObject({ formaAfectacionTributariaIVA: v.enum(formaAfectacionTributariaIVA) })
  ),
  vehiculoNuevo: v.optional(
    v.looseObject({
      tipoOperacionVentaVehiculos: v.optional(v.enum(tipoOperacionVentaVehiculos)),
      tipoCombustible: v.optional(v.enum(tipoCombustible))
    })
  )
});

export const transporteEnumSchema = v.looseObject({
  tipoTransporte: v.optional(v.enum(tipoTransporte)),
  modalidadTransporte: v.enum(modalidadTransporte),
  responsableCostoFlete: v.enum(responsableCostoFlete),
  condicionNegociacion: v.optional(v.enum(condicionNegociacion)),
  vehiculosTrasladoMercaderias: v.optional(
    v.array(
      v.looseObject({ tipoIdentificacionVehiculo: v.enum(tipoIdentificacionVehiculo) })
    )
  ),
  transportista: v.optional(
    v.looseObject({
      naturalezaTransportista: v.enum(naturalezaTransportista),
      tipoDocumentoIdentidadTransportista: v.optional(v.enum(tipoDocumentoTransportista))
    })
  )
});
