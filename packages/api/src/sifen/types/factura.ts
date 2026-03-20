// Basado en SIFEN MT v150

import type { OperacionDE, DatosGenerales, Emisor, Receptor, ItemDE } from './common';
import type { TipoDocumentoElectronico } from './enums';

/**
 * Indicador de presencia - E011 | Pagina 73
 */

export const indicadorPresencia = {
  OperacionPresencial: 1,
  OperacionElectronica: 2,
  OperacionTelemarketing: 3,
  VentaDomicilio: 4,
  OperacionBancaria: 5,
  OperacionCiclica: 6,
  Otro: 9
} as const;
/**
 * Indicador de presencia - E011 | Pagina 73
 */
export type IndicadorPresencia = (typeof indicadorPresencia)[keyof typeof indicadorPresencia];

/**
 * Factura Electrónica con campos legibles, Basado en MT SIFEN v150
 */
export interface FacturaElectronica {
  /**
   * AA001 | rDE | Documento Electrónico elemento raíz | Pagina 64
   */
  de: {
    /**
     * AA002 | dVerFor | Versión del formato | Pagina 64
     */
    versionFormato: number;
    /**
     * A001 | DE | Campos firmados del DE | Pagina 64
     */
    camposFirmados: CamposFirmadosDE;
  };
}

/**
 * A001 | DE | Campos firmados del DE | Pagina 64
 */
export interface CamposFirmadosDE {
  /**
   * A002 | Id | Identificador del DE, CDC | Pagina 64
   */
  id: string;
  /**
   * A003 | dDVId | Dígito verificador del identificador del DE | Pagina 64
   */
  digitoVerificador: number;
  /**
   * A004 | dFecFirma | Fecha de la firma | Pagina 64
   *
   * Fecha debe ser luego de la emision pero antes de la transmision.
   */
  fechaFirma: Date; // Format: AAAA-MM-DDThh:mm:ss
  /**
   * B001 | gOpeDE | Campos inherentes a la operación de DE | Pagina 65
   */
  operacionDE: OperacionDE;
  /**
   * C001 | gTimb | Datos del timbrado | Pagina 64
   */
  datosTimbrado: Timbrado;
  /**
   * D001 | gDatGralOpe | Campos generales del DE | Pagina 65
   */
  datosGenerales: Required<DatosGenerales>;
  /**
   * D100 | gEmis | Grupo de campos que identifican al emisor | Pagina 67
   */
  emisor: Emisor;
  /**
   * D200 | gDatRec | Grupo de campos que identifican al receptor | Pagina 69
   */
  receptor?: Receptor;
  /**
   * E010 | gCamFE | Campos que componen la FE | Pagina 73
   */
  camposFE?: CamposFE;
  /**
   * E700 | gItems | Campos que describen los ítems de la operación | Pagina 88
   */
  items: ItemDE[];
  /**
   * F001 | gTotSub | Campos de subtotales y totales | Pagina 89
   */
  totales?: TotalesOperacion;
}

/**
 * C001 | gTimb | Datos del timbrado | Pagina 64
 */
export interface Timbrado {
  /**
   * C002 | iTiDE | Tipo de Documento Electrónico | Pagina 64
   */
  tipoDocumento: TipoDocumentoElectronico;
  /**
   * C004 | dNumTim | Número del timbrado | Pagina 64
   */
  numeroTimbrado: number;
  /**
   * C005 | dEst | Establecimiento | Pagina 64
   */
  establecimiento: number;
  /**
   * C006 | dPunExp | Punto de expedición | Pagina 64
   */
  puntoExpedicion: number;
  /**
   * C007 | dNumDoc | Número del documento | Pagina 64
   */
  numeroDocumento: number;
  /**
   * C008 | dFeIniT | Fecha inicio de vigencia del timbrado | Pagina 64
   */
  fechaInicioVigencia: Date; // Format: AAAA-MM-DD
  /**
   * C010 | dSerieNum | Serie del número de timbrado | Pagina 64
   */
  serieNumero?: string;
}

/**
 * E010 | gCamFE | Campos que componen la FE | Pagina 73
 */
export interface CamposFE {
  /**
   * E011 | iIndPres | Indicador de presencia | Pagina 73
   */
  indicadorPresencia: IndicadorPresencia;
  /**
   * E012 | dDesIndPres | Descripción del indicador de presencia | Pagina 73
   */
  descripcionIndicadorPresencia: string;
  /**
   * E013 | dFecEmNR | Fecha futura del traslado de mercadería | Pagina 73
   */
  fechaTrasladoMercaderia?: string; // Format: AAAA-MM-DD
  /**
   * E020 | gCompPub | Campos que describen las informaciones de compras públicas | Pagina 73
   */
  comprasPublicas?: ComprasPublicas;
}

/**
 * E020 | gCompPub | Campos que describen las informaciones de compras públicas | Pagina 73
 */
export interface ComprasPublicas {
  /**
   * E021 | dModCont | Modalidad - Código emitido por la DNCP | Pagina 73
   */
  modalidad: string;
  /**
   * E022 | dEntCont | Entidad - Código emitido por la DNCP | Pagina 73
   */
  entidad: number;
  /**
   * E023 | dAnoCont | Año - Código emitido por la DNCP | Pagina 73
   */
  año: number;
  /**
   * E024 | dSecCont | Secuencia - emitido por la DNCP | Pagina 73
   */
  secuencia: number;
  /**
   * E025 | dFeCodCont | Fecha de emisión del código de contratación por la DNCP | Pagina 74
   */
  fechaEmisionCodigoContratacion: string; // Format: AAAA-MM-DD
}

/**
 * F001 | gTotSub | Campos de subtotales y totales | Pagina 89
 */
export interface TotalesOperacion {
  /**
   * F002 | dSubExe | Subtotal de la operación exenta | Pagina 89
   */
  subtotalExento?: number;
  /**
   * F003 | dSubExo | Subtotal de la operación exonerada | Pagina 89
   */
  subtotalExonerado?: number;
  /**
   * F004 | dSub5 | Subtotal de la operación con IVA incluido a la tasa 5% | Pagina 89
   */
  subtotalIVA5?: number;
  /**
   * F005 | dSub10 | Subtotal de la operación con IVA incluido a la tasa 10% | Pagina 89
   */
  subtotalIVA10?: number;
  /**
   * F006 | dSubExoAE | Subtotal de operaciones exoneradas sujetas a aportes de ESS | Pagina 89
   */
  subtotalExoneradoESS?: number;
  /**
   * F008 | dTotOpe | Total Bruto de la operación | Pagina 89
   */
  totalBrutoOperacion: number;
  /**
   * F009 | dTotDesc | Total descuento particular por ítem | Pagina 89
   */
  totalDescuentos?: number;
  /**
   * F010 | dPorcDescTotal | Porcentaje de descuento global sobre total de la operación | Pagina 89
   */
  porcentajeDescuentoGlobal?: number;
  /**
   * F011 | dTotGralOpe | Total general de la operación | Pagina 89
   */
  totalGeneralOperacion: number;
  /**
   * F012 | dTotIVA | Total IVA de la operación | Pagina 89
   */
  totalIVA?: number;
  /**
   * F013 | dTotGrav | Total gravada de la operación | Pagina 89
   */
  totalGravada?: number;
  /**
   * F014 | dTotExe | Total exenta de la operación | Pagina 89
   */
  totalExenta?: number;
  /**
   * F015 | dTotExo | Total exonerada de la operación | Pagina 89
   */
  totalExonerada?: number;
  /**
   * F016 | dTotOtraMon | Total de la operación en otra moneda | Pagina 89
   */
  totalOtraMoneda?: number;
  /**
   * F017 | dPorcExe | Porcentaje de exentas sobre el total de la operación | Pagina 89
   */
  porcentajeExentas?: number;
  /**
   * F018 | dTiCam | Tipo de cambio | Pagina 89
   */
  tipoCambio?: number;
  /**
   * F023 | dTotalGs | Total general de la operación en Guaraníes | Pagina 89
   */
  totalGeneralGuaranies?: number;
}
