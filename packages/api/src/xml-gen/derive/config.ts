import type { TipoDocumentoElectronicoLabel } from '../../sifen/types/enums';

/**
 * Perfil de derivacion por tipo de DE.
 *
 * Cada entrada describe que formulas y grupos aplican para un C002 particular.
 * Los valores se basan en el MT v150 y las notas tecnicas aplicables.
 */
export interface DerivationConfig {
  /**
   * Formula para EA008 (valor total de la operacion por item):
   * - 'estandar': (E721 - EA002 - EA004 - EA006 - EA007) * E711
   *   Aplica para C002 = 1, 5, 6. MT v150, p. 89.
   * - 'autofactura': E721 * E711
   *   Aplica para C002 = 4. MT v150, p. 89.
   */
  readonly ea008Formula: 'estandar' | 'autofactura';

  /** Si E720 (gValorItem) aplica. Es false solo para NRE (C002=7). MT v150, p. 87. */
  readonly aplicaValorItem: boolean;

  /**
   * Si E730 (gCamIVA) aplica.
   * Es false para C002 = 3, 4, 7. MT v150, p. 89.
   */
  readonly aplicaIvaItem: boolean;

  /**
   * Si E600 (gCamCond / condicion de operacion) aplica.
   * Es true solo para C002 = 1, 4. MT v150, p. 80.
   */
  readonly aplicaCondicionOperacion: boolean;

  /**
   * Si E900 (gTransp / transporte) aplica.
   * True para C002 = 1 (opcional) y C002 = 7 (obligatorio).
   * False para C002 = 4, 5, 6. MT v150, p. 96.
   */
  readonly aplicaTransporte: boolean;

  /**
   * Si F001 (gTotSub / subtotales y totales) aplica.
   * False para C002 = 7. MT v150, p. 102.
   */
  readonly aplicaSubtotales: boolean;

  /**
   * Si los campos de IVA en subtotales (F002-F005, F015-F020) deben calcularse.
   * Tambien se condiciona por D013 en la derivacion. False para C002 = 4
   * (AFE). MT v150, p. 102; NT 013.
   */
  readonly subtotalesIncluyeIva: boolean;

  /**
   * Si F025 (dComi) aplica para el tipo de DE.
   * False para C002 = 4 (AFE). MT v150, p. 102.
   */
  readonly aplicaComisionOperacion: boolean;

  /**
   * Formula para F008 (Total Bruto de la operacion):
   * - 'sumaSubtotales': F002 + F003 + F004 + F005
   *   Aplica para C002 = 1, 5, 6. MT v150, p. 103.
   * - 'sumaItems': suma de todas las ocurrencias de EA008
   *   Aplica para C002 = 4. MT v150, p. 103.
   */
  readonly totalBrutoFormula: 'sumaSubtotales' | 'sumaItems';

  /**
   * Formula para F023 (Total general de la operacion en guaranies):
   * - 'tipoCambio': calculo basado en D018 o EA009 segun D017.
   *   Aplica cuando D015 != PYG. MT v150, p. 105; NT 008.
   * - 'igualF014': F023 = F014. Variante historica del MT v150 removida por
   *   NT 008 para AFE; no se usa en las configuraciones vigentes.
   */
  readonly totalGsFormula: 'tipoCambio' | 'igualF014';
}

/**
 * Tabla de configuraciones de derivacion por tipo de DE.
 *
 * Las claves son los labels de {@link TipoDocumentoElectronicoLabel}.
 * Los valores futuros (C002=2,3,8) son placeholders estimados y deben
 * ser revisados contra el MT al momento de implementar cada tipo.
 */
export const configPorTipoDE: Record<TipoDocumentoElectronicoLabel, DerivationConfig> = {
  // C002 = 1 | Factura Electronica
  FacturaElectronica: {
    ea008Formula: 'estandar',
    aplicaValorItem: true,
    aplicaIvaItem: true,
    aplicaCondicionOperacion: true,
    aplicaTransporte: true,
    aplicaSubtotales: true,
    subtotalesIncluyeIva: true,
    aplicaComisionOperacion: true,
    totalBrutoFormula: 'sumaSubtotales',
    totalGsFormula: 'tipoCambio'
  },

  // C002 = 2 | Factura Electronica de Exportacion (Futuro)
  FacturaElectronicaExportacion: {
    ea008Formula: 'estandar',
    aplicaValorItem: true,
    aplicaIvaItem: true,
    aplicaCondicionOperacion: true,
    aplicaTransporte: true,
    aplicaSubtotales: true,
    subtotalesIncluyeIva: true,
    aplicaComisionOperacion: true,
    totalBrutoFormula: 'sumaSubtotales',
    totalGsFormula: 'tipoCambio'
  },

  // C002 = 3 | Factura Electronica de Importacion (Futuro)
  FacturaElectronicaImportacion: {
    ea008Formula: 'estandar',
    aplicaValorItem: true,
    aplicaIvaItem: false,
    aplicaCondicionOperacion: true,
    aplicaTransporte: true,
    aplicaSubtotales: true,
    subtotalesIncluyeIva: false,
    aplicaComisionOperacion: true,
    totalBrutoFormula: 'sumaSubtotales',
    totalGsFormula: 'tipoCambio'
  },

  // C002 = 4 | Autofactura Electronica
  AutofacturaElectronica: {
    ea008Formula: 'autofactura',
    aplicaValorItem: true,
    aplicaIvaItem: false,
    aplicaCondicionOperacion: true,
    aplicaTransporte: false,
    aplicaSubtotales: true,
    subtotalesIncluyeIva: false,
    aplicaComisionOperacion: false,
    totalBrutoFormula: 'sumaItems',
    totalGsFormula: 'tipoCambio'
  },

  // C002 = 5 | Nota de Credito Electronica
  NotaCreditoElectronica: {
    ea008Formula: 'estandar',
    aplicaValorItem: true,
    aplicaIvaItem: true,
    aplicaCondicionOperacion: false,
    aplicaTransporte: false,
    aplicaSubtotales: true,
    subtotalesIncluyeIva: true,
    aplicaComisionOperacion: true,
    totalBrutoFormula: 'sumaSubtotales',
    totalGsFormula: 'tipoCambio'
  },

  // C002 = 6 | Nota de Debito Electronica
  NotaDebitoElectronica: {
    ea008Formula: 'estandar',
    aplicaValorItem: true,
    aplicaIvaItem: true,
    aplicaCondicionOperacion: false,
    aplicaTransporte: false,
    aplicaSubtotales: true,
    subtotalesIncluyeIva: true,
    aplicaComisionOperacion: true,
    totalBrutoFormula: 'sumaSubtotales',
    totalGsFormula: 'tipoCambio'
  },

  // C002 = 7 | Nota de Remision Electronica
  NotaRemisionElectronica: {
    ea008Formula: 'estandar',
    aplicaValorItem: false,
    aplicaIvaItem: false,
    aplicaCondicionOperacion: false,
    aplicaTransporte: true,
    aplicaSubtotales: false,
    subtotalesIncluyeIva: false,
    aplicaComisionOperacion: false,
    totalBrutoFormula: 'sumaSubtotales',
    totalGsFormula: 'tipoCambio'
  },

  // C002 = 8 | Comprobante de Retencion Electronico (Futuro)
  ComprobanteRetencionElectronico: {
    ea008Formula: 'estandar',
    aplicaValorItem: true,
    aplicaIvaItem: true,
    aplicaCondicionOperacion: false,
    aplicaTransporte: false,
    aplicaSubtotales: true,
    subtotalesIncluyeIva: true,
    aplicaComisionOperacion: true,
    totalBrutoFormula: 'sumaSubtotales',
    totalGsFormula: 'tipoCambio'
  }
} as const;

export function obtenerConfig(tipoDE: TipoDocumentoElectronicoLabel): DerivationConfig {
  return configPorTipoDE[tipoDE];
}
