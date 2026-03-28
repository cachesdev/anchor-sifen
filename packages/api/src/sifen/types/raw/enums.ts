import type { ValueOf } from 'type-fest';

/**
 * A - A005 | Sistema de facturación | Pagina 61
 */
export const dSisFact = {
  SistemaContribuyente: 1,
  SIFENSolucionGratuita: 2
} as const;
export type DSisFact = ValueOf<typeof dSisFact>;
export const dDesSisFact = {
  [dSisFact.SistemaContribuyente]: 'Sistema de facturación del contribuyente',
  [dSisFact.SIFENSolucionGratuita]: 'SIFEN solución gratuita'
} as const satisfies Record<DSisFact, string>;
export type DDesSisFact = ValueOf<typeof dDesSisFact>;

/**
 * B - B002 | Tipo de emisión | Pagina 62
 */
export const iTipEmi = {
  Normal: 1,
  Contingencia: 2
} as const;
export type ITipEmi = ValueOf<typeof iTipEmi>;
export const dDesTipEmi = {
  [iTipEmi.Normal]: 'Normal',
  [iTipEmi.Contingencia]: 'Contingencia'
} as const satisfies Record<ITipEmi, string>;
export type DDesTipEmi = ValueOf<typeof dDesTipEmi>;

/**
 * C - C002 | Tipo de Documento Electrónico | Pagina 63
 */
export const iTiDE = {
  FacturaElectronica: 1,
  FacturaElectronicaExportacion: 2,
  FacturaElectronicaImportacion: 3,
  AutofacturaElectronica: 4,
  NotaCreditoElectronica: 5,
  NotaDebitoElectronica: 6,
  NotaRemisionElectronica: 7,
  ComprobanteRetencionElectronico: 8
} as const;
export type ITiDE = ValueOf<typeof iTiDE>;
export const dDesTiDE = {
  [iTiDE.FacturaElectronica]: 'Factura electrónica',
  [iTiDE.FacturaElectronicaExportacion]: 'Factura electrónica de exportación',
  [iTiDE.FacturaElectronicaImportacion]: 'Factura electrónica de importación',
  [iTiDE.AutofacturaElectronica]: 'Autofactura electrónica',
  [iTiDE.NotaCreditoElectronica]: 'Nota de crédito electrónica',
  [iTiDE.NotaDebitoElectronica]: 'Nota de débito electrónica',
  [iTiDE.NotaRemisionElectronica]: 'Nota de remisión electrónica',
  [iTiDE.ComprobanteRetencionElectronico]: 'Comprobante de retención electrónico'
} as const satisfies Record<ITiDE, string>;
export type DDesTiDE = ValueOf<typeof dDesTiDE>;

/**
 * D1 - D011 | Tipo de transacción | Pagina 66
 */
export const iTipTra = {
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
export type ITipTra = ValueOf<typeof iTipTra>;
export const dDesTipTra = {
  [iTipTra.VentaMercaderia]: 'Venta de mercadería',
  [iTipTra.PrestacionServicios]: 'Prestación de servicios',
  [iTipTra.Mixto]: 'Mixto',
  [iTipTra.VentaActivoFijo]: 'Venta de activo fijo',
  [iTipTra.VentaDivisas]: 'Venta de divisas',
  [iTipTra.CompraDivisas]: 'Compra de divisas',
  [iTipTra.PromocionOMuestras]: 'Promoción o entrega de muestras',
  [iTipTra.Donacion]: 'Donación',
  [iTipTra.Anticipo]: 'Anticipo',
  [iTipTra.CompraProductos]: 'Compra de productos',
  [iTipTra.CompraServicios]: 'Compra de servicios',
  [iTipTra.VentaCreditoFiscal]: 'Venta de crédito fiscal',
  [iTipTra.MuestrasMedicas]: 'Muestras médicas (Art. 3 RG 24/2014)'
} as const satisfies Record<ITipTra, string>;
export type DDesTipTra = ValueOf<typeof dDesTipTra>;

/**
 * D1 - D013 | Tipo de impuesto afectado | Pagina 66
 */
export const iTImp = {
  IVA: 1,
  ISC: 2,
  Renta: 3,
  Ninguno: 4,
  IVA_Renta: 5
} as const;
export type ITImp = ValueOf<typeof iTImp>;
export const dDesTImp = {
  [iTImp.IVA]: 'IVA',
  [iTImp.ISC]: 'ISC',
  [iTImp.Renta]: 'Renta',
  [iTImp.Ninguno]: 'Ninguno',
  [iTImp.IVA_Renta]: 'IVA - Renta'
} as const satisfies Record<ITImp, string>;
export type DDesTImp = ValueOf<typeof dDesTImp>;

export const iCondTiCam = {
  Global: 1,
  PorItem: 2
} as const;
export type ICondTiCam = ValueOf<typeof iCondTiCam>;
export const dDesCondTiCam = {
  [iCondTiCam.Global]: 'Global (un solo tipo de cambio para todo el DE)',
  [iCondTiCam.PorItem]: 'Por ítem (tipo de cambio distinto por ítem)'
} as const satisfies Record<ICondTiCam, string>;
export type DDesCondTiCam = ValueOf<typeof dDesCondTiCam>;

/**
 * D1 - D019 | Condición del Anticipo | Pagina 66
 */
export const iCondAnt = {
  AnticipoGlobal: 1,
  AnticipoPorItem: 2
} as const;
export type ICondAnt = ValueOf<typeof iCondAnt>;
export const dDesCondAnt = {
  [iCondAnt.AnticipoGlobal]: 'Anticipo Global',
  [iCondAnt.AnticipoPorItem]: 'Anticipo por Ítem'
} as const satisfies Record<ICondAnt, string>;
export type DDesCondAnt = ValueOf<typeof dDesCondAnt>;

/**
 * D2 - D103 | Tipo de contribuyente | Pagina 68
 */
export const iTipCont = {
  PersonaFisica: 1,
  PersonaJuridica: 2
} as const;
export type ITipCont = ValueOf<typeof iTipCont>;
export const dDesTipCont = {
  [iTipCont.PersonaFisica]: 'Persona Física',
  [iTipCont.PersonaJuridica]: 'Persona Jurídica'
} as const satisfies Record<ITipCont, string>;
export type DDesTipCont = ValueOf<typeof dDesTipCont>;

/**
 * D3 - D201 | Naturaleza del receptor | Pagina 71
 */
export const iNatRec = {
  Contribuyente: 1,
  NoContribuyente: 2
} as const;
export type INatRec = ValueOf<typeof iNatRec>;
export const dDesNatRec = {
  [iNatRec.Contribuyente]: 'contribuyente',
  [iNatRec.NoContribuyente]: 'no contribuyente'
} as const satisfies Record<INatRec, string>;
export type DDesNatRec = ValueOf<typeof dDesNatRec>;

/**
 * D3 - D202 | Tipo de operación | Pagina 71
 */
export const iTiOpe = {
  B2B: 1,
  B2C: 2,
  B2G: 3,
  B2F: 4
} as const;
export type ITiOpe = ValueOf<typeof iTiOpe>;
export const dDesTiOpe = {
  [iTiOpe.B2B]: 'B2B',
  [iTiOpe.B2C]: 'B2C',
  [iTiOpe.B2G]: 'B2G',
  [iTiOpe.B2F]: 'B2F'
} as const satisfies Record<ITiOpe, string>;
export type DDesTiOpe = ValueOf<typeof dDesTiOpe>;

/**
 * D3 - D205 | Tipo de contribuyente receptor | Pagina 71
 */
export const iTiContRec = {
  PersonaFisica: 1,
  PersonaJuridica: 2
} as const;
export type ITiContRec = ValueOf<typeof iTiContRec>;
export const dDesTiContRec = {
  [iTiContRec.PersonaFisica]: 'Persona Física',
  [iTiContRec.PersonaJuridica]: 'Persona Jurídica'
} as const satisfies Record<ITiContRec, string>;
export type DDesTiContRec = ValueOf<typeof dDesTiContRec>;

/**
 * D2.2 - D141 | Tipo de documento de identidad del responsable de la generación del DE | Pagina 70
 */
export const iTipIDRespDE = {
  CedulaParaguaya: 1,
  Pasaporte: 2,
  CedulaExtranjera: 3,
  CarnetResidencia: 4,
  Otro: 9
} as const;
export type ITipIDRespDE = ValueOf<typeof iTipIDRespDE>;
export const dDTipIDRespDE = {
  [iTipIDRespDE.CedulaParaguaya]: 'Cédula paraguaya',
  [iTipIDRespDE.Pasaporte]: 'Pasaporte',
  [iTipIDRespDE.CedulaExtranjera]: 'Cédula extranjera',
  [iTipIDRespDE.CarnetResidencia]: 'Carnet de residencia',
  [iTipIDRespDE.Otro]: 'Otro'
} as const satisfies Record<ITipIDRespDE, string>;
export type DDTipIDRespDE = ValueOf<typeof dDTipIDRespDE>;

/**
 * D3 - D208 | Tipo de documento de identidad del receptor | Pagina 71
 */
export const iTipIDRec = {
  CedulaParaguaya: 1,
  Pasaporte: 2,
  CedulaExtranjera: 3,
  CarnetResidencia: 4,
  Innominado: 5,
  TarjetaDiplomatica: 6,
  Otro: 9
} as const;
export type ITipIDRec = ValueOf<typeof iTipIDRec>;
export const dDTipIDRec = {
  [iTipIDRec.CedulaParaguaya]: 'Cédula paraguaya',
  [iTipIDRec.Pasaporte]: 'Pasaporte',
  [iTipIDRec.CedulaExtranjera]: 'Cédula extranjera',
  [iTipIDRec.CarnetResidencia]: 'Carnet de residencia',
  [iTipIDRec.Innominado]: 'Innominado',
  [iTipIDRec.TarjetaDiplomatica]: 'Tarjeta Diplomática de exoneración fiscal',
  [iTipIDRec.Otro]: 'Otro'
} as const satisfies Record<ITipIDRec, string>;
export type DDTipIDRec = ValueOf<typeof dDTipIDRec>;

/**
 * E1 - E011 | Indicador de presencia | Pagina 74
 */
export const iIndPres = {
  OperacionPresencial: 1,
  OperacionElectronica: 2,
  OperacionTelemarketing: 3,
  VentaDomicilio: 4,
  OperacionBancaria: 5,
  OperacionCiclica: 6,
  Otro: 9
} as const;
export type IIndPres = ValueOf<typeof iIndPres>;
export const dDesIndPres = {
  [iIndPres.OperacionPresencial]: 'Operación presencial',
  [iIndPres.OperacionElectronica]: 'Operación electrónica',
  [iIndPres.OperacionTelemarketing]: 'Operación telemarketing',
  [iIndPres.VentaDomicilio]: 'Venta a domicilio',
  [iIndPres.OperacionBancaria]: 'Operación bancaria',
  [iIndPres.OperacionCiclica]: 'Operación cíclica',
  [iIndPres.Otro]: 'Otro'
} as const satisfies Record<IIndPres, string>;
export type DDesIndPres = ValueOf<typeof dDesIndPres>;

/**
 * E7 - E601 | Condición de la operación | Pagina 80
 */
export const iCondOpe = {
  Contado: 1,
  Credito: 2
} as const;
export type ICondOpe = ValueOf<typeof iCondOpe>;
export const dDCondOpe = {
  [iCondOpe.Contado]: 'Contado',
  [iCondOpe.Credito]: 'Crédito'
} as const satisfies Record<ICondOpe, string>;
export type DDCondOpe = ValueOf<typeof dDCondOpe>;

/**
 * E7.1 - E606 | Tipo de pago | Pagina 81
 */
export const iTiPago = {
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
export type ITiPago = ValueOf<typeof iTiPago>;
export const dDesTiPag = {
  [iTiPago.Efectivo]: 'Efectivo',
  [iTiPago.Cheque]: 'Cheque',
  [iTiPago.TarjetaCredito]: 'Tarjeta de crédito',
  [iTiPago.TarjetaDebito]: 'Tarjeta de débito',
  [iTiPago.Transferencia]: 'Transferencia',
  [iTiPago.Giro]: 'Giro',
  [iTiPago.BilleteraElectronica]: 'Billetera electrónica',
  [iTiPago.TarjetaEmpresarial]: 'Tarjeta empresarial',
  [iTiPago.Vale]: 'Vale',
  [iTiPago.Retencion]: 'Retención',
  [iTiPago.PagoAnticipo]: 'Pago por anticipo',
  [iTiPago.ValorFiscal]: 'Valor fiscal',
  [iTiPago.ValorComercial]: 'Valor comercial',
  [iTiPago.Compensacion]: 'Compensación',
  [iTiPago.Permuta]: 'Permuta',
  [iTiPago.PagoBancario]: 'Pago bancario',
  [iTiPago.PagoMovil]: 'Pago móvil',
  [iTiPago.Donacion]: 'Donación',
  [iTiPago.Promocion]: 'Promoción',
  [iTiPago.ConsumoInterno]: 'Consumo interno',
  [iTiPago.PagoElectronico]: 'Pago electrónico',
  [iTiPago.Otro]: 'Otro'
} as const satisfies Record<ITiPago, string>;
export type DDesTiPag = ValueOf<typeof dDesTiPag>;

/**
 * E7.1.1 - E621 | Denominación de la tarjeta | Pagina 83
 */
export const iDenTarj = {
  Visa: 1,
  Mastercard: 2,
  AmericanExpress: 3,
  Maestro: 4,
  Panal: 5,
  Cabal: 6,
  Otro: 99
} as const;
export type IDenTarj = ValueOf<typeof iDenTarj>;
export const dDesDenTarj = {
  [iDenTarj.Visa]: 'Visa',
  [iDenTarj.Mastercard]: 'Mastercard',
  [iDenTarj.AmericanExpress]: 'American Express',
  [iDenTarj.Maestro]: 'Maestro',
  [iDenTarj.Panal]: 'Panal',
  [iDenTarj.Cabal]: 'Cabal',
  [iDenTarj.Otro]: 'Otro'
} as const satisfies Record<IDenTarj, string>;
export type DDesDenTarj = ValueOf<typeof dDesDenTarj>;

/**
 * E7.1.1 - E626 | Forma de procesamiento de pago | Pagina 83
 */
export const iForProPa = {
  POS: 1,
  PagoElectronico: 2,
  Otro: 9
} as const;
export type IForProPa = ValueOf<typeof iForProPa>;

/**
 * E7.2 - E641 | Condición de la operación a crédito | Pagina 84
 */
export const iCondCred = {
  Plazo: 1,
  Cuota: 2
} as const;
export type ICondCred = ValueOf<typeof iCondCred>;
export const dDCondCred = {
  [iCondCred.Plazo]: 'Plazo',
  [iCondCred.Cuota]: 'Cuota'
} as const satisfies Record<ICondCred, string>;
export type DDCondCred = ValueOf<typeof dDCondCred>;

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
export const cRelMerc = {
  ToleranciaQuiebra: 1,
  ToleranciaMerma: 2
} as const;
export type CRelMerc = ValueOf<typeof cRelMerc>;
export const dDesRelMerc = {
  [cRelMerc.ToleranciaQuiebra]: 'Tolerancia de quiebra',
  [cRelMerc.ToleranciaMerma]: 'Tolerancia de merma'
} as const satisfies Record<CRelMerc, string>;
export type DDesRelMerc = ValueOf<typeof dDesRelMerc>;

/**
 * E8.2 - E731 | Forma de afectación tributaria del IVA | Pagina 89
 */
export const iAfecIVA = {
  Gravado: 1,
  Exonerado: 2,
  Exento: 3,
  GravadoParcial: 4
} as const;
export type IAfecIVA = ValueOf<typeof iAfecIVA>;
export const dDesAfecIVA = {
  [iAfecIVA.Gravado]: 'Gravado IVA',
  [iAfecIVA.Exonerado]: 'Exonerado (Art. 83- Ley 125/91)',
  [iAfecIVA.Exento]: 'Exento',
  [iAfecIVA.GravadoParcial]: 'Gravado parcial (Grav-Exento)'
} as const satisfies Record<IAfecIVA, string>;
export type DDesAfecIVA = ValueOf<typeof dDesAfecIVA>;

/**
 * E4 - E301 | Naturaleza del vendedor | Pagina 75
 */
export const iNatVen = {
  NoContribuyente: 1,
  Extranjero: 2
} as const;
export type INatVen = ValueOf<typeof iNatVen>;
export const dDesNatVen = {
  [iNatVen.NoContribuyente]: 'No contribuyente',
  [iNatVen.Extranjero]: 'Extranjero'
} as const satisfies Record<INatVen, string>;
export type DDesNatVen = ValueOf<typeof dDesNatVen>;

/**
 * E4 - E304 | Tipo de documento de identidad del vendedor | Pagina 75
 */
export const iTipIDVen = {
  CedulaParaguaya: 1,
  Pasaporte: 2,
  CedulaExtranjera: 3,
  CarnetResidencia: 4
} as const;
export type ITipIDVen = ValueOf<typeof iTipIDVen>;
export const dDTipIDVen = {
  [iTipIDVen.CedulaParaguaya]: 'Cédula paraguaya',
  [iTipIDVen.Pasaporte]: 'Pasaporte',
  [iTipIDVen.CedulaExtranjera]: 'Cédula extranjera',
  [iTipIDVen.CarnetResidencia]: 'Carnet de residencia'
} as const;
export type DDTipIDVen = ValueOf<typeof dDTipIDVen>;

/**
 * E6 - E501 | Motivo de emisión | Pagina 79
 */
export const iMotEmiNR = {
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
export type IMotEmiNR = ValueOf<typeof iMotEmiNR>;
export const dDesMotEmiNR = {
  [iMotEmiNR.TrasladoVenta]: 'Traslado por ventas',
  [iMotEmiNR.TrasladoConsignacion]: 'Traslado por consignación',
  [iMotEmiNR.Exportacion]: 'Exportación',
  [iMotEmiNR.TrasladoCompra]: 'Traslado por compra',
  [iMotEmiNR.Importacion]: 'Importación',
  [iMotEmiNR.TrasladoDevolucion]: 'Traslado por devolución',
  [iMotEmiNR.TrasladoEntreLocales]: 'Traslado entre locales de la empresa',
  [iMotEmiNR.TrasladoTransformacion]: 'Traslado de bienes por transformación',
  [iMotEmiNR.TrasladoReparacion]: 'Traslado de bienes por reparación',
  [iMotEmiNR.TrasladoEmisorMovil]: 'Traslado por emisor móvil',
  [iMotEmiNR.ExhibicionDemostracion]: 'Exhibición o Demostración',
  [iMotEmiNR.ParticipacionFerias]: 'Participación en ferias',
  [iMotEmiNR.TrasladoEncomienda]: 'Traslado de encomienda',
  [iMotEmiNR.Decomiso]: 'Decomiso',
  [iMotEmiNR.Otro]: 'Otro'
} as const satisfies Record<IMotEmiNR, string>;
export type DDesMotEmiNR = ValueOf<typeof dDesMotEmiNR>;

/**
 * E6 - E503 | Responsable de la emisión de la Nota Remisión Electrónica | Pagina 79
 */
export const iRespEmiNR = {
  EmisorFactura: 1,
  PoseedorFacturaBienes: 2,
  EmpresaTransportista: 3,
  DespachanteAduanas: 4,
  AgenteTransporteIntermediario: 5
} as const;
export type IRespEmiNR = ValueOf<typeof iRespEmiNR>;
export const dDesRespEmiNR = {
  [iRespEmiNR.EmisorFactura]: 'Emisor de la factura',
  [iRespEmiNR.PoseedorFacturaBienes]: 'Poseedor de la factura y bienes',
  [iRespEmiNR.EmpresaTransportista]: 'Empresa transportista',
  [iRespEmiNR.DespachanteAduanas]: 'Despachante de Aduanas',
  [iRespEmiNR.AgenteTransporteIntermediario]: 'Agente de transporte o intermediario'
} as const satisfies Record<IRespEmiNR, string>;
export type DDesRespEmiNR = ValueOf<typeof dDesRespEmiNR>;

/**
 * E10 - E901 | Tipo de transporte | Pagina 96
 */
export const iTipTrans = {
  Propio: 1,
  Tercero: 2
} as const;
export type ITipTrans = ValueOf<typeof iTipTrans>;
export const dDesTipTrans = {
  [iTipTrans.Propio]: 'Propio',
  [iTipTrans.Tercero]: 'Tercero'
} as const satisfies Record<ITipTrans, string>;
export type DDesTipTrans = ValueOf<typeof dDesTipTrans>;

/**
 * E10 - E903 | Modalidad del transporte | Pagina 96
 */
export const iModTrans = {
  Terrestre: 1,
  Fluvial: 2,
  Aereo: 3,
  Multimodal: 4
} as const;
export type IModTrans = ValueOf<typeof iModTrans>;
export const dDesModTrans = {
  [iModTrans.Terrestre]: 'Terrestre',
  [iModTrans.Fluvial]: 'Fluvial',
  [iModTrans.Aereo]: 'Aéreo',
  [iModTrans.Multimodal]: 'Multimodal'
} as const satisfies Record<IModTrans, string>;
export type DDesModTrans = ValueOf<typeof dDesModTrans>;

/**
 * E10 - E905 | Responsable del costo del flete | Pagina 96
 */
export const iRespFlete = {
  EmisorFactura: 1,
  ReceptorFactura: 2,
  Tercero: 3,
  AgenteIntermediario: 4,
  TransportePropio: 5
} as const;
export type IRespFlete = ValueOf<typeof iRespFlete>;

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
export const dTipIdenVeh = {
  NumeroIdentificacion: 1,
  NumeroMatricula: 2
} as const;
export type DTipIdenVeh = ValueOf<typeof dTipIdenVeh>;

/**
 * E10.4 - E981 | Naturaleza del transportista | Pagina 100
 */
export const iNatTrans = {
  Contribuyente: 1,
  NoContribuyente: 2
} as const;
export type INatTrans = ValueOf<typeof iNatTrans>;

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
