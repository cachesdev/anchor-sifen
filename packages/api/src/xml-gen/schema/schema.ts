import * as v from 'valibot';
import {
  tipoEmision,
  tipoDocumentoElectronico,
  tipoTransaccion,
  tipoImpuestoAfectado,
  condicionTipoCambio,
  condicionAnticipo,
  tipoObligacion,
  tipoContribuyente,
  tipoDocumentoResponsableDE,
  naturalezaReceptor,
  tipoOperacion,
  tipoContribuyenteReceptor,
  tipoDocumentoReceptor,
  indicadorPresencia,
  naturalezaVendedor,
  tipoDocumentoVendedor,
  motivoEmision,
  motivoEmisionNotaRemision,
  responsableEmisionNotaRemision,
  condicionOperacionEnum,
  tipoPago,
  denominacionTarjeta,
  formaProcesamientoPago,
  condicionOperacionCredito,
  unidadMedida,
  codigoDatosRelevanciaMercaderias,
  formaAfectacionTributariaIVA,
  tipoOperacionVentaVehiculos,
  tipoCombustible,
  tipoTransporte,
  modalidadTransporte,
  responsableCostoFlete,
  condicionNegociacion,
  tipoIdentificacionVehiculo,
  naturalezaTransportista,
  tipoDocumentoTransportista,
  caracteristicasCarga,
  tipoDocumentoAsociado,
  tipoDocumentoImpreso,
  tipoConstancia
} from '../../sifen/types/enums';

export const enumsSchema = v.looseObject({
  operacionDE: v.looseObject({
    tipoEmision: v.optional(v.enum(tipoEmision))
  }),
  timbrado: v.looseObject({
    tipoDocumento: v.optional(v.enum(tipoDocumentoElectronico))
  }),
  datosGeneralesOperacion: v.looseObject({
    operacionComercial: v.optional(
      v.looseObject({
        tipoTransaccion: v.optional(v.enum(tipoTransaccion)),
        tipoImpuestoAfectado: v.optional(v.enum(tipoImpuestoAfectado)),
        condicionTipoCambio: v.optional(v.enum(condicionTipoCambio)),
        condicionAnticipo: v.optional(v.enum(condicionAnticipo)),
        obligacionesAfectadas: v.optional(
          v.array(v.looseObject({ codigoObligacion: v.optional(v.enum(tipoObligacion)) }))
        )
      })
    ),
    emisor: v.looseObject({
      tipoContribuyente: v.optional(v.enum(tipoContribuyente)),
      responsableDE: v.optional(
        v.looseObject({
          tipoDocumentoIdentidadResponsableDE: v.optional(v.enum(tipoDocumentoResponsableDE))
        })
      )
    }),
    receptor: v.looseObject({
      naturalezaReceptor: v.optional(v.enum(naturalezaReceptor)),
      tipoOperacion: v.optional(v.enum(tipoOperacion)),
      tipoContribuyenteReceptor: v.optional(v.enum(tipoContribuyenteReceptor)),
      tipoDocumentoIdentidadReceptor: v.optional(v.enum(tipoDocumentoReceptor))
    })
  }),
  datosEspecificosPorTipoDE: v.looseObject({
    facturaElectronica: v.optional(
      v.looseObject({ indicadorPresencia: v.optional(v.enum(indicadorPresencia)) })
    ),
    autofacturaElectronica: v.optional(
      v.looseObject({
        naturalezaVendedor: v.optional(v.enum(naturalezaVendedor)),
        tipoDocumentoIdentidadVendedor: v.optional(v.enum(tipoDocumentoVendedor))
      })
    ),
    notaCreditoDebitoElectronica: v.optional(
      v.looseObject({ motivoEmision: v.optional(v.enum(motivoEmision)) })
    ),
    notaRemisionElectronica: v.optional(
      v.looseObject({
        motivoEmisionNotaRemision: v.optional(v.enum(motivoEmisionNotaRemision)),
        responsableEmisionNotaRemision: v.optional(v.enum(responsableEmisionNotaRemision))
      })
    ),
    condicionOperacion: v.optional(
      v.looseObject({
        condicionOperacion: v.optional(v.enum(condicionOperacionEnum)),
        pagoContadoEntregaInicial: v.optional(
          v.array(
            v.looseObject({
              tipoPago: v.optional(v.enum(tipoPago)),
              pagoTarjetaCreditoDebito: v.optional(
                v.looseObject({
                  denominacionTarjeta: v.optional(v.enum(denominacionTarjeta)),
                  formaProcesamientoPago: v.optional(v.enum(formaProcesamientoPago))
                })
              )
            })
          )
        ),
        pagoCredito: v.optional(
          v.looseObject({
            condicionOperacionCredito: v.optional(v.enum(condicionOperacionCredito))
          })
        )
      })
    ),
    itemsOperacion: v.optional(
      v.array(
        v.looseObject({
          unidadMedida: v.optional(v.enum(unidadMedida)),
          codigoDatosRelevanciaMercaderias: v.optional(v.enum(codigoDatosRelevanciaMercaderias)),
          ivaItem: v.optional(
            v.looseObject({
              formaAfectacionTributariaIVA: v.optional(v.enum(formaAfectacionTributariaIVA))
            })
          ),
          vehiculoNuevo: v.optional(
            v.looseObject({
              tipoOperacionVentaVehiculos: v.optional(v.enum(tipoOperacionVentaVehiculos)),
              tipoCombustible: v.optional(v.enum(tipoCombustible))
            })
          )
        })
      )
    ),
    usosComerciales: v.optional(v.looseObject({})),
    transporte: v.optional(
      v.looseObject({
        tipoTransporte: v.optional(v.enum(tipoTransporte)),
        modalidadTransporte: v.optional(v.enum(modalidadTransporte)),
        responsableCostoFlete: v.optional(v.enum(responsableCostoFlete)),
        condicionNegociacion: v.optional(v.enum(condicionNegociacion)),
        vehiculosTrasladoMercaderias: v.optional(
          v.array(
            v.looseObject({
              tipoIdentificacionVehiculo: v.optional(v.enum(tipoIdentificacionVehiculo))
            })
          )
        ),
        transportista: v.optional(
          v.looseObject({
            naturalezaTransportista: v.optional(v.enum(naturalezaTransportista)),
            tipoDocumentoIdentidadTransportista: v.optional(v.enum(tipoDocumentoTransportista))
          })
        )
      })
    )
  }),
  camposUsoGeneral: v.optional(
    v.looseObject({
      carga: v.optional(
        v.looseObject({
          unidadMedidaTotalVolumen: v.optional(v.enum(unidadMedida)),
          unidadMedidaTotalPeso: v.optional(v.enum(unidadMedida)),
          caracteristicasCarga: v.optional(v.enum(caracteristicasCarga))
        })
      )
    })
  ),
  camposDocumentoElectronicoAsociado: v.optional(
    v.looseObject({
      tipoDocumentoAsociado: v.optional(v.enum(tipoDocumentoAsociado)),
      tipoDocumentoImpreso: v.optional(v.enum(tipoDocumentoImpreso)),
      tipoConstancia: v.optional(v.enum(tipoConstancia))
    })
  )
});
