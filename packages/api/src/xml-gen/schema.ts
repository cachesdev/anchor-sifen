import * as v from 'valibot';
import type {
  FacturaElectronica,
  DatosEspecificosPorTipoDE_FE,
  DatosGeneralesOperacion_FE,
  ItemOperacion_FE,
  Timbrado_FE
} from '../sifen/types';
import type { OperacionDE } from '../sifen/types/clean/de';
import type {
  CamposFacturaElectronica,
  CondicionOperacion,
  Transporte
} from '../sifen/types/clean/e';
import type { SubtotalesTotales } from '../sifen/types/clean/f';
import type { UsoGeneral } from '../sifen/types/clean/g';
import type { DocumentoElectronicoAsociado } from '../sifen/types/clean/h';
import {
  caracteristicasCarga,
  codigoDatosRelevanciaMercaderias,
  condicionAnticipo,
  condicionOperacionCredito,
  condicionOperacionEnum,
  condicionTipoCambio,
  condicionNegociacion,
  denominacionTarjeta,
  formaAfectacionTributariaIVA,
  formaProcesamientoPago,
  indicadorPresencia,
  modalidadTransporte,
  naturalezaReceptor,
  naturalezaTransportista,
  responsableCostoFlete,
  tipoCombustible,
  tipoContribuyente,
  tipoContribuyenteReceptor,
  tipoConstancia,
  tipoDocumentoAsociado,
  tipoDocumentoImpreso,
  tipoDocumentoReceptor,
  tipoDocumentoResponsableDE,
  tipoDocumentoTransportista,
  tipoEmision,
  tipoIdentificacionVehiculo,
  tipoImpuestoAfectado,
  tipoObligacion,
  tipoOperacion,
  tipoOperacionVentaVehiculos,
  tipoPago,
  tipoTransaccion,
  tipoTransporte,
  unidadMedida
} from '../sifen/types/enums';

import { calculateFieldsResult } from './calculate';

const operacionDESchema = v.object({
  tipoEmision: v.enum(tipoEmision),
  codigoSeguridad: v.optional(v.number()),
  informacionEmisor: v.optional(v.string()),
  informacionFisco: v.optional(v.string())
}) satisfies v.GenericSchema<OperacionDE>;

const timbradoFESchema = v.object({
  numeroTimbrado: v.number(),
  establecimiento: v.number(),
  puntoExpedicion: v.number(),
  numeroDocumento: v.number(),
  serieNumero: v.optional(v.string()),
  fechaInicioVigencia: v.date()
}) satisfies v.GenericSchema<Timbrado_FE>;

const obligacionesAfectadasSchema = v.object({
  codigoObligacion: v.enum(tipoObligacion)
});

const operacionComercialSchema = v.object({
  tipoTransaccion: v.optional(v.enum(tipoTransaccion)),
  tipoImpuestoAfectado: v.enum(tipoImpuestoAfectado),
  monedaOperacion: v.string(),
  condicionTipoCambio: v.optional(v.enum(condicionTipoCambio)),
  tipoCambioOperacion: v.optional(v.number()),
  condicionAnticipo: v.optional(v.enum(condicionAnticipo)),
  obligacionesAfectadas: v.optional(v.array(obligacionesAfectadasSchema))
});

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

const emisorSchema = v.object({
  rucEmisor: v.string(),
  digitoVerificadorEmisor: v.optional(v.number()),
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
});

const receptorSchema = v.object({
  naturalezaReceptor: v.enum(naturalezaReceptor),
  tipoOperacion: v.enum(tipoOperacion),
  paisReceptor: v.string(),
  tipoContribuyenteReceptor: v.optional(v.enum(tipoContribuyenteReceptor)),
  rucReceptor: v.optional(v.string()),
  digitoVerificadorReceptor: v.optional(v.number()),
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
});

const datosGeneralesOperacionFESchema = v.object({
  fechaEmisionDE: v.date(),
  operacionComercial: operacionComercialSchema,
  emisor: emisorSchema,
  receptor: receptorSchema
}) satisfies v.GenericSchema<DatosGeneralesOperacion_FE>;

const comprasPublicasSchema = v.object({
  modalidadContratacion: v.string(),
  entidadContratacion: v.number(),
  anoContratacion: v.number(),
  secuenciaContratacion: v.number(),
  fechaEmisionCodigoContratacion: v.date()
});

const camposFacturaElectronicaSchema = v.object({
  indicadorPresencia: v.enum(indicadorPresencia),
  fechaFuturaTrasladoMercaderia: v.optional(v.date()),
  comprasPublicas: v.optional(comprasPublicasSchema)
}) satisfies v.GenericSchema<CamposFacturaElectronica>;

const pagoTarjetaCreditoDebitoSchema = v.object({
  denominacionTarjeta: v.enum(denominacionTarjeta),
  razonSocialProcesadoraTarjeta: v.optional(v.string()),
  rucProcesadoraTarjeta: v.optional(v.string()),
  digitoVerificadorProcesadoraTarjeta: v.optional(v.number()),
  formaProcesamientoPago: v.enum(formaProcesamientoPago),
  codigoAutorizacionOperacion: v.optional(v.string()),
  nombreTitularTarjeta: v.optional(v.string()),
  numeroTarjeta: v.optional(v.string())
});

const pagoChequeSchema = v.object({
  numeroCheque: v.string(),
  bancoEmisor: v.string()
});

const pagoContadoEntregaInicialSchema = v.object({
  tipoPago: v.enum(tipoPago),
  montoTipoPago: v.number(),
  monedaTipoPago: v.string(),
  tipoCambioTipoPago: v.optional(v.number()),
  pagoTarjetaCreditoDebito: v.optional(pagoTarjetaCreditoDebitoSchema),
  pagoCheque: v.optional(pagoChequeSchema)
});

const cuotaSchema = v.object({
  monedaCuota: v.string(),
  montoCuota: v.number(),
  vencimientoCuota: v.optional(v.date())
});

const pagoCreditoSchema = v.object({
  condicionOperacionCredito: v.enum(condicionOperacionCredito),
  plazoCredito: v.optional(v.string()),
  cantidadCuotas: v.optional(v.number()),
  montoEntregaInicial: v.optional(v.number()),
  cuotas: v.optional(v.array(cuotaSchema))
});

const condicionOperacionSchema = v.object({
  condicionOperacion: v.enum(condicionOperacionEnum),
  pagoContadoEntregaInicial: v.optional(v.array(pagoContadoEntregaInicialSchema)),
  pagoCredito: v.optional(pagoCreditoSchema)
}) satisfies v.GenericSchema<CondicionOperacion>;

const valorRestaItemSchema = v.object({
  descuentoParticularItem: v.optional(v.number()),
  porcentajeDescuentoItem: v.optional(v.number()),
  descuentoGlobalItem: v.optional(v.number()),
  anticipoParticularItem: v.optional(v.number()),
  anticipoGlobalItem: v.optional(v.number()),
  valorTotalOperacionItem: v.number(),
  valorTotalOperacionItemGs: v.optional(v.number())
});

const valorItemSchema = v.object({
  precioUnitario: v.number(),
  tipoCambioItem: v.optional(v.number()),
  totalBrutoOperacionItem: v.number(),
  valorRestaItem: valorRestaItemSchema
});

const ivaItemSchema = v.object({
  formaAfectacionTributariaIVA: v.enum(formaAfectacionTributariaIVA),
  proporcionGravadaIva: v.number(),
  tasaIva: v.number(),
  baseGravadaIvaItem: v.number(),
  liquidacionIvaItem: v.number(),
  baseExenta: v.number()
});

const rastreoMercaderiaSchema = v.object({
  numeroLote: v.optional(v.string()),
  fechaVencimientoMercaderia: v.optional(v.date()),
  numeroSerie: v.optional(v.string()),
  numeroPedido: v.optional(v.string()),
  numeroSeguimientoEnvio: v.optional(v.string()),
  numeroRegistroProductoSenave: v.optional(v.string()),
  numeroRegistroEntidadComercialSenave: v.optional(v.string()),
  nombreProducto: v.string()
});

const detalleVehiculoNuevoSchema = v.object({
  tipoOperacionVentaVehiculos: v.optional(v.enum(tipoOperacionVentaVehiculos)),
  chasisVehiculo: v.optional(v.string()),
  colorVehiculo: v.optional(v.string()),
  potenciaMotor: v.optional(v.number()),
  capacidadMotor: v.optional(v.number()),
  pesoNeto: v.optional(v.number()),
  pesoBruto: v.optional(v.number()),
  tipoCombustible: v.optional(v.enum(tipoCombustible)),
  numeroMotor: v.optional(v.string()),
  capacidadMaximaTraccion: v.optional(v.number()),
  anoFabricacion: v.optional(v.number()),
  tipoVehiculo: v.optional(v.string()),
  capacidadMaximaPasajeros: v.optional(v.number()),
  cilindradasMotor: v.optional(v.string())
});

const itemOperacionFESchema = v.object({
  codigoInterno: v.string(),
  partidaArancelaria: v.optional(v.number()),
  ncm: v.optional(v.number()),
  codigoDncpGeneral: v.optional(v.string()),
  codigoDncpEspecifico: v.optional(v.string()),
  codigoGtinProducto: v.optional(v.number()),
  codigoGtinPaquete: v.optional(v.number()),
  descripcionProductoServicio: v.string(),
  unidadMedida: v.enum(unidadMedida),
  cantidadProductoServicio: v.number(),
  paisOrigen: v.optional(v.string()),
  informacionItem: v.optional(v.string()),
  codigoDatosRelevanciaMercaderias: v.optional(v.enum(codigoDatosRelevanciaMercaderias)),
  cantidadQuiebraMerma: v.optional(v.number()),
  porcentajeQuiebraMerma: v.optional(v.number()),
  cdcAnticipo: v.optional(v.string()),
  valorItem: valorItemSchema,
  ivaItem: v.optional(ivaItemSchema),
  rastreoMercaderia: v.optional(rastreoMercaderiaSchema),
  vehiculoNuevo: v.optional(detalleVehiculoNuevoSchema)
}) satisfies v.GenericSchema<ItemOperacion_FE>;

const sectorEnergiaElectricaSchema = v.object({
  numeroMedidor: v.optional(v.string()),
  codigoActividad: v.optional(v.number()),
  codigoCategoria: v.optional(v.string()),
  lecturaAnterior: v.optional(v.number()),
  lecturaActual: v.optional(v.number()),
  consumoKwh: v.optional(v.number())
});

const polizaSegurosSchema = v.object({
  codigoPoliza: v.string(),
  unidadVigencia: v.string(),
  vigenciaPoliza: v.number(),
  numeroPoliza: v.string(),
  fechaInicioVigencia: v.optional(v.date()),
  fechaFinVigencia: v.optional(v.date()),
  codigoInternoItem: v.optional(v.string())
});

const sectorSegurosSchema = v.object({
  codigoEmpresaSeguros: v.optional(v.string()),
  polizaSeguros: v.optional(v.array(polizaSegurosSchema))
});

const sectorSupermercadosSchema = v.object({
  nombreCajero: v.optional(v.string()),
  efectivo: v.optional(v.number()),
  vuelto: v.optional(v.number()),
  montoDonacion: v.optional(v.number()),
  descripcionDonacion: v.optional(v.string())
});

const datosAdicionalesUsoComercialSchema = v.object({
  ciclo: v.optional(v.string()),
  fechaInicioCiclo: v.optional(v.date()),
  fechaFinCiclo: v.optional(v.date()),
  vencimientoPago: v.optional(v.array(v.date())),
  numeroContrato: v.optional(v.string()),
  saldoAnterior: v.optional(v.number()),
  codigoContratacionDNCP: v.optional(v.number())
});

const usoComercialSchema = v.object({
  sectorEnergiaElectrica: v.optional(sectorEnergiaElectricaSchema),
  sectorSeguros: v.optional(sectorSegurosSchema),
  sectorSupermercados: v.optional(sectorSupermercadosSchema),
  datosAdicionalesUsoComercial: v.optional(datosAdicionalesUsoComercialSchema)
});

const localSalidaMercaderiasSchema = v.object({
  direccionLocalSalida: v.string(),
  numeroCasaSalida: v.number(),
  complementoDireccion1Salida: v.optional(v.string()),
  complementoDireccion2Salida: v.optional(v.string()),
  departamentoSalida: v.optional(v.number()),
  distritoSalida: v.optional(v.number()),
  ciudadSalida: v.optional(v.number()),
  telefonoLocalSalida: v.optional(v.string())
});

const localEntregaMercaderiasSchema = v.object({
  direccionLocalEntrega: v.string(),
  numeroCasaEntrega: v.number(),
  complementoDireccion1Entrega: v.optional(v.string()),
  complementoDireccion2Entrega: v.optional(v.string()),
  departamentoEntrega: v.number(),
  distritoEntrega: v.optional(v.number()),
  ciudadEntrega: v.number(),
  telefonoLocalEntrega: v.optional(v.string())
});

const vehiculoTrasladoMercaderiasSchema = v.object({
  tipoVehiculo: v.string(),
  marcaVehiculo: v.string(),
  tipoIdentificacionVehiculo: v.enum(tipoIdentificacionVehiculo),
  numeroIdentificacionVehiculo: v.optional(v.string()),
  datosAdicionalesVehiculo: v.optional(v.string()),
  numeroMatriculaVehiculo: v.optional(v.string()),
  numeroVuelo: v.optional(v.string())
});

const transportistaSchema = v.object({
  naturalezaTransportista: v.enum(naturalezaTransportista),
  nombreTransportista: v.string(),
  rucTransportista: v.optional(v.string()),
  digitoVerificadorRucTransportista: v.optional(v.number()),
  tipoDocumentoIdentidadTransportista: v.optional(v.enum(tipoDocumentoTransportista)),
  numeroDocumentoIdentidadTransportista: v.optional(v.string()),
  nacionalidadTransportista: v.optional(v.string()),
  numeroDocumentoIdentidadChofer: v.string(),
  nombreChofer: v.string(),
  domicilioFiscalTransportista: v.string(),
  direccionChofer: v.string(),
  nombreAgente: v.optional(v.string()),
  rucAgente: v.optional(v.string()),
  digitoVerificadorRucAgente: v.optional(v.string()),
  direccionAgente: v.optional(v.string())
});

const transporteSchema = v.object({
  tipoTransporte: v.optional(v.enum(tipoTransporte)),
  modalidadTransporte: v.enum(modalidadTransporte),
  responsableCostoFlete: v.enum(responsableCostoFlete),
  condicionNegociacion: v.optional(v.enum(condicionNegociacion)),
  numeroManifiestoCarga: v.optional(v.string()),
  numeroDespachoImportacion: v.optional(v.string()),
  inicioEstimadoTraslado: v.optional(v.date()),
  finEstimadoTraslado: v.optional(v.date()),
  paisDestino: v.optional(v.string()),
  localSalidaMercaderias: v.optional(localSalidaMercaderiasSchema),
  localesEntregaMercaderias: v.optional(v.array(localEntregaMercaderiasSchema)),
  vehiculosTrasladoMercaderias: v.optional(v.array(vehiculoTrasladoMercaderiasSchema)),
  transportista: v.optional(transportistaSchema)
}) satisfies v.GenericSchema<Transporte>;

const datosEspecificosPorTipoDESchema = v.object({
  facturaElectronica: camposFacturaElectronicaSchema,
  condicionOperacion: condicionOperacionSchema,
  itemsOperacion: v.array(itemOperacionFESchema),
  usosComerciales: v.optional(usoComercialSchema),
  transporte: v.optional(transporteSchema)
}) satisfies v.GenericSchema<DatosEspecificosPorTipoDE_FE>;

const subtotalesTotalesSchema = v.object({
  subtotalExenta: v.optional(v.number()),
  subtotalExonerada: v.optional(v.number()),
  subtotalIva5: v.optional(v.number()),
  subtotalIva10: v.optional(v.number()),
  totalBrutoOperacion: v.number(),
  totalDescuentoParticular: v.number(),
  totalDescuentoGlobal: v.number(),
  totalAnticipoItem: v.number(),
  totalAnticipoGlobal: v.number(),
  porcentajeDescuentoGlobal: v.number(),
  totalDescuentosOperacion: v.number(),
  totalAnticiposOperacion: v.number(),
  redondeoOperacion: v.number(),
  comisionOperacion: v.optional(v.number()),
  totalNetoOperacion: v.number(),
  liquidacionIva5: v.optional(v.number()),
  liquidacionIva10: v.optional(v.number()),
  liquidacionTotalIva5: v.optional(v.number()),
  liquidacionTotalIva10: v.optional(v.number()),
  liquidacionIvaComision: v.optional(v.number()),
  liquidacionTotalIva: v.optional(v.number()),
  totalBaseGravada5: v.optional(v.number()),
  totalBaseGravada10: v.optional(v.number()),
  totalBaseGravadaIva: v.optional(v.number()),
  totalOperacionGs: v.optional(v.number())
}) satisfies v.GenericSchema<SubtotalesTotales>;

const cargaSchema = v.object({
  unidadMedidaTotalVolumen: v.optional(v.enum(unidadMedida)),
  totalVolumenMercaderia: v.optional(v.number()),
  unidadMedidaTotalPeso: v.optional(v.enum(unidadMedida)),
  totalPesoMercaderia: v.optional(v.number()),
  caracteristicasCarga: v.optional(v.enum(caracteristicasCarga))
});

const camposUsoGeneralSchema = v.object({
  ordenCompra: v.optional(v.string()),
  ordenVenta: v.optional(v.string()),
  asientoContable: v.optional(v.string()),
  carga: v.optional(cargaSchema)
}) satisfies v.GenericSchema<UsoGeneral>;

const camposDocumentoElectronicoAsociadoSchema = v.object({
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

export const facturaElectronicaSchema = v.object({
  id_cdc: v.string(),
  digitoVerificadorId: v.optional(v.number()),
  fechaFirma: v.optional(v.date()),
  operacionDE: operacionDESchema,
  timbrado: timbradoFESchema,
  datosGeneralesOperacion: datosGeneralesOperacionFESchema,
  datosEspecificosPorTipoDE: datosEspecificosPorTipoDESchema,
  subtotalesTotales: subtotalesTotalesSchema,
  camposUsoGeneral: v.optional(camposUsoGeneralSchema),
  camposDocumentoElectronicoAsociado: v.optional(camposDocumentoElectronicoAsociadoSchema)
}) satisfies v.GenericSchema<FacturaElectronica>;

export const facturaElectronicaCalculatedSchema = v.pipe(
  facturaElectronicaSchema,
  v.rawTransform(({ dataset, addIssue, NEVER }) => {
    if (!dataset.typed) {
      return NEVER;
    }

    const result = calculateFieldsResult(dataset.value);
    if (!result.ok) {
      addIssue({ message: result.error.message });
      return NEVER;
    }

    return result.value;
  })
) satisfies v.GenericSchema<FacturaElectronica>;

type Assert<T extends true> = T;

// Checkea en tiempo de compilacion si hay type drift entre el schema y el tipo concreto
type _Check = Assert<
  [v.InferInput<typeof facturaElectronicaSchema>] extends [FacturaElectronica] ? true : false
>;
declare const _: _Check;
