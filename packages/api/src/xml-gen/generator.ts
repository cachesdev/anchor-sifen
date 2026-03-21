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
  descripcionCondicionCredito,
  descripcionTipoDocumentoResponsable,
  descripcionTipoDocumentoIdentidadReceptor
} from '../sifen/types/enums';
import { DateTime } from 'luxon';
import { codigoMoneda } from '../gen/iso4217';
import { descripcionCodigoDepartamento } from '../gen/departamentos';
import { descripcionCodigoDistrito } from '../gen/distritos';
import { descripcionCodigoCiudad } from '../gen/ciudades';
import { descripcionCodigoPais } from '../gen/paises';

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

export class XMLGen implements XMLGenerator {
  generateFacturaElectronica(factura: FacturaElectronica): string {
    const { camposFirmados: data } = factura.de;

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
        // INFO: Solo para notas de remision COO2=7
        // gOpeCom: {
        //   iTipTra: data.datosGenerales.operacionComercial.tipoTransaccion,
        //   dDesTipTra: data.datosGenerales.operacionComercial.tipoTransaccion
        //     ? descripcionTipoTransaccion[data.datosGenerales.operacionComercial.tipoTransaccion]
        //     : undefined,
        //   iTImp: data.datosGenerales.operacionComercial.tipoImpuesto,
        //   dDesTImp: descripcionTipoImpuesto[data.datosGenerales.operacionComercial.tipoImpuesto],
        //   cMoneOpe: data.datosGenerales.operacionComercial.monedaOperacion,
        //   dDesMoneOpe: codigoMoneda[data.datosGenerales.operacionComercial.monedaOperacion],
        //   dCondTiCam: data.datosGenerales.operacionComercial.condicionTipoCambio,
        //   dTiCam: data.datosGenerales.operacionComercial.tipoCambio,
        //   iCondAnt: data.datosGenerales.operacionComercial.condicionAnticipo,
        //   dDesCondAnt: data.datosGenerales.operacionComercial.condicionAnticipo
        //     ? descripcionCondicionAnticipo[data.datosGenerales.operacionComercial.condicionAnticipo]
        //     : undefined
        // }
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
      gCamFE: {
        iIndPres: data.camposFE.indicadorPresencia,
        dDesIndPres: descripcionIndicadorPresencia[data.camposFE.indicadorPresencia],
        dFecEmNR: data.camposFE.fechaTrasladoMercaderia,
        gCompPub: data.camposFE.comprasPublicas
          ? {
              dModCont: data.camposFE.comprasPublicas.modalidad,
              dEntCont: data.camposFE.comprasPublicas.entidad,
              dAnoCont: data.camposFE.comprasPublicas.año,
              dSecCont: data.camposFE.comprasPublicas.secuencia,
              dFeCodCont: data.camposFE.comprasPublicas.fechaEmisionCodigoContratacion
            }
          : undefined
      },
      gCamCond: {
        iCondOpe: data.condicionOperacion.condicion,
        dDCondOpe: descripcionCondicionOperacion[data.condicionOperacion.condicion],
        gPaConEIni: data.condicionOperacion.pagoContadoEntregaInicial?.map((pago) => ({
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
        })),
        gPagCred: data.condicionOperacion.pagoCredito
          ? {
              iCondCred: data.condicionOperacion.pagoCredito.condicionCredito,
              dDCondCred:
                descripcionCondicionCredito[data.condicionOperacion.pagoCredito.condicionCredito],
              dPlazoCre: data.condicionOperacion.pagoCredito.plazoCredito,
              dCuotas: data.condicionOperacion.pagoCredito.cantidadCuotas,
              dMonEnt: data.condicionOperacion.pagoCredito.montoEntregaInicial,
              gCuotas: data.condicionOperacion.pagoCredito.cuotas?.map((cuota) => ({
                cMoneCuo: cuota.monedaCuota,
                dDMoneCuo: codigoMoneda[cuota.monedaCuota],
                dMonCuota: cuota.montoCuota,
                dVencCuo: cuota.vencimientoCuota
              }))
            }
          : undefined
      },
      gCamItem: data.items.map((item) => ({
        dCodInt: item.codigoInterno || '',
        dDesProSer: item.descripcion,
        cUniMed: item.codigoUnidadMedida,
        dDesUniMed: item.descripcionUnidadMedida,
        dCantProSer: item.cantidad,
        gValorItem: {
          dPUniProSer: item.precioUnitario,
          dTotBruOpeItem: item.precioTotal,
          gValorRestaItem: {
            dTotOpeItem: item.totalGeneralItem
          }
        }
      })),
      gTotSub: {
        dSubExe: data.totales.subtotalExento,
        dSubExo: data.totales.subtotalExonerado,
        dSub5: data.totales.subtotalIVA5,
        dSub10: data.totales.subtotalIVA10,
        dTotOpe: data.totales.totalBrutoOperacion,
        dTotDesc: data.totales.totalDescuentos || 0,
        dTotDescGlotem: 0, // TODO: Calculate from items
        dTotAntItem: 0, // TODO: Calculate from items
        dTotAnt: 0, // TODO: Calculate from items
        dPorcDescTotal: data.totales.porcentajeDescuentoGlobal || 0,
        dDescTotal: 0, // TODO: Calculate from items and global discount
        dAnticipo: 0, // TODO: Calculate from items
        dRedon: 0, // TODO: Calculate rounding
        dComi: undefined, // TODO: Add commission field to TotalesOperacion
        dTotGralOpe: data.totales.totalGeneralOperacion,
        dIVA5: undefined, // TODO: Calculate from items with IVA 5%
        dIVA10: undefined, // TODO: Calculate from items with IVA 10%
        dLiqTotIVA5: undefined, // TODO: Calculate with rounding
        dLiqTotIVA10: undefined, // TODO: Calculate with rounding
        dIVAComi: undefined, // TODO: Calculate from commission
        dTotIVA: data.totales.totalIVA,
        dBaseGrav5: undefined, // TODO: Calculate from items with IVA 5%
        dBaseGrav10: undefined, // TODO: Calculate from items with IVA 10%
        dTBasGraIVA: data.totales.totalGravada,
        dTotalGs: data.totales.totalGeneralGuaranies,
        dTotCom: undefined // TODO: Calculate total + commission
      }
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
