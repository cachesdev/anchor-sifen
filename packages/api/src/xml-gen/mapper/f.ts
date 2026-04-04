import type { SubtotalesTotales_FE } from '../../sifen/types/factura-electronica';
import type { GTotSub } from '../../sifen/types/raw/f';
import { bigToRawNumber, optionalBigToRawNumber } from './helpers';

export function mapSubtotalesTotalesToRaw(data: SubtotalesTotales_FE): GTotSub {
  return {
    dSubExe: optionalBigToRawNumber(data.subtotalExenta),
    dSubExo: optionalBigToRawNumber(data.subtotalExonerada),
    dSub5: optionalBigToRawNumber(data.subtotalIva5),
    dSub10: optionalBigToRawNumber(data.subtotalIva10),
    dTotOpe: bigToRawNumber(data.totalBrutoOperacion),
    dTotDesc: bigToRawNumber(data.totalDescuentoParticular),
    dTotDescGlotem: bigToRawNumber(data.totalDescuentoGlobal),
    dTotAntItem: bigToRawNumber(data.totalAnticipoItem),
    dTotAnt: bigToRawNumber(data.totalAnticipoGlobal),
    dPorcDescTotal: bigToRawNumber(data.porcentajeDescuentoGlobal),
    dDescTotal: bigToRawNumber(data.totalDescuentosOperacion),
    dAnticipo: bigToRawNumber(data.totalAnticiposOperacion),
    dRedon: bigToRawNumber(data.redondeoOperacion),
    dComi: optionalBigToRawNumber(data.comisionOperacion),
    dTotGralOpe: bigToRawNumber(data.totalNetoOperacion),
    dIVA5: optionalBigToRawNumber(data.liquidacionIva5),
    dIVA10: optionalBigToRawNumber(data.liquidacionIva10),
    dLiqTotIVA5: optionalBigToRawNumber(data.liquidacionTotalIva5),
    dLiqTotIVA10: optionalBigToRawNumber(data.liquidacionTotalIva10),
    dIVAComi: optionalBigToRawNumber(data.liquidacionIvaComision),
    dTotIVA: optionalBigToRawNumber(data.liquidacionTotalIva),
    dBaseGrav5: optionalBigToRawNumber(data.totalBaseGravada5),
    dBaseGrav10: optionalBigToRawNumber(data.totalBaseGravada10),
    dTBasGraIVA: optionalBigToRawNumber(data.totalBaseGravadaIva),
    dTotalGs: optionalBigToRawNumber(data.totalOperacionGs)
  };
}
