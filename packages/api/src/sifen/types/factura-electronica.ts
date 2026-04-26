import type { Big } from 'big.js';
import type {
  DatosEspecificosPorTipoDE,
  DatosGeneralesOperacion,
  OperacionDE,
  Timbrado
} from './clean/de';
import type { SubtotalesTotales } from './clean/f';
import type { UsoGeneral } from './clean/g';
import type { DocumentoElectronicoAsociado } from './clean/h';
import type {
  Except,
  OmitDeep,
  SetRequired,
  SetRequiredDeep,
  Simplify,
  SimplifyDeep
} from 'type-fest';

type DeepBigToNumber<T> = T extends Big
  ? number
  : T extends Date
    ? T
    : T extends readonly (infer U)[]
      ? DeepBigToNumber<U>[]
      : T extends object
        ? { [K in keyof T]: DeepBigToNumber<T[K]> }
        : T;

type DatosEspecificosPorTipoDE_FE_Base = OmitDeep<
  DatosEspecificosPorTipoDE,
  'autofacturaElectronica' | 'notaCreditoDebitoElectronica' | 'notaRemisionElectronica'
>;

export type Timbrado_FE = OmitDeep<Timbrado, 'tipoDocumento'>;
export type OperacionDE_FE = Simplify<SetRequired<OperacionDE, 'codigoSeguridad'>>;

export type DatosGeneralesOperacion_FE = SimplifyDeep<
  SetRequiredDeep<DatosGeneralesOperacion, 'operacionComercial' | 'emisor.digitoVerificadorEmisor'>
>;

export type OperacionComercial_FE = DatosGeneralesOperacion_FE['operacionComercial'];

export type DatosEspecificosPorTipoDE_FE = SimplifyDeep<
  SetRequiredDeep<
    DatosEspecificosPorTipoDE_FE_Base,
    | 'facturaElectronica'
    | 'condicionOperacion'
    | 'itemsOperacion'
    | `itemsOperacion.${number}.valorItem`
    | `itemsOperacion.${number}.valorItem.valorRestaItem.porcentajeDescuentoItem`
  >
>;

export type ItemOperacion_FE = DatosEspecificosPorTipoDE_FE['itemsOperacion'][number];
export type ValorItem_FE = ItemOperacion_FE['valorItem'];
export type ValorRestaItem_FE = ValorItem_FE['valorRestaItem'];
export type IvaItem_FE = NonNullable<ItemOperacion_FE['ivaItem']>;

export type SubtotalesTotales_FE = SubtotalesTotales;

/**
 * A - A001 | DE | DE Enfocado a Factura Electronica | Pagina 61
 *
 * Representacion legible de uso interno de la factura electronica.
 */
export interface FacturaElectronica {
  /**
   * A - A002 | Id | Identificador del DE | Pagina 61
   *
   * Observaciones:
   *   Atributo del Tag <DE>
   *   NOTA: Con carácter excepcional cuando un RUC contenga letras para efectos del cálculo del Dígito verificador y la generación del CDC se realizará la conversión de dicha letra por su valor en código ASCII
   */
  id_cdc: string;
  /**
   * A - A003 | dDVId | Dígito verificador del identificador del DE | Pagina 61
   *
   * Si no es proveido, es calculado internamente.
   * Observaciones: Según algoritmo módulo 11
   */
  digitoVerificadorId: number;
  /**
   * A - A004 | dFecFirma | Fecha de la firma | Pagina 62
   *
   * Formato: AAAA-MM-DDThh:mm:ss
   *
   * Si no es proveido, es calculado internamente.
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
  operacionDE: OperacionDE_FE;
  /**
   * C - C001 | gTimb | Datos del timbrado | Pagina 63
   */
  timbrado: Timbrado_FE;
  /**
   * D - D001 | gDatGralOpe | Campos generales del DE | Pagina 65
   */
  datosGeneralesOperacion: DatosGeneralesOperacion_FE;
  /**
   * E - E001 | gDtipDE | Campos específicos por tipo de Documento Electrónico | Pagina 73
   */
  datosEspecificosPorTipoDE: DatosEspecificosPorTipoDE_FE;
  /**
   * F - F001 | gTotSub | Campos de subtotales y totales | Pagina 102
   *
   * Observaciones:
   *   Obligatorio si C002 ≠ 7
   *   No informar si C002 = 7
   *   Cuando C002= 4, no informar F002, F003, F004, F005, F015, F016, F017, F018, F019, F020, F023, F025 y F026
   */
  subtotalesTotales: SubtotalesTotales_FE;
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

type Emisor_FE_Input = DeepBigToNumber<
  OmitDeep<DatosGeneralesOperacion_FE['emisor'], 'digitoVerificadorEmisor'>
>;

type Receptor_FE_Input = DeepBigToNumber<
  OmitDeep<DatosGeneralesOperacion_FE['receptor'], 'digitoVerificadorReceptor'>
>;

export type OperacionDE_FE_Input = DeepBigToNumber<Except<OperacionDE_FE, 'codigoSeguridad'>>;
export type Timbrado_FE_Input = Timbrado_FE;

export type DatosGeneralesOperacion_FE_Input = Simplify<
  DeepBigToNumber<Except<DatosGeneralesOperacion_FE, 'emisor' | 'receptor'>> & {
    emisor: Emisor_FE_Input;
    receptor: Receptor_FE_Input;
  }
>;

type ItemOperacion_FE_Input_Base = OmitDeep<
  ItemOperacion_FE,
  | 'valorItem.totalBrutoOperacionItem'
  | 'valorItem.valorRestaItem.porcentajeDescuentoItem'
  | 'valorItem.valorRestaItem.valorTotalOperacionItem'
  | 'valorItem.valorRestaItem.valorTotalOperacionItemGs'
  | 'ivaItem.baseGravadaIvaItem'
  | 'ivaItem.liquidacionIvaItem'
  | 'ivaItem.baseExenta'
>;

export type ItemOperacion_FE_Input = DeepBigToNumber<ItemOperacion_FE_Input_Base>;

type CondicionOperacion_FE_Input = DeepBigToNumber<
  OmitDeep<
    DatosEspecificosPorTipoDE_FE['condicionOperacion'],
    `pagoContadoEntregaInicial.${number}.pagoTarjetaCreditoDebito.digitoVerificadorProcesadoraTarjeta`
  >
>;

type Transporte_FE_Input = DeepBigToNumber<
  OmitDeep<
    NonNullable<DatosEspecificosPorTipoDE_FE['transporte']>,
    'transportista.digitoVerificadorRucTransportista' | 'transportista.digitoVerificadorRucAgente'
  >
>;

export type DatosEspecificosPorTipoDE_FE_Input = SimplifyDeep<
  DeepBigToNumber<
    Except<DatosEspecificosPorTipoDE_FE, 'condicionOperacion' | 'itemsOperacion' | 'transporte'>
  > & {
    condicionOperacion: CondicionOperacion_FE_Input;
    itemsOperacion: ItemOperacion_FE_Input[];
    transporte?: Transporte_FE_Input;
  }
>;

export type SubtotalesTotales_FE_Input = DeepBigToNumber<
  Pick<SubtotalesTotales_FE, 'comisionOperacion'>
>;

/**
 * Representa el input usado en el Builder de factura electronica.
 */
export type FacturaElectronicaInput = SimplifyDeep<
  Except<
    FacturaElectronica,
    | 'digitoVerificadorId'
    | 'fechaFirma'
    | 'operacionDE'
    | 'timbrado'
    | 'datosGeneralesOperacion'
    | 'datosEspecificosPorTipoDE'
    | 'subtotalesTotales'
  > & {
    operacionDE: OperacionDE_FE_Input;
    timbrado: Timbrado_FE_Input;
    datosGeneralesOperacion: DatosGeneralesOperacion_FE_Input;
    datosEspecificosPorTipoDE: DatosEspecificosPorTipoDE_FE_Input;
    subtotalesTotales: SubtotalesTotales_FE_Input;
  }
>;
