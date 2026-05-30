import type { LiteralUnion } from 'type-fest';
import type { Receptor, Emisor, OperacionComercial } from './d';
import type {
  AutofacturaElectronica,
  CondicionOperacion,
  UsoComercial,
  CamposFacturaElectronica,
  ItemOperacion,
  NotaCreditoDebitoElectronica,
  NotaRemisionElectronica,
  Transporte
} from './e';
import type {
  TipoDocumentoElectronico,
  TipoDocumentoElectronicoLabel,
  TipoEmision
} from '../enums';
import type { SubtotalesTotales } from './f';
import type { UsoGeneral } from './g';
import type { DocumentoElectronicoAsociado } from './h';

/**
 * NOTAS:
 * DocumentoElectronico y DE tienen un sufijo `C` ya que sus tipos se llaman igual
 * en `raw`.
 */

/**
 * AA | Documento Electrónico | Pagina 61
 */
export interface DocumentoElectronicoC {
  /**
   * AA - AA001 | rDE | Documento Electrónico elemento raíz | Pagina 61
   */
  rDE: {
    /**
     * AA - AA002 | dVerFor | Versión del formato | Pagina 61
     *
     * Observaciones:
     *   Control de versiones
     *   Este campo debe contener la versión 150
     */
    versionFormato: 150;
    /**
     * A - A001 | DE | Campos firmados del DE | Pagina 61
     */
    DE: DEC;
  };
}

/**
 * A - A001 | DE | Campos firmados del DE | Pagina 61
 */
export interface DEC {
  /**
   * A - A002 | Id | Identificador del DE (CDC) | Pagina 61
   *
   * Atributo del elemento DE, expuesto aqui por conveniencia interna.
   */
  id_cdc: string;
  /**
   * Discriminador interno de tipo de DE. No es un campo del XML original de SIFEN.
   */
  tipoDE: TipoDocumentoElectronicoLabel;
  /**
   * A - A003 | dDVId | Dígito verificador del identificador del DE | Pagina 61
   * Observaciones: Según algoritmo módulo 11
   */
  digitoVerificadorId: number;
  /**
   * A - A004 | dFecFirma | Fecha de la firma | Pagina 62
   *
   * Formato: AAAA-MM-DDThh:mm:ss
   *
   * Observaciones:
   *   La fecha y hora de la firma digital debe ser anterior a la fecha y hora de transmisión al SIFEN
   *   El certificado digital debe estar vigente al momento de la firma digital del DE
   *   Fecha y hora en el formato AAAA-MM-DDThh:mm:ss
   *   El plazo límite de transmisión del DE al SIFEN para la aprobación normal es de 72 h contadas a partir de la fecha y hora de la firma digital.
   */
  fechaFirma: Date;
  /**
   * B - B001 | gOpeDE | Campos inherentes a la operación de DE | Pagina 62
   */
  operacionDE: OperacionDE;
  /**
   * C - C001 | gTimb | Datos del timbrado | Pagina 63
   */
  timbrado: Timbrado;
  /**
   * D - D001 | gDatGralOpe | Campos generales del DE | Pagina 65
   */
  datosGeneralesOperacion: DatosGeneralesOperacion;
  /**
   * E - E001 | gDtipDE | Campos específicos por tipo de Documento Electrónico | Pagina 73
   */
  datosEspecificosPorTipoDE: DatosEspecificosPorTipoDE;
  /**
   * F - F001 | gTotSub | Campos de subtotales y totales | Pagina 102
   *
   * Observaciones:
   *   Obligatorio si C002 ≠ 7
   *   No informar si C002 = 7
   *   Cuando C002= 4, no informar F002, F003, F004, F005, F015, F016, F017, F018, F019, F020, F023, F025 y F026
   */
  subtotalesTotales?: SubtotalesTotales;
  /**
   * G - G001 | gCamGen | Campos de uso general | Pagina 106
   */
  camposUsoGeneral?: UsoGeneral;
  /**
   * H - H001 | gCamDEAsoc | Campos que identifican al DE asociado | Pagina 108
   *
   * Observaciones:
   *   Obligatorio si C002 = 4, 5, 6
   *   Opcional si C002=1 o 7
   */
  camposDocumentoElectronicoAsociado?: DocumentoElectronicoAsociado;
}

/**
 * B - B001 | gOpeDE | Campos inherentes a la operación de DE | Pagina 62
 */
export interface OperacionDE {
  /**
   * B - B002 | iTipEmi | Tipo de emisión | Pagina 62
   *
   * Observaciones:
   *   1= Normal
   *   2= Contingencia
   */
  tipoEmision: LiteralUnion<TipoEmision, number>;
  /**
   * B - B004 | dCodSeg | Código de seguridad | Pagina 62
   *
   * Observaciones: Código generado por el emisor de manera aleatoria para asegurar la confidencialidad de la consulta pública del DE
   */
  codigoSeguridad: number;
  /**
   * B - B005 | dInfoEmi | Información de interés del emisor respecto al DE | Pagina 62
   */
  informacionEmisor?: string;
  /**
   * B - B006 | dInfoFisc | Información de interés del Fisco respecto al DE | Pagina 63
   *
   * Observaciones:
   *   Esta información debe ser impresa en el KuDE.
   *   Cuando el tipo de documento es Nota de remisión (C002=7) es obligatorio informar el mensaje según el Art. 3 Inc. 7 de la Resolución general Nro. 41/2014
   */
  informacionFisco?: string;
}

/**
 * C - C001 | gTimb | Datos del timbrado | Pagina 63
 */
export interface Timbrado {
  /**
   * C - C002 | iTiDE | Tipo de Documento Electrónico | Pagina 63
   *
   * Observaciones:
   *   1= Factura electrónica
   *   2= Factura electrónica de exportación (Futuro)
   *   3= Factura electrónica de importación (Futuro)
   *   4= Autofactura electrónica
   *   5= Nota de crédito electrónica
   *   6= Nota de débito electrónica
   *   7= Nota de remisión electrónica
   *   8= Comprobante de retención electrónico (Futuro)
   */
  tipoDocumento: LiteralUnion<TipoDocumentoElectronico, number>;
  /**
   * C - C004 | dNumTim | Número del timbrado | Pagina 63
   * Observaciones: Debe coincidir con la estructura de timbrado
   */
  numeroTimbrado: number;
  /**
   * C - C005 | dEst | Establecimiento | Pagina 64
   *
   * Padding agregado automaticamente
   *
   * Observaciones:
   *   Completar con 0 (cero) a la izquierda
   *   Debe coincidir con la estructura de timbrado
   */
  establecimiento: number;
  /**
   * C - C006 | dPunExp | Punto de expedición | Pagina 64
   *
   * Padding agregado automaticamente
   *
   * Observaciones:
   *   Completar con 0 (cero) a la izquierda
   *   Debe coincidir con la estructura de timbrado
   */
  puntoExpedicion: number;
  /**
   * C - C007 | dNumDoc | Número del documento | Pagina 64
   *
   * Padding agregado automaticamente
   *
   * Observaciones:
   *   Debe empezar con 1 (uno) para un nuevo timbrado.
   *   Completar con 0 (cero) a la izquierda hasta alcanzar 7 (siete) cifras
   *   Debe coincidir con la estructura de timbrado
   *   Una vez que se haya agotado la numeración permitida por el sistema (9999999), la numeración de los comprobantes electrónicos se reinicia con la utilización de la serie, para evitar rechazos por duplicidad
   */
  numeroDocumento: number;
  /**
   * C - C010 | dSerieNum | Serie del número de timbrado | Pagina 64
   *
   * Observaciones:
   *   Campo obligatorio cuando ya se ha consumido la totalidad de la numeración permitida por el sistema (9999999).
   *   Referirse a la sección Manejo del timbrado y Numeración.
   */
  serieNumero?: string;
  /**
   * C - C008 | dFeIniT | Fecha inicio de vigencia del timbrado | Pagina 64
   *
   * Formato: AAAA-MM-DD
   *
   * Observaciones:
   *   Formato AAAA-MM-DD
   *   Para el KuDE el formato de la fecha de inicio de vigencia debe contener los guiones separadores. Ejemplo: 2018-05-31
   */
  fechaInicioVigencia: Date;
}

/**
 * D - D001 | gDatGralOpe | Campos generales del DE | Pagina 65
 */
export interface DatosGeneralesOperacion {
  /**
   * D - D002 | dFeEmiDE | Fecha y hora de emisión del DE | Pagina 65
   *
   * Formato: AAAA-MM-DDThh:mm:ss
   *
   * Observaciones:
   *   Fecha y hora en el formato AAAA-MM-DDThh:mm:ss
   *   Para el KuDE el formato de la fecha de emisión debe contener los guiones separadores. Ejemplo: 2018-05-31T12:00:00
   *   Se aceptará como límites técnicos del sistema, que la fecha de emisión del DE sea atrasada hasta 720 horas (30 días) y adelantada hasta 120 horas (5 días) en relación a la fecha y hora de transmisión al SIFEN
   */
  fechaEmisionDE: Date;
  /**
   * D1 - D010 | gOpeCom | Campos inherentes a la operación comercial | Pagina 65
   *
   * Observaciones:
   *   Obligatorio si C002 ≠ 7
   *   No informar si C002 = 7
   */
  operacionComercial?: OperacionComercial;
  /**
   * D2 - D100 | gEmis | Grupo de campos que identifican al emisor | Pagina 67
   */
  emisor: Emisor;
  /**
   * D3 - D200 | gDatRec | Grupo de campos que identifican al receptor | Pagina 70
   */
  receptor: Receptor;
}

/**
 * E - E001 | gDtipDE | Campos específicos por tipo de Documento Electrónico | Pagina 73
 */
export interface DatosEspecificosPorTipoDE {
  /**
   * E1 - E010 | gCamFE | Campos que componen la FE | Pagina 73
   *
   * Observaciones:
   *   Obligatorio si C002 = 1
   *   No informar si C002 ≠ 1
   */
  facturaElectronica?: CamposFacturaElectronica;
  /**
   * E4 - E300 | gCamAE | Campos que componen la Autofactura Electrónica | Pagina 75
   *
   * Observaciones:
   *   Obligatorio si C002 = 4
   *   No informar si C002 ≠ 4
   */
  autofacturaElectronica?: AutofacturaElectronica;
  /**
   * E5 - E400 | gCamNCDE | Campos de la Nota de Crédito/Débito Electrónica | Pagina 77
   *
   * Observaciones:
   *   Obligatorio si C002 = 5 o 6 (NCE y NDE)
   *   No informar si C002 ≠ 5 o 6
   */
  notaCreditoDebitoElectronica?: NotaCreditoDebitoElectronica;
  /**
   * E6 - E500 | gCamNRE | Campos que componen la Nota de Remisión Electrónica | Pagina 77
   *
   * Observaciones:
   *   Obligatorio si C002 = 7
   *   No informar si C002 ≠ 7
   */
  notaRemisionElectronica?: NotaRemisionElectronica;
  /**
   * E7 - E600 | gCamCond | Campos que describen la condición de la operación | Pagina 80
   *
   * Observaciones:
   *   Obligatorio si C002 = 1 o 4
   *   No informar si C002 ≠ 1 o 4
   */
  condicionOperacion?: CondicionOperacion;
  /**
   * E8 - E700 | gCamItem | Campos que describen los ítems de la operación | Pagina 85
   */
  itemsOperacion: ItemOperacion[];
  /**
   * E9 - E790 | gCamEsp | Campos complementarios comerciales de uso específico | Pagina 93
   */
  usosComerciales?: UsoComercial;
  /**
   * E10 - E900 | gTransp | Campos que describen el transporte de mercaderías | Pagina 96
   *
   * Observaciones:
   *   Obligatorio si C002 = 7
   *   Opcional si C002 = 1
   *   No informar si C002= 4, 5, 6
   */
  transporte?: Transporte;
}
