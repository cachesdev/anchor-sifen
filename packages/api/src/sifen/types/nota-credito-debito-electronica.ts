import type {
  DatosEspecificosPorTipoDE,
  DatosGeneralesOperacion,
  DEC,
  OperacionDE,
  Timbrado
} from './clean/de';
import type { SubtotalesTotales } from './clean/f';
import type { TipoDocumentoElectronicoLabel } from './enums';
import type { OmitDeep, SetRequired, SetRequiredDeep, Simplify, SimplifyDeep } from 'type-fest';

export type Timbrado_NCDE = Timbrado;
export type OperacionDE_NCDE = Simplify<SetRequired<OperacionDE, 'codigoSeguridad'>>;

export type DatosGeneralesOperacion_NCDE = SimplifyDeep<
  SetRequiredDeep<
    OmitDeep<DatosGeneralesOperacion, 'operacionComercial.tipoTransaccion'>,
    'operacionComercial' | 'emisor.digitoVerificadorEmisor'
  >
>;

export type DatosEspecificosPorTipoDE_NCDE = SimplifyDeep<
  SetRequiredDeep<
    OmitDeep<
      DatosEspecificosPorTipoDE,
      | 'facturaElectronica'
      | 'autofacturaElectronica'
      | 'notaRemisionElectronica'
      | 'condicionOperacion'
      | 'transporte'
    >,
    | 'notaCreditoDebitoElectronica'
    | 'itemsOperacion'
    | `itemsOperacion.${number}.valorItem`
    | `itemsOperacion.${number}.valorItem.valorRestaItem.porcentajeDescuentoItem`
  >
>;

export type ItemOperacion_NCDE = DatosEspecificosPorTipoDE_NCDE['itemsOperacion'][number];

type NotaCreditoDebitoElectronicaBase<
  TType extends Extract<
    TipoDocumentoElectronicoLabel,
    'NotaCreditoElectronica' | 'NotaDebitoElectronica'
  >
> = Omit<
  DEC,
  | 'operacionDE'
  | 'timbrado'
  | 'datosGeneralesOperacion'
  | 'datosEspecificosPorTipoDE'
  | 'subtotalesTotales'
  | 'camposDocumentoElectronicoAsociado'
> & {
  tipoDE: TType;
  operacionDE: OperacionDE_NCDE;
  timbrado: Timbrado_NCDE;
  datosGeneralesOperacion: DatosGeneralesOperacion_NCDE;
  datosEspecificosPorTipoDE: DatosEspecificosPorTipoDE_NCDE;
  subtotalesTotales: SubtotalesTotales;
  camposDocumentoElectronicoAsociado: NonNullable<DEC['camposDocumentoElectronicoAsociado']>;
};

export type NotaCreditoElectronica = Simplify<
  NotaCreditoDebitoElectronicaBase<'NotaCreditoElectronica'>
>;

export type NotaDebitoElectronica = Simplify<
  NotaCreditoDebitoElectronicaBase<'NotaDebitoElectronica'>
>;
