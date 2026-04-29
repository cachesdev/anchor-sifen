import type { SubtotalesTotales } from '../../sifen/types/clean/f';
import type { GTotSub } from '../../sifen/types/raw/f';
import { bigToFixed, optionalBigToFixed } from './helpers';

export function mapSubtotalesTotalesToRaw(data: SubtotalesTotales): GTotSub {
  return {
    dSubExe: optionalBigToFixed(data.subtotalExenta, 8),
    dSubExo: optionalBigToFixed(data.subtotalExonerada, 8),
    dSub5: optionalBigToFixed(data.subtotalIva5, 8),
    dSub10: optionalBigToFixed(data.subtotalIva10, 8),
    dTotOpe: bigToFixed(data.totalBrutoOperacion, 8),
    dTotDesc: bigToFixed(data.totalDescuentoParticular, 8),
    dTotDescGlotem: bigToFixed(data.totalDescuentoGlobal, 8),
    dTotAntItem: bigToFixed(data.totalAnticipoItem, 8),
    dTotAnt: bigToFixed(data.totalAnticipoGlobal, 8),
    dPorcDescTotal: bigToFixed(data.porcentajeDescuentoGlobal, 8),
    dDescTotal: bigToFixed(data.totalDescuentosOperacion, 8),
    dAnticipo: bigToFixed(data.totalAnticiposOperacion, 8),
    dRedon: bigToFixed(data.redondeoOperacion, 4),
    dComi: optionalBigToFixed(data.comisionOperacion, 8),
    dTotGralOpe: bigToFixed(data.totalNetoOperacion, 8),
    dIVA5: optionalBigToFixed(data.liquidacionIva5, 8),
    dIVA10: optionalBigToFixed(data.liquidacionIva10, 8),
    dLiqTotIVA5: optionalBigToFixed(data.liquidacionTotalIva5, 8),
    dLiqTotIVA10: optionalBigToFixed(data.liquidacionTotalIva10, 8),
    dIVAComi: optionalBigToFixed(data.liquidacionIvaComision, 8),
    dTotIVA: optionalBigToFixed(data.liquidacionTotalIva, 8),
    dBaseGrav5: optionalBigToFixed(data.totalBaseGravada5, 8),
    dBaseGrav10: optionalBigToFixed(data.totalBaseGravada10, 8),
    dTBasGraIVA: optionalBigToFixed(data.totalBaseGravadaIva, 8),
    dTotalGs: optionalBigToFixed(data.totalOperacionGs, 8)
  };
}
