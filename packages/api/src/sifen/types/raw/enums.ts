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

/**
 * D2 - D103 | Tipo de contribuyente | Pagina 68
 */
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

/**
 * D3 - D201 | Naturaleza del receptor | Pagina 71
 */
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

/**
 * D3 - D202 | Tipo de operación | Pagina 71
 */
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

/**
 * D3 - D205 | Tipo de contribuyente receptor | Pagina 71
 */
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

/**
 * D2.2 - D141 | Tipo de documento de identidad del responsable de la generación del DE | Pagina 70
 */
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

/**
 * D3 - D208 | Tipo de documento de identidad del receptor | Pagina 71
 */
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

/**
 * E1 - E011 | Indicador de presencia | Pagina 74
 */
export const IIndPresValues = {
  OperacionPresencial: 1,
  OperacionElectronica: 2,
  OperacionTelemarketing: 3,
  VentaDomicilio: 4,
  OperacionBancaria: 5,
  OperacionCiclica: 6,
  Otro: 9
} as const;
export type IIndPres = ValueOf<typeof IIndPresValues>;
export const DDesIndPresValues = {
  [IIndPresValues.OperacionPresencial]: 'Operación presencial',
  [IIndPresValues.OperacionElectronica]: 'Operación electrónica',
  [IIndPresValues.OperacionTelemarketing]: 'Operación telemarketing',
  [IIndPresValues.VentaDomicilio]: 'Venta a domicilio',
  [IIndPresValues.OperacionBancaria]: 'Operación bancaria',
  [IIndPresValues.OperacionCiclica]: 'Operación cíclica',
  [IIndPresValues.Otro]: 'Otro'
} as const satisfies Record<IIndPres, string>;
export type DDesIndPres = ValueOf<typeof DDesIndPresValues>;

/**
 * E7 - E601 | Condición de la operación | Pagina 80
 */
export const ICondOpeValues = {
  Contado: 1,
  Credito: 2
} as const;
export type ICondOpe = ValueOf<typeof ICondOpeValues>;
export const DDCondOpeValues = {
  [ICondOpeValues.Contado]: 'Contado',
  [ICondOpeValues.Credito]: 'Crédito'
} as const satisfies Record<ICondOpe, string>;
export type DDCondOpe = ValueOf<typeof DDCondOpeValues>;

/**
 * E7.1 - E606 | Tipo de pago | Pagina 81
 */
export const ITiPagoValues = {
  Efectivo: 1,
  Cheque: 2,
  TarjetaCredito: 3,
  TarjetaDebito: 4,
  Transferencia: 5,
  Giro: 6,
  BilleteraElectronica: 7,
  TarjetaEmpresarial: 8,
  Vale: 9,
  Retencion: 10,
  PagoAnticipo: 11,
  ValorFiscal: 12,
  ValorComercial: 13,
  Compensacion: 14,
  Permuta: 15,
  PagoBancario: 16,
  PagoMovil: 17,
  Donacion: 18,
  Promocion: 19,
  ConsumoInterno: 20,
  PagoElectronico: 21,
  Otro: 99
} as const;
export type ITiPago = ValueOf<typeof ITiPagoValues>;
export const DDesTiPagValues = {
  [ITiPagoValues.Efectivo]: 'Efectivo',
  [ITiPagoValues.Cheque]: 'Cheque',
  [ITiPagoValues.TarjetaCredito]: 'Tarjeta de crédito',
  [ITiPagoValues.TarjetaDebito]: 'Tarjeta de débito',
  [ITiPagoValues.Transferencia]: 'Transferencia',
  [ITiPagoValues.Giro]: 'Giro',
  [ITiPagoValues.BilleteraElectronica]: 'Billetera electrónica',
  [ITiPagoValues.TarjetaEmpresarial]: 'Tarjeta empresarial',
  [ITiPagoValues.Vale]: 'Vale',
  [ITiPagoValues.Retencion]: 'Retención',
  [ITiPagoValues.PagoAnticipo]: 'Pago por anticipo',
  [ITiPagoValues.ValorFiscal]: 'Valor fiscal',
  [ITiPagoValues.ValorComercial]: 'Valor comercial',
  [ITiPagoValues.Compensacion]: 'Compensación',
  [ITiPagoValues.Permuta]: 'Permuta',
  [ITiPagoValues.PagoBancario]: 'Pago bancario',
  [ITiPagoValues.PagoMovil]: 'Pago móvil',
  [ITiPagoValues.Donacion]: 'Donación',
  [ITiPagoValues.Promocion]: 'Promoción',
  [ITiPagoValues.ConsumoInterno]: 'Consumo interno',
  [ITiPagoValues.PagoElectronico]: 'Pago electrónico',
  [ITiPagoValues.Otro]: 'Otro'
} as const satisfies Record<ITiPago, string>;
export type DDesTiPag = ValueOf<typeof DDesTiPagValues>;

/**
 * E7.1.1 - E621 | Denominación de la tarjeta | Pagina 83
 */
export const IDenTarjValues = {
  Visa: 1,
  Mastercard: 2,
  AmericanExpress: 3,
  Maestro: 4,
  Panal: 5,
  Cabal: 6,
  Otro: 99
} as const;
export type IDenTarj = ValueOf<typeof IDenTarjValues>;
export const DDesDenTarjValues = {
  [IDenTarjValues.Visa]: 'Visa',
  [IDenTarjValues.Mastercard]: 'Mastercard',
  [IDenTarjValues.AmericanExpress]: 'American Express',
  [IDenTarjValues.Maestro]: 'Maestro',
  [IDenTarjValues.Panal]: 'Panal',
  [IDenTarjValues.Cabal]: 'Cabal',
  [IDenTarjValues.Otro]: 'Otro'
} as const satisfies Record<IDenTarj, string>;
export type DDesDenTarj = ValueOf<typeof DDesDenTarjValues>;

/**
 * E7.1.1 - E626 | Forma de procesamiento de pago | Pagina 83
 */
export const IForProPaValues = {
  POS: 1,
  PagoElectronico: 2,
  Otro: 9
} as const;
export type IForProPa = ValueOf<typeof IForProPaValues>;

/**
 * E7.2 - E641 | Condición de la operación a crédito | Pagina 84
 */
export const ICondCredValues = {
  Plazo: 1,
  Cuota: 2
} as const;
export type ICondCred = ValueOf<typeof ICondCredValues>;
export const DDCondCredValues = {
  [ICondCredValues.Plazo]: 'Plazo',
  [ICondCredValues.Cuota]: 'Cuota'
} as const satisfies Record<ICondCred, string>;
export type DDCondCred = ValueOf<typeof DDCondCredValues>;

/**
 * E5 - E401 | Motivo de emisión | Pagina 77
 */
export const iMotEmiValues = {
  DevolucionAjustePrecios: 1,
  Devolucion: 2,
  Descuento: 3,
  Bonificacion: 4,
  CreditoIncobrable: 5,
  RecuperoCosto: 6,
  RecuperoGasto: 7,
  AjustePrecio: 8
} as const;
export type IMotEmi = ValueOf<typeof iMotEmiValues>;
export const dDesMotEmiValues = {
  [iMotEmiValues.DevolucionAjustePrecios]: 'Devolución y Ajuste de precios',
  [iMotEmiValues.Devolucion]: 'Devolución',
  [iMotEmiValues.Descuento]: 'Descuento',
  [iMotEmiValues.Bonificacion]: 'Bonificación',
  [iMotEmiValues.CreditoIncobrable]: 'Crédito incobrable',
  [iMotEmiValues.RecuperoCosto]: 'Recupero de costo',
  [iMotEmiValues.RecuperoGasto]: 'Recupero de gasto',
  [iMotEmiValues.AjustePrecio]: 'Ajuste de precio'
} as const satisfies Record<IMotEmi, string>;
export type DDesMotEmi = ValueOf<typeof dDesMotEmiValues>;

/**
 * E8 - E715 | Código de datos de relevancia de las mercaderías | Pagina 86
 */
export const CRelMercValues = {
  ToleranciaQuiebra: 1,
  ToleranciaMerma: 2
} as const;
export type CRelMerc = ValueOf<typeof CRelMercValues>;
export const DDesRelMercValues = {
  [CRelMercValues.ToleranciaQuiebra]: 'Tolerancia de quiebra',
  [CRelMercValues.ToleranciaMerma]: 'Tolerancia de merma'
} as const satisfies Record<CRelMerc, string>;
export type DDesRelMerc = ValueOf<typeof DDesRelMercValues>;

/**
 * E8.2 - E731 | Forma de afectación tributaria del IVA | Pagina 89
 */
export const IAfecIVAValues = {
  Gravado: 1,
  Exonerado: 2,
  Exento: 3,
  GravadoParcial: 4
} as const;
export type IAfecIVA = ValueOf<typeof IAfecIVAValues>;
export const DDesAfecIVAValues = {
  [IAfecIVAValues.Gravado]: 'Gravado IVA',
  [IAfecIVAValues.Exonerado]: 'Exonerado (Art. 83- Ley 125/91)',
  [IAfecIVAValues.Exento]: 'Exento',
  [IAfecIVAValues.GravadoParcial]: 'Gravado parcial (Grav-Exento)'
} as const satisfies Record<IAfecIVA, string>;
export type DDesAfecIVA = ValueOf<typeof DDesAfecIVAValues>;

/**
 * E4 - E301 | Naturaleza del vendedor | Pagina 75
 */
export const INatVenValues = {
  NoContribuyente: 1,
  Extranjero: 2
} as const;
export type INatVen = ValueOf<typeof INatVenValues>;
export const DDesNatVenValues = {
  [INatVenValues.NoContribuyente]: 'No contribuyente',
  [INatVenValues.Extranjero]: 'Extranjero'
} as const satisfies Record<INatVen, string>;
export type DDesNatVen = ValueOf<typeof DDesNatVenValues>;

/**
 * E4 - E304 | Tipo de documento de identidad del vendedor | Pagina 75
 */
export const ITipIDVenValues = {
  CedulaParaguaya: 1,
  Pasaporte: 2,
  CedulaExtranjera: 3,
  CarnetResidencia: 4
} as const;
export type ITipIDVen = ValueOf<typeof ITipIDVenValues>;
export const DDTipIDVenValues = {
  [ITipIDVenValues.CedulaParaguaya]: 'Cédula paraguaya',
  [ITipIDVenValues.Pasaporte]: 'Pasaporte',
  [ITipIDVenValues.CedulaExtranjera]: 'Cédula extranjera',
  [ITipIDVenValues.CarnetResidencia]: 'Carnet de residencia'
} as const;
export type DDTipIDVen = ValueOf<typeof DDTipIDVenValues>;

/**
 * E6 - E501 | Motivo de emisión | Pagina 79
 */
export const IMotEmiNRValues = {
  TrasladoVenta: 1,
  TrasladoConsignacion: 2,
  Exportacion: 3,
  TrasladoCompra: 4,
  Importacion: 5,
  TrasladoDevolucion: 6,
  TrasladoEntreLocales: 7,
  TrasladoTransformacion: 8,
  TrasladoReparacion: 9,
  TrasladoEmisorMovil: 10,
  ExhibicionDemostracion: 11,
  ParticipacionFerias: 12,
  TrasladoEncomienda: 13,
  Decomiso: 14,
  Otro: 99
} as const;
export type IMotEmiNR = ValueOf<typeof IMotEmiNRValues>;
export const DDesMotEmiNRValues = {
  [IMotEmiNRValues.TrasladoVenta]: 'Traslado por ventas',
  [IMotEmiNRValues.TrasladoConsignacion]: 'Traslado por consignación',
  [IMotEmiNRValues.Exportacion]: 'Exportación',
  [IMotEmiNRValues.TrasladoCompra]: 'Traslado por compra',
  [IMotEmiNRValues.Importacion]: 'Importación',
  [IMotEmiNRValues.TrasladoDevolucion]: 'Traslado por devolución',
  [IMotEmiNRValues.TrasladoEntreLocales]: 'Traslado entre locales de la empresa',
  [IMotEmiNRValues.TrasladoTransformacion]: 'Traslado de bienes por transformación',
  [IMotEmiNRValues.TrasladoReparacion]: 'Traslado de bienes por reparación',
  [IMotEmiNRValues.TrasladoEmisorMovil]: 'Traslado por emisor móvil',
  [IMotEmiNRValues.ExhibicionDemostracion]: 'Exhibición o Demostración',
  [IMotEmiNRValues.ParticipacionFerias]: 'Participación en ferias',
  [IMotEmiNRValues.TrasladoEncomienda]: 'Traslado de encomienda',
  [IMotEmiNRValues.Decomiso]: 'Decomiso',
  [IMotEmiNRValues.Otro]: 'Otro'
} as const satisfies Record<IMotEmiNR, string>;
export type DDesMotEmiNR = ValueOf<typeof DDesMotEmiNRValues>;

/**
 * E6 - E503 | Responsable de la emisión de la Nota Remisión Electrónica | Pagina 79
 */
export const IRespEmiNRValues = {
  EmisorFactura: 1,
  PoseedorFacturaBienes: 2,
  EmpresaTransportista: 3,
  DespachanteAduanas: 4,
  AgenteTransporteIntermediario: 5
} as const;
export type IRespEmiNR = ValueOf<typeof IRespEmiNRValues>;
export const DDesRespEmiNRValues = {
  [IRespEmiNRValues.EmisorFactura]: 'Emisor de la factura',
  [IRespEmiNRValues.PoseedorFacturaBienes]: 'Poseedor de la factura y bienes',
  [IRespEmiNRValues.EmpresaTransportista]: 'Empresa transportista',
  [IRespEmiNRValues.DespachanteAduanas]: 'Despachante de Aduanas',
  [IRespEmiNRValues.AgenteTransporteIntermediario]: 'Agente de transporte o intermediario'
} as const satisfies Record<IRespEmiNR, string>;
export type DDesRespEmiNR = ValueOf<typeof DDesRespEmiNRValues>;

/**
 * E10 - E901 | Tipo de transporte | Pagina 96
 */
export const ITipTransValues = {
  Propio: 1,
  Tercero: 2
} as const;
export type ITipTrans = ValueOf<typeof ITipTransValues>;
export const DDesTipTransValues = {
  [ITipTransValues.Propio]: 'Propio',
  [ITipTransValues.Tercero]: 'Tercero'
} as const satisfies Record<ITipTrans, string>;
export type DDesTipTrans = ValueOf<typeof DDesTipTransValues>;

/**
 * E10 - E903 | Modalidad del transporte | Pagina 96
 */
export const IModTransValues = {
  Terrestre: 1,
  Fluvial: 2,
  Aereo: 3,
  Multimodal: 4
} as const;
export type IModTrans = ValueOf<typeof IModTransValues>;
export const DDesModTransValues = {
  [IModTransValues.Terrestre]: 'Terrestre',
  [IModTransValues.Fluvial]: 'Fluvial',
  [IModTransValues.Aereo]: 'Aéreo',
  [IModTransValues.Multimodal]: 'Multimodal'
} as const satisfies Record<IModTrans, string>;
export type DDesModTrans = ValueOf<typeof DDesModTransValues>;

/**
 * E10 - E905 | Responsable del costo del flete | Pagina 96
 */
export const IRespFleteValues = {
  EmisorFactura: 1,
  ReceptorFactura: 2,
  Tercero: 3,
  AgenteIntermediario: 4,
  TransportePropio: 5
} as const;
export type IRespFlete = ValueOf<typeof IRespFleteValues>;

/**
 * E8.5 - E771 | Tipo de operación de venta de vehículos | Pagina 91
 */
export const iTipOpVNValues = {
  Representante: 1,
  ConsumidorFinal: 2,
  Gobierno: 3,
  FlotaVehiculos: 4
} as const;
export type ITipOpVN = ValueOf<typeof iTipOpVNValues>;
export const dDesTipOpVNValues = {
  [iTipOpVNValues.Representante]: 'Venta a representante',
  [iTipOpVNValues.ConsumidorFinal]: 'Venta al consumidor final',
  [iTipOpVNValues.Gobierno]: 'Venta a gobierno',
  [iTipOpVNValues.FlotaVehiculos]: 'Venta a flota de vehículos'
} as const satisfies Record<ITipOpVN, string>;
export type DDesTipOpVN = ValueOf<typeof dDesTipOpVNValues>;

/**
 * E8.5 - E779 | Tipo de combustible | Pagina
 */
export const iTipComValues = {
  Gasolina: 1,
  Diesel: 2,
  Etanol: 3,
  GNV: 4,
  Flex: 5,
  Otro: 9
} as const;
export type ITipCom = ValueOf<typeof iTipComValues>;
export const dDesTipComValues = {
  [iTipComValues.Gasolina]: 'Gasolina',
  [iTipComValues.Diesel]: 'Diésel',
  [iTipComValues.Etanol]: 'Etanol',
  [iTipComValues.GNV]: 'GNV',
  [iTipComValues.Flex]: 'Flex',
  [iTipComValues.Otro]: 'Otro'
} as const satisfies Record<ITipCom, string>;
export type DDesTipCom = ValueOf<typeof dDesTipComValues>;

/**
 * E10 - E906 | Condición de la negociación | Pagina 96
 */
export const cCondNegValues = {
  CFR: 'CFR',
  CIF: 'CIF',
  CIP: 'CIP',
  CPT: 'CPT',
  DAP: 'DAP',
  DAT: 'DAT',
  DDP: 'DDP',
  EXW: 'EXW',
  FAS: 'FAS',
  FCA: 'FCA',
  FOB: 'FOB'
} as const;
export type CCondNeg = ValueOf<typeof cCondNegValues>;

/**
 * E10.3 - E967 | Tipo de Identificación del vehículo | Pagina 100
 */
export const DTipIdenVehValues = {
  NumeroIdentificacion: 1,
  NumeroMatricula: 2
} as const;
export type DTipIdenVeh = ValueOf<typeof DTipIdenVehValues>;

/**
 * E10.4 - E981 | Naturaleza del transportista | Pagina 100
 */
export const INatTransValues = {
  Contribuyente: 1,
  NoContribuyente: 2
} as const;
export type INatTrans = ValueOf<typeof INatTransValues>;

/**
 * E10.4 - E985 | Tipo de documento de identidad del transportista | Pagina 101
 */
export const iTipIDTransValues = {
  CedulaParaguaya: 1,
  Pasaporte: 2,
  CedulaExtranjera: 3,
  CarnetResidencia: 4
} as const;
export type ITipIDTrans = ValueOf<typeof iTipIDTransValues>;
export const dDTipIDTransValues = {
  [iTipIDTransValues.CedulaParaguaya]: 'Cédula paraguaya',
  [iTipIDTransValues.Pasaporte]: 'Pasaporte',
  [iTipIDTransValues.CedulaExtranjera]: 'Cédula extranjera',
  [iTipIDTransValues.CarnetResidencia]: 'Carnet de residencia'
} as const satisfies Record<ITipIDTrans, string>;
export type DDTipIDTrans = ValueOf<typeof dDTipIDTransValues>;

/**
 * G1 - G057 | Características de la Carga | Pagina 108
 */
export const iCarCargaValues = {
  MercaderiasCadenaFrio: 1,
  CargaPeligrosa: 2,
  Otro: 3
} as const;
export type ICarCarga = ValueOf<typeof iCarCargaValues>;
export const dDesCarCargaValues = {
  [iCarCargaValues.MercaderiasCadenaFrio]: 'Mercaderías con cadena de frío',
  [iCarCargaValues.CargaPeligrosa]: 'Carga peligrosa',
  [iCarCargaValues.Otro]: 'Otro'
} as const satisfies Record<ICarCarga, string>;
export type DDesCarCarga = ValueOf<typeof dDesCarCargaValues>;

/**
 * H - H002 | Tipo de documento asociado | Pagina 108
 */
export const iTipDocAsoValues = {
  Electronico: 1,
  Impreso: 2,
  ConstanciaElectronica: 3
} as const;
export type ITipDocAso = ValueOf<typeof iTipDocAsoValues>;
export const dDesTipDocAsoValues = {
  [iTipDocAsoValues.Electronico]: 'Electrónico',
  [iTipDocAsoValues.Impreso]: 'Impreso',
  [iTipDocAsoValues.ConstanciaElectronica]: 'Constancia Electrónica'
} as const satisfies Record<ITipDocAso, string>;
export type DDesTipDocAso = ValueOf<typeof dDesTipDocAsoValues>;

/**
 * H - H009 | Tipo de documento impreso | Pagina 109
 */
export const iTipoDocAsoImpresoValues = {
  Factura: 1,
  NotaCredito: 2,
  NotaDebito: 3,
  NotaRemision: 4,
  ComprobanteRetencion: 5
} as const;
export type ITipoDocAsoImpreso = ValueOf<typeof iTipoDocAsoImpresoValues>;
export const dDTipoDocAsoImpresoValues = {
  [iTipoDocAsoImpresoValues.Factura]: 'Factura',
  [iTipoDocAsoImpresoValues.NotaCredito]: 'Nota de crédito',
  [iTipoDocAsoImpresoValues.NotaDebito]: 'Nota de débito',
  [iTipoDocAsoImpresoValues.NotaRemision]: 'Nota de remisión',
  [iTipoDocAsoImpresoValues.ComprobanteRetencion]: 'Comprobante de retención'
} as const satisfies Record<ITipoDocAsoImpreso, string>;
export type DDTipoDocAsoImpreso = ValueOf<typeof dDTipoDocAsoImpresoValues>;

/**
 * H - H014 | Tipo de constancia | Pagina 110
 */
export const iTipConsValues = {
  ConstanciaNoContribuyente: 1,
  ConstanciaMicroproductores: 2
} as const;
export type ITipCons = ValueOf<typeof iTipConsValues>;
export const dDesTipConsValues = {
  [iTipConsValues.ConstanciaNoContribuyente]: 'Constancia de no ser contribuyente',
  [iTipConsValues.ConstanciaMicroproductores]: 'Constancia de microproductores'
} as const satisfies Record<ITipCons, string>;
export type DDesTipCons = ValueOf<typeof dDesTipConsValues>;
