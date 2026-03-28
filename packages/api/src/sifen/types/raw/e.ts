import type { CodigoCiudad, DescripcionCodigoCiudad } from '../../../gen/ciudades';
import type { CodigoDepartamento, DescripcionCodigoDepartamento } from '../../../gen/departamentos';
import type { CodigoDistrito, DescripcionCodigoDistrito } from '../../../gen/distritos';
import type { CodigoMoneda, DescripcionCodigoMoneda } from '../../../gen/monedas';
import type { CodigoPais, DescripcionCodigoPais } from '../../../gen/paises';
import type { DescripcionUnidadMedida, UnidadMedida } from '../enums';
import type {
  CCondNeg,
  CRelMerc,
  DDCondCred,
  DDCondOpe,
  DDesAfecIVA,
  DDesDenTarj,
  DDesIndPres,
  DDesModTrans,
  DDesMotEmi,
  DDesMotEmiNR,
  DDesNatVen,
  DDesRelMerc,
  DDesRespEmiNR,
  DDesTiPag,
  DDesTipCom,
  DDesTipOpVN,
  DDesTipTrans,
  DDTipIDTrans,
  DDTipIDVen,
  DTipIdenVeh,
  IAfecIVA,
  ICondCred,
  ICondOpe,
  IDenTarj,
  IForProPa,
  IIndPres,
  IModTrans,
  IMotEmi,
  IMotEmiNR,
  INatTrans,
  INatVen,
  IRespEmiNR,
  IRespFlete,
  ITiPago,
  ITipCom,
  ITipIDTrans,
  ITipIDVen,
  ITipOpVN,
  ITipTrans
} from './enums';

/**
 * E1 - E010 | Campos que componen la FE | Pagina 73
 */
export interface GCamFE {
  /**
   * E1 - E011 | Indicador de presencia | Pagina 74
   */
  iIndPres: IIndPres;
  /**
   * E1 - E012 | Descripción del indicador de presencia | Pagina 74
   */
  dDesIndPres: DDesIndPres;
  /**
   * E1 - E013 | Fecha futura del traslado de mercadería | Pagina 74
   *
   * Formato: AAAA-MM-DD
   */
  dFecEmNR?: string;
  /**
   * E1.1 - E020 | Campos que describen las informaciones de compras públicas | Pagina 74
   */
  gCompPub?: GCompPub;
}

/**
 * E1.1 - E020 | Campos que describen las informaciones de compras públicas | Pagina 74
 */
export interface GCompPub {
  /**
   * E1.1 - E021 | Modalidad - Código emitido por la DNCP | Pagina 74
   */
  dModCont: string;
  /**
   * E1.1 - E022 | Entidad - Código emitido por la DNCP | Pagina 74
   */
  dEntCont: number;
  /**
   * E1.1 - E023 | Año - Código emitido por la DNCP | Pagina 74
   */
  dAnoCont: number;
  /**
   * E1.1 - E024 | Secuencia - emitido por la DNCP | Pagina 74
   */
  dSecCont: number;
  /**
   * E1.1 - E025 | Fecha de emisión del código de contratación por la DNCP | Pagina 75
   *
   * Formato: AAAA-MM-DD
   */
  dFeCodCont: string;
}

/**
 * E4 - E300 | Campos que componen la Autofactura Electrónica | Pagina 75
 */
export interface GCamAE {
  /**
   * E4 - E301 | Naturaleza del vendedor | Pagina 75
   */
  iNatVen: INatVen;
  /**
   * E4 - E302 | Descripción de la naturaleza del vendedor | Pagina 75
   */
  dDesNatVen: DDesNatVen;
  /**
   * E4 - E304 | Tipo de documento de identidad del vendedor | Pagina 75
   */
  iTipIDVen: ITipIDVen;
  /**
   * E4 - E305 | Descripción del tipo de documento de identidad del vendedor | Pagina 75
   */
  dDTipIDVen: DDTipIDVen;
  /**
   * E4 - E306 | Número de documento de identidad del vendedor | Pagina 75
   */
  dNumIDVen: string;
  /**
   * E4 - E307 | Nombre y apellido del vendedor | Pagina 75
   */
  dNomVen: string;
  /**
   * E4 - E308 | Dirección del vendedor | Pagina 75
   */
  dDirVen: string;
  /**
   * E4 - E309 | Número de casa del vendedor | Pagina 75
   */
  dNumCasVen: number;
  /**
   * E4 - E310 | Código del departamento del vendedor | Pagina 76
   */
  cDepVen: CodigoDepartamento;
  /**
   * E4 - E311 | Descripción del departamento del vendedor | Pagina 76
   */
  dDesDepVen: DescripcionCodigoDepartamento;
  /**
   * E4 - E312 | Código del distrito del vendedor | Pagina 76
   */
  cDisVen?: CodigoDistrito;
  /**
   * E4 - E313 | Descripción del distrito del vendedor | Pagina 76
   */
  dDesDisVen?: DescripcionCodigoDistrito;
  /**
   * E4 - E314 | Código de la ciudad del vendedor | Pagina 76
   */
  cCiuVen: CodigoCiudad;
  /**
   * E4 - E315 | Descripción de la ciudad del vendedor | Pagina 76
   */
  dDesCiuVen: DescripcionCodigoCiudad;
  /**
   * E4 - E316 | Lugar de la transacción | Pagina 76
   */
  dDirProv: string;
  /**
   * E4 - E317 | Código del departamento donde se realiza la transacción | Pagina 76
   */
  cDepProv: CodigoDepartamento;
  /**
   * E4 - E318 | Descripción del departamento donde se realiza la transacción | Pagina 76
   */
  dDesDepProv: DescripcionCodigoDepartamento;
  /**
   * E4 - E319 | Código del distrito donde se realiza la transacción | Pagina 76
   */
  cDisProv?: CodigoDistrito;
  /**
   * E4 - E320 | Descripción del distrito donde se realiza la transacción | Pagina 76
   */
  dDesDisProv?: DescripcionCodigoDistrito;
  /**
   * E4 - E321 | Código de la ciudad donde se realiza la transacción | Pagina 76
   */
  cCiuProv: CodigoCiudad;
  /**
   * E4 - E322 | Descripción de la ciudad donde se realiza la transacción | Pagina 76
   */
  dDesCiuProv: DescripcionCodigoCiudad;
}

/**
 * E5 - E400 | Campos de la Nota de Crédito/Débito Electrónica | Pagina 77
 */
export interface GCamNCDE {
  /**
   * E5 - E401 | Motivo de emisión | Pagina 77
   */
  iMotEmi: IMotEmi;
  /**
   * E5 - E402 | Descripción del motivo de emisión | Pagina 77
   */
  dDesMotEmi: DDesMotEmi;
}

/**
 * E5 - E500 | Campos que componen la Nota de Remisión Electrónica | Pagina 77
 */
export interface GCamNRE {
  /**
   * E6 - E501 | Motivo de emisión | Pagina 78
   */
  iMotEmiNR: IMotEmiNR;
  /**
   * E6 - E502 | Descripción del motivo de emisión | Pagina 79
   */
  dDesMotEmiNR: DDesMotEmiNR;
  /**
   * E6 - E503 | Responsable de la emisión de la Nota Remisión Electrónica | Pagina 79
   */
  iRespEmiNR: IRespEmiNR;
  /**
   * E6 - E504 | Descripción del responsable de la emisión de la Nota de Remisión Electrónica | Pagina 79
   */
  dDesRespEmiNR: DDesRespEmiNR;
  /**
   * E6 - E505 | Kilómetros estimados de recorrido | Pagina 79
   */
  dKmR?: number;
  /**
   * E6 - E506 | Fecha futura de emisión de la factura | Pagina 79
   *
   *Formato: AAAA-MM-DD
   */
  dFecEm?: string;
}

/**
 * E7 - E600 | Campos que describen la condición de la operación | Pagina 80
 */
export interface GCamCond {
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
  gPaConEIni?: GPaConEIni[];
  /**
   * E7.2 - E640 | Campos que describen la operación a crédito | Pagina 84
   */
  gPagCred?: GPagCred;
}

/**
 * E7.1 - E605 | Campos que describen la forma de pago al contado o del monto de la entrega inicial | Pagina 80
 */
export interface GPaConEIni {
  /**
   * E7.1 - E606 | Tipo de pago | Pagina 81
   */
  iTiPago: ITiPago;
  /**
   * E7.1 - E607 | Descripción del tipo de pago | Pagina 82
   */
  dDesTiPag: DDesTiPag;
  /**
   * E7.1 - E608 | Monto por tipo de pago | Pagina 82
   */
  dMonTiPag: number;
  /**
   * E7.1 - E609 | Moneda por tipo de pago | Pagina 82
   */
  cMoneTiPag: CodigoMoneda;
  /**
   * E7.1 - E610 | Descripción de la moneda por tipo de pago | Pagina 82
   */
  dDMoneTiPag: DescripcionCodigoMoneda;
  /**
   * E7.1 - E611 | Tipo de cambio por tipo de pago | Pagina 82
   */
  dTiCamTiPag?: number;
  /**
   * E7.1.1 - E620 | Campos que describen el pago o entrega inicial de la operación con tarjeta de crédito/débito | Pagina 83
   */
  gPagTarCD?: GPagTarCD;
  /**
   * E7.1.2 - E630 | Campos que describen el pago o entrega inicial de la operación con cheque | Pagina 84
   */
  gPagCheq?: GPagCheq;
}

/**
 * E7.1.1 - E620 | Campos que describen el pago o entrega inicial de la operación con tarjeta de crédito/débito | Pagina 83
 */
export interface GPagTarCD {
  /**
   * E7.1.1 - E621 | Denominación de la tarjeta | Pagina 83
   */
  iDenTarj: IDenTarj;
  /**
   * E7.1.1 - E622 | Descripción de denominación de la tarjeta | Pagina 83
   */
  dDesDenTarj: DDesDenTarj;
  /**
   * E7.1.1 - E623 | Razón social de la procesadora de tarjeta | Pagina 83
   */
  dRSProTar?: string;
  /**
   * E7.1.1 - E624 | RUC de la procesadora de tarjeta | Pagina 83
   */
  dRUCProTar?: string;
  /**
   * E7.1.1 - E625 | Dígito verificador del RUC de la procesadora de tarjeta | Pagina 83
   */
  dDVProTar?: number;
  /**
   * E7.1.1 - E626 | Forma de procesamiento de pago | Pagina 83
   */
  iForProPa: IForProPa;
  /**
   * E7.1.1 - E627 | Código de autorización de la operación | Pagina 83
   */
  dCodAuOpe?: string;
  /**
   * E7.1.1 - E628 | Nombre del titular de la tarjeta | Pagina 83
   */
  dNomTit?: string;
  /**
   * E7.1.1 - E629 | Número de la tarjeta | Pagina 84
   */
  dNumTarj?: string;
}

/**
 * E7.1.2 - E630 | Campos que describen el pago o entrega inicial de la operación con cheque | Pagina 84
 */
export interface GPagCheq {
  /**
   * E7.1.2 - E631 | Número de cheque | Pagina 84
   */
  dNumCheq: string;
  /**
   * E7.1.2 - E632 | Banco emisor | Pagina 84
   */
  dBcoEmi: string;
}

/**
 * E7.2 - E640 | Campos que describen la operación a crédito | Pagina 84
 */
export interface GPagCred {
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
   * E7.2.1 - E650 | Campos que describen las cuotas | Pagina 85
   */
  gCuotas?: GCuotas[];
}

/**
 * E7.2.1 - E650 | Campos que describen las cuotas | Pagina 85
 */
export interface GCuotas {
  /**
   * E7.2.1 - E653 | Moneda de las cuotas | Pagina 85
   */
  cMoneCuo: CodigoMoneda;
  /**
   * E7.2.1 - E654 | Descripción de la moneda de las cuotas | Pagina 85
   */
  dDMoneCuo: DescripcionCodigoMoneda;
  /**
   * E7.2.1 - E651 | Monto de la cuota | Pagina 85
   */
  dMonCuota: number;
  /**
   * E7.2.1 - E652 | Vencimiento de la cuota | Pagina 84
   *
   * Formato: AAAA-MM-DD
   */
  dVencCuo?: string;
}

/**
 * E8 - E700 | Campos que describen los ítems de la operación | Pagina 85
 */
export interface GCamItem {
  /**
   * E8 - E701 | Código interno | Pagina 85
   */
  dCodInt: string;
  /**
   * E8 - E702 | Partida arancelaria | Pagina 85
   */
  dParAranc?: number;
  /**
   * E8 - E703 | Nomenclatura común del Mercosur (NCM) | Pagina 85
   */
  dNCM?: number;
  /**
   * E8 - E704 | Código DNCP – Nivel General | Pagina 86
   */
  dDncpG?: string;
  /**
   * E8 - E705 | Código DNCP – Nivel Específico | Pagina 86
   */
  dDncpE?: string;
  /**
   * E8 - E706 | Código GTIN por producto | Pagina 86
   */
  dGtin?: number;
  /**
   * E8 - E707 | Código GTIN por paquete | Pagina 86
   */
  dGtinPq?: number;
  /**
   * E8 - E708 | Descripción del producto y/o servicio | Pagina 86
   */
  dDesProSer: string;
  /**
   * E8 - E709 | Unidad de medida | Pagina 86
   */
  cUniMed: UnidadMedida;
  /**
   * E8 - E710 | Descripción de la unidad de medida | Pagina 86
   */
  dDesUniMed: DescripcionUnidadMedida;
  /**
   * E8 - E711 | Cantidad del producto y/o servicio | Pagina 86
   */
  dCantProSer: number;
  /**
   * E8 - E712 | Código del país de origen del producto | Pagina 86
   */
  cPaisOrig?: CodigoPais;
  /**
   * E8 - E713 | Descripción del país de origen del producto | Pagina 86
   */
  dDesPaisOrig?: DescripcionCodigoPais;
  /**
   * E8 - E714 | Información de interés del emisor con respecto al ítem | Pagina 86
   */
  dInfItem?: string;
  /**
   * E8 - E715 | Código de datos de relevancia de las mercaderías | Pagina 86
   */
  cRelMerc?: CRelMerc;
  /**
   * E8 - E716 | Descripción del código de datos de relevancia de las mercaderías | Pagina 86
   */
  dDesRelMerc?: DDesRelMerc;
  /**
   * E8 - E717 | Cantidad de quiebra o merma | Pagina 87
   */
  dCanQuiMer?: number;
  /**
   * E8 - E718 | Porcentaje de quiebra o merma | Pagina 87
   */
  dPorQuiMer?: number;
  /**
   * E8 - E719 | CDC del anticipo | Pagina 87
   */
  dCDCAnticipo?: string;
  /**
   * E8.1 - E720 | Campos que describen los precios, descuentos y valor total por ítem | Pagina 87
   */
  gValorItem?: GValorItem;
  /**
   * E8.2 - E730 | Campos que describen el IVA de la operación por ítem | Pagina 89
   */
  gCamIVA?: GCamIVA;
  /**
   * E8.4 - E750 | Grupo de rastreo de la mercadería | Pagina 90
   */
  gRasMerc?: GRasMerc;
  /**
   * E8.5 - E770 | Grupo de detalle de vehículos nuevos | Pagina 91
   */
  gVehNuevo?: GVehNuevo;
}

/**
 * E8.1 - E720 | Campos que describen los precios, descuentos y valor total por ítem | Pagina 87
 */
export interface GValorItem {
  /**
   * E8.1 - E721 | Precio unitario del producto y/o servicio (incluidos impuestos) | Pagina 87
   */
  dPUniProSer: number;
  /**
   * E8.1 - E725 | Tipo de cambio por ítem | Pagina 87
   */
  dTiCamIt?: number;
  /**
   * E8.1 - E727 | Total bruto de la operación por ítem | Pagina 87
   */
  dTotBruOpeItem: number;
  /**
   * E8.1.1 - EA001 | Campos que describen descuentos, anticipos y valor total por ítem | Pagina 87
   */
  gValorRestaItem: GValorRestaItem;
}

/**
 * E8.1.1 - EA001 | Campos que describen descuentos, anticipos y valor total por ítem | Pagina 87
 */
export interface GValorRestaItem {
  /**
   * E8.1.1 - EA002 | Descuento particular sobre el precio unitario por ítem (incluidos impuestos) | Pagina 88
   */
  dDescItem?: number;
  /**
   * E8.1.1 - EA003 | Porcentaje de descuento particular por ítem | Pagina 88
   */
  dPorcDesIt?: number;
  /**
   * E8.1.1 - EA004 | Descuento global sobre el precio unitario por ítem (incluidos impuestos) | Pagina 88
   */
  dDescGloItem?: number;
  /**
   * E8.1.1 - EA006 | Anticipo particular sobre el precio unitario por ítem (incluidos impuestos) | Pagina 88
   */
  dAntPreUniIt?: number;
  /**
   * E8.1.1 - EA007 | Anticipo global sobre el precio unitario por ítem (incluidos impuestos) | Pagina 88
   */
  dAntGloPreUniIt?: number;
  /**
   * E8.1.1 - EA008 | Valor total de la operación por ítem | Pagina 89
   */
  dTotOpeItem: number;
  /**
   * E8.1.1 - EA009 | Valor total de la operación por ítem en guaraníes | Pagina 89
   */
  dTotOpeGs?: number;
}

/**
 * E8.2 - E730 | Campos que describen el IVA de la operación por ítem | Pagina 89
 */
export interface GCamIVA {
  /**
   * E8.2 - E731 | Forma de afectación tributaria del IVA | Pagina 89
   */
  iAfecIVA: IAfecIVA;
  /**
   * E8.2 - E732 | Descripción de la forma de afectación tributaria del IVA | Pagina 90
   */
  dDesAfecIVA: DDesAfecIVA;
  /**
   * E8.2 - E733 | Proporción gravada de IVA | Pagina 90
   */
  dPropIVA: number;
  /**
   * E8.2 - E734 | Tasa del IVA | Pagina 90
   */
  dTasaIVA: number;
  /**
   * E8.2 - E735 | Base gravada del IVA por ítem | Pagina 90
   */
  dBasGravIVA: number;
  /**
   * E8.2 - E736 | Liquidación del IVA por ítem | Pagina 90
   */
  dLiqIVAItem: number;
}

/**
 * E8.4 - E750 | Grupo de rastreo de la mercadería | Pagina 90
 */
export interface GRasMerc {
  /**
   * E8.4 - E751 | Número de lote | Pagina 90
   */
  dNumLote?: string;
  /**
   * E8.4 - E752 | Fecha de vencimiento de la mercadería | Pagina 91
   *
   * Formato: AAAA-MM-DD
   */
  dVencMerc?: string;
  /**
   * E8.4 - E753 | Número de serie | Pagina 91
   */
  dNSerie?: string;
  /**
   * E8.4 - E754 | Número de pedido | Pagina 91
   */
  dNumPedi?: string;
  /**
   * E9.4 - E755 | Número de seguimiento del envío | Pagina 91
   */
  dNumSegui?: string;
  /**
   * E8.4 - E756 | Nombre del Importador | Pagina 91
   */
  dNomImp?: string;
  /**
   * E8.4 - E757 | Dirección de Importador | Pagina 91
   */
  dDirImp?: string;
  /**
   * E8.4 - E758 | Número de registro de la firma del importador | Pagina 91
   */
  dNumFir?: string;
  /**
   * E8.4 - E759 | Número de registro del producto otorgado por el SENAVE | Pagina 91
   */
  dNumReg?: string;
  /**
   * E8.4 - E760 | Número de registro de entidad comercial otorgado por el SENAVE | Pagina 91
   */
  dNumRegEntCom?: string;
}

/**
 * E8.5 - E770 | Grupo de detalle de vehículos nuevos | Pagina 91
 */
export interface GVehNuevo {
  /**
   * E8.5 - E771 | Tipo de operación de venta de vehículos | Pagina 91
   */
  iTipOpVN?: ITipOpVN;
  /**
   * E8.5 - E772 | Descripción del tipo de operación de venta de vehículos | Pagina 92
   */
  dDesTipOpVN?: DDesTipOpVN;
  /**
   * E8.5 - E773 | Chasis del vehículo | Pagina 92
   */
  dChasis?: string;
  /**
   * E8.5 - E774 | Color del vehículo | Pagina 92
   */
  dColor?: string;
  /**
   * E8.5 - E775 | Potencia del motor (CV) | Pagina 92
   */
  dPotencia?: number;
  /**
   * E8.5 - E776 | Capacidad del motor | Pagina 92
   */
  dCapMot?: number;
  /**
   * E8.5 - E777 | Peso Neto | Pagina 92
   */
  dPNet?: number;
  /**
   * E8.5 - E778 | Peso Bruto | Pagina 92
   */
  dPBruto?: number;
  /**
   * E8.5 - E779 | Tipo de combustible | Pagina 92
   */
  iTipCom?: ITipCom;
  /**
   * E8.5 - E780 | Descripción del tipo de combustible | Pagina 92
   */
  dDesTipCom?: DDesTipCom;
  /**
   * E8.5 - E781 | Número del motor | Pagina 92
   */
  dNroMotor?: string;
  /**
   * E8.5 - E782 | Capacidad máxima de tracción | Pagina 92
   */
  dCapTracc?: number;
  /**
   * E8.5 - E783 | Año de fabricación | Pagina 92
   */
  dAnoFab?: number;
  /**
   * E8.5 - E784 | Tipo de vehículo | Pagina 92
   */
  cTipVeh?: string;
  /**
   * E8.5 - E785 | Capacidad máxima de pasajeros | Pagina 92
   */
  dCapac?: number;
  /**
   * E8.5 - E786 | Cilindradas del motor | Pagina 92
   */
  dCilin?: string;
}

/**
 * E9 - E790 | Campos complementarios comerciales de uso específico | Pagina 93
 */
export interface GCamEsp {
  /**
   * E9.2 - E791 | Grupo del sector de energía eléctrica | Pagina 93
   */
  gGrupEner?: GGrupEner;
  /**
   * E9.3 - E800 | Grupo del sector de seguros | Pagina 94
   */
  gGrupSeg?: GGrupSeg;
  /**
   * E9.4 - E810 | Grupo del sector supermercados | Pagina 95
   */
  gGrupSup?: GGrupSup;
  /**
   * E9.5 - E820 | Grupo de datos adicionales de uso comercial | Pagina 95
   */
  gGrupAdi?: GGrupAdi;
}

/**
 * E9.2 - E791 | Grupo del sector de energía eléctrica | Pagina 93
 */
export interface GGrupEner {
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
 * E9.3 - E800 | Grupo del sector de seguros | Pagina 94
 */
export interface GGrupSeg {
  /**
   * E9.3 - E801 | Código de la empresa de seguros en la Superintendencia de Seguros | Pagina 94
   */
  dCodEmpSeg?: string;
  /**
   * E9.3.1 - EA790 | Grupo de póliza de seguros | Pagina 94
   */
  gGrupPolSeg?: GGrupPolSeg[];
}

/**
 * E9.3.1 - EA790 | Grupo de póliza de seguros | Pagina 94
 */
export interface GGrupPolSeg {
  /**
   * E9.3.1 - EA791 | Código de la póliza | Pagina 94
   */
  dPoliza: string;
  /**
   * E9.3.1 - EA792 | Descripción de la unidad de tiempo de vigencia | Pagina 94
   */
  dUnidVig: string;
  /**
   * E9.3.1 - EA793 | Vigencia de la póliza | Pagina 94
   */
  dVigencia: number;
  /**
   * E9.3.1 - EA794 | Número de la póliza | Pagina 94
   */
  dNumPoliza: string;
  /**
   * E9.3.1 - EA795 | Fecha de inicio de vigencia | Pagina 94
   *
   * Formato: AAAA-MM-DDThh:mm:ss
   */
  dFecIniVig?: string;
  /**
   * E9.3.1 - EA796 | Fecha de fin de vigencia | Pagina 94
   *
   * Formato: AAAA-MM-DDThh:mm:ss
   */
  dFecFinVig?: string;
  /**
   * E9.3.1 - EA797 | Código interno del ítem | Pagina 94
   */
  dCodInt?: string;
}

/**
 * E9.4 - E810 | Grupo del sector supermercados | Pagina 95
 */
export interface GGrupSup {
  /**
   * E9.4 - E811 | Nombre del cajero | Pagina 95
   */
  dNomCaj?: string;
  /**
   * E9.4 - E812 | Efectivo | Pagina 95
   */
  dEfectivo?: number;
  /**
   * E9.4 - E813 | Vuelto | Pagina 95
   */
  dVuelto?: number;
  /**
   * E9.4 - E814 | Monto de la donación | Pagina 95
   */
  dDonac?: number;
  /**
   * E9.4 - E815 | Descripción de la donación | Pagina 95
   */
  dDesDonac?: string;
}

/**
 * E9.5 - E820 | Grupo de datos adicionales de uso comercial | Pagina 95
 */
export interface GGrupAdi {
  /**
   * E9.5 - E821 | Ciclo | Pagina 95
   */
  dCiclo?: string;
  /**
   * E9.5 - E822 | Fecha de inicio de ciclo | Pagina 95
   *
   * Formato: AAAA-MM-DD
   */
  dFecIniC?: string;
  /**
   * E9.5 - E823 | Fecha de fin de ciclo | Pagina 95
   *
   * Formato: AAAA-MM-DD
   */
  dFecFinC?: string;
  /**
   * E9.5 - E824 | Fecha de vencimiento para el pago | Pagina 95
   *
   * Formato: AAAA-MM-DD
   */
  dVencPag?: string[];
  /**
   * E9.5 - E825 | Número de contrato | Pagina 96
   */
  dContrato?: string;
  /**
   * E9.5 - E826 | Saldo anterior | Pagina 96
   */
  dSalAnt?: number;
}

/**
 * E10 - E900 | Campos que describen el transporte de mercaderías | Pagina 95
 */
export interface GTransp {
  /**
   * E10 - E901 | Tipo de transporte | Pagina 96
   */
  iTipTrans?: ITipTrans;
  /**
   * E10 - E902 | Descripción del tipo de transporte | Pagina 96
   */
  dDesTipTrans?: DDesTipTrans;
  /**
   * E10 - E903 | Modalidad del transporte | Pagina 96
   */
  iModTrans: IModTrans;
  /**
   * E10 - E904 | Descripción de la modalidad del transporte | Pagina 96
   */
  dDesModTrans: DDesModTrans;
  /**
   * E10 - E905 | Responsable del costo del flete | Pagina 96
   */
  iRespFlete: IRespFlete;
  /**
   * E10 - E906 | Condición de la negociación | Pagina 96
   */
  cCondNeg?: CCondNeg;
  /**
   * E10 - E907 | Número de manifiesto o conocimiento de carga | Pagina 97
   */
  dNuManif?: string;
  /**
   * E10 - E908 | Número de despacho de importación | Pagina 97
   */
  dNuDespImp?: string;
  /**
   * E10 - E909 | Fecha estimada de inicio de traslado | Pagina 97
   *
   * Formato: AAAA-MM-DD
   */
  dIniTras?: string;
  /**
   * E10 - E910 | Fecha estimada de fin de traslado | Pagina 97
   *
   * Formato: AAAA-MM-DD
   */
  dFinTras?: string;
  /**
   * E10 - E911 | Código del país de destino | Pagina 97
   */
  cPaisDest?: CodigoPais;
  /**
   * E10 - E912 | Descripción del país de destino | Pagina 97
   */
  dDesPaisDest?: DescripcionCodigoPais;
  /**
   * E10.1 - E920 | Campos que identifican el local de salida de las mercaderías | Pagina 97
   */
  gCamSal?: GCamSal;
  /**
   * E10.2 - E940 | Campos que identifican el local de entrega de las mercaderías | Pagina 98
   */
  gCamEnt?: GCamEnt[];
  /**
   * E10.3 - E960 | Campos que identifican el vehículo de traslado de mercaderías | Pagina 98
   */
  gVehTras?: GVehTras[];
  /**
   * E10.4 - E980 | Campos que identifican al transportista | Pagina 100
   */
  gCamTrans?: GCamTrans;
}

/**
 * E10.1 - E920 | Campos que identifican el local de salida de las mercaderías | Pagina 97
 */
export interface GCamSal {
  /**
   * E10.1 - E921 | Dirección del local de salida | Pagina 97
   */
  dDirLocSal: string;
  /**
   * E10.1 - E922 | Número de casa de salida | Pagina 97
   */
  dNumCasSal: number;
  /**
   * E10.1 - E923 | Complemento de dirección 1 salida | Pagina 97
   */
  dComp1Sal?: string;
  /**
   * E10.1 - E924 | Complemento de dirección 2 salida | Pagina 98
   */
  dComp2Sal?: string;
  /**
   * E10.1 - E925 | Código del departamento de salida | Pagina 98
   */
  cDepSal?: CodigoDepartamento;
  /**
   * E10.1 - E926 | Descripción del departamento de salida | Pagina 98
   */
  dDesDepSal?: DescripcionCodigoDepartamento;
  /**
   * E10.1 - E927 | Código del distrito de salida | Pagina 98
   */
  cDisSal?: CodigoDistrito;
  /**
   * E10.1 - E928 | Descripción del distrito de salida | Pagina 98
   */
  dDesDisSal?: DescripcionCodigoDistrito;
  /**
   * E10.1 - E929 | Código de la ciudad de salida | Pagina 98
   */
  cCiuSal?: CodigoCiudad;
  /**
   * E10.1 - E930 | Descripción de la ciudad de salida | Pagina 98
   */
  dDesCiuSal?: DescripcionCodigoCiudad;
  /**
   * E10.1 - E931 | Teléfono del local de salida | Pagina 98
   */
  dTelSal?: string;
}

/**
 * E10.2 - E940 | Campos que identifican el local de entrega de las mercaderías | Pagina 98
 */
export interface GCamEnt {
  /**
   * E10.2 - E941 | Dirección del local de entrega | Pagina 98
   */
  dDirLocEnt: string;
  /**
   * E10.2 - E942 | Número de casa de entrega | Pagina 98
   */
  dNumCasEnt: number;
  /**
   * E10.2 - E943 | Complemento de dirección 1 entrega | Pagina 99
   */
  dComp1Ent?: string;
  /**
   * E10.2 - E944 | Complemento de dirección 2 entrega | Pagina 99
   */
  dComp2Ent?: string;
  /**
   * E10.2 - E945 | Código del departamento de entrega | Pagina 99
   */
  cDepEnt: CodigoDepartamento;
  /**
   * E10.2 - E946 | Descripción del departamento de entrega | Pagina 99
   */
  dDesDepEnt: DescripcionCodigoDepartamento;
  /**
   * E10.2 - E947 | Código del distrito de entrega | Pagina 99
   */
  cDisEnt?: CodigoDistrito;
  /**
   * E10.2 - E948 | Descripción del distrito de entrega | Pagina 99
   */
  dDesDisEnt?: DescripcionCodigoDistrito;
  /**
   * E10.2 - E949 | Código de la ciudad de entrega | Pagina 99
   */
  cCiuEnt: CodigoCiudad;
  /**
   * E10.2 - E950 | Descripción de la ciudad de entrega | Pagina 99
   */
  dDesCiuEnt: DescripcionCodigoCiudad;
  /**
   * E10.2 - E951 | Teléfono del local de entrega | Pagina 99
   */
  dTelEnt?: string;
}

/**
 * E10.4 - E980 | Campos que identifican al transportista | Pagina 99
 */
export interface GCamTrans {
  /**
   * E10.4 - E981 | Naturaleza del transportista | Pagina 100
   */
  iNatTrans: INatTrans;
  /**
   * E10.4 - E982 | Nombre o razón social del transportista | Pagina 100
   */
  dNomTrans: string;
  /**
   * E10.4 - E983 | RUC del transportista | Pagina 100
   */
  dRucTrans?: string;
  /**
   * E10.4 - E984 | Dígito verificador del RUC del transportista | Pagina 101
   */
  dDVTrans?: number;
  /**
   * E10.4 - E985 | Tipo de documento de identidad del transportista | Pagina 101
   */
  iTipIDTrans?: ITipIDTrans;
  /**
   * E10.4 - E986 | Número de documento de identidad del transportista | Pagina 101
   */
  dDTipIDTrans?: DDTipIDTrans;
  /**
   * E10.4 - E987 | Número de documento de identidad del transportista | Pagina 101
   */
  dNumIDTrans?: string;
  /**
   * E10.4 - E988 | Nacionalidad del transportista | Pagina 101
   */
  cNacTrans?: CodigoPais;
  /**
   * E10.4 - E989 | Descripción de la nacionalidad del transportista | Pagina 101
   */
  dDesNacTrans?: DescripcionCodigoPais;
  /**
   * E10.4 - E990 | Número de documento de identidad del chofer | Pagina 101
   */
  dNumIDChof: string;
  /**
   * E10.4 - E991 | Nombre y apellido del chofer | Pagina 101
   */
  dNomChof: string;
  /**
   * E10.4 - E992 | Domicilio fiscal del transportista | Pagina 101
   */
  dDomFisc?: string;
  /**
   * E10.4 - E993 | Dirección del chofer | Pagina 101
   */
  dDirChof?: string;
  /**
   * E10.4 - E994 | Nombre o razón social del agente | Pagina 101
   */
  dNombAg?: string;
  /**
   * E10.4 - E995 | RUC del agente | Pagina 101
   */
  dRucAg?: string;
  /**
   * E10.4 - E996 | Dígito verificador del RUC del agente | Pagina 102
   */
  dDVAg?: string;
  /**
   * E10.4 - E997 | Dirección del agente | Pagina 102
   */
  dDirAge?: string;
}

/**
 * E10.3 - E960 | Campos que identifican el vehículo de traslado de mercaderías | Pagina 100
 */
export interface GVehTras {
  /**
   * E10.3 - E961 | Tipo de vehículo | Pagina 100
   */
  dTiVehTras: string;
  /**
   * E10.3 - E962 | Marca del vehículo | Pagina 100
   */
  dMarVeh: string;
  /**
   * E10.3 - E967 | Tipo de Identificación del vehículo | Pagina 100
   */
  dTipIdenVeh: DTipIdenVeh;
  /**
   * E10.3 - E963 | Número de identificación del vehículo | Pagina 100
   */
  dNroIDVeh?: string;
  /**
   * E10.3 - E964 | Datos adicionales del vehículo | Pagina 100
   */
  dAdicVeh?: string;
  /**
   * E10.3 - E965 | Número de matrícula del vehiculo | Pagina 100
   */
  dNroMatVeh?: string;
  /**
   * E10.3 - E966 | Número de vuelo | Pagina 100
   */
  dNroVuelo?: string;
}
