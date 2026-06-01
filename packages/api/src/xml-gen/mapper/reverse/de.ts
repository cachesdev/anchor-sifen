import type {
  DEC,
  DatosEspecificosPorTipoDE,
  DatosGeneralesOperacion,
  DocumentoElectronicoC,
  OperacionDE,
  Timbrado
} from '../../../sifen/types/clean/de';
import {
  tipoDocumentoElectronico,
  type TipoDocumentoElectronicoLabel
} from '../../../sifen/types/enums';
import type {
  DE,
  DocumentoElectronico,
  GDatGralOpe,
  GDtipDE,
  GOpeDE,
  GTimb
} from '../../../sifen/types/raw/de';
import { mapGDatRecToClean, mapGEmisToClean, mapGOpeComToClean } from './d';
import {
  mapGCamAEToClean,
  mapGCamCondToClean,
  mapGCamEspToClean,
  mapGCamFEToClean,
  mapGCamItemToClean,
  mapGCamNCDEToClean,
  mapGCamNREToClean,
  mapGTranspToClean
} from './e';
import { mapGTotSubToClean } from './f';
import { mapGCamGenToClean } from './g';
import { mapGCamDEAsocToClean } from './h';
import { optionalMapper, parsePaddedNumber, parseRawDate } from './helpers';

const tipoDocumentoLabelsByValue = Object.fromEntries(
  Object.entries(tipoDocumentoElectronico).map(([label, value]) => [value, label])
) as Record<number, TipoDocumentoElectronicoLabel>;

export function mapDocumentoElectronicoToClean(data: DocumentoElectronico): DocumentoElectronicoC {
  return {
    rDE: {
      versionFormato: data.rDE.dVerFor,
      DE: mapDEToClean(data.rDE.DE)
    }
  };
}

export function mapDEToClean(data: DE): DEC {
  const datosGeneralesOperacion = mapGDatGralOpeToClean(data.gDatGralOpe);
  const timbrado = mapGTimbToClean(data.gTimb);
  const operacionDE = mapGOpeDEToClean(data.gOpeDE);

  return {
    id_cdc: buildCDCFromRaw(data),
    tipoDE: getTipoDocumentoLabel(data.gTimb.iTiDE),
    digitoVerificadorId: data.dDVId,
    fechaFirma: parseRawDate(data.dFecFirma, 'date-time', 'dFecFirma'),
    operacionDE,
    timbrado,
    datosGeneralesOperacion,
    datosEspecificosPorTipoDE: mapGDtipDEToClean(data.gDtipDE),
    subtotalesTotales: optionalMapper(mapGTotSubToClean, data.gTotSub),
    camposUsoGeneral: optionalMapper(mapGCamGenToClean, data.gCamGen),
    camposDocumentoElectronicoAsociado: optionalMapper(mapGCamDEAsocToClean, data.gCamDEAsoc)
  };
}

export function mapGOpeDEToClean(data: GOpeDE): OperacionDE {
  return {
    tipoEmision: data.iTipEmi,
    codigoSeguridad: parsePaddedNumber(data.dCodSeg, 'dCodSeg'),
    informacionEmisor: data.dInfoEmi,
    informacionFisco: data.dInfoFisc
  };
}

export function mapGTimbToClean(data: GTimb): Timbrado {
  return {
    tipoDocumento: data.iTiDE,
    numeroTimbrado: data.dNumTim,
    establecimiento: parsePaddedNumber(data.dEst, 'dEst'),
    puntoExpedicion: parsePaddedNumber(data.dPunExp, 'dPunExp'),
    numeroDocumento: parsePaddedNumber(data.dNumDoc, 'dNumDoc'),
    serieNumero: data.dSerieNum,
    fechaInicioVigencia: parseRawDate(data.dFeIniT, 'date', 'dFeIniT')
  };
}

export function mapGDatGralOpeToClean(data: GDatGralOpe): DatosGeneralesOperacion {
  return {
    fechaEmisionDE: parseRawDate(data.dFeEmiDE, 'date-time', 'dFeEmiDE'),
    operacionComercial: optionalMapper(mapGOpeComToClean, data.gOpeCom),
    emisor: mapGEmisToClean(data.gEmis),
    receptor: mapGDatRecToClean(data.gDatRec)
  };
}

export function mapGDtipDEToClean(data: GDtipDE): DatosEspecificosPorTipoDE {
  return {
    facturaElectronica: optionalMapper(mapGCamFEToClean, data.gCamFE),
    autofacturaElectronica: optionalMapper(mapGCamAEToClean, data.gCamAE),
    notaCreditoDebitoElectronica: optionalMapper(mapGCamNCDEToClean, data.gCamNCDE),
    notaRemisionElectronica: optionalMapper(mapGCamNREToClean, data.gCamNRE),
    condicionOperacion: optionalMapper(mapGCamCondToClean, data.gCamCond),
    itemsOperacion: data.gCamItem.map(mapGCamItemToClean),
    usosComerciales: optionalMapper(mapGCamEspToClean, data.gCamEsp),
    transporte: optionalMapper(mapGTranspToClean, data.gTransp)
  };
}

function buildCDCFromRaw(data: DE): string {
  const fechaEmision = data.gDatGralOpe.dFeEmiDE.slice(0, 10).replaceAll('-', '');

  return (
    String(data.gTimb.iTiDE).padStart(2, '0') +
    data.gDatGralOpe.gEmis.dRucEm.padStart(8, '0') +
    String(data.gDatGralOpe.gEmis.dDVEmi) +
    data.gTimb.dEst.padStart(3, '0') +
    data.gTimb.dPunExp.padStart(3, '0') +
    data.gTimb.dNumDoc.padStart(7, '0') +
    String(data.gDatGralOpe.gEmis.iTipCont) +
    fechaEmision +
    String(data.gOpeDE.iTipEmi) +
    data.gOpeDE.dCodSeg.padStart(9, '0') +
    String(data.dDVId)
  );
}

function getTipoDocumentoLabel(value: number): TipoDocumentoElectronicoLabel {
  const label = tipoDocumentoLabelsByValue[value];
  if (label === undefined) {
    throw new Error(`Tipo de documento electronico invalido para iTiDE: ${value}`);
  }

  return label;
}
