import type { SubtotalesTotales } from '../../sifen/types/clean/f';
import type { GTotSub } from '../../sifen/types/raw/f';
import { optionalBigToFixed } from './helpers';

export function mapSubtotalesTotalesToRaw(data: SubtotalesTotales): GTotSub {
  return {
    dSubExe: optionalBigToFixed(data.subtotalExenta, 8),
    dSubExo: optionalBigToFixed(data.subtotalExonerada, 8),
    dSub5: optionalBigToFixed(data.subtotalIva5, 8),
    dSub10: optionalBigToFixed(data.subtotalIva10, 8),
    dTotOpe: data.totalBrutoOperacion.toFixed(8),
    dTotDesc: data.totalDescuentoParticular.toFixed(8),
    dTotDescGlotem: data.totalDescuentoGlobal.toFixed(8),
    dTotAntItem: data.totalAnticipoItem.toFixed(8),
    dTotAnt: data.totalAnticipoGlobal.toFixed(8),
    dPorcDescTotal: data.porcentajeDescuentoGlobal.toFixed(8),
    dDescTotal: data.totalDescuentosOperacion.toFixed(8),
    dAnticipo: data.totalAnticiposOperacion.toFixed(8),
    dRedon: data.redondeoOperacion.toFixed(4),
    dComi: optionalBigToFixed(data.comisionOperacion, 8),
    dTotGralOpe: data.totalNetoOperacion.toFixed(8),
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
