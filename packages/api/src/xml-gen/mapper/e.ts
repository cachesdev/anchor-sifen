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
import { asLiteral } from '../../sifen/types/union';
import { descripcionCodigoCiudad } from '../../gen/ciudades';
import { descripcionCodigoDepartamento } from '../../gen/departamentos';
import { descripcionCodigoDistrito } from '../../gen/distritos';
import { codigoMoneda } from '../../gen/monedas';
import { descripcionCodigoPais } from '../../gen/paises';
import { formatDate, optionalBigToFixed, optionalMapper } from './helpers';
import { extraerRuc } from '../ruc';

export function mapCamposFacturaElectronicaToRaw(data: CamposFacturaElectronica): GCamFE {
  const indicadorPresencia = asLiteral(data.indicadorPresencia);

  return {
    iIndPres: indicadorPresencia,
    dDesIndPres: descripcionIndicadorPresencia[indicadorPresencia],
    dFecEmNR: formatDate(data.fechaFuturaTrasladoMercaderia, 'date'),
    gCompPub: optionalMapper(mapComprasPublicasToRaw, data.comprasPublicas)
  };
}

export function mapComprasPublicasToRaw(data: ComprasPublicas): GCompPub {
  return {
    dModCont: data.modalidadContratacion,
    dEntCont: data.entidadContratacion,
    dAnoCont: data.anoContratacion,
    dSecCont: data.secuenciaContratacion,
    dFeCodCont: formatDate(data.fechaEmisionCodigoContratacion, 'date')
  };
}

export function mapAutofacturaElectronicaToRaw(data: AutofacturaElectronica): GCamAE {
  const naturalezaVendedor = asLiteral(data.naturalezaVendedor);
  const tipoDocumentoIdentidadVendedor = asLiteral(data.tipoDocumentoIdentidadVendedor);
  const departamentoVendedor = asLiteral(data.departamentoVendedor);
  const ciudadVendedor = asLiteral(data.ciudadVendedor);
  const departamentoTransaccion = asLiteral(data.departamentoTransaccion);
  const ciudadTransaccion = asLiteral(data.ciudadTransaccion);
  const distritoVendedor = asLiteral(data.distritoVendedor);
  const distritoTransaccion = asLiteral(data.distritoTransaccion);

  return {
    iNatVen: naturalezaVendedor,
    dDesNatVen: descripcionNaturalezaVendedor[naturalezaVendedor],
    iTipIDVen: tipoDocumentoIdentidadVendedor,
    dDTipIDVen: descripcionTipoDocumentoVendedor[tipoDocumentoIdentidadVendedor],
    dNumIDVen: data.numeroDocumentoIdentidadVendedor,
    dNomVen: data.nombreVendedor,
    dDirVen: data.direccionVendedor,
    dNumCasVen: data.numeroCasaVendedor,
    cDepVen: departamentoVendedor,
    dDesDepVen: descripcionCodigoDepartamento[departamentoVendedor],
    cDisVen: distritoVendedor,
    dDesDisVen:
      distritoVendedor !== undefined ? descripcionCodigoDistrito[distritoVendedor] : undefined,
    cCiuVen: ciudadVendedor,
    dDesCiuVen: descripcionCodigoCiudad[ciudadVendedor],
    dDirProv: data.lugarTransaccion,
    cDepProv: departamentoTransaccion,
    dDesDepProv: descripcionCodigoDepartamento[departamentoTransaccion],
    cDisProv: distritoTransaccion,
    dDesDisProv:
      distritoTransaccion !== undefined
        ? descripcionCodigoDistrito[distritoTransaccion]
        : undefined,
    cCiuProv: ciudadTransaccion,
    dDesCiuProv: descripcionCodigoCiudad[ciudadTransaccion]
  };
}

export function mapNotaCreditoDebitoElectronicaToRaw(data: NotaCreditoDebitoElectronica): GCamNCDE {
  const motivoEmision = asLiteral(data.motivoEmision);

  return {
    iMotEmi: motivoEmision,
    dDesMotEmi: descripcionMotivoEmision[motivoEmision]
  };
}

export function mapNotaRemisionElectronicaToRaw(data: NotaRemisionElectronica): GCamNRE {
  const motivoEmisionNotaRemision = asLiteral(data.motivoEmisionNotaRemision);
  const responsableEmisionNotaRemision = asLiteral(data.responsableEmisionNotaRemision);

  return {
    iMotEmiNR: motivoEmisionNotaRemision,
    dDesMotEmiNR: descripcionMotivoEmisionNotaRemision[motivoEmisionNotaRemision],
    iRespEmiNR: responsableEmisionNotaRemision,
    dDesRespEmiNR: descripcionResponsableEmisionNotaRemision[responsableEmisionNotaRemision],
    dKmR: data.kilometrosEstimadosRecorrido,
    dFecEm: formatDate(data.fechaFuturaEmision, 'date'),
    cPreFle: data.precioFlete
  };
}

export function mapCondicionOperacionToRaw(data: CondicionOperacion): GCamCond {
  const condicionOperacion = asLiteral(data.condicionOperacion);

  return {
    iCondOpe: condicionOperacion,
    dDCondOpe: descripcionCondicionOperacion[condicionOperacion],
    gPaConEIni: data.pagoContadoEntregaInicial?.map(mapPagoContadoEntregaInicialToRaw),
    gPagCred: optionalMapper(mapPagoCreditoToRaw, data.pagoCredito)
  };
}

export function mapPagoContadoEntregaInicialToRaw(data: PagoContadoEntregaInicial): GPaConEIni {
  const tipoPago = asLiteral(data.tipoPago);
  const monedaTipoPago = asLiteral(data.monedaTipoPago);

  return {
    iTiPago: tipoPago,
    dDesTiPag: descripcionTipoPago[tipoPago],
    dMonTiPag: data.montoTipoPago.toFixed(4),
    cMoneTiPag: monedaTipoPago,
    dDMoneTiPag: codigoMoneda[monedaTipoPago],
    dTiCamTiPag: optionalBigToFixed(data.tipoCambioTipoPago, 4),
    gPagTarCD: optionalMapper(mapPagoTarjetaCreditoDebitoToRaw, data.pagoTarjetaCreditoDebito),
    gPagCheq: optionalMapper(mapPagoChequeToRaw, data.pagoCheque)
  };
}

export function mapPagoTarjetaCreditoDebitoToRaw(data: PagoTarjetaCreditoDebito): GPagTarCD {
  const denominacionTarjeta = asLiteral(data.denominacionTarjeta);

  return {
    iDenTarj: denominacionTarjeta,
    dDesDenTarj: descripcionDenominacionTarjeta[denominacionTarjeta],
    dRSProTar: data.razonSocialProcesadoraTarjeta,
    dRUCProTar:
      data.rucProcesadoraTarjeta !== undefined ? extraerRuc(data.rucProcesadoraTarjeta) : undefined,
    dDVProTar: data.digitoVerificadorProcesadoraTarjeta,
    iForProPa: asLiteral(data.formaProcesamientoPago),
    dCodAuOpe: data.codigoAutorizacionOperacion,
    dNomTit: data.nombreTitularTarjeta,
    dNumTarj: data.numeroTarjeta
  };
}

export function mapPagoChequeToRaw(data: PagoCheque): GPagCheq {
  return {
    dNumCheq: data.numeroCheque,
    dBcoEmi: data.bancoEmisor
  };
}

export function mapPagoCreditoToRaw(data: PagoCredito): GPagCred {
  const condicionOperacionCredito = asLiteral(data.condicionOperacionCredito);

  return {
    iCondCred: condicionOperacionCredito,
    dDCondCred: descripcionCondicionOperacionCredito[condicionOperacionCredito],
    dPlazoCre: data.plazoCredito,
    dCuotas: data.cantidadCuotas,
    dMonEnt: optionalBigToFixed(data.montoEntregaInicial, 4),
    gCuotas: data.cuotas?.map(mapCuotaToRaw)
  };
}

export function mapCuotaToRaw(data: Cuota): GCuotas {
  const monedaCuota = asLiteral(data.monedaCuota);

  return {
    cMoneCuo: monedaCuota,
    dDMoneCuo: codigoMoneda[monedaCuota],
    dMonCuota: data.montoCuota.toFixed(4),
    dVencCuo: formatDate(data.vencimientoCuota, 'date')
  };
}

export function mapItemOperacionToRaw(data: ItemOperacion): GCamItem {
  const unidadMedida = asLiteral(data.unidadMedida);
  const paisOrigen = asLiteral(data.paisOrigen);
  const codigoDatosRelevanciaMercaderias = asLiteral(data.codigoDatosRelevanciaMercaderias);

  return {
    dCodInt: data.codigoInterno,
    dParAranc: data.partidaArancelaria,
    dNCM: data.ncm,
    dDncpG: data.codigoDncpGeneral,
    dDncpE: data.codigoDncpEspecifico,
    dGtin: data.codigoGtinProducto,
    dGtinPq: data.codigoGtinPaquete,
    dDesProSer: data.descripcionProductoServicio,
    cUniMed: unidadMedida,
    dDesUniMed: descripcionUnidadMedida[unidadMedida],
    dCantProSer: data.cantidadProductoServicio.toFixed(4),
    cPaisOrig: paisOrigen,
    dDesPaisOrig: paisOrigen !== undefined ? descripcionCodigoPais[paisOrigen] : undefined,
    dInfItem: data.informacionItem,
    cRelMerc: codigoDatosRelevanciaMercaderias,
    dDesRelMerc:
      codigoDatosRelevanciaMercaderias !== undefined
        ? descripcionCodigoDatosRelevanciaMercaderias[codigoDatosRelevanciaMercaderias]
        : undefined,
    dCanQuiMer: optionalBigToFixed(data.cantidadQuiebraMerma, 4),
    dPorQuiMer: optionalBigToFixed(data.porcentajeQuiebraMerma, 8),
    dCDCAnticipo: data.cdcAnticipo,
    gValorItem: optionalMapper(mapValorItemToRaw, data.valorItem),
    gCamIVA: optionalMapper(mapIvaItemToRaw, data.ivaItem),
    gRasMerc: optionalMapper(mapRastreoMercaderiaToRaw, data.rastreoMercaderia),
    gVehNuevo: optionalMapper(mapDetalleVehiculoNuevoToRaw, data.vehiculoNuevo)
  };
}

export function mapValorItemToRaw(data: ValorItem): GValorItem {
  return {
    dPUniProSer: data.precioUnitario.toFixed(8),
    dTiCamIt: optionalBigToFixed(data.tipoCambioItem, 4),
    dTotBruOpeItem: data.totalBrutoOperacionItem.toFixed(8),
    gValorRestaItem: mapValorRestaItemToRaw(data.valorRestaItem)
  };
}

export function mapValorRestaItemToRaw(data: ValorRestaItem): GValorRestaItem {
  return {
    dDescItem: optionalBigToFixed(data.descuentoParticularItem, 8),
    dPorcDesIt: optionalBigToFixed(data.porcentajeDescuentoItem, 8),
    dDescGloItem: optionalBigToFixed(data.descuentoGlobalItem, 8),
    dAntPreUniIt: optionalBigToFixed(data.anticipoParticularItem, 8, { keepZero: true }),
    dAntGloPreUniIt: optionalBigToFixed(data.anticipoGlobalItem, 8, { keepZero: true }),
    dTotOpeItem: data.valorTotalOperacionItem.toFixed(8),
    dTotOpeGs: optionalBigToFixed(data.valorTotalOperacionItemGs, 8)
  };
}

export function mapIvaItemToRaw(data: IvaItem): GCamIVA {
  const formaAfectacionTributariaIVA = asLiteral(data.formaAfectacionTributariaIVA);

  return {
    iAfecIVA: formaAfectacionTributariaIVA,
    dDesAfecIVA: descripcionFormaAfectacionTributariaIVA[formaAfectacionTributariaIVA],
    dPropIVA: data.proporcionGravadaIva.toFixed(8),
    dTasaIVA: data.tasaIva,
    dBasGravIVA: data.baseGravadaIvaItem.toFixed(8),
    dLiqIVAItem: data.liquidacionIvaItem.toFixed(8),
    dBasExe: data.baseExenta.toFixed(8)
  };
}

export function mapRastreoMercaderiaToRaw(data: RastreoMercaderia): GRasMerc {
  return {
    dNumLote: data.numeroLote,
    dVencMerc: formatDate(data.fechaVencimientoMercaderia, 'date'),
    dNSerie: data.numeroSerie,
    dNumPedi: data.numeroPedido,
    dNumSegui: data.numeroSeguimientoEnvio,
    dNumReg: data.numeroRegistroProductoSenave,
    dNumRegEntCom: data.numeroRegistroEntidadComercialSenave,
    dNomPro: data.nombreProducto
  };
}

export function mapDetalleVehiculoNuevoToRaw(data: DetalleVehiculoNuevo): GVehNuevo {
  const tipoOperacionVentaVehiculos = asLiteral(data.tipoOperacionVentaVehiculos);
  const tipoCombustible = asLiteral(data.tipoCombustible);

  return {
    iTipOpVN: tipoOperacionVentaVehiculos,
    dDesTipOpVN:
      tipoOperacionVentaVehiculos !== undefined
        ? descripcionTipoOperacionVentaVehiculos[tipoOperacionVentaVehiculos]
        : undefined,
    dChasis: data.chasisVehiculo,
    dColor: data.colorVehiculo,
    dPotencia: data.potenciaMotor,
    dCapMot: data.capacidadMotor,
    dPNet: optionalBigToFixed(data.pesoNeto, 4),
    dPBruto: optionalBigToFixed(data.pesoBruto, 4),
    iTipCom: tipoCombustible,
    dDesTipCom:
      tipoCombustible !== undefined ? descripcionTipoCombustible[tipoCombustible] : undefined,
    dNroMotor: data.numeroMotor,
    dCapTracc: optionalBigToFixed(data.capacidadMaximaTraccion, 4),
    dAnoFab: data.anoFabricacion,
    cTipVeh: data.tipoVehiculo,
    dCapac: data.capacidadMaximaPasajeros,
    dCilin: data.cilindradasMotor
  };
}

export function mapUsoComercialToRaw(data: UsoComercial): GCamEsp {
  return {
    gGrupEner: optionalMapper(mapSectorEnergiaElectricaToRaw, data.sectorEnergiaElectrica),
    gGrupSeg: optionalMapper(mapSectorSegurosToRaw, data.sectorSeguros),
    gGrupSup: optionalMapper(mapSectorSupermercadosToRaw, data.sectorSupermercados),
    gGrupAdi: optionalMapper(
      mapDatosAdicionalesUsoComercialToRaw,
      data.datosAdicionalesUsoComercial
    )
  };
}

export function mapSectorEnergiaElectricaToRaw(data: SectorEnergiaElectrica): GGrupEner {
  return {
    dNroMed: data.numeroMedidor,
    dActiv: data.codigoActividad,
    dCateg: data.codigoCategoria,
    dLecAnt: optionalBigToFixed(data.lecturaAnterior, 2),
    dLecAct: optionalBigToFixed(data.lecturaActual, 2),
    dConKwh: optionalBigToFixed(data.consumoKwh, 2)
  };
}

export function mapSectorSegurosToRaw(data: SectorSeguros): GGrupSeg {
  return {
    dCodEmpSeg: data.codigoEmpresaSeguros,
    gGrupPolSeg: data.polizaSeguros?.map(mapPolizaSegurosToRaw)
  };
}

export function mapPolizaSegurosToRaw(data: PolizaSeguros): GGrupPolSeg {
  return {
    dPoliza: data.codigoPoliza,
    dUnidVig: data.unidadVigencia,
    dVigencia: data.vigenciaPoliza.toFixed(1),
    dNumPoliza: data.numeroPoliza,
    dFecIniVig: formatDate(data.fechaInicioVigencia, 'date-time'),
    dFecFinVig: formatDate(data.fechaFinVigencia, 'date-time'),
    dCodInt: data.codigoInternoItem
  };
}

export function mapSectorSupermercadosToRaw(data: SectorSupermercados): GGrupSup {
  return {
    dNomCaj: data.nombreCajero,
    dEfectivo: optionalBigToFixed(data.efectivo, 4),
    dVuelto: optionalBigToFixed(data.vuelto, 4),
    dDonac: optionalBigToFixed(data.montoDonacion, 4),
    dDesDonac: data.descripcionDonacion
  };
}

export function mapDatosAdicionalesUsoComercialToRaw(data: DatosAdicionalesUsoComercial): GGrupAdi {
  return {
    dCiclo: data.ciclo,
    dFecIniC: formatDate(data.fechaInicioCiclo, 'date'),
    dFecFinC: formatDate(data.fechaFinCiclo, 'date'),
    dVencPag: data.vencimientoPago
      ?.map((date) => formatDate(date, 'date'))
      .filter((s): s is string => s !== undefined),
    dContrato: data.numeroContrato,
    dSalAnt: optionalBigToFixed(data.saldoAnterior, 4),
    dCodConDncp: data.codigoContratacionDNCP
  };
}

export function mapTransporteToRaw(data: Transporte): GTransp {
  const modalidadTransporte = asLiteral(data.modalidadTransporte);
  const tipoTransporte = asLiteral(data.tipoTransporte);
  const paisDestino = asLiteral(data.paisDestino);

  return {
    iTipTrans: tipoTransporte,
    dDesTipTrans:
      tipoTransporte !== undefined ? descripcionTipoTransporte[tipoTransporte] : undefined,
    iModTrans: modalidadTransporte,
    dDesModTrans: descripcionModalidadTransporte[modalidadTransporte],
    iRespFlete: asLiteral(data.responsableCostoFlete),
    cCondNeg: asLiteral(data.condicionNegociacion),
    dNuManif: data.numeroManifiestoCarga,
    dNuDespImp: data.numeroDespachoImportacion,
    dIniTras: formatDate(data.inicioEstimadoTraslado, 'date'),
    dFinTras: formatDate(data.finEstimadoTraslado, 'date'),
    cPaisDest: paisDestino,
    dDesPaisDest: paisDestino !== undefined ? descripcionCodigoPais[paisDestino] : undefined,
    gCamSal: optionalMapper(mapLocalSalidaMercaderiasToRaw, data.localSalidaMercaderias),
    gCamEnt: data.localesEntregaMercaderias?.map(mapLocalEntregaMercaderiasToRaw),
    gVehTras: data.vehiculosTrasladoMercaderias?.map(mapVehiculoTrasladoMercaderiasToRaw),
    gCamTrans: optionalMapper(mapTransportistaToRaw, data.transportista)
  };
}

export function mapLocalSalidaMercaderiasToRaw(data: LocalSalidaMercaderias): GCamSal {
  const departamentoSalida = asLiteral(data.departamentoSalida);
  const distritoSalida = asLiteral(data.distritoSalida);
  const ciudadSalida = asLiteral(data.ciudadSalida);

  return {
    dDirLocSal: data.direccionLocalSalida,
    dNumCasSal: data.numeroCasaSalida,
    dComp1Sal: data.complementoDireccion1Salida,
    dComp2Sal: data.complementoDireccion2Salida,
    cDepSal: departamentoSalida,
    dDesDepSal:
      departamentoSalida !== undefined
        ? descripcionCodigoDepartamento[departamentoSalida]
        : undefined,
    cDisSal: distritoSalida,
    dDesDisSal:
      distritoSalida !== undefined ? descripcionCodigoDistrito[distritoSalida] : undefined,
    cCiuSal: ciudadSalida,
    dDesCiuSal: ciudadSalida !== undefined ? descripcionCodigoCiudad[ciudadSalida] : undefined,
    dTelSal: data.telefonoLocalSalida
  };
}

export function mapLocalEntregaMercaderiasToRaw(data: LocalEntregaMercaderias): GCamEnt {
  const departamentoEntrega = asLiteral(data.departamentoEntrega);
  const ciudadEntrega = asLiteral(data.ciudadEntrega);
  const distritoEntrega = asLiteral(data.distritoEntrega);

  return {
    dDirLocEnt: data.direccionLocalEntrega,
    dNumCasEnt: data.numeroCasaEntrega,
    dComp1Ent: data.complementoDireccion1Entrega,
    dComp2Ent: data.complementoDireccion2Entrega,
    cDepEnt: departamentoEntrega,
    dDesDepEnt: descripcionCodigoDepartamento[departamentoEntrega],
    cDisEnt: distritoEntrega,
    dDesDisEnt:
      distritoEntrega !== undefined ? descripcionCodigoDistrito[distritoEntrega] : undefined,
    cCiuEnt: ciudadEntrega,
    dDesCiuEnt: descripcionCodigoCiudad[ciudadEntrega],
    dTelEnt: data.telefonoLocalEntrega
  };
}

export function mapVehiculoTrasladoMercaderiasToRaw(data: VehiculoTrasladoMercaderias): GVehTras {
  return {
    dTiVehTras: data.tipoVehiculo,
    dMarVeh: data.marcaVehiculo,
    dTipIdenVeh: asLiteral(data.tipoIdentificacionVehiculo),
    dNroIDVeh: data.numeroIdentificacionVehiculo,
    dAdicVeh: data.datosAdicionalesVehiculo,
    dNroMatVeh: data.numeroMatriculaVehiculo,
    dNroVuelo: data.numeroVuelo
  };
}

export function mapTransportistaToRaw(data: Transportista): GCamTrans {
  const tipoDocumentoIdentidadTransportista = asLiteral(data.tipoDocumentoIdentidadTransportista);
  const nacionalidadTransportista = asLiteral(data.nacionalidadTransportista);

  return {
    iNatTrans: asLiteral(data.naturalezaTransportista),
    dNomTrans: data.nombreTransportista,
    dRucTrans: data.rucTransportista !== undefined ? extraerRuc(data.rucTransportista) : undefined,
    dDVTrans: data.digitoVerificadorRucTransportista,
    iTipIDTrans: tipoDocumentoIdentidadTransportista,
    dDTipIDTrans:
      tipoDocumentoIdentidadTransportista !== undefined
        ? descripcionTipoDocumentoTransportista[tipoDocumentoIdentidadTransportista]
        : undefined,
    dNumIDTrans: data.numeroDocumentoIdentidadTransportista,
    cNacTrans: nacionalidadTransportista,
    dDesNacTrans:
      nacionalidadTransportista !== undefined
        ? descripcionCodigoPais[nacionalidadTransportista]
        : undefined,
    dNumIDChof: data.numeroDocumentoIdentidadChofer,
    dNomChof: data.nombreChofer,
    dDomFisc: data.domicilioFiscalTransportista,
    dDirChof: data.direccionChofer,
    dNombAg: data.nombreAgente,
    dRucAg: data.rucAgente !== undefined ? extraerRuc(data.rucAgente) : undefined,
    dDVAg: data.digitoVerificadorRucAgente,
    dDirAge: data.direccionAgente
  };
}
