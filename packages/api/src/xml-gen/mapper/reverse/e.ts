import type {
  AutofacturaElectronica,
  CamposFacturaElectronica,
  ComprasPublicas,
  CondicionOperacion,
  Cuota,
  DatosAdicionalesUsoComercial,
  DetalleVehiculoNuevo,
  IvaItem,
  ItemOperacion,
  LocalEntregaMercaderias,
  LocalSalidaMercaderias,
  NotaCreditoDebitoElectronica,
  NotaRemisionElectronica,
  PagoCheque,
  PagoContadoEntregaInicial,
  PagoCredito,
  PagoTarjetaCreditoDebito,
  PolizaSeguros,
  RastreoMercaderia,
  SectorEnergiaElectrica,
  SectorSeguros,
  SectorSupermercados,
  Transporte,
  Transportista,
  UsoComercial,
  ValorItem,
  ValorRestaItem,
  VehiculoTrasladoMercaderias
} from '../../../sifen/types/clean/e';
import type {
  GCamAE,
  GCamCond,
  GCamEnt,
  GCamEsp,
  GCamFE,
  GCamIVA,
  GCamItem,
  GCamNCDE,
  GCamNRE,
  GCamSal,
  GCamTrans,
  GCompPub,
  GCuotas,
  GGrupAdi,
  GGrupEner,
  GGrupPolSeg,
  GGrupSeg,
  GGrupSup,
  GPagCheq,
  GPagCred,
  GPagTarCD,
  GPaConEIni,
  GRasMerc,
  GTransp,
  GValorItem,
  GValorRestaItem,
  GVehNuevo,
  GVehTras
} from '../../../sifen/types/raw/e';
import {
  optionalMapper,
  parseBig,
  parseOptionalBig,
  parseOptionalRawDate,
  requireValue
} from './helpers';

export function mapGCamFEToClean(data: GCamFE): CamposFacturaElectronica {
  return {
    indicadorPresencia: data.iIndPres,
    fechaFuturaTrasladoMercaderia: parseOptionalRawDate(data.dFecEmNR, 'date', 'dFecEmNR'),
    comprasPublicas: optionalMapper(mapGCompPubToClean, data.gCompPub)
  };
}

export function mapGCompPubToClean(data: GCompPub): ComprasPublicas {
  return {
    modalidadContratacion: data.dModCont,
    entidadContratacion: data.dEntCont,
    anoContratacion: data.dAnoCont,
    secuenciaContratacion: data.dSecCont,
    fechaEmisionCodigoContratacion: parseOptionalRawDate(data.dFeCodCont, 'date', 'dFeCodCont')!
  };
}

export function mapGCamAEToClean(data: GCamAE): AutofacturaElectronica {
  return {
    naturalezaVendedor: data.iNatVen,
    tipoDocumentoIdentidadVendedor: data.iTipIDVen,
    numeroDocumentoIdentidadVendedor: data.dNumIDVen,
    nombreVendedor: data.dNomVen,
    direccionVendedor: data.dDirVen,
    numeroCasaVendedor: data.dNumCasVen,
    departamentoVendedor: data.cDepVen,
    distritoVendedor: data.cDisVen,
    ciudadVendedor: data.cCiuVen,
    lugarTransaccion: data.dDirProv,
    departamentoTransaccion: data.cDepProv,
    distritoTransaccion: data.cDisProv,
    ciudadTransaccion: data.cCiuProv
  };
}

export function mapGCamNCDEToClean(data: GCamNCDE): NotaCreditoDebitoElectronica {
  return {
    motivoEmision: data.iMotEmi
  };
}

export function mapGCamNREToClean(data: GCamNRE): NotaRemisionElectronica {
  return {
    motivoEmisionNotaRemision: data.iMotEmiNR,
    responsableEmisionNotaRemision: data.iRespEmiNR,
    kilometrosEstimadosRecorrido: data.dKmR,
    fechaFuturaEmision: parseOptionalRawDate(data.dFecEm, 'date', 'dFecEm'),
    precioFlete: data.cPreFle
  };
}

export function mapGCamCondToClean(data: GCamCond): CondicionOperacion {
  return {
    condicionOperacion: data.iCondOpe,
    pagoContadoEntregaInicial: data.gPaConEIni?.map(mapGPaConEIniToClean),
    pagoCredito: optionalMapper(mapGPagCredToClean, data.gPagCred)
  };
}

export function mapGPaConEIniToClean(data: GPaConEIni): PagoContadoEntregaInicial {
  return {
    tipoPago: data.iTiPago,
    montoTipoPago: parseBig(data.dMonTiPag, 'dMonTiPag'),
    monedaTipoPago: data.cMoneTiPag,
    tipoCambioTipoPago: parseOptionalBig(data.dTiCamTiPag, 'dTiCamTiPag'),
    pagoTarjetaCreditoDebito: optionalMapper(mapGPagTarCDToClean, data.gPagTarCD),
    pagoCheque: optionalMapper(mapGPagCheqToClean, data.gPagCheq)
  };
}

export function mapGPagTarCDToClean(data: GPagTarCD): PagoTarjetaCreditoDebito {
  return {
    denominacionTarjeta: data.iDenTarj,
    razonSocialProcesadoraTarjeta: data.dRSProTar,
    rucProcesadoraTarjeta: data.dRUCProTar,
    digitoVerificadorProcesadoraTarjeta: data.dDVProTar,
    formaProcesamientoPago: data.iForProPa,
    codigoAutorizacionOperacion: data.dCodAuOpe,
    nombreTitularTarjeta: data.dNomTit,
    numeroTarjeta: data.dNumTarj
  };
}

export function mapGPagCheqToClean(data: GPagCheq): PagoCheque {
  return {
    numeroCheque: data.dNumCheq,
    bancoEmisor: data.dBcoEmi
  };
}

export function mapGPagCredToClean(data: GPagCred): PagoCredito {
  return {
    condicionOperacionCredito: data.iCondCred,
    plazoCredito: data.dPlazoCre,
    cantidadCuotas: data.dCuotas,
    montoEntregaInicial: parseOptionalBig(data.dMonEnt, 'dMonEnt'),
    cuotas: data.gCuotas?.map(mapGCuotasToClean)
  };
}

export function mapGCuotasToClean(data: GCuotas): Cuota {
  return {
    monedaCuota: data.cMoneCuo,
    montoCuota: parseBig(data.dMonCuota, 'dMonCuota'),
    vencimientoCuota: parseOptionalRawDate(data.dVencCuo, 'date', 'dVencCuo')
  };
}

export function mapGCamItemToClean(data: GCamItem): ItemOperacion {
  return {
    codigoInterno: data.dCodInt,
    partidaArancelaria: data.dParAranc,
    ncm: data.dNCM,
    codigoDncpGeneral: data.dDncpG,
    codigoDncpEspecifico: data.dDncpE,
    codigoGtinProducto: data.dGtin,
    codigoGtinPaquete: data.dGtinPq,
    descripcionProductoServicio: data.dDesProSer,
    unidadMedida: data.cUniMed,
    cantidadProductoServicio: parseBig(data.dCantProSer, 'dCantProSer'),
    paisOrigen: data.cPaisOrig,
    informacionItem: data.dInfItem,
    codigoDatosRelevanciaMercaderias: data.cRelMerc,
    cantidadQuiebraMerma: parseOptionalBig(data.dCanQuiMer, 'dCanQuiMer'),
    porcentajeQuiebraMerma: parseOptionalBig(data.dPorQuiMer, 'dPorQuiMer'),
    cdcAnticipo: data.dCDCAnticipo,
    valorItem: optionalMapper(mapGValorItemToClean, data.gValorItem),
    ivaItem: optionalMapper(mapGCamIVAToClean, data.gCamIVA),
    rastreoMercaderia: optionalMapper(mapGRasMercToClean, data.gRasMerc),
    vehiculoNuevo: optionalMapper(mapGVehNuevoToClean, data.gVehNuevo)
  };
}

export function mapGValorItemToClean(data: GValorItem): ValorItem {
  return {
    precioUnitario: parseBig(data.dPUniProSer, 'dPUniProSer'),
    tipoCambioItem: parseOptionalBig(data.dTiCamIt, 'dTiCamIt'),
    totalBrutoOperacionItem: parseBig(data.dTotBruOpeItem, 'dTotBruOpeItem'),
    valorRestaItem: mapGValorRestaItemToClean(data.gValorRestaItem)
  };
}

export function mapGValorRestaItemToClean(data: GValorRestaItem): ValorRestaItem {
  return {
    descuentoParticularItem: parseOptionalBig(data.dDescItem, 'dDescItem'),
    porcentajeDescuentoItem: parseOptionalBig(data.dPorcDesIt, 'dPorcDesIt'),
    descuentoGlobalItem: parseOptionalBig(data.dDescGloItem, 'dDescGloItem'),
    anticipoParticularItem: parseOptionalBig(data.dAntPreUniIt, 'dAntPreUniIt'),
    anticipoGlobalItem: parseOptionalBig(data.dAntGloPreUniIt, 'dAntGloPreUniIt'),
    valorTotalOperacionItem: parseBig(data.dTotOpeItem, 'dTotOpeItem'),
    valorTotalOperacionItemGs: parseOptionalBig(data.dTotOpeGs, 'dTotOpeGs')
  };
}

export function mapGCamIVAToClean(data: GCamIVA): IvaItem {
  return {
    formaAfectacionTributariaIVA: data.iAfecIVA,
    proporcionGravadaIva: parseBig(data.dPropIVA, 'dPropIVA'),
    tasaIva: data.dTasaIVA,
    baseGravadaIvaItem: parseBig(data.dBasGravIVA, 'dBasGravIVA'),
    liquidacionIvaItem: parseBig(data.dLiqIVAItem, 'dLiqIVAItem'),
    baseExenta: parseBig(data.dBasExe, 'dBasExe')
  };
}

export function mapGRasMercToClean(data: GRasMerc): RastreoMercaderia {
  return {
    numeroLote: data.dNumLote,
    fechaVencimientoMercaderia: parseOptionalRawDate(data.dVencMerc, 'date', 'dVencMerc'),
    numeroSerie: data.dNSerie,
    numeroPedido: data.dNumPedi,
    numeroSeguimientoEnvio: data.dNumSegui,
    numeroRegistroProductoSenave: data.dNumReg,
    numeroRegistroEntidadComercialSenave: data.dNumRegEntCom,
    nombreProducto: requireValue(data.dNomPro, 'dNomPro')
  };
}

export function mapGVehNuevoToClean(data: GVehNuevo): DetalleVehiculoNuevo {
  return {
    tipoOperacionVentaVehiculos: data.iTipOpVN,
    chasisVehiculo: data.dChasis,
    colorVehiculo: data.dColor,
    potenciaMotor: data.dPotencia,
    capacidadMotor: data.dCapMot,
    pesoNeto: parseOptionalBig(data.dPNet, 'dPNet'),
    pesoBruto: parseOptionalBig(data.dPBruto, 'dPBruto'),
    tipoCombustible: data.iTipCom,
    numeroMotor: data.dNroMotor,
    capacidadMaximaTraccion: parseOptionalBig(data.dCapTracc, 'dCapTracc'),
    anoFabricacion: data.dAnoFab,
    tipoVehiculo: data.cTipVeh,
    capacidadMaximaPasajeros: data.dCapac,
    cilindradasMotor: data.dCilin
  };
}

export function mapGCamEspToClean(data: GCamEsp): UsoComercial {
  return {
    sectorEnergiaElectrica: optionalMapper(mapGGrupEnerToClean, data.gGrupEner),
    sectorSeguros: optionalMapper(mapGGrupSegToClean, data.gGrupSeg),
    sectorSupermercados: optionalMapper(mapGGrupSupToClean, data.gGrupSup),
    datosAdicionalesUsoComercial: optionalMapper(mapGGrupAdiToClean, data.gGrupAdi)
  };
}

export function mapGGrupEnerToClean(data: GGrupEner): SectorEnergiaElectrica {
  return {
    numeroMedidor: data.dNroMed,
    codigoActividad: data.dActiv,
    codigoCategoria: data.dCateg,
    lecturaAnterior: parseOptionalBig(data.dLecAnt, 'dLecAnt'),
    lecturaActual: parseOptionalBig(data.dLecAct, 'dLecAct'),
    consumoKwh: parseOptionalBig(data.dConKwh, 'dConKwh')
  };
}

export function mapGGrupSegToClean(data: GGrupSeg): SectorSeguros {
  return {
    codigoEmpresaSeguros: data.dCodEmpSeg,
    polizaSeguros: data.gGrupPolSeg?.map(mapGGrupPolSegToClean)
  };
}

export function mapGGrupPolSegToClean(data: GGrupPolSeg): PolizaSeguros {
  return {
    codigoPoliza: data.dPoliza,
    unidadVigencia: data.dUnidVig,
    vigenciaPoliza: parseBig(data.dVigencia, 'dVigencia'),
    numeroPoliza: data.dNumPoliza,
    fechaInicioVigencia: parseOptionalRawDate(data.dFecIniVig, 'date-time', 'dFecIniVig'),
    fechaFinVigencia: parseOptionalRawDate(data.dFecFinVig, 'date-time', 'dFecFinVig'),
    codigoInternoItem: data.dCodInt
  };
}

export function mapGGrupSupToClean(data: GGrupSup): SectorSupermercados {
  return {
    nombreCajero: data.dNomCaj,
    efectivo: parseOptionalBig(data.dEfectivo, 'dEfectivo'),
    vuelto: parseOptionalBig(data.dVuelto, 'dVuelto'),
    montoDonacion: parseOptionalBig(data.dDonac, 'dDonac'),
    descripcionDonacion: data.dDesDonac
  };
}

export function mapGGrupAdiToClean(data: GGrupAdi): DatosAdicionalesUsoComercial {
  return {
    ciclo: data.dCiclo,
    fechaInicioCiclo: parseOptionalRawDate(data.dFecIniC, 'date', 'dFecIniC'),
    fechaFinCiclo: parseOptionalRawDate(data.dFecFinC, 'date', 'dFecFinC'),
    vencimientoPago: data.dVencPag?.map((date) => parseOptionalRawDate(date, 'date', 'dVencPag')!),
    numeroContrato: data.dContrato,
    saldoAnterior: parseOptionalBig(data.dSalAnt, 'dSalAnt'),
    codigoContratacionDNCP: data.dCodConDncp
  };
}

export function mapGTranspToClean(data: GTransp): Transporte {
  return {
    tipoTransporte: data.iTipTrans,
    modalidadTransporte: data.iModTrans,
    responsableCostoFlete: data.iRespFlete,
    condicionNegociacion: data.cCondNeg,
    numeroManifiestoCarga: data.dNuManif,
    numeroDespachoImportacion: data.dNuDespImp,
    inicioEstimadoTraslado: parseOptionalRawDate(data.dIniTras, 'date', 'dIniTras'),
    finEstimadoTraslado: parseOptionalRawDate(data.dFinTras, 'date', 'dFinTras'),
    paisDestino: data.cPaisDest,
    localSalidaMercaderias: optionalMapper(mapGCamSalToClean, data.gCamSal),
    localesEntregaMercaderias: data.gCamEnt?.map(mapGCamEntToClean),
    vehiculosTrasladoMercaderias: data.gVehTras?.map(mapGVehTrasToClean),
    transportista: optionalMapper(mapGCamTransToClean, data.gCamTrans)
  };
}

export function mapGCamSalToClean(data: GCamSal): LocalSalidaMercaderias {
  return {
    direccionLocalSalida: data.dDirLocSal,
    numeroCasaSalida: data.dNumCasSal,
    complementoDireccion1Salida: data.dComp1Sal,
    complementoDireccion2Salida: data.dComp2Sal,
    departamentoSalida: data.cDepSal,
    distritoSalida: data.cDisSal,
    ciudadSalida: data.cCiuSal,
    telefonoLocalSalida: data.dTelSal
  };
}

export function mapGCamEntToClean(data: GCamEnt): LocalEntregaMercaderias {
  return {
    direccionLocalEntrega: data.dDirLocEnt,
    numeroCasaEntrega: data.dNumCasEnt,
    complementoDireccion1Entrega: data.dComp1Ent,
    complementoDireccion2Entrega: data.dComp2Ent,
    departamentoEntrega: data.cDepEnt,
    distritoEntrega: data.cDisEnt,
    ciudadEntrega: data.cCiuEnt,
    telefonoLocalEntrega: data.dTelEnt
  };
}

export function mapGVehTrasToClean(data: GVehTras): VehiculoTrasladoMercaderias {
  return {
    tipoVehiculo: data.dTiVehTras,
    marcaVehiculo: data.dMarVeh,
    tipoIdentificacionVehiculo: data.dTipIdenVeh,
    numeroIdentificacionVehiculo: data.dNroIDVeh,
    datosAdicionalesVehiculo: data.dAdicVeh,
    numeroMatriculaVehiculo: data.dNroMatVeh,
    numeroVuelo: data.dNroVuelo
  };
}

export function mapGCamTransToClean(data: GCamTrans): Transportista {
  return {
    naturalezaTransportista: data.iNatTrans,
    nombreTransportista: data.dNomTrans,
    rucTransportista: data.dRucTrans,
    digitoVerificadorRucTransportista: data.dDVTrans,
    tipoDocumentoIdentidadTransportista: data.iTipIDTrans,
    numeroDocumentoIdentidadTransportista: data.dNumIDTrans,
    nacionalidadTransportista: data.cNacTrans,
    numeroDocumentoIdentidadChofer: data.dNumIDChof,
    nombreChofer: data.dNomChof,
    domicilioFiscalTransportista: data.dDomFisc,
    direccionChofer: data.dDirChof,
    nombreAgente: data.dNombAg,
    rucAgente: data.dRucAg,
    digitoVerificadorRucAgente: data.dDVAg,
    direccionAgente: data.dDirAge
  };
}
