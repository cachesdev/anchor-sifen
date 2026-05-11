import type { Big } from 'big.js';

/**
 * F - F001 | gTotSub | Campos de subtotales y totales | Pagina 102
 *
 * Observaciones:
 *   Obligatorio si C002 ≠ 7
 *   No informar si C002 = 7
 *   Cuando C002= 4, no informar F002, F003, F004, F005, F015, F016, F017, F018, F019, F020, F023, F025 y F026
 */
export interface SubtotalesTotales {
  /**
   * F - F002 | dSubExe | Subtotal de la operación exenta | Pagina 103
   *
   * Si no es proveido, es calculado internamente.
   * Observaciones: Si E731 = 3: Suma de todas las ocurrencias de EA008 (Valor total de la operación por ítem) cuando la operación sea exenta
   */
  subtotalExenta?: Big;
  /**
   * F - F003 | dSubExo | Subtotal de la operación exonerada | Pagina 103
   *
   * Si no es proveido, es calculado internamente.
   * Observaciones: Si E731 = 2: Suma de todas las ocurrencias de EA008 (Valor total de la operación por ítem) cuando la operación sea exonerada
   */
  subtotalExonerada?: Big;
  /**
   * F - F005 | dSub5 | Subtotal de la operación con IVA incluido a la tasa 5% | Pagina 103
   *
   * Si no es proveido, es calculado internamente.
   *
   * Observaciones:
   *   Si E731 = 1 o 4: Suma de todas las ocurrencias de EA008 (Valor total de la operación por ítem) cuando la operación sea a la tasa del 10% (E734=10)
   *   No debe existir el campo si D013 ≠ 1
   */
  subtotalIva5?: Big;
  /**
   * F - F005 | dSub10 | Subtotal de la operación con IVA incluido a la tasa 10% | Pagina 103
   *
   * Si no es proveido, es calculado internamente.
   *
   * Observaciones:
   *   Si E731 = 1 o 4: Suma de todas las ocurrencias de EA008 (Valor total de la operación por ítem) cuando la operación sea a la tasa del 10% (E734=10)
   *   No debe existir el campo si D013 ≠ 1
   */
  subtotalIva10?: Big;
  /**
   * F - F008 | dTotOpe | Total Bruto de la operación | Pagina 103
   *
   * Si no es proveido, es calculado internamente.
   *
   * Observaciones:
   *   Cuando D013 = 1, 3, 4 o 5 corresponde a la suma de los subtotales de la operación (F002, F003, F004 y F005)
   *   Cuando D013 = 2 corresponde a F006
   *   Cuando C002=4 corresponde a la suma de todas las ocurrencias de EA008 (Valor total de la operación por ítem)
   */
  totalBrutoOperacion: Big;
  /**
   * F - F009 | dTotDesc | Total descuento particular por ítem | Pagina 103
   *
   * Si no es proveido, es calculado internamente.
   * Observaciones: Suma de todos los descuentos particulares por ítem (EA002)
   */
  totalDescuentoParticular: Big;
  /**
   * F - F033 | dTotDescGlotem | Total descuento global por ítem | Pagina 103
   *
   * Si no es proveido, es calculado internamente.
   * Observaciones: Sumatoria de todas las ocurrencias de descuentos globales por ítem (EA004)
   */
  totalDescuentoGlobal: Big;
  /**
   * F - F034 | dTotAntItem | Total Anticipo por ítem | Pagina 104
   *
   * Si no es proveido, es calculado internamente.
   * Observaciones: Sumatoria de todas las ocurrencias de anticipos por ítem (EA006)
   */
  totalAnticipoItem: Big;
  /**
   * F - F035 | dTotAnt | Total Anticipo global por ítem | Pagina 104
   *
   * Si no es proveido, es calculado internamente.
   * Observaciones: Sumatoria de todas las ocurrencias de anticipos global por ítem (EA007)
   */
  totalAnticipoGlobal: Big;
  /**
   * F - F010 | dPorcDescTotal | Porcentaje de descuento global sobre total de la operación | Pagina 104
   *
   * Si no es proveido, es calculado internamente.
   * Observaciones: Informativo, si no existe %, completar con cero
   */
  porcentajeDescuentoGlobal: Big;
  /**
   * F - F011 | dDescTotal | Total Descuentos de la operación | Pagina 104
   *
   * Si no es proveido, es calculado internamente.
   * Observaciones: Sumatoria de todos los descuentos (Global por Ítem y particular por ítem) de cada ítem
   */
  totalDescuentosOperacion: Big;
  /**
   * F - F012 | dAnticipo | Total Anticipos de la operación | Pagina 104
   *
   * Si no es proveido, es calculado internamente.
   * Observaciones: Sumatoria de todos los Anticipos (Global por Ítem y particular por ítem)
   */
  totalAnticiposOperacion: Big;
  /**
   * F - F013 | dRedon | Redondeo de la operación | Pagina 104
   *
   * Si no es proveido, es calculado internamente.
   *
   * Observaciones:
   *   Se realiza sobre el campo F008 y conforme a la explicación inicial en el grupo F
   *   Si no cuenta con redondeo completar con cero
   */
  redondeoOperacion: Big;
  /**
   * F - F026 | dComi | Comisión de la operación | Pagina 104
   *
   * Si no es proveido, es calculado internamente.
   * Observaciones: Se aplica la tasa del 10% para comisiones
   */
  comisionOperacion?: Big;
  /**
   * F - F014 | dTotGralOpe | Total Neto de la operación | Pagina 104
   *
   * Observaciones:
   *   Corresponde al cálculo aritmético
   *   F008 - F013 + F025
   */
  totalNetoOperacion: Big;
  /**
   * F - F015 | dIVA5 | Liquidación del IVA a la tasa del 5% | Pagina 104
   *
   * Si no es proveido, es calculado internamente.
   *
   * Observaciones:
   *   Suma de todas las ocurrencias de E736 (Liquidación del IVA por ítem) cuando la operación sea a la tasa del 5% (E734=5)
   *   No debe existir el campo si D013 ≠ 1 o D013≠5
   */
  liquidacionIva5?: Big;
  /**
   * F - F016 | dIVA10 | Liquidación del IVA a la tasa del 10% | Pagina 104
   *
   * Si no es proveido, es calculado internamente.
   *
   * Observaciones:
   *   Suma de todas las ocurrencias de E736 (Liquidación del IVA por ítem) cuando la operación sea a la tasa del 10% (E734=10)
   *   No debe existir el campo si D013 ≠ 1 o D013≠5
   */
  liquidacionIva10?: Big;
  /**
   * F - F036 | dLiqTotIVA5 | Liquidación total del IVA por redondeo a la tasa del 5% | Pagina 105
   *
   * Si no es proveido, es calculado internamente.
   *
   * Observaciones:
   *   Corresponde al cálculo del impuesto al IVA a la tasa del 5% sobre el valor del redondeo (Valor del redondeo/1,05), cuando la operación sea a la tasa del 5% (E734=5)
   *   No debe existir el campo si D013 ≠ 1 o D013≠5
   */
  liquidacionTotalIva5?: Big;
  /**
   * F - F037 | dLiqTotIVA10 | Liquidación total del IVA por redondeo a la tasa del 10% | Pagina 105
   *
   * Si no es proveido, es calculado internamente.
   *
   * Observaciones:
   *   Corresponde al cálculo del impuesto al IVA a la tasa del 10% sobre el valor del redondeo (Valor del redondeo/1,1), cuando la operación sea a la tasa del 10% (E734=10)
   *   No debe existir el campo si D013 ≠ 1 o D013≠5
   */
  liquidacionTotalIva10?: Big;
  /**
   * F - F026 | dIVAComi | Liquidación total del IVA de la comisión | Pagina 105
   *
   * Si no es proveido, es calculado internamente.
   * Observaciones: Se aplica la tasa del 10% para comisiones
   */
  liquidacionIvaComision?: Big;
  /**
   * F - F017 | dTotIVA | Liquidación total del IVA | Pagina 105
   *
   * Si no es proveido, es calculado internamente.
   *
   * Observaciones:
   *   Corresponde al cálculo aritmético F015 (Liquidación del IVA al 10%) + F016(Liquidación del IVA al 5 %) – F036 (redondeo al 5%) – F037 (redondeo al 10%) + F026 (Liquidación total del IVA de la comisión)
   *   No debe existir el campo si D013 ≠ 1 o D013≠5
   */
  liquidacionTotalIva?: Big;
  /**
   * F - F018 | dBaseGrav5 | Total base gravada al 5% | Pagina 105
   *
   * Si no es proveido, es calculado internamente.
   *
   * Observaciones:
   *   Suma de todas las ocurrencias de E735 (base gravada del IVA por ítem) cuando la operación sea a la tasa del 5% (E734=5).
   *   No debe existir el campo si D013 ≠ 1 o D013≠5
   */
  totalBaseGravada5?: Big;
  /**
   * F - F019 | dBaseGrav10 | Total base gravada al 10% | Pagina 106
   *
   * Si no es proveido, es calculado internamente.
   *
   * Observaciones:
   *   Suma de todas las ocurrencias de E735 (base gravada del IVA por ítem) cuando la operación sea a la tasa del 10% (E734=10).
   *   No debe existir el campo si D013 ≠ 1 o D013≠5
   */
  totalBaseGravada10?: Big;
  /**
   * F - F020 | dTBasGraIVA | Total de la base gravada de IVA | Pagina 106
   *
   * Si no es proveido, es calculado internamente.
   *
   * Observaciones:
   *   Corresponde al cálculo aritmético F018+F019
   *   No debe existir el campo si D013 ≠ 1 o D013≠5
   */
  totalBaseGravadaIva?: Big;
  /**
   * F - F023 | dTotalGs | Total general de la operación en Guaraníes | Pagina 106
   *
   * Si no es proveido, es calculado internamente.
   *
   * Observaciones:
   *   Si D015 ≠ PYG y D017 = 1, corresponde al cálculo aritmético: F014 * D018
   *   Si D015 ≠ PYG y D017 = 2, corresponde a la suma de todas las ocurrencias de EA009
   *   Este campo no debe existir si D015=PYG
   *   No informar si D015 = PYG
   */
  totalOperacionGs?: Big;
}
