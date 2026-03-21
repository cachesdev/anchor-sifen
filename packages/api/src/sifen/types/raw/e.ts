// SIFEN E groups - E001..E899 (partial)

import type { CodigoMoneda } from '../../../gen/iso4217';

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
  dDesIndPres: DDesIndPres;
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
  cUniMed: number;
  /** E8 - E710 | Descripción de la unidad de medida | Pagina 86 */
  dDesUniMed: string;
  /** E8 - E711 | Cantidad del producto y/o servicio | Pagina 86 */
  dCantProSer: number;
  /** E8 - E712 | Código del país de origen del producto | Pagina 86 */
  cPaisOrig?: string;
  /** E8 - E713 | Descripción del país de origen del producto | Pagina 86 */
  dDesPaisOrig?: string;
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
