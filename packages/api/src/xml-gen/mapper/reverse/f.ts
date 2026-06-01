import type { SubtotalesTotales } from '../../../sifen/types/clean/f';
import type { GTotSub } from '../../../sifen/types/raw/f';
import { parseBig, parseOptionalBig } from './helpers';

export function mapGTotSubToClean(data: GTotSub): SubtotalesTotales {
  return {
    subtotalExenta: parseOptionalBig(data.dSubExe, 'dSubExe'),
    subtotalExonerada: parseOptionalBig(data.dSubExo, 'dSubExo'),
    subtotalIva5: parseOptionalBig(data.dSub5, 'dSub5'),
    subtotalIva10: parseOptionalBig(data.dSub10, 'dSub10'),
    totalBrutoOperacion: parseBig(data.dTotOpe, 'dTotOpe'),
    totalDescuentoParticular: parseBig(data.dTotDesc, 'dTotDesc'),
    totalDescuentoGlobal: parseBig(data.dTotDescGlotem, 'dTotDescGlotem'),
    totalAnticipoItem: parseBig(data.dTotAntItem, 'dTotAntItem'),
    totalAnticipoGlobal: parseBig(data.dTotAnt, 'dTotAnt'),
    porcentajeDescuentoGlobal: parseBig(data.dPorcDescTotal, 'dPorcDescTotal'),
    totalDescuentosOperacion: parseBig(data.dDescTotal, 'dDescTotal'),
    totalAnticiposOperacion: parseBig(data.dAnticipo, 'dAnticipo'),
    redondeoOperacion: parseBig(data.dRedon, 'dRedon'),
    comisionOperacion: parseOptionalBig(data.dComi, 'dComi'),
    totalNetoOperacion: parseBig(data.dTotGralOpe, 'dTotGralOpe'),
    liquidacionIva5: parseOptionalBig(data.dIVA5, 'dIVA5'),
    liquidacionIva10: parseOptionalBig(data.dIVA10, 'dIVA10'),
    liquidacionTotalIva5: parseOptionalBig(data.dLiqTotIVA5, 'dLiqTotIVA5'),
    liquidacionTotalIva10: parseOptionalBig(data.dLiqTotIVA10, 'dLiqTotIVA10'),
    liquidacionIvaComision: parseOptionalBig(data.dIVAComi, 'dIVAComi'),
    liquidacionTotalIva: parseOptionalBig(data.dTotIVA, 'dTotIVA'),
    totalBaseGravada5: parseOptionalBig(data.dBaseGrav5, 'dBaseGrav5'),
    totalBaseGravada10: parseOptionalBig(data.dBaseGrav10, 'dBaseGrav10'),
    totalBaseGravadaIva: parseOptionalBig(data.dTBasGraIVA, 'dTBasGraIVA'),
    totalOperacionGs: parseOptionalBig(data.dTotalGs, 'dTotalGs')
  };
}
