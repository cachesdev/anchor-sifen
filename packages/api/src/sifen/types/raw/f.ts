/**
 * F - F001 | Campos de subtotales y totales | Pagina 102
 */
export interface GTotSub {
  /**
   * F - F002 | Subtotal de la operación exenta | Pagina 103
   */
  dSubExe?: string;
  /**
   * F - F003 | Subtotal de la operación exonerada | Pagina 103
   */
  dSubExo?: string;
  /**
   * F - F005 | Subtotal de la operación con IVA incluido a la tasa 5% | Pagina 103
   */
  dSub5?: string;
  /**
   * F - F005 | Subtotal de la operación con IVA incluido a la tasa 10% | Pagina 103
   */
  dSub10?: string;
  /**
   * F - F008 | Total Bruto de la operación | Pagina 103
   */
  dTotOpe: string;
  /**
   * F - F009 | Total descuento particular por ítem | Pagina 103
   */
  dTotDesc: string;
  /**
   * F - F033 | Total descuento global por ítem | Pagina 103
   */
  dTotDescGlotem: string;
  /**
   * F - F034 | Total Anticipo por ítem | Pagina 104
   */
  dTotAntItem: string;
  /**
   * F - F035 | Total Anticipo global por ítem | Pagina 104
   */
  dTotAnt: string;
  /**
   * F - F010 | Porcentaje de descuento global sobre total de la operación | Pagina 104
   */
  dPorcDescTotal: string;
  /**
   * F - F011 | Total Descuentos de la operación | Pagina 104
   */
  dDescTotal: string;
  /**
   * F - F012 | Total Anticipos de la operación | Pagina 104
   */
  dAnticipo: string;
  /**
   * F - F013 | Redondeo de la operación | Pagina 104
   */
  dRedon: string;
  /**
   * F - F026 | Comisión de la operación | Pagina 104
   */
  dComi?: string;
  /**
   * F - F014 | Total Neto de la operación | Pagina 104
   */
  dTotGralOpe: string;
  /**
   * F - F015 | Liquidación del IVA a la tasa del 5% | Pagina 104
   */
  dIVA5?: string;
  /**
   * F - F016 | Liquidación del IVA a la tasa del 10% | Pagina 104
   */
  dIVA10?: string;
  /**
   * F - F036 | Liquidación total del IVA por redondeo a la tasa del 5% | Pagina 105
   */
  dLiqTotIVA5?: string;
  /**
   * F - F037 | Liquidación total del IVA por redondeo a la tasa del 10% | Pagina 105
   */
  dLiqTotIVA10?: string;
  /**
   * F - F026 | Liquidación total del IVA de la comisión | Pagina 105
   */
  dIVAComi?: string;
  /**
   * F - F017 | Liquidación total del IVA | Pagina 105
   */
  dTotIVA?: string;
  /**
   * F - F018 | Total base gravada al 5% | Pagina 105
   */
  dBaseGrav5?: string;
  /**
   * F - F019 | Total base gravada al 10% | Pagina 106
   */
  dBaseGrav10?: string;
  /**
   * F - F020 | Total de la base gravada de IVA | Pagina 106
   */
  dTBasGraIVA?: string;
  /**
   * F - F023 | Total general de la operación en Guaraníes | Pagina 106
   */
  dTotalGs?: string;
}
