import type {
  CamposEspecificosTipoDEFE,
  FacturaElectronica,
  Timbrado
} from '../sifen/types/factura';
import { create } from 'xmlbuilder2';
import type {
  DocumentoElectronico,
  GDatGralOpe,
  GDtipDE,
  GOpeDE,
  GTimb
} from '../sifen/types/raw/de';
import {
  descripcionTipoEmision,
  type DatosGenerales,
  type ItemDE,
  type OperacionDE
} from '../sifen/types';
import {
  descripcionTipoDocumentoElectronico,
  descripcionIndicadorPresencia,
  descripcionCondicionOperacion,
  descripcionTipoPago,
  descripcionDenominacionTarjeta,
  descripcionTipoDocumentoResponsable,
  descripcionTipoDocumentoIdentidadReceptor,
  descripcionUnidadMedida,
  descripcionCodigoRelevancia,
  descripcionAfectacionIVA,
  tipoDocumentoElectronico
} from '../sifen/types/enums';
import { DateTime } from 'luxon';
import { codigoMoneda } from '../gen/monedas';
import { descripcionCodigoDepartamento } from '../gen/departamentos';
import { descripcionCodigoDistrito } from '../gen/distritos';
import { descripcionCodigoCiudad } from '../gen/ciudades';
import { descripcionCodigoPais } from '../gen/paises';
import type { GCamItem } from '../sifen/types/raw/e';
import type { GTotSub } from '../sifen/types/raw/f';

export interface XMLGenerator {
  generateFacturaElectronica(data: FacturaElectronica): string;
}

function formatDate(date: Date | DateTime, format: 'stripFractional' | 'YYYY-MM-DD'): string {
  const dt = date instanceof Date ? DateTime.fromJSDate(date, { zone: 'America/Asuncion' }) : date;

  switch (format) {
    case 'stripFractional':
      return dt.toFormat("yyyy-MM-dd'T'HH:mm:ss");

    case 'YYYY-MM-DD':
      return dt.toISODate()!;
  }
}

function generateSecure9DigitNumber(): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  // rango [100000000, 999999999]
  return 100_000_000 + (array[0]! % 900_000_000);
}

interface CalculateGTotSubParams {
  items: GCamItem[];
  tipoImpuesto: number;
  tipoDocumento: number;
  moneda: string;
  condicionTipoCambio?: number;
  tipoCambio?: number;
  porcentajeDescuentoGlobal?: number;
  comision?: number;
}

/**
 * Calcula gTotSub (subtotales)
 */
function calculateGTotSub(params: CalculateGTotSubParams): GTotSub {
  const {
    items,
    tipoImpuesto,
    tipoDocumento,
    moneda,
    condicionTipoCambio,
    tipoCambio,
    porcentajeDescuentoGlobal,
    comision
  } = params;

  // F002: Subtotal exento (E731 = 3)
  const dSubExe = items
    .filter((item) => item.gCamIVA?.iAfecIVA === 3)
    .reduce((sum, item) => sum + (item.gValorItem?.gValorRestaItem?.dTotOpeItem || 0), 0);

  // F003: Subtotal exonerado (E731 = 2)
  const dSubExo = items
    .filter((item) => item.gCamIVA?.iAfecIVA === 2)
    .reduce((sum, item) => sum + (item.gValorItem?.gValorRestaItem?.dTotOpeItem || 0), 0);

  // F004: Subtotal IVA 5% (E731 = 1 o 4, E734 = 5)
  const dSub5 = items
    .filter(
      (item) =>
        (item.gCamIVA?.iAfecIVA === 1 || item.gCamIVA?.iAfecIVA === 4) &&
        item.gCamIVA?.dTasaIVA === 5
    )
    .reduce((sum, item) => sum + (item.gValorItem?.gValorRestaItem?.dTotOpeItem || 0), 0);

  // F005: Subtotal IVA 10% (E731 = 1 o 4, E734 = 10)
  const dSub10 = items
    .filter(
      (item) =>
        (item.gCamIVA?.iAfecIVA === 1 || item.gCamIVA?.iAfecIVA === 4) &&
        item.gCamIVA?.dTasaIVA === 10
    )
    .reduce((sum, item) => sum + (item.gValorItem?.gValorRestaItem?.dTotOpeItem || 0), 0);

  // F008: Total bruto de la operación
  let dTotOpe: number;
  if (tipoImpuesto === 1 || tipoImpuesto === 3 || tipoImpuesto === 4 || tipoImpuesto === 5) {
    dTotOpe = (dSubExe || 0) + (dSubExo || 0) + (dSub5 || 0) + (dSub10 || 0);
  } else if (tipoDocumento === 4) {
    dTotOpe = items.reduce(
      (sum, item) => sum + (item.gValorItem?.gValorRestaItem?.dTotOpeItem || 0),
      0
    );
  } else {
    dTotOpe = items.reduce(
      (sum, item) => sum + (item.gValorItem?.gValorRestaItem?.dTotOpeItem || 0),
      0
    );
  }

  // F009: Total descuento particular por ítem (EA002)
  const dTotDesc = items.reduce(
    (sum, item) => sum + (item.gValorItem?.gValorRestaItem?.dDescItem || 0),
    0
  );

  // F033: Total descuento global por ítem (EA004)
  const dTotDescGlotem = items.reduce(
    (sum, item) => sum + (item.gValorItem?.gValorRestaItem?.dDescGloItem || 0),
    0
  );

  // F034: Total anticipo por ítem (EA006)
  const dTotAntItem = items.reduce(
    (sum, item) => sum + (item.gValorItem?.gValorRestaItem?.dAntPreUniIt || 0),
    0
  );

  // F035: Total anticipo global por ítem (EA007)
  const dTotAnt = items.reduce(
    (sum, item) => sum + (item.gValorItem?.gValorRestaItem?.dAntGloPreUniIt || 0),
    0
  );

  // F010: Porcentaje de descuento global
  const dPorcDescTotal = porcentajeDescuentoGlobal || 0;

  // F011: Total descuentos
  const dDescTotal = dTotDesc + dTotDescGlotem;

  // F012: Total anticipos
  const dAnticipo = dTotAntItem + dTotAnt;

  // F013: Redondeo
  const dRedon = 0;

  // F025: Comisión
  const dComi = comision;

  // F014: Total neto = F008 - F013 + F025
  const dTotGralOpe = dTotOpe - dRedon + (dComi || 0);

  // F015: Liquidación IVA 5%
  const dIVA5 =
    tipoImpuesto === 1 || tipoImpuesto === 5
      ? items
          .filter((item) => item.gCamIVA?.dTasaIVA === 5)
          .reduce((sum, item) => sum + (item.gCamIVA?.dLiqIVAItem || 0), 0)
      : undefined;

  // F016: Liquidación IVA 10%
  const dIVA10 =
    tipoImpuesto === 1 || tipoImpuesto === 5
      ? items
          .filter((item) => item.gCamIVA?.dTasaIVA === 10)
          .reduce((sum, item) => sum + (item.gCamIVA?.dLiqIVAItem || 0), 0)
      : undefined;

  // F036: Liquidación total IVA por redondeo 5%
  const dLiqTotIVA5 =
    (tipoImpuesto === 1 || tipoImpuesto === 5) && dRedon !== 0 ? dRedon / 1.05 : undefined;

  // F037: Liquidación total IVA por redondeo 10%
  const dLiqTotIVA10 =
    (tipoImpuesto === 1 || tipoImpuesto === 5) && dRedon !== 0 ? dRedon / 1.1 : undefined;

  // F026: Liquidación IVA de la comisión (10%)
  const dIVAComi = dComi ? (dComi / 1.1) * 0.1 : undefined;

  // F017: Total IVA = F015 + F016 - F036 - F037 + F026
  const dTotIVA =
    tipoImpuesto === 1 || tipoImpuesto === 5
      ? (dIVA5 || 0) + (dIVA10 || 0) - (dLiqTotIVA5 || 0) - (dLiqTotIVA10 || 0) + (dIVAComi || 0)
      : undefined;

  // F018: Base gravada 5%
  const dBaseGrav5 =
    tipoImpuesto === 1 || tipoImpuesto === 5
      ? items
          .filter((item) => item.gCamIVA?.dTasaIVA === 5)
          .reduce((sum, item) => sum + (item.gCamIVA?.dBasGravIVA || 0), 0)
      : undefined;

  // F019: Base gravada 10%
  const dBaseGrav10 =
    tipoImpuesto === 1 || tipoImpuesto === 5
      ? items
          .filter((item) => item.gCamIVA?.dTasaIVA === 10)
          .reduce((sum, item) => sum + (item.gCamIVA?.dBasGravIVA || 0), 0)
      : undefined;

  // F020: Total base gravada
  const dTBasGraIVA =
    tipoImpuesto === 1 || tipoImpuesto === 5 ? (dBaseGrav5 || 0) + (dBaseGrav10 || 0) : undefined;

  // F023: Total en guaraníes
  let dTotalGs: number | undefined;
  if (moneda !== 'PYG') {
    if (condicionTipoCambio === 1 && tipoCambio) {
      dTotalGs = dTotGralOpe * tipoCambio;
    } else if (condicionTipoCambio === 2) {
      dTotalGs = items.reduce(
        (sum, item) => sum + (item.gValorItem?.gValorRestaItem?.dTotOpeGs || 0),
        0
      );
    }
  } else if (tipoDocumento === 4) {
    dTotalGs = dTotGralOpe;
  }

  // F024: Total + comisión
  const dTotCom = dComi ? dTotGralOpe + dComi : undefined;

  return {
    dSubExe: dSubExe > 0 ? dSubExe : undefined,
    dSubExo: dSubExo > 0 ? dSubExo : undefined,
    dSub5: dSub5 > 0 ? dSub5 : undefined,
    dSub10: dSub10 > 0 ? dSub10 : undefined,
    dTotOpe,
    dTotDesc,
    dTotDescGlotem,
    dTotAntItem,
    dTotAnt,
    dPorcDescTotal,
    dDescTotal,
    dAnticipo,
    dRedon,
    dComi,
    dTotGralOpe,
    dIVA5,
    dIVA10,
    dLiqTotIVA5,
    dLiqTotIVA10,
    dIVAComi,
    dTotIVA,
    dBaseGrav5,
    dBaseGrav10,
    dTBasGraIVA,
    dTotalGs,
    dTotCom
  };
}

/**
 * Mapea un ItemDE a gCamItem.
 */
function generateGcamItem(items: ItemDE[]): GCamItem[] {
  return items.map(
    (item): GCamItem => ({
      dCodInt: item.codigoInterno,
      dParAranc: item.partidaArancelaria,
      dNCM: item.ncm,
      dDncpG: item.codigoDncpGeneral,
      dDncpE: item.codigoDncpEspecifico,
      dGtin: item.gtin,
      dGtinPq: item.gtinPaquete,
      dDesProSer: item.descripcion,
      cUniMed: item.codigoUnidadMedida,
      dDesUniMed: descripcionUnidadMedida[item.codigoUnidadMedida],
      dCantProSer: item.cantidad,
      cPaisOrig: item.codigoPaisOrigen,
      dDesPaisOrig: item.codigoPaisOrigen
        ? descripcionCodigoPais[item.codigoPaisOrigen]
        : undefined,
      dInfItem: item.informacionItem,
      cRelMerc: item.codigoRelevancia,
      dDesRelMerc: item.codigoRelevancia
        ? descripcionCodigoRelevancia[item.codigoRelevancia]
        : undefined,
      dCanQuiMer: item.cantidadQuiebraMerma,
      dPorQuiMer: item.porcentajeQuiebraMerma,
      dCDCAnticipo: item.cdcAnticipo,
      gValorItem: {
        dPUniProSer: item.valorItem.precioUnitario,
        dTiCamIt: item.valorItem.tipoCambio,
        dTotBruOpeItem: item.valorItem.totalBruto,
        gValorRestaItem: {
          dDescItem: item.valorItem.valorRestaItem.descuentoParticular,
          dPorcDesIt: item.valorItem.valorRestaItem.porcentajeDescuentoParticular,
          dDescGloItem: item.valorItem.valorRestaItem.descuentoGlobal,
          dAntPreUniIt: item.valorItem.valorRestaItem.anticipoParticular,
          dAntGloPreUniIt: item.valorItem.valorRestaItem.anticipoGlobal,
          dTotOpeItem: item.valorItem.valorRestaItem.totalOperacion,
          dTotOpeGs: item.valorItem.valorRestaItem.totalOperacionGuaranies
        }
      },
      gCamIVA: item.iva
        ? {
            iAfecIVA: item.iva.afectacionIVA,
            dDesAfecIVA: descripcionAfectacionIVA[item.iva.afectacionIVA],
            dPropIVA: item.iva.proporcionGravada,
            dTasaIVA: item.iva.tasaIVA,
            dBasGravIVA: item.iva.baseGravada,
            dLiqIVAItem: item.iva.liquidacionIVA
          }
        : undefined
    })
  );
}

/**
 * Mapea un OperacionDE a gOpeDE.
 */
function generateGOpeDE(operacionDE: OperacionDE): GOpeDE {
  return {
    iTipEmi: operacionDE.tipoEmision,
    dDesTipEmi: descripcionTipoEmision[operacionDE.tipoEmision],
    dCodSeg: operacionDE.codigoSeguridad
      ? operacionDE.codigoSeguridad
      : generateSecure9DigitNumber(),
    dInfoEmi: operacionDE.informacionEmisor,
    dInfoFisc: operacionDE.informacionFisco
  };
}

/**
 * Mapea gTimb de Timbrado.
 */
function generategTimb(timbrado: Timbrado): GTimb {
  return {
    iTiDE: timbrado.tipoDocumento,
    dDesTiDE: descripcionTipoDocumentoElectronico[timbrado.tipoDocumento],
    dNumTim: timbrado.numeroTimbrado,
    dEst: timbrado.establecimiento.toString().padStart(3, '0'),
    dPunExp: timbrado.puntoExpedicion.toString().padStart(3, '0'),
    dNumDoc: timbrado.numeroDocumento.toString().padStart(7, '0'),
    dSerieNum: timbrado.serieNumero,
    dFeIniT: formatDate(timbrado.fechaInicioVigencia, 'YYYY-MM-DD')
  };
}

function generategDatGralOpe(datosGen: DatosGenerales): GDatGralOpe {
  return {
    dFeEmiDE: formatDate(datosGen.fechaHoraEmision, 'stripFractional'),
    gEmis: {
      dRucEm: datosGen.emisor.ruc,
      dDVEmi: datosGen.emisor.digitoVerificadorRuc,
      iTipCont: datosGen.emisor.tipoContribuyente,
      cTipReg: datosGen.emisor.tipoRegimen,
      dNomEmi: datosGen.emisor.nombre,
      dNomFanEmi: datosGen.emisor.nombreFantasia,
      dDirEmi: datosGen.emisor.direccion,
      dNumCas: datosGen.emisor.numeroCasa,
      dCompDir1: datosGen.emisor.complementoDireccion1,
      dCompDir2: datosGen.emisor.complementoDireccion2,
      cDepEmi: datosGen.emisor.codigoDepartamento,
      dDesDepEmi: descripcionCodigoDepartamento[datosGen.emisor.codigoDepartamento],
      cDisEmi: datosGen.emisor.codigoDistrito,
      dDesDisEmi: datosGen.emisor.codigoDistrito
        ? descripcionCodigoDistrito[datosGen.emisor.codigoDistrito]
        : undefined,
      cCiuEmi: datosGen.emisor.codigoCiudad,
      dDesCiuEmi: descripcionCodigoCiudad[datosGen.emisor.codigoCiudad],
      dTelEmi: datosGen.emisor.telefonoEmisor,
      dEmailE: datosGen.emisor.emailEmisor,
      dDenSuc: datosGen.emisor.denominacionSucursal,
      gActEco: datosGen.emisor.actividadesEconomicas.map((v) => ({
        cActEco: v.codigo.toString(),
        dDesActEco: v.descripcion
      })),
      gRespDE: datosGen.emisor.responsableDE
        ? {
            iTipIDRespDE: datosGen.emisor.responsableDE.tipoDocumentoResponsable,
            dDTipIDRespDE:
              descripcionTipoDocumentoResponsable[
                datosGen.emisor.responsableDE.tipoDocumentoResponsable
              ],
            dNumIDRespDE: datosGen.emisor.responsableDE.numeroDocumentoResponsable,
            dNomRespDE: datosGen.emisor.responsableDE.nombreResponsable,
            dCarRespDE: datosGen.emisor.responsableDE.cargoResponsable
          }
        : undefined
    },
    gDatRec: {
      iNatRec: datosGen.receptor.naturalezaReceptor,
      iTiOpe: datosGen.receptor.tipoOperacion,
      cPaisRec: datosGen.receptor.codigoPais,
      dDesPaisRe: descripcionCodigoPais[datosGen.receptor.codigoPais],
      iTiContRec: datosGen.receptor.tipoContribuyente,
      dRucRec: datosGen.receptor.ruc,
      dDVRec: datosGen.receptor.digitoVerificadorRuc,
      iTipIDRec: datosGen.receptor.tipoDocumentoIdentidad,
      dDTipIDRec: (() => {
        if (!datosGen.receptor.tipoDocumentoIdentidad) return undefined;

        // Segun D209, si el tipo es "Otro" la descripcion puede ser cualquiera
        if (datosGen.receptor.tipoDocumentoIdentidad === 9)
          return datosGen.receptor.descripcionDocumentoIdentidad;

        return descripcionTipoDocumentoIdentidadReceptor[datosGen.receptor.tipoDocumentoIdentidad];
      })(),
      dNumIDRec: datosGen.receptor.numeroDocumentoIdentidad,
      dNomRec: datosGen.receptor.nombre,
      dNomFanRec: datosGen.receptor.nombreFantasia,
      dDirRec: datosGen.receptor.direccion,
      dNumCasRec: datosGen.receptor.numeroCasa,
      dDepRec: datosGen.receptor.codigoDepartamento,
      dDesDepRec: datosGen.receptor.codigoDepartamento
        ? descripcionCodigoDepartamento[datosGen.receptor.codigoDepartamento]
        : undefined,
      dDisRec: datosGen.receptor.codigoDistrito,
      dDesDisRec: datosGen.receptor.codigoDistrito
        ? descripcionCodigoDistrito[datosGen.receptor.codigoDistrito]
        : undefined,
      cCiuRec: datosGen.receptor.codigoCiudad,
      dDesCiuRec: datosGen.receptor.codigoCiudad
        ? descripcionCodigoCiudad[datosGen.receptor.codigoCiudad]
        : undefined,
      dTelRec: datosGen.receptor.telefono,
      dCelRec: datosGen.receptor.celular,
      dEmailRec: datosGen.receptor.email,
      dCodCliente: datosGen.receptor.codigoCliente
    }
  };
}

function generategDtipDE_FE(camposTipoDE: CamposEspecificosTipoDEFE, items: GCamItem[]): GDtipDE {
  return {
    gCamFE: {
      iIndPres: camposTipoDE.camposFE.indicadorPresencia,
      dDesIndPres: (() => {
        // Segun E012, si el tipo es "Otro" la descripcion puede ser cualquiera
        if (camposTipoDE.camposFE.indicadorPresencia === 9)
          // FIXME: No validado
          return camposTipoDE.camposFE.descripcionIndicadorPresencia!;

        return descripcionIndicadorPresencia[camposTipoDE.camposFE.indicadorPresencia];
      })(),
      dFecEmNR: camposTipoDE.camposFE.fechaTrasladoMercaderia
        ? formatDate(camposTipoDE.camposFE.fechaTrasladoMercaderia, 'YYYY-MM-DD')
        : undefined,
      gCompPub: camposTipoDE.camposFE.comprasPublicas
        ? {
            dModCont: camposTipoDE.camposFE.comprasPublicas.modalidad,
            dEntCont: camposTipoDE.camposFE.comprasPublicas.entidad,
            dAnoCont: camposTipoDE.camposFE.comprasPublicas.año,
            dSecCont: camposTipoDE.camposFE.comprasPublicas.secuencia,
            dFeCodCont: formatDate(
              camposTipoDE.camposFE.comprasPublicas.fechaEmisionCodigoContratacion,
              'YYYY-MM-DD'
            )
          }
        : undefined
    },
    gCamCond: {
      iCondOpe: camposTipoDE.condicionOperacion.condicion,
      dDCondOpe: descripcionCondicionOperacion[camposTipoDE.condicionOperacion.condicion],
      gPaConEIni: camposTipoDE.condicionOperacion.pagoContadoEntregaInicial?.map((pago) => ({
        iTiPago: pago.tipoPago,
        dDesTiPag:
          pago.tipoPago === 99 ? pago.descripcionTipoPago! : descripcionTipoPago[pago.tipoPago],
        dMonTiPag: pago.montoPago,
        cMoneTiPag: pago.monedaPago,
        dDMoneTiPag: codigoMoneda[pago.monedaPago],
        dTiCamTiPag: pago.tipoCambioPago,
        gPagTarCD: pago.pagoTarjeta
          ? {
              iDenTarj: pago.pagoTarjeta.denominacionTarjeta,
              dDesDenTarj:
                pago.pagoTarjeta.denominacionTarjeta === 99
                  ? pago.pagoTarjeta.descripcionDenominacionTarjeta!
                  : descripcionDenominacionTarjeta[pago.pagoTarjeta.denominacionTarjeta],
              dRSProTar: pago.pagoTarjeta.razonSocialProcesadora,
              dRUCProTar: pago.pagoTarjeta.rucProcesadora,
              dDVProTar: pago.pagoTarjeta.dvProcesadora,
              iForProPa: pago.pagoTarjeta.formaProcesamientoPago,
              dCodAuOpe: pago.pagoTarjeta.codigoAutorizacion,
              dNomTit: pago.pagoTarjeta.nombreTitular,
              dNumTarj: pago.pagoTarjeta.numeroTarjeta
            }
          : undefined,
        gPagCheq: pago.pagoCheque
          ? {
              dNumCheq: pago.pagoCheque.numeroCheque,
              dBcoEmi: pago.pagoCheque.bancoEmisor
            }
          : undefined
      }))
      // TODO: Implementar pago credito
    },
    gCamItem: items
  };
}

export class XMLGen implements XMLGenerator {
  generateFacturaElectronica(factura: FacturaElectronica): string {
    const items = generateGcamItem(factura.camposEspecificosTipoDE.items);

    const de: DocumentoElectronico['rDE']['DE'] = {
      dDVId: factura.digitoVerificador ? factura.digitoVerificador : Number(factura.cdc[-1]!),
      dFecFirma: factura.fechaFirma
        ? formatDate(factura.fechaFirma, 'stripFractional')
        : formatDate(DateTime.now().setZone('America/Asuncion'), 'stripFractional'),
      dSisFact: 1,
      gOpeDE: generateGOpeDE(factura.operacionDE),
      gTimb: generategTimb({
        tipoDocumento: tipoDocumentoElectronico.FacturaElectronica,
        ...factura.datosTimbrado
      }),
      gDatGralOpe: generategDatGralOpe(factura.datosGenerales),
      gDtipDE: generategDtipDE_FE(factura.camposEspecificosTipoDE, items),
      gTotSub: calculateGTotSub({
        items: items,
        tipoImpuesto: factura.datosGenerales.operacionComercial.tipoImpuesto,
        tipoDocumento: tipoDocumentoElectronico.FacturaElectronica,
        moneda: factura.datosGenerales.operacionComercial.monedaOperacion,
        condicionTipoCambio: factura.datosGenerales.operacionComercial.condicionTipoCambio,
        tipoCambio: factura.datosGenerales.operacionComercial.tipoCambio,
        porcentajeDescuentoGlobal: factura.totales.porcentajeDescuentoGlobal
      })
    };

    const base = {
      'rDE@http://ekuatia.set.gov.py/sifen/xsd': {
        '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        '@xsi:schemaLocation': 'http://ekuatia.set.gov.py/sifen/xsd siRecepDE_v150.xsd',
        dVerFor: 150,
        DE: {
          '@Id': factura.cdc,
          ...de
        }
      }
    };

    const doc = create({ version: '1.0', encoding: 'UTF-8' }).ele(base);
    return doc.end({ prettyPrint: true });
  }
}
