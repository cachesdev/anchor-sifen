import type { SubtotalesTotales } from '../../sifen/types/clean/f';
import type { GTotSub } from '../../sifen/types/raw/f';

export function mapSubtotalesTotalesToRaw(data: SubtotalesTotales): GTotSub {
  return {
    dSubExe: data.subtotalExenta,
    dSubExo: data.subtotalExonerada,
    dSub5: data.subtotalIva5,
    dSub10: data.subtotalIva10,
    dTotOpe: data.totalBrutoOperacion,
    dTotDesc: data.totalDescuentoParticular,
    dTotDescGlotem: data.totalDescuentoGlobal,
    dTotAntItem: data.totalAnticipoItem,
    dTotAnt: data.totalAnticipoGlobal,
    dPorcDescTotal: data.porcentajeDescuentoGlobal,
    dDescTotal: data.totalDescuentosOperacion,
    dAnticipo: data.totalAnticiposOperacion,
    dRedon: data.redondeoOperacion,
    dComi: data.comisionOperacion,
    dTotGralOpe: data.totalNetoOperacion,
    dIVA5: data.liquidacionIva5,
    dIVA10: data.liquidacionIva10,
    dLiqTotIVA5: data.liquidacionTotalIva5,
    dLiqTotIVA10: data.liquidacionTotalIva10,
    dIVAComi: data.liquidacionIvaComision,
    dTotIVA: data.liquidacionTotalIva,
    dBaseGrav5: data.totalBaseGravada5,
    dBaseGrav10: data.totalBaseGravada10,
    dTBasGraIVA: data.totalBaseGravadaIva,
    dTotalGs: data.totalOperacionGs
  };
}
