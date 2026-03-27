// SIFEN Common Type Definitions v150
// Shared types used across different DTE types

import type { CodigoCiudad } from '../../gen/ciudades';
import type { CodigoDepartamento } from '../../gen/departamentos';
import type { CodigoDistrito } from '../../gen/distritos';
import type { CodigoMoneda } from '../../gen/monedas';
import type { CodigoPais } from '../../gen/paises';
import type {
  AfectacionIVA,
  CodigoRelevancia,
  CondicionAnticipo,
  CondicionTipoCambio,
  NaturalezaReceptor,
  TasaIVA,
  TipoContribuyente,
  TipoContribuyenteReceptor,
  TipoDocumentoIdentidadReceptor,
  TipoDocumentoResponsable,
  TipoEmision,
  TipoImpuesto,
  TipoOperacion,
  TipoRegimen,
  TipoTransaccion,
  UnidadMedida
} from './enums';

// ============================================================================
// Enums with clear values from field descriptions
// ============================================================================

// ============================================================================
// Common Interfaces
// ============================================================================

/**
 * B001 | gOpeDE | Campos inherentes a la operación de DE | Pagina 65
 */
export interface OperacionDE {
  /**
   * B002 | iTipEmi | Tipo de emisión | Pagina 65
   */
  tipoEmision: TipoEmision;
  /**
   * B004 | dCodSeg | Código de seguridad | Pagina 65
   *
   * Opcional, generado internamente.
   */
  codigoSeguridad?: number;
  /**
   * B005 | dInfoEmi | Información de interés del emisor respecto al DE | Pagina 65
   */
  informacionEmisor?: string;
  /**
   * B006 | dInfoFisc | Información de interés del Fisco respecto al DE | Pagina 65
   */
  informacionFisco?: string;
}

/**
 * D001 | gDatGralOpe | Campos generales del DE | Pagina 65
 */
export interface DatosGenerales {
  /**
   * D002 | dFeEmiDE | Fecha y hora de emisión del DE | Pagina 65
   */
  fechaHoraEmision: Date; // Format: AAAA-MM-DDThh:mm:ss
  /**
   * D010 | gOpeCom | Campos inherentes a la operación comercial | Pagina 65
   */
  operacionComercial?: OperacionComercial;
  /**
   * D100 | gEmis | Grupo de campos que identifican al emisor | Pagina 67
   */
  emisor: Emisor;
  /**
   * D200 | gDatRec | Grupo de campos que identifican al receptor | Pagina 70
   */
  receptor: Receptor;
}

/**
 * D010 | gOpeCom | Campos inherentes a la operación comercial | Pagina 65
 */
export interface OperacionComercial {
  /**
   * D011 | iTipTra | Tipo de transacción | Pagina 66
   */
  tipoTransaccion?: TipoTransaccion;
  /**
   * D013 | iTImp | Tipo de impuesto afectado | Pagina 66
   */
  tipoImpuesto: TipoImpuesto;
  /**
   * D015 | cMoneOpe | Moneda de la operación | Pagina 66
   */
  monedaOperacion: CodigoMoneda;
  /**
   * D017 | dCondTiCam | Condición del tipo de cambio | Pagina 66
   */
  condicionTipoCambio?: CondicionTipoCambio;
  /**
   * D018 | dTiCam | Tipo de cambio de la operación | Pagina 66
   */
  tipoCambio?: number;
  /**
   * D019 | iCondAnt | Condición del Anticipo | Pagina 66
   */
  condicionAnticipo?: CondicionAnticipo;
  /**
   * D020 | dDesCondAnt | Descripción de la condición del Anticipo | Pagina 66
   */
  descripcionCondicionAnticipo?: string;
}

/**
 * D100 | gEmis | Grupo de campos que identifican al emisor | Pagina 67
 */
export interface Emisor {
  /**
   * D101 | dRucEm | RUC del contribuyente emisor | Pagina 67
   */
  ruc: string;
  /**
   * D102 | dDVEmi | Dígito verificador del RUC del contribuyente emisor | Pagina 67
   */
  digitoVerificadorRuc: number;
  /**
   * D103 | iTipCont | Tipo de contribuyente | Pagina 67
   */
  tipoContribuyente: TipoContribuyente;
  /**
   * D104 | cTipReg | Tipo de régimen | Pagina 67
   */
  tipoRegimen?: TipoRegimen;
  /**
   * D105 | dNomEmi | Nombre o razón social del emisor del DE | Pagina 67
   */
  nombre: string;
  /**
   * D106 | dNomFanEmi | Nombre de fantasía | Pagina 67
   */
  nombreFantasia?: string;
  /**
   * D107 | dDirEmi | Dirección del local donde se emite el DE | Pagina 67
   */
  direccion: string;
  /**
   * D108 | dNumCas | Número de casa | Pagina 67
   */
  numeroCasa: number;
  /**
   * D109 | dCompDir1 | Complemento de dirección 1 | Pagina 67
   */
  complementoDireccion1?: string;
  /**
   * D110 | dCompDir2 | Complemento de dirección 2 | Pagina 67
   */
  complementoDireccion2?: string;
  /**
   * D111 | cDepEmi | Código del departamento de emisión | Pagina 67
   */
  codigoDepartamento: CodigoDepartamento;
  /**
   * D113 | cDisEmi | Código del distrito de emisión | Pagina 67
   */
  codigoDistrito?: CodigoDistrito;
  /**
   * D115 | cCiuEmi | Código de la ciudad de emisión | Pagina 68
   */
  codigoCiudad: CodigoCiudad;
  /**
   * D117 | dTelEmi | Teléfono local de emisión de DE | Pagina 69
   */
  telefonoEmisor: string;
  /**
   * D118 | dEmailE | Correo electrónico del emisor | Pagina 69
   */
  emailEmisor: string;
  /**
   * D119 | dDenSuc | Denominación comercial de la sucursal | Pagina 69
   */
  denominacionSucursal?: string;
  /**
   * D130 | gActEco | Campos que describen la actividad económica del emisor | Pagina 68
   */
  actividadesEconomicas: ActividadEconomica[];
  /**
   * D140 | gRespDE | Grupo de campos que identifican al responsable de la generacion DE | Pagina 70
   */
  responsableDE?: ResponsableDE;
}

/**
 * D140 | gRespDE | Campos que identifican al responsable de la generación del DE | Pagina 69
 */
export interface ResponsableDE {
  /**
   * D141 | Tipo de documento de identidad del responsable de la generación del DE | Pagina 69
   */
  tipoDocumentoResponsable: TipoDocumentoResponsable;
  /**
   * D143 | Número de documento de identidad del responsable de la generación del DE | Pagina 69
   */
  numeroDocumentoResponsable: string;
  /**
   * D144 | Nombre o razón social del responsable de la generación del DE | Pagina 69
   */
  nombreResponsable: string;
  /**
   * D145 | Cargo del responsable de la generación del DE | Pagina 69
   */
  cargoResponsable: string;
}

/**
 * D130 | gActEco | Campos que describen la actividad económica del emisor | Pagina 68
 */
export interface ActividadEconomica {
  /**
   * D131 | cActEco | Código de la actividad económica | Pagina 68
   */
  codigo: string;
  /**
   * D132 | dDesActEco | Descripción de la actividad económica | Pagina 68
   */
  descripcion: string;
}

/**
 * D200 | gDatRec | Grupo de campos que identifican al receptor | Pagina 70
 */
export interface Receptor {
  /**
   * D201 | iNatRec | Naturaleza del receptor | Pagina 71
   */
  naturalezaReceptor: NaturalezaReceptor;
  /**
   * D202 | iTiOpe | Tipo de operación | Pagina 71
   */
  tipoOperacion: TipoOperacion;
  /**
   * D203 | cPaisRec | Código de país del receptor | Pagina 71
   */
  codigoPais: CodigoPais;
  /**
   * D205 | iTiContRec | Tipo de contribuyente receptor | Pagina 71
   */
  tipoContribuyente?: TipoContribuyenteReceptor;
  /**
   * D206 | dRucRec | RUC del receptor | Pagina 71
   */
  ruc?: string;
  /**
   * D207 | dDVRec | Dígito verificador del RUC del receptor | Pagina 71
   */
  digitoVerificadorRuc?: number;
  /**
   * D208 | iTipIDRec | Tipo de documento de identidad del receptor | Pagina 71
   */
  tipoDocumentoIdentidad?: TipoDocumentoIdentidadReceptor;
  /**
   * D209 | dDTipIDRec | Descripcion de tipo documento de identidad del receptor | Pagina 71
   *
   * solo pasar si tipoDocumentoIdentidad es Otro (9)
   */
  descripcionDocumentoIdentidad?: string;
  /**
   * D210 | dNumIDRec | Número de documento de identidad | Pagina 72
   */
  numeroDocumentoIdentidad?: string;
  /**
   * D211 | dNomRec | Nombre o razón social del receptor del DE | Pagina 72
   */
  nombre: string;
  /**
   * D212 | dNomFanRec | Nombre de fantasía | Pagina 72
   */
  nombreFantasia?: string;
  /**
   * D213 | dDirRec | Dirección del receptor | Pagina 72
   */
  direccion?: string;
  /**
   * D218 | dNumCasRec | Número de casa del receptor | Pagina 72
   */
  numeroCasa?: number;
  /**
   * D219 | dDepRec | Código del departamento del receptor | Pagina 72
   */
  codigoDepartamento?: CodigoDepartamento;
  /**
   * D221 | dDisRec | Código del distrito del receptor | Pagina 72
   */
  codigoDistrito?: CodigoDistrito;
  /**
   * D223 | cCiuRec | Código de la ciudad del receptor | Pagina 73
   */
  codigoCiudad?: CodigoCiudad;
  /**
   * D214 | dTelRec | Número de teléfono del receptor | Pagina 73
   */
  telefono?: string;
  /**
   * D215 | dCelRec | Número de celular del receptor | Pagina 73
   */
  celular?: string;
  /**
   * D216 | dEmailRec | Correo electrónico del receptor | Pagina 73
   */
  email?: string;
  /**
   * D217 | dCodCliente | Código del cliente | Pagina 73
   */
  codigoCliente?: string;
}

/**
 * E700 | gCamItem | Campos que describen los ítems de la operación | Pagina 85
 */
export interface ItemDE {
  /**
   * E701 | dCodInt | Código interno | Pagina 85
   */
  codigoInterno: string;
  /**
   * E702 | dParAranc | Partida arancelaria | Pagina 85
   */
  partidaArancelaria?: number;
  /**
   * E703 | dNCM | Nomenclatura común del Mercosur (NCM) | Pagina 85
   */
  ncm?: number;
  /**
   * E704 | dDncpG | Código DNCP – Nivel General | Pagina 85
   */
  codigoDncpGeneral?: string;
  /**
   * E705 | dDncpE | Código DNCP – Nivel Especifico | Pagina 85
   */
  codigoDncpEspecifico?: string;
  /**
   * E706 | dGtin | Código GTIN por producto | Pagina 85
   */
  gtin?: number;
  /**
   * E707 | dGtinPq | Código GTIN por paquete | Pagina 85
   */
  gtinPaquete?: number;
  /**
   * E708 | dDesProSer | Descripción del producto y/o servicio | Pagina 85
   */
  descripcion: string;
  /**
   * E709 | cUniMed | Unidad de medida | Pagina 85
   */
  codigoUnidadMedida: UnidadMedida;
  /**
   * E711 | dCantProSer | Cantidad del producto y/o servicio | Pagina 85
   */
  cantidad: number;
  /**
   * E712 | cPaisOrig | Código del país de origen del producto | Pagina 85
   */
  codigoPaisOrigen?: CodigoPais;
  /**
   * E713 | dDesPaisOrig | Descripción del país de origen del producto | Pagina 85
   */
  descripcionPaisOrigen?: string;
  /**
   * E714 | dInfItem | Información de interés del emisor con respecto al ítem | Pagina 85
   */
  informacionItem?: string;
  /**
   * E715 | cRelMerc | Código de datos de relevancia de las mercaderías | Pagina 85
   */
  codigoRelevancia?: CodigoRelevancia;
  /**
   * E716 | dDesRelMerc | Descripción del código de datos de relevancia de las mercaderías | Pagina 85
   */
  descripcionRelevancia?: string;
  /**
   * E717 | dCanQuiMer | Cantidad de quiebra o merma | Pagina 86
   */
  cantidadQuiebraMerma?: number;
  /**
   * E718 | dPorQuiMer | Porcentaje de quiebra o merma | Pagina 86
   */
  porcentajeQuiebraMerma?: number;
  /**
   * E719 | dCDCAnticipo | CDC del anticipo | Pagina 86
   */
  cdcAnticipo?: string;
  /**
   * E720 | gValorItem | Campos que describen los precios, descuentos y valor total por ítem | Pagina 85
   */
  valorItem: ValorItem;
  /**
   * E730 | gCamIVA | Campos que describen el IVA de la operación por ítem
   */
  iva: IVAItem;
  /**
   * E750 | gRasMerc | Grupo de rastreo de la mercadería
   */
  rastreoMercaderia?: RastreoMercaderia;
}

/**
 * E720 | gValorItem | Campos que describen los precios, descuentos y valor total por ítem | pagina 87
 */
export interface ValorItem {
  /**
   * E721 | dPUniProSer | Precio unitario del producto y/o servicio (incluidos impuestos) | Pagina 87
   */
  precioUnitario: number;
  /**
   * E725 | dTiCamIt | Tipo de cambio por ítem | Pagina 87
   */
  tipoCambio?: number;
  /**
   * E727 | dTotBruOpeItem | Total bruto de la operación por ítem | Pagina 87
   */
  totalBruto: number;
  /**
   * EA001 | gValorRestaItem | Campos que describen los descuentos, anticipos y valor total por ítem | Pagina 87
   */
  valorRestaItem: ValorRestaItem;
}

/**
 * EA001 | gValorRestaItem | Campos que describen los descuentos, anticipos y valor total por ítem | Pagina 87
 */
export interface ValorRestaItem {
  /**
   * EA002 | dDescItem | Descuento particular sobre el precio unitario por ítem (incluidos impuestos) | Pagina 88
   */
  descuentoParticular?: number;
  /**
   * EA003 | dPorcDesIt | Porcentaje de descuento particular por ítem | Pagina 88
   */
  porcentajeDescuentoParticular?: number;
  /**
   * EA004 | dDescGloItem | Descuento global sobre el precio unitario por ítem (incluidos impuestos) | Pagina 88
   */
  descuentoGlobal?: number;
  /**
   * EA006 | dAntPreUniIt | Anticipo particular sobre el precio unitario por ítem (incluidos impuestos) | Pagina 88
   */
  anticipoParticular?: number;
  /**
   * EA007 | dAntGloPreUniIt | Anticipo global sobre el precio unitario por ítem (incluidos impuestos) | Pagina 88
   */
  anticipoGlobal?: number;
  /**
   * EA008 | dTotOpeItem | Valor total de la operación por ítem | Pagina 88
   */
  totalOperacion: number;
  /**
   * EA009 | dTotOpeGs | Valor total de la operación por ítem en guaraníes | Pagina 88
   */
  totalOperacionGuaranies?: number;
}

/**
 * E730 | gCamIVA | Campos que describen el IVA de la operación por ítem | Manual Tecnico p.89
 */
export interface IVAItem {
  /**
   * E731 | iAfecIVA | Forma de afectación tributaria del IVA
   */
  afectacionIVA: AfectacionIVA;
  /**
   * E733 | dPropIVA | Proporción gravada de IVA
   */
  proporcionGravada: number;
  /**
   * E734 | dTasaIVA | Tasa del IVA
   */
  tasaIVA: TasaIVA;
  /**
   * E735 | dBasGravIVA | Base gravada del IVA por ítem
   */
  baseGravada: number;
  /**
   * E736 | dLiqIVAItem | Liquidación del IVA por ítem
   */
  liquidacionIVA: number;
}

/**
 * E750 | gRasMerc | Grupo de rastreo de la mercadería | Manual Tecnico p.90
 */
export interface RastreoMercaderia {
  /**
   * E751 | dNumLote | Número de lote
   */
  numeroLote?: string;
  /**
   * E752 | dVencMerc | Fecha de vencimiento de la mercadería
   */
  fechaVencimiento?: string; // Format: AAAA-MM-DD
  /**
   * E753 | dNSerie | Número de serie
   */
  numeroSerie?: string;
  /**
   * E754 | dNumPedi | Número de pedido
   */
  numeroPedido?: string;
  /**
   * E755 | dNumSegui | Número de seguimiento del envío
   */
  numeroSeguimiento?: string;
  /**
   * E756 | dNomImp | Nombre del Importador
   */
  nombreImportador?: string;
  /**
   * E757 | dDirImp | Dirección de Importador
   */
  direccionImportador?: string;
  /**
   * E758 | dNumFir | Número de registro de la firma del importador
   */
  numeroRegistroFirma?: string;
  /**
   * E759 | dNumReg | Número de registro del producto otorgado por el SENAVE
   */
  numeroRegistroProducto?: string;
  /**
   * E760 | dNumRegEntCom | Número de registro de entidad comercial otorgado por el SENAVE
   */
  numeroRegistroEntidadComercial?: string;
}

/**
 * E740 | gCamISC | Campos que describen el ISC de la operación por ítem | Pagina 89
 */
export interface ISCItem {
  /**
   * E741 | iTasaISC | Tasa de ISC | Pagina 89
   */
  tasaISC: number; // TODO: Define enum based on available rates
  /**
   * E742 | dDesTasaISC | Descripción de la tasa de ISC | Pagina 89
   */
  descripcionTasaISC: string;
  /**
   * E743 | dBaseGravISC | Base gravada de ISC | Pagina 89
   */
  baseGravadaISC: number;
  /**
   * E744 | dLiqISC | Líquido ISC | Pagina 89
   */
  liquidadoISC: number;
}
