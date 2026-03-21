// AUTO-GENERATED (partial) — SIFEN Manual Técnico v150
// Groups implemented: AA (AA001-AA002), A (A001-A005), B (B001-B006), C (C001-C010), D (D001-D299 subset: D010, D011-D020, D100-D160, D130-D145, D200-D224), E (E010, E600, E700), F (F001)

import type { CodigoCiudad, DescripcionCodigoCiudad } from '../../../gen/ciudades';
import type { CodigoDepartamento, DescripcionCodigoDepartamento } from '../../../gen/departamentos';
import type { CodigoDistrito, DescripcionCodigoDistrito } from '../../../gen/distritos';
import type { CodigoMoneda, DescripcionCodigoMoneda } from '../../../gen/iso4217';
import type { CodigoPais, DescripcionCodigoPais } from '../../../gen/paises';
import type { gCamFE, gCamAE, gCamNCDE, gCamNRE, gCamCond, gCamItem, gCamEsp, gTransp } from './e';
import type { gTotSub } from './f';

/**
 * AA - AA001 | Documento Electrónico elemento raíz | Pagina 64
 */
export interface DocumentoElectronico {
  /**
   * AA - AA002 | Versión del formato | Pagina 64
   */
  rDE: {
    dVerFor: 150; // Manual v150 Fija esto al valor 150
    /**
     * A - A001 | Campos firmados del DE | Pagina 64
     */
    DE: DE;
  };
}

/**
 * A - A001 | Campos firmados del DE | Pagina 64
 */
export interface DE {
  /**
   * A - A003 | Dígito verificador del identificador del DE | Pagina 64
   */
  dDVId: number;
  /**
   * A - A004 | Fecha de la firma | Pagina 64
   */
  dFecFirma: string; // Format: AAAA-MM-DDThh:mm:ss
  /**
   * A - A005 | Sistema de facturación | Pagina 64
   */
  dSisFact: DSisFact; // 1=Sistema de facturación del contribuyente, 2=SIFEN solución gratuita
  /**
   * B - B001 | Campos inherentes a la operación de DE | Pagina 65
   */
  gOpeDE: gOpeDE;
  /**
   * C - C001 | Datos del timbrado | Pagina 64
   */
  gTimb: gTimb;
  /**
   * D - D001 | Campos generales del DE | Pagina 65
   */
  gDatGralOpe: gDatGralOpe;
  /**
   * E - E001 | Campos específicos por tipo de Documento Electrónico | Pagina 73
   */
  gDtipDE: gDtipDE;
  /**
   * F - F001 | Campos de subtotales y totales | Pagina 102
   */
  gTotSub?: gTotSub;
}

/**
 * E - E001 | Campos específicos por tipo de Documento Electrónico | Pagina 73
 */
export interface gDtipDE {
  /**
   * E1 - E010 | Campos que componen la FE | Pagina 73
   */
  gCamFE?: gCamFE;
  /**
   * E3 - E300 | Campos que componen la Autofactura Electrónica | Pagina 76
   */
  gCamAE?: gCamAE;
  /**
   * E4 - E400 | Campos de la Nota de Crédito/Débito Electrónica | Pagina 77
   */
  gCamNCDE?: gCamNCDE;
  /**
   * E5 - E500 | Campos que componen la Nota de Remisión Electrónica | Pagina 78
   */
  gCamNRE?: gCamNRE;
  /**
   * E7 - E600 | Campos que describen la condición de la operación | Pagina 80
   */
  gCamCond?: gCamCond;
  /**
   * E8 - E700 | Campos que describen los ítems de la operación | Pagina 88
   */
  gCamItem?: gCamItem[];
  /**
   * G - G050 | Campos complementarios comerciales de uso específico | Pagina 109
   */
  gCamEsp?: gCamEsp;
  /**
   * E9 - E900 | Campos que describen el transporte de mercaderías | Pagina 95
   */
  gTransp?: gTransp;
}

/**
 * B - B001 | Campos inherentes a la operación de DE | Pagina 65
 */
export interface gOpeDE {
  /**
   * B - B002 | Tipo de emisión | Pagina 65
   */
  iTipEmi: ITipEmi; // 1=Normal, 2=Contingencia
  /**
   * B - B003 | Descripción del tipo de emisión | Pagina 65
   */
  dDesTipEmi: DDesTipEmi;
  /**
   * B - B004 | Código de seguridad | Pagina 65
   */
  dCodSeg: number;
  /**
   * B - B005 | Información de interés del emisor respecto al DE | Pagina 65
   */
  dInfoEmi?: string;
  /**
   * B - B006 | Información de interés del Fisco respecto al DE | Pagina 65
   */
  dInfoFisc?: string;
}

/**
 * C - C001 | Datos del timbrado | Pagina 64
 */
export interface gTimb {
  /**
   * C - C002 | Tipo de Documento Electrónico | Pagina 64
   */
  iTiDE: ITiDE;
  /**
   * C - C003 | Descripción del tipo de documento electrónico | Pagina 64
   */
  dDesTiDE: DDesTiDE;
  /**
   * C - C004 | Número del timbrado | Pagina 64
   */
  dNumTim: number;
  /**
   * C - C005 | Establecimiento | Pagina 64
   */
  dEst: string;
  /**
   * C - C006 | Punto de expedición | Pagina 64
   */
  dPunExp: string;
  /**
   * C - C007 | Número del documento | Pagina 64
   */
  dNumDoc: string;
  /**
   * C - C008 | Fecha inicio de vigencia del timbrado | Pagina 64
   */
  dFeIniT: string; // Format: AAAA-MM-DD
  /**
   * C - C010 | Serie del número de timbrado | Pagina 64
   */
  dSerieNum?: string;
}

/**
 * D - D001 | Campos generales del DE | Pagina 65
 */
export interface gDatGralOpe {
  /**
   * D - D002 | Fecha y hora de emisión del DE | Pagina 65
   */
  dFeEmiDE: string; // Format: AAAA-MM-DDThh:mm:ss
  /**
   * D1 - D010 | Campos inherentes a la operación comercial | Pagina 65
   */
  gOpeCom?: gOpeCom;
  /**
   * D2 - D100 | Grupo de campos que identifican al emisor | Pagina 67
   */
  gEmis: gEmis;
  /**
   * D3 - D200 | Grupo de campos que identifican al receptor | Pagina 70
   */
  gDatRec: gDatRec;
}

/**
 * D1 - D010 | Campos inherentes a la operación comercial | Pagina 65
 */
export interface gOpeCom {
  /**
   * D1 - D011 | Tipo de transacción | Pagina 65
   */
  iTipTra?: ITipTra;
  /**
   * D1 - D012 | Descripción del tipo de transacción | Pagina 65
   */
  dDesTipTra?: DDesTipTra;
  /**
   * D1 - D013 | Tipo de impuesto afectado | Pagina 65
   */
  iTImp: ITImp;
  /**
   * D1 - D014 | Descripción del tipo de impuesto afectado | Pagina 66
   */
  dDesTImp: DDesTImp;
  /**
   * D1 - D015 | Moneda de la operación | Pagina 66
   */
  cMoneOpe: CodigoMoneda;
  /**
   * D1 - D016 | Descripción de la moneda de la operación | Pagina 66
   */
  dDesMoneOpe: DescripcionCodigoMoneda;
  /**
   * D1 - D017 | Condición del tipo de cambio | Pagina 66
   */
  dCondTiCam?: ICondTiCam;
  /**
   * D1 - D018 | Tipo de cambio de la operación | Pagina 66
   */
  dTiCam?: number;
  /**
   * D1 - D019 | Condición del Anticipo | Pagina 66
   */
  iCondAnt?: ICondAnt;
  /**
   * D1 - D020 | Descripción de la condición del Anticipo | Pagina 66
   */
  dDesCondAnt?: DDesCondAnt;
}

/**
 * D2 - D100 | Grupo de campos que identifican al emisor | Pagina 67
 */
export interface gEmis {
  /**
   * D2 - D101 | RUC del contribuyente emisor | Pagina 67
   */
  dRucEm: string;
  /**
   * D2 - D102 | Dígito verificador del RUC del contribuyente emisor | Pagina 67
   */
  dDVEmi: number;
  /**
   * D2 - D103 | Tipo de contribuyente | Pagina 67
   */
  iTipCont: ITipCont;
  /**
   * D2 - D104 | Tipo de régimen | Pagina 67
   */
  cTipReg?: number;
  /**
   * D2 - D105 | Nombre o razón social del emisor del DE | Pagina 67
   */
  dNomEmi: string;
  /**
   * D2 - D106 | Nombre de fantasía | Pagina 67
   */
  dNomFanEmi?: string;
  /**
   * D2 - D107 | Dirección del local donde se emite el DE | Pagina 67
   */
  dDirEmi: string;
  /**
   * D2 - D108 | Número de casa | Pagina 67
   */
  dNumCas: number;
  /**
   * D2 - D109 | Complemento de dirección 1 | Pagina 67
   */
  dCompDir1?: string;
  /**
   * D2 - D110 | Complemento de dirección 2 | Pagina 67
   */
  dCompDir2?: string;
  /**
   * D2 - D111 | Código del departamento de emisión | Pagina 67
   */
  cDepEmi: CodigoDepartamento;
  /**
   * D2 - D112 | Descripción del departamento de emisión | Pagina 67
   */
  dDesDepEmi: DescripcionCodigoDepartamento;
  /**
   * D2 - D113 | Código del distrito de emisión | Pagina 67
   */
  cDisEmi?: CodigoDistrito;
  /**
   * D2 - D114 | Descripción del distrito de emisión | Pagina 67
   */
  dDesDisEmi?: DescripcionCodigoDistrito;
  /**
   * D2 - D115 | Código de la ciudad de emisión | Pagina 68
   */
  cCiuEmi: CodigoCiudad;
  /**
   * D2 - D116 | Descripción de la ciudad de emisión | Pagina 68
   */
  dDesCiuEmi: DescripcionCodigoCiudad;
  /**
   * D2 - D117 | Teléfono local de emisión de DE | Pagina 68
   */
  dTelEmi: string;
  /**
   * D2 - D118 | Correo electrónico del emisor | Pagina 68
   */
  dEmailE: string;
  /**
   * D2 - D119 | Denominación comercial de la sucursal | Pagina 68
   */
  dDenSuc?: string;
  /**
   * D2.1 - D130 | Grupo de campos que describen la actividad económica del emisor | Pagina 69
   */
  gActEco: gActEco[];
  /**
   * D2.2 - D140 | Grupo de campos que identifican al responsable de la generación del DE | Pagina 69
   */
  gRespDE?: gRespDE;
}

/**
 * D2.1 - D130 | Campos que describen la actividad económica del emisor | Pagina 69
 */
export interface gActEco {
  /**
   * D2.1 - D131 | Código de la actividad económica del emisor | Pagina 69
   */
  cActEco: string;
  /**
   * D2.1 - D132 | Descripción de la actividad económica del emisor | Pagina 69
   */
  dDesActEco: string;
}

/**
 * D2.2 - D140 | Campos que identifican al responsable de la generación del DE | Pagina 69
 */
export interface gRespDE {
  /**
   * D2.2 - D141 | Tipo de documento de identidad del responsable de la generación del DE | Pagina 69
   */
  iTipIDRespDE: ITipIDRespDE;
  /**
   * D2.2 - D142 | Descripción del tipo de documento de identidad del responsable de la generación del DE | Pagina 69
   */
  dDTipIDRespDE: DDTipIDRespDE;
  /**
   * D2.2 - D143 | Número de documento de identidad del responsable de la generación del DE | Pagina 69
   */
  dNumIDRespDE: string;
  /**
   * D2.2 - D144 | Nombre o razón social del responsable de la generación del DE | Pagina 69
   */
  dNomRespDE: string;
  /**
   * D2.2 - D145 | Cargo del responsable de la generación del DE | Pagina 69
   */
  dCarRespDE: string;
}

/**
 * D3 - D200 | Grupo de campos que identifican al receptor | Pagina 69
 */
export interface gDatRec {
  /**
   * D3 - D201 | Naturaleza del receptor | Pagina 70
   */
  iNatRec: INatRec;
  /**
   * D3 - D202 | Tipo de operación | Pagina 70
   */
  iTiOpe: ITiOpe;
  /**
   * D3 - D203 | Código de país del receptor | Pagina 70
   */
  cPaisRec: CodigoPais;
  /**
   * D3 - D204 | Descripción del país receptor | Pagina 70
   */
  dDesPaisRe: DescripcionCodigoPais;
  /**
   * D3 - D205 | Tipo de contribuyente receptor | Pagina 70
   */
  iTiContRec?: ITiContRec;
  /**
   * D3 - D206 | RUC del receptor | Pagina 70
   */
  dRucRec?: string;
  /**
   * D3 - D207 | Dígito verificador del RUC del receptor | Pagina 70
   */
  dDVRec?: number;
  /**
   * D3 - D208 | Tipo de documento de identidad del receptor | Pagina 70
   */
  iTipIDRec?: ITipIDRec;
  /**
   * D3 - D209 | Descripción del tipo de documento de identidad | Pagina 71
   */
  dDTipIDRec?: DDTipIDRec | string;
  /**
   * D3 - D210 | Número de documento de identidad | Pagina 71
   */
  dNumIDRec?: string;
  /**
   * D3 - D211 | Nombre o razón social del receptor del DE | Pagina 71
   */
  dNomRec: string;
  /**
   * D3 - D212 | Nombre de fantasía | Pagina 71
   */
  dNomFanRec?: string;
  /**
   * D3 - D213 | Dirección del receptor | Pagina 71
   */
  dDirRec?: string;
  /**
   * D3 - D213 | Número de casa del receptor | Pagina 71
   */
  dNumCasRec?: number;
  /**
   * D3 - D219 | Código del departamento del receptor | Pagina 71
   */
  dDepRec?: CodigoDepartamento;
  /**
   * D3 - D220 | Descripción del departamento del receptor | Pagina 71
   */
  dDesDepRec?: DescripcionCodigoDepartamento;
  /**
   * D3 - D221 | Código del distrito del receptor | Pagina 71
   */
  dDisRec?: CodigoDistrito;
  /**
   * D3 - D222 | Descripción del distrito del receptor | Pagina 71
   */
  dDesDisRec?: DescripcionCodigoDistrito;
  /**
   * D3 - D223 | Código de la ciudad del receptor | Pagina 72
   */
  cCiuRec?: CodigoCiudad;
  /**
   * D3 - D224 | Descripción de la ciudad del receptor | Pagina 72
   */
  dDesCiuRec?: DescripcionCodigoCiudad;
  /**
   * D3 - D214 | Número de teléfono del receptor | Pagina 72
   */
  dTelRec?: string;
  /**
   * D3 - D215 | Número de celular del receptor | Pagina 72
   */
  dCelRec?: string;
  /**
   * D3 - D216 | Correo electrónico del receptor | Pagina 72
   */
  dEmailRec?: string;
  /**
   * D3 - D217 | Código del cliente | Pagina 72
   */
  dCodCliente?: string;
}

// --- Enumeraciones ---

export const DSisFactValues = {
  SistemaContribuyente: 1,
  SIFENSolucionGratuita: 2
} as const;
export type DSisFact = (typeof DSisFactValues)[keyof typeof DSisFactValues];
export const DDesSisFactValues = {
  SistemaContribuyente: 'Sistema de facturación del contribuyente',
  SIFENSolucionGratuita: 'SIFEN solución gratuita'
} as const;
export type DDesSisFact = (typeof DDesSisFactValues)[keyof typeof DDesSisFactValues];

export const ITipEmiValues = {
  Normal: 1,
  Contingencia: 2
} as const;
export type ITipEmi = (typeof ITipEmiValues)[keyof typeof ITipEmiValues];
export const DDesTipEmiValues = {
  Normal: 'Normal',
  Contingencia: 'Contingencia'
} as const;
export type DDesTipEmi = (typeof DDesTipEmiValues)[keyof typeof DDesTipEmiValues];

export const ITiDEValues = {
  FacturaElectronica: 1,
  FacturaElectronicaExportacion: 2,
  FacturaElectronicaImportacion: 3,
  AutofacturaElectronica: 4,
  NotaCreditoElectronica: 5,
  NotaDebitoElectronica: 6,
  NotaRemisionElectronica: 7,
  ComprobanteRetencionElectronico: 8
} as const;
export type ITiDE = (typeof ITiDEValues)[keyof typeof ITiDEValues];
export const DDesTiDEValues = {
  FacturaElectronica: 'Factura electrónica',
  FacturaElectronicaExportacion: 'Factura electrónica de exportación',
  FacturaElectronicaImportacion: 'Factura electrónica de importación',
  AutofacturaElectronica: 'Autofactura electrónica',
  NotaCreditoElectronica: 'Nota de crédito electrónica',
  NotaDebitoElectronica: 'Nota de débito electrónica',
  NotaRemisionElectronica: 'Nota de remisión electrónica',
  ComprobanteRetencionElectronico: 'Comprobante de retención electrónico'
} as const;
export type DDesTiDE = (typeof DDesTiDEValues)[keyof typeof DDesTiDEValues];

export const ITipTraValues = {
  VentaMercaderia: 1,
  PrestacionServicios: 2,
  Mixto: 3,
  VentaActivoFijo: 4,
  VentaDivisas: 5,
  CompraDivisas: 6,
  PromocionOMuestras: 7,
  Donacion: 8,
  Anticipo: 9,
  CompraProductos: 10,
  CompraServicios: 11,
  VentaCreditoFiscal: 12,
  MuestrasMedicas: 13
} as const;
export type ITipTra = (typeof ITipTraValues)[keyof typeof ITipTraValues];
export const DDesTipTraValues = {
  VentaMercaderia: 'Venta de mercadería',
  PrestacionServicios: 'Prestación de servicios',
  Mixto: 'Mixto',
  VentaActivoFijo: 'Venta de activo fijo',
  VentaDivisas: 'Venta de divisas',
  CompraDivisas: 'Compra de divisas',
  PromocionOMuestras: 'Promoción o entrega de muestras',
  Donacion: 'Donación',
  Anticipo: 'Anticipo',
  CompraProductos: 'Compra de productos',
  CompraServicios: 'Compra de servicios',
  VentaCreditoFiscal: 'Venta de crédito fiscal',
  MuestrasMedicas: 'Muestras médicas (Art. 3 RG 24/2014)'
} as const;
export type DDesTipTra = (typeof DDesTipTraValues)[keyof typeof DDesTipTraValues];

export const ITImpValues = {
  IVA: 1,
  ISC: 2,
  Renta: 3,
  Ninguno: 4,
  IVA_Renta: 5
} as const;
export type ITImp = (typeof ITImpValues)[keyof typeof ITImpValues];
export const DDesTImpValues = {
  IVA: 'IVA',
  ISC: 'ISC',
  Renta: 'Renta',
  Ninguno: 'Ninguno',
  IVA_Renta: 'IVA - Renta'
} as const;
export type DDesTImp = (typeof DDesTImpValues)[keyof typeof DDesTImpValues];

export const ICondTiCamValues = {
  Global: 1,
  PorItem: 2
} as const;
export type ICondTiCam = (typeof ICondTiCamValues)[keyof typeof ICondTiCamValues];
export const DDesCondTiCamValues = {
  Global: 'Global (un solo tipo de cambio para todo el DE)',
  PorItem: 'Por ítem (tipo de cambio distinto por ítem)'
} as const;
export type DDesCondTiCam = (typeof DDesCondTiCamValues)[keyof typeof DDesCondTiCamValues];

export const ICondAntValues = {
  AnticipoGlobal: 1,
  AnticipoPorItem: 2
} as const;
export type ICondAnt = (typeof ICondAntValues)[keyof typeof ICondAntValues];
export const DDesCondAntValues = {
  AnticipoGlobal: 'Anticipo Global',
  AnticipoPorItem: 'Anticipo por Ítem'
} as const;
export type DDesCondAnt = (typeof DDesCondAntValues)[keyof typeof DDesCondAntValues];

export const ITipContValues = {
  PersonaFisica: 1,
  PersonaJuridica: 2
} as const;
export type ITipCont = (typeof ITipContValues)[keyof typeof ITipContValues];
export const DDesTipContValues = {
  PersonaFisica: 'Persona Física',
  PersonaJuridica: 'Persona Jurídica'
} as const;
export type DDesTipCont = (typeof DDesTipContValues)[keyof typeof DDesTipContValues];

export const INatRecValues = {
  Contribuyente: 1,
  NoContribuyente: 2
} as const;
export type INatRec = (typeof INatRecValues)[keyof typeof INatRecValues];
export const DDesNatRecValues = {
  Contribuyente: 'contribuyente',
  NoContribuyente: 'no contribuyente'
} as const;
export type DDesNatRec = (typeof DDesNatRecValues)[keyof typeof DDesNatRecValues];

export const ITiOpeValues = {
  B2B: 1,
  B2C: 2,
  B2G: 3,
  B2F: 4
} as const;
export type ITiOpe = (typeof ITiOpeValues)[keyof typeof ITiOpeValues];
export const DDesTiOpeValues = {
  B2B: 'B2B',
  B2C: 'B2C',
  B2G: 'B2G',
  B2F: 'B2F'
} as const;
export type DDesTiOpe = (typeof DDesTiOpeValues)[keyof typeof DDesTiOpeValues];

export const ITiContRecValues = {
  PersonaFisica: 1,
  PersonaJuridica: 2
} as const;
export type ITiContRec = (typeof ITiContRecValues)[keyof typeof ITiContRecValues];
export const DDesTiContRecValues = {
  PersonaFisica: 'Persona Física',
  PersonaJuridica: 'Persona Jurídica'
} as const;
export type DDesTiContRec = (typeof DDesTiContRecValues)[keyof typeof DDesTiContRecValues];

export const ITipIDRespDEValues = {
  CedulaParaguaya: 1,
  Pasaporte: 2,
  CedulaExtranjera: 3,
  CarnetResidencia: 4,
  Otro: 9
} as const;
export type ITipIDRespDE = (typeof ITipIDRespDEValues)[keyof typeof ITipIDRespDEValues];
export const DDTipIDRespDEValues = {
  CedulaParaguaya: 'Cédula paraguaya',
  Pasaporte: 'Pasaporte',
  CedulaExtranjera: 'Cédula extranjera',
  CarnetResidencia: 'Carnet de residencia',
  Otro: 'Otro'
} as const;
export type DDTipIDRespDE = (typeof DDTipIDRespDEValues)[keyof typeof DDTipIDRespDEValues];

export const ITipIDRecValues = {
  CedulaParaguaya: 1,
  Pasaporte: 2,
  CedulaExtranjera: 3,
  CarnetResidencia: 4,
  Innominado: 5,
  TarjetaDiplomatica: 6,
  Otro: 9
} as const;
export type ITipIDRec = (typeof ITipIDRecValues)[keyof typeof ITipIDRecValues];
export const DDTipIDRecValues = {
  CedulaParaguaya: 'Cédula paraguaya',
  Pasaporte: 'Pasaporte',
  CedulaExtranjera: 'Cédula extranjera',
  CarnetResidencia: 'Carnet de residencia',
  Innominado: 'Innominado',
  TarjetaDiplomatica: 'Tarjeta Diplomática de exoneración fiscal',
  Otro: 'Otro'
} as const;
export type DDTipIDRec = (typeof DDTipIDRecValues)[keyof typeof DDTipIDRecValues];
