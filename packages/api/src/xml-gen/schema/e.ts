import * as v from 'valibot';
import type { DatosEspecificosPorTipoDE_FE_Input, ItemOperacion_FE_Input } from '../../sifen/types';
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

type CamposFacturaElectronicaInput = DatosEspecificosPorTipoDE_FE_Input['facturaElectronica'];
type CondicionOperacionInput = DatosEspecificosPorTipoDE_FE_Input['condicionOperacion'];
type PagoContadoEntregaInicialInput = NonNullable<
  CondicionOperacionInput['pagoContadoEntregaInicial']
>[number];
type PagoTarjetaCreditoDebitoInput = NonNullable<
  PagoContadoEntregaInicialInput['pagoTarjetaCreditoDebito']
>;
type PagoChequeInput = NonNullable<PagoContadoEntregaInicialInput['pagoCheque']>;
type PagoCreditoInput = NonNullable<CondicionOperacionInput['pagoCredito']>;
type CuotaInput = NonNullable<PagoCreditoInput['cuotas']>[number];
type ValorItemInput = ItemOperacion_FE_Input['valorItem'];
type ValorRestaItemInput = ValorItemInput['valorRestaItem'];
type IvaItemInput = NonNullable<ItemOperacion_FE_Input['ivaItem']>;
type UsoComercialInput = NonNullable<DatosEspecificosPorTipoDE_FE_Input['usosComerciales']>;
type TransporteInput = NonNullable<DatosEspecificosPorTipoDE_FE_Input['transporte']>;

const comprasPublicasSchema = v.object({
  modalidadContratacion: v.string(),
  entidadContratacion: v.number(),
  anoContratacion: v.number(),
  secuenciaContratacion: v.number(),
  fechaEmisionCodigoContratacion: v.date()
});

export const camposFacturaElectronicaSchema = v.object({
  indicadorPresencia: v.enum(indicadorPresencia),
  fechaFuturaTrasladoMercaderia: v.optional(v.date()),
  comprasPublicas: v.optional(comprasPublicasSchema)
}) satisfies v.GenericSchema<CamposFacturaElectronicaInput>;

const pagoTarjetaCreditoDebitoSchema = v.object({
  denominacionTarjeta: v.enum(denominacionTarjeta),
  razonSocialProcesadoraTarjeta: v.optional(v.string()),
  rucProcesadoraTarjeta: v.optional(v.string()),
  formaProcesamientoPago: v.enum(formaProcesamientoPago),
  codigoAutorizacionOperacion: v.optional(v.string()),
  nombreTitularTarjeta: v.optional(v.string()),
  numeroTarjeta: v.optional(v.string())
}) satisfies v.GenericSchema<PagoTarjetaCreditoDebitoInput>;

const pagoChequeSchema = v.object({
  numeroCheque: v.string(),
  bancoEmisor: v.string()
}) satisfies v.GenericSchema<PagoChequeInput>;

const pagoContadoEntregaInicialSchema = v.object({
  tipoPago: v.enum(tipoPago),
  montoTipoPago: v.number(),
  monedaTipoPago: v.string(),
  tipoCambioTipoPago: v.optional(v.number()),
  pagoTarjetaCreditoDebito: v.optional(pagoTarjetaCreditoDebitoSchema),
  pagoCheque: v.optional(pagoChequeSchema)
}) satisfies v.GenericSchema<PagoContadoEntregaInicialInput>;

const cuotaSchema = v.object({
  monedaCuota: v.string(),
  montoCuota: v.number(),
  vencimientoCuota: v.optional(v.date())
}) satisfies v.GenericSchema<CuotaInput>;

const pagoCreditoSchema = v.object({
  condicionOperacionCredito: v.enum(condicionOperacionCredito),
  plazoCredito: v.optional(v.string()),
  cantidadCuotas: v.optional(v.number()),
  montoEntregaInicial: v.optional(v.number()),
  cuotas: v.optional(v.array(cuotaSchema))
}) satisfies v.GenericSchema<PagoCreditoInput>;

export const condicionOperacionSchema = v.object({
  condicionOperacion: v.enum(condicionOperacionEnum),
  pagoContadoEntregaInicial: v.optional(v.array(pagoContadoEntregaInicialSchema)),
  pagoCredito: v.optional(pagoCreditoSchema)
}) satisfies v.GenericSchema<CondicionOperacionInput>;

const valorRestaItemSchema = v.object({
  descuentoParticularItem: v.optional(v.number()),
  descuentoGlobalItem: v.optional(v.number()),
  anticipoParticularItem: v.optional(v.number()),
  anticipoGlobalItem: v.optional(v.number())
}) satisfies v.GenericSchema<ValorRestaItemInput>;

const valorItemSchema = v.object({
  precioUnitario: v.number(),
  tipoCambioItem: v.optional(v.number()),
  valorRestaItem: valorRestaItemSchema
}) satisfies v.GenericSchema<ValorItemInput>;

const ivaItemSchema = v.object({
  formaAfectacionTributariaIVA: v.enum(formaAfectacionTributariaIVA),
  proporcionGravadaIva: v.number(),
  tasaIva: v.number()
}) satisfies v.GenericSchema<IvaItemInput>;

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

export const itemOperacionSchema = v.object({
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
}) satisfies v.GenericSchema<ItemOperacion_FE_Input>;

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

export const usoComercialSchema = v.object({
  sectorEnergiaElectrica: v.optional(sectorEnergiaElectricaSchema),
  sectorSeguros: v.optional(sectorSegurosSchema),
  sectorSupermercados: v.optional(sectorSupermercadosSchema),
  datosAdicionalesUsoComercial: v.optional(datosAdicionalesUsoComercialSchema)
}) satisfies v.GenericSchema<UsoComercialInput>;

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
  tipoDocumentoIdentidadTransportista: v.optional(v.enum(tipoDocumentoTransportista)),
  numeroDocumentoIdentidadTransportista: v.optional(v.string()),
  nacionalidadTransportista: v.optional(v.string()),
  numeroDocumentoIdentidadChofer: v.string(),
  nombreChofer: v.string(),
  domicilioFiscalTransportista: v.string(),
  direccionChofer: v.string(),
  nombreAgente: v.optional(v.string()),
  rucAgente: v.optional(v.string()),
  direccionAgente: v.optional(v.string())
});

export const transporteSchema = v.object({
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
}) satisfies v.GenericSchema<TransporteInput>;
