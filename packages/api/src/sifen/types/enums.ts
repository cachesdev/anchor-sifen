/**
 * Tipo de documento electrónico - C002 | Pagina 64
 */
export const tipoDocumentoElectronico = {
  FacturaElectronica: 1,
  FacturaElectronicaExportacion: 2,
  FacturaElectronicaImportacion: 3,
  AutofacturaElectronica: 4,
  NotaCreditoElectronica: 5,
  NotaDebitoElectronica: 6,
  NotaRemisionElectronica: 7,
  ComprobanteRetencionElectronico: 8
} as const;
export type TipoDocumentoElectronico =
  (typeof tipoDocumentoElectronico)[keyof typeof tipoDocumentoElectronico];

export const descripcionTipoDocumentoElectronico = {
  [tipoDocumentoElectronico.FacturaElectronica]: 'Factura electrónica',
  [tipoDocumentoElectronico.FacturaElectronicaExportacion]: 'Factura electrónica de exportación',
  [tipoDocumentoElectronico.FacturaElectronicaImportacion]: 'Factura electrónica de importación',
  [tipoDocumentoElectronico.AutofacturaElectronica]: 'Autofactura electrónica',
  [tipoDocumentoElectronico.NotaCreditoElectronica]: 'Nota de crédito electrónica',
  [tipoDocumentoElectronico.NotaDebitoElectronica]: 'Nota de débito electrónica',
  [tipoDocumentoElectronico.NotaRemisionElectronica]: 'Nota de remisión electrónica',
  [tipoDocumentoElectronico.ComprobanteRetencionElectronico]: 'Comprobante de retención electrónico'
} as const;
export type DescripcionTipoDocumentoElectronico =
  (typeof descripcionTipoDocumentoElectronico)[keyof typeof descripcionTipoDocumentoElectronico];

/**
 * D011 | iTipTra | Tipo de transacción | Pagina 66
 */
export const tipoTransaccion = {
  VentaMercaderia: 1,
  PrestacionServicios: 2,
  Mixto: 3,
  VentaActivoFijo: 4,
  VentaDivisas: 5,
  CompraDivisas: 6,
  PromocionEntregaMuestras: 7,
  Donacion: 8,
  Anticipo: 9,
  CompraProductos: 10,
  CompraServicios: 11,
  VentaCreditoFiscal: 12,
  MuestrasMedicas: 13
} as const;
export type TipoTransaccion = (typeof tipoTransaccion)[keyof typeof tipoTransaccion];

export const descripcionTipoTransaccion = {
  [tipoTransaccion.VentaMercaderia]: 'Venta de mercadería',
  [tipoTransaccion.PrestacionServicios]: 'Prestación de servicios',
  [tipoTransaccion.Mixto]: 'Mixto',
  [tipoTransaccion.VentaActivoFijo]: 'Venta de activo fijo',
  [tipoTransaccion.VentaDivisas]: 'Venta de divisas',
  [tipoTransaccion.CompraDivisas]: 'Compra de divisas',
  [tipoTransaccion.PromocionEntregaMuestras]: 'Promoción o entrega de muestras',
  [tipoTransaccion.Donacion]: 'Donación',
  [tipoTransaccion.Anticipo]: 'Anticipo',
  [tipoTransaccion.CompraProductos]: 'Compra de productos',
  [tipoTransaccion.CompraServicios]: 'Compra de servicios',
  [tipoTransaccion.VentaCreditoFiscal]: 'Venta de crédito fiscal',
  [tipoTransaccion.MuestrasMedicas]: 'Muestras médicas (Art. 3 RG 24/2014)'
} as const;
export type DescripcionTipoTransaccion =
  (typeof descripcionTipoTransaccion)[keyof typeof descripcionTipoTransaccion];

/**
 * Tipo de impuesto afectado - D013 | Pagina 66
 */
export const tipoImpuesto = {
  IVA: 1,
  ISC: 2,
  Renta: 3,
  Ninguno: 4,
  IVARenta: 5
} as const;
export type TipoImpuesto = (typeof tipoImpuesto)[keyof typeof tipoImpuesto];

export const descripcionTipoImpuesto = {
  [tipoImpuesto.IVA]: 'IVA',
  [tipoImpuesto.ISC]: 'ISC',
  [tipoImpuesto.Renta]: 'Renta',
  [tipoImpuesto.Ninguno]: 'Ninguno',
  [tipoImpuesto.IVARenta]: 'IVA - Renta'
} as const;
export type DescripcionTipoImpuesto =
  (typeof descripcionTipoImpuesto)[keyof typeof descripcionTipoImpuesto];

/**
 * Condición del tipo de cambio - D017 | Pagina 66
 */
export const condicionTipoCambio = {
  Global: 1,
  PorItem: 2
} as const;
export type CondicionTipoCambio = (typeof condicionTipoCambio)[keyof typeof condicionTipoCambio];

/**
 * Condición del Anticipo - D019 | Pagina 66
 */
export const condicionAnticipo = {
  Global: 1,
  PorItem: 2
} as const;
export type CondicionAnticipo = (typeof condicionAnticipo)[keyof typeof condicionAnticipo];

export const descripcionCondicionAnticipo = {
  [condicionAnticipo.Global]: 'Anticipo Global',
  [condicionAnticipo.PorItem]: 'Anticipo por Ítem'
} as const;
export type DescripcionCondicionAnticipo =
  (typeof condicionAnticipo)[keyof typeof condicionAnticipo];
