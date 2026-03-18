// SIFEN F group - Totals (F001-F099)

/**
 * F - F001 | Campos de subtotales y totales | Pagina 89
 */
export interface gTotSub {
  /** F - F002 | Subtotal de la operación exenta | Pagina 102 */
  dSubExe?: number;
  /** F - F003 | Subtotal de la operación exonerada | Pagina 102 */
  dSubExo?: number;
  /** F - F004 | Subtotal de la operación con IVA incluido a la tasa 5% | Pagina 102 */
  dSub5?: number;
  /** F - F005 | Subtotal de la operación con IVA incluido a la tasa 10% | Pagina 102 */
  dSub10?: number;
  /** F - F008 | Total Bruto de la operación | Pagina 102 */
  dTotOpe: number;
  /** F - F009 | Total descuento particular por ítem | Pagina 102 */
  dTotDesc: number;
  /** F - F033 | Total descuento global por ítem | Pagina 102 */
  dTotDescGlotem: number;
  /** F - F034 | Total Anticipo por ítem | Pagina 103 */
  dTotAntItem: number;
  /** F - F035 | Total Anticipo global por ítem | Pagina 103 */
  dTotAnt: number;
  /** F - F010 | Porcentaje de descuento global sobre total de la operación | Pagina 103 */
  dPorcDescTotal: number;
  /** F - F011 | Total Descuentos de la operación | Pagina 103 */
  dDescTotal: number;
  /** F - F012 | Total Anticipos de la operación | Pagina 103 */
  dAnticipo: number;
  /** F - F013 | Redondeo de la operación | Pagina 103 */
  dRedon: number;
  /** F - F025 | Comisión de la operación | Pagina 103 */
  dComi?: number;
  /** F - F014 | Total Neto de la operación | Pagina 103 */
  dTotGralOpe: number;
  /** F - F015 | Liquidación del IVA a la tasa del 5% | Pagina 103 */
  dIVA5?: number;
  /** F - F016 | Liquidación del IVA a la tasa del 10% | Pagina 103 */
  dIVA10?: number;
  /** F - F036 | Liquidación total del IVA por redondeo a la tasa del 5% | Pagina 103 */
  dLiqTotIVA5?: number;
  /** F - F037 | Liquidación total del IVA por redondeo a la tasa del 10% | Pagina 103 */
  dLiqTotIVA10?: number;
  /** F - F026 | Liquidación total del IVA de la comisión | Pagina 103 */
  dIVAComi?: number;
  /** F - F017 | Liquidación total del IVA | Pagina 103 */
  dTotIVA?: number;
  /** F - F018 | Total base gravada al 5% | Pagina 104 */
  dBaseGrav5?: number;
  /** F - F019 | Total base gravada al 10% | Pagina 105 */
  dBaseGrav10?: number;
  /** F - F020 | Total de la base gravada de IVA | Pagina 105 */
  dTBasGraIVA?: number;
  /** F - F023 | Total general de la operación en Guaraníes | Pagina 105 */
  dTotalGs?: number;
  /** F - F024 | Total + comisión | Pagina 105 */
  dTotCom?: number;
}
