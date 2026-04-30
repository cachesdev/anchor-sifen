import type {
  DatosGeneralesOperacion_FE_Input,
  DatosEspecificosPorTipoDE_FE_Input,
  ItemOperacion_FE_Input
} from '../../sifen/types/factura-electronica-input';

/** Auxiliares para acceso anidado desde factories. */
type CondicionOperacion = DatosEspecificosPorTipoDE_FE_Input['condicionOperacion'];
type ValorItem = NonNullable<ItemOperacion_FE_Input['valorItem']>;

export type EmisorInput = DatosGeneralesOperacion_FE_Input['emisor'];
export type ReceptorInput = DatosGeneralesOperacion_FE_Input['receptor'];
export type CondicionOperacionInput = CondicionOperacion;
export type PagoContadoInput = NonNullable<CondicionOperacion['pagoContadoEntregaInicial']>[number];
export type PagoTarjetaInput = NonNullable<PagoContadoInput['pagoTarjetaCreditoDebito']>;
export type ValorItemInput = ValorItem;
export type ValorRestaItemInput = ValorItem['valorRestaItem'];
export type IvaItemInput = NonNullable<ItemOperacion_FE_Input['ivaItem']>;
