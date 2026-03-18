// SIFEN E groups - E001..E899 (partial)

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
