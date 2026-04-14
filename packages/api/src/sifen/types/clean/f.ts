import type { Big } from 'big.js';

/**
 * F - F001 | gTotSub | Campos de subtotales y totales | Pagina 102
 */
export interface SubtotalesTotales {
  /**
   * F - F002 | dSubExe | Subtotal de la operación exenta | Pagina 103
   *
   * Si no es proveido, es calculado internamente.
   */
  subtotalExenta?: Big;
  /**
   * F - F003 | dSubExo | Subtotal de la operación exonerada | Pagina 103
   *
   * Si no es proveido, es calculado internamente.
   */
  subtotalExonerada?: Big;
  /**
   * F - F005 | dSub5 | Subtotal de la operación con IVA incluido a la tasa 5% | Pagina 103
   *
   * Si no es proveido, es calculado internamente.
   */
  subtotalIva5?: Big;
  /**
   * F - F005 | dSub10 | Subtotal de la operación con IVA incluido a la tasa 10% | Pagina 103
   *
   * Si no es proveido, es calculado internamente.
   */
  subtotalIva10?: Big;
  /**
   * F - F008 | dTotOpe | Total Bruto de la operación | Pagina 103
   *
   * Si no es proveido, es calculado internamente.
   */
  totalBrutoOperacion: Big;
  /**
   * F - F009 | dTotDesc | Total descuento particular por ítem | Pagina 103
   *
   * Si no es proveido, es calculado internamente.
   */
  totalDescuentoParticular: Big;
  /**
   * F - F033 | dTotDescGlotem | Total descuento global por ítem | Pagina 103
   *
   * Si no es proveido, es calculado internamente.
   */
  totalDescuentoGlobal: Big;
  /**
   * F - F034 | dTotAntItem | Total Anticipo por ítem | Pagina 104
   *
   * Si no es proveido, es calculado internamente.
   */
  totalAnticipoItem: Big;
  /**
   * F - F035 | dTotAnt | Total Anticipo global por ítem | Pagina 104
   *
   * Si no es proveido, es calculado internamente.
   */
  totalAnticipoGlobal: Big;
  /**
   * F - F010 | dPorcDescTotal | Porcentaje de descuento global sobre total de la operación | Pagina 104
   *
   * Si no es proveido, es calculado internamente.
   */
  porcentajeDescuentoGlobal: Big;
  /**
   * F - F011 | dDescTotal | Total Descuentos de la operación | Pagina 104
   *
   * Si no es proveido, es calculado internamente.
   */
  totalDescuentosOperacion: Big;
  /**
   * F - F012 | dAnticipo | Total Anticipos de la operación | Pagina 104
   *
   * Si no es proveido, es calculado internamente.
   */
  totalAnticiposOperacion: Big;
  /**
   * F - F013 | dRedon | Redondeo de la operación | Pagina 104
   *
   * Si no es proveido, es calculado internamente.
   */
  redondeoOperacion: Big;
  /**
   * F - F026 | dComi | Comisión de la operación | Pagina 104
   *
   * Si no es proveido, es calculado internamente.
   */
  comisionOperacion?: Big;
  /**
   * F - F014 | dTotGralOpe | Total Neto de la operación | Pagina 104
   */
  totalNetoOperacion: Big;
  /**
   * F - F015 | dIVA5 | Liquidación del IVA a la tasa del 5% | Pagina 104
   *
   * Si no es proveido, es calculado internamente.
   */
  liquidacionIva5?: Big;
  /**
   * F - F016 | dIVA10 | Liquidación del IVA a la tasa del 10% | Pagina 104
   *
   * Si no es proveido, es calculado internamente.
   */
  liquidacionIva10?: Big;
  /**
   * F - F036 | dLiqTotIVA5 | Liquidación total del IVA por redondeo a la tasa del 5% | Pagina 105
   *
   * Si no es proveido, es calculado internamente.
   */
  liquidacionTotalIva5?: Big;
  /**
   * F - F037 | dLiqTotIVA10 | Liquidación total del IVA por redondeo a la tasa del 10% | Pagina 105
   *
   * Si no es proveido, es calculado internamente.
   */
  liquidacionTotalIva10?: Big;
  /**
   * F - F026 | dIVAComi | Liquidación total del IVA de la comisión | Pagina 105
   *
   * Si no es proveido, es calculado internamente.
   */
  liquidacionIvaComision?: Big;
  /**
   * F - F017 | dTotIVA | Liquidación total del IVA | Pagina 105
   *
   * Si no es proveido, es calculado internamente.
   */
  liquidacionTotalIva?: Big;
  /**
   * F - F018 | dBaseGrav5 | Total base gravada al 5% | Pagina 105
   *
   * Si no es proveido, es calculado internamente.
   */
  totalBaseGravada5?: Big;
  /**
   * F - F019 | dBaseGrav10 | Total base gravada al 10% | Pagina 106
   *
   * Si no es proveido, es calculado internamente.
   */
  totalBaseGravada10?: Big;
  /**
   * F - F020 | dTBasGraIVA | Total de la base gravada de IVA | Pagina 106
   *
   * Si no es proveido, es calculado internamente.
   */
  totalBaseGravadaIva?: Big;
  /**
   * F - F023 | dTotalGs | Total general de la operación en Guaraníes | Pagina 106
   *
   * Si no es proveido, es calculado internamente.
   */
  totalOperacionGs?: Big;
}
