// SIFEN E groups - E001..E899 (partial)

import type { CodigoMoneda } from '../../../gen/iso4217';
import type { CodigoPais, DescripcionCodigoPais } from '../../../gen/paises';

/**
 * E1 - E010 | Campos que componen la FE | Pagina 73
 */
export interface gCamFE {
  /**
   * E1 - E011 | Indicador de presencia | Pagina 73
   */
  iIndPres: IIndPres;
  /**
   * E1 - E012 | Descripción del indicador de presencia | Pagina 73
   */
  dDesIndPres: DDesIndPres | string;
  /**
   * E1 - E013 | Fecha futura del traslado de mercadería | Pagina 73
   */
  dFecEmNR?: string; // Format: AAAA-MM-DD
  /**
   * E1.1 - E020 | Campos que describen las informaciones de compras públicas | Pagina 73
   */
  gCompPub?: gCompPub;
}

/**
 * E1.1 - E020 | Campos que describen las informaciones de compras públicas | Pagina 73
 */
export interface gCompPub {
  /**
   * E1.1 - E021 | Modalidad - Código emitido por la DNCP | Pagina 73
   */
  dModCont: string;
  /**
   * E1.1 - E022 | Entidad - Código emitido por la DNCP | Pagina 73
   */
  dEntCont: number;
  /**
   * E1.1 - E023 | Año - Código emitido por la DNCP | Pagina 73
   */
  dAnoCont: number;
  /**
   * E1.1 - E024 | Secuencia - emitido por la DNCP | Pagina 73
   */
  dSecCont: number;
  /**
   * E1.1 - E025 | Fecha de emisión del código de contratación por la DNCP | Pagina 74
   */
  dFeCodCont: string; // Format: AAAA-MM-DD
}

/**
 * E7 - E600 | Campos que describen la condición de la operación | Pagina 80
 */
export interface gCamCond {
  /**
   * E7 - E601 | Condición de la operación | Pagina 80
   */
  iCondOpe: ICondOpe;
  /**
   * E7 - E602 | Descripción de la condición de operación | Pagina 80
   */
  dDCondOpe: DDCondOpe;
  /**
   * E7.1 - E605 | Campos que describen la forma de pago al contado o del monto de la entrega inicial | Pagina 80
   */
  gPaConEIni?: gPaConEIni[];
  /**
   * E7.2 - E640 | Campos que describen la operación a crédito | Pagina 84
   */
  gPagCred?: gPagCred;
}

/**
 * E7.1 - E605 | Campos que describen la forma de pago al contado o del monto de la entrega inicial | Pagina 80
 */
export interface gPaConEIni {
  /**
   * E7.1 - E606 | Tipo de pago | Pagina 81
   */
  iTiPago: ITiPago;
  /**
   * E7.1 - E607 | Descripción del tipo de pago | Pagina 81
   */
  dDesTiPag: string;
  /**
   * E7.1 - E608 | Monto por tipo de pago | Pagina 81
   */
  dMonTiPag: number;
  /**
   * E7.1 - E609 | Moneda por tipo de pago | Pagina 81
   */
  cMoneTiPag: CodigoMoneda;
  /**
   * E7.1 - E610 | Descripción de la moneda por tipo de pago | Pagina 81
   */
  dDMoneTiPag: string;
  /**
   * E7.1 - E611 | Tipo de cambio por tipo de pago | Pagina 81
   */
  dTiCamTiPag?: number;
  /**
   * E7.1.1 - E620 | Campos que describen el pago o entrega inicial de la operación con tarjeta de crédito/débito | Pagina 82
   */
  gPagTarCD?: gPagTarCD;
  /**
   * E7.1.2 - E630 | Campos que describen el pago o entrega inicial de la operación con cheque | Pagina 83
   */
  gPagCheq?: gPagCheq;
}

/**
 * E7.1.1 - E620 | Campos que describen el pago o entrega inicial de la operación con tarjeta de crédito/débito | Pagina 82
 */
export interface gPagTarCD {
  /**
   * E7.1.1 - E621 | Denominación de la tarjeta | Pagina 82
   */
  iDenTarj: IDenTarj;
  /**
   * E7.1.1 - E622 | Descripción de denominación de la tarjeta | Pagina 82
   */
  dDesDenTarj: string;
  /**
   * E7.1.1 - E623 | Razón social de la procesadora de tarjeta | Pagina 82
   */
  dRSProTar?: string;
  /**
   * E7.1.1 - E624 | RUC de la procesadora de tarjeta | Pagina 82
   */
  dRUCProTar?: string;
  /**
   * E7.1.1 - E625 | Dígito verificador del RUC de la procesadora de tarjeta | Pagina 82
   */
  dDVProTar?: number;
  /**
   * E7.1.1 - E626 | Forma de procesamiento de pago | Pagina 82
   */
  iForProPa: IForProPa;
  /**
   * E7.1.1 - E627 | Código de autorización de la operación | Pagina 82
   */
  dCodAuOpe?: string;
  /**
   * E7.1.1 - E628 | Nombre del titular de la tarjeta | Pagina 82
   */
  dNomTit?: string;
  /**
   * E7.1.1 - E629 | Número de la tarjeta | Pagina 83
   */
  dNumTarj?: string;
}

/**
 * E7.1.2 - E630 | Campos que describen el pago o entrega inicial de la operación con cheque | Pagina 83
 */
export interface gPagCheq {
  /**
   * E7.1.2 - E631 | Número de cheque | Pagina 83
   */
  dNumCheq: string;
  /**
   * E7.1.2 - E632 | Banco emisor | Pagina 83
   */
  dBcoEmi: string;
}

/**
 * E7.2 - E640 | Campos que describen la operación a crédito | Pagina 84
 */
export interface gPagCred {
  /**
   * E7.2 - E641 | Condición de la operación a crédito | Pagina 84
   */
  iCondCred: ICondCred;
  /**
   * E7.2 - E642 | Descripción de la condición de la operación a crédito | Pagina 84
   */
  dDCondCred: DDCondCred;
  /**
   * E7.2 - E643 | Plazo del crédito | Pagina 84
   */
  dPlazoCre?: string;
  /**
   * E7.2 - E644 | Cantidad de cuotas | Pagina 84
   */
  dCuotas?: number;
  /**
   * E7.2 - E645 | Monto de la entrega inicial | Pagina 84
   */
  dMonEnt?: number;
  /**
   * E7.2.1 - E650 | Campos que describen las cuotas | Pagina 84
   */
  gCuotas?: gCuotas[];
}

/**
 * E7.2.1 - E650 | Campos que describen las cuotas | Pagina 84
 */
export interface gCuotas {
  /**
   * E7.2.1 - E653 | Moneda de las cuotas | Pagina 84
   */
  cMoneCuo: CodigoMoneda;
  /**
   * E7.2.1 - E654 | Descripción de la moneda de las cuotas | Pagina 84
   */
  dDMoneCuo: string;
  /**
   * E7.2.1 - E655 | Monto de la cuota | Pagina 84
   */
  dMonCuota: number;
  /**
   * E7.2.1 - E656 | Vencimiento de la cuota | Pagina 84
   */
  dVencCuo?: string; // Format: AAAA-MM-DD
}

// Enums for E groups

export const IIndPresValues = {
  OperacionPresencial: 1,
  OperacionElectronica: 2,
  OperacionTelemarketing: 3,
  VentaDomicilio: 4,
  OperacionBancaria: 5,
  OperacionCiclica: 6,
  Otro: 9
} as const;
export type IIndPres = (typeof IIndPresValues)[keyof typeof IIndPresValues];

export const DDesIndPresValues = {
  OperacionPresencial: 'Operación presencial',
  OperacionElectronica: 'Operación electrónica',
  OperacionTelemarketing: 'Operación telemarketing',
  VentaDomicilio: 'Venta a domicilio',
  OperacionBancaria: 'Operación bancaria',
  OperacionCiclica: 'Operación cíclica',
  Otro: 'Otro'
} as const;
export type DDesIndPres = (typeof DDesIndPresValues)[keyof typeof DDesIndPresValues];

export const ICondOpeValues = {
  Contado: 1,
  Credito: 2
} as const;
export type ICondOpe = (typeof ICondOpeValues)[keyof typeof ICondOpeValues];

export const DDCondOpeValues = {
  Contado: 'Contado',
  Credito: 'Crédito'
} as const;
export type DDCondOpe = (typeof DDCondOpeValues)[keyof typeof DDCondOpeValues];

export const ITiPagoValues = {
  Efectivo: 1,
  Cheque: 2,
  TarjetaCredito: 3,
  TarjetaDebito: 4,
  Transferencia: 5,
  Giro: 6,
  BilleteraElectronica: 7,
  TarjetaEmpresarial: 8,
  Vale: 9,
  Retencion: 10,
  PagoAnticipo: 11,
  ValorFiscal: 12,
  ValorComercial: 13,
  Compensacion: 14,
  Permuta: 15,
  PagoBancario: 16,
  PagoMovil: 17,
  Donacion: 18,
  Promocion: 19,
  ConsumoInterno: 20,
  PagoElectronico: 21,
  Otro: 99
} as const;
export type ITiPago = (typeof ITiPagoValues)[keyof typeof ITiPagoValues];

export const IDenTarjValues = {
  Visa: 1,
  Mastercard: 2,
  AmericanExpress: 3,
  Maestro: 4,
  Panal: 5,
  Cabal: 6,
  Otro: 99
} as const;
export type IDenTarj = (typeof IDenTarjValues)[keyof typeof IDenTarjValues];

export const IForProPaValues = {
  POS: 1,
  PagoElectronico: 2,
  Otro: 9
} as const;
export type IForProPa = (typeof IForProPaValues)[keyof typeof IForProPaValues];

export const ICondCredValues = {
  Plazo: 1,
  Cuota: 2
} as const;
export type ICondCred = (typeof ICondCredValues)[keyof typeof ICondCredValues];

export const DDCondCredValues = {
  Plazo: 'Plazo',
  Cuota: 'Cuota'
} as const;
export type DDCondCred = (typeof DDCondCredValues)[keyof typeof DDCondCredValues];

/**
 * E5 - E400 | Campos de la Nota de Crédito/Débito Electrónica | Pagina 77
 */
export interface gCamNCDE {
  /**
   * E5 - E401 | Motivo de emisión | Pagina 77
   */
  iMotEmi: MotivoEmisionNCDE;
  /**
   * E5 - E402 | Descripción del motivo de emisión | Pagina 77
   */
  dDesMotEmi: DDesMotEmi;
}

export const MotivoEmisionNCDEValues = {
  DevolucionAjustePrecios: 1,
  Devolucion: 2,
  Descuento: 3,
  Bonificacion: 4,
  CreditoIncobrable: 5,
  RecuperoCosto: 6,
  RecuperoGasto: 7,
  AjustePrecio: 8
} as const;
export type MotivoEmisionNCDE =
  (typeof MotivoEmisionNCDEValues)[keyof typeof MotivoEmisionNCDEValues];
export const DDesMotEmiValues = {
  DevolucionAjustePrecios: 'Devolución y Ajuste de precios',
  Devolucion: 'Devolución',
  Descuento: 'Descuento',
  Bonificacion: 'Bonificación',
  CreditoIncobrable: 'Crédito incobrable',
  RecuperoCosto: 'Recupero de costo',
  RecuperoGasto: 'Recupero de gasto',
  AjustePrecio: 'Ajuste de precio'
} as const;
export type DDesMotEmi = (typeof DDesMotEmiValues)[keyof typeof DDesMotEmiValues];

export const CRelMercValues = {
  ToleranciaQuiebra: 1,
  ToleranciaMerma: 2
} as const;
export type CRelMerc = (typeof CRelMercValues)[keyof typeof CRelMercValues];
export const DDesRelMercValues = {
  ToleranciaQuiebra: 'Tolerancia de quiebra',
  ToleranciaMerma: 'Tolerancia de merma'
} as const;
export type DDesRelMerc = (typeof DDesRelMercValues)[keyof typeof DDesRelMercValues];

export const CUniMedValues = {
  Unidad: 77,
  KilogramosPorMetroCuadrado: 79,
  Kilogramos: 83,
  Gramos: 86,
  Metros: 87,
  Mililitros: 88,
  Litros: 89,
  Miligramos: 90,
  Centimetros: 91,
  CentimetrosCuadrados: 92,
  CentimetrosCubicos: 93,
  Pulgadas: 94,
  Milimetros: 95,
  MilimetrosCuadrados: 96,
  Año: 97,
  Mes: 98,
  Tonelada: 99,
  Hora: 100,
  Minuto: 101,
  Dia: 102,
  Yardas: 103,
  Determinacion: 104,
  MetrosMT: 108,
  MetrosCuadrados: 109,
  MetrosCubicos: 110,
  Racion: 569,
  Kilometros: 625,
  Segundo: 666,
  MetroLineal: 660,
  Hectareas: 869,
  UnidadMedidaGlobal: 885,
  PorMillaje: 891,
  UnidadInternacional: 2329,
  CostoPorMil: 2366
} as const;
export type CUniMed = (typeof CUniMedValues)[keyof typeof CUniMedValues];
export const DDesUniMedValues = {
  [CUniMedValues.Unidad]: 'UNI',
  [CUniMedValues.KilogramosPorMetroCuadrado]: 'kg/m²',
  [CUniMedValues.Kilogramos]: 'kg',
  [CUniMedValues.Gramos]: 'g',
  [CUniMedValues.Metros]: 'm',
  [CUniMedValues.Mililitros]: 'ML',
  [CUniMedValues.Litros]: 'LT',
  [CUniMedValues.Miligramos]: 'MG',
  [CUniMedValues.Centimetros]: 'CM',
  [CUniMedValues.CentimetrosCuadrados]: 'CM2',
  [CUniMedValues.CentimetrosCubicos]: 'CM3',
  [CUniMedValues.Pulgadas]: 'PUL',
  [CUniMedValues.Milimetros]: 'MM',
  [CUniMedValues.MilimetrosCuadrados]: 'MM2',
  [CUniMedValues.Año]: 'AA',
  [CUniMedValues.Mes]: 'ME',
  [CUniMedValues.Tonelada]: 'TN',
  [CUniMedValues.Hora]: 'Hs',
  [CUniMedValues.Minuto]: 'Mi',
  [CUniMedValues.Dia]: 'Di',
  [CUniMedValues.Yardas]: 'Ya',
  [CUniMedValues.Determinacion]: 'DET',
  [CUniMedValues.MetrosMT]: 'MT',
  [CUniMedValues.MetrosCuadrados]: 'M2',
  [CUniMedValues.MetrosCubicos]: 'M3',
  [CUniMedValues.Racion]: 'ración',
  [CUniMedValues.Kilometros]: 'Km',
  [CUniMedValues.Segundo]: 'Se',
  [CUniMedValues.MetroLineal]: 'ml',
  [CUniMedValues.Hectareas]: 'ha',
  [CUniMedValues.UnidadMedidaGlobal]: 'GL',
  [CUniMedValues.PorMillaje]: 'pm',
  [CUniMedValues.UnidadInternacional]: 'UI',
  [CUniMedValues.CostoPorMil]: 'CPM'
} as const;
export type DDesUniMed = (typeof DDesUniMedValues)[keyof typeof DDesUniMedValues];

/**
 * E8 - E700 | Campos que describen los ítems de la operación | Pagina 88
 */
export interface gCamItem {
  /** E8 - E701 | Código interno | Pagina 85 */
  dCodInt: string;
  /** E8 - E702 | Partida arancelaria | Pagina 85 */
  dParAranc?: number;
  /** E8 - E703 | NCM | Pagina 85 */
  dNCM?: number;
  /** E8 - E704 | Código DNCP – Nivel General | Pagina 85 */
  dDncpG?: string;
  /** E8 - E705 | Código DNCP – Nivel Específico | Pagina 85 */
  dDncpE?: string;
  /** E8 - E706 | Código GTIN por producto | Pagina 85 */
  dGtin?: number;
  /** E8 - E707 | Código GTIN por paquete | Pagina 85 */
  dGtinPq?: number;
  /** E8 - E708 | Descripción del producto y/o servicio | Pagina 86 */
  dDesProSer: string;
  /** E8 - E709 | Unidad de medida | Pagina 86 */
  cUniMed: CUniMed;
  /** E8 - E710 | Descripción de la unidad de medida | Pagina 86 */
  dDesUniMed: DDesUniMed;
  /** E8 - E711 | Cantidad del producto y/o servicio | Pagina 86 */
  dCantProSer: number;
  /** E8 - E712 | Código del país de origen del producto | Pagina 86 */
  cPaisOrig?: CodigoPais;
  /** E8 - E713 | Descripción del país de origen del producto | Pagina 86 */
  dDesPaisOrig?: DescripcionCodigoPais;
  /** E8 - E714 | Información de interés del emisor con respecto al ítem | Pagina 86 */
  dInfItem?: string;
  /** E8 - E715 | Código de datos de relevancia de las mercaderías | Pagina 86 */
  cRelMerc?: CRelMerc;
  /** E8 - E716 | Descripción del código de datos de relevancia de las mercaderías | Pagina 86 */
  dDesRelMerc?: DDesRelMerc;
  /** E8 - E717 | Cantidad de quiebra o merma | Pagina 86 */
  dCanQuiMer?: number;
  /** E8 - E718 | Porcentaje de quiebra o merma | Pagina 86 */
  dPorQuiMer?: number;
  /** E8 - E719 | CDC del anticipo | Pagina 86 */
  dCDCAnticipo?: string;
  /** E8.1 - E720 | Campos que describen los precios, descuentos y valor total por ítem | Pagina 86 */
  gValorItem?: gValorItem;
}

/**
 * E8.1 - E720 | Campos que describen los precios, descuentos y valor total por ítem | Pagina 88
 */
export interface gValorItem {
  /** E8.1 - E721 | Precio unitario del producto y/o servicio (incluidos impuestos) | Pagina 88 */
  dPUniProSer: number;
  /** E8.1 - E725 | Tipo de cambio por ítem | Pagina 88 */
  dTiCamIt?: number;
  /** E8.1 - E727 | Total bruto de la operación por ítem | Pagina 88 */
  dTotBruOpeItem: number;
  /** E8.1.1 - EA001-EA050 | Campos que describen descuentos, anticipos y valor total por ítem | Pagina 87 */
  gValorRestaItem: gValorRestaItem;
}

/**
 * E8.1.1 - EA001-EA050 | Campos que describen descuentos, anticipos y valor total por ítem | Pagina 87
 */
export interface gValorRestaItem {
  /** EA002 | dDescItem | Descuento particular sobre el precio unitario por ítem (incluidos impuestos) */
  dDescItem?: number;
  /** EA003 | dPorcDesIt | Porcentaje de descuento particular por ítem */
  dPorcDesIt?: number;
  /** EA004 | dDescGloItem | Descuento global sobre el precio unitario por ítem (incluidos impuestos) */
  dDescGloItem?: number;
  /** EA006 | dAntPreUniIt | Anticipo particular sobre el precio unitario por ítem (incluidos impuestos) */
  dAntPreUniIt?: number;
  /** EA007 | dAntGloPreUniIt | Anticipo global sobre el precio unitario por ítem (incluidos impuestos) */
  dAntGloPreUniIt?: number;
  /** EA008 | dTotOpeItem | Valor total de la operación por ítem */
  dTotOpeItem: number;
  /** EA009 | dTotOpeGs | Valor total de la operación por ítem en guaraníes */
  dTotOpeGs?: number;
}

/**
 * E3 - E300 | Campos que componen la Autofactura Electrónica | Pagina 76
 */
export interface gCamAE {
  /**
   * E4 - E301 | Naturaleza del vendedor | Pagina 76
   */
  iNatVen: INatVen;
  /**
   * E4 - E302 | Descripción de la naturaleza del vendedor | Pagina 76
   */
  dDesNatVen: DDesNatVen;
  /**
   * E4 - E304 | Tipo de documento de identidad del vendedor | Pagina 76
   */
  iTipIDVen: ITipIDVen;
  /**
   * E4 - E305 | Descripción del tipo de documento de identidad del vendedor | Pagina 76
   */
  dDTipIDVen: DDTipIDVen;
  /**
   * E4 - E306 | Número de documento de identidad del vendedor | Pagina 76
   */
  dNumIDVen: string;
  /**
   * E4 - E307 | Nombre y apellido del vendedor | Pagina 76
   */
  dNomVen: string;
  /**
   * E4 - E308 | Dirección del vendedor | Pagina 76
   */
  dDirVen: string;
  /**
   * E4 - E309 | Número de casa del vendedor | Pagina 76
   */
  dNumCasVen: number;
  /**
   * E4 - E310 | Código del departamento del vendedor | Pagina 76
   */
  cDepVen: number;
  /**
   * E4 - E311 | Descripción del departamento del vendedor | Pagina 76
   */
  dDesDepVen: string;
  /**
   * E4 - E312 | Código del distrito del vendedor | Pagina 76
   */
  cDisVen?: number;
  /**
   * E4 - E313 | Descripción del distrito del vendedor | Pagina 76
   */
  dDesDisVen?: string;
  /**
   * E4 - E314 | Código de la ciudad del vendedor | Pagina 76
   */
  cCiuVen: number;
  /**
   * E4 - E315 | Descripción de la ciudad del vendedor | Pagina 76
   */
  dDesCiuVen: string;
  /**
   * E4 - E316 | Lugar de la transacción | Pagina 76
   */
  dDirProv: string;
  /**
   * E4 - E317 | Código del departamento donde se realiza la transacción | Pagina 76
   */
  cDepProv: number;
  /**
   * E4 - E318 | Descripción del departamento donde se realiza la transacción | Pagina 76
   */
  dDesDepProv: string;
  /**
   * E4 - E319 | Código del distrito donde se realiza la transacción | Pagina 76
   */
  cDisProv?: number;
  /**
   * E4 - E320 | Descripción del distrito donde se realiza la transacción | Pagina 76
   */
  dDesDisProv?: string;
  /**
   * E4 - E321 | Código de la ciudad donde se realiza la transacción | Pagina 76
   */
  cCiuProv: number;
  /**
   * E4 - E322 | Descripción de la ciudad donde se realiza la transacción | Pagina 76
   */
  dDesCiuProv: string;
}

export const INatVenValues = {
  NoContribuyente: 1,
  Extranjero: 2
} as const;
export type INatVen = (typeof INatVenValues)[keyof typeof INatVenValues];

export const DDesNatVenValues = {
  NoContribuyente: 'No contribuyente',
  Extranjero: 'Extranjero'
} as const;
export type DDesNatVen = (typeof DDesNatVenValues)[keyof typeof DDesNatVenValues];

export const ITipIDVenValues = {
  CedulaParaguaya: 1,
  Pasaporte: 2,
  CedulaExtranjera: 3,
  CarnetResidencia: 4
} as const;
export type ITipIDVen = (typeof ITipIDVenValues)[keyof typeof ITipIDVenValues];

export const DDTipIDVenValues = {
  CedulaParaguaya: 'Cédula paraguaya',
  Pasaporte: 'Pasaporte',
  CedulaExtranjera: 'Cédula extranjera',
  CarnetResidencia: 'Carnet de residencia'
} as const;
export type DDTipIDVen = (typeof DDTipIDVenValues)[keyof typeof DDTipIDVenValues];

/**
 * E5 - E500 | Campos que componen la Nota de Remisión Electrónica | Pagina 78
 */
export interface gCamNRE {
  /**
   * E6 - E501 | Motivo de emisión | Pagina 78
   */
  iMotEmiNR: IMotEmiNR;
  /**
   * E6 - E502 | Descripción del motivo de emisión | Pagina 78
   */
  dDesMotEmiNR: string;
  /**
   * E6 - E503 | Responsable de la emisión de la Nota Remisión Electrónica | Pagina 78
   */
  iRespEmiNR: IRespEmiNR;
  /**
   * E6 - E504 | Descripción del responsable de la emisión de la Nota de Remisión Electrónica | Pagina 78
   */
  dDesRespEmiNR: DDesRespEmiNR;
  /**
   * E6 - E505 | Kilómetros estimados de recorrido | Pagina 78
   */
  dKmR?: number;
  /**
   * E6 - E506 | Fecha futura de emisión de la factura | Pagina 78
   */
  dFecEm?: string; // Format: AAAA-MM-DD
}

export const IMotEmiNRValues = {
  TrasladoVenta: 1,
  TrasladoConsignacion: 2,
  Exportacion: 3,
  TrasladoCompra: 4,
  Importacion: 5,
  TrasladoDevolucion: 6,
  TrasladoEntreLocales: 7,
  TrasladoTransformacion: 8,
  TrasladoReparacion: 9,
  TrasladoEmisorMovil: 10,
  ExhibicionDemostracion: 11,
  ParticipacionFerias: 12,
  TrasladoEncomienda: 13,
  Decomiso: 14,
  Otro: 99
} as const;
export type IMotEmiNR = (typeof IMotEmiNRValues)[keyof typeof IMotEmiNRValues];

export const IRespEmiNRValues = {
  EmisorFactura: 1,
  PoseedorFacturaBienes: 2,
  EmpresaTransportista: 3,
  DespachanteAduanas: 4,
  AgenteTransporteIntermediario: 5
} as const;
export type IRespEmiNR = (typeof IRespEmiNRValues)[keyof typeof IRespEmiNRValues];

export const DDesRespEmiNRValues = {
  EmisorFactura: 'Emisor de la factura',
  PoseedorFacturaBienes: 'Poseedor de la factura y bienes',
  EmpresaTransportista: 'Empresa transportista',
  DespachanteAduanas: 'Despachante de Aduanas',
  AgenteTransporteIntermediario: 'Agente de transporte o intermediario'
} as const;
export type DDesRespEmiNR = (typeof DDesRespEmiNRValues)[keyof typeof DDesRespEmiNRValues];

/**
 * G - G050 (E790) | Campos complementarios comerciales de uso específico | Pagina 109
 */
export interface gCamEsp {
  /**
   * E9.2 - E791 | Grupo del sector de energía eléctrica | Pagina 93
   */
  gGrupEner?: gGrupEner;
  /**
   * E9.3 - E800 | Grupo del sector de seguros | Pagina 93
   */
  gGrupSeg?: gGrupSeg;
  /**
   * E9.4 - E810 | Grupo del sector supermercados | Pagina 94
   */
  gGrupSup?: gGrupSup;
  /**
   * E9.5 - E820 | Grupo de datos adicionales de uso comercial | Pagina 94
   */
  gGrupAdi?: gGrupAdi;
}

/**
 * E9.2 - E791 | Grupo del sector de energía eléctrica | Pagina 93
 */
export interface gGrupEner {
  /**
   * E9.2 - E792 | Número de medidor | Pagina 93
   */
  dNroMed?: string;
  /**
   * E9.2 - E793 | Código de actividad | Pagina 93
   */
  dActiv?: number;
  /**
   * E9.2 - E794 | Código de categoría | Pagina 93
   */
  dCateg?: string;
  /**
   * E9.2 - E795 | Lectura anterior | Pagina 93
   */
  dLecAnt?: number;
  /**
   * E9.2 - E796 | Lectura actual | Pagina 93
   */
  dLecAct?: number;
  /**
   * E9.2 - E797 | Consumo | Pagina 93
   */
  dConKwh?: number;
}

/**
 * E9.3 - E800 | Grupo del sector de seguros | Pagina 93
 */
export interface gGrupSeg {
  /**
   * E9.3 - E801 | Código de la empresa de seguros en la Superintendencia de Seguros | Pagina 93
   */
  dCodEmpSeg?: string;
  /**
   * E9.3.1 - EA790 | Grupo de póliza de seguros | Pagina 93
   */
  gGrupPolSeg?: gGrupPolSeg[];
}

/**
 * E9.3.1 - EA790 | Grupo de póliza de seguros | Pagina 93
 */
export interface gGrupPolSeg {
  /**
   * E9.3.1 - EA791 | Código de la póliza | Pagina 93
   */
  dPoliza: string;
  /**
   * E9.3.1 - EA792 | Descripción de la unidad de tiempo de vigencia | Pagina 93
   */
  dUnidVig: string;
  /**
   * E9.3.1 - EA793 | Vigencia de la póliza | Pagina 93
   */
  dVigencia: number;
  /**
   * E9.3.1 - EA794 | Número de la póliza | Pagina 93
   */
  dNumPoliza: string;
  /**
   * E9.3.1 - EA795 | Fecha de inicio de vigencia | Pagina 93
   */
  dFecIniVig?: string; // Format: AAAA-MM-DDThh:mm:ss
  /**
   * E9.3.1 - EA796 | Fecha de fin de vigencia | Pagina 93
   */
  dFecFinVig?: string; // Format: AAAA-MM-DDThh:mm:ss
  /**
   * E9.3.1 - EA797 | Código interno del ítem | Pagina 93
   */
  dCodInt?: string;
}

/**
 * E9.4 - E810 | Grupo del sector supermercados | Pagina 94
 */
export interface gGrupSup {
  /**
   * E9.4 - E811 | Nombre del cajero | Pagina 94
   */
  dNomCaj?: string;
  /**
   * E9.4 - E812 | Efectivo | Pagina 94
   */
  dEfectivo?: number;
  /**
   * E9.4 - E813 | Vuelto | Pagina 94
   */
  dVuelto?: number;
  /**
   * E9.4 - E814 | Monto de la donación | Pagina 94
   */
  dDonac?: number;
  /**
   * E9.4 - E815 | Descripción de la donación | Pagina 94
   */
  dDesDonac?: string;
}

/**
 * E9.5 - E820 | Grupo de datos adicionales de uso comercial | Pagina 94
 */
export interface gGrupAdi {
  /**
   * E9.5 - E821 | Ciclo | Pagina 94
   */
  dCiclo?: string;
  /**
   * E9.5 - E822 | Fecha de inicio de ciclo | Pagina 94
   */
  dFecIniC?: string; // Format: AAAA-MM-DD
  /**
   * E9.5 - E823 | Fecha de fin de ciclo | Pagina 94
   */
  dFecFinC?: string; // Format: AAAA-MM-DD
  /**
   * E9.5 - E824 | Fecha de vencimiento para el pago | Pagina 94
   */
  dVencPag?: string[]; // Format: AAAA-MM-DD, 0-3 occurrences
  /**
   * E9.5 - E825 | Número de contrato | Pagina 95
   */
  dContrato?: string;
  /**
   * E9.5 - E826 | Saldo anterior | Pagina 95
   */
  dSalAnt?: number;
}

/**
 * E9 - E900 | Campos que describen el transporte de mercaderías | Pagina 95
 */
export interface gTransp {
  /**
   * E10 - E901 | Tipo de transporte | Pagina 95
   */
  iTipTrans?: ITipTrans;
  /**
   * E10 - E902 | Descripción del tipo de transporte | Pagina 95
   */
  dDesTipTrans?: DDesTipTrans;
  /**
   * E10 - E903 | Modalidad del transporte | Pagina 95
   */
  iModTrans: IModTrans;
  /**
   * E10 - E904 | Descripción de la modalidad del transporte | Pagina 95
   */
  dDesModTrans: DDesModTrans;
  /**
   * E10 - E905 | Responsable del costo del flete | Pagina 95
   */
  iRespFlete: IRespFlete;
  /**
   * E10 - E906 | Condición de la negociación | Pagina 95
   */
  cCondNeg?: string;
  /**
   * E10 - E907 | Número de manifiesto o conocimiento de carga | Pagina 96
   */
  dNuManif?: string;
  /**
   * E10 - E908 | Número de despacho de importación | Pagina 96
   */
  dNuDespImp?: string;
  /**
   * E10 - E909 | Fecha estimada de inicio de traslado | Pagina 96
   */
  dIniTras?: string; // Format: AAAA-MM-DD
  /**
   * E10 - E910 | Fecha estimada de fin de traslado | Pagina 96
   */
  dFinTras?: string; // Format: AAAA-MM-DD
  /**
   * E10 - E911 | Código del país de destino | Pagina 96
   */
  cPaisDest?: string;
  /**
   * E10 - E912 | Descripción del país de destino | Pagina 96
   */
  dDesPaisDest?: string;
  /**
   * E10.1 - E920 | Campos que identifican el local de salida de las mercaderías | Pagina 96
   */
  gCamSal?: gCamSal;
  /**
   * E10.2 - E940 | Campos que identifican el local de entrega de las mercaderías | Pagina 97
   */
  gCamEnt?: gCamEnt;
  /**
   * E10.3 - E960 | Campos que identifican el vehículo de traslado de mercaderías | Pagina 98
   */
  gVehTras?: gVehTras[];
  /**
   * E10.4 - E980 | Campos que identifican al transportista | Pagina 99
   */
  gCamTrans?: gCamTrans;
}

export const ITipTransValues = {
  Propio: 1,
  Tercero: 2
} as const;
export type ITipTrans = (typeof ITipTransValues)[keyof typeof ITipTransValues];

export const DDesTipTransValues = {
  Propio: 'Propio',
  Tercero: 'Tercero'
} as const;
export type DDesTipTrans = (typeof DDesTipTransValues)[keyof typeof DDesTipTransValues];

export const IModTransValues = {
  Terrestre: 1,
  Fluvial: 2,
  Aereo: 3,
  Multimodal: 4
} as const;
export type IModTrans = (typeof IModTransValues)[keyof typeof IModTransValues];

export const DDesModTransValues = {
  Terrestre: 'Terrestre',
  Fluvial: 'Fluvial',
  Aereo: 'Aéreo',
  Multimodal: 'Multimodal'
} as const;
export type DDesModTrans = (typeof DDesModTransValues)[keyof typeof DDesModTransValues];

export const IRespFleteValues = {
  EmisorFactura: 1,
  ReceptorFactura: 2,
  Tercero: 3,
  AgenteIntermediario: 4,
  TransportePropio: 5
} as const;
export type IRespFlete = (typeof IRespFleteValues)[keyof typeof IRespFleteValues];

/**
 * E10.1 - E920 | Campos que identifican el local de salida de las mercaderías | Pagina 96
 */
export interface gCamSal {
  /**
   * E10.1 - E921 | Dirección del local de salida | Pagina 96
   */
  dDirLocSal: string;
  /**
   * E10.1 - E922 | Número de casa de salida | Pagina 96
   */
  dNumCasSal: number;
  /**
   * E10.1 - E923 | Complemento de dirección 1 salida | Pagina 96
   */
  dComp1Sal?: string;
  /**
   * E10.1 - E924 | Complemento de dirección 2 salida | Pagina 97
   */
  dComp2Sal?: string;
  /**
   * E10.1 - E925 | Código del departamento de salida | Pagina 97
   */
  cDepSal?: number;
  /**
   * E10.1 - E926 | Descripción del departamento de salida | Pagina 97
   */
  dDesDepSal?: string;
  /**
   * E10.1 - E927 | Código del distrito de salida | Pagina 97
   */
  cDisSal?: number;
  /**
   * E10.1 - E928 | Descripción del distrito de salida | Pagina 97
   */
  dDesDisSal?: string;
  /**
   * E10.1 - E929 | Código de la ciudad de salida | Pagina 97
   */
  cCiuSal?: number;
  /**
   * E10.1 - E930 | Descripción de la ciudad de salida | Pagina 97
   */
  dDesCiuSal?: string;
  /**
   * E10.1 - E931 | Teléfono del local de salida | Pagina 97
   */
  dTelSal?: string;
}

/**
 * E10.2 - E940 | Campos que identifican el local de entrega de las mercaderías | Pagina 97
 */
export interface gCamEnt {
  /**
   * E10.2 - E941 | Dirección del local de entrega | Pagina 97
   */
  dDirLocEnt: string;
  /**
   * E10.2 - E942 | Número de casa de entrega | Pagina 97
   */
  dNumCasEnt: number;
  /**
   * E10.2 - E943 | Complemento de dirección 1 entrega | Pagina 97
   */
  dComp1Ent?: string;
  /**
   * E10.2 - E944 | Complemento de dirección 2 entrega | Pagina 97
   */
  dComp2Ent?: string;
  /**
   * E10.2 - E945 | Código del departamento de entrega | Pagina 97
   */
  cDepEnt?: number;
  /**
   * E10.2 - E946 | Descripción del departamento de entrega | Pagina 97
   */
  dDesDepEnt?: string;
  /**
   * E10.2 - E947 | Código del distrito de entrega | Pagina 97
   */
  cDisEnt?: number;
  /**
   * E10.2 - E948 | Descripción del distrito de entrega | Pagina 97
   */
  dDesDisEnt?: string;
  /**
   * E10.2 - E949 | Código de la ciudad de entrega | Pagina 97
   */
  cCiuEnt?: number;
  /**
   * E10.2 - E950 | Descripción de la ciudad de entrega | Pagina 97
   */
  dDesCiuEnt?: string;
  /**
   * E10.2 - E951 | Teléfono del local de entrega | Pagina 97
   */
  dTelEnt?: string;
}

/**
 * E10.3 - E960 | Campos que identifican el vehículo de traslado de mercaderías | Pagina 98
 */
export interface gVehTras {
  /**
   * E10.3 - E961 | Tipo de vehículo | Pagina 98
   */
  iTiVehTras: number;
  /**
   * E10.3 - E962 | Marca del vehículo | Pagina 98
   */
  dMarVeh: string;
  /**
   * E10.3 - E963 | Identificación del vehículo | Pagina 98
   */
  dTipIdenVeh?: number;
  /**
   * E10.3 - E965 | Número de matrícula del vehículo | Pagina 98
   */
  dNroMatVeh?: string;
  /**
   * E10.3 - E966 | Número de identificación del vehículo | Pagina 98
   */
  dNroIDVeh?: string;
  /**
   * E10.3 - E967 | Adicional del vehículo | Pagina 98
   */
  dAdicVeh?: string;
  /**
   * E10.3 - E968 | Número de matrícula del remolque | Pagina 98
   */
  dNroMatRem?: string;
  /**
   * E10.3 - E969 | Número de identificación del remolque | Pagina 98
   */
  dNroIDRem?: string;
}

/**
 * E10.4 - E980 | Campos que identifican al transportista | Pagina 99
 */
export interface gCamTrans {
  /**
   * E10.4 - E981 | Naturaleza del transportista | Pagina 99
   */
  iNatTrans: number;
  /**
   * E10.4 - E982 | Nombre o razón social del transportista | Pagina 99
   */
  dNomTrans: string;
  /**
   * E10.4 - E983 | RUC del transportista | Pagina 99
   */
  dRucTrans?: string;
  /**
   * E10.4 - E984 | Dígito verificador del RUC del transportista | Pagina 99
   */
  dDVTrans?: number;
  /**
   * E10.4 - E985 | Tipo de documento de identidad del transportista | Pagina 99
   */
  iTipIDTrans?: number;
  /**
   * E10.4 - E986 | Número de documento de identidad del transportista | Pagina 99
   */
  dNumIDTrans?: string;
  /**
   * E10.4 - E987 | Código del país del transportista | Pagina 99
   */
  cNacTrans?: string;
  /**
   * E10.4 - E988 | Descripción del país del transportista | Pagina 99
   */
  dDesNacTrans?: string;
  /**
   * E10.4 - E989 | Número de documento del agente de transporte | Pagina 99
   */
  dNumIDChof?: string;
  /**
   * E10.4 - E990 | Nombre del agente de transporte | Pagina 99
   */
  dNomChof?: string;
  /**
   * E10.4 - E991 | Dirección del agente de transporte | Pagina 99
   */
  dDomFisc?: string;
  /**
   * E10.4 - E992 | Dirección del transportista | Pagina 99
   */
  dDirChof?: string;
}
