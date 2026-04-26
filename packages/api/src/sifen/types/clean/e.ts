import type { LiteralUnion } from 'type-fest';
import type { CodigoCiudad } from '../../../gen/ciudades';
import type { CodigoDepartamento } from '../../../gen/departamentos';
import type { CodigoDistrito } from '../../../gen/distritos';
import type { CodigoMoneda } from '../../../gen/monedas';
import type { CodigoPais } from '../../../gen/paises';
import type { Big } from 'big.js';
import type {
  UnidadMedida,
  CondicionNegociacion,
  CodigoDatosRelevanciaMercaderias,
  CondicionOperacionCredito,
  CondicionOperacionEnum as CondicionOperacionEnum,
  FormaAfectacionTributariaIVA,
  DenominacionTarjeta,
  IndicadorPresencia,
  ModalidadTransporte,
  MotivoEmision,
  MotivoEmisionNotaRemision,
  NaturalezaVendedor,
  ResponsableEmisionNotaRemision,
  TipoPago,
  TipoCombustible,
  TipoOperacionVentaVehiculos,
  TipoTransporte,
  TipoDocumentoTransportista,
  TipoDocumentoVendedor,
  TipoIdentificacionVehiculo,
  FormaProcesamientoPago,
  NaturalezaTransportista,
  ResponsableCostoFlete
} from '../enums';

/**
 * E1 - E010 | gCamFE | Campos que componen la FE | Pagina 73
    *
    * Observaciones:
    *   Obligatorio si C002 = 1
    *   No informar si C002 ≠ 1
 */
export interface CamposFacturaElectronica {
  /**
   * E1 - E011 | iIndPres | Indicador de presencia | Pagina 74
    *
    * Observaciones:
    *   1= Operación presencial
    *   2= Operación electrónica
    *   3= Operación telemarketing
    *   4= Venta a domicilio
    *   5= Operación bancaria
    *   6= Operación cíclica
    *   9= Otro
   */
  indicadorPresencia: LiteralUnion<IndicadorPresencia, number>;
  /**
   * E1 - E013 | dFecEmNR | Fecha futura del traslado de mercadería | Pagina 74
   *
   * Formato: AAAA-MM-DD
    *
    * Observaciones:
    *   Fecha en el formato: AAAA-MM-DD
    *   Fecha estimada para el traslado de la mercadería y emisión de la nota de remisión electrónica cuando corresponda. RG 41/14
   */
  fechaFuturaTrasladoMercaderia?: Date;
  /**
   * E1.1 - E020 | gCompPub | Campos que describen las informaciones de compras públicas | Pagina 74
    * Observaciones: Obligatorio si D202 = 3 (Tipo de operación B2G)
   */
  comprasPublicas?: ComprasPublicas;
}

/**
 * E1.1 - E020 | gCompPub | Campos que describen las informaciones de compras públicas | Pagina 74
    * Observaciones: Obligatorio si D202 = 3 (Tipo de operación B2G)
 */
export interface ComprasPublicas {
  /**
   * E1.1 - E021 | dModCont | Modalidad - Código emitido por la DNCP | Pagina 74
   */
  modalidadContratacion: string;
  /**
   * E1.1 - E022 | dEntCont | Entidad - Código emitido por la DNCP | Pagina 74
   */
  entidadContratacion: number;
  /**
   * E1.1 - E023 | dAnoCont | Año - Código emitido por la DNCP | Pagina 74
   */
  anoContratacion: number;
  /**
   * E1.1 - E024 | dSecCont | Secuencia - emitido por la DNCP | Pagina 74
   */
  secuenciaContratacion: number;
  /**
   * E1.1 - E025 | dFeCodCont | Fecha de emisión del código de contratación por la DNCP | Pagina 75
   *
   * Formato: AAAA-MM-DD
    *
    * Observaciones:
    *   Fecha en el formato: AAAA-MM-DD.
    *   Esta fecha debe ser anterior a la fecha de emisión de la FE
   */
  fechaEmisionCodigoContratacion: Date;
}

/**
 * E4 - E300 | gCamAE | Campos que componen la Autofactura Electrónica | Pagina 75
    *
    * Observaciones:
    *   Obligatorio si C002 = 4
    *   No informar si C002 ≠ 4
 */
export interface AutofacturaElectronica {
  /**
   * E4 - E301 | iNatVen | Naturaleza del vendedor | Pagina 75
    *
    * Observaciones:
    *   1= No contribuyente
    *   2= Extranjero
   */
  naturalezaVendedor: LiteralUnion<NaturalezaVendedor, number>;
  /**
   * E4 - E304 | iTipIDVen | Tipo de documento de identidad del vendedor | Pagina 75
    *
    * Observaciones:
    *   1= Cédula paraguaya
    *   2= Pasaporte
    *   3= Cédula extranjera
    *   4= Carnet de residencia
   */
  tipoDocumentoIdentidadVendedor: LiteralUnion<TipoDocumentoVendedor, number>;
  /**
   * E4 - E306 | dNumIDVen | Número de documento de identidad del vendedor | Pagina 75
   */
  numeroDocumentoIdentidadVendedor: string;
  /**
   * E4 - E307 | dNomVen | Nombre y apellido del vendedor | Pagina 75
   */
  nombreVendedor: string;
  /**
   * E4 - E308 | dDirVen | Dirección del vendedor | Pagina 75
    *
    * Observaciones:
    *   En caso de extranjeros, colocar la dirección en donde se realizó la transacción.
    *   Nombre de la calle principal
   */
  direccionVendedor: string;
  /**
   * E4 - E309 | dNumCasVen | Número de casa del vendedor | Pagina 75
    * Observaciones: Si no tiene numeración colocar 0 (cero)
   */
  numeroCasaVendedor: number;
  /**
   * E4 - E310 | cDepVen | Código del departamento del vendedor | Pagina 76
    *
    * Observaciones:
    *   En caso de extranjeros, colocar el departamento en donde se realizó la transacción.
    *   Según XSD de Departamentos
   */
  departamentoVendedor: LiteralUnion<CodigoDepartamento, number>;
  /**
   * E4 - E312 | cDisVen | Código del distrito del vendedor | Pagina 76
    *
    * Observaciones:
    *   En caso de extranjeros, colocar el distrito en donde se realizó la transacción.
    *   Según Tabla 2.1 - Distritos
   */
  distritoVendedor?: LiteralUnion<CodigoDistrito, number>;
  /**
   * E4 - E314 | cCiuVen | Código de la ciudad del vendedor | Pagina 76
    *
    * Observaciones:
    *   En caso de extranjeros, colocar la ciudad en donde se realizó la transacción.
    *   Según Tabla 2.2 - Ciudades
   */
  ciudadVendedor: LiteralUnion<CodigoCiudad, number>;
  /**
   * E4 - E316 | dDirProv | Lugar de la transacción | Pagina 76
    * Observaciones: Nombre de la calle principal (Dirección donde se provee el servicio o producto)
   */
  lugarTransaccion: string;
  /**
   * E4 - E317 | cDepProv | Código del departamento donde se realiza la transacción | Pagina 76
    * Observaciones: Según XSD de Departamentos
   */
  departamentoTransaccion: LiteralUnion<CodigoDepartamento, number>;
  /**
   * E4 - E319 | cDisProv | Código del distrito donde se realiza la transacción | Pagina 76
    * Observaciones: Según Tabla 2.1 - Distritos
   */
  distritoTransaccion?: LiteralUnion<CodigoDistrito, number>;
  /**
   * E4 - E321 | cCiuProv | Código de la ciudad donde se realiza la transacción | Pagina 76
    * Observaciones: Según Tabla 2.2 - Ciudades
   */
  ciudadTransaccion: LiteralUnion<CodigoCiudad, number>;
}

/**
 * E5 - E400 | gCamNCDE | Campos de la Nota de Crédito/Débito Electrónica | Pagina 77
    *
    * Observaciones:
    *   Obligatorio si C002 = 5 o 6 (NCE y NDE)
    *   No informar si C002 ≠ 5 o 6
 */
export interface NotaCreditoDebitoElectronica {
  /**
   * E5 - E401 | iMotEmi | Motivo de emisión | Pagina 77
    *
    * Observaciones:
    *   1= Devolución y Ajuste de precios
    *   2= Devolución
    *   3= Descuento
    *   4= Bonificación
    *   5= Crédito incobrable
    *   6= Recupero de costo
    *   7= Recupero de gasto
    *   8= Ajuste de precio
   */
  motivoEmision: LiteralUnion<MotivoEmision, number>;
}

/**
 * E5 - E500 | gCamNRE | Campos que componen la Nota de Remisión Electrónica | Pagina 77
    *
    * Observaciones:
    *   Obligatorio si C002 = 7
    *   No informar si C002 ≠ 7
 */
export interface NotaRemisionElectronica {
  /**
   * E6 - E501 | iMotEmiNR | Motivo de emisión | Pagina 78
    *
    * Observaciones:
    *   1= Traslado por venta
    *   2= Traslado por consignación
    *   3= Exportación
    *   4= Traslado por compra
    *   5= Importación
    *   6= Traslado por devolución
    *   7= Traslado entre locales de la empresa
    *   8= Traslado de bienes por transformación
    *   9= Traslado de bienes por reparación
    *   10= Traslado por emisor móvil
    *   11= Exhibición o demostración
    *   12= Participación en ferias
    *   13= Traslado de encomienda
    *   14= Decomiso
    *   99=Otro (deberá consignarse expresamente el o los motivos diferentes a los mencionados anteriormente)
    *   Obs.: Cuando el motivo sea por operaciones internas de la empresa, el RUC del receptor debe ser igual al RUC del emisor.
   */
  motivoEmisionNotaRemision: LiteralUnion<MotivoEmisionNotaRemision, number>;
  /**
   * E6 - E503 | iRespEmiNR | Responsable de la emisión de la Nota Remisión Electrónica | Pagina 79
    *
    * Observaciones:
    *   1= Emisor de la factura
    *   2= Poseedor de la factura y bienes
    *   3= Empresa transportista
    *   4=Despachante de Aduanas
    *   5= Agente de transporte o intermediario
   */
  responsableEmisionNotaRemision: LiteralUnion<ResponsableEmisionNotaRemision, number>;
  /**
   * E6 - E505 | dKmR | Kilómetros estimados de recorrido | Pagina 79
   */
  kilometrosEstimadosRecorrido: number;
  /**
   * E6 - E506 | dFecEm | Fecha futura de emisión de la factura | Pagina 79
   *
   *Formato: AAAA-MM-DD
    *
    * Observaciones:
    *   Fecha en el formato AAAA-MM-DD
    *   Obs.: Informar cuando no se ha emitido aún la factura electrónica, en caso que corresponda
   */
  fechaFuturaEmision?: Date;
  /**
   * E6 - E507 | cPreFle | Costo del Flete | Pagina 3 NT-10
   */
  precioFlete?: number;
}

/**
 * E7 - E600 | gCamCond | Campos que describen la condición de la operación | Pagina 80
    *
    * Observaciones:
    *   Obligatorio si C002 = 1 o 4
    *   No informar si C002 ≠ 1 o 4
 */
export interface CondicionOperacion {
  /**
   * E7 - E601 | iCondOpe | Condición de la operación | Pagina 80
    *
    * Observaciones:
    *   1= Contado
    *   2= Crédito
   */
  condicionOperacion: LiteralUnion<CondicionOperacionEnum, number>;
  /**
   * E7.1 - E605 | gPaConEIni | Campos que describen la forma de pago al contado o del monto de la entrega inicial | Pagina 80
    *
    * Observaciones:
    *   Obligatorio si E601 = 1
    *   Obligatorio si existe el campo E645
   */
  pagoContadoEntregaInicial?: PagoContadoEntregaInicial[];
  /**
   * E7.2 - E640 | gPagCred | Campos que describen la operación a crédito | Pagina 84
    *
    * Observaciones:
    *   Obligatorio si E601 = 2
    *   No informar si E601 ≠ 2
   */
  pagoCredito?: PagoCredito;
}

/**
 * E7.1 - E605 | gPaConEIni | Campos que describen la forma de pago al contado o del monto de la entrega inicial | Pagina 80
    *
    * Observaciones:
    *   Obligatorio si E601 = 1
    *   Obligatorio si existe el campo E645
 */
export interface PagoContadoEntregaInicial {
  /**
   * E7.1 - E606 | iTiPago | Tipo de pago | Pagina 81
    *
    * Observaciones:
    *   1= Efectivo
    *   2= Cheque
    *   3= Tarjeta de crédito
    *   4= Tarjeta de débito
    *   5= Transferencia
    *   6= Giro
    *   7= Billetera electrónica
    *   8= Tarjeta empresarial
    *   9= Vale
    *   10= Retención
    *   11= Pago por anticipo
    *   12= Valor fiscal
    *   13= Valor comercial
    *   14= Compensación
    *   15= Permuta
    *   16= Pago bancario (Informar solo si E011=5)
    *   17 = Pago Móvil
    *   18 = Donación
    *   19 = Promoción
    *   20 = Consumo Interno
    *   21 = Pago Electrónico
    *   99 = Otro
   */
  tipoPago: LiteralUnion<TipoPago, number>;
  /**
   * E7.1 - E608 | dMonTiPag | Monto por tipo de pago | Pagina 82
   */
  montoTipoPago: Big;
  /**
   * E7.1 - E609 | cMoneTiPag | Moneda por tipo de pago | Pagina 82
    *
    * Observaciones:
    *   Según tabla de códigos para monedas de acuerdo con la norma ISO 4217
    *   Se requiere la misma moneda para todos los ítems del DE
   */
  monedaTipoPago: LiteralUnion<CodigoMoneda, string>;
  /**
   * E7.1 - E611 | dTiCamTiPag | Tipo de cambio por tipo de pago | Pagina 82
    * Observaciones: Obligatorio si E609 ≠ PYG
   */
  tipoCambioTipoPago?: Big;
  /**
   * E7.1.1 - E620 | gPagTarCD | Campos que describen el pago o entrega inicial de la operación con tarjeta de crédito/débito | Pagina 83
    * Observaciones: Se activa si E606 = 3 o 4
   */
  pagoTarjetaCreditoDebito?: PagoTarjetaCreditoDebito;
  /**
   * E7.1.2 - E630 | gPagCheq | Campos que describen el pago o entrega inicial de la operación con cheque | Pagina 84
    * Observaciones: Se activa si E606 = 2
   */
  pagoCheque?: PagoCheque;
}

/**
 * E7.1.1 - E620 | gPagTarCD | Campos que describen el pago o entrega inicial de la operación con tarjeta de crédito/débito | Pagina 83
    * Observaciones: Se activa si E606 = 3 o 4
 */
export interface PagoTarjetaCreditoDebito {
  /**
   * E7.1.1 - E621 | iDenTarj | Denominación de la tarjeta | Pagina 83
    *
    * Observaciones:
    *   1= Visa
    *   2= Mastercard
    *   3= American Express
    *   4= Maestro
    *   5= Panal
    *   6= Cabal
    *   99= Otro
   */
  denominacionTarjeta: LiteralUnion<DenominacionTarjeta, number>;
  /**
   * E7.1.1 - E623 | dRSProTar | Razón social de la procesadora de tarjeta | Pagina 83
   */
  razonSocialProcesadoraTarjeta?: string;
  /**
   * E7.1.1 - E624 | dRUCProTar | RUC de la procesadora de tarjeta | Pagina 83
   */
  rucProcesadoraTarjeta?: string;
  /**
   * E7.1.1 - E625 | dDVProTar | Dígito verificador del RUC de la procesadora de tarjeta | Pagina 83
   *
   * Si no es proveido, generado internamente.
    * Observaciones: Según algoritmo módulo 11
   */
  digitoVerificadorProcesadoraTarjeta?: number;
  /**
   * E7.1.1 - E626 | iForProPa | Forma de procesamiento de pago | Pagina 83
    *
    * Observaciones:
    *   1= POS
    *   2= Pago Electrónico (Ejemplo: compras por Internet)
    *   9= Otro
   */
  formaProcesamientoPago: LiteralUnion<FormaProcesamientoPago, number>;
  /**
   * E7.1.1 - E627 | dCodAuOpe | Código de autorización de la operación | Pagina 83
   */
  codigoAutorizacionOperacion?: string;
  /**
   * E7.1.1 - E628 | dNomTit | Nombre del titular de la tarjeta | Pagina 83
   */
  nombreTitularTarjeta?: string;
  /**
   * E7.1.1 - E629 | dNumTarj | Número de la tarjeta | Pagina 84
    * Observaciones: Cuatro últimos dígitos de la tarjeta
   */
  numeroTarjeta?: string;
}

/**
 * E7.1.2 - E630 | gPagCheq | Campos que describen el pago o entrega inicial de la operación con cheque | Pagina 84
    * Observaciones: Se activa si E606 = 2
 */
export interface PagoCheque {
  /**
   * E7.1.2 - E631 | dNumCheq | Número de cheque | Pagina 84
    * Observaciones: Completar con 0 (cero) a la izquierda hasta alcanzar 8 (ocho) cifras
   */
  numeroCheque: string;
  /**
   * E7.1.2 - E632 | dBcoEmi | Banco emisor | Pagina 84
   */
  bancoEmisor: string;
}

/**
 * E7.2 - E640 | gPagCred | Campos que describen la operación a crédito | Pagina 84
    *
    * Observaciones:
    *   Obligatorio si E601 = 2
    *   No informar si E601 ≠ 2
 */
export interface PagoCredito {
  /**
   * E7.2 - E641 | iCondCred | Condición de la operación a crédito | Pagina 84
    *
    * Observaciones:
    *   1= Plazo
    *   2= Cuota
   */
  condicionOperacionCredito: LiteralUnion<CondicionOperacionCredito, number>;
  /**
   * E7.2 - E643 | dPlazoCre | Plazo del crédito | Pagina 84
    *
    * Observaciones:
    *   Obligatorio si E641 = 1
    *   Ejemplo: 30 días, 12 meses
   */
  plazoCredito?: string;
  /**
   * E7.2 - E644 | dCuotas | Cantidad de cuotas | Pagina 84
    *
    * Observaciones:
    *   Obligatorio si E641 = 2
    *   Ejemplo: 12, 24, 36
   */
  cantidadCuotas?: number;
  /**
   * E7.2 - E645 | dMonEnt | Monto de la entrega inicial | Pagina 84
   */
  montoEntregaInicial?: Big;
  /**
   * E7.2.1 - E650 | gCuotas | Campos que describen las cuotas | Pagina 85
    * Observaciones: Se activa si E641 = 2
   */
  cuotas?: Cuota[];
}

/**
 * E7.2.1 - E650 | gCuotas | Campos que describen las cuotas | Pagina 85
    * Observaciones: Se activa si E641 = 2
 */
export interface Cuota {
  /**
   * E7.2.1 - E653 | cMoneCuo | Moneda de las cuotas | Pagina 85
    *
    * Observaciones:
    *   Según tabla de códigos para monedas de acuerdo con la norma ISO 4217
    *   Se requiere la misma moneda para todos los ítems del DE
   */
  monedaCuota: LiteralUnion<CodigoMoneda, string>;
  /**
   * E7.2.1 - E651 | dMonCuota | Monto de la cuota | Pagina 85
   */
  montoCuota: Big;
  /**
   * E7.2.1 - E652 | dVencCuo | Vencimiento de la cuota | Pagina 84
   *
   * Formato: AAAA-MM-DD
    * Observaciones: Fecha en el formato: AAAA-MM-DD
   */
  vencimientoCuota?: Date;
}

/**
 * E8 - E700 | gCamItem | Campos que describen los ítems de la operación | Pagina 85
 */
export interface ItemOperacion {
  /**
   * E8 - E701 | dCodInt | Código interno | Pagina 85
    * Observaciones: Código interno de identificación de la mercadería o servicio de responsabilidad del emisor. No se pueden tener ítems distintos de mercadería o servicio con el mismo código interno en su catastro de productos o servicios. Este código se puede repetir en el DE siempre que el producto o servicio sea el mismo.
   */
  codigoInterno: string;
  /**
   * E8 - E702 | dParAranc | Partida arancelaria | Pagina 85
   */
  partidaArancelaria?: number;
  /**
   * E8 - E703 | dNCM | Nomenclatura común del Mercosur (NCM) | Pagina 85
   */
  ncm?: number;
  /**
   * E8 - E704 | dDncpG | Código DNCP – Nivel General | Pagina 86
    *
    * Observaciones:
    *   Obligatorio si D202 = 3
    *   Informar se existe el código de la DNCP
    *   Colocar 0 (cero) a la izquierda para completar los espacios vacíos
   */
  codigoDncpGeneral?: string;
  /**
   * E8 - E705 | dDncpE | Código DNCP – Nivel Específico | Pagina 86
    * Observaciones: Obligatorio si existe el campo E704
   */
  codigoDncpEspecifico?: string;
  /**
   * E8 - E706 | dGtin | Código GTIN por producto | Pagina 86
    * Observaciones: Informar si la mercadería tiene GTIN
   */
  codigoGtinProducto?: number;
  /**
   * E8 - E707 | dGtinPq | Código GTIN por paquete | Pagina 86
    * Observaciones: Informar si el paquete tiene GTIN
   */
  codigoGtinPaquete?: number;
  /**
   * E8 - E708 | dDesProSer | Descripción del producto y/o servicio | Pagina 86
    * Observaciones: Equivalente a nombre del producto establecido en la RG 24/2019
   */
  descripcionProductoServicio: string;
  /**
   * E8 - E709 | cUniMed | Unidad de medida | Pagina 86
    *
    * Observaciones:
    *   Según Tabla 5 – Unidad de Medida
    *   Si D202 = 3 utilizar los datos del WS del link de la DNCP
    *   Utilizar el atributo “ID”
   */
  unidadMedida: LiteralUnion<UnidadMedida, number>;
  /**
   * E8 - E711 | dCantProSer | Cantidad del producto y/o servicio | Pagina 86
   */
  cantidadProductoServicio: Big;
  /**
   * E8 - E712 | cPaisOrig | Código del país de origen del producto | Pagina 86
    * Observaciones: Según XSD de Codificación de Países
   */
  paisOrigen?: LiteralUnion<CodigoPais, string>;
  /**
   * E8 - E714 | dInfItem | Información de interés del emisor con respecto al ítem | Pagina 86
   */
  informacionItem?: string;
  /**
   * E8 - E715 | cRelMerc | Código de datos de relevancia de las mercaderías | Pagina 86
    *
    * Observaciones:
    *   Opcional si C002 = 7
    *   1=Tolerancia de quiebra
    *   2= Tolerancia de merma
    *   Según RG 41/14
   */
  codigoDatosRelevanciaMercaderias?: LiteralUnion<CodigoDatosRelevanciaMercaderias, number>;
  /**
   * E8 - E717 | dCanQuiMer | Cantidad de quiebra o merma | Pagina 87
    *
    * Observaciones:
    *   Obligatorio si se informa E715
    *   Lo informado en este campo se encuentra en la unidad de medida elegida en E709
    *   Según RG 41/14
   */
  cantidadQuiebraMerma?: Big;
  /**
   * E8 - E718 | dPorQuiMer | Porcentaje de quiebra o merma | Pagina 87
    *
    * Observaciones:
    *   Obligatorio si se informa E715
    *   Según RG 41/14
   */
  porcentajeQuiebraMerma?: Big;
  /**
   * E8 - E719 | dCDCAnticipo | CDC del anticipo | Pagina 87
    * Observaciones: Obligatorio cuando se utilice una factura asociada con el tipo de transacción igual a Anticipo (D011 de la factura asociada igual a 9)
   */
  cdcAnticipo?: string;
  /**
   * E8.1 - E720 | gValorItem | Campos que describen los precios, descuentos y valor total por ítem | Pagina 87
    *
    * Observaciones:
    *   Obligatorio si C002 ≠ 7
    *   No informar si C002 = 7
   */
  valorItem?: ValorItem;
  /**
   * E8.2 - E730 | gCamIVA | Campos que describen el IVA de la operación por ítem | Pagina 89
    *
    * Observaciones:
    *   Obligatorio si D013=1, 3, 4 o 5 y C002 ≠ 4 o 7
    *   No informar si D013=2 y C002= 4 o 7
   */
  ivaItem?: IvaItem;
  /**
   * E8.4 - E750 | gRasMerc | Grupo de rastreo de la mercadería | Pagina 90
   */
  rastreoMercaderia?: RastreoMercaderia;
  /**
   * E8.5 - E770 | gVehNuevo | Grupo de detalle de vehículos nuevos | Pagina 91
   */
  vehiculoNuevo?: DetalleVehiculoNuevo;
}

/**
 * E8.1 - E720 | gValorItem | Campos que describen los precios, descuentos y valor total por ítem | Pagina 87
    *
    * Observaciones:
    *   Obligatorio si C002 ≠ 7
    *   No informar si C002 = 7
 */
export interface ValorItem {
  /**
   * E8.1 - E721 | dPUniProSer | Precio unitario del producto y/o servicio (incluidos impuestos) | Pagina 87
   */
  precioUnitario: Big;
  /**
   * E8.1 - E725 | dTiCamIt | Tipo de cambio por ítem | Pagina 87
    *
    * Observaciones:
    *   ~~Obligatorio si D015 ≠ PYG~~
    *   Obligatorio si D017 = 2
    *   No informar si D017 = 1
   */
  tipoCambioItem?: Big;
  /**
   * E8.1 - E727 | dTotBruOpeItem | Total bruto de la operación por ítem | Pagina 87
    * Observaciones: Corresponde a la multiplicación del precio por ítem (E721) y la cantidad por ítem (E711)
   */
  totalBrutoOperacionItem: Big;
  /**
   * E8.1.1 - EA001 | gValorRestaItem | Campos que describen descuentos, anticipos y valor total por ítem | Pagina 87
   */
  valorRestaItem: ValorRestaItem;
}

/**
 * E8.1.1 - EA001 | gValorRestaItem | Campos que describen descuentos, anticipos y valor total por ítem | Pagina 87
 */
export interface ValorRestaItem {
  /**
   * E8.1.1 - EA002 | dDescItem | Descuento particular sobre el precio unitario por ítem (incluidos impuestos) | Pagina 88
    * Observaciones: Si no hay descuento por ítem completar con 0 (cero)
   */
  descuentoParticularItem?: Big;
  /**
   * E8.1.1 - EA003 | dPorcDesIt | Porcentaje de descuento particular por ítem | Pagina 88
   *
   * Si no es proveido, es calculado internamente.
    *
    * Observaciones:
    *   Debe existir si EA002 es mayor a 0 (cero)
    *   [EA002 * 100 / E721]
   */
  porcentajeDescuentoItem?: Big;
  /**
   * E8.1.1 - EA004 | dDescGloItem | Descuento global sobre el precio unitario por ítem (incluidos impuestos) | Pagina 88
    * Observaciones: Si se cuenta con un descuento global, debe ser aplicado (no es prorrateo) a cada uno de los ítems, independientemente que un ítem cuente con un descuento particular.
   */
  descuentoGlobalItem?: Big;
  /**
   * E8.1.1 - EA006 | dAntPreUniIt | Anticipo particular sobre el precio unitario por ítem (incluidos impuestos) | Pagina 88
    *
    * Observaciones:
    *   Se debe informar en la misma denominación monetaria en la que se informó en la FE de anticipo asociada (D015 de la FE asociada)
    *   Si no hay anticipo por ítem completar con 0 (cero)
   */
  anticipoParticularItem?: Big;
  /**
   * E8.1.1 - EA007 | dAntGloPreUniIt | Anticipo global sobre el precio unitario por ítem (incluidos impuestos) | Pagina 88
    *
    * Observaciones:
    *   Si se cuenta con un anticipo global, debe ser aplicado a cada uno de los ítems, independientemente de que un ítem cuente con un anticipo particular.
    *   Si no hay anticipo global por ítem, completar con 0 (cero)
   */
  anticipoGlobalItem?: Big;
  /**
   * E8.1.1 - EA008 | dTotOpeItem | Valor total de la operación por ítem | Pagina 89
   *
   * Si no es proveido, es calculado internamente.
    *
    * Observaciones:
    *   Cálculo para IVA, Renta, ninguno, IVA - Renta
    *   Si D013 = 1, 3, 4 o 5 (afectado al IVA, Renta, ninguno, IVA - Renta), entonces EA008 corresponde al cálculo aritmético: (E721 (Precio unitario) – EA002 (Descuento particular) – EA004 (Descuento global) – EA006 (Anticipo particular) – EA007 (Anticipo global)) * E711(cantidad)
    *   Cálculo para Autofactura (C002=4):
    *   E721*E711
   */
  valorTotalOperacionItem: Big;
  /**
   * E8.1.1 - EA009 | dTotOpeGs | Valor total de la operación por ítem en guaraníes | Pagina 89
   *
   * Si no es proveido, es calculado internamente.
    *
    * Observaciones:
    *   Obligatorio si existe el campo E725
    *   Corresponde al cálculo aritmético EA008* E725
   */
  valorTotalOperacionItemGs?: Big;
}

/**
 * E8.2 - E730 | gCamIVA | Campos que describen el IVA de la operación por ítem | Pagina 89
    *
    * Observaciones:
    *   Obligatorio si D013=1, 3, 4 o 5 y C002 ≠ 4 o 7
    *   No informar si D013=2 y C002= 4 o 7
 */
export interface IvaItem {
  /**
   * E8.2 - E731 | iAfecIVA | Forma de afectación tributaria del IVA | Pagina 89
    *
    * Observaciones:
    *   1= Gravado IVA
    *   2= Exonerado (Art. 83- Ley 125/91)
    *   3= Exento
    *   4= Gravado parcial (Grav-Exento)
   */
  formaAfectacionTributariaIVA: LiteralUnion<FormaAfectacionTributariaIVA, number>;
  /**
   * E8.2 - E733 | dPropIVA | Proporción gravada de IVA | Pagina 90
    *
    * Observaciones:
    *   Corresponde al porcentaje (%) gravado
    *   Ejemplo:100, 50, 30, 0
   */
  proporcionGravadaIva: Big;
  /**
   * E8.2 - E734 | dTasaIVA | Tasa del IVA | Pagina 90
    *
    * Observaciones:
    *   Corresponde al porcentaje (%) de la tasa expresado en números enteros
    *   0 (para E731 = 2 o 3)
    *   5 (para E731 = 1 o 4)
    *   10 (para E731 = 1 o 4)
   */
  tasaIva: number;
  /**
   * E8.2 - E735 | dBasGravIVA | Base gravada del IVA por ítem | Pagina 90
   *
   * Si no es proveido, es calculado internamente.
    *
    * Observaciones:
    *   Si E731 = 1 o 4 este campo es igual al resultado del cálculo
    *   [EA008* (E733/100)] / 1,1 si la tasa es del 10%
    *   [EA008* (E733/100)] / 1,05 si la tasa es del 5%
    *   Si E731 = 2 o 3 este campo es igual 0
   */
  baseGravadaIvaItem: Big;
  /**
   * E8.2 - E736 | dLiqIVAItem | Liquidación del IVA por ítem | Pagina 90
   *
   * Si no es proveido, es calculado internamente.
    *
    * Observaciones:
    *   Corresponde al cálculo aritmético:
    *   E735 * (E734/100)
    *   Si E731 = 2 o 3 este campo es igual 0
   */
  liquidacionIvaItem: Big;
  /**
   * E8.2 - E737 | dBasExe | Base Exenta por Item | Pagina 1 NT-13
   *
   * Si no es proveido, es calculado internamente.
   */
  baseExenta: Big;
}

/**
 * E8.4 - E750 | gRasMerc | Grupo de rastreo de la mercadería | Pagina 90
 */
export interface RastreoMercaderia {
  /**
   * E8.4 - E751 | dNumLote | Número de lote | Pagina 90
    * Observaciones: Obligados por la RG N° 24/2019 – Agroquímicos
   */
  numeroLote?: string;
  /**
   * E8.4 - E752 | dVencMerc | Fecha de vencimiento de la mercadería | Pagina 91
   *
   * Formato: AAAA-MM-DD
    * Observaciones: Formato AAAA-MM-DD
   */
  fechaVencimientoMercaderia?: Date;
  /**
   * E8.4 - E753 | dNSerie | Número de serie | Pagina 91
   */
  numeroSerie?: string;
  /**
   * E8.4 - E754 | dNumPedi | Número de pedido | Pagina 91
   */
  numeroPedido?: string;
  /**
   * E9.4 - E755 | dNumSegui | Número de seguimiento del envío | Pagina 91
   */
  numeroSeguimientoEnvio?: string;
  /**
   * E8.4 - E759 | dNumReg | Número de registro del producto otorgado por el SENAVE | Pagina 91
    * Observaciones: Obligados por la RG N° 16/2019 y la RG N° 24/2019 – Agroquímicos
   */
  numeroRegistroProductoSenave?: string;
  /**
   * E8.4 - E760 | dNumRegEntCom | Número de registro de entidad comercial otorgado por el SENAVE | Pagina 91
    * Observaciones: Obligados por la RG N° 24/2019 – Agroquímicos
   */
  numeroRegistroEntidadComercialSenave?: string;
  /**
   * E8.4 - E761 | dNomPro | Nombre del producto | Pagina 2 NT-10
   */
  nombreProducto: string;
}

/**
 * E8.5 - E770 | gVehNuevo | Grupo de detalle de vehículos nuevos | Pagina 91
 */
export interface DetalleVehiculoNuevo {
  /**
   * E8.5 - E771 | iTipOpVN | Tipo de operación de venta de vehículos | Pagina 91
    *
    * Observaciones:
    *   1= Venta a representante
    *   2= Venta al consumidor final
    *   3= Venta a gobierno
    *   4= Venta a flota de vehículos
   */
  tipoOperacionVentaVehiculos?: LiteralUnion<TipoOperacionVentaVehiculos, number>;
  /**
   * E8.5 - E773 | dChasis | Chasis del vehículo | Pagina 92
   */
  chasisVehiculo?: string;
  /**
   * E8.5 - E774 | dColor | Color del vehículo | Pagina 92
   */
  colorVehiculo?: string;
  /**
   * E8.5 - E775 | dPotencia | Potencia del motor (CV) | Pagina 92
   */
  potenciaMotor?: number;
  /**
   * E8.5 - E776 | dCapMot | Capacidad del motor | Pagina 92
    * Observaciones: Expresa en centímetros cúbicos (cc)
   */
  capacidadMotor?: number;
  /**
   * E8.5 - E777 | dPNet | Peso Neto | Pagina 92
    * Observaciones: Toneladas
   */
  pesoNeto?: Big;
  /**
   * E8.5 - E778 | dPBruto | Peso Bruto | Pagina 92
    * Observaciones: Toneladas
   */
  pesoBruto?: Big;
  /**
   * E8.5 - E779 | iTipCom | Tipo de combustible | Pagina 92
    *
    * Observaciones:
    *   1= Gasolina
    *   2= Diésel
    *   3= Etanol
    *   4= GNV
    *   5= Flex
    *   9= Otro
   */
  tipoCombustible?: LiteralUnion<TipoCombustible, number>;
  /**
   * E8.5 - E781 | dNroMotor | Número del motor | Pagina 92
   */
  numeroMotor?: string;
  /**
   * E8.5 - E782 | dCapTracc | Capacidad máxima de tracción | Pagina 92
    * Observaciones: Toneladas
   */
  capacidadMaximaTraccion?: Big;
  /**
   * E8.5 - E783 | dAnoFab | Año de fabricación | Pagina 92
   */
  anoFabricacion?: number;
  /**
   * E8.5 - E784 | cTipVeh | Tipo de vehículo | Pagina 92
   */
  tipoVehiculo?: string;
  /**
   * E8.5 - E785 | dCapac | Capacidad máxima de pasajeros | Pagina 92
    * Observaciones: Capacidad máxima de pasajeros sentados
   */
  capacidadMaximaPasajeros?: number;
  /**
   * E8.5 - E786 | dCilin | Cilindradas del motor | Pagina 92
   */
  cilindradasMotor?: string;
}

/**
 * E9 - E790 | gCamEsp | Campos complementarios comerciales de uso específico | Pagina 93
 */
export interface UsoComercial {
  /**
   * E9.2 - E791 | gGrupEner | Grupo del sector de energía eléctrica | Pagina 93
   */
  sectorEnergiaElectrica?: SectorEnergiaElectrica;
  /**
   * E9.3 - E800 | gGrupSeg | Grupo del sector de seguros | Pagina 94
   */
  sectorSeguros?: SectorSeguros;
  /**
   * E9.4 - E810 | gGrupSup | Grupo del sector supermercados | Pagina 95
   */
  sectorSupermercados?: SectorSupermercados;
  /**
   * E9.5 - E820 | gGrupAdi | Grupo de datos adicionales de uso comercial | Pagina 95
   */
  datosAdicionalesUsoComercial?: DatosAdicionalesUsoComercial;
}

/**
 * E9.2 - E791 | gGrupEner | Grupo del sector de energía eléctrica | Pagina 93
 */
export interface SectorEnergiaElectrica {
  /**
   * E9.2 - E792 | dNroMed | Número de medidor | Pagina 93
   */
  numeroMedidor?: string;
  /**
   * E9.2 - E793 | dActiv | Código de actividad | Pagina 93
   */
  codigoActividad?: number;
  /**
   * E9.2 - E794 | dCateg | Código de categoría | Pagina 93
   */
  codigoCategoria?: string;
  /**
   * E9.2 - E795 | dLecAnt | Lectura anterior | Pagina 93
   */
  lecturaAnterior?: Big;
  /**
   * E9.2 - E796 | dLecAct | Lectura actual | Pagina 93
   */
  lecturaActual?: Big;
  /**
   * E9.2 - E797 | dConKwh | Consumo | Pagina 93
    * Observaciones: Corresponde a la diferencia entre E785-E784
   */
  consumoKwh?: Big;
}

/**
 * E9.3 - E800 | gGrupSeg | Grupo del sector de seguros | Pagina 94
 */
export interface SectorSeguros {
  /**
   * E9.3 - E801 | dCodEmpSeg | Código de la empresa de seguros en la Superintendencia de Seguros | Pagina 94
   */
  codigoEmpresaSeguros?: string;
  /**
   * E9.3.1 - EA790 | gGrupPolSeg | Grupo de póliza de seguros | Pagina 94
   */
  polizaSeguros?: PolizaSeguros[];
}

/**
 * E9.3.1 - EA790 | gGrupPolSeg | Grupo de póliza de seguros | Pagina 94
 */
export interface PolizaSeguros {
  /**
   * E9.3.1 - EA791 | dPoliza | Código de la póliza | Pagina 94
   */
  codigoPoliza: string;
  /**
   * E9.3.1 - EA792 | dUnidVig | Descripción de la unidad de tiempo de vigencia | Pagina 94
    * Observaciones: Ejemplo: hora, día, mes, año
   */
  unidadVigencia: string;
  /**
   * E9.3.1 - EA793 | dVigencia | Vigencia de la póliza | Pagina 94
   */
  vigenciaPoliza: Big;
  /**
   * E9.3.1 - EA794 | dNumPoliza | Número de la póliza | Pagina 94
   */
  numeroPoliza: string;
  /**
   * E9.3.1 - EA795 | dFecIniVig | Fecha de inicio de vigencia | Pagina 94
   *
   * Formato: AAAA-MM-DDThh:mm:ss
    * Observaciones: Según el formato AAAA-MM-DDThh:mm:ss
   */
  fechaInicioVigencia?: Date;
  /**
   * E9.3.1 - EA796 | dFecFinVig | Fecha de fin de vigencia | Pagina 94
   *
   * Formato: AAAA-MM-DDThh:mm:ss
    * Observaciones: Según el formato AAAA-MM-DDThh:mm:ss
   */
  fechaFinVigencia?: Date;
  /**
   * E9.3.1 - EA797 | dCodInt | Código interno del ítem | Pagina 94
    * Observaciones: Como referencia al campo E701, si desea asociar la póliza al ítem
   */
  codigoInternoItem?: string;
}

/**
 * E9.4 - E810 | gGrupSup | Grupo del sector supermercados | Pagina 95
 */
export interface SectorSupermercados {
  /**
   * E9.4 - E811 | dNomCaj | Nombre del cajero | Pagina 95
   */
  nombreCajero?: string;
  /**
   * E9.4 - E812 | dEfectivo | Efectivo | Pagina 95
   */
  efectivo?: Big;
  /**
   * E9.4 - E813 | dVuelto | Vuelto | Pagina 95
   */
  vuelto?: Big;
  /**
   * E9.4 - E814 | dDonac | Monto de la donación | Pagina 95
   */
  montoDonacion?: Big;
  /**
   * E9.4 - E815 | dDesDonac | Descripción de la donación | Pagina 95
   */
  descripcionDonacion?: string;
}

/**
 * E9.5 - E820 | gGrupAdi | Grupo de datos adicionales de uso comercial | Pagina 95
 */
export interface DatosAdicionalesUsoComercial {
  /**
   * E9.5 - E821 | dCiclo | Ciclo | Pagina 95
   */
  ciclo?: string;
  /**
   * E9.5 - E822 | dFecIniC | Fecha de inicio de ciclo | Pagina 95
   *
   * Formato: AAAA-MM-DD
    *
    * Observaciones:
    *   Obligatorio si se informa el campo E811
    *   No completar si no se informa el campo E811
    *   Formato AAAA-MM-DD
   */
  fechaInicioCiclo?: Date;
  /**
   * E9.5 - E823 | dFecFinC | Fecha de fin de ciclo | Pagina 95
   *
   * Formato: AAAA-MM-DD
    *
    * Observaciones:
    *   Obligatorio si se informa el campo E812
    *   No completar si no se informa el campo E812
    *   Formato AAAA-MM-DD
   */
  fechaFinCiclo?: Date;
  /**
   * E9.5 - E824 | dVencPag | Fecha de vencimiento para el pago | Pagina 95
   *
   * Formato: AAAA-MM-DD
    * Observaciones: Formato AAAA-MM-DD
   */
  vencimientoPago?: Date[];
  /**
   * E9.5 - E825 | dContrato | Número de contrato | Pagina 96
   */
  numeroContrato?: string;
  /**
   * E9.5 - E826 | dSalAnt | Saldo anterior | Pagina 96
    * Observaciones: Monto del saldo anterior
   */
  saldoAnterior?: Big;
  /**
   * E9.5 - E827 | dCodConDncp | Codigo de contratacion de la DNCP | Pagina 1 NT-20
   */
  codigoContratacionDNCP?: number;
}

/**
 * E10 - E900 | gTransp | Campos que describen el transporte de mercaderías | Pagina 95
    *
    * Observaciones:
    *   Obligatorio si C002 = 7
    *   Opcional si C002 = 1
    *   No informar si C002= 4, 5, 6
 */
export interface Transporte {
  /**
   * E10 - E901 | iTipTrans | Tipo de transporte | Pagina 96
    *
    * Observaciones:
    *   Obligatorio si C002 = 7
    *   1= Propio
    *   2= Tercero
   */
  tipoTransporte?: LiteralUnion<TipoTransporte, number>;
  /**
   * E10 - E903 | iModTrans | Modalidad del transporte | Pagina 96
    *
    * Observaciones:
    *   1=Terrestre
    *   2= Fluvial
    *   3= Aéreo
    *   4= Multimodal
   */
  modalidadTransporte: LiteralUnion<ModalidadTransporte, number>;
  /**
   * E10 - E905 | iRespFlete | Responsable del costo del flete | Pagina 96
    *
    * Observaciones:
    *   1= Emisor de la Factura Electrónica
    *   2= Receptor de la Factura Electrónica
    *   3= Tercero
    *   4= Agente intermediario del transporte (cuando intervenga)
    *   5= Transporte propio
   */
  responsableCostoFlete: LiteralUnion<ResponsableCostoFlete, number>;
  /**
   * E10 - E906 | cCondNeg | Condición de la negociación | Pagina 96
    * Observaciones: Según Tabla 10 - Incoterms
   */
  condicionNegociacion?: LiteralUnion<CondicionNegociacion, string>;
  /**
   * E10 - E907 | dNuManif | Número de manifiesto o conocimiento de carga | Pagina 97
    * Observaciones: Campo abierto para informar la numeración de cualquiera de las opciones descriptas
   */
  numeroManifiestoCarga?: string;
  /**
   * E10 - E908 | dNuDespImp | Número de despacho de importación | Pagina 97
    * Observaciones: Obligatorio si E501 = 5
   */
  numeroDespachoImportacion?: string;
  /**
   * E10 - E909 | dIniTras | Fecha estimada de inicio de traslado | Pagina 97
   *
   * Formato: AAAA-MM-DD
    *
    * Observaciones:
    *   Obligatorio si C002 = 7
    *   Opcional si C002 = 1
    *   Fecha en el formato: AAAA-MM-DD
   */
  inicioEstimadoTraslado?: Date;
  /**
   * E10 - E910 | dFinTras | Fecha estimada de fin de traslado | Pagina 97
   *
   * Formato: AAAA-MM-DD
    *
    * Observaciones:
    *   Obligatorio si existe el campo E909
    *   Fecha en el formato: AAAA-MM-DD
   */
  finEstimadoTraslado?: Date;
  /**
   * E10 - E911 | cPaisDest | Código del país de destino | Pagina 97
    * Observaciones: Según XSD de Codificación de Países
   */
  paisDestino?: LiteralUnion<CodigoPais, string>;
  /**
   * E10.1 - E920 | gCamSal | Campos que identifican el local de salida de las mercaderías | Pagina 97
    *
    * Observaciones:
    *   Obligatorio si C002 = 7
    *   Opcional si C002 = 1
    *   No informar si C002 = 4, 5, 6
   */
  localSalidaMercaderias?: LocalSalidaMercaderias;
  /**
   * E10.2 - E940 | gCamEnt | Campos que identifican el local de entrega de las mercaderías | Pagina 98
    *
    * Observaciones:
    *   Obligatorio si C002 = 7
    *   No informar si C002 = 4, 5, 6
   */
  localesEntregaMercaderias?: LocalEntregaMercaderias[];
  /**
   * E10.3 - E960 | gVehTras | Campos que identifican el vehículo de traslado de mercaderías | Pagina 98
    *
    * Observaciones:
    *   Obligatorio si C002 = 7
    *   No informar si C002 = 4, 5, 6
   */
  vehiculosTrasladoMercaderias?: VehiculoTrasladoMercaderias[];
  /**
   * E10.4 - E980 | gCamTrans | Campos que identifican al transportista | Pagina 100
   *
    *
    * Observaciones:
    *   Obligatorio si C002 = 7
    *   No informar si C002 = 4, 5, 6
    *   Opcional cuando E903=1 y E967=1
   */
  transportista?: Transportista;
}

/**
 * E10.1 - E920 | gCamSal | Campos que identifican el local de salida de las mercaderías | Pagina 97
    *
    * Observaciones:
    *   Obligatorio si C002 = 7
    *   Opcional si C002 = 1
    *   No informar si C002 = 4, 5, 6
 */
export interface LocalSalidaMercaderias {
  /**
   * E10.1 - E921 | dDirLocSal | Dirección del local de salida | Pagina 97
    * Observaciones: Nombre de la calle principal
   */
  direccionLocalSalida: string;
  /**
   * E10.1 - E922 | dNumCasSal | Número de casa de salida | Pagina 97
    * Observaciones: Si no tiene numeración, colocar 0 (cero)
   */
  numeroCasaSalida: number;
  /**
   * E10.1 - E923 | dComp1Sal | Complemento de dirección 1 salida | Pagina 97
    * Observaciones: Nombre de la calle secundaria
   */
  complementoDireccion1Salida?: string;
  /**
   * E10.1 - E924 | dComp2Sal | Complemento de dirección 2 salida | Pagina 98
    *
    * Observaciones:
    *   Número de departamento/ piso/
    *   local/ edificio/ deposito del local
    *   de salida de la mercadería
   */
  complementoDireccion2Salida?: string;
  /**
   * E10.1 - E925 | cDepSal | Código del departamento de salida | Pagina 98
    * Observaciones: Según XSD de Departamentos
   */
  departamentoSalida?: LiteralUnion<CodigoDepartamento, number>;
  /**
   * E10.1 - E927 | cDisSal | Código del distrito de salida | Pagina 98
    * Observaciones: Según Tabla 2.1 - Distritos
   */
  distritoSalida?: LiteralUnion<CodigoDistrito, number>;
  /**
   * E10.1 - E929 | cCiuSal | Código de la ciudad de salida | Pagina 98
    * Observaciones: Según Tabla 2.2 – Ciudades
   */
  ciudadSalida?: LiteralUnion<CodigoCiudad, number>;
  /**
   * E10.1 - E931 | dTelSal | Teléfono del local de salida | Pagina 98
   */
  telefonoLocalSalida?: string;
}

/**
 * E10.2 - E940 | gCamEnt | Campos que identifican el local de entrega de las mercaderías | Pagina 98
    *
    * Observaciones:
    *   Obligatorio si C002 = 7
    *   No informar si C002 = 4, 5, 6
 */
export interface LocalEntregaMercaderias {
  /**
   * E10.2 - E941 | dDirLocEnt | Dirección del local de entrega | Pagina 98
    * Observaciones: Nombre de la calle principal
   */
  direccionLocalEntrega: string;
  /**
   * E10.2 - E942 | dNumCasEnt | Número de casa de entrega | Pagina 98
    * Observaciones: Si no tiene numeración, colocar 0 (cero)
   */
  numeroCasaEntrega: number;
  /**
   * E10.2 - E943 | dComp1Ent | Complemento de dirección 1 entrega | Pagina 99
    * Observaciones: Nombre de la calle secundaria
   */
  complementoDireccion1Entrega?: string;
  /**
   * E10.2 - E944 | dComp2Ent | Complemento de dirección 2 entrega | Pagina 99
    *
    * Observaciones:
    *   Número de departamento/ piso/
    *   local/ edificio/ deposito del local
    *   de entrega de la mercadería
   */
  complementoDireccion2Entrega?: string;
  /**
   * E10.2 - E945 | cDepEnt | Código del departamento de entrega | Pagina 99
    * Observaciones: Según XSD de Departamentos
   */
  departamentoEntrega: LiteralUnion<CodigoDepartamento, number>;
  /**
   * E10.2 - E947 | cDisEnt | Código del distrito de entrega | Pagina 99
    * Observaciones: Según Tabla 2.1 - Distritos
   */
  distritoEntrega?: LiteralUnion<CodigoDistrito, number>;
  /**
   * E10.2 - E949 | cCiuEnt | Código de la ciudad de entrega | Pagina 99
    * Observaciones: Según Tabla 2.2 – Ciudades
   */
  ciudadEntrega: LiteralUnion<CodigoCiudad, number>;
  /**
   * E10.2 - E951 | dTelEnt | Teléfono del local de entrega | Pagina 99
   */
  telefonoLocalEntrega?: string;
}

/**
 * E10.3 - E960 | gVehTras | Campos que identifican el vehículo de traslado de mercaderías | Pagina 100
    *
    * Observaciones:
    *   Obligatorio si C002 = 7
    *   No informar si C002 = 4, 5, 6
 */
export interface VehiculoTrasladoMercaderias {
  /**
   * E10.3 - E961 | dTiVehTras | Tipo de vehículo | Pagina 100
    * Observaciones: Debe ser acorde al campo E903
   */
  tipoVehiculo: string;
  /**
   * E10.3 - E962 | dMarVeh | Marca del vehículo | Pagina 100
   */
  marcaVehiculo: string;
  /**
   * E10.3 - E967 | dTipIdenVeh | Tipo de Identificación del vehículo | Pagina 100
    *
    * Observaciones:
    *   1=Número de identificación del vehículo
    *   2=Número de matrícula del vehículo
   */
  tipoIdentificacionVehiculo: LiteralUnion<TipoIdentificacionVehiculo, number>;
  /**
   * E10.3 - E963 | dNroIDVeh | Número de identificación del vehículo | Pagina 100
    * Observaciones: Debe informarse cuando el E967=1
   */
  numeroIdentificacionVehiculo?: string;
  /**
   * E10.3 - E964 | dAdicVeh | Datos adicionales del vehículo | Pagina 100
   */
  datosAdicionalesVehiculo?: string;
  /**
   * E10.3 - E965 | dNroMatVeh | Número de matrícula del vehiculo | Pagina 100
    * Observaciones: Debe informarse cuando el E967=2
   */
  numeroMatriculaVehiculo?: string;
  /**
   * E10.3 - E966 | dNroVuelo | Número de vuelo | Pagina 100
    *
    * Observaciones:
    *   Obligatorio si E903 = 3
    *   No informar si E903 ≠ 3
   */
  numeroVuelo?: string;
}

/**
 * E10.4 - E980 | gCamTrans | Campos que identifican al transportista | Pagina 99
    *
    * Observaciones:
    *   Obligatorio si C002 = 7
    *   No informar si C002 = 4, 5, 6
    *   Opcional cuando E903=1 y E967=1
 */
export interface Transportista {
  /**
   * E10.4 - E981 | iNatTrans | Naturaleza del transportista | Pagina 100
    *
    * Observaciones:
    *   1= Contribuyente
    *   2= No contribuyente
   */
  naturalezaTransportista: LiteralUnion<NaturalezaTransportista, number>;
  /**
   * E10.4 - E982 | dNomTrans | Nombre o razón social del transportista | Pagina 100
   */
  nombreTransportista: string;
  /**
   * E10.4 - E983 | dRucTrans | RUC del transportista | Pagina 100
    *
    * Observaciones:
    *   Obligatorio si E981 = 1
    *   No informar si E981 ≠ 1
   */
  rucTransportista?: string;
  /**
   * E10.4 - E984 | dDVTrans | Dígito verificador del RUC del transportista | Pagina 101
   *
   * Si no es proveido, es calculado internamente.
    *
    * Observaciones:
    *   Obligatorio si existe el campo E983
    *   Según algoritmo módulo 11
   */
  digitoVerificadorRucTransportista?: number;
  /**
   * E10.4 - E985 | iTipIDTrans | Tipo de documento de identidad del transportista | Pagina 101
    *
    * Observaciones:
    *   Obligatorio si E981 = 2
    *   No informar si E981 = 1
    *   1= Cédula paraguaya
    *   2= Pasaporte
    *   3= Cédula extranjera
    *   4= Carnet de residencia
   */
  tipoDocumentoIdentidadTransportista?: LiteralUnion<TipoDocumentoTransportista, number>;
  /**
   * E10.4 - E987 | dNumIDTrans | Número de documento de identidad del transportista | Pagina 101
    * Observaciones: Obligatorio si existe el campo E985
   */
  numeroDocumentoIdentidadTransportista?: string;
  /**
   * E10.4 - E988 | cNacTrans | Nacionalidad del transportista | Pagina 101
    * Observaciones: Según XSD de Codificación de Países
   */
  nacionalidadTransportista?: LiteralUnion<CodigoPais, string>;
  /**
   * E10.4 - E990 | dNumIDChof | Número de documento de identidad del chofer | Pagina 101
   */
  numeroDocumentoIdentidadChofer: string;
  /**
   * E10.4 - E991 | dNomChof | Nombre y apellido del chofer | Pagina 101
   */
  nombreChofer: string;
  /**
   * E10.4 - E992 | dDomFisc | Domicilio fiscal del transportista | Pagina 101
   */
  domicilioFiscalTransportista: string;
  /**
   * E10.4 - E993 | dDirChof | Dirección del chofer | Pagina 101
   */
  direccionChofer: string;
  /**
   * E10.4 - E994 | dNombAg | Nombre o razón social del agente | Pagina 101
    * Observaciones: Casos particulares según RG N° 41/14
   */
  nombreAgente?: string;
  /**
   * E10.4 - E995 | dRucAg | RUC del agente | Pagina 101
    * Observaciones: Casos particulares según RG N° 41/14
   */
  rucAgente?: string;
  /**
   * E10.4 - E996 | dDVAg | Dígito verificador del RUC del agente | Pagina 102
   *
   * Si no es proveido, es calculado internamente.
    *
    * Observaciones:
    *   Casos particulares según RG N° 41/14
    *   Según algoritmo módulo 11
   */
  digitoVerificadorRucAgente?: string;
  /**
   * E10.4 - E997 | dDirAge | Dirección del agente | Pagina 102
    * Observaciones: Casos particulares según RG N° 41/14
   */
  direccionAgente?: string;
}
