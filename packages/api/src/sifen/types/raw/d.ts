import type { CodigoCiudad, DescripcionCodigoCiudad } from '../../../gen/ciudades';
import type { CodigoDepartamento, DescripcionCodigoDepartamento } from '../../../gen/departamentos';
import type { CodigoDistrito, DescripcionCodigoDistrito } from '../../../gen/distritos';
import type { CodigoMoneda, DescripcionCodigoMoneda } from '../../../gen/monedas';
import type { CodigoPais, DescripcionCodigoPais } from '../../../gen/paises';
import type {
  CondicionAnticipo,
  CondicionTipoCambio,
  DescripcionCondicionAnticipo,
  DescripcionTipoDocumentoReceptor,
  DescripcionTipoDocumentoResponsableDE,
  DescripcionTipoImpuestoAfectado,
  DescripcionTipoObligacion,
  DescripcionTipoTransaccion,
  NaturalezaReceptor,
  TipoContribuyente,
  TipoContribuyenteReceptor,
  TipoDocumentoReceptor,
  TipoDocumentoResponsableDE,
  TipoImpuestoAfectado,
  TipoObligacion,
  TipoOperacion,
  TipoTransaccion
} from '../enums';

/**
 * D1 - D010 | Campos inherentes a la operación comercial | Pagina 65
 *
 * Observaciones:
 *   Obligatorio si C002 ≠ 7
 *   No informar si C002 = 7
 */
export interface GOpeCom {
  /**
   * D1 - D011 | Tipo de transacción | Pagina 66
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
  iTipTra?: TipoTransaccion;
  /**
   * D1 - D012 | Descripción del tipo de transacción | Pagina 66
   *
   * Observaciones:
   *   Obligatorio si existe el campo D011
   *   1= “Venta de mercadería”
   *   2= “Prestación de servicios”
   *   3= “Mixto” (Venta de mercadería y servicios)
   *   4= “Venta de activo fijo”
   *   5= “Venta de divisas”
   *   6= “Compra de divisas”
   *   7= “Promoción o entrega de muestras”
   *   8= “Donación”
   *   9= “Anticipo”
   *   10= “Compra de productos”
   *   11= “Compra de servicios”
   *   12= “Venta de crédito fiscal”
   *   13= ”Muestras médicas (Art. 3 RG 24/2014)”
   */
  dDesTipTra?: DescripcionTipoTransaccion;
  /**
   * D1 - D013 | Tipo de impuesto afectado | Pagina 66
   *
   * Observaciones:
   *   1= IVA
   *   2= ISC
   *   3=Renta
   *   4=Ninguno
   *   5=IVA - Renta
   */
  iTImp: TipoImpuestoAfectado;
  /**
   * D1 - D014 | Descripción del tipo de impuesto afectado | Pagina 67
   *
   * Observaciones:
   *   1= “IVA”
   *   2= “ISC”
   *   3= “Renta”
   *   4= “Ninguno”
   *   5= “IVA – Renta”
   */
  dDesTImp: DescripcionTipoImpuestoAfectado;
  /**
   * D1 - D015 | Moneda de la operación | Pagina 67
   *
   * Observaciones:
   *   Según tabla de códigos para monedas de acuerdo con la norma ISO 4217
   *   Se requiere la misma moneda para todos los ítems del DE
   */
  cMoneOpe: CodigoMoneda;
  /**
   * D1 - D016 | Descripción de la moneda de la operación | Pagina 67
   * Observaciones: Referente al campo D015
   */
  dDesMoneOpe: DescripcionCodigoMoneda;
  /**
   * D1 - D017 | Condición del tipo de cambio | Pagina 67
   *
   * Observaciones:
   *   Obligatorio si D015 ≠ PYG
   *   No informar si D015 = PYG
   *   1= Global (un solo tipo de cambio para todo el DE)
   *   2= Por ítem (tipo de cambio distinto por ítem)
   */
  dCondTiCam?: CondicionTipoCambio;
  /**
   * D1 - D018 | Tipo de cambio de la operación | Pagina 67
   *
   * Observaciones:
   *   Obligatorio si D017 = 1
   *   No informar si D017 = 2
   *   No informar si D015=PYG
   */
  dTiCam?: string;
  /**
   * D1 - D019 | Condición del Anticipo | Pagina 67
   *
   * Observaciones:
   *   1= Anticipo Global (un solo tipo de anticipo para todo el DE)
   *   2= Anticipo por ítem (corresponde a la distribución de Anticipos facturados por ítem)
   */
  iCondAnt?: CondicionAnticipo;
  /**
   * D1 - D020 | Descripción de la condición del Anticipo | Pagina 67
   *
   * Observaciones:
   *   1= “Anticipo Global”
   *   2= “Anticipo por Ítem”
   */
  dDesCondAnt?: DescripcionCondicionAnticipo;
  /**
   * D1.1 - D030 | Grupo de campos que identifican las obligaciones afectadas | Pagina 1 NT-18
   */
  gOblAfe?: GOblAfe[];
}

/**
 * D1.1 - D030 | Grupo de campos que identifican las obligaciones afectadas | Pagina 1 NT-18
 */
export interface GOblAfe {
  /**
   * D1.1 - D031 | Codigo de la obligacion afectada | Pagina 1 NT-18
   */
  cOblAfe: TipoObligacion;
  /**
   * D1.1 - D032 | Descripcion de la obligacion afectada | Pagina 1 NT-18
   */
  dDesOblAfe: DescripcionTipoObligacion;
}

/**
 * D2 - D100 | Grupo de campos que identifican al emisor | Pagina 67
 */
export interface GEmis {
  /**
   * D2 - D101 | RUC del contribuyente emisor | Pagina 68
   * Observaciones: Debe corresponder al RUC del certificado digital utilizado para firmar el DE
   */
  dRucEm: string;
  /**
   * D2 - D102 | Dígito verificador del RUC del contribuyente emisor | Pagina 68
   * Observaciones: Según algoritmo módulo 11
   */
  dDVEmi: number;
  /**
   * D2 - D103 | Tipo de contribuyente | Pagina 68
   *
   * Observaciones:
   *   1= Persona Física
   *   2= Persona Jurídica
   */
  iTipCont: TipoContribuyente;
  /**
   * D2 - D104 | Tipo de régimen | Pagina 68
   * Observaciones: Según Tabla 1 – Tipo de Régimen
   */
  cTipReg?: number;
  /**
   * D2 - D105 | Nombre o razón social del emisor del DE | Pagina 68
   * Observaciones: En caso de ambiente de prueba, debe contener obligatoriamente el literal DE generado en ambiente de prueba - sin valor comercial ni fiscal
   */
  dNomEmi: string;
  /**
   * D2 - D106 | Nombre de fantasía | Pagina 68
   * Observaciones: Debe corresponder a lo declarado en el RUC
   */
  dNomFanEmi?: string;
  /**
   * D2 - D107 | Dirección del local donde se emite el DE | Pagina 68
   * Observaciones: Nombre de la calle principal. Debe corresponder a lo declarado en el RUC
   */
  dDirEmi: string;
  /**
   * D2 - D108 | Número de casa | Pagina 68
   *
   * Observaciones:
   *   Si no tiene numeración, colocar 0 (cero)
   *   Debe corresponder a lo declarado en el RUC
   */
  dNumCas: number;
  /**
   * D2 - D109 | Complemento de dirección 1 | Pagina 68
   * Observaciones: Nombre de la calle secundaria
   */
  dCompDir1?: string;
  /**
   * D2 - D110 | Complemento de dirección 2 | Pagina 68
   * Observaciones: Número de departamento/ piso/ local/ edificio/ depósito
   */
  dCompDir2?: string;
  /**
   * D2 - D111 | Código del departamento de emisión | Pagina 68
   *
   * Observaciones:
   *   Según XSD de Departamentos
   *   Debe corresponder a lo declarado en el RUC
   */
  cDepEmi: CodigoDepartamento;
  /**
   * D2 - D112 | Descripción del departamento de emisión | Pagina 68
   *
   * Observaciones:
   *   Referente al campo D111
   *   Debe corresponder a lo declarado en el RUC
   */
  dDesDepEmi: DescripcionCodigoDepartamento;
  /**
   * D2 - D113 | Código del distrito de emisión | Pagina 68
   *
   * Observaciones:
   *   Según Tabla 2.1 – Distritos
   *   Debe corresponder a lo declarado en el RUC
   */
  cDisEmi?: CodigoDistrito;
  /**
   * D2 - D114 | Descripción del distrito de emisión | Pagina 68
   *
   * Observaciones:
   *   Obligatorio si existe el campo D113
   *   Debe corresponder a lo declarado en el RUC
   */
  dDesDisEmi?: DescripcionCodigoDistrito;
  /**
   * D2 - D115 | Código de la ciudad de emisión | Pagina 69
   *
   * Observaciones:
   *   Según Tabla 2.2 – Ciudades
   *   Debe corresponder a lo declarado en el RUC
   */
  cCiuEmi: CodigoCiudad;
  /**
   * D2 - D116 | Descripción de la ciudad de emisión | Pagina 69
   *
   * Observaciones:
   *   Referente al campo D115
   *   Debe corresponder a lo declarado en el RUC
   */
  dDesCiuEmi: DescripcionCodigoCiudad;
  /**
   * D2 - D117 | Teléfono local de emisión de DE | Pagina 69
   *
   * Observaciones:
   *   Debe incluir el prefijo de la ciudad
   *   Debe corresponder a lo declarado en el RUC
   */
  dTelEmi: string;
  /**
   * D2 - D118 | Correo electrónico del emisor | Pagina 69
   * Observaciones: Debe corresponder a lo declarado en el RUC
   */
  dEmailE: string;
  /**
   * D2 - D119 | Denominación comercial de la sucursal | Pagina 69
   * Observaciones: Denominación interna del emisor
   */
  dDenSuc?: string;
  /**
   * D2.1 - D130 | Grupo de campos que describen la actividad económica del emisor | Pagina 69
   */
  gActEco: GActEco[];
  /**
   * D2.2 - D140 | Grupo de campos que identifican al responsable de la generación del DE | Pagina 70
   */
  gRespDE?: GRespDE;
}

/**
 * D2.1 - D130 | Campos que describen la actividad económica del emisor | Pagina 69
 */
export interface GActEco {
  /**
   * D2.1 - D131 | Código de la actividad económica del emisor | Pagina 69
   *
   * Observaciones:
   *   Según Tabla 3 – Actividades Económicas
   *   Debe corresponder a lo declarado en el RUC
   */
  cActEco: string;
  /**
   * D2.1 - D132 | Descripción de la actividad económica del emisor | Pagina 69
   *
   * Observaciones:
   *   Referente al campo D120
   *   Según Tabla 3 – Actividades Económicas
   *   Debe corresponder a lo declarado en el RUC
   */
  dDesActEco: string;
}

/**
 * D2.2 - D140 | Campos que identifican al responsable de la generación del DE | Pagina 70
 */
export interface GRespDE {
  /**
   * D2.2 - D141 | Tipo de documento de identidad del responsable de la generación del DE | Pagina 70
   *
   * Observaciones:
   *   1= Cédula paraguaya
   *   2= Pasaporte
   *   3= Cédula extranjera
   *   4= Carnet de residencia
   *   9= Otro
   */
  iTipIDRespDE: TipoDocumentoResponsableDE;
  /**
   * D2.2 - D142 | Descripción del tipo de documento de identidad del responsable de la generación del DE | Pagina 70
   *
   * Observaciones:
   *   1= “Cédula paraguaya”
   *   2= “Pasaporte”
   *   3= “Cédula extranjera”
   *   4= “Carnet de residencia”
   *   Si D141 = 9 informar el tipo de documento de identidad del responsable de la generación del DE
   */
  dDTipIDRespDE: DescripcionTipoDocumentoResponsableDE;
  /**
   * D2.2 - D143 | Número de documento de identidad del responsable de la generación del DE | Pagina 70
   */
  dNumIDRespDE: string;
  /**
   * D2.2 - D144 | Nombre o razón social del responsable de la generación del DE | Pagina 70
   */
  dNomRespDE: string;
  /**
   * D2.2 - D145 | Cargo del responsable de la generación del DE | Pagina 70
   */
  dCarRespDE: string;
}

/**
 * D3 - D200 | Grupo de campos que identifican al receptor | Pagina 70
 */
export interface GDatRec {
  /**
   * D3 - D201 | Naturaleza del receptor | Pagina 71
   *
   * Observaciones:
   *   1= contribuyente
   *   2= no contribuyente
   */
  iNatRec: NaturalezaReceptor;
  /**
   * D3 - D202 | Tipo de operación | Pagina 71
   *
   * Observaciones:
   *   1= B2B
   *   2= B2C
   *   3= B2G
   *   4= B2F
   *   (Esta última opción debe utilizarse solo en caso de servicios para empresas o personas físicas del exterior)
   */
  iTiOpe: TipoOperacion;
  /**
   * D3 - D203 | Código de país del receptor | Pagina 71
   * Observaciones: Según XSD de Codificación de Países
   */
  cPaisRec: CodigoPais;
  /**
   * D3 - D204 | Descripción del país receptor | Pagina 71
   * Observaciones: Referente al campo D203
   */
  dDesPaisRe: DescripcionCodigoPais;
  /**
   * D3 - D205 | Tipo de contribuyente receptor | Pagina 71
   *
   * Observaciones:
   *   Obligatorio si D201 = 1
   *   No informar si D201 = 2
   *   1= Persona Física
   *   2= Persona Jurídica
   */
  iTiContRec?: TipoContribuyenteReceptor;
  /**
   * D3 - D206 | RUC del receptor | Pagina 71
   *
   * Observaciones:
   *   Obligatorio si D201 = 1
   *   No informar si D201 = 2
   */
  dRucRec?: string;
  /**
   * D3 - D207 | Dígito verificador del RUC del receptor | Pagina 71
   *
   * Observaciones:
   *   Obligatorio si existe el campo D206
   *   Según algoritmo módulo 11
   */
  dDVRec?: number;
  /**
   * D3 - D208 | Tipo de documento de identidad del receptor | Pagina 71
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
  iTipIDRec?: TipoDocumentoReceptor;
  /**
   * D3 - D209 | Descripción del tipo de documento de identidad | Pagina 72
   *
   * Observaciones:
   *   Obligatorio si existe el campo D208
   *   1 = "Cédula paraguaya"
   *   2 = "Pasaporte"
   *   3 = "Cédula extranjera"
   *   4 = "Carnet de residencia"
   *   5 = "Innominado"
   *   6 = Tarjeta Diplomática
   *   exoneración fiscal
   *   Si D208 = 9 informar el tipo de documento de identidad del receptor
   */
  dDTipIDRec?: DescripcionTipoDocumentoReceptor;
  /**
   * D3 - D210 | Número de documento de identidad | Pagina 72
   *
   * Observaciones:
   *   Obligatorio si D201 = 2 y D202 ≠ 4
   *   No informar si D201 = 1 o D202=4
   *   En caso de DE innominado, completar con 0 (cero)
   */
  dNumIDRec?: string;
  /**
   * D3 - D211 | Nombre o razón social del receptor del DE | Pagina 72
   * Observaciones: En caso de DE innominado, completar con "Sin Nombre"
   */
  dNomRec: string;
  /**
   * D3 - D212 | Nombre de fantasía | Pagina 72
   */
  dNomFanRec?: string;
  /**
   * D3 - D213 | Dirección del receptor | Pagina 72
   *
   * Observaciones:
   *   Campo obligatorio cuando C002=7 o cuando D202=4
   *   Campo obligatorio si se informa el campo D213
   *   Cuando D201 = 1, debe corresponder a lo declarado en el RUC
   */
  dDirRec?: string;
  /**
   * D3 - D218 | Número de casa del receptor | Pagina 72
   */
  dNumCasRec?: number;
  /**
   * D3 - D219 | Código del departamento del receptor | Pagina 72
   */
  dDepRec?: CodigoDepartamento;
  /**
   * D3 - D220 | Descripción del departamento del receptor | Pagina 72
   */
  dDesDepRec?: DescripcionCodigoDepartamento;
  /**
   * D3 - D221 | Código del distrito del receptor | Pagina 72
   */
  dDisRec?: CodigoDistrito;
  /**
   * D3 - D222 | Descripción del distrito del receptor | Pagina 72
   */
  dDesDisRec?: DescripcionCodigoDistrito;
  /**
   * D3 - D223 | Código de la ciudad del receptor | Pagina 73
   *
   * Observaciones:
   *   Campo obligatorio si se informa el campo D213 y D202≠4, no se debe informar cuando D202 = 4.
   *   Según Tabla 2.2 – Ciudades
   */
  cCiuRec?: CodigoCiudad;
  /**
   * D3 - D224 | Descripción de la ciudad del receptor | Pagina 73
   * Observaciones: Referente al campo D223
   */
  dDesCiuRec?: DescripcionCodigoCiudad;
  /**
   * D3 - D214 | Número de teléfono del receptor | Pagina 73
   * Observaciones: Debe incluir el prefijo de la ciudad si D203 = PRY
   */
  dTelRec?: string;
  /**
   * D3 - D215 | Número de celular del receptor | Pagina 73
   */
  dCelRec?: string;
  /**
   * D3 - D216 | Correo electrónico del receptor | Pagina 73
   */
  dEmailRec?: string;
  /**
   * D3 - D217 | Código del cliente | Pagina 73
   */
  dCodCliente?: string;
}
