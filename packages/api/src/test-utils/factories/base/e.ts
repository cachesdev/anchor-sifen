import { faker } from '@faker-js/faker';
import {
  indicadorPresencia,
  tipoPago,
  denominacionTarjeta,
  formaProcesamientoPago,
  condicionOperacionCredito,
  unidadMedida,
  formaAfectacionTributariaIVA,
  modalidadTransporte,
  responsableCostoFlete,
  tipoIdentificacionVehiculo,
  naturalezaTransportista,
  condicionOperacionEnum
} from '../../../sifen/types/enums';
import { codigoMoneda } from '../../../gen/monedas';
import { codigoPais } from '../../../gen/paises';
import { codigoCiudad } from '../../../gen/ciudades';
import { codigoDepartamento } from '../../../gen/departamentos';
import type {
  CamposFacturaElectronica,
  ComprasPublicas,
  CondicionOperacion,
  PagoContadoEntregaInicial,
  PagoTarjetaCreditoDebito,
  PagoCheque,
  PagoCredito,
  Cuota,
  ItemOperacion,
  ValorItem,
  ValorRestaItem,
  IvaItem,
  RastreoMercaderia,
  DetalleVehiculoNuevo,
  Transporte,
  LocalSalidaMercaderias,
  LocalEntregaMercaderias,
  VehiculoTrasladoMercaderias,
  Transportista,
  UsoComercial,
  SectorEnergiaElectrica,
  SectorSeguros,
  PolizaSeguros,
  SectorSupermercados,
  DatosAdicionalesUsoComercial
} from '../../../sifen/types/clean';
import { pickEnum, pickFrom, many, money } from '../helpers';

export function createComprasPublicas(
  overrides?: Partial<ComprasPublicas>
): ComprasPublicas {
  return {
    modalidadContratacion: faker.string.alphanumeric(6).toUpperCase(),
    entidadContratacion: faker.number.int({ min: 1, max: 99 }),
    anoContratacion: faker.number.int({ min: 2020, max: 2026 }),
    secuenciaContratacion: faker.number.int({ min: 1, max: 999999 }),
    fechaEmisionCodigoContratacion: faker.date.recent({ days: 30 }),
    ...overrides
  };
}

export function createCamposFacturaElectronica(
  overrides?: Partial<CamposFacturaElectronica>
): CamposFacturaElectronica {
  return {
    indicadorPresencia: pickEnum(indicadorPresencia),
    fechaFuturaTrasladoMercaderia: undefined,
    comprasPublicas: undefined,
    ...overrides
  };
}

export function createPagoTarjetaCreditoDebito(
  overrides?: Partial<PagoTarjetaCreditoDebito>
): PagoTarjetaCreditoDebito {
  return {
    denominacionTarjeta: pickEnum(denominacionTarjeta),
    razonSocialProcesadoraTarjeta: undefined,
    rucProcesadoraTarjeta: undefined,
    digitoVerificadorProcesadoraTarjeta: undefined,
    formaProcesamientoPago: pickEnum(formaProcesamientoPago),
    codigoAutorizacionOperacion: undefined,
    nombreTitularTarjeta: undefined,
    numeroTarjeta: undefined,
    ...overrides
  };
}

export function createPagoCheque(overrides?: Partial<PagoCheque>): PagoCheque {
  return {
    numeroCheque: faker.string.numeric(8),
    bancoEmisor: faker.company.name(),
    ...overrides
  };
}

export function createPagoContadoEntregaInicial(
  overrides?: Partial<PagoContadoEntregaInicial>
): PagoContadoEntregaInicial {
  const tipo = overrides?.tipoPago ?? pickEnum(tipoPago);
  return {
    tipoPago: tipo,
    montoTipoPago: money(
      faker.number.float({ min: 10000, max: 10000000, multipleOf: 0.01 })
    ),
    monedaTipoPago: pickFrom(codigoMoneda),
    tipoCambioTipoPago: undefined,
    pagoTarjetaCreditoDebito:
      tipo === 3 || tipo === 4 ? createPagoTarjetaCreditoDebito() : undefined,
    pagoCheque: tipo === 2 ? createPagoCheque() : undefined,
    ...overrides
  };
}

export function createCuota(overrides?: Partial<Cuota>): Cuota {
  return {
    monedaCuota: pickFrom(codigoMoneda),
    montoCuota: money(
      faker.number.float({ min: 50000, max: 5000000, multipleOf: 0.01 })
    ),
    vencimientoCuota: undefined,
    ...overrides
  };
}

export function createPagoCredito(overrides?: Partial<PagoCredito>): PagoCredito {
  const tipo = overrides?.condicionOperacionCredito ?? pickEnum(condicionOperacionCredito);
  return {
    condicionOperacionCredito: tipo,
    plazoCredito:
      tipo === 1 ? faker.helpers.arrayElement(['30 días', '60 días', '90 días']) : undefined,
    cantidadCuotas: tipo === 2 ? faker.number.int({ min: 3, max: 24 }) : undefined,
    montoEntregaInicial: money(
      faker.number.float({ min: 0, max: 5000000, multipleOf: 0.01 })
    ),
    cuotas:
      tipo === 2 ? many(() => createCuota(), faker.number.int({ min: 2, max: 6 })) : undefined,
    ...overrides
  };
}

export function createCondicionOperacion(
  overrides?: Partial<CondicionOperacion>
): CondicionOperacion {
  const cond = overrides?.condicionOperacion ?? pickEnum(condicionOperacionEnum);
  return {
    condicionOperacion: cond,
    pagoContadoEntregaInicial:
      cond === condicionOperacionEnum.Contado
        ? many(() => createPagoContadoEntregaInicial(), 1)
        : undefined,
    pagoCredito:
      cond === condicionOperacionEnum.Credito ? createPagoCredito() : undefined,
    ...overrides
  };
}

export function createRastreoMercaderia(
  overrides?: Partial<RastreoMercaderia>
): RastreoMercaderia {
  return {
    numeroLote: undefined,
    fechaVencimientoMercaderia: undefined,
    numeroSerie: undefined,
    numeroPedido: undefined,
    numeroSeguimientoEnvio: undefined,
    numeroRegistroProductoSenave: undefined,
    numeroRegistroEntidadComercialSenave: undefined,
    nombreProducto: faker.commerce.productName(),
    ...overrides
  };
}

export function createDetalleVehiculoNuevo(
  overrides?: Partial<DetalleVehiculoNuevo>
): DetalleVehiculoNuevo {
  return {
    tipoOperacionVentaVehiculos: undefined,
    chasisVehiculo: undefined,
    colorVehiculo: undefined,
    potenciaMotor: undefined,
    capacidadMotor: undefined,
    pesoNeto: money(faker.number.float({ min: 0.8, max: 3.5, multipleOf: 0.01 })),
    pesoBruto: money(faker.number.float({ min: 1.0, max: 5.0, multipleOf: 0.01 })),
    tipoCombustible: undefined,
    numeroMotor: undefined,
    capacidadMaximaTraccion: money(
      faker.number.float({ min: 0.5, max: 10, multipleOf: 0.1 })
    ),
    anoFabricacion: undefined,
    tipoVehiculo: undefined,
    capacidadMaximaPasajeros: undefined,
    cilindradasMotor: undefined,
    ...overrides
  };
}

export function createValorRestaItem(
  overrides?: Partial<ValorRestaItem>
): ValorRestaItem {
  return {
    descuentoParticularItem: money(0),
    porcentajeDescuentoItem: money(0),
    descuentoGlobalItem: money(0),
    anticipoParticularItem: money(0),
    anticipoGlobalItem: money(0),
    valorTotalOperacionItem: money(
      faker.number.float({ min: 1000, max: 50000000, multipleOf: 0.01 })
    ),
    valorTotalOperacionItemGs: money(
      faker.number.float({ min: 1000, max: 50000000, multipleOf: 0.01 })
    ),
    ...overrides
  };
}

export function createValorItem(overrides?: Partial<ValorItem>): ValorItem {
  return {
    precioUnitario: money(
      faker.number.float({ min: 1000, max: 5000000, multipleOf: 0.01 })
    ),
    tipoCambioItem: undefined,
    totalBrutoOperacionItem: money(
      faker.number.float({ min: 1000, max: 50000000, multipleOf: 0.01 })
    ),
    valorRestaItem: createValorRestaItem(),
    ...overrides
  };
}

export function createIvaItem(overrides?: Partial<IvaItem>): IvaItem {
  return {
    formaAfectacionTributariaIVA: faker.helpers.arrayElement([
      formaAfectacionTributariaIVA.Gravado,
      formaAfectacionTributariaIVA.Exento
    ]),
    proporcionGravadaIva: money(100),
    tasaIva: 10,
    baseGravadaIvaItem: money(
      faker.number.float({ min: 1000, max: 5000000, multipleOf: 0.01 })
    ),
    liquidacionIvaItem: money(
      faker.number.float({ min: 50, max: 500000, multipleOf: 0.01 })
    ),
    baseExenta: money(0),
    ...overrides
  };
}

export function createItemOperacion(overrides?: Partial<ItemOperacion>): ItemOperacion {
  return {
    codigoInterno: faker.string.alphanumeric({ length: { min: 4, max: 15 } }).toUpperCase(),
    partidaArancelaria: undefined,
    ncm: undefined,
    codigoDncpGeneral: undefined,
    codigoDncpEspecifico: undefined,
    codigoGtinProducto: undefined,
    codigoGtinPaquete: undefined,
    descripcionProductoServicio: faker.commerce.productName(),
    unidadMedida: pickEnum(unidadMedida),
    cantidadProductoServicio: money(
      faker.number.float({ min: 1, max: 100, multipleOf: 0.0001 })
    ),
    paisOrigen: codigoPais.Paraguay,
    informacionItem: undefined,
    codigoDatosRelevanciaMercaderias: undefined,
    cantidadQuiebraMerma: undefined,
    porcentajeQuiebraMerma: undefined,
    cdcAnticipo: undefined,
    valorItem: createValorItem(),
    ivaItem: createIvaItem(),
    rastreoMercaderia: undefined,
    vehiculoNuevo: undefined,
    ...overrides
  };
}

export function createLocalSalidaMercaderias(
  overrides?: Partial<LocalSalidaMercaderias>
): LocalSalidaMercaderias {
  return {
    direccionLocalSalida: faker.location.streetAddress(),
    numeroCasaSalida: faker.number.int({ min: 1, max: 5000 }),
    complementoDireccion1Salida: undefined,
    complementoDireccion2Salida: undefined,
    departamentoSalida: undefined,
    distritoSalida: undefined,
    ciudadSalida: undefined,
    telefonoLocalSalida: undefined,
    ...overrides
  };
}

export function createLocalEntregaMercaderias(
  overrides?: Partial<LocalEntregaMercaderias>
): LocalEntregaMercaderias {
  return {
    direccionLocalEntrega: faker.location.streetAddress(),
    numeroCasaEntrega: faker.number.int({ min: 1, max: 5000 }),
    complementoDireccion1Entrega: undefined,
    complementoDireccion2Entrega: undefined,
    departamentoEntrega: pickFrom(codigoDepartamento),
    distritoEntrega: undefined,
    ciudadEntrega: pickFrom(codigoCiudad),
    telefonoLocalEntrega: undefined,
    ...overrides
  };
}

export function createVehiculoTrasladoMercaderias(
  overrides?: Partial<VehiculoTrasladoMercaderias>
): VehiculoTrasladoMercaderias {
  return {
    tipoVehiculo: faker.vehicle.type(),
    marcaVehiculo: faker.vehicle.manufacturer(),
    tipoIdentificacionVehiculo: pickEnum(tipoIdentificacionVehiculo),
    numeroIdentificacionVehiculo: undefined,
    datosAdicionalesVehiculo: undefined,
    numeroMatriculaVehiculo: undefined,
    numeroVuelo: undefined,
    ...overrides
  };
}

export function createTransportista(overrides?: Partial<Transportista>): Transportista {
  return {
    naturalezaTransportista: pickEnum(naturalezaTransportista),
    nombreTransportista: faker.company.name(),
    rucTransportista: undefined,
    digitoVerificadorRucTransportista: undefined,
    tipoDocumentoIdentidadTransportista: undefined,
    numeroDocumentoIdentidadTransportista: undefined,
    nacionalidadTransportista: undefined,
    numeroDocumentoIdentidadChofer: faker.string.numeric({ length: { min: 6, max: 10 } }),
    nombreChofer: faker.person.fullName(),
    domicilioFiscalTransportista: faker.location.streetAddress(),
    direccionChofer: faker.location.streetAddress(),
    nombreAgente: undefined,
    rucAgente: undefined,
    digitoVerificadorRucAgente: undefined,
    direccionAgente: undefined,
    ...overrides
  };
}

export function createTransporte(overrides?: Partial<Transporte>): Transporte {
  return {
    tipoTransporte: undefined,
    modalidadTransporte: pickEnum(modalidadTransporte),
    responsableCostoFlete: pickEnum(responsableCostoFlete),
    condicionNegociacion: undefined,
    numeroManifiestoCarga: undefined,
    numeroDespachoImportacion: undefined,
    inicioEstimadoTraslado: undefined,
    finEstimadoTraslado: undefined,
    paisDestino: undefined,
    localSalidaMercaderias: undefined,
    localesEntregaMercaderias: [],
    vehiculosTrasladoMercaderias: [],
    transportista: undefined,
    ...overrides
  };
}

export function createSectorEnergiaElectrica(
  overrides?: Partial<SectorEnergiaElectrica>
): SectorEnergiaElectrica {
  return {
    numeroMedidor: undefined,
    codigoActividad: undefined,
    codigoCategoria: undefined,
    lecturaAnterior: money(0),
    lecturaActual: money(0),
    consumoKwh: money(0),
    ...overrides
  };
}

export function createPolizaSeguros(overrides?: Partial<PolizaSeguros>): PolizaSeguros {
  return {
    codigoPoliza: faker.string.alphanumeric(10).toUpperCase(),
    unidadVigencia: faker.helpers.arrayElement(['día', 'mes', 'año']),
    vigenciaPoliza: money(1),
    numeroPoliza: faker.string.numeric(10),
    fechaInicioVigencia: undefined,
    fechaFinVigencia: undefined,
    codigoInternoItem: undefined,
    ...overrides
  };
}

export function createSectorSeguros(overrides?: Partial<SectorSeguros>): SectorSeguros {
  return {
    codigoEmpresaSeguros: undefined,
    polizaSeguros: many(() => createPolizaSeguros(), 1),
    ...overrides
  };
}

export function createSectorSupermercados(
  overrides?: Partial<SectorSupermercados>
): SectorSupermercados {
  return {
    nombreCajero: undefined,
    efectivo: money(0),
    vuelto: money(0),
    montoDonacion: money(0),
    descripcionDonacion: undefined,
    ...overrides
  };
}

export function createDatosAdicionalesUsoComercial(
  overrides?: Partial<DatosAdicionalesUsoComercial>
): DatosAdicionalesUsoComercial {
  return {
    ciclo: undefined,
    fechaInicioCiclo: undefined,
    fechaFinCiclo: undefined,
    vencimientoPago: [],
    numeroContrato: undefined,
    saldoAnterior: money(0),
    codigoContratacionDNCP: undefined,
    ...overrides
  };
}

export function createUsoComercial(overrides?: Partial<UsoComercial>): UsoComercial {
  return {
    sectorEnergiaElectrica: undefined,
    sectorSeguros: undefined,
    sectorSupermercados: undefined,
    datosAdicionalesUsoComercial: undefined,
    ...overrides
  };
}
