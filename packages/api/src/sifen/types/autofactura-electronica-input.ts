import type { OmitDeep } from 'type-fest';
import type { UsoGeneral } from './clean/g';
import type { DocumentoElectronicoAsociado } from './clean/h';
import type {
  OperacionDE_AFE,
  Timbrado_AFE,
  DatosGeneralesOperacion_AFE,
  DatosEspecificosPorTipoDE_AFE
} from './autofactura-electronica';
import type { ItemOperacion_FE } from './factura-electronica';
import type { DeepNumBig, NumBig } from './big';

export type OperacionDE_AFE_Input = DeepNumBig<Omit<OperacionDE_AFE, 'codigoSeguridad'>>;

export type Timbrado_AFE_Input = Omit<Timbrado_AFE, 'tipoDocumento'>;

type Emisor_AFE_Input = DeepNumBig<
  Omit<DatosGeneralesOperacion_AFE['emisor'], 'digitoVerificadorEmisor'>
>;

type Receptor_AFE_Input = DeepNumBig<
  Omit<DatosGeneralesOperacion_AFE['receptor'], 'digitoVerificadorReceptor'>
>;

export type DatosGeneralesOperacion_AFE_Input = DeepNumBig<
  Omit<DatosGeneralesOperacion_AFE, 'emisor' | 'receptor'>
> & {
  emisor: Emisor_AFE_Input;
  receptor: Receptor_AFE_Input;
};

type CondicionOperacion_AFE_Input = DeepNumBig<
  OmitDeep<
    DatosEspecificosPorTipoDE_AFE['condicionOperacion'],
    `pagoContadoEntregaInicial.${number}.pagoTarjetaCreditoDebito.digitoVerificadorProcesadoraTarjeta`
  >
>;

type ItemOperacion_AFE_Input = DeepNumBig<
  OmitDeep<
    ItemOperacion_FE,
    | 'valorItem.totalBrutoOperacionItem'
    | 'valorItem.valorRestaItem.porcentajeDescuentoItem'
    | 'valorItem.valorRestaItem.valorTotalOperacionItem'
    | 'valorItem.valorRestaItem.valorTotalOperacionItemGs'
  >
>;

export type DatosEspecificosPorTipoDE_AFE_Input = DeepNumBig<
  Omit<DatosEspecificosPorTipoDE_AFE, 'condicionOperacion' | 'itemsOperacion'>
> & {
  condicionOperacion: CondicionOperacion_AFE_Input;
  itemsOperacion: ItemOperacion_AFE_Input[];
};

export interface AutofacturaElectronicaInput {
  id_cdc: string;
  operacionDE: OperacionDE_AFE_Input;
  timbrado: Timbrado_AFE_Input;
  datosGeneralesOperacion: DatosGeneralesOperacion_AFE_Input;
  datosEspecificosPorTipoDE: DatosEspecificosPorTipoDE_AFE_Input;
  subtotalesTotales: { comisionOperacion?: NumBig };
  camposUsoGeneral?: UsoGeneral;
  camposDocumentoElectronicoAsociado: DocumentoElectronicoAsociado;
}
