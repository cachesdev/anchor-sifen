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

export type Timbrado_FE = Timbrado;
export type OperacionDE_FE = Simplify<SetRequired<OperacionDE, 'codigoSeguridad'>>;

export type DatosGeneralesOperacion_FE = SimplifyDeep<
  SetRequiredDeep<DatosGeneralesOperacion, 'operacionComercial' | 'emisor.digitoVerificadorEmisor'>
>;

export type DatosEspecificosPorTipoDE_FE = SimplifyDeep<
  SetRequiredDeep<
    OmitDeep<
      DatosEspecificosPorTipoDE,
      'autofacturaElectronica' | 'notaCreditoDebitoElectronica' | 'notaRemisionElectronica'
    >,
    | 'facturaElectronica'
    | 'condicionOperacion'
    | 'itemsOperacion'
    | `itemsOperacion.${number}.valorItem`
    | `itemsOperacion.${number}.valorItem.valorRestaItem.porcentajeDescuentoItem`
  >
>;

export type SubtotalesTotales_FE = SubtotalesTotales;

export type ItemOperacion_FE = DatosEspecificosPorTipoDE_FE['itemsOperacion'][number];
export type ValorItem_FE = ItemOperacion_FE['valorItem'];
export type ValorRestaItem_FE = ValorItem_FE['valorRestaItem'];
export type IvaItem_FE = NonNullable<ItemOperacion_FE['ivaItem']>;
export type OperacionComercial_FE = DatosGeneralesOperacion_FE['operacionComercial'];

export interface FacturaElectronica extends Omit<
  DEC,
  | 'operacionDE'
  | 'timbrado'
  | 'datosGeneralesOperacion'
  | 'datosEspecificosPorTipoDE'
  | 'subtotalesTotales'
> {
  tipoDE: Extract<TipoDocumentoElectronicoLabel, 'FacturaElectronica'>;
  operacionDE: OperacionDE_FE;
  timbrado: Timbrado_FE;
  datosGeneralesOperacion: DatosGeneralesOperacion_FE;
  datosEspecificosPorTipoDE: DatosEspecificosPorTipoDE_FE;
  subtotalesTotales: SubtotalesTotales;
}
