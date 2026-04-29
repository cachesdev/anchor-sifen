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
import {
  mapCamposFacturaElectronicaToRaw,
  mapCondicionOperacionToRaw,
  mapItemOperacionToRaw,
  mapUsoComercialToRaw,
  mapTransporteToRaw
} from './e';
import { mapEmisorToRaw, mapOperacionComercialToRaw, mapReceptorToRaw } from './d';
import {
  formatDateOnly,
  formatDateTime,
  requireDefined,
  resolveRequiredDescription
} from './helpers';

export function mapOperacionDEToRaw(data: OperacionDE): GOpeDE {
  return {
    iTipEmi: data.tipoEmision,
    dDesTipEmi: resolveRequiredDescription(
      'tipoEmision',
      data.tipoEmision,
      descripcionTipoEmision as Record<string, string>
    ),
    dCodSeg: data.codigoSeguridad,
    dInfoEmi: data.informacionEmisor,
    dInfoFisc: data.informacionFisco
  } as GOpeDE;
}

export function mapTimbradoToRaw(data: Timbrado): GTimb {
  return {
    iTiDE: data.tipoDocumento,
    dDesTiDE: resolveRequiredDescription(
      'tipoDocumento',
      data.tipoDocumento,
      descripcionTipoDocumentoElectronico as Record<string, string>
    ),
    dNumTim: data.numeroTimbrado,
    dEst: data.establecimiento.toString().padEnd(3, '0'),
    dPunExp: data.puntoExpedicion.toString().padEnd(3, '0'),
    dNumDoc: data.numeroDocumento.toString().padEnd(7, '0'),
    dSerieNum: data.serieNumero,
    dFeIniT: requireDefined(formatDateOnly(data.fechaInicioVigencia), 'fechaInicioVigencia')
  } as GTimb;
}

export function mapDatosGeneralesOperacionToRaw(data: DatosGeneralesOperacion): GDatGralOpe {
  return {
    dFeEmiDE: requireDefined(formatDateTime(data.fechaEmisionDE), 'fechaEmisionDE'),
    gOpeCom: data.operacionComercial
      ? mapOperacionComercialToRaw(data.operacionComercial)
      : undefined,
    gEmis: mapEmisorToRaw(data.emisor),
    gDatRec: mapReceptorToRaw(data.receptor)
  } as GDatGralOpe;
}

export function mapDatosEspecificosPorTipoDEToRaw(data: DatosEspecificosPorTipoDE): GDtipDE {
  return {
    gCamFE: data.facturaElectronica
      ? mapCamposFacturaElectronicaToRaw(data.facturaElectronica)
      : undefined,
    gCamCond: data.condicionOperacion
      ? mapCondicionOperacionToRaw(data.condicionOperacion)
      : undefined,
    gCamItem: data.itemsOperacion?.map(mapItemOperacionToRaw),
    gCamEsp: data.usosComerciales ? mapUsoComercialToRaw(data.usosComerciales) : undefined,
    gTransp: data.transporte ? mapTransporteToRaw(data.transporte) : undefined
  } as GDtipDE;
}
