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
 *
 * Observaciones:
 *   Obligatorio si C002 ≠ 7
 *   No informar si C002 = 7
 */
export interface OperacionComercial {
  /**
   * D1 - D011 | iTipTra | Tipo de transacción | Pagina 66
   *
   * Observaciones:
   *   Obligatorio si C002 = 1 o 4
   *   No informar si C002 ≠ 1 o 4
   *   Tipo de transacción para el emisor
   *   1= Venta de mercadería
   *   2= Prestación de servicios
   *   3= Mixto (Venta de mercadería y servicios)
   *   4= Venta de activo fijo
   *   5= Venta de divisas
   *   6= Compra de divisas
   *   7= Promoción o entrega de muestras
   *   8= Donación
   *   9= Anticipo
   *   10= Compra de productos
   *   11= Compra de servicios
   *   12= Venta de crédito fiscal
   *   13=Muestras médicas (Art. 3 RG 24/2014)
   */
  tipoTransaccion?: LiteralUnion<TipoTransaccion, number>;
  /**
   * D1 - D013 | iTImp | Tipo de impuesto afectado | Pagina 66
   *
   * Observaciones:
   *   1= IVA
   *   2= ISC
   *   3=Renta
   *   4=Ninguno
   *   5=IVA - Renta
   */
  tipoImpuestoAfectado: LiteralUnion<TipoImpuestoAfectado, number>;
  /**
   * D1 - D015 | cMoneOpe | Moneda de la operación | Pagina 67
   *
   * Observaciones:
   *   Según tabla de códigos para monedas de acuerdo con la norma ISO 4217
   *   Se requiere la misma moneda para todos los ítems del DE
   */
  monedaOperacion: LiteralUnion<CodigoMoneda, string>;
  /**
   * D1 - D017 | dCondTiCam | Condición del tipo de cambio | Pagina 67
   *
   * Observaciones:
   *   Obligatorio si D015 ≠ PYG
   *   No informar si D015 = PYG
   *   1= Global (un solo tipo de cambio para todo el DE)
   *   2= Por ítem (tipo de cambio distinto por ítem)
   */
  condicionTipoCambio?: LiteralUnion<CondicionTipoCambio, number>;
  /**
   * D1 - D018 | dTiCam | Tipo de cambio de la operación | Pagina 67
   *
   * Observaciones:
   *   Obligatorio si D017 = 1
   *   No informar si D017 = 2
   *   No informar si D015=PYG
   */
  tipoCambioOperacion?: Big;
  /**
   * D1 - D019 | iCondAnt | Condición del Anticipo | Pagina 67
   *
   * Observaciones:
   *   1= Anticipo Global (un solo tipo de anticipo para todo el DE)
   *   2= Anticipo por ítem (corresponde a la distribución de Anticipos facturados por ítem)
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
   * Observaciones: Debe corresponder al RUC del certificado digital utilizado para firmar el DE
   */
  rucEmisor: string;
  /**
   * D2 - D102 | dDVEmi | Dígito verificador del RUC del contribuyente emisor | Pagina 68
   *
   * Si no es proveido, es calculdo internamente.
   * Observaciones: Según algoritmo módulo 11
   */
  digitoVerificadorEmisor?: number;
  /**
   * D2 - D103 | iTipCont | Tipo de contribuyente | Pagina 68
   *
   * Observaciones:
   *   1= Persona Física
   *   2= Persona Jurídica
   */
  tipoContribuyente: LiteralUnion<TipoContribuyente, number>;
  /**
   * D2 - D104 | cTipReg | Tipo de régimen | Pagina 68
   * Observaciones: Según Tabla 1 – Tipo de Régimen
   */
  tipoRegimen?: number;
  /**
   * D2 - D105 | dNomEmi | Nombre o razón social del emisor del DE | Pagina 68
   * Observaciones: En caso de ambiente de prueba, debe contener obligatoriamente el literal DE generado en ambiente de prueba - sin valor comercial ni fiscal
   */
  nombreEmisor: string;
  /**
   * D2 - D106 | dNomFanEmi | Nombre de fantasía | Pagina 68
   * Observaciones: Debe corresponder a lo declarado en el RUC
   */
  nombreFantasiaEmi?: string;
  /**
   * D2 - D107 | dDirEmi | Dirección del local donde se emite el DE | Pagina 68
   * Observaciones: Nombre de la calle principal. Debe corresponder a lo declarado en el RUC
   */
  direccionEmision: string;
  /**
   * D2 - D108 | dNumCas | Número de casa | Pagina 68
   *
   * Observaciones:
   *   Si no tiene numeración, colocar 0 (cero)
   *   Debe corresponder a lo declarado en el RUC
   */
  numeroCasa: number;
  /**
   * D2 - D109 | dCompDir1 | Complemento de dirección 1 | Pagina 68
   * Observaciones: Nombre de la calle secundaria
   */
  complementoDireccion1?: string;
  /**
   * D2 - D110 | dCompDir2 | Complemento de dirección 2 | Pagina 68
   * Observaciones: Número de departamento/ piso/ local/ edificio/ depósito
   */
  complementoDireccion2?: string;
  /**
   * D2 - D111 | cDepEmi | Código del departamento de emisión | Pagina 68
   *
   * Observaciones:
   *   Según XSD de Departamentos
   *   Debe corresponder a lo declarado en el RUC
   */
  departamentoEmision: LiteralUnion<CodigoDepartamento, number>;
  /**
   * D2 - D113 | cDisEmi | Código del distrito de emisión | Pagina 68
   *
   * Observaciones:
   *   Según Tabla 2.1 – Distritos
   *   Debe corresponder a lo declarado en el RUC
   */
  distritoEmision?: LiteralUnion<CodigoDistrito, number>;
  /**
   * D2 - D115 | cCiuEmi | Código de la ciudad de emisión | Pagina 69
   *
   * Observaciones:
   *   Según Tabla 2.2 – Ciudades
   *   Debe corresponder a lo declarado en el RUC
   */
  ciudadEmision: LiteralUnion<CodigoCiudad, number>;
  /**
   * D2 - D117 | dTelEmi | Teléfono local de emisión de DE | Pagina 69
   *
   * Observaciones:
   *   Debe incluir el prefijo de la ciudad
   *   Debe corresponder a lo declarado en el RUC
   */
  telefonoEmision: string;
  /**
   * D2 - D118 | dEmailE | Correo electrónico del emisor | Pagina 69
   * Observaciones: Debe corresponder a lo declarado en el RUC
   */
  correoElectronicoEmisor: string;
  /**
   * D2 - D119 | dDenSuc | Denominación comercial de la sucursal | Pagina 69
   * Observaciones: Denominación interna del emisor
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
   *
   * Observaciones:
   *   Según Tabla 3 – Actividades Económicas
   *   Debe corresponder a lo declarado en el RUC
   */
  codigoActividadEconomica: string;
  /**
   * D2.1 - D132 | dDesActEco | Descripción de la actividad económica del emisor | Pagina 69
   *
   * Observaciones:
   *   Referente al campo D120
   *   Según Tabla 3 – Actividades Económicas
   *   Debe corresponder a lo declarado en el RUC
   */
  descripcionActividadEconomica: string;
}

/**
 * D2.2 - D140 | gRespDE | Campos que identifican al responsable de la generación del DE | Pagina 70
 */
export interface ResponsableDE {
  /**
   * D2.2 - D141 | iTipIDRespDE | Tipo de documento de identidad del responsable de la generación del DE | Pagina 70
   *
   * Observaciones:
   *   1= Cédula paraguaya
   *   2= Pasaporte
   *   3= Cédula extranjera
   *   4= Carnet de residencia
   *   9= Otro
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
   *
   * Observaciones:
   *   1= contribuyente
   *   2= no contribuyente
   */
  naturalezaReceptor: LiteralUnion<NaturalezaReceptor, number>;
  /**
   * D3 - D202 | iTiOpe | Tipo de operación | Pagina 71
   *
   * Observaciones:
   *   1= B2B
   *   2= B2C
   *   3= B2G
   *   4= B2F
   *   (Esta última opción debe utilizarse solo en caso de servicios para empresas o personas físicas del exterior)
   */
  tipoOperacion: LiteralUnion<TipoOperacion, number>;
  /**
   * D3 - D203 | cPaisRec | Código de país del receptor | Pagina 71
   * Observaciones: Según XSD de Codificación de Países
   */
  paisReceptor: LiteralUnion<CodigoPais, string>;
  /**
   * D3 - D205 | iTiContRec | Tipo de contribuyente receptor | Pagina 71
   *
   * Observaciones:
   *   Obligatorio si D201 = 1
   *   No informar si D201 = 2
   *   1= Persona Física
   *   2= Persona Jurídica
   */
  tipoContribuyenteReceptor?: LiteralUnion<TipoContribuyenteReceptor, number>;
  /**
   * D3 - D206 | dRucRec | RUC del receptor | Pagina 71
   *
   * Observaciones:
   *   Obligatorio si D201 = 1
   *   No informar si D201 = 2
   */
  rucReceptor?: string;
  /**
   * D3 - D207 | dDVRec | Dígito verificador del RUC del receptor | Pagina 71
   *
   * Si no es proveido, es generado internamente.
   *
   * Observaciones:
   *   Obligatorio si existe el campo D206
   *   Según algoritmo módulo 11
   */
  digitoVerificadorReceptor?: number;
  /**
   * D3 - D208 | iTipIDRec | Tipo de documento de identidad del receptor | Pagina 71
   *
   * Observaciones:
   *   Obligatorio si D201 = 2 y D202 ≠ 4
   *   No informar si D201 = 1 o D202=4
   *   1= Cédula paraguaya
   *   2= Pasaporte
   *   3= Cédula extranjera
   *   4= Carnet de residencia
   *   5= Innominado
   *   6=Tarjeta Diplomática de exoneración fiscal
   *   9= Otro
   */
  tipoDocumentoIdentidadReceptor?: LiteralUnion<TipoDocumentoReceptor, number>;
  /**
   * D3 - D210 | dNumIDRec | Número de documento de identidad | Pagina 72
   *
   * Observaciones:
   *   Obligatorio si D201 = 2 y D202 ≠ 4
   *   No informar si D201 = 1 o D202=4
   *   En caso de DE innominado, completar con 0 (cero)
   */
  numeroDocumentoIdentidad?: string;
  /**
   * D3 - D211 | dNomRec | Nombre o razón social del receptor del DE | Pagina 72
   * Observaciones: En caso de DE innominado, completar con "Sin Nombre"
   */
  nombreReceptor: string;
  /**
   * D3 - D212 | dNomFanRec | Nombre de fantasía | Pagina 72
   */
  nombreFantasiaReceptor?: string;
  /**
   * D3 - D213 | dDirRec | Dirección del receptor | Pagina 72
   *
   * Observaciones:
   *   Campo obligatorio cuando C002=7 o cuando D202=4
   *   Campo obligatorio si se informa el campo D213
   *   Cuando D201 = 1, debe corresponder a lo declarado en el RUC
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
   *
   * Observaciones:
   *   Campo obligatorio si se informa el campo D213 y D202≠4, no se debe informar cuando D202 = 4.
   *   Según Tabla 2.2 – Ciudades
   */
  ciudadReceptor?: LiteralUnion<CodigoCiudad, number>;
  /**
   * D3 - D214 | dTelRec | Número de teléfono del receptor | Pagina 73
   * Observaciones: Debe incluir el prefijo de la ciudad si D203 = PRY
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
