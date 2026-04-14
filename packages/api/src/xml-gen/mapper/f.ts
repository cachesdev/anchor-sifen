import type { SubtotalesTotales_FE } from '../../sifen/types/factura-electronica';
import type { GTotSub } from '../../sifen/types/raw/f';
import { bigToRawDecimal, optionalBigToRawDecimal } from './helpers';

export function mapSubtotalesTotalesToRaw(data: SubtotalesTotales_FE): GTotSub {
  return {
    dSubExe: optionalBigToRawDecimal(data.subtotalExenta, 8),
    dSubExo: optionalBigToRawDecimal(data.subtotalExonerada, 8),
    dSub5: optionalBigToRawDecimal(data.subtotalIva5, 8),
    dSub10: optionalBigToRawDecimal(data.subtotalIva10, 8),
    dTotOpe: bigToRawDecimal(data.totalBrutoOperacion, 8),
    dTotDesc: bigToRawDecimal(data.totalDescuentoParticular, 8),
    dTotDescGlotem: bigToRawDecimal(data.totalDescuentoGlobal, 8),
    dTotAntItem: bigToRawDecimal(data.totalAnticipoItem, 8),
    dTotAnt: bigToRawDecimal(data.totalAnticipoGlobal, 8),
    dPorcDescTotal: bigToRawDecimal(data.porcentajeDescuentoGlobal, 8),
    dDescTotal: bigToRawDecimal(data.totalDescuentosOperacion, 8),
    dAnticipo: bigToRawDecimal(data.totalAnticiposOperacion, 8),
    dRedon: bigToRawDecimal(data.redondeoOperacion, 4),
    dComi: optionalBigToRawDecimal(data.comisionOperacion, 8),
    dTotGralOpe: bigToRawDecimal(data.totalNetoOperacion, 8),
    dIVA5: optionalBigToRawDecimal(data.liquidacionIva5, 8),
    dIVA10: optionalBigToRawDecimal(data.liquidacionIva10, 8),
    dLiqTotIVA5: optionalBigToRawDecimal(data.liquidacionTotalIva5, 8),
    dLiqTotIVA10: optionalBigToRawDecimal(data.liquidacionTotalIva10, 8),
    dIVAComi: optionalBigToRawDecimal(data.liquidacionIvaComision, 8),
    dTotIVA: optionalBigToRawDecimal(data.liquidacionTotalIva, 8),
    dBaseGrav5: optionalBigToRawDecimal(data.totalBaseGravada5, 8),
    dBaseGrav10: optionalBigToRawDecimal(data.totalBaseGravada10, 8),
    dTBasGraIVA: optionalBigToRawDecimal(data.totalBaseGravadaIva, 8),
    dTotalGs: optionalBigToRawDecimal(data.totalOperacionGs, 8)
  };
}
