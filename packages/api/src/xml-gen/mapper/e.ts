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
} from '../../sifen/types/clean/e';
import {
  descripcionCodigoDatosRelevanciaMercaderias,
  descripcionCondicionOperacion,
  descripcionCondicionOperacionCredito,
  descripcionDenominacionTarjeta,
  descripcionFormaAfectacionTributariaIVA,
  descripcionIndicadorPresencia,
  descripcionModalidadTransporte,
  descripcionMotivoEmision,
  descripcionMotivoEmisionNotaRemision,
  descripcionNaturalezaVendedor,
  descripcionResponsableEmisionNotaRemision,
  descripcionTipoCombustible,
  descripcionTipoDocumentoTransportista,
  descripcionTipoDocumentoVendedor,
  descripcionTipoOperacionVentaVehiculos,
  descripcionTipoPago,
  descripcionTipoTransporte,
  descripcionUnidadMedida
} from '../../sifen/types/enums';
import type {
  GCamAE,
  GCamCond,
  GCamEnt,
  GCamFE,
  GCamIVA,
  GCamItem,
  GCamNCDE,
  GCamNRE,
  GCamSal,
  GCamTrans,
  GCamEsp,
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
} from '../../sifen/types/raw/e';
import {
  formatDateOnly,
  formatDateTime,
  parseRuc,
  requireDefined,
  resolveCityDescription,
  resolveCountryDescription,
  resolveCurrencyDescription,
  resolveDepartmentDescription,
  resolveDistrictDescription,
  resolveOptionalDescription,
  resolveOptionalNumericDv,
  resolveOptionalStringDv,
  resolveRequiredDescription
} from './helpers';

function normalizeOptionalRuc(rawRuc?: string): string | undefined {
  if (!rawRuc) {
    return undefined;
  }

  return parseRuc(rawRuc).ruc;
}

export function mapCamposFacturaElectronicaToRaw(data: CamposFacturaElectronica): GCamFE {
  return {
    iIndPres: data.indicadorPresencia,
    dDesIndPres: resolveRequiredDescription(
      'indicadorPresencia',
      data.indicadorPresencia,
      descripcionIndicadorPresencia as Record<string, string>
    ),
    dFecEmNR: formatDateOnly(data.fechaFuturaTrasladoMercaderia),
    gCompPub: data.comprasPublicas ? mapComprasPublicasToRaw(data.comprasPublicas) : undefined
  } as GCamFE;
}

export function mapComprasPublicasToRaw(data: ComprasPublicas): GCompPub {
  return {
    dModCont: data.modalidadContratacion,
    dEntCont: data.entidadContratacion,
    dAnoCont: data.anoContratacion,
    dSecCont: data.secuenciaContratacion,
    dFeCodCont: requireDefined(
      formatDateOnly(data.fechaEmisionCodigoContratacion),
      'fechaEmisionCodigoContratacion'
    )
  } as GCompPub;
}

export function mapAutofacturaElectronicaToRaw(data: AutofacturaElectronica): GCamAE {
  return {
    iNatVen: data.naturalezaVendedor,
    dDesNatVen: resolveRequiredDescription(
      'naturalezaVendedor',
      data.naturalezaVendedor,
      descripcionNaturalezaVendedor as Record<string, string>
    ),
    iTipIDVen: data.tipoDocumentoIdentidadVendedor,
    dDTipIDVen: resolveRequiredDescription(
      'tipoDocumentoIdentidadVendedor',
      data.tipoDocumentoIdentidadVendedor,
      descripcionTipoDocumentoVendedor as Record<string, string>
    ),
    dNumIDVen: data.numeroDocumentoIdentidadVendedor,
    dNomVen: data.nombreVendedor,
    dDirVen: data.direccionVendedor,
    dNumCasVen: data.numeroCasaVendedor,
    cDepVen: data.departamentoVendedor,
    dDesDepVen: resolveDepartmentDescription(data.departamentoVendedor),
    cDisVen: data.distritoVendedor,
    dDesDisVen: resolveDistrictDescription(data.distritoVendedor),
    cCiuVen: data.ciudadVendedor,
    dDesCiuVen: requireDefined(resolveCityDescription(data.ciudadVendedor), 'ciudadVendedor'),
    dDirProv: data.lugarTransaccion,
    cDepProv: data.departamentoTransaccion,
    dDesDepProv: resolveDepartmentDescription(data.departamentoTransaccion),
    cDisProv: data.distritoTransaccion,
    dDesDisProv: resolveDistrictDescription(data.distritoTransaccion),
    cCiuProv: data.ciudadTransaccion,
    dDesCiuProv: requireDefined(resolveCityDescription(data.ciudadTransaccion), 'ciudadTransaccion')
  } as GCamAE;
}

export function mapNotaCreditoDebitoElectronicaToRaw(data: NotaCreditoDebitoElectronica): GCamNCDE {
  return {
    iMotEmi: data.motivoEmision,
    dDesMotEmi: resolveRequiredDescription(
      'motivoEmision',
      data.motivoEmision,
      descripcionMotivoEmision as Record<string, string>
    )
  } as GCamNCDE;
}

export function mapNotaRemisionElectronicaToRaw(data: NotaRemisionElectronica): GCamNRE {
  return {
    iMotEmiNR: data.motivoEmisionNotaRemision,
    dDesMotEmiNR: resolveRequiredDescription(
      'motivoEmisionNotaRemision',
      data.motivoEmisionNotaRemision,
      descripcionMotivoEmisionNotaRemision as Record<string, string>
    ),
    iRespEmiNR: data.responsableEmisionNotaRemision,
    dDesRespEmiNR: resolveRequiredDescription(
      'responsableEmisionNotaRemision',
      data.responsableEmisionNotaRemision,
      descripcionResponsableEmisionNotaRemision as Record<string, string>
    ),
    dKmR: data.kilometrosEstimadosRecorrido,
    dFecEm: formatDateOnly(data.fechaFuturaEmision),
    cPreFle: data.precioFlete
  } as GCamNRE;
}

export function mapCondicionOperacionToRaw(data: CondicionOperacion): GCamCond {
  return {
    iCondOpe: data.condicionOperacion,
    dDCondOpe: resolveRequiredDescription(
      'condicionOperacion',
      data.condicionOperacion,
      descripcionCondicionOperacion as Record<string, string>
    ),
    gPaConEIni: data.pagoContadoEntregaInicial?.map(mapPagoContadoEntregaInicialToRaw),
    gPagCred: data.pagoCredito ? mapPagoCreditoToRaw(data.pagoCredito) : undefined
  } as GCamCond;
}

export function mapPagoContadoEntregaInicialToRaw(data: PagoContadoEntregaInicial): GPaConEIni {
  return {
    iTiPago: data.tipoPago,
    dDesTiPag: resolveRequiredDescription(
      'tipoPago',
      data.tipoPago,
      descripcionTipoPago as Record<string, string>
    ),
    dMonTiPag: data.montoTipoPago,
    cMoneTiPag: data.monedaTipoPago,
    dDMoneTiPag: resolveCurrencyDescription(data.monedaTipoPago),
    dTiCamTiPag: data.tipoCambioTipoPago,
    gPagTarCD: data.pagoTarjetaCreditoDebito
      ? mapPagoTarjetaCreditoDebitoToRaw(data.pagoTarjetaCreditoDebito)
      : undefined,
    gPagCheq: data.pagoCheque ? mapPagoChequeToRaw(data.pagoCheque) : undefined
  } as GPaConEIni;
}

export function mapPagoTarjetaCreditoDebitoToRaw(data: PagoTarjetaCreditoDebito): GPagTarCD {
  return {
    iDenTarj: data.denominacionTarjeta,
    dDesDenTarj: resolveRequiredDescription(
      'denominacionTarjeta',
      data.denominacionTarjeta,
      descripcionDenominacionTarjeta as Record<string, string>
    ),
    dRSProTar: data.razonSocialProcesadoraTarjeta,
    dRUCProTar: normalizeOptionalRuc(data.rucProcesadoraTarjeta),
    dDVProTar: resolveOptionalNumericDv(
      data.digitoVerificadorProcesadoraTarjeta,
      data.rucProcesadoraTarjeta
    ),
    iForProPa: data.formaProcesamientoPago,
    dCodAuOpe: data.codigoAutorizacionOperacion,
    dNomTit: data.nombreTitularTarjeta,
    dNumTarj: data.numeroTarjeta
  } as GPagTarCD;
}

export function mapPagoChequeToRaw(data: PagoCheque): GPagCheq {
  return {
    dNumCheq: data.numeroCheque,
    dBcoEmi: data.bancoEmisor
  } as GPagCheq;
}

export function mapPagoCreditoToRaw(data: PagoCredito): GPagCred {
  return {
    iCondCred: data.condicionOperacionCredito,
    dDCondCred: resolveRequiredDescription(
      'condicionOperacionCredito',
      data.condicionOperacionCredito,
      descripcionCondicionOperacionCredito as Record<string, string>
    ),
    dPlazoCre: data.plazoCredito,
    dCuotas: data.cantidadCuotas,
    dMonEnt: data.montoEntregaInicial,
    gCuotas: data.cuotas?.map(mapCuotaToRaw)
  } as GPagCred;
}

export function mapCuotaToRaw(data: Cuota): GCuotas {
  return {
    cMoneCuo: data.monedaCuota,
    dDMoneCuo: resolveCurrencyDescription(data.monedaCuota),
    dMonCuota: data.montoCuota,
    dVencCuo: formatDateOnly(data.vencimientoCuota)
  } as GCuotas;
}

export function mapItemOperacionToRaw(data: ItemOperacion): GCamItem {
  return {
    dCodInt: data.codigoInterno,
    dParAranc: data.partidaArancelaria,
    dNCM: data.ncm,
    dDncpG: data.codigoDncpGeneral,
    dDncpE: data.codigoDncpEspecifico,
    dGtin: data.codigoGtinProducto,
    dGtinPq: data.codigoGtinPaquete,
    dDesProSer: data.descripcionProductoServicio,
    cUniMed: data.unidadMedida,
    dDesUniMed: resolveRequiredDescription(
      'unidadMedida',
      data.unidadMedida,
      descripcionUnidadMedida
    ),
    dCantProSer: data.cantidadProductoServicio,
    cPaisOrig: data.paisOrigen,
    dDesPaisOrig:
      data.paisOrigen !== undefined ? resolveCountryDescription(data.paisOrigen) : undefined,
    dInfItem: data.informacionItem,
    cRelMerc: data.codigoDatosRelevanciaMercaderias,
    dDesRelMerc: resolveOptionalDescription(
      data.codigoDatosRelevanciaMercaderias,
      descripcionCodigoDatosRelevanciaMercaderias as Record<string, string>
    ),
    dCanQuiMer: data.cantidadQuiebraMerma,
    dPorQuiMer: data.porcentajeQuiebraMerma,
    dCDCAnticipo: data.cdcAnticipo,
    gValorItem: data.valorItem ? mapValorItemToRaw(data.valorItem) : undefined,
    gCamIVA: data.ivaItem ? mapIvaItemToRaw(data.ivaItem) : undefined,
    gRasMerc: data.rastreoMercaderia
      ? mapRastreoMercaderiaToRaw(data.rastreoMercaderia)
      : undefined,
    gVehNuevo: data.vehiculoNuevo ? mapDetalleVehiculoNuevoToRaw(data.vehiculoNuevo) : undefined
  } as GCamItem;
}

export function mapValorItemToRaw(data: ValorItem): GValorItem {
  return {
    dPUniProSer: data.precioUnitario,
    dTiCamIt: data.tipoCambioItem,
    dTotBruOpeItem: data.totalBrutoOperacionItem,
    gValorRestaItem: mapValorRestaItemToRaw(data.valorRestaItem)
  } as GValorItem;
}

export function mapValorRestaItemToRaw(data: ValorRestaItem): GValorRestaItem {
  return {
    dDescItem: data.descuentoParticularItem,
    dPorcDesIt: data.porcentajeDescuentoItem,
    dDescGloItem: data.descuentoGlobalItem,
    dAntPreUniIt: data.anticipoParticularItem,
    dAntGloPreUniIt: data.anticipoGlobalItem,
    dTotOpeItem: data.valorTotalOperacionItem,
    dTotOpeGs: data.valorTotalOperacionItemGs
  } as GValorRestaItem;
}

export function mapIvaItemToRaw(data: IvaItem): GCamIVA {
  return {
    iAfecIVA: data.formaAfectacionTributariaIVA,
    dDesAfecIVA: resolveRequiredDescription(
      'formaAfectacionTributariaIVA',
      data.formaAfectacionTributariaIVA,
      descripcionFormaAfectacionTributariaIVA as Record<string, string>
    ),
    dPropIVA: data.proporcionGravadaIva,
    dTasaIVA: data.tasaIva,
    dBasGravIVA: data.baseGravadaIvaItem,
    dLiqIVAItem: data.liquidacionIvaItem,
    dBasExe: data.baseExenta
  } as GCamIVA;
}

export function mapRastreoMercaderiaToRaw(data: RastreoMercaderia): GRasMerc {
  return {
    dNumLote: data.numeroLote,
    dVencMerc: formatDateOnly(data.fechaVencimientoMercaderia),
    dNSerie: data.numeroSerie,
    dNumPedi: data.numeroPedido,
    dNumSegui: data.numeroSeguimientoEnvio,
    dNumReg: data.numeroRegistroProductoSenave,
    dNumRegEntCom: data.numeroRegistroEntidadComercialSenave,
    dNomPro: data.nombreProducto
  } as GRasMerc;
}

export function mapDetalleVehiculoNuevoToRaw(data: DetalleVehiculoNuevo): GVehNuevo {
  return {
    iTipOpVN: data.tipoOperacionVentaVehiculos,
    dDesTipOpVN: resolveOptionalDescription(
      data.tipoOperacionVentaVehiculos,
      descripcionTipoOperacionVentaVehiculos as Record<string, string>
    ),
    dChasis: data.chasisVehiculo,
    dColor: data.colorVehiculo,
    dPotencia: data.potenciaMotor,
    dCapMot: data.capacidadMotor,
    dPNet: data.pesoNeto,
    dPBruto: data.pesoBruto,
    iTipCom: data.tipoCombustible,
    dDesTipCom: resolveOptionalDescription(
      data.tipoCombustible,
      descripcionTipoCombustible as Record<string, string>
    ),
    dNroMotor: data.numeroMotor,
    dCapTracc: data.capacidadMaximaTraccion,
    dAnoFab: data.anoFabricacion,
    cTipVeh: data.tipoVehiculo,
    dCapac: data.capacidadMaximaPasajeros,
    dCilin: data.cilindradasMotor
  } as GVehNuevo;
}

export function mapUsoComercialToRaw(data: UsoComercial): GCamEsp {
  return {
    gGrupEner: data.sectorEnergiaElectrica
      ? mapSectorEnergiaElectricaToRaw(data.sectorEnergiaElectrica)
      : undefined,
    gGrupSeg: data.sectorSeguros ? mapSectorSegurosToRaw(data.sectorSeguros) : undefined,
    gGrupSup: data.sectorSupermercados
      ? mapSectorSupermercadosToRaw(data.sectorSupermercados)
      : undefined,
    gGrupAdi: data.datosAdicionalesUsoComercial
      ? mapDatosAdicionalesUsoComercialToRaw(data.datosAdicionalesUsoComercial)
      : undefined
  } as GCamEsp;
}

export function mapSectorEnergiaElectricaToRaw(data: SectorEnergiaElectrica): GGrupEner {
  return {
    dNroMed: data.numeroMedidor,
    dActiv: data.codigoActividad,
    dCateg: data.codigoCategoria,
    dLecAnt: data.lecturaAnterior,
    dLecAct: data.lecturaActual,
    dConKwh: data.consumoKwh
  } as GGrupEner;
}

export function mapSectorSegurosToRaw(data: SectorSeguros): GGrupSeg {
  return {
    dCodEmpSeg: data.codigoEmpresaSeguros,
    gGrupPolSeg: data.polizaSeguros?.map(mapPolizaSegurosToRaw)
  } as GGrupSeg;
}

export function mapPolizaSegurosToRaw(data: PolizaSeguros): GGrupPolSeg {
  return {
    dPoliza: data.codigoPoliza,
    dUnidVig: data.unidadVigencia,
    dVigencia: data.vigenciaPoliza,
    dNumPoliza: data.numeroPoliza,
    dFecIniVig: formatDateTime(data.fechaInicioVigencia),
    dFecFinVig: formatDateTime(data.fechaFinVigencia),
    dCodInt: data.codigoInternoItem
  } as GGrupPolSeg;
}

export function mapSectorSupermercadosToRaw(data: SectorSupermercados): GGrupSup {
  return {
    dNomCaj: data.nombreCajero,
    dEfectivo: data.efectivo,
    dVuelto: data.vuelto,
    dDonac: data.montoDonacion,
    dDesDonac: data.descripcionDonacion
  } as GGrupSup;
}

export function mapDatosAdicionalesUsoComercialToRaw(data: DatosAdicionalesUsoComercial): GGrupAdi {
  return {
    dCiclo: data.ciclo,
    dFecIniC: formatDateOnly(data.fechaInicioCiclo),
    dFecFinC: formatDateOnly(data.fechaFinCiclo),
    dVencPag: data.vencimientoPago?.map((date) => formatDateOnly(date)).filter(Boolean) as
      | string[]
      | undefined,
    dContrato: data.numeroContrato,
    dSalAnt: data.saldoAnterior,
    dCodConDncp: data.codigoContratacionDNCP
  } as GGrupAdi;
}

export function mapTransporteToRaw(data: Transporte): GTransp {
  return {
    iTipTrans: data.tipoTransporte,
    dDesTipTrans: resolveOptionalDescription(
      data.tipoTransporte,
      descripcionTipoTransporte as Record<string, string>
    ),
    iModTrans: data.modalidadTransporte,
    dDesModTrans: resolveRequiredDescription(
      'modalidadTransporte',
      data.modalidadTransporte,
      descripcionModalidadTransporte as Record<string, string>
    ),
    iRespFlete: data.responsableCostoFlete,
    cCondNeg: data.condicionNegociacion,
    dNuManif: data.numeroManifiestoCarga,
    dNuDespImp: data.numeroDespachoImportacion,
    dIniTras: formatDateOnly(data.inicioEstimadoTraslado),
    dFinTras: formatDateOnly(data.finEstimadoTraslado),
    cPaisDest: data.paisDestino,
    dDesPaisDest:
      data.paisDestino !== undefined ? resolveCountryDescription(data.paisDestino) : undefined,
    gCamSal: data.localSalidaMercaderias
      ? mapLocalSalidaMercaderiasToRaw(data.localSalidaMercaderias)
      : undefined,
    gCamEnt: data.localesEntregaMercaderias?.map(mapLocalEntregaMercaderiasToRaw),
    gVehTras: data.vehiculosTrasladoMercaderias?.map(mapVehiculoTrasladoMercaderiasToRaw),
    gCamTrans: data.transportista ? mapTransportistaToRaw(data.transportista) : undefined
  } as GTransp;
}

export function mapLocalSalidaMercaderiasToRaw(data: LocalSalidaMercaderias): GCamSal {
  return {
    dDirLocSal: data.direccionLocalSalida,
    dNumCasSal: data.numeroCasaSalida,
    dComp1Sal: data.complementoDireccion1Salida,
    dComp2Sal: data.complementoDireccion2Salida,
    cDepSal: data.departamentoSalida,
    dDesDepSal:
      data.departamentoSalida !== undefined
        ? resolveDepartmentDescription(data.departamentoSalida)
        : undefined,
    cDisSal: data.distritoSalida,
    dDesDisSal: resolveDistrictDescription(data.distritoSalida),
    cCiuSal: data.ciudadSalida,
    dDesCiuSal: resolveCityDescription(data.ciudadSalida),
    dTelSal: data.telefonoLocalSalida
  } as GCamSal;
}

export function mapLocalEntregaMercaderiasToRaw(data: LocalEntregaMercaderias): GCamEnt {
  return {
    dDirLocEnt: data.direccionLocalEntrega,
    dNumCasEnt: data.numeroCasaEntrega,
    dComp1Ent: data.complementoDireccion1Entrega,
    dComp2Ent: data.complementoDireccion2Entrega,
    cDepEnt: data.departamentoEntrega,
    dDesDepEnt: resolveDepartmentDescription(data.departamentoEntrega),
    cDisEnt: data.distritoEntrega,
    dDesDisEnt: resolveDistrictDescription(data.distritoEntrega),
    cCiuEnt: data.ciudadEntrega,
    dDesCiuEnt: requireDefined(resolveCityDescription(data.ciudadEntrega), 'ciudadEntrega'),
    dTelEnt: data.telefonoLocalEntrega
  } as GCamEnt;
}

export function mapVehiculoTrasladoMercaderiasToRaw(data: VehiculoTrasladoMercaderias): GVehTras {
  return {
    dTiVehTras: data.tipoVehiculo,
    dMarVeh: data.marcaVehiculo,
    dTipIdenVeh: data.tipoIdentificacionVehiculo,
    dNroIDVeh: data.numeroIdentificacionVehiculo,
    dAdicVeh: data.datosAdicionalesVehiculo,
    dNroMatVeh: data.numeroMatriculaVehiculo,
    dNroVuelo: data.numeroVuelo
  } as GVehTras;
}

export function mapTransportistaToRaw(data: Transportista): GCamTrans {
  return {
    iNatTrans: data.naturalezaTransportista,
    dNomTrans: data.nombreTransportista,
    dRucTrans: normalizeOptionalRuc(data.rucTransportista),
    dDVTrans: resolveOptionalNumericDv(
      data.digitoVerificadorRucTransportista,
      data.rucTransportista
    ),
    iTipIDTrans: data.tipoDocumentoIdentidadTransportista,
    dDTipIDTrans: resolveOptionalDescription(
      data.tipoDocumentoIdentidadTransportista,
      descripcionTipoDocumentoTransportista as Record<string, string>
    ),
    dNumIDTrans: data.numeroDocumentoIdentidadTransportista,
    cNacTrans: data.nacionalidadTransportista,
    dDesNacTrans:
      data.nacionalidadTransportista !== undefined
        ? resolveCountryDescription(data.nacionalidadTransportista)
        : undefined,
    dNumIDChof: data.numeroDocumentoIdentidadChofer,
    dNomChof: data.nombreChofer,
    dDomFisc: data.domicilioFiscalTransportista,
    dDirChof: data.direccionChofer,
    dNombAg: data.nombreAgente,
    dRucAg: normalizeOptionalRuc(data.rucAgente),
    dDVAg: resolveOptionalStringDv(data.digitoVerificadorRucAgente, data.rucAgente),
    dDirAge: data.direccionAgente
  } as GCamTrans;
}
