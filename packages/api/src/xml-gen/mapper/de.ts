import type {
  DatosEspecificosPorTipoDE,
  DatosGeneralesOperacion,
  OperacionDE,
  Timbrado
} from '../../sifen/types/clean/de';
import {
  descripcionTipoDocumentoElectronico,
  descripcionTipoEmision
} from '../../sifen/types/enums';
import type { GDatGralOpe, GDtipDE, GOpeDE, GTimb } from '../../sifen/types/raw/de';
import { asLiteral } from '../../sifen/types/union';
import {
  mapAutofacturaElectronicaToRaw,
  mapCamposFacturaElectronicaToRaw,
  mapCondicionOperacionToRaw,
  mapItemOperacionToRaw,
  mapNotaCreditoDebitoElectronicaToRaw,
  mapNotaRemisionElectronicaToRaw,
  mapUsoComercialToRaw,
  mapTransporteToRaw
} from './e';
import { mapEmisorToRaw, mapOperacionComercialToRaw, mapReceptorToRaw } from './d';
import { formatDate, optionalMapper } from './helpers';

export function mapOperacionDEToRaw(data: OperacionDE): GOpeDE {
  const tipoEmision = asLiteral(data.tipoEmision);

  return {
    iTipEmi: tipoEmision,
    dDesTipEmi: descripcionTipoEmision[tipoEmision],
    dCodSeg: data.codigoSeguridad,
    dInfoEmi: data.informacionEmisor,
    dInfoFisc: data.informacionFisco
  };
}

export function mapTimbradoToRaw(data: Timbrado): GTimb {
  const tipoDocumento = asLiteral(data.tipoDocumento);

  return {
    iTiDE: tipoDocumento,
    dDesTiDE: descripcionTipoDocumentoElectronico[tipoDocumento],
    dNumTim: data.numeroTimbrado,
    dEst: data.establecimiento.toString().padStart(3, '0'),
    dPunExp: data.puntoExpedicion.toString().padStart(3, '0'),
    dNumDoc: data.numeroDocumento.toString().padStart(7, '0'),
    dSerieNum: data.serieNumero,
    dFeIniT: formatDate(data.fechaInicioVigencia, 'date')
  };
}

export function mapDatosGeneralesOperacionToRaw(data: DatosGeneralesOperacion): GDatGralOpe {
  return {
    dFeEmiDE: formatDate(data.fechaEmisionDE, 'date-time'),
    gOpeCom: optionalMapper(mapOperacionComercialToRaw, data.operacionComercial),
    gEmis: mapEmisorToRaw(data.emisor),
    gDatRec: mapReceptorToRaw(data.receptor)
  };
}

export function mapDatosEspecificosPorTipoDEToRaw(data: DatosEspecificosPorTipoDE): GDtipDE {
  return {
    gCamFE: optionalMapper(mapCamposFacturaElectronicaToRaw, data.facturaElectronica),
    gCamAE: optionalMapper(mapAutofacturaElectronicaToRaw, data.autofacturaElectronica),
    gCamNCDE: optionalMapper(
      mapNotaCreditoDebitoElectronicaToRaw,
      data.notaCreditoDebitoElectronica
    ),
    gCamNRE: optionalMapper(mapNotaRemisionElectronicaToRaw, data.notaRemisionElectronica),
    gCamCond: optionalMapper(mapCondicionOperacionToRaw, data.condicionOperacion),
    gCamItem: data.itemsOperacion?.map(mapItemOperacionToRaw),
    gCamEsp: optionalMapper(mapUsoComercialToRaw, data.usosComerciales),
    gTransp: optionalMapper(mapTransporteToRaw, data.transporte)
  };
}
