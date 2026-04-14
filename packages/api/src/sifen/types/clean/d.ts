import type { LiteralUnion } from 'type-fest';
import type { CodigoCiudad } from '../../../gen/ciudades';
import type { CodigoDepartamento } from '../../../gen/departamentos';
import type { CodigoDistrito } from '../../../gen/distritos';
import type { CodigoMoneda } from '../../../gen/monedas';
import type { CodigoPais } from '../../../gen/paises';
import type { Big } from 'big.js';
import type {
  CondicionAnticipo,
  CondicionTipoCambio,
  NaturalezaReceptor,
  TipoContribuyenteReceptor,
  TipoImpuestoAfectado,
  TipoOperacion,
  TipoContribuyente,
  TipoDocumentoReceptor,
  TipoDocumentoResponsableDE,
  TipoTransaccion,
  TipoObligacion
} from '../enums';

/**
 * D1 - D010 | gOpeCom | Campos inherentes a la operación comercial | Pagina 65
 */
export interface OperacionComercial {
  /**
   * D1 - D011 | iTipTra | Tipo de transacción | Pagina 66
   */
  tipoTransaccion?: LiteralUnion<TipoTransaccion, number>;
  /**
   * D1 - D013 | iTImp | Tipo de impuesto afectado | Pagina 66
   */
  tipoImpuestoAfectado: LiteralUnion<TipoImpuestoAfectado, number>;
  /**
   * D1 - D015 | cMoneOpe | Moneda de la operación | Pagina 67
   */
  monedaOperacion: LiteralUnion<CodigoMoneda, string>;
  /**
   * D1 - D017 | dCondTiCam | Condición del tipo de cambio | Pagina 67
   */
  condicionTipoCambio?: LiteralUnion<CondicionTipoCambio, number>;
  /**
   * D1 - D018 | dTiCam | Tipo de cambio de la operación | Pagina 67
   */
  tipoCambioOperacion?: Big;
  /**
   * D1 - D019 | iCondAnt | Condición del Anticipo | Pagina 67
   */
  condicionAnticipo?: LiteralUnion<CondicionAnticipo, number>;
  /**
   * D1.1 - D030 | gOblAfe | Grupo de campos que identifican las obligaciones afectadas | Pagina 1 NT-18
   */
  obligacionesAfectadas?: ObligacionesAfectadas[];
}

/**
 * D1.1 - D030 | gOblAfe | Grupo de campos que identifican las obligaciones afectadas | Pagina 1 NT-18
 */
export interface ObligacionesAfectadas {
  /**
   * D1.1 - D031 | cOblAfe | Codigo de la obligacion afectada | Pagina 1 NT-18
   */
  codigoObligacion: LiteralUnion<TipoObligacion, number>;
}

/**
 * D2 - D100 | gEmis | Grupo de campos que identifican al emisor | Pagina 67
 */
export interface Emisor {
  /**
   * D2 - D101 | dRucEm | RUC del contribuyente emisor | Pagina 68
   */
  rucEmisor: string;
  /**
   * D2 - D102 | dDVEmi | Dígito verificador del RUC del contribuyente emisor | Pagina 68
   *
   * Si no es proveido, es calculdo internamente.
   */
  digitoVerificadorEmisor?: number;
  /**
   * D2 - D103 | iTipCont | Tipo de contribuyente | Pagina 68
   */
  tipoContribuyente: LiteralUnion<TipoContribuyente, number>;
  /**
   * D2 - D104 | cTipReg | Tipo de régimen | Pagina 68
   */
  tipoRegimen?: number;
  /**
   * D2 - D105 | dNomEmi | Nombre o razón social del emisor del DE | Pagina 68
   */
  nombreEmisor: string;
  /**
   * D2 - D106 | dNomFanEmi | Nombre de fantasía | Pagina 68
   */
  nombreFantasiaEmi?: string;
  /**
   * D2 - D107 | dDirEmi | Dirección del local donde se emite el DE | Pagina 68
   */
  direccionEmision: string;
  /**
   * D2 - D108 | dNumCas | Número de casa | Pagina 68
   */
  numeroCasa: number;
  /**
   * D2 - D109 | dCompDir1 | Complemento de dirección 1 | Pagina 68
   */
  complementoDireccion1?: string;
  /**
   * D2 - D110 | dCompDir2 | Complemento de dirección 2 | Pagina 68
   */
  complementoDireccion2?: string;
  /**
   * D2 - D111 | cDepEmi | Código del departamento de emisión | Pagina 68
   */
  departamentoEmision: LiteralUnion<CodigoDepartamento, number>;
  /**
   * D2 - D113 | cDisEmi | Código del distrito de emisión | Pagina 68
   */
  distritoEmision?: LiteralUnion<CodigoDistrito, number>;
  /**
   * D2 - D115 | cCiuEmi | Código de la ciudad de emisión | Pagina 69
   */
  ciudadEmision: LiteralUnion<CodigoCiudad, number>;
  /**
   * D2 - D117 | dTelEmi | Teléfono local de emisión de DE | Pagina 69
   */
  telefonoEmision: string;
  /**
   * D2 - D118 | dEmailE | Correo electrónico del emisor | Pagina 69
   */
  correoElectronicoEmisor: string;
  /**
   * D2 - D119 | dDenSuc | Denominación comercial de la sucursal | Pagina 69
   */
  denominacionSucursal?: string;
  /**
   * D2.1 - D130 | gActEco | Grupo de campos que describen la actividad económica del emisor | Pagina 69
   */
  actividadesEconomicas: ActividadEconomica[];
  /**
   * D2.2 - D140 | gRespDE | Grupo de campos que identifican al responsable de la generación del DE | Pagina 70
   */
  responsableDE?: ResponsableDE;
}

/**
 * D2.1 - D130 | gActEco | Campos que describen la actividad económica del emisor | Pagina 69
 */
export interface ActividadEconomica {
  /**
   * D2.1 - D131 | cActEco | Código de la actividad económica del emisor | Pagina 69
   */
  codigoActividadEconomica: string;
  /**
   * D2.1 - D132 | dDesActEco | Descripción de la actividad económica del emisor | Pagina 69
   */
  descripcionActividadEconomica: string;
}

/**
 * D2.2 - D140 | gRespDE | Campos que identifican al responsable de la generación del DE | Pagina 70
 */
export interface ResponsableDE {
  /**
   * D2.2 - D141 | iTipIDRespDE | Tipo de documento de identidad del responsable de la generación del DE | Pagina 70
   */
  tipoDocumentoIdentidadResponsableDE: LiteralUnion<TipoDocumentoResponsableDE, number>;
  /**
   * D2.2 - D143 | dNumIDRespDE | Número de documento de identidad del responsable de la generación del DE | Pagina 70
   */
  numeroDocumentoIdentidadResponsableDE: string;
  /**
   * D2.2 - D144 | dNomRespDE | Nombre o razón social del responsable de la generación del DE | Pagina 70
   */
  nombreResponsableDE: string;
  /**
   * D2.2 - D145 | dCarRespDE | Cargo del responsable de la generación del DE | Pagina 70
   */
  cargoResponsableDE: string;
}

/**
 * D3 - D200 | gDatRec | Grupo de campos que identifican al receptor | Pagina 70
 */
export interface Receptor {
  /**
   * D3 - D201 | iNatRec | Naturaleza del receptor | Pagina 71
   */
  naturalezaReceptor: LiteralUnion<NaturalezaReceptor, number>;
  /**
   * D3 - D202 | iTiOpe | Tipo de operación | Pagina 71
   */
  tipoOperacion: LiteralUnion<TipoOperacion, number>;
  /**
   * D3 - D203 | cPaisRec | Código de país del receptor | Pagina 71
   */
  paisReceptor: LiteralUnion<CodigoPais, string>;
  /**
   * D3 - D205 | iTiContRec | Tipo de contribuyente receptor | Pagina 71
   */
  tipoContribuyenteReceptor?: LiteralUnion<TipoContribuyenteReceptor, number>;
  /**
   * D3 - D206 | dRucRec | RUC del receptor | Pagina 71
   */
  rucReceptor?: string;
  /**
   * D3 - D207 | dDVRec | Dígito verificador del RUC del receptor | Pagina 71
   *
   * Si no es proveido, es generado internamente.
   */
  digitoVerificadorReceptor?: number;
  /**
   * D3 - D208 | iTipIDRec | Tipo de documento de identidad del receptor | Pagina 71
   */
  tipoDocumentoIdentidadReceptor?: LiteralUnion<TipoDocumentoReceptor, number>;
  /**
   * D3 - D210 | dNumIDRec | Número de documento de identidad | Pagina 72
   */
  numeroDocumentoIdentidad?: string;
  /**
   * D3 - D211 | dNomRec | Nombre o razón social del receptor del DE | Pagina 72
   */
  nombreReceptor: string;
  /**
   * D3 - D212 | dNomFanRec | Nombre de fantasía | Pagina 72
   */
  nombreFantasiaReceptor?: string;
  /**
   * D3 - D213 | dDirRec | Dirección del receptor | Pagina 72
   */
  direccionReceptor?: string;
  /**
   * D3 - D218 | dNumCasRec | Número de casa del receptor | Pagina 72
   */
  numeroCasaReceptor?: number;
  /**
   * D3 - D219 | dDepRec | Código del departamento del receptor | Pagina 72
   */
  departamentoReceptor?: LiteralUnion<CodigoDepartamento, number>;
  /**
   * D3 - D221 | dDisRec | Código del distrito del receptor | Pagina 72
   */
  distritoReceptor?: LiteralUnion<CodigoDistrito, number>;
  /**
   * D3 - D223 | cCiuRec | Código de la ciudad del receptor | Pagina 73
   */
  ciudadReceptor?: LiteralUnion<CodigoCiudad, number>;
  /**
   * D3 - D214 | dTelRec | Número de teléfono del receptor | Pagina 73
   */
  telefonoReceptor?: string;
  /**
   * D3 - D215 | dCelRec | Número de celular del receptor | Pagina 73
   */
  celularReceptor?: string;
  /**
   * D3 - D216 | dEmailRec | Correo electrónico del receptor | Pagina 73
   */
  correoElectronicoReceptor?: string;
  /**
   * D3 - D217 | dCodCliente | Código del cliente | Pagina 73
   */
  codigoCliente?: string;
}
