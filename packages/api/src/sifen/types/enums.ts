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
 * Naturaleza del receptor - D201 | Pagina 70
 */
export const naturalezaReceptor = {
  Contribuyente: 1,
  NoContribuyente: 2
} as const;
export type NaturalezaReceptor = (typeof naturalezaReceptor)[keyof typeof naturalezaReceptor];

/**
 * Tipo de operación - D202 | Pagina 70
 */
export const tipoOperacion = {
  B2B: 1,
  B2C: 2,
  B2G: 3,
  B2F: 4
} as const;
export type TipoOperacion = (typeof tipoOperacion)[keyof typeof tipoOperacion];

/**
 * Tipo de contribuyente receptor - D205 | Pagina 70
 */
export const tipoContribuyenteReceptor = {
  PersonaFisica: 1,
  PersonaJuridica: 2
} as const;
export type TipoContribuyenteReceptor =
  (typeof tipoContribuyenteReceptor)[keyof typeof tipoContribuyenteReceptor];

/**
 * Tipo de documento de identidad del receptor - D208 | Pagina 70
 */
export const tipoDocumentoIdentidadReceptor = {
  CedulaParaguaya: 1,
  Pasaporte: 2,
  CedulaExtranjera: 3,
  CarnetResidencia: 4,
  Innominado: 5,
  TarjetaDiplomatica: 6,
  Otro: 9
} as const;
export type TipoDocumentoIdentidadReceptor =
  (typeof tipoDocumentoIdentidadReceptor)[keyof typeof tipoDocumentoIdentidadReceptor];

export const descripcionTipoDocumentoIdentidadReceptor = {
  [tipoDocumentoIdentidadReceptor.CedulaParaguaya]: 'Cédula paraguaya',
  [tipoDocumentoIdentidadReceptor.Pasaporte]: 'Pasaporte',
  [tipoDocumentoIdentidadReceptor.CedulaExtranjera]: 'Cédula extranjera',
  [tipoDocumentoIdentidadReceptor.CarnetResidencia]: 'Carnet de residencia',
  [tipoDocumentoIdentidadReceptor.Innominado]: 'Innominado',
  [tipoDocumentoIdentidadReceptor.TarjetaDiplomatica]: 'Tarjeta Diplomática de exoneración fiscal'
} as const;
export type DescripcionTipoDocumentoIdentidadReceptor =
  (typeof descripcionTipoDocumentoIdentidadReceptor)[keyof typeof descripcionTipoDocumentoIdentidadReceptor];

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

/**
 * Tipo Regimen - D104 | Pagina 68
 */
export const tipoRegimen = {
  Turismo: 1,
  Importador: 2,
  EXportador: 3,
  Maquila: 4,
  Ley60_90: 5,
  PequenoProductor: 6,
  MedianoProductor: 7,
  Contable: 8
} as const;
export type TipoRegimen = (typeof tipoRegimen)[keyof typeof tipoRegimen];

/**
 * Indicador de presencia - E011 | Pagina 73
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
export type IndicadorPresencia = (typeof indicadorPresencia)[keyof typeof indicadorPresencia];

export const descripcionIndicadorPresencia = {
  [indicadorPresencia.OperacionPresencial]: 'Operación presencial',
  [indicadorPresencia.OperacionElectronica]: 'Operación electrónica',
  [indicadorPresencia.OperacionTelemarketing]: 'Operación telemarketing',
  [indicadorPresencia.VentaDomicilio]: 'Venta a domicilio',
  [indicadorPresencia.OperacionBancaria]: 'Operación bancaria',
  [indicadorPresencia.OperacionCiclica]: 'Operación cíclica'
} as const;
export type DescripcionIndicadorPresencia =
  (typeof descripcionIndicadorPresencia)[keyof typeof descripcionIndicadorPresencia];

/**
 * Condición de la operación - E601 | Pagina 80
 */
export const condicionOperacion = {
  Contado: 1,
  Credito: 2
} as const;
export type CondicionOperacion = (typeof condicionOperacion)[keyof typeof condicionOperacion];

export const descripcionCondicionOperacion = {
  [condicionOperacion.Contado]: 'Contado',
  [condicionOperacion.Credito]: 'Crédito'
} as const;
export type DescripcionCondicionOperacion =
  (typeof descripcionCondicionOperacion)[keyof typeof descripcionCondicionOperacion];

/**
 * Tipo de pago - E606 | Pagina 81
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
export type TipoPago = (typeof tipoPago)[keyof typeof tipoPago];

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
  [tipoPago.PagoMovil]: 'Pago Móvil',
  [tipoPago.Donacion]: 'Donación',
  [tipoPago.Promocion]: 'Promoción',
  [tipoPago.ConsumoInterno]: 'Consumo Interno',
  [tipoPago.PagoElectronico]: 'Pago Electrónico'
} as const;
export type DescripcionTipoPago = (typeof descripcionTipoPago)[keyof typeof descripcionTipoPago];

/**
 * Denominación de la tarjeta - E621 | Pagina 82
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
export type DenominacionTarjeta = (typeof denominacionTarjeta)[keyof typeof denominacionTarjeta];

export const descripcionDenominacionTarjeta = {
  [denominacionTarjeta.Visa]: 'Visa',
  [denominacionTarjeta.Mastercard]: 'Mastercard',
  [denominacionTarjeta.AmericanExpress]: 'American Express',
  [denominacionTarjeta.Maestro]: 'Maestro',
  [denominacionTarjeta.Panal]: 'Panal',
  [denominacionTarjeta.Cabal]: 'Cabal'
  // Otro (99) requires custom description from user
} as const;
export type DescripcionDenominacionTarjeta =
  (typeof descripcionDenominacionTarjeta)[keyof typeof descripcionDenominacionTarjeta];

/**
 * Forma de procesamiento de pago - E626 | Pagina 82
 */
export const formaProcesamientoPago = {
  POS: 1,
  PagoElectronico: 2,
  Otro: 9
} as const;
export type FormaProcesamientoPago =
  (typeof formaProcesamientoPago)[keyof typeof formaProcesamientoPago];

export const descripcionFormaProcesamientoPago = {
  [formaProcesamientoPago.POS]: 'POS',
  [formaProcesamientoPago.PagoElectronico]: 'Pago Electrónico',
  [formaProcesamientoPago.Otro]: 'Otro'
} as const;
export type DescripcionFormaProcesamientoPago =
  (typeof descripcionFormaProcesamientoPago)[keyof typeof descripcionFormaProcesamientoPago];

/**
 * Condición de la operación a crédito - E641 | Pagina 84
 */
export const condicionCredito = {
  Plazo: 1,
  Cuota: 2
} as const;
export type CondicionCredito = (typeof condicionCredito)[keyof typeof condicionCredito];

export const descripcionCondicionCredito = {
  [condicionCredito.Plazo]: 'Plazo',
  [condicionCredito.Cuota]: 'Cuota'
} as const;
export type DescripcionCondicionCredito =
  (typeof descripcionCondicionCredito)[keyof typeof descripcionCondicionCredito];

/**
 * Tipo de documento del responsable de la generacion del DE | Pagina 84
 */
export const tipoDocumentoResponsable = {
  CedulaParaguaya: 1,
  Pasaporte: 2,
  CedulaExtranjera: 3,
  CarnetResidencia: 4,
  Otro: 9
} as const;
export type TipoDocumentoResponsable =
  (typeof tipoDocumentoResponsable)[keyof typeof tipoDocumentoResponsable];

export const descripcionTipoDocumentoResponsable = {
  [tipoDocumentoResponsable.CedulaParaguaya]: 'Cédula paraguaya',
  [tipoDocumentoResponsable.Pasaporte]: 'Pasaporte',
  [tipoDocumentoResponsable.CedulaExtranjera]: 'Cédula extranjera',
  [tipoDocumentoResponsable.CarnetResidencia]: 'Carnet de residencia',
  [tipoDocumentoResponsable.Otro]: 'Otro'
} as const;
export type DescripcionTipoDocumentoResponsable =
  (typeof descripcionTipoDocumentoResponsable)[keyof typeof descripcionTipoDocumentoResponsable];

/**
 * Tipo de emisión - B002 | Pagina 65
 */
export const tipoEmision = {
  Normal: 1,
  Contingencia: 2
} as const;

export type TipoEmision = (typeof tipoEmision)[keyof typeof tipoEmision];

export const descripcionTipoEmision = {
  [tipoEmision.Normal]: 'Normal',
  [tipoEmision.Contingencia]: 'Contingencia'
} as const;

/**
 * Tipo de contribuyente - D103 | Pagina 67
 */
export const tipoContribuyente = {
  PersonaFisica: 1,
  PersonaJuridica: 2
} as const;
/**
 * Tipo de contribuyente - D103 | Pagina 67
 */
export type TipoContribuyente = (typeof tipoContribuyente)[keyof typeof tipoContribuyente];

/**
 * Código de relevancia - E715 | Pagina 87
 */
export const codigoRelevancia = {
  Mercaderia: 1,
  Servicio: 2,
  Producto: 3,
  BienCapital: 4,
  Otro: 9
} as const;
export type CodigoRelevancia = (typeof codigoRelevancia)[keyof typeof codigoRelevancia];

/**
 * Afectación tributaria del IVA - E731 | Pagina 88
 */
export const afectacionIVA = {
  Gravado: 1,
  Exonerado: 2,
  Exento: 3,
  GravadoParcial: 4
} as const;
export type AfectacionIVA = (typeof afectacionIVA)[keyof typeof afectacionIVA];

export const descripcionAfectacionIVA = {
  [afectacionIVA.Gravado]: 'Gravado IVA',
  [afectacionIVA.Exonerado]: 'Exonerado (Art. 83- Ley 125/91)',
  [afectacionIVA.Exento]: 'Exento',
  [afectacionIVA.GravadoParcial]: 'Gravado parcial (Grav-Exento)'
} as const;
export type DescripcionAfectacionIVA =
  (typeof descripcionAfectacionIVA)[keyof typeof descripcionAfectacionIVA];

/**
 * Tasa del IVA - E734 | Pagina 88
 */
export const tasaIVA = {
  Tasa10: 10,
  Tasa5: 5,
  Exento: 0
} as const;
export type TasaIVA = (typeof tasaIVA)[keyof typeof tasaIVA];

/**
 * Unidad de medida - E709 | Pagina 211
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
export type UnidadMedida = (typeof unidadMedida)[keyof typeof unidadMedida];

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
  [unidadMedida.Racion]: 'ración',
  [unidadMedida.Kilometros]: 'Km',
  [unidadMedida.Segundo]: 'Se',
  [unidadMedida.MetroLineal]: 'ml',
  [unidadMedida.Hectareas]: 'ha',
  [unidadMedida.UnidadMedidaGlobal]: 'GL',
  [unidadMedida.PorMillaje]: 'pm',
  [unidadMedida.UnidadInternacional]: 'UI',
  [unidadMedida.CostoPorMil]: 'CPM'
} as const;
export type DescripcionUnidadMedida =
  (typeof descripcionUnidadMedida)[keyof typeof descripcionUnidadMedida];
