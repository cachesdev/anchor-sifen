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
  ConditionalKeys,
  Except,
  OmitDeep,
  SetFieldType,
  SetRequired,
  SetRequiredDeep,
  Simplify,
  SimplifyDeep
} from 'type-fest';
import type { ItemOperacion } from './clean/e';

export type Timbrado_FE = OmitDeep<Timbrado, 'tipoDocumento'>;
type ItemOperacion_FE_Base = SetRequired<ItemOperacion, 'valorItem'>;
type DatosGeneralesOperacion_FE_Base = SetRequired<DatosGeneralesOperacion, 'operacionComercial'>;
type DatosEspecificosPorTipoDE_FE_Base = SetFieldType<
  SetRequiredDeep<
    OmitDeep<
      DatosEspecificosPorTipoDE,
      'autofacturaElectronica' | 'notaCreditoDebitoElectronica' | 'notaRemisionElectronica'
    >,
    'facturaElectronica' | 'condicionOperacion' | 'itemsOperacion'
  >,
  'itemsOperacion',
  ItemOperacion_FE_Base[]
>;

export type OperacionDE_FE = Simplify<
  Except<OperacionDE, 'codigoSeguridad'> & { codigoSeguridad: number }
>;

export type OperacionComercial_FE = Simplify<
  Except<DatosGeneralesOperacion_FE_Base['operacionComercial'], 'tipoCambioOperacion'> & {
    tipoCambioOperacion?: Big;
  }
>;

type Emisor_FE = Simplify<
  Except<DatosGeneralesOperacion_FE_Base['emisor'], 'digitoVerificadorEmisor'> & {
    digitoVerificadorEmisor: number;
  }
>;

type Receptor_FE = Simplify<
  Except<DatosGeneralesOperacion_FE_Base['receptor'], 'digitoVerificadorReceptor'> & {
    digitoVerificadorReceptor?: number;
  }
>;

export type DatosGeneralesOperacion_FE = Simplify<
  Except<DatosGeneralesOperacion_FE_Base, 'operacionComercial' | 'emisor' | 'receptor'> & {
    operacionComercial: OperacionComercial_FE;
    emisor: Emisor_FE;
    receptor: Receptor_FE;
  }
>;

export type ValorRestaItem_FE = Simplify<
  Except<
    ItemOperacion_FE_Base['valorItem']['valorRestaItem'],
    | 'descuentoParticularItem'
    | 'porcentajeDescuentoItem'
    | 'descuentoGlobalItem'
    | 'anticipoParticularItem'
    | 'anticipoGlobalItem'
    | 'valorTotalOperacionItem'
    | 'valorTotalOperacionItemGs'
  > & {
    descuentoParticularItem?: Big;
    porcentajeDescuentoItem: Big;
    descuentoGlobalItem?: Big;
    anticipoParticularItem?: Big;
    anticipoGlobalItem?: Big;
    valorTotalOperacionItem: Big;
    valorTotalOperacionItemGs?: Big;
  }
>;

export type ValorItem_FE = Simplify<
  Except<
    ItemOperacion_FE_Base['valorItem'],
    'precioUnitario' | 'tipoCambioItem' | 'totalBrutoOperacionItem' | 'valorRestaItem'
  > & {
    precioUnitario: Big;
    tipoCambioItem?: Big;
    totalBrutoOperacionItem: Big;
    valorRestaItem: ValorRestaItem_FE;
  }
>;

export type IvaItem_FE = Simplify<
  Except<
    NonNullable<ItemOperacion_FE_Base['ivaItem']>,
    'proporcionGravadaIva' | 'tasaIva' | 'baseGravadaIvaItem' | 'liquidacionIvaItem' | 'baseExenta'
  > & {
    proporcionGravadaIva: Big;
    tasaIva: Big;
    baseGravadaIvaItem: Big;
    liquidacionIvaItem: Big;
    baseExenta: Big;
  }
>;

export type ItemOperacion_FE = Simplify<
  Except<ItemOperacion_FE_Base, 'cantidadProductoServicio' | 'valorItem' | 'ivaItem'> & {
    cantidadProductoServicio: Big;
    valorItem: ValorItem_FE;
    ivaItem?: IvaItem_FE;
  }
>;

type CondicionOperacion_FE = Simplify<
  Except<DatosEspecificosPorTipoDE_FE_Base['condicionOperacion'], 'pagoContadoEntregaInicial'> & {
    pagoContadoEntregaInicial?: Array<
      Except<
        NonNullable<
          DatosEspecificosPorTipoDE_FE_Base['condicionOperacion']['pagoContadoEntregaInicial']
        >[number],
        'pagoTarjetaCreditoDebito'
      > & {
        pagoTarjetaCreditoDebito?: Simplify<
          Except<
            NonNullable<
              NonNullable<
                NonNullable<
                  DatosEspecificosPorTipoDE_FE_Base['condicionOperacion']['pagoContadoEntregaInicial']
                >[number]['pagoTarjetaCreditoDebito']
              >
            >,
            'digitoVerificadorProcesadoraTarjeta'
          > & {
            digitoVerificadorProcesadoraTarjeta?: number;
          }
        >;
      }
    >;
  }
>;

type Transporte_FE = Simplify<
  Except<NonNullable<DatosEspecificosPorTipoDE_FE_Base['transporte']>, 'transportista'> & {
    transportista?: Simplify<
      Except<
        NonNullable<NonNullable<DatosEspecificosPorTipoDE_FE_Base['transporte']>['transportista']>,
        'digitoVerificadorRucTransportista' | 'digitoVerificadorRucAgente'
      > & {
        digitoVerificadorRucTransportista?: number;
        digitoVerificadorRucAgente?: string;
      }
    >;
  }
>;

export type DatosEspecificosPorTipoDE_FE = SimplifyDeep<
  Except<
    DatosEspecificosPorTipoDE_FE_Base,
    'condicionOperacion' | 'itemsOperacion' | 'transporte'
  > & {
    condicionOperacion: CondicionOperacion_FE;
    itemsOperacion: ItemOperacion_FE[];
    transporte?: Transporte_FE;
  }
>;

type SubtotalesNumericKeys = ConditionalKeys<SubtotalesTotales, number | undefined>;
export type SubtotalesTotales_FE = Simplify<
  Except<SubtotalesTotales, SubtotalesNumericKeys> & {
    [K in SubtotalesNumericKeys]: SubtotalesTotales[K] extends number ? Big : Big | undefined;
  }
>;

/**
 * A - A001 | DE | DE Enfocado a Factura Electronica | Pagina 61
 */
export interface FacturaElectronica {
  /**
   * A - A002 | Id | Identificador del DE | Pagina 61
   */
  id_cdc: string;
  /**
   * A - A003 | dDVId | Dígito verificador del identificador del DE | Pagina 61
   *
   * Si no es proveido, es calculado internamente.
   */
  digitoVerificadorId: number;
  /**
   * A - A004 | dFecFirma | Fecha de la firma | Pagina 62
   *
   * Formato: AAAA-MM-DDThh:mm:ss
   *
   * Si no es proveido, es calculado internamente.
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
   */
  subtotalesTotales: SubtotalesTotales_FE;
  /**
   * G - G001 | gCamGen | Campos de uso general | Pagina 106
   */
  camposUsoGeneral?: UsoGeneral;
  /**
   * H - H001 | gCamDEAsoc | Campos que identifican al DE asociado | Pagina 108
   */
  camposDocumentoElectronicoAsociado?: DocumentoElectronicoAsociado;
}

type ValorRestaItemCalculatedKeys =
  | 'porcentajeDescuentoItem'
  | 'valorTotalOperacionItem'
  | 'valorTotalOperacionItemGs';

type IvaItemCalculatedKeys = 'baseGravadaIvaItem' | 'liquidacionIvaItem' | 'baseExenta';

type CondicionOperacionPagoArray = NonNullable<
  DatosEspecificosPorTipoDE_FE_Base['condicionOperacion']['pagoContadoEntregaInicial']
>;

type PagoContadoEntregaInicial_FE = CondicionOperacionPagoArray[number];
type PagoTarjetaCreditoDebito_FE = NonNullable<
  PagoContadoEntregaInicial_FE['pagoTarjetaCreditoDebito']
>;

type ValorRestaItem_FE_Input = Simplify<
  Except<ItemOperacion_FE_Base['valorItem']['valorRestaItem'], ValorRestaItemCalculatedKeys>
>;

type ValorItem_FE_Input = Simplify<
  Except<ItemOperacion_FE_Base['valorItem'], 'totalBrutoOperacionItem' | 'valorRestaItem'> & {
    valorRestaItem: ValorRestaItem_FE_Input;
  }
>;

type IvaItem_FE_Input = Simplify<
  Except<NonNullable<ItemOperacion_FE_Base['ivaItem']>, IvaItemCalculatedKeys>
>;

type PagoTarjetaCreditoDebito_FE_Input = Simplify<
  Except<PagoTarjetaCreditoDebito_FE, 'digitoVerificadorProcesadoraTarjeta'>
>;

type PagoContadoEntregaInicial_FE_Input = Simplify<
  Except<PagoContadoEntregaInicial_FE, 'pagoTarjetaCreditoDebito'> & {
    pagoTarjetaCreditoDebito?: PagoTarjetaCreditoDebito_FE_Input;
  }
>;

type CondicionOperacion_FE_Input = Simplify<
  Except<DatosEspecificosPorTipoDE_FE_Base['condicionOperacion'], 'pagoContadoEntregaInicial'> & {
    pagoContadoEntregaInicial?: PagoContadoEntregaInicial_FE_Input[];
  }
>;

type Transportista_FE_Input = Simplify<
  Except<
    NonNullable<NonNullable<DatosEspecificosPorTipoDE_FE_Base['transporte']>['transportista']>,
    'digitoVerificadorRucTransportista' | 'digitoVerificadorRucAgente'
  >
>;

type Transporte_FE_Input = Simplify<
  Except<NonNullable<DatosEspecificosPorTipoDE_FE_Base['transporte']>, 'transportista'> & {
    transportista?: Transportista_FE_Input;
  }
>;

type Emisor_FE_Input = Simplify<
  Except<DatosGeneralesOperacion_FE_Base['emisor'], 'digitoVerificadorEmisor'>
>;
type Receptor_FE_Input = Simplify<
  Except<DatosGeneralesOperacion_FE_Base['receptor'], 'digitoVerificadorReceptor'>
>;

export type OperacionDE_FE_Input = Simplify<Except<OperacionDE, 'codigoSeguridad'>>;
export type Timbrado_FE_Input = Timbrado_FE;
export type DatosGeneralesOperacion_FE_Input = Simplify<
  Except<DatosGeneralesOperacion_FE_Base, 'emisor' | 'receptor'> & {
    emisor: Emisor_FE_Input;
    receptor: Receptor_FE_Input;
  }
>;

export type ItemOperacion_FE_Input = Simplify<
  Except<ItemOperacion_FE_Base, 'valorItem' | 'ivaItem'> & {
    valorItem: ValorItem_FE_Input;
    ivaItem?: IvaItem_FE_Input;
  }
>;

export type DatosEspecificosPorTipoDE_FE_Input = SimplifyDeep<
  Except<
    DatosEspecificosPorTipoDE_FE_Base,
    'condicionOperacion' | 'itemsOperacion' | 'transporte'
  > & {
    condicionOperacion: CondicionOperacion_FE_Input;
    itemsOperacion: ItemOperacion_FE_Input[];
    transporte?: Transporte_FE_Input;
  }
>;

type SubtotalesInputProjection = Pick<SubtotalesTotales, 'comisionOperacion'>;
type SubtotalesCalculatedKeys = Exclude<keyof SubtotalesTotales, keyof SubtotalesInputProjection>;

export type SubtotalesTotales_FE_Input = Simplify<
  Except<SubtotalesTotales, SubtotalesCalculatedKeys>
>;

/**
 * Tipo de entrada de usuario: excluye completamente los campos calculados internamente.
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
