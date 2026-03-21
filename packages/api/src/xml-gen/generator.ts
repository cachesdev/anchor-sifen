import type { FacturaElectronica } from '../sifen/types/factura';
import { create } from 'xmlbuilder2';
import type { DocumentoElectronico } from '../sifen/types/raw/de';
import { descripcionTipoEmision } from '../sifen/types';
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
  descripcionAfectacionIVA
} from '../sifen/types/enums';
import { DateTime } from 'luxon';
import { codigoMoneda } from '../gen/iso4217';
import { descripcionCodigoDepartamento } from '../gen/departamentos';
import { descripcionCodigoDistrito } from '../gen/distritos';
import { descripcionCodigoCiudad } from '../gen/ciudades';
import { descripcionCodigoPais } from '../gen/paises';
import type { gCamItem } from '../sifen/types/raw/e';
import type { gTotSub } from '../sifen/types/raw/f';

export interface XMLGenerator {
  generateFacturaElectronica(data: FacturaElectronica): string;
}

function formatDate(date: Date, format: 'stripFractional' | 'YYYY-MM-DD'): string {
  const dt = DateTime.fromJSDate(date, { zone: 'America/Asuncion' });

  switch (format) {
    case 'stripFractional':
      return dt.toFormat("yyyy-MM-dd'T'HH:mm:ss");

    case 'YYYY-MM-DD':
      return dt.toISODate()!;
  }
}

interface CalculateGTotSubParams {
  items: gCamItem[];
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
function calculateGTotSub(params: CalculateGTotSubParams): gTotSub {
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

export class XMLGen implements XMLGenerator {
  generateFacturaElectronica(factura: FacturaElectronica): string {
    const { camposFirmados: data } = factura.de;

    const mappedItems: gCamItem[] = data.camposEspecificosTipoDE.items.map(
      (item): gCamItem => ({
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

    const de: DocumentoElectronico['rDE']['DE'] = {
      Id: data.id,
      dDVId: data.digitoVerificador,
      dFecFirma: formatDate(data.fechaFirma, 'stripFractional'),
      dSisFact: 1,
      gOpeDE: {
        iTipEmi: data.operacionDE.tipoEmision,
        dDesTipEmi: descripcionTipoEmision[data.operacionDE.tipoEmision],
        dCodSeg: data.operacionDE.codigoSeguridad,
        dInfoEmi: data.operacionDE.informacionEmisor,
        dInfoFisc: data.operacionDE.informacionFisco
      },
      gTimb: {
        iTiDE: data.datosTimbrado.tipoDocumento,
        dDesTiDE: descripcionTipoDocumentoElectronico[data.datosTimbrado.tipoDocumento],
        dNumTim: data.datosTimbrado.numeroTimbrado,
        dEst: data.datosTimbrado.establecimiento.toString().padStart(3, '0'),
        dPunExp: data.datosTimbrado.puntoExpedicion.toString().padStart(3, '0'),
        dNumDoc: data.datosTimbrado.numeroDocumento.toString().padStart(7, '0'),
        dSerieNum: data.datosTimbrado.serieNumero,
        dFeIniT: formatDate(data.datosTimbrado.fechaInicioVigencia, 'YYYY-MM-DD')
      },
      gDatGralOpe: {
        dFeEmiDE: formatDate(data.datosGenerales.fechaHoraEmision, 'stripFractional')
      },
      gEmis: {
        dRucEm: data.emisor.ruc,
        dDVEmi: data.emisor.digitoVerificadorRuc,
        iTipCont: data.emisor.tipoContribuyente,
        cTipReg: data.emisor.tipoRegimen,
        dNomEmi: data.emisor.nombre,
        dNomFanEmi: data.emisor.nombreFantasia,
        dDirEmi: data.emisor.direccion,
        dNumCas: data.emisor.numeroCasa,
        dCompDir1: data.emisor.complementoDireccion1,
        dCompDir2: data.emisor.complementoDireccion2,
        cDepEmi: data.emisor.codigoDepartamento,
        dDesDepEmi: descripcionCodigoDepartamento[data.emisor.codigoDepartamento],
        cDisEmi: data.emisor.codigoDistrito,
        dDesDisEmi: data.emisor.codigoDistrito
          ? descripcionCodigoDistrito[data.emisor.codigoDistrito]
          : undefined,
        cCiuEmi: data.emisor.codigoCiudad,
        dDesCiuEmi: descripcionCodigoCiudad[data.emisor.codigoCiudad],
        dTelEmi: data.emisor.telefonoEmisor,
        dEmailE: data.emisor.emailEmisor,
        dDenSuc: data.emisor.denominacionSucursal,
        gActEco: data.emisor.actividadesEconomicas.map((v) => ({
          cActEco: v.codigo.toString(),
          dDesActEco: v.descripcion
        })),
        gRespDE: data.emisor.responsableDE
          ? {
              iTipIDRespDE: data.emisor.responsableDE.tipoDocumentoResponsable,
              dDTipIDRespDE:
                descripcionTipoDocumentoResponsable[
                  data.emisor.responsableDE.tipoDocumentoResponsable
                ],
              dNumIDRespDE: data.emisor.responsableDE.numeroDocumentoResponsable,
              dNomRespDE: data.emisor.responsableDE.nombreResponsable,
              dCarRespDE: data.emisor.responsableDE.cargoResponsable
            }
          : undefined
      },
      gDatRec: {
        iNatRec: data.receptor.naturalezaReceptor,
        iTiOpe: data.receptor.tipoOperacion,
        cPaisRec: data.receptor.codigoPais,
        dDesPaisRe: descripcionCodigoPais[data.receptor.codigoPais],
        iTiContRec: data.receptor.tipoContribuyente,
        dRucRec: data.receptor.ruc,
        dDVRec: data.receptor.digitoVerificadorRuc,
        iTipIDRec: data.receptor.tipoDocumentoIdentidad,
        dDTipIDRec: (() => {
          if (!data.receptor.tipoDocumentoIdentidad) return undefined;

          // Segun D209, si el tipo es "Otro" la descripcion puede ser cualquiera
          if (data.receptor.tipoDocumentoIdentidad === 9)
            return data.receptor.descripcionDocumentoIdentidad;

          return descripcionTipoDocumentoIdentidadReceptor[data.receptor.tipoDocumentoIdentidad];
        })(),
        dNumIDRec: data.receptor.numeroDocumentoIdentidad,
        dNomRec: data.receptor.nombre,
        dNomFanRec: data.receptor.nombreFantasia,
        dDirRec: data.receptor.direccion,
        dNumCasRec: data.receptor.numeroCasa,
        dDepRec: data.receptor.codigoDepartamento,
        dDesDepRec: data.receptor.codigoDepartamento
          ? descripcionCodigoDepartamento[data.receptor.codigoDepartamento]
          : undefined,
        dDisRec: data.receptor.codigoDistrito,
        dDesDisRec: data.receptor.codigoDistrito
          ? descripcionCodigoDistrito[data.receptor.codigoDistrito]
          : undefined,
        cCiuRec: data.receptor.codigoCiudad,
        dDesCiuRec: data.receptor.codigoCiudad
          ? descripcionCodigoCiudad[data.receptor.codigoCiudad]
          : undefined,
        dTelRec: data.receptor.telefono,
        dCelRec: data.receptor.celular,
        dEmailRec: data.receptor.email,
        dCodCliente: data.receptor.codigoCliente
      },
      gDtipDE: {
        gCamFE: {
          iIndPres: data.camposEspecificosTipoDE.camposFE.indicadorPresencia,
          dDesIndPres: (() => {
            // Segun E012, si el tipo es "Otro" la descripcion puede ser cualquiera
            if (data.camposEspecificosTipoDE.camposFE.indicadorPresencia === 9)
              return data.camposEspecificosTipoDE.camposFE.descripcionIndicadorPresencia;

            return descripcionIndicadorPresencia[
              data.camposEspecificosTipoDE.camposFE.indicadorPresencia
            ];
          })(),
          dFecEmNR: data.camposEspecificosTipoDE.camposFE.fechaTrasladoMercaderia
            ? formatDate(
                data.camposEspecificosTipoDE.camposFE.fechaTrasladoMercaderia,
                'YYYY-MM-DD'
              )
            : undefined,
          gCompPub: data.camposEspecificosTipoDE.camposFE.comprasPublicas
            ? {
                dModCont: data.camposEspecificosTipoDE.camposFE.comprasPublicas.modalidad,
                dEntCont: data.camposEspecificosTipoDE.camposFE.comprasPublicas.entidad,
                dAnoCont: data.camposEspecificosTipoDE.camposFE.comprasPublicas.año,
                dSecCont: data.camposEspecificosTipoDE.camposFE.comprasPublicas.secuencia,
                dFeCodCont: formatDate(
                  data.camposEspecificosTipoDE.camposFE.comprasPublicas
                    .fechaEmisionCodigoContratacion,
                  'YYYY-MM-DD'
                )
              }
            : undefined
        },
        gCamCond: {
          iCondOpe: data.camposEspecificosTipoDE.condicionOperacion.condicion,
          dDCondOpe:
            descripcionCondicionOperacion[
              data.camposEspecificosTipoDE.condicionOperacion.condicion
            ],
          gPaConEIni:
            data.camposEspecificosTipoDE.condicionOperacion.pagoContadoEntregaInicial?.map(
              (pago) => ({
                iTiPago: pago.tipoPago,
                dDesTiPag:
                  pago.tipoPago === 99
                    ? pago.descripcionTipoPago!
                    : descripcionTipoPago[pago.tipoPago],
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
              })
            )
          // TODO: Implementar pago credito
        },
        gCamItem: mappedItems
      },
      gTotSub: calculateGTotSub({
        items: mappedItems,
        tipoImpuesto: data.datosGenerales.operacionComercial.tipoImpuesto,
        tipoDocumento: data.datosTimbrado.tipoDocumento,
        moneda: data.datosGenerales.operacionComercial.monedaOperacion,
        condicionTipoCambio: data.datosGenerales.operacionComercial.condicionTipoCambio,
        tipoCambio: data.datosGenerales.operacionComercial.tipoCambio,
        porcentajeDescuentoGlobal: data.totales.porcentajeDescuentoGlobal
      })
    };

    const base = {
      'rDE@http://ekuatia.set.gov.py/sifen/xsd': {
        '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        '@xsi:schemaLocation': 'http://ekuatia.set.gov.py/sifen/xsd siRecepDE_v150.xsd',
        dVerFor: 150,
        DE: {
          '@id': data.id,
          ...de
        }
      }
    };

    const doc = create({ version: '1.0', encoding: 'UTF-8' }).ele(base);
    return doc.end({ prettyPrint: true });
  }
}
