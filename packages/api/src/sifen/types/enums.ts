import type { ValueOf } from 'type-fest';

/**
 * B - B002 | iTipEmi | Tipo de emisión | Pagina 62
 */
export const tipoEmision = {
  Normal: 1,
  Contingencia: 2
} as const;
export type TipoEmision = ValueOf<typeof tipoEmision>;
export const descripcionTipoEmision = {
  [tipoEmision.Normal]: 'Normal',
  [tipoEmision.Contingencia]: 'Contingencia'
} as const satisfies Record<TipoEmision, string>;
export type DescripcionTipoEmision = ValueOf<typeof descripcionTipoEmision>;

/**
 * C - C002 | iTiDE | Tipo de Documento Electrónico | Pagina 63
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
export type TipoDocumentoElectronico = ValueOf<typeof tipoDocumentoElectronico>;
export const descripcionTipoDocumentoElectronico = {
  [tipoDocumentoElectronico.FacturaElectronica]: 'Factura electrónica',
  [tipoDocumentoElectronico.FacturaElectronicaExportacion]: 'Factura electrónica de exportación',
  [tipoDocumentoElectronico.FacturaElectronicaImportacion]: 'Factura electrónica de importación',
  [tipoDocumentoElectronico.AutofacturaElectronica]: 'Autofactura electrónica',
  [tipoDocumentoElectronico.NotaCreditoElectronica]: 'Nota de crédito electrónica',
  [tipoDocumentoElectronico.NotaDebitoElectronica]: 'Nota de débito electrónica',
  [tipoDocumentoElectronico.NotaRemisionElectronica]: 'Nota de remisión electrónica',
  [tipoDocumentoElectronico.ComprobanteRetencionElectronico]: 'Comprobante de retención electrónico'
} as const satisfies Record<TipoDocumentoElectronico, string>;
export type DescripcionTipoDocumentoElectronico = ValueOf<
  typeof descripcionTipoDocumentoElectronico
>;

/**
 * D1 - D011 | iTipTra | Tipo de transacción | Pagina 66
 */
export const tipoTransaccion = {
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
export type TipoTransaccion = ValueOf<typeof tipoTransaccion>;
export const descripcionTipoTransaccion = {
  [tipoTransaccion.VentaMercaderia]: 'Venta de mercadería',
  [tipoTransaccion.PrestacionServicios]: 'Prestación de servicios',
  [tipoTransaccion.Mixto]: 'Mixto',
  [tipoTransaccion.VentaActivoFijo]: 'Venta de activo fijo',
  [tipoTransaccion.VentaDivisas]: 'Venta de divisas',
  [tipoTransaccion.CompraDivisas]: 'Compra de divisas',
  [tipoTransaccion.PromocionOMuestras]: 'Promoción o entrega de muestras',
  [tipoTransaccion.Donacion]: 'Donación',
  [tipoTransaccion.Anticipo]: 'Anticipo',
  [tipoTransaccion.CompraProductos]: 'Compra de productos',
  [tipoTransaccion.CompraServicios]: 'Compra de servicios',
  [tipoTransaccion.VentaCreditoFiscal]: 'Venta de crédito fiscal',
  [tipoTransaccion.MuestrasMedicas]: 'Muestras médicas (Art. 3 RG 24/2014)'
} as const satisfies Record<TipoTransaccion, string>;
export type DescripcionTipoTransaccion = ValueOf<typeof descripcionTipoTransaccion>;

/**
 * D1 - D013 | iTImp | Tipo de impuesto afectado | Pagina 66
 */
export const tipoImpuestoAfectado = {
  IVA: 1,
  ISC: 2,
  Renta: 3,
  Ninguno: 4,
  IVA_Renta: 5
} as const;
export type TipoImpuestoAfectado = ValueOf<typeof tipoImpuestoAfectado>;
export const descripcionTipoImpuestoAfectado = {
  [tipoImpuestoAfectado.IVA]: 'IVA',
  [tipoImpuestoAfectado.ISC]: 'ISC',
  [tipoImpuestoAfectado.Renta]: 'Renta',
  [tipoImpuestoAfectado.Ninguno]: 'Ninguno',
  [tipoImpuestoAfectado.IVA_Renta]: 'IVA - Renta'
} as const satisfies Record<TipoImpuestoAfectado, string>;
export type DescripcionTipoImpuestoAfectado = ValueOf<typeof descripcionTipoImpuestoAfectado>;

/**
 * D1 - D017 | iCondTiCam | Condición del tipo de cambio | Pagina 67
 */
export const condicionTipoCambio = {
  Global: 1,
  PorItem: 2
} as const;
export type CondicionTipoCambio = ValueOf<typeof condicionTipoCambio>;
export const descripcionCondicionTipoCambio = {
  [condicionTipoCambio.Global]: 'Global (un solo tipo de cambio para todo el DE)',
  [condicionTipoCambio.PorItem]: 'Por ítem (tipo de cambio distinto por ítem)'
} as const satisfies Record<CondicionTipoCambio, string>;
export type DescripcionCondicionTipoCambio = ValueOf<typeof descripcionCondicionTipoCambio>;

/**
 * D1 - D019 | iCondAnt | Condición del Anticipo | Pagina 66
 */
export const condicionAnticipo = {
  AnticipoGlobal: 1,
  AnticipoPorItem: 2
} as const;
export type CondicionAnticipo = ValueOf<typeof condicionAnticipo>;
export const descripcionCondicionAnticipo = {
  [condicionAnticipo.AnticipoGlobal]: 'Anticipo Global',
  [condicionAnticipo.AnticipoPorItem]: 'Anticipo por Ítem'
} as const satisfies Record<CondicionAnticipo, string>;
export type DescripcionCondicionAnticipo = ValueOf<typeof descripcionCondicionAnticipo>;

/**
 * D1.1 - D031 | cOblAfe | Codigo de la obligacion afectada | Pagina 1 NT-18
 */
export const tipoObligacion = {
  IRACISRegimenesEspeciales: 113,
  TributoUnicoMaquila: 143,
  IVAgravadasExoneradasExportadores: 211,
  ISCgeneral: 311,
  ISCcombustibles: 321,
  IVAempresarialRegimenGeneral: 700,
  IVAempresarialSimple: 701,
  IVAzonaFranca: 703,
  IVAempresarialResimple: 702,
  IVApersonalServiciosPersonales: 715,
  IVApersonalRentasGananciasCapital: 716
} as const;
export type TipoObligacion = ValueOf<typeof tipoObligacion>;
export const descripcionTipoObligacion = {
  [tipoObligacion.IRACISRegimenesEspeciales]: 'IMPUESTO A LA RENTA IRACIS - REGÍMENES ESPECIALES',
  [tipoObligacion.TributoUnicoMaquila]: 'TRIBUTO UNICO MAQUILA',
  [tipoObligacion.IVAgravadasExoneradasExportadores]:
    'IMPUESTO AL VALOR AGREGADO - GRAVADAS Y EXONERADAS - EXPORTADORES',
  [tipoObligacion.ISCgeneral]: 'IMPUESTO SELECTIVO AL CONSUMO - GENERAL',
  [tipoObligacion.ISCcombustibles]: 'IMPUESTO SELECTIVO AL CONSUMO COMBUSTIBLES',
  [tipoObligacion.IVAempresarialRegimenGeneral]:
    'IMPUESTO A LA RENTA EMPRESARIAL - RÉGIMEN GENERAL',
  [tipoObligacion.IVAempresarialSimple]: 'IMPUESTO A LA RENTA EMPRESARIAL - SIMPLE',
  [tipoObligacion.IVAzonaFranca]: 'IMPUESTO DE ZONA FRANCA',
  [tipoObligacion.IVAempresarialResimple]: 'IMPUESTO A LA RENTA EMPRESARIAL - RESIMPLE',
  [tipoObligacion.IVApersonalServiciosPersonales]:
    'IMPUESTO A LA RENTA PERSONAL - SERVICIOS PERSONALES',
  [tipoObligacion.IVApersonalRentasGananciasCapital]:
    'IMPUESTO A LA RENTA PERSONAL - RENTAS Y GANANCIAS DE CAPITAL'
} as const satisfies Record<TipoObligacion, string>;
export type DescripcionTipoObligacion = ValueOf<typeof descripcionTipoObligacion>;

/**
 * D2 - D103 | iTipCont | Tipo de contribuyente | Pagina 68
 */
export const tipoContribuyente = {
  PersonaFisica: 1,
  PersonaJuridica: 2
} as const;
export type TipoContribuyente = ValueOf<typeof tipoContribuyente>;
export const descripcionTipoContribuyente = {
  [tipoContribuyente.PersonaFisica]: 'Persona Física',
  [tipoContribuyente.PersonaJuridica]: 'Persona Jurídica'
} as const satisfies Record<TipoContribuyente, string>;
export type DescripcionTipoContribuyente = ValueOf<typeof descripcionTipoContribuyente>;

/**
 * D2.2 - D141 | iTipIDRespDE | Tipo de documento de identidad del responsable de la generación del DE | Pagina 70
 */
export const tipoDocumentoResponsableDE = {
  CedulaParaguaya: 1,
  Pasaporte: 2,
  CedulaExtranjera: 3,
  CarnetResidencia: 4,
  Otro: 9
} as const;
export type TipoDocumentoResponsableDE = ValueOf<typeof tipoDocumentoResponsableDE>;
export const descripcionTipoDocumentoResponsableDE = {
  [tipoDocumentoResponsableDE.CedulaParaguaya]: 'Cédula paraguaya',
  [tipoDocumentoResponsableDE.Pasaporte]: 'Pasaporte',
  [tipoDocumentoResponsableDE.CedulaExtranjera]: 'Cédula extranjera',
  [tipoDocumentoResponsableDE.CarnetResidencia]: 'Carnet de residencia',
  [tipoDocumentoResponsableDE.Otro]: 'Otro'
} as const satisfies Record<TipoDocumentoResponsableDE, string>;
export type DescripcionTipoDocumentoResponsableDE = ValueOf<
  typeof descripcionTipoDocumentoResponsableDE
>;

/**
 * D3 - D201 | iNatRec | Naturaleza del receptor | Pagina 71
 */
export const naturalezaReceptor = {
  Contribuyente: 1,
  NoContribuyente: 2
} as const;
export type NaturalezaReceptor = ValueOf<typeof naturalezaReceptor>;
export const descripcionNaturalezaReceptor = {
  [naturalezaReceptor.Contribuyente]: 'contribuyente',
  [naturalezaReceptor.NoContribuyente]: 'no contribuyente'
} as const satisfies Record<NaturalezaReceptor, string>;
export type DescripcionNaturalezaReceptor = ValueOf<typeof descripcionNaturalezaReceptor>;

/**
 * D3 - D202 | iTiOpe | Tipo de operación | Pagina 71
 */
export const tipoOperacion = {
  B2B: 1,
  B2C: 2,
  B2G: 3,
  B2F: 4
} as const;
export type TipoOperacion = ValueOf<typeof tipoOperacion>;
export const descripcionTipoOperacion = {
  [tipoOperacion.B2B]: 'B2B',
  [tipoOperacion.B2C]: 'B2C',
  [tipoOperacion.B2G]: 'B2G',
  [tipoOperacion.B2F]: 'B2F'
} as const satisfies Record<TipoOperacion, string>;
export type DescripcionTipoOperacion = ValueOf<typeof descripcionTipoOperacion>;

/**
 * D3 - D205 | iTiContRec | Tipo de contribuyente receptor | Pagina 71
 */
export const tipoContribuyenteReceptor = {
  PersonaFisica: 1,
  PersonaJuridica: 2
} as const;
export type TipoContribuyenteReceptor = ValueOf<typeof tipoContribuyenteReceptor>;
export const descripcionTipoContribuyenteReceptor = {
  [tipoContribuyenteReceptor.PersonaFisica]: 'Persona Física',
  [tipoContribuyenteReceptor.PersonaJuridica]: 'Persona Jurídica'
} as const satisfies Record<TipoContribuyenteReceptor, string>;
export type DescripcionTipoContribuyenteReceptor = ValueOf<
  typeof descripcionTipoContribuyenteReceptor
>;

/**
 * D3 - D208 | iTipIDRec | Tipo de documento de identidad del receptor | Pagina 71
 */
export const tipoDocumentoReceptor = {
  CedulaParaguaya: 1,
  Pasaporte: 2,
  CedulaExtranjera: 3,
  CarnetResidencia: 4,
  Innominado: 5,
  TarjetaDiplomatica: 6,
  Otro: 9
} as const;
export type TipoDocumentoReceptor = ValueOf<typeof tipoDocumentoReceptor>;
export const descripcionTipoDocumentoReceptor = {
  [tipoDocumentoReceptor.CedulaParaguaya]: 'Cédula paraguaya',
  [tipoDocumentoReceptor.Pasaporte]: 'Pasaporte',
  [tipoDocumentoReceptor.CedulaExtranjera]: 'Cédula extranjera',
  [tipoDocumentoReceptor.CarnetResidencia]: 'Carnet de residencia',
  [tipoDocumentoReceptor.Innominado]: 'Innominado',
  [tipoDocumentoReceptor.TarjetaDiplomatica]: 'Tarjeta Diplomática de exoneración fiscal',
  [tipoDocumentoReceptor.Otro]: 'Otro'
} as const satisfies Record<TipoDocumentoReceptor, string>;
export type DescripcionTipoDocumentoReceptor = ValueOf<typeof descripcionTipoDocumentoReceptor>;

/**
 * E1 - E011 | iIndPres | Indicador de presencia | Pagina 74
 */
export const indicadorPresencia = {
  OperacionPresencial: 1,
  OperacionElectronica: 2,
  OperacionTelemarketing: 3,
  VentaDomicilio: 4,
  OperacionBancaria: 5,
  OperacionCiclica: 6,
  Otro: 9
} as const;
export type IndicadorPresencia = ValueOf<typeof indicadorPresencia>;
export const descripcionIndicadorPresencia = {
  [indicadorPresencia.OperacionPresencial]: 'Operación presencial',
  [indicadorPresencia.OperacionElectronica]: 'Operación electrónica',
  [indicadorPresencia.OperacionTelemarketing]: 'Operación telemarketing',
  [indicadorPresencia.VentaDomicilio]: 'Venta a domicilio',
  [indicadorPresencia.OperacionBancaria]: 'Operación bancaria',
  [indicadorPresencia.OperacionCiclica]: 'Operación cíclica',
  [indicadorPresencia.Otro]: 'Otro'
} as const satisfies Record<IndicadorPresencia, string>;
export type DescripcionIndicadorPresencia = ValueOf<typeof descripcionIndicadorPresencia>;

/**
 * E4 - E301 | iNatVen | Naturaleza del vendedor | Pagina 75
 */
export const naturalezaVendedor = {
  NoContribuyente: 1,
  Extranjero: 2
} as const;
export type NaturalezaVendedor = ValueOf<typeof naturalezaVendedor>;
export const descripcionNaturalezaVendedor = {
  [naturalezaVendedor.NoContribuyente]: 'No contribuyente',
  [naturalezaVendedor.Extranjero]: 'Extranjero'
} as const satisfies Record<NaturalezaVendedor, string>;
export type DescripcionNaturalezaVendedor = ValueOf<typeof descripcionNaturalezaVendedor>;

/**
 * E4 - E304 | iTipIDVen | Tipo de documento de identidad del vendedor | Pagina 75
 */
export const tipoDocumentoVendedor = {
  CedulaParaguaya: 1,
  Pasaporte: 2,
  CedulaExtranjera: 3,
  CarnetResidencia: 4
} as const;
export type TipoDocumentoVendedor = ValueOf<typeof tipoDocumentoVendedor>;
export const descripcionTipoDocumentoVendedor = {
  [tipoDocumentoVendedor.CedulaParaguaya]: 'Cédula paraguaya',
  [tipoDocumentoVendedor.Pasaporte]: 'Pasaporte',
  [tipoDocumentoVendedor.CedulaExtranjera]: 'Cédula extranjera',
  [tipoDocumentoVendedor.CarnetResidencia]: 'Carnet de residencia'
} as const satisfies Record<TipoDocumentoVendedor, string>;
export type DescripcionTipoDocumentoVendedor = ValueOf<typeof descripcionTipoDocumentoVendedor>;

/**
 * E5 - E401 | iMotEmiValues | Motivo de emisión | Pagina 77
 */
export const motivoEmision = {
  DevolucionAjustePrecios: 1,
  Devolucion: 2,
  Descuento: 3,
  Bonificacion: 4,
  CreditoIncobrable: 5,
  RecuperoCosto: 6,
  RecuperoGasto: 7,
  AjustePrecio: 8
} as const;
export type MotivoEmision = ValueOf<typeof motivoEmision>;
export const descripcionMotivoEmision = {
  [motivoEmision.DevolucionAjustePrecios]: 'Devolución y Ajuste de precios',
  [motivoEmision.Devolucion]: 'Devolución',
  [motivoEmision.Descuento]: 'Descuento',
  [motivoEmision.Bonificacion]: 'Bonificación',
  [motivoEmision.CreditoIncobrable]: 'Crédito incobrable',
  [motivoEmision.RecuperoCosto]: 'Recupero de costo',
  [motivoEmision.RecuperoGasto]: 'Recupero de gasto',
  [motivoEmision.AjustePrecio]: 'Ajuste de precio'
} as const satisfies Record<MotivoEmision, string>;
export type DescripcionMotivoEmision = ValueOf<typeof descripcionMotivoEmision>;

/**
 * E6 - E501 | iMotEmiNR | Motivo de emisión | Pagina 79
 */
export const motivoEmisionNotaRemision = {
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
export type MotivoEmisionNotaRemision = ValueOf<typeof motivoEmisionNotaRemision>;
export const descripcionMotivoEmisionNotaRemision = {
  [motivoEmisionNotaRemision.TrasladoVenta]: 'Traslado por ventas',
  [motivoEmisionNotaRemision.TrasladoConsignacion]: 'Traslado por consignación',
  [motivoEmisionNotaRemision.Exportacion]: 'Exportación',
  [motivoEmisionNotaRemision.TrasladoCompra]: 'Traslado por compra',
  [motivoEmisionNotaRemision.Importacion]: 'Importación',
  [motivoEmisionNotaRemision.TrasladoDevolucion]: 'Traslado por devolución',
  [motivoEmisionNotaRemision.TrasladoEntreLocales]: 'Traslado entre locales de la empresa',
  [motivoEmisionNotaRemision.TrasladoTransformacion]: 'Traslado de bienes por transformación',
  [motivoEmisionNotaRemision.TrasladoReparacion]: 'Traslado de bienes por reparación',
  [motivoEmisionNotaRemision.TrasladoEmisorMovil]: 'Traslado por emisor móvil',
  [motivoEmisionNotaRemision.ExhibicionDemostracion]: 'Exhibición o Demostración',
  [motivoEmisionNotaRemision.ParticipacionFerias]: 'Participación en ferias',
  [motivoEmisionNotaRemision.TrasladoEncomienda]: 'Traslado de encomienda',
  [motivoEmisionNotaRemision.Decomiso]: 'Decomiso',
  [motivoEmisionNotaRemision.Otro]: 'Otro'
} as const satisfies Record<MotivoEmisionNotaRemision, string>;
export type DescripcionMotivoEmisionNotaRemision = ValueOf<
  typeof descripcionMotivoEmisionNotaRemision
>;

/**
 * E6 - E503 | iRespEmiNR | Responsable de la emisión de la Nota Remisión Electrónica | Pagina 79
 */
export const responsableEmisionNotaRemision = {
  EmisorFactura: 1,
  PoseedorFacturaBienes: 2,
  EmpresaTransportista: 3,
  DespachanteAduanas: 4,
  AgenteTransporteIntermediario: 5
} as const;
export type ResponsableEmisionNotaRemision = ValueOf<typeof responsableEmisionNotaRemision>;
export const descripcionResponsableEmisionNotaRemision = {
  [responsableEmisionNotaRemision.EmisorFactura]: 'Emisor de la factura',
  [responsableEmisionNotaRemision.PoseedorFacturaBienes]: 'Poseedor de la factura y bienes',
  [responsableEmisionNotaRemision.EmpresaTransportista]: 'Empresa transportista',
  [responsableEmisionNotaRemision.DespachanteAduanas]: 'Despachante de Aduanas',
  [responsableEmisionNotaRemision.AgenteTransporteIntermediario]:
    'Agente de transporte o intermediario'
} as const satisfies Record<ResponsableEmisionNotaRemision, string>;
export type DescripcionResponsableEmisionNotaRemision = ValueOf<
  typeof descripcionResponsableEmisionNotaRemision
>;

/**
 * E7 - E601 | iCondOpe | Condición de la operación | Pagina 80
 */
export const condicionOperacionEnum = {
  Contado: 1,
  Credito: 2
} as const;
export type CondicionOperacionEnum = ValueOf<typeof condicionOperacionEnum>;
export const descripcionCondicionOperacion = {
  [condicionOperacionEnum.Contado]: 'Contado',
  [condicionOperacionEnum.Credito]: 'Crédito'
} as const satisfies Record<CondicionOperacionEnum, string>;
export type DescripcionCondicionOperacionEnum = ValueOf<typeof descripcionCondicionOperacion>;

/**
 * E7.1 - E606 | iTiPago | Tipo de pago | Pagina 81
 */
export const tipoPago = {
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
export type TipoPago = ValueOf<typeof tipoPago>;
export const descripcionTipoPago = {
  [tipoPago.Efectivo]: 'Efectivo',
  [tipoPago.Cheque]: 'Cheque',
  [tipoPago.TarjetaCredito]: 'Tarjeta de crédito',
  [tipoPago.TarjetaDebito]: 'Tarjeta de débito',
  [tipoPago.Transferencia]: 'Transferencia',
  [tipoPago.Giro]: 'Giro',
  [tipoPago.BilleteraElectronica]: 'Billetera electrónica',
  [tipoPago.TarjetaEmpresarial]: 'Tarjeta empresarial',
  [tipoPago.Vale]: 'Vale',
  [tipoPago.Retencion]: 'Retención',
  [tipoPago.PagoAnticipo]: 'Pago por anticipo',
  [tipoPago.ValorFiscal]: 'Valor fiscal',
  [tipoPago.ValorComercial]: 'Valor comercial',
  [tipoPago.Compensacion]: 'Compensación',
  [tipoPago.Permuta]: 'Permuta',
  [tipoPago.PagoBancario]: 'Pago bancario',
  [tipoPago.PagoMovil]: 'Pago móvil',
  [tipoPago.Donacion]: 'Donación',
  [tipoPago.Promocion]: 'Promoción',
  [tipoPago.ConsumoInterno]: 'Consumo interno',
  [tipoPago.PagoElectronico]: 'Pago electrónico',
  [tipoPago.Otro]: 'Otro'
} as const satisfies Record<TipoPago, string>;
export type DescripcionTipoPago = ValueOf<typeof descripcionTipoPago>;

/**
 * E7.1.1 - E621 | iDenTarj | Denominación de la tarjeta | Pagina 83
 */
export const denominacionTarjeta = {
  Visa: 1,
  Mastercard: 2,
  AmericanExpress: 3,
  Maestro: 4,
  Panal: 5,
  Cabal: 6,
  Otro: 99
} as const;
export type DenominacionTarjeta = ValueOf<typeof denominacionTarjeta>;
export const descripcionDenominacionTarjeta = {
  [denominacionTarjeta.Visa]: 'Visa',
  [denominacionTarjeta.Mastercard]: 'Mastercard',
  [denominacionTarjeta.AmericanExpress]: 'American Express',
  [denominacionTarjeta.Maestro]: 'Maestro',
  [denominacionTarjeta.Panal]: 'Panal',
  [denominacionTarjeta.Cabal]: 'Cabal',
  [denominacionTarjeta.Otro]: 'Otro'
} as const satisfies Record<DenominacionTarjeta, string>;
export type DescripcionDenominacionTarjeta = ValueOf<typeof descripcionDenominacionTarjeta>;

/**
 * E7.1.1 - E626 | iForProPa | Forma de procesamiento de pago | Pagina 83
 */
export const formaProcesamientoPago = {
  POS: 1,
  PagoElectronico: 2,
  Otro: 9
} as const;
export type FormaProcesamientoPago = ValueOf<typeof formaProcesamientoPago>;

/**
 * E7.2 - E641 | iCondCred | Condición de la operación a crédito | Pagina 84
 */
export const condicionOperacionCredito = {
  Plazo: 1,
  Cuota: 2
} as const;
export type CondicionOperacionCredito = ValueOf<typeof condicionOperacionCredito>;
export const descripcionCondicionOperacionCredito = {
  [condicionOperacionCredito.Plazo]: 'Plazo',
  [condicionOperacionCredito.Cuota]: 'Cuota'
} as const satisfies Record<CondicionOperacionCredito, string>;
export type DescripcionCondicionOperacionCredito = ValueOf<
  typeof descripcionCondicionOperacionCredito
>;

/**
 * E8 - E715 | cRelMerc | Código de datos de relevancia de las mercaderías | Pagina 86
 */
export const codigoDatosRelevanciaMercaderias = {
  ToleranciaQuiebra: 1,
  ToleranciaMerma: 2
} as const;
export type CodigoDatosRelevanciaMercaderias = ValueOf<typeof codigoDatosRelevanciaMercaderias>;
export const descripcionCodigoDatosRelevanciaMercaderias = {
  [codigoDatosRelevanciaMercaderias.ToleranciaQuiebra]: 'Tolerancia de quiebra',
  [codigoDatosRelevanciaMercaderias.ToleranciaMerma]: 'Tolerancia de merma'
} as const satisfies Record<CodigoDatosRelevanciaMercaderias, string>;
export type DescripcionCodigoDatosRelevanciaMercaderias = ValueOf<
  typeof descripcionCodigoDatosRelevanciaMercaderias
>;

/**
 * E8.2 - E731 | iAfecIVA | Forma de afectación tributaria del IVA | Pagina 89
 */
export const formaAfectacionTributariaIVA = {
  Gravado: 1,
  Exonerado: 2,
  Exento: 3,
  GravadoParcial: 4
} as const;
export type FormaAfectacionTributariaIVA = ValueOf<typeof formaAfectacionTributariaIVA>;
export const descripcionFormaAfectacionTributariaIVA = {
  [formaAfectacionTributariaIVA.Gravado]: 'Gravado IVA',
  [formaAfectacionTributariaIVA.Exonerado]: 'Exonerado (Art. 83- Ley 125/91)',
  [formaAfectacionTributariaIVA.Exento]: 'Exento',
  [formaAfectacionTributariaIVA.GravadoParcial]: 'Gravado parcial (Grav-Exento)'
} as const satisfies Record<FormaAfectacionTributariaIVA, string>;
export type DescripcionFormaAfectacionTributariaIVA = ValueOf<
  typeof descripcionFormaAfectacionTributariaIVA
>;

/**
 * E8.5 - E771 | iTipOpVNValues | Tipo de operación de venta de vehículos | Pagina 91
 */
export const tipoOperacionVentaVehiculos = {
  Representante: 1,
  ConsumidorFinal: 2,
  Gobierno: 3,
  FlotaVehiculos: 4
} as const;
export type TipoOperacionVentaVehiculos = ValueOf<typeof tipoOperacionVentaVehiculos>;
export const descripcionTipoOperacionVentaVehiculos = {
  [tipoOperacionVentaVehiculos.Representante]: 'Venta a representante',
  [tipoOperacionVentaVehiculos.ConsumidorFinal]: 'Venta al consumidor final',
  [tipoOperacionVentaVehiculos.Gobierno]: 'Venta a gobierno',
  [tipoOperacionVentaVehiculos.FlotaVehiculos]: 'Venta a flota de vehículos'
} as const satisfies Record<TipoOperacionVentaVehiculos, string>;
export type DescripcionTipoOperacionVentaVehiculos = ValueOf<
  typeof descripcionTipoOperacionVentaVehiculos
>;

/**
 * E8.5 - E779 | iTipComValues | Tipo de combustible | Pagina 92
 */
export const tipoCombustible = {
  Gasolina: 1,
  Diesel: 2,
  Etanol: 3,
  GNV: 4,
  Flex: 5,
  Otro: 9
} as const;
export type TipoCombustible = ValueOf<typeof tipoCombustible>;
export const descripcionTipoCombustible = {
  [tipoCombustible.Gasolina]: 'Gasolina',
  [tipoCombustible.Diesel]: 'Diésel',
  [tipoCombustible.Etanol]: 'Etanol',
  [tipoCombustible.GNV]: 'GNV',
  [tipoCombustible.Flex]: 'Flex',
  [tipoCombustible.Otro]: 'Otro'
} as const satisfies Record<TipoCombustible, string>;
export type DescripcionTipoCombustible = ValueOf<typeof descripcionTipoCombustible>;

/**
 * E10 - E901 | iTipTrans | Tipo de transporte | Pagina 96
 */
export const tipoTransporte = {
  Propio: 1,
  Tercero: 2
} as const;
export type TipoTransporte = ValueOf<typeof tipoTransporte>;
export const descripcionTipoTransporte = {
  [tipoTransporte.Propio]: 'Propio',
  [tipoTransporte.Tercero]: 'Tercero'
} as const satisfies Record<TipoTransporte, string>;
export type DescripcionTipoTransporte = ValueOf<typeof descripcionTipoTransporte>;

/**
 * E10 - E903 | iModTrans | Modalidad del transporte | Pagina 96
 */
export const modalidadTransporte = {
  Terrestre: 1,
  Fluvial: 2,
  Aereo: 3,
  Multimodal: 4
} as const;
export type ModalidadTransporte = ValueOf<typeof modalidadTransporte>;
export const descripcionModalidadTransporte = {
  [modalidadTransporte.Terrestre]: 'Terrestre',
  [modalidadTransporte.Fluvial]: 'Fluvial',
  [modalidadTransporte.Aereo]: 'Aéreo',
  [modalidadTransporte.Multimodal]: 'Multimodal'
} as const satisfies Record<ModalidadTransporte, string>;
export type DescripcionModalidadTransporte = ValueOf<typeof descripcionModalidadTransporte>;

/**
 * E10 - E905 | iRespFlete | Responsable del costo del flete | Pagina 96
 */
export const responsableCostoFlete = {
  EmisorFactura: 1,
  ReceptorFactura: 2,
  Tercero: 3,
  AgenteIntermediario: 4,
  TransportePropio: 5
} as const;
export type ResponsableCostoFlete = ValueOf<typeof responsableCostoFlete>;

/**
 * E10 - E906 | cCondNegValues | Condición de la negociación | Pagina 96
 */
export const condicionNegociacion = {
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
export type CondicionNegociacion = ValueOf<typeof condicionNegociacion>;

/**
 * E10.3 - E967 | dTipIdenVeh | Tipo de Identificación del vehículo | Pagina 100
 */
export const tipoIdentificacionVehiculo = {
  NumeroIdentificacion: 1,
  NumeroMatricula: 2
} as const;
export type TipoIdentificacionVehiculo = ValueOf<typeof tipoIdentificacionVehiculo>;

/**
 * E10.4 - E981 | iNatTrans | Naturaleza del transportista | Pagina 100
 */
export const naturalezaTransportista = {
  Contribuyente: 1,
  NoContribuyente: 2
} as const;
export type NaturalezaTransportista = ValueOf<typeof naturalezaTransportista>;

/**
 * E10.4 - E985 | iTipIDTransValues | Tipo de documento de identidad del transportista | Pagina 101
 */
export const tipoDocumentoTransportista = {
  CedulaParaguaya: 1,
  Pasaporte: 2,
  CedulaExtranjera: 3,
  CarnetResidencia: 4
} as const;
export type TipoDocumentoTransportista = ValueOf<typeof tipoDocumentoTransportista>;
export const descripcionTipoDocumentoTransportista = {
  [tipoDocumentoTransportista.CedulaParaguaya]: 'Cédula paraguaya',
  [tipoDocumentoTransportista.Pasaporte]: 'Pasaporte',
  [tipoDocumentoTransportista.CedulaExtranjera]: 'Cédula extranjera',
  [tipoDocumentoTransportista.CarnetResidencia]: 'Carnet de residencia'
} as const satisfies Record<TipoDocumentoTransportista, string>;
export type DescripcionTipoDocumentoTransportista = ValueOf<
  typeof descripcionTipoDocumentoTransportista
>;

/**
 * G1 - G057 | iCarCargaValues | Características de la Carga | Pagina 108
 */
export const caracteristicasCarga = {
  MercaderiasCadenaFrio: 1,
  CargaPeligrosa: 2,
  Otro: 3
} as const;
export type CaracteristicasCarga = ValueOf<typeof caracteristicasCarga>;
export const descripcionCaracteristicasCarga = {
  [caracteristicasCarga.MercaderiasCadenaFrio]: 'Mercaderías con cadena de frío',
  [caracteristicasCarga.CargaPeligrosa]: 'Carga peligrosa',
  [caracteristicasCarga.Otro]: 'Otro'
} as const satisfies Record<CaracteristicasCarga, string>;
export type DescripcionCaracteristicasCarga = ValueOf<typeof descripcionCaracteristicasCarga>;

/**
 * H - H002 | iTipDocAsoValues | Tipo de documento asociado | Pagina 108
 */
export const tipoDocumentoAsociado = {
  Electronico: 1,
  Impreso: 2,
  ConstanciaElectronica: 3
} as const;
export type TipoDocumentoAsociado = ValueOf<typeof tipoDocumentoAsociado>;
export const descripcionTipoDocumentoAsociado = {
  [tipoDocumentoAsociado.Electronico]: 'Electrónico',
  [tipoDocumentoAsociado.Impreso]: 'Impreso',
  [tipoDocumentoAsociado.ConstanciaElectronica]: 'Constancia Electrónica'
} as const satisfies Record<TipoDocumentoAsociado, string>;
export type DescripcionTipoDocumentoAsociado = ValueOf<typeof descripcionTipoDocumentoAsociado>;

/**
 * H - H009 | iTipoDocAsoImpresoValues | Tipo de documento impreso | Pagina 109
 */
export const tipoDocumentoImpreso = {
  Factura: 1,
  NotaCredito: 2,
  NotaDebito: 3,
  NotaRemision: 4
} as const;
export type TipoDocumentoImpreso = ValueOf<typeof tipoDocumentoImpreso>;
export const descripcionTipoDocumentoImpreso = {
  [tipoDocumentoImpreso.Factura]: 'Factura',
  [tipoDocumentoImpreso.NotaCredito]: 'Nota de crédito',
  [tipoDocumentoImpreso.NotaDebito]: 'Nota de débito',
  [tipoDocumentoImpreso.NotaRemision]: 'Nota de remisión'
} as const satisfies Record<TipoDocumentoImpreso, string>;
export type DescripcionTipoDocumentoImpreso = ValueOf<typeof descripcionTipoDocumentoImpreso>;

/**
 * H - H014 | iTipConsValues | Tipo de constancia | Pagina 110
 */
export const tipoConstancia = {
  ConstanciaNoContribuyente: 1,
  ConstanciaMicroproductores: 2
} as const;
export type TipoConstancia = ValueOf<typeof tipoConstancia>;
export const descripcionTipoConstancia = {
  [tipoConstancia.ConstanciaNoContribuyente]: 'Constancia de no ser contribuyente',
  [tipoConstancia.ConstanciaMicroproductores]: 'Constancia de microproductores'
} as const satisfies Record<TipoConstancia, string>;
export type DescripcionTipoConstancia = ValueOf<typeof descripcionTipoConstancia>;

/**
 * Tabla 5 | Unidad de medida | Pagina 211
 */
export const unidadMedida = {
  Unidad: 77,
  KilogramosPorMetroCuadrado: 79,
  Kilogramos: 83,
  Gramos: 86,
  Metros: 87,
  Mililitros: 88,
  Litros: 89,
  Miligramos: 90,
  Centimetros: 91,
  CentimetrosCuadrados: 92,
  CentimetrosCubicos: 93,
  Pulgadas: 94,
  Milimetros: 95,
  MilimetrosCuadrados: 96,
  Año: 97,
  Mes: 98,
  Tonelada: 99,
  Hora: 100,
  Minuto: 101,
  Dia: 102,
  Yardas: 103,
  Determinacion: 104,
  MetrosMT: 108,
  MetrosCuadrados: 109,
  MetrosCubicos: 110,
  Bovinas: 111,
  Curie: 112,
  Docena: 113,
  GalonesUS: 114,
  Gruesas: 115,
  KilogramoBruto: 116,
  Kits: 117,
  Microcurie: 118,
  Milicurie: 119,
  Millar: 120,
  Par: 121,
  Pies: 122,
  PiesCuadradas: 123,
  Piezas: 124,
  Quilate: 125,
  Resmas: 126,
  Rollos: 127,
  MilKilowattHora: 128,
  Mazos: 129,
  Tambores: 130,
  Caja: 131,
  Juego: 132,
  Paquete: 133,
  Bolsa: 134,
  DocenaPar: 135,
  Pote: 136,
  Fardos: 137,
  Bulto: 138,
  Cesta: 139,
  PesoBase: 140,
  Racion: 569,
  Kilometros: 625,
  Segundo: 666,
  MetroLineal: 660,
  Hectareas: 869,
  UnidadMedidaGlobal: 885,
  PorMillaje: 891,
  UnidadInternacional: 2329,
  CostoPorMil: 2366
} as const;
export type UnidadMedida = ValueOf<typeof unidadMedida>;
export const descripcionUnidadMedida = {
  [unidadMedida.Unidad]: 'UNI',
  [unidadMedida.KilogramosPorMetroCuadrado]: 'kg/m²',
  [unidadMedida.Kilogramos]: 'kg',
  [unidadMedida.Gramos]: 'g',
  [unidadMedida.Metros]: 'm',
  [unidadMedida.Mililitros]: 'ML',
  [unidadMedida.Litros]: 'LT',
  [unidadMedida.Miligramos]: 'MG',
  [unidadMedida.Centimetros]: 'CM',
  [unidadMedida.CentimetrosCuadrados]: 'CM2',
  [unidadMedida.CentimetrosCubicos]: 'CM3',
  [unidadMedida.Pulgadas]: 'PUL',
  [unidadMedida.Milimetros]: 'MM',
  [unidadMedida.MilimetrosCuadrados]: 'MM2',
  [unidadMedida.Año]: 'AA',
  [unidadMedida.Mes]: 'ME',
  [unidadMedida.Tonelada]: 'TN',
  [unidadMedida.Hora]: 'Hs',
  [unidadMedida.Minuto]: 'Mi',
  [unidadMedida.Dia]: 'Di',
  [unidadMedida.Yardas]: 'Ya',
  [unidadMedida.Determinacion]: 'DET',
  [unidadMedida.MetrosMT]: 'MT',
  [unidadMedida.MetrosCuadrados]: 'M2',
  [unidadMedida.MetrosCubicos]: 'M3',
  [unidadMedida.Bovinas]: '4A',
  [unidadMedida.Curie]: 'Ci',
  [unidadMedida.Docena]: 'DOC',
  [unidadMedida.GalonesUS]: 'GLL',
  [unidadMedida.Gruesas]: 'GRO',
  [unidadMedida.KilogramoBruto]: 'E4',
  [unidadMedida.Kits]: 'KT',
  [unidadMedida.Microcurie]: 'M5',
  [unidadMedida.Milicurie]: 'MCU',
  [unidadMedida.Millar]: 'MIL',
  [unidadMedida.Par]: 'PAR',
  [unidadMedida.Pies]: 'FOT',
  [unidadMedida.PiesCuadradas]: 'FTK',
  [unidadMedida.Piezas]: 'PCE',
  [unidadMedida.Quilate]: 'KLT',
  [unidadMedida.Resmas]: 'RM',
  [unidadMedida.Rollos]: 'RO',
  [unidadMedida.MilKilowattHora]: 'kWh',
  [unidadMedida.Mazos]: 'U(JGO)',
  [unidadMedida.Tambores]: 'DR',
  [unidadMedida.Caja]: 'BX',
  [unidadMedida.Juego]: 'SET',
  [unidadMedida.Paquete]: 'PK',
  [unidadMedida.Bolsa]: 'BG',
  [unidadMedida.DocenaPar]: 'DPC',
  [unidadMedida.Pote]: 'JR',
  [unidadMedida.Fardos]: 'BL',
  [unidadMedida.Bulto]: 'AB',
  [unidadMedida.Cesta]: 'BK',
  [unidadMedida.PesoBase]: 'BW',
  [unidadMedida.Racion]: 'ración',
  [unidadMedida.Kilometros]: 'Km',
  [unidadMedida.Segundo]: 'Se',
  [unidadMedida.MetroLineal]: 'ml',
  [unidadMedida.Hectareas]: 'ha',
  [unidadMedida.UnidadMedidaGlobal]: 'GL',
  [unidadMedida.PorMillaje]: 'pm',
  [unidadMedida.UnidadInternacional]: 'UI',
  [unidadMedida.CostoPorMil]: 'CPM'
} as const satisfies Record<UnidadMedida, string>;
export type DescripcionUnidadMedida = ValueOf<typeof descripcionUnidadMedida>;
