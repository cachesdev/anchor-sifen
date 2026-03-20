import type { FacturaElectronica } from '../sifen/types/factura';
import { create } from 'xmlbuilder2';
import type { DocumentoElectronico } from '../sifen/types/raw/de';
import { descripcionTipoEmision } from '../sifen/types';
import {
  descripcionCondicionAnticipo,
  descripcionTipoDocumentoElectronico,
  descripcionTipoImpuesto,
  descripcionTipoTransaccion
} from '../sifen/types/enums';
import { DateTime } from 'luxon';
import { codigoMoneda } from '../gen/iso4217';

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

export class XMLGen {
  generateFacturaElectronica(factura: FacturaElectronica): string {
    const { camposFirmados: data } = factura.de;

    // FIXME gran cantidad de asserts inseguros
    const de: DocumentoElectronico['rDE']['DE'] = {
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
        dFeEmiDE: formatDate(data.datosGenerales.fechaHoraEmision, 'stripFractional'),
        gOpeCom: {
          iTipTra: data.datosGenerales.operacionComercial.tipoTransaccion,
          dDesTipTra:
            descripcionTipoTransaccion[data.datosGenerales.operacionComercial.tipoTransaccion!],
          iTImp: data.datosGenerales.operacionComercial.tipoImpuesto,
          dDesTImp: descripcionTipoImpuesto[data.datosGenerales.operacionComercial.tipoImpuesto],
          cMoneOpe: data.datosGenerales.operacionComercial.monedaOperacion,
          dDesMoneOpe: codigoMoneda[data.datosGenerales.operacionComercial.monedaOperacion],
          dCondTiCam: data.datosGenerales.operacionComercial.condicionTipoCambio,
          dTiCam: data.datosGenerales.operacionComercial.tipoCambio,
          iCondAnt: data.datosGenerales.operacionComercial.condicionAnticipo,
          dDesCondAnt:
            descripcionCondicionAnticipo[data.datosGenerales.operacionComercial.condicionAnticipo!]
        }
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

    // Use total from totals if available, otherwise calculate from items
    // const totalGeneralOperacion =
    //   data.de.camposFirmados.totales?.totalGeneralOperacion ||
    //   data.de.camposFirmados.items.reduce((total, item) => total + item.precioTotal, 0);

    // const docTemp = create({ encoding: 'UTF-8' })
    //   .ele('rEnviDe', {
    //     xmlns: 'http://ekuatia.set.gov.py/sifen/xsd',
    //     'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    //     'xsi:schemaLocation': 'http://ekuatia.set.gov.py/sifen/xsd siRecepDE_v150.xsd'
    //   })
    //   .ele('dVerFor')
    //   .txt(data.de.versionFormato.toString())
    //   .up()
    //   .ele('dVerProt')
    //   .txt('100')
    //   .up()
    //   .ele('dGH')
    //   .ele('iSis')
    //   .txt('1')
    //   .up()
    //   .ele('dGH')
    //   .txt('1')
    //   .up()
    //   .ele('cTrans')
    //   .txt('1')
    //   .up()
    //   .ele('dFeEmi')
    //   .txt(data.de.camposFirmados.datosGenerales.fechaHoraEmision)
    //   .up()
    //   .ele('mtoTot')
    //   .txt(totalGeneralOperacion.toString())
    //   .up()
    //   .ele('cDC')
    //   .txt(data.de.camposFirmados.id)
    //   .up()
    //   .up()
    //   .ele('gDatGralOpe')
    //   .ele('dFeEmi')
    //   .txt(data.de.camposFirmados.datosGenerales.fechaHoraEmision)
    //   .up()
    //   .ele('iTiDE')
    //   .txt('1')
    //   .up()
    //   .ele('dNumDoc')
    //   .txt('001-001-00000001')
    //   .up()
    //   .ele('dPtoFac')
    //   .txt('001')
    //   .up()
    //   .ele('cSuc')
    //   .txt('001')
    //   .up()
    //   .ele('iTipTra')
    //   .txt('1')
    //   .up()
    //   .ele('cCond')
    //   .txt('1')
    //   .up()
    //   .ele('iTipMon')
    //   .txt('1')
    //   .up()
    //   .ele('mtoTotGralOpe')
    //   .txt(totalGeneralOperacion.toString())
    //   .up()
    //   .up()
    //   .ele('gEmis')
    //   .ele('iTiEmi')
    //   .txt('1')
    //   .up()
    //   .ele('cRucEm')
    //   .txt(data.de.camposFirmados.emisor.ruc)
    //   .up()
    //   .ele('dDVEmi')
    //   .txt(data.de.camposFirmados.emisor.digitoVerificadorRuc.toString())
    //   .up()
    //   .ele('cTipReg')
    //   .txt((data.de.camposFirmados.emisor.tipoRegimen || 1).toString())
    //   .up()
    //   .ele('dNomEmi')
    //   .txt(data.de.camposFirmados.emisor.nombre)
    //   .up()
    //   .ele('cTipCont')
    //   .txt(data.de.camposFirmados.emisor.tipoContribuyente.toString())
    //   .up()
    //   .ele('dDirEmi')
    //   .txt(data.de.camposFirmados.emisor.direccion)
    //   .up()
    //   .ele('cCiudEmi')
    //   .txt(data.de.camposFirmados.emisor.descripcionCiudad)
    //   .up()
    //   .ele('cPaisEmi')
    //   .txt('PY')
    //   .up()
    //   .ele('cTelEmi')
    //   .txt(data.de.camposFirmados.emisor.numeroCasa.toString())
    //   .up()
    //   .ele('cEmailEmi')
    //   .txt('email@example.com')
    //   .up()
    //   .up()
    //   .ele('DE', { Id: data.de.camposFirmados.id })
    //   .ele('dVerFor')
    //   .txt(data.de.versionFormato.toString())
    //   .up()
    //   .ele('iTiDE')
    //   .txt('1')
    //   .up()
    //   .ele('dNumDoc')
    //   .txt('001-001-00000001')
    //   .up()
    //   .ele('dPtoFac')
    //   .txt('001')
    //   .up()
    //   .ele('dSeg')
    //   .txt('FAC')
    //   .up()
    //   .ele('dFecEmi')
    //   .txt(data.de.camposFirmados.datosGenerales.fechaHoraEmision.substring(0, 10))
    //   .up()
    //   .ele('iMon')
    //   .txt('1')
    //   .up()
    //   .ele('mtoTotGralOpe')
    //   .txt(totalGeneralOperacion.toString())
    //   .up()
    //   .ele('gDatGralOpe')
    //   .ele('dFeEmi')
    //   .txt(data.de.camposFirmados.datosGenerales.fechaHoraEmision)
    //   .up()
    //   .ele('iTiDE')
    //   .txt('1')
    //   .up()
    //   .ele('dNumDoc')
    //   .txt('001-001-00000001')
    //   .up()
    //   .ele('dPtoFac')
    //   .txt('001')
    //   .up()
    //   .ele('cSuc')
    //   .txt('001')
    //   .up()
    //   .ele('iTipTra')
    //   .txt('1')
    //   .up()
    //   .ele('cCond')
    //   .txt('1')
    //   .up()
    //   .ele('iTipMon')
    //   .txt('1')
    //   .up()
    //   .ele('mtoTotGralOpe')
    //   .txt(totalGeneralOperacion.toString())
    //   .up()
    //   .up()
    //   .ele('gEmis')
    //   .ele('iTiEmi')
    //   .txt('1')
    //   .up()
    //   .ele('cRucEm')
    //   .txt(data.de.camposFirmados.emisor.ruc)
    //   .up()
    //   .ele('dDVEmi')
    //   .txt(data.de.camposFirmados.emisor.digitoVerificadorRuc.toString())
    //   .up()
    //   .ele('cTipReg')
    //   .txt((data.de.camposFirmados.emisor.tipoRegimen || 1).toString())
    //   .up()
    //   .ele('dNomEmi')
    //   .txt(data.de.camposFirmados.emisor.nombre)
    //   .up()
    //   .ele('cTipCont')
    //   .txt(data.de.camposFirmados.emisor.tipoContribuyente.toString())
    //   .up()
    //   .ele('dDirEmi')
    //   .txt(data.de.camposFirmados.emisor.direccion)
    //   .up()
    //   .ele('cCiudEmi')
    //   .txt(data.de.camposFirmados.emisor.descripcionCiudad)
    //   .up()
    //   .ele('cPaisEmi')
    //   .txt('PY')
    //   .up()
    //   .ele('cTelEmi')
    //   .txt(data.de.camposFirmados.emisor.numeroCasa.toString())
    //   .up()
    //   .ele('cEmailEmi')
    //   .txt('email@example.com')
    //   .up()
    //   .up()
    //   .ele('gDatRec')
    //   .ele('iTiRec')
    //   .txt(data.de.camposFirmados.receptor?.tipoDocumentoIdentidad.toString() || '1')
    //   .up()
    //   .ele('cIDRec')
    //   .txt(data.de.camposFirmados.receptor?.numeroDocumentoIdentidad || '')
    //   .up()
    //   .ele('dDVRec')
    //   .txt((data.de.camposFirmados.receptor?.digitoVerificador || 0).toString())
    //   .up()
    //   .ele('dNomRec')
    //   .txt(data.de.camposFirmados.receptor?.nombre || '')
    //   .up()
    //   .ele('cPaisRec')
    //   .txt('PY')
    //   .up()
    //   .ele('cCiudRec')
    //   .txt(data.de.camposFirmados.receptor?.descripcionCiudad || 'ASUNCION')
    //   .up()
    //   .ele('dDirRec')
    //   .txt(data.de.camposFirmados.receptor?.direccion || '')
    //   .up()
    //   .ele('cTelRec')
    //   .txt((data.de.camposFirmados.receptor?.numeroCasa || 0).toString())
    //   .up()
    //   .ele('cEmailRec')
    //   .txt('email@example.com')
    //   .up()
    //   .up()
    //   .ele('gDtipDE')
    //   .ele('dDesTipDE')
    //   .txt('Factura Electrónica')
    //   .up()
    //   .up()
    //   .ele('gCamItem')
    //   .ele('gItem')
    //   .ele('dCodInt')
    //   .txt('001')
    //   .up()
    //   .ele('dDesProSer')
    //   .txt(data.de.camposFirmados.items[0]?.descripcion || '')
    //   .up()
    //   .ele('cUniMed')
    //   .txt(data.de.camposFirmados.items[0]?.codigoUnidadMedida.toString() || '1')
    //   .up()
    //   .ele('dCantProSer')
    //   .txt(data.de.camposFirmados.items[0]?.cantidad.toString() || '0')
    //   .up()
    //   .ele('dPUniProSer')
    //   .txt(data.de.camposFirmados.items[0]?.precioUnitario.toString() || '0')
    //   .up()
    //   .ele('dTotBruOpeItem')
    //   .txt(data.de.camposFirmados.items[0]?.precioTotal.toString() || '0')
    //   .up()
    //   .ele('dTotOpeItem')
    //   .txt(data.de.camposFirmados.items[0]?.precioTotal.toString() || '0')
    //   .up()
    //   .up()
    //   .up()
    //   .up();
  }
}
