import type {
  ActividadEconomica,
  Emisor,
  ObligacionesAfectadas,
  OperacionComercial,
  Receptor,
  ResponsableDE
} from '../../sifen/types/clean/d';
import {
  descripcionCondicionAnticipo,
  descripcionTipoDocumentoReceptor,
  descripcionTipoDocumentoResponsableDE,
  descripcionTipoImpuestoAfectado,
  descripcionTipoObligacion,
  descripcionTipoTransaccion
} from '../../sifen/types/enums';
import type { GActEco, GDatRec, GEmis, GOblAfe, GOpeCom, GRespDE } from '../../sifen/types/raw/d';
import { asLiteral } from '../../sifen/types/union';
import { descripcionCodigoCiudad } from '../../gen/ciudades';
import { descripcionCodigoDepartamento } from '../../gen/departamentos';
import { descripcionCodigoDistrito } from '../../gen/distritos';
import { codigoMoneda } from '../../gen/monedas';
import { descripcionCodigoPais } from '../../gen/paises';
import { optionalBigToFixed, optionalMapper } from './helpers';
import { extraerRuc } from '../ruc';

export function mapObligacionAfectadaToRaw(data: ObligacionesAfectadas): GOblAfe {
  const codigoObligacion = asLiteral(data.codigoObligacion);
  return {
    cOblAfe: codigoObligacion,
    dDesOblAfe: descripcionTipoObligacion[codigoObligacion]
  };
}

export function mapOperacionComercialToRaw(data: OperacionComercial): GOpeCom {
  const monedaOperacion = asLiteral(data.monedaOperacion);
  const tipoImpuestoAfectado = asLiteral(data.tipoImpuestoAfectado);
  const tipoTransaccion = asLiteral(data.tipoTransaccion);
  const condicionAnticipo = asLiteral(data.condicionAnticipo);

  return {
    iTipTra: tipoTransaccion,
    dDesTipTra:
      tipoTransaccion !== undefined ? descripcionTipoTransaccion[tipoTransaccion] : undefined,
    iTImp: tipoImpuestoAfectado,
    dDesTImp: descripcionTipoImpuestoAfectado[tipoImpuestoAfectado],
    cMoneOpe: monedaOperacion,
    dDesMoneOpe: codigoMoneda[monedaOperacion],
    dCondTiCam: asLiteral(data.condicionTipoCambio),
    dTiCam: optionalBigToFixed(data.tipoCambioOperacion, 4),
    iCondAnt: condicionAnticipo,
    dDesCondAnt:
      condicionAnticipo !== undefined ? descripcionCondicionAnticipo[condicionAnticipo] : undefined,
    gOblAfe: optionalMapper((v) => v.map(mapObligacionAfectadaToRaw), data.obligacionesAfectadas)
  };
}

export function mapActividadEconomicaToRaw(data: ActividadEconomica): GActEco {
  return {
    cActEco: data.codigoActividadEconomica,
    dDesActEco: data.descripcionActividadEconomica
  };
}

export function mapResponsableDEToRaw(data: ResponsableDE): GRespDE {
  const tipoDocumentoIdentidadResponsableDE = asLiteral(data.tipoDocumentoIdentidadResponsableDE);
  return {
    iTipIDRespDE: tipoDocumentoIdentidadResponsableDE,
    dDTipIDRespDE: descripcionTipoDocumentoResponsableDE[tipoDocumentoIdentidadResponsableDE],
    dNumIDRespDE: data.numeroDocumentoIdentidadResponsableDE,
    dNomRespDE: data.nombreResponsableDE,
    dCarRespDE: data.cargoResponsableDE
  };
}

export function mapEmisorToRaw(data: Emisor): GEmis {
  const departamentoEmision = asLiteral(data.departamentoEmision);
  const ciudadEmision = asLiteral(data.ciudadEmision);
  const distritoEmision = asLiteral(data.distritoEmision);

  return {
    dRucEm: extraerRuc(data.rucEmisor),
    dDVEmi: data.digitoVerificadorEmisor!,
    iTipCont: asLiteral(data.tipoContribuyente),
    cTipReg: data.tipoRegimen,
    dNomEmi: data.nombreEmisor,
    dNomFanEmi: data.nombreFantasiaEmi,
    dDirEmi: data.direccionEmision,
    dNumCas: data.numeroCasa,
    dCompDir1: data.complementoDireccion1,
    dCompDir2: data.complementoDireccion2,
    cDepEmi: departamentoEmision,
    dDesDepEmi: descripcionCodigoDepartamento[departamentoEmision],
    cDisEmi: distritoEmision,
    dDesDisEmi:
      distritoEmision !== undefined ? descripcionCodigoDistrito[distritoEmision] : undefined,
    cCiuEmi: ciudadEmision,
    dDesCiuEmi: descripcionCodigoCiudad[ciudadEmision],
    dTelEmi: data.telefonoEmision,
    dEmailE: data.correoElectronicoEmisor,
    dDenSuc: data.denominacionSucursal,
    gActEco: data.actividadesEconomicas.map(mapActividadEconomicaToRaw),
    gRespDE: optionalMapper(mapResponsableDEToRaw, data.responsableDE)
  };
}

export function mapReceptorToRaw(data: Receptor): GDatRec {
  const paisReceptor = asLiteral(data.paisReceptor);
  const tipoDocumentoIdentidadReceptor = asLiteral(data.tipoDocumentoIdentidadReceptor);
  const departamentoReceptor = asLiteral(data.departamentoReceptor);
  const distritoReceptor = asLiteral(data.distritoReceptor);
  const ciudadReceptor = asLiteral(data.ciudadReceptor);

  return {
    iNatRec: asLiteral(data.naturalezaReceptor),
    iTiOpe: asLiteral(data.tipoOperacion),
    cPaisRec: paisReceptor,
    dDesPaisRe: descripcionCodigoPais[paisReceptor],
    iTiContRec: asLiteral(data.tipoContribuyenteReceptor),
    dRucRec: data.rucReceptor !== undefined ? extraerRuc(data.rucReceptor) : undefined,
    dDVRec: data.digitoVerificadorReceptor,
    iTipIDRec: tipoDocumentoIdentidadReceptor,
    dDTipIDRec:
      tipoDocumentoIdentidadReceptor !== undefined
        ? descripcionTipoDocumentoReceptor[tipoDocumentoIdentidadReceptor]
        : undefined,
    dNumIDRec: data.numeroDocumentoIdentidad,
    dNomRec: data.nombreReceptor,
    dNomFanRec: data.nombreFantasiaReceptor,
    dDirRec: data.direccionReceptor,
    dNumCasRec: data.numeroCasaReceptor,
    dDepRec: departamentoReceptor,
    dDesDepRec:
      departamentoReceptor !== undefined
        ? descripcionCodigoDepartamento[departamentoReceptor]
        : undefined,
    dDisRec: distritoReceptor,
    dDesDisRec:
      distritoReceptor !== undefined ? descripcionCodigoDistrito[distritoReceptor] : undefined,
    cCiuRec: ciudadReceptor,
    dDesCiuRec: ciudadReceptor !== undefined ? descripcionCodigoCiudad[ciudadReceptor] : undefined,
    dTelRec: data.telefonoReceptor,
    dCelRec: data.celularReceptor,
    dEmailRec: data.correoElectronicoReceptor,
    dCodCliente: data.codigoCliente
  };
}
