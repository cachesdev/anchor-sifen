import type { ValueOf } from 'type-fest';

/**
 * A - A005 | Sistema de facturación | Pagina 61
 */
export const DSisFactValues = {
  SistemaContribuyente: 1,
  SIFENSolucionGratuita: 2
} as const;
export type DSisFact = ValueOf<typeof DSisFactValues>;

export const DDesSisFactValues = {
  [DSisFactValues.SistemaContribuyente]: 'Sistema de facturación del contribuyente',
  [DSisFactValues.SIFENSolucionGratuita]: 'SIFEN solución gratuita'
} as const satisfies Record<DSisFact, string>;
export type DDesSisFact = ValueOf<typeof DDesSisFactValues>;

/**
 * B - B002 | Tipo de emisión | Pagina 62
 */
export const ITipEmiValues = {
  Normal: 1,
  Contingencia: 2
} as const;
export type ITipEmi = ValueOf<typeof ITipEmiValues>;

export const DDesTipEmiValues = {
  [ITipEmiValues.Normal]: 'Normal',
  [ITipEmiValues.Contingencia]: 'Contingencia'
} as const satisfies Record<ITipEmi, string>;
export type DDesTipEmi = ValueOf<typeof DDesTipEmiValues>;

/**
 * C - C002 | Tipo de Documento Electrónico | Pagina 63
 */
export const ITiDEValues = {
  FacturaElectronica: 1,
  FacturaElectronicaExportacion: 2,
  FacturaElectronicaImportacion: 3,
  AutofacturaElectronica: 4,
  NotaCreditoElectronica: 5,
  NotaDebitoElectronica: 6,
  NotaRemisionElectronica: 7,
  ComprobanteRetencionElectronico: 8
} as const;
export type ITiDE = ValueOf<typeof ITiDEValues>;

export const DDesTiDEValues = {
  [ITiDEValues.FacturaElectronica]: 'Factura electrónica',
  [ITiDEValues.FacturaElectronicaExportacion]: 'Factura electrónica de exportación',
  [ITiDEValues.FacturaElectronicaImportacion]: 'Factura electrónica de importación',
  [ITiDEValues.AutofacturaElectronica]: 'Autofactura electrónica',
  [ITiDEValues.NotaCreditoElectronica]: 'Nota de crédito electrónica',
  [ITiDEValues.NotaDebitoElectronica]: 'Nota de débito electrónica',
  [ITiDEValues.NotaRemisionElectronica]: 'Nota de remisión electrónica',
  [ITiDEValues.ComprobanteRetencionElectronico]: 'Comprobante de retención electrónico'
} as const satisfies Record<ITiDE, string>;
export type DDesTiDE = ValueOf<typeof DDesTiDEValues>;

/**
 * D1 - D011 | Tipo de transacción | Pagina 66
 */
export const ITipTraValues = {
  VentaMercaderia: 1,
  PrestacionServicios: 2,
  Mixto: 3,
  VentaActivoFijo: 4,
  VentaDivisas: 5,
  CompraDivisas: 6,
  PromocionOMuestras: 7,
  Donacion: 8,
  Anticipo: 9,
  CompraProductos: 10,
  CompraServicios: 11,
  VentaCreditoFiscal: 12,
  MuestrasMedicas: 13
} as const;
export type ITipTra = ValueOf<typeof ITipTraValues>;

export const DDesTipTraValues = {
  [ITipTraValues.VentaMercaderia]: 'Venta de mercadería',
  [ITipTraValues.PrestacionServicios]: 'Prestación de servicios',
  [ITipTraValues.Mixto]: 'Mixto',
  [ITipTraValues.VentaActivoFijo]: 'Venta de activo fijo',
  [ITipTraValues.VentaDivisas]: 'Venta de divisas',
  [ITipTraValues.CompraDivisas]: 'Compra de divisas',
  [ITipTraValues.PromocionOMuestras]: 'Promoción o entrega de muestras',
  [ITipTraValues.Donacion]: 'Donación',
  [ITipTraValues.Anticipo]: 'Anticipo',
  [ITipTraValues.CompraProductos]: 'Compra de productos',
  [ITipTraValues.CompraServicios]: 'Compra de servicios',
  [ITipTraValues.VentaCreditoFiscal]: 'Venta de crédito fiscal',
  [ITipTraValues.MuestrasMedicas]: 'Muestras médicas (Art. 3 RG 24/2014)'
} as const satisfies Record<ITipTra, string>;
export type DDesTipTra = ValueOf<typeof DDesTipTraValues>;

/**
 * D1 - D013 | Tipo de impuesto afectado | Pagina 66
 */
export const ITImpValues = {
  IVA: 1,
  ISC: 2,
  Renta: 3,
  Ninguno: 4,
  IVA_Renta: 5
} as const;
export type ITImp = ValueOf<typeof ITImpValues>;

export const DDesTImpValues = {
  [ITImpValues.IVA]: 'IVA',
  [ITImpValues.ISC]: 'ISC',
  [ITImpValues.Renta]: 'Renta',
  [ITImpValues.Ninguno]: 'Ninguno',
  [ITImpValues.IVA_Renta]: 'IVA - Renta'
} as const satisfies Record<ITImp, string>;
export type DDesTImp = ValueOf<typeof DDesTImpValues>;

export const ICondTiCamValues = {
  Global: 1,
  PorItem: 2
} as const;
export type ICondTiCam = ValueOf<typeof ICondTiCamValues>;

export const DDesCondTiCamValues = {
  [ICondTiCamValues.Global]: 'Global (un solo tipo de cambio para todo el DE)',
  [ICondTiCamValues.PorItem]: 'Por ítem (tipo de cambio distinto por ítem)'
} as const satisfies Record<ICondTiCam, string>;
export type DDesCondTiCam = ValueOf<typeof DDesCondTiCamValues>;

/**
 * D1 - D019 | Condición del Anticipo | Pagina 66
 */
export const ICondAntValues = {
  AnticipoGlobal: 1,
  AnticipoPorItem: 2
} as const;
export type ICondAnt = ValueOf<typeof ICondAntValues>;

export const DDesCondAntValues = {
  [ICondAntValues.AnticipoGlobal]: 'Anticipo Global',
  [ICondAntValues.AnticipoPorItem]: 'Anticipo por Ítem'
} as const satisfies Record<ICondAnt, string>;
export type DDesCondAnt = ValueOf<typeof DDesCondAntValues>;

export const ITipContValues = {
  PersonaFisica: 1,
  PersonaJuridica: 2
} as const;
export type ITipCont = ValueOf<typeof ITipContValues>;

export const DDesTipContValues = {
  [ITipContValues.PersonaFisica]: 'Persona Física',
  [ITipContValues.PersonaJuridica]: 'Persona Jurídica'
} as const satisfies Record<ITipCont, string>;
export type DDesTipCont = ValueOf<typeof DDesTipContValues>;

export const INatRecValues = {
  Contribuyente: 1,
  NoContribuyente: 2
} as const;
export type INatRec = ValueOf<typeof INatRecValues>;

export const DDesNatRecValues = {
  [INatRecValues.Contribuyente]: 'contribuyente',
  [INatRecValues.NoContribuyente]: 'no contribuyente'
} as const satisfies Record<INatRec, string>;
export type DDesNatRec = ValueOf<typeof DDesNatRecValues>;

export const ITiOpeValues = {
  B2B: 1,
  B2C: 2,
  B2G: 3,
  B2F: 4
} as const;
export type ITiOpe = ValueOf<typeof ITiOpeValues>;

export const DDesTiOpeValues = {
  [ITiOpeValues.B2B]: 'B2B',
  [ITiOpeValues.B2C]: 'B2C',
  [ITiOpeValues.B2G]: 'B2G',
  [ITiOpeValues.B2F]: 'B2F'
} as const satisfies Record<ITiOpe, string>;
export type DDesTiOpe = ValueOf<typeof DDesTiOpeValues>;

export const ITiContRecValues = {
  PersonaFisica: 1,
  PersonaJuridica: 2
} as const;
export type ITiContRec = ValueOf<typeof ITiContRecValues>;

export const DDesTiContRecValues = {
  [ITiContRecValues.PersonaFisica]: 'Persona Física',
  [ITiContRecValues.PersonaJuridica]: 'Persona Jurídica'
} as const satisfies Record<ITiContRec, string>;
export type DDesTiContRec = ValueOf<typeof DDesTiContRecValues>;

export const ITipIDRespDEValues = {
  CedulaParaguaya: 1,
  Pasaporte: 2,
  CedulaExtranjera: 3,
  CarnetResidencia: 4,
  Otro: 9
} as const;
export type ITipIDRespDE = ValueOf<typeof ITipIDRespDEValues>;

export const DDTipIDRespDEValues = {
  [ITipIDRespDEValues.CedulaParaguaya]: 'Cédula paraguaya',
  [ITipIDRespDEValues.Pasaporte]: 'Pasaporte',
  [ITipIDRespDEValues.CedulaExtranjera]: 'Cédula extranjera',
  [ITipIDRespDEValues.CarnetResidencia]: 'Carnet de residencia',
  [ITipIDRespDEValues.Otro]: 'Otro'
} as const satisfies Record<ITipIDRespDE, string>;
export type DDTipIDRespDE = ValueOf<typeof DDTipIDRespDEValues>;

export const ITipIDRecValues = {
  CedulaParaguaya: 1,
  Pasaporte: 2,
  CedulaExtranjera: 3,
  CarnetResidencia: 4,
  Innominado: 5,
  TarjetaDiplomatica: 6,
  Otro: 9
} as const;
export type ITipIDRec = ValueOf<typeof ITipIDRecValues>;

export const DDTipIDRecValues = {
  [ITipIDRecValues.CedulaParaguaya]: 'Cédula paraguaya',
  [ITipIDRecValues.Pasaporte]: 'Pasaporte',
  [ITipIDRecValues.CedulaExtranjera]: 'Cédula extranjera',
  [ITipIDRecValues.CarnetResidencia]: 'Carnet de residencia',
  [ITipIDRecValues.Innominado]: 'Innominado',
  [ITipIDRecValues.TarjetaDiplomatica]: 'Tarjeta Diplomática de exoneración fiscal',
  [ITipIDRecValues.Otro]: 'Otro'
} as const satisfies Record<ITipIDRec, string>;
export type DDTipIDRec = ValueOf<typeof DDTipIDRecValues>;
