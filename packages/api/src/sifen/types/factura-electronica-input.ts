import type { Big } from 'big.js';
import type { OmitDeep } from 'type-fest';
import type { UsoGeneral } from './clean/g';
import type { DocumentoElectronicoAsociado } from './clean/h';
import type {
  OperacionDE_FE,
  Timbrado_FE,
  DatosGeneralesOperacion_FE,
  DatosEspecificosPorTipoDE_FE,
  ItemOperacion_FE
} from './factura-electronica';

type NumBig = number | Big;

type DeepNumBig<T> = T extends Big
  ? NumBig
  : T extends Date
    ? T
    : T extends readonly (infer U)[]
      ? DeepNumBig<U>[]
      : T extends object
        ? { [K in keyof T]: DeepNumBig<T[K]> }
        : T;

export type OperacionDE_FE_Input = DeepNumBig<Omit<OperacionDE_FE, 'codigoSeguridad'>>;

export type Timbrado_FE_Input = Omit<Timbrado_FE, 'tipoDocumento'>;

type Emisor_FE_Input = DeepNumBig<
  Omit<DatosGeneralesOperacion_FE['emisor'], 'digitoVerificadorEmisor'>
>;

type Receptor_FE_Input = DeepNumBig<
  Omit<DatosGeneralesOperacion_FE['receptor'], 'digitoVerificadorReceptor'>
>;

export type DatosGeneralesOperacion_FE_Input = DeepNumBig<
  Omit<DatosGeneralesOperacion_FE, 'emisor' | 'receptor'>
> & {
  emisor: Emisor_FE_Input;
  receptor: Receptor_FE_Input;
};

type CondicionOperacion_FE_Input = DeepNumBig<
  OmitDeep<
    DatosEspecificosPorTipoDE_FE['condicionOperacion'],
    `pagoContadoEntregaInicial.${number}.pagoTarjetaCreditoDebito.digitoVerificadorProcesadoraTarjeta`
  >
>;

type Transporte_FE_Input = DeepNumBig<
  OmitDeep<
    NonNullable<DatosEspecificosPorTipoDE_FE['transporte']>,
    'transportista.digitoVerificadorRucTransportista' | 'transportista.digitoVerificadorRucAgente'
  >
>;

export type ItemOperacion_FE_Input = DeepNumBig<
  OmitDeep<
    ItemOperacion_FE,
    | 'valorItem.totalBrutoOperacionItem'
    | 'valorItem.valorRestaItem.porcentajeDescuentoItem'
    | 'valorItem.valorRestaItem.valorTotalOperacionItem'
    | 'valorItem.valorRestaItem.valorTotalOperacionItemGs'
    | 'ivaItem.baseGravadaIvaItem'
    | 'ivaItem.liquidacionIvaItem'
    | 'ivaItem.baseExenta'
  >
>;

export type DatosEspecificosPorTipoDE_FE_Input = DeepNumBig<
  Omit<DatosEspecificosPorTipoDE_FE, 'condicionOperacion' | 'itemsOperacion' | 'transporte'>
> & {
  condicionOperacion: CondicionOperacion_FE_Input;
  itemsOperacion: ItemOperacion_FE_Input[];
  transporte?: Transporte_FE_Input;
};

export interface FacturaElectronicaInput {
  id_cdc: string;
  operacionDE: OperacionDE_FE_Input;
  timbrado: Timbrado_FE_Input;
  datosGeneralesOperacion: DatosGeneralesOperacion_FE_Input;
  datosEspecificosPorTipoDE: DatosEspecificosPorTipoDE_FE_Input;
  subtotalesTotales: { comisionOperacion?: NumBig };
  camposUsoGeneral?: UsoGeneral;
  camposDocumentoElectronicoAsociado?: DocumentoElectronicoAsociado;
}
