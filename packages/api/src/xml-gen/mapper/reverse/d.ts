import type {
  ActividadEconomica,
  Emisor,
  ObligacionesAfectadas,
  OperacionComercial,
  Receptor,
  ResponsableDE
} from '../../../sifen/types/clean/d';
import type {
  GActEco,
  GDatRec,
  GEmis,
  GOblAfe,
  GOpeCom,
  GRespDE
} from '../../../sifen/types/raw/d';
import { optionalMapper, parseOptionalBig } from './helpers';

export function mapGOblAfeToClean(data: GOblAfe): ObligacionesAfectadas {
  return {
    codigoObligacion: data.cOblAfe
  };
}

export function mapGOpeComToClean(data: GOpeCom): OperacionComercial {
  return {
    tipoTransaccion: data.iTipTra,
    tipoImpuestoAfectado: data.iTImp,
    monedaOperacion: data.cMoneOpe,
    condicionTipoCambio: data.dCondTiCam,
    tipoCambioOperacion: parseOptionalBig(data.dTiCam, 'dTiCam'),
    condicionAnticipo: data.iCondAnt,
    obligacionesAfectadas: data.gOblAfe?.map(mapGOblAfeToClean)
  };
}

export function mapGActEcoToClean(data: GActEco): ActividadEconomica {
  return {
    codigoActividadEconomica: data.cActEco,
    descripcionActividadEconomica: data.dDesActEco
  };
}

export function mapGRespDEToClean(data: GRespDE): ResponsableDE {
  return {
    tipoDocumentoIdentidadResponsableDE: data.iTipIDRespDE,
    numeroDocumentoIdentidadResponsableDE: data.dNumIDRespDE,
    nombreResponsableDE: data.dNomRespDE,
    cargoResponsableDE: data.dCarRespDE
  };
}

export function mapGEmisToClean(data: GEmis): Emisor {
  return {
    rucEmisor: data.dRucEm,
    digitoVerificadorEmisor: data.dDVEmi,
    tipoContribuyente: data.iTipCont,
    tipoRegimen: data.cTipReg,
    nombreEmisor: data.dNomEmi,
    nombreFantasiaEmi: data.dNomFanEmi,
    direccionEmision: data.dDirEmi,
    numeroCasa: data.dNumCas,
    complementoDireccion1: data.dCompDir1,
    complementoDireccion2: data.dCompDir2,
    departamentoEmision: data.cDepEmi,
    distritoEmision: data.cDisEmi,
    ciudadEmision: data.cCiuEmi,
    telefonoEmision: data.dTelEmi,
    correoElectronicoEmisor: data.dEmailE,
    denominacionSucursal: data.dDenSuc,
    actividadesEconomicas: data.gActEco.map(mapGActEcoToClean),
    responsableDE: optionalMapper(mapGRespDEToClean, data.gRespDE)
  };
}

export function mapGDatRecToClean(data: GDatRec): Receptor {
  return {
    naturalezaReceptor: data.iNatRec,
    tipoOperacion: data.iTiOpe,
    paisReceptor: data.cPaisRec,
    tipoContribuyenteReceptor: data.iTiContRec,
    rucReceptor: data.dRucRec,
    digitoVerificadorReceptor: data.dDVRec,
    tipoDocumentoIdentidadReceptor: data.iTipIDRec,
    numeroDocumentoIdentidad: data.dNumIDRec,
    nombreReceptor: data.dNomRec,
    nombreFantasiaReceptor: data.dNomFanRec,
    direccionReceptor: data.dDirRec,
    numeroCasaReceptor: data.dNumCasRec,
    departamentoReceptor: data.dDepRec,
    distritoReceptor: data.dDisRec,
    ciudadReceptor: data.cCiuRec,
    telefonoReceptor: data.dTelRec,
    celularReceptor: data.dCelRec,
    correoElectronicoReceptor: data.dEmailRec,
    codigoCliente: data.dCodCliente
  };
}
