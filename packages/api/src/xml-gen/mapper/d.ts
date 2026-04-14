import type {
  ActividadEconomica,
  Emisor,
  ObligacionesAfectadas,
  Receptor,
  ResponsableDE
} from '../../sifen/types/clean/d';
import type { OperacionComercial_FE } from '../../sifen/types/factura-electronica';
import {
  descripcionCondicionAnticipo,
  descripcionTipoDocumentoReceptor,
  descripcionTipoDocumentoResponsableDE,
  descripcionTipoImpuestoAfectado,
  descripcionTipoObligacion,
  descripcionTipoTransaccion
} from '../../sifen/types/enums';
import type { GActEco, GDatRec, GEmis, GOblAfe, GOpeCom, GRespDE } from '../../sifen/types/raw/d';
import {
  parseRuc,
  requireDefined,
  resolveCityDescription,
  resolveCountryDescription,
  resolveCurrencyDescription,
  resolveDepartmentDescription,
  resolveDistrictDescription,
  resolveOptionalDescription,
  resolveRequiredDescription,
  optionalBigToRawDecimal,
  resolveOptionalNumericDv,
  resolveRequiredNumericDv
} from './helpers';

function normalizeOptionalRuc(rawRuc?: string): string | undefined {
  if (!rawRuc) {
    return undefined;
  }

  return parseRuc(rawRuc).ruc;
}

export function mapObligacionAfectadaToRaw(data: ObligacionesAfectadas): GOblAfe {
  return {
    cOblAfe: data.codigoObligacion,
    dDesOblAfe: resolveRequiredDescription(
      'codigoObligacion',
      data.codigoObligacion,
      descripcionTipoObligacion as Record<string, string>
    )
  } as GOblAfe;
}

export function mapOperacionComercialToRaw(data: OperacionComercial_FE): GOpeCom {
  return {
    iTipTra: data.tipoTransaccion,
    dDesTipTra: resolveOptionalDescription(
      data.tipoTransaccion,
      descripcionTipoTransaccion as Record<string, string>
    ),
    iTImp: data.tipoImpuestoAfectado,
    dDesTImp: resolveRequiredDescription(
      'tipoImpuestoAfectado',
      data.tipoImpuestoAfectado,
      descripcionTipoImpuestoAfectado as Record<string, string>
    ),
    cMoneOpe: data.monedaOperacion,
    dDesMoneOpe: resolveCurrencyDescription(data.monedaOperacion),
    dCondTiCam: data.condicionTipoCambio,
    dTiCam: optionalBigToRawDecimal(data.tipoCambioOperacion, 4),
    iCondAnt: data.condicionAnticipo,
    dDesCondAnt: resolveOptionalDescription(
      data.condicionAnticipo,
      descripcionCondicionAnticipo as Record<string, string>
    ),
    gOblAfe: data.obligacionesAfectadas?.map(mapObligacionAfectadaToRaw)
  } as GOpeCom;
}

export function mapActividadEconomicaToRaw(data: ActividadEconomica): GActEco {
  return {
    cActEco: data.codigoActividadEconomica,
    dDesActEco: data.descripcionActividadEconomica
  } as GActEco;
}

export function mapResponsableDEToRaw(data: ResponsableDE): GRespDE {
  return {
    iTipIDRespDE: data.tipoDocumentoIdentidadResponsableDE,
    dDTipIDRespDE: resolveRequiredDescription(
      'tipoDocumentoIdentidadResponsableDE',
      data.tipoDocumentoIdentidadResponsableDE,
      descripcionTipoDocumentoResponsableDE as Record<string, string>
    ),
    dNumIDRespDE: data.numeroDocumentoIdentidadResponsableDE,
    dNomRespDE: data.nombreResponsableDE,
    dCarRespDE: data.cargoResponsableDE
  } as GRespDE;
}

export function mapEmisorToRaw(data: Emisor): GEmis {
  const parsedRuc = parseRuc(data.rucEmisor);

  return {
    dRucEm: parsedRuc.ruc,
    dDVEmi: resolveRequiredNumericDv(data.digitoVerificadorEmisor, data.rucEmisor, 'emisor'),
    iTipCont: data.tipoContribuyente,
    cTipReg: data.tipoRegimen,
    dNomEmi: data.nombreEmisor,
    dNomFanEmi: data.nombreFantasiaEmi,
    dDirEmi: data.direccionEmision,
    dNumCas: data.numeroCasa,
    dCompDir1: data.complementoDireccion1,
    dCompDir2: data.complementoDireccion2,
    cDepEmi: data.departamentoEmision,
    dDesDepEmi: resolveDepartmentDescription(data.departamentoEmision),
    cDisEmi: data.distritoEmision,
    dDesDisEmi: resolveDistrictDescription(data.distritoEmision),
    cCiuEmi: data.ciudadEmision,
    dDesCiuEmi: requireDefined(resolveCityDescription(data.ciudadEmision), 'ciudadEmision'),
    dTelEmi: data.telefonoEmision,
    dEmailE: data.correoElectronicoEmisor,
    dDenSuc: data.denominacionSucursal,
    gActEco: data.actividadesEconomicas.map(mapActividadEconomicaToRaw),
    gRespDE: data.responsableDE ? mapResponsableDEToRaw(data.responsableDE) : undefined
  } as GEmis;
}

export function mapReceptorToRaw(data: Receptor): GDatRec {
  return {
    iNatRec: data.naturalezaReceptor,
    iTiOpe: data.tipoOperacion,
    cPaisRec: data.paisReceptor,
    dDesPaisRe: resolveCountryDescription(data.paisReceptor),
    iTiContRec: data.tipoContribuyenteReceptor,
    dRucRec: normalizeOptionalRuc(data.rucReceptor),
    dDVRec: resolveOptionalNumericDv(data.digitoVerificadorReceptor, data.rucReceptor),
    iTipIDRec: data.tipoDocumentoIdentidadReceptor,
    dDTipIDRec: resolveOptionalDescription(
      data.tipoDocumentoIdentidadReceptor,
      descripcionTipoDocumentoReceptor as Record<string, string>
    ),
    dNumIDRec: data.numeroDocumentoIdentidad,
    dNomRec: data.nombreReceptor,
    dNomFanRec: data.nombreFantasiaReceptor,
    dDirRec: data.direccionReceptor,
    dNumCasRec: data.numeroCasaReceptor,
    dDepRec: data.departamentoReceptor,
    dDesDepRec:
      data.departamentoReceptor !== undefined
        ? resolveDepartmentDescription(data.departamentoReceptor)
        : undefined,
    dDisRec: data.distritoReceptor,
    dDesDisRec: resolveDistrictDescription(data.distritoReceptor),
    cCiuRec: data.ciudadReceptor,
    dDesCiuRec: resolveCityDescription(data.ciudadReceptor),
    dTelRec: data.telefonoReceptor,
    dCelRec: data.celularReceptor,
    dEmailRec: data.correoElectronicoReceptor,
    dCodCliente: data.codigoCliente
  } as GDatRec;
}
