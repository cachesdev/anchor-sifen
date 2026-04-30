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

export type Timbrado_AFE = Timbrado;
export type OperacionDE_AFE = Simplify<SetRequired<OperacionDE, 'codigoSeguridad'>>;

export type DatosGeneralesOperacion_AFE = SimplifyDeep<
  SetRequiredDeep<DatosGeneralesOperacion, 'operacionComercial' | 'emisor.digitoVerificadorEmisor'>
>;

export type DatosEspecificosPorTipoDE_AFE = SimplifyDeep<
  SetRequiredDeep<
    OmitDeep<
      DatosEspecificosPorTipoDE,
      | 'facturaElectronica'
      | 'notaCreditoDebitoElectronica'
      | 'notaRemisionElectronica'
      | 'transporte'
    >,
    | 'autofacturaElectronica'
    | 'condicionOperacion'
    | 'itemsOperacion'
    | `itemsOperacion.${number}.valorItem`
    | `itemsOperacion.${number}.valorItem.valorRestaItem.porcentajeDescuentoItem`
  >
>;

export interface AutofacturaElectronicaDE extends Omit<
  DEC,
  | 'operacionDE'
  | 'timbrado'
  | 'datosGeneralesOperacion'
  | 'datosEspecificosPorTipoDE'
  | 'subtotalesTotales'
  | 'camposDocumentoElectronicoAsociado'
> {
  tipoDE: Extract<TipoDocumentoElectronicoLabel, 'AutofacturaElectronica'>;
  operacionDE: OperacionDE_AFE;
  timbrado: Timbrado_AFE;
  datosGeneralesOperacion: DatosGeneralesOperacion_AFE;
  datosEspecificosPorTipoDE: DatosEspecificosPorTipoDE_AFE;
  subtotalesTotales: SubtotalesTotales;
  camposDocumentoElectronicoAsociado: NonNullable<DEC['camposDocumentoElectronicoAsociado']>;
}
