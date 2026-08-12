import type { OmitDeep } from 'type-fest';
import type { UsoGeneral } from './clean/g';
import type { DocumentoElectronicoAsociado } from './clean/h';
import type {
  DatosEspecificosPorTipoDE_NCDE,
  DatosGeneralesOperacion_NCDE,
  ItemOperacion_NCDE,
  OperacionDE_NCDE,
  Timbrado_NCDE
} from './nota-credito-debito-electronica';
import type { DeepNumBig, NumBig } from './big';

export type OperacionDE_NCDE_Input = DeepNumBig<Omit<OperacionDE_NCDE, 'codigoSeguridad'>>;
export type Timbrado_NCDE_Input = Omit<Timbrado_NCDE, 'tipoDocumento'>;

type Emisor_NCDE_Input = DeepNumBig<
  Omit<DatosGeneralesOperacion_NCDE['emisor'], 'digitoVerificadorEmisor'>
>;

type Receptor_NCDE_Input = DeepNumBig<
  Omit<DatosGeneralesOperacion_NCDE['receptor'], 'digitoVerificadorReceptor'>
>;

export type DatosGeneralesOperacion_NCDE_Input = DeepNumBig<
  Omit<DatosGeneralesOperacion_NCDE, 'emisor' | 'receptor'>
> & {
  emisor: Emisor_NCDE_Input;
  receptor: Receptor_NCDE_Input;
};

export type ItemOperacion_NCDE_Input = DeepNumBig<
  OmitDeep<
    ItemOperacion_NCDE,
    | 'valorItem.totalBrutoOperacionItem'
    | 'valorItem.valorRestaItem.descuentoGlobalItem'
    | 'valorItem.valorRestaItem.porcentajeDescuentoItem'
    | 'valorItem.valorRestaItem.valorTotalOperacionItem'
    | 'valorItem.valorRestaItem.valorTotalOperacionItemGs'
    | 'ivaItem.baseGravadaIvaItem'
    | 'ivaItem.liquidacionIvaItem'
    | 'ivaItem.baseExenta'
  >
>;

export type DatosEspecificosPorTipoDE_NCDE_Input = DeepNumBig<
  Omit<DatosEspecificosPorTipoDE_NCDE, 'itemsOperacion'>
> & {
  itemsOperacion: ItemOperacion_NCDE_Input[];
};

interface NotaCreditoDebitoElectronicaInputBase {
  id_cdc: string;
  operacionDE: OperacionDE_NCDE_Input;
  timbrado: Timbrado_NCDE_Input;
  datosGeneralesOperacion: DatosGeneralesOperacion_NCDE_Input;
  datosEspecificosPorTipoDE: DatosEspecificosPorTipoDE_NCDE_Input;
  subtotalesTotales: { comisionOperacion?: NumBig; porcentajeDescuentoGlobal?: NumBig };
  camposUsoGeneral?: UsoGeneral;
  camposDocumentoElectronicoAsociado: DocumentoElectronicoAsociado;
}

export type NotaCreditoElectronicaInput = NotaCreditoDebitoElectronicaInputBase;

export type NotaDebitoElectronicaInput = NotaCreditoDebitoElectronicaInputBase;
