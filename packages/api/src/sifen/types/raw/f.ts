/**
 * F - F001 | Campos de subtotales y totales | Pagina 102
    *
    * Observaciones:
    *   Obligatorio si C002 ≠ 7
    *   No informar si C002 = 7
    *   Cuando C002= 4, no informar F002, F003, F004, F005, F015, F016, F017, F018, F019, F020, F023, F025 y F026
 */
export interface GTotSub {
  /**
   * F - F002 | Subtotal de la operación exenta | Pagina 103
    * Observaciones: Si E731 = 3: Suma de todas las ocurrencias de EA008 (Valor total de la operación por ítem) cuando la operación sea exenta
   */
  dSubExe?: string;
  /**
   * F - F003 | Subtotal de la operación exonerada | Pagina 103
    * Observaciones: Si E731 = 2: Suma de todas las ocurrencias de EA008 (Valor total de la operación por ítem) cuando la operación sea exonerada
   */
  dSubExo?: string;
  /**
   * F - F005 | Subtotal de la operación con IVA incluido a la tasa 5% | Pagina 103
    *
    * Observaciones:
    *   Si E731 = 1 o 4: Suma de todas las ocurrencias de EA008 (Valor total de la operación por ítem) cuando la operación sea a la tasa del 10% (E734=10)
    *   No debe existir el campo si D013 ≠ 1
   */
  dSub5?: string;
  /**
   * F - F005 | Subtotal de la operación con IVA incluido a la tasa 10% | Pagina 103
    *
    * Observaciones:
    *   Si E731 = 1 o 4: Suma de todas las ocurrencias de EA008 (Valor total de la operación por ítem) cuando la operación sea a la tasa del 10% (E734=10)
    *   No debe existir el campo si D013 ≠ 1
   */
  dSub10?: string;
  /**
   * F - F008 | Total Bruto de la operación | Pagina 103
    *
    * Observaciones:
    *   Cuando D013 = 1, 3, 4 o 5 corresponde a la suma de los subtotales de la operación (F002, F003, F004 y F005)
    *   Cuando D013 = 2 corresponde a F006
    *   Cuando C002=4 corresponde a la suma de todas las ocurrencias de EA008 (Valor total de la operación por ítem)
   */
  dTotOpe: string;
  /**
   * F - F009 | Total descuento particular por ítem | Pagina 103
    * Observaciones: Suma de todos los descuentos particulares por ítem (EA002)
   */
  dTotDesc: string;
  /**
   * F - F033 | Total descuento global por ítem | Pagina 103
    * Observaciones: Sumatoria de todas las ocurrencias de descuentos globales por ítem (EA004)
   */
  dTotDescGlotem: string;
  /**
   * F - F034 | Total Anticipo por ítem | Pagina 104
    * Observaciones: Sumatoria de todas las ocurrencias de anticipos por ítem (EA006)
   */
  dTotAntItem: string;
  /**
   * F - F035 | Total Anticipo global por ítem | Pagina 104
    * Observaciones: Sumatoria de todas las ocurrencias de anticipos global por ítem (EA007)
   */
  dTotAnt: string;
  /**
   * F - F010 | Porcentaje de descuento global sobre total de la operación | Pagina 104
    * Observaciones: Informativo, si no existe %, completar con cero
   */
  dPorcDescTotal: string;
  /**
   * F - F011 | Total Descuentos de la operación | Pagina 104
    * Observaciones: Sumatoria de todos los descuentos (Global por Ítem y particular por ítem) de cada ítem
   */
  dDescTotal: string;
  /**
   * F - F012 | Total Anticipos de la operación | Pagina 104
    * Observaciones: Sumatoria de todos los Anticipos (Global por Ítem y particular por ítem)
   */
  dAnticipo: string;
  /**
   * F - F013 | Redondeo de la operación | Pagina 104
    *
    * Observaciones:
    *   Se realiza sobre el campo F008 y conforme a la explicación inicial en el grupo F
    *   Si no cuenta con redondeo completar con cero
   */
  dRedon: string;
  /**
   * F - F026 | Comisión de la operación | Pagina 104
    * Observaciones: Se aplica la tasa del 10% para comisiones
   */
  dComi?: string;
  /**
   * F - F014 | Total Neto de la operación | Pagina 104
    *
    * Observaciones:
    *   Corresponde al cálculo aritmético
    *   F008 - F013 + F025
   */
  dTotGralOpe: string;
  /**
   * F - F015 | Liquidación del IVA a la tasa del 5% | Pagina 104
    *
    * Observaciones:
    *   Suma de todas las ocurrencias de E736 (Liquidación del IVA por ítem) cuando la operación sea a la tasa del 5% (E734=5)
    *   No debe existir el campo si D013 ≠ 1 o D013≠5
   */
  dIVA5?: string;
  /**
   * F - F016 | Liquidación del IVA a la tasa del 10% | Pagina 104
    *
    * Observaciones:
    *   Suma de todas las ocurrencias de E736 (Liquidación del IVA por ítem) cuando la operación sea a la tasa del 10% (E734=10)
    *   No debe existir el campo si D013 ≠ 1 o D013≠5
   */
  dIVA10?: string;
  /**
   * F - F036 | Liquidación total del IVA por redondeo a la tasa del 5% | Pagina 105
    *
    * Observaciones:
    *   Corresponde al cálculo del impuesto al IVA a la tasa del 5% sobre el valor del redondeo (Valor del redondeo/1,05), cuando la operación sea a la tasa del 5% (E734=5)
    *   No debe existir el campo si D013 ≠ 1 o D013≠5
   */
  dLiqTotIVA5?: string;
  /**
   * F - F037 | Liquidación total del IVA por redondeo a la tasa del 10% | Pagina 105
    *
    * Observaciones:
    *   Corresponde al cálculo del impuesto al IVA a la tasa del 10% sobre el valor del redondeo (Valor del redondeo/1,1), cuando la operación sea a la tasa del 10% (E734=10)
    *   No debe existir el campo si D013 ≠ 1 o D013≠5
   */
  dLiqTotIVA10?: string;
  /**
   * F - F026 | Liquidación total del IVA de la comisión | Pagina 105
    * Observaciones: Se aplica la tasa del 10% para comisiones
   */
  dIVAComi?: string;
  /**
   * F - F017 | Liquidación total del IVA | Pagina 105
    *
    * Observaciones:
    *   Corresponde al cálculo aritmético F015 (Liquidación del IVA al 10%) + F016(Liquidación del IVA al 5 %) – F036 (redondeo al 5%) – F037 (redondeo al 10%) + F026 (Liquidación total del IVA de la comisión)
    *   No debe existir el campo si D013 ≠ 1 o D013≠5
   */
  dTotIVA?: string;
  /**
   * F - F018 | Total base gravada al 5% | Pagina 105
    *
    * Observaciones:
    *   Suma de todas las ocurrencias de E735 (base gravada del IVA por ítem) cuando la operación sea a la tasa del 5% (E734=5).
    *   No debe existir el campo si D013 ≠ 1 o D013≠5
   */
  dBaseGrav5?: string;
  /**
   * F - F019 | Total base gravada al 10% | Pagina 106
    *
    * Observaciones:
    *   Suma de todas las ocurrencias de E735 (base gravada del IVA por ítem) cuando la operación sea a la tasa del 10% (E734=10).
    *   No debe existir el campo si D013 ≠ 1 o D013≠5
   */
  dBaseGrav10?: string;
  /**
   * F - F020 | Total de la base gravada de IVA | Pagina 106
    *
    * Observaciones:
    *   Corresponde al cálculo aritmético F018+F019
    *   No debe existir el campo si D013 ≠ 1 o D013≠5
   */
  dTBasGraIVA?: string;
  /**
   * F - F023 | Total general de la operación en Guaraníes | Pagina 106
    *
    * Observaciones:
    *   Si D015 ≠ PYG y D017 = 1, corresponde al cálculo aritmético: F014 * D018
    *   Si D015 ≠ PYG y D017 = 2, corresponde a la suma de todas las ocurrencias de EA009
    *   Este campo no debe existir si D015=PYG
    *   No informar si D015 = PYG
    *   Cuando C002=4 corresponde a F014
   */
  dTotalGs?: string;
}
