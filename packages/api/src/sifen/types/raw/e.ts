import type { CodigoCiudad, DescripcionCodigoCiudad } from '../../../gen/ciudades';
import type { CodigoDepartamento, DescripcionCodigoDepartamento } from '../../../gen/departamentos';
import type { CodigoDistrito, DescripcionCodigoDistrito } from '../../../gen/distritos';
import type { CodigoMoneda, DescripcionCodigoMoneda } from '../../../gen/monedas';
import type { CodigoPais, DescripcionCodigoPais } from '../../../gen/paises';
import type {
  CodigoDatosRelevanciaMercaderias,
  CondicionNegociacion,
  CondicionOperacionCredito,
  CondicionOperacionEnum,
  DenominacionTarjeta,
  DescripcionCodigoDatosRelevanciaMercaderias,
  DescripcionCondicionOperacionCredito,
  DescripcionCondicionOperacionEnum,
  DescripcionDenominacionTarjeta,
  DescripcionFormaAfectacionTributariaIVA,
  DescripcionIndicadorPresencia,
  DescripcionModalidadTransporte,
  DescripcionMotivoEmision,
  DescripcionMotivoEmisionNotaRemision,
  DescripcionNaturalezaVendedor,
  DescripcionResponsableEmisionNotaRemision,
  DescripcionTipoCombustible,
  DescripcionTipoDocumentoTransportista,
  DescripcionTipoDocumentoVendedor,
  DescripcionTipoOperacionVentaVehiculos,
  DescripcionTipoPago,
  DescripcionTipoTransporte,
  DescripcionUnidadMedida,
  FormaAfectacionTributariaIVA,
  FormaProcesamientoPago,
  IndicadorPresencia,
  ModalidadTransporte,
  MotivoEmision,
  MotivoEmisionNotaRemision,
  NaturalezaTransportista,
  NaturalezaVendedor,
  ResponsableCostoFlete,
  ResponsableEmisionNotaRemision,
  TipoCombustible,
  TipoDocumentoTransportista,
  TipoDocumentoVendedor,
  TipoIdentificacionVehiculo,
  TipoOperacionVentaVehiculos,
  TipoPago,
  TipoTransporte,
  UnidadMedida
} from '../enums';

/**
 * E1 - E010 | Campos que componen la FE | Pagina 73
 *
 * Observaciones:
 *   Obligatorio si C002 = 1
 *   No informar si C002 ≠ 1
 */
export interface GCamFE {
  /**
   * E1 - E011 | Indicador de presencia | Pagina 74
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
  iIndPres: IndicadorPresencia;
  /**
   * E1 - E012 | Descripción del indicador de presencia | Pagina 74
   *
   * Observaciones:
   *   Referente al campo E011
   *   1= “Operación presencial”
   *   2= “Operación electrónica”
   *   3= “Operación telemarketing”
   *   4= “Venta a domicilio”
   *   5= “Operación bancaria”
   *   6=” Operación cíclica”
   *   Si E011 = 9 informar el indicador de presencia
   */
  dDesIndPres: DescripcionIndicadorPresencia;
  /**
   * E1 - E013 | Fecha futura del traslado de mercadería | Pagina 74
   *
   * Formato: AAAA-MM-DD
   *
   * Observaciones:
   *   Fecha en el formato: AAAA-MM-DD
   *   Fecha estimada para el traslado de la mercadería y emisión de la nota de remisión electrónica cuando corresponda. RG 41/14
   */
  dFecEmNR?: string;
  /**
   * E1.1 - E020 | Campos que describen las informaciones de compras públicas | Pagina 74
   * Observaciones: Obligatorio si D202 = 3 (Tipo de operación B2G)
   */
  gCompPub?: GCompPub;
}

/**
 * E1.1 - E020 | Campos que describen las informaciones de compras públicas | Pagina 74
 * Observaciones: Obligatorio si D202 = 3 (Tipo de operación B2G)
 */
export interface GCompPub {
  /**
   * E1.1 - E021 | Modalidad - Código emitido por la DNCP | Pagina 74
   */
  dModCont: string;
  /**
   * E1.1 - E022 | Entidad - Código emitido por la DNCP | Pagina 74
   */
  dEntCont: number;
  /**
   * E1.1 - E023 | Año - Código emitido por la DNCP | Pagina 74
   */
  dAnoCont: number;
  /**
   * E1.1 - E024 | Secuencia - emitido por la DNCP | Pagina 74
   */
  dSecCont: number;
  /**
   * E1.1 - E025 | Fecha de emisión del código de contratación por la DNCP | Pagina 75
   *
   * Formato: AAAA-MM-DD
   *
   * Observaciones:
   *   Fecha en el formato: AAAA-MM-DD.
   *   Esta fecha debe ser anterior a la fecha de emisión de la FE
   */
  dFeCodCont: string;
}

/**
 * E4 - E300 | Campos que componen la Autofactura Electrónica | Pagina 75
 *
 * Observaciones:
 *   Obligatorio si C002 = 4
 *   No informar si C002 ≠ 4
 */
export interface GCamAE {
  /**
   * E4 - E301 | Naturaleza del vendedor | Pagina 75
   *
   * Observaciones:
   *   1= No contribuyente
   *   2= Extranjero
   */
  iNatVen: NaturalezaVendedor;
  /**
   * E4 - E302 | Descripción de la naturaleza del vendedor | Pagina 75
   *
   * Observaciones:
   *   Referente al campo E301.
   *   1= “No contribuyente”
   *   2= “Extranjero”
   */
  dDesNatVen: DescripcionNaturalezaVendedor;
  /**
   * E4 - E304 | Tipo de documento de identidad del vendedor | Pagina 75
   *
   * Observaciones:
   *   1= Cédula paraguaya
   *   2= Pasaporte
   *   3= Cédula extranjera
   *   4= Carnet de residencia
   */
  iTipIDVen: TipoDocumentoVendedor;
  /**
   * E4 - E305 | Descripción del tipo de documento de identidad del vendedor | Pagina 75
   *
   * Observaciones:
   *   Referente al campo E304
   *   1= “Cédula paraguaya”
   *   2= “Pasaporte”
   *   3= “Cédula extranjera”
   *   4= “Carnet de residencia”
   */
  dDTipIDVen: DescripcionTipoDocumentoVendedor;
  /**
   * E4 - E306 | Número de documento de identidad del vendedor | Pagina 75
   */
  dNumIDVen: string;
  /**
   * E4 - E307 | Nombre y apellido del vendedor | Pagina 75
   */
  dNomVen: string;
  /**
   * E4 - E308 | Dirección del vendedor | Pagina 75
   *
   * Observaciones:
   *   En caso de extranjeros, colocar la dirección en donde se realizó la transacción.
   *   Nombre de la calle principal
   */
  dDirVen: string;
  /**
   * E4 - E309 | Número de casa del vendedor | Pagina 75
   * Observaciones: Si no tiene numeración colocar 0 (cero)
   */
  dNumCasVen: number;
  /**
   * E4 - E310 | Código del departamento del vendedor | Pagina 76
   *
   * Observaciones:
   *   En caso de extranjeros, colocar el departamento en donde se realizó la transacción.
   *   Según XSD de Departamentos
   */
  cDepVen: CodigoDepartamento;
  /**
   * E4 - E311 | Descripción del departamento del vendedor | Pagina 76
   * Observaciones: Referente al campo E310
   */
  dDesDepVen: DescripcionCodigoDepartamento;
  /**
   * E4 - E312 | Código del distrito del vendedor | Pagina 76
   *
   * Observaciones:
   *   En caso de extranjeros, colocar el distrito en donde se realizó la transacción.
   *   Según Tabla 2.1 - Distritos
   */
  cDisVen?: CodigoDistrito;
  /**
   * E4 - E313 | Descripción del distrito del vendedor | Pagina 76
   * Observaciones: Obligatorio si existe el campo E312
   */
  dDesDisVen?: DescripcionCodigoDistrito;
  /**
   * E4 - E314 | Código de la ciudad del vendedor | Pagina 76
   *
   * Observaciones:
   *   En caso de extranjeros, colocar la ciudad en donde se realizó la transacción.
   *   Según Tabla 2.2 - Ciudades
   */
  cCiuVen: CodigoCiudad;
  /**
   * E4 - E315 | Descripción de la ciudad del vendedor | Pagina 76
   * Observaciones: Referente al campo E314
   */
  dDesCiuVen: DescripcionCodigoCiudad;
  /**
   * E4 - E316 | Lugar de la transacción | Pagina 76
   * Observaciones: Nombre de la calle principal (Dirección donde se provee el servicio o producto)
   */
  dDirProv: string;
  /**
   * E4 - E317 | Código del departamento donde se realiza la transacción | Pagina 76
   * Observaciones: Según XSD de Departamentos
   */
  cDepProv: CodigoDepartamento;
  /**
   * E4 - E318 | Descripción del departamento donde se realiza la transacción | Pagina 76
   * Observaciones: Referente al campo E317
   */
  dDesDepProv: DescripcionCodigoDepartamento;
  /**
   * E4 - E319 | Código del distrito donde se realiza la transacción | Pagina 76
   * Observaciones: Según Tabla 2.1 - Distritos
   */
  cDisProv?: CodigoDistrito;
  /**
   * E4 - E320 | Descripción del distrito donde se realiza la transacción | Pagina 76
   * Observaciones: Obligatorio si existe el campo E319
   */
  dDesDisProv?: DescripcionCodigoDistrito;
  /**
   * E4 - E321 | Código de la ciudad donde se realiza la transacción | Pagina 76
   * Observaciones: Según Tabla 2.2 - Ciudades
   */
  cCiuProv: CodigoCiudad;
  /**
   * E4 - E322 | Descripción de la ciudad donde se realiza la transacción | Pagina 76
   * Observaciones: Referente al campo E321
   */
  dDesCiuProv: DescripcionCodigoCiudad;
}

/**
 * E5 - E400 | Campos de la Nota de Crédito/Débito Electrónica | Pagina 77
 *
 * Observaciones:
 *   Obligatorio si C002 = 5 o 6 (NCE y NDE)
 *   No informar si C002 ≠ 5 o 6
 */
export interface GCamNCDE {
  /**
   * E5 - E401 | Motivo de emisión | Pagina 77
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
  iMotEmi: MotivoEmision;
  /**
   * E5 - E402 | Descripción del motivo de emisión | Pagina 77
   *
   * Observaciones:
   *   Referente al campo E401
   *   1= “Devolución y Ajuste de precios”
   *   2= “Devolución”
   *   3= “Descuento”
   *   4= “Bonificación”
   *   5= “Crédito incobrable”
   *   6= “Recupero de costo”
   *   7= “Recupero de gasto”
   *   8= “Ajuste de precio”
   */
  dDesMotEmi: DescripcionMotivoEmision;
}

/**
 * E5 - E500 | Campos que componen la Nota de Remisión Electrónica | Pagina 77
 *
 * Observaciones:
 *   Obligatorio si C002 = 7
 *   No informar si C002 ≠ 7
 */
export interface GCamNRE {
  /**
   * E6 - E501 | Motivo de emisión | Pagina 78
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
  iMotEmiNR: MotivoEmisionNotaRemision;
  /**
   * E6 - E502 | Descripción del motivo de emisión | Pagina 79
   *
   * Observaciones:
   *   Referente al campo E501
   *   1= “Traslado por ventas”
   *   2= “Traslado por consignación”
   *   3= “Exportación”
   *   4= “Traslado por compra”
   *   5= “Importación”
   *   6= “Traslado por devolución”
   *   7= “Traslado entre locales de la empresa”
   *   8= “Traslado de bienes por transformación”
   *   9= “Traslado de bienes por reparación”
   *   10= “Traslado por emisor móvil”
   *   11= “Exhibición o Demostración”
   *   12= “Participación en ferias”
   *   13= “Traslado de encomienda”
   *   14= “Decomiso”
   *   Si E501=99 describir el motivo de la emisión
   */
  dDesMotEmiNR: DescripcionMotivoEmisionNotaRemision;
  /**
   * E6 - E503 | Responsable de la emisión de la Nota Remisión Electrónica | Pagina 79
   *
   * Observaciones:
   *   1= Emisor de la factura
   *   2= Poseedor de la factura y bienes
   *   3= Empresa transportista
   *   4=Despachante de Aduanas
   *   5= Agente de transporte o intermediario
   */
  iRespEmiNR: ResponsableEmisionNotaRemision;
  /**
   * E6 - E504 | Descripción del responsable de la emisión de la Nota de Remisión Electrónica | Pagina 79
   *
   * Observaciones:
   *   1= “Emisor de la factura”
   *   2= “Poseedor de la factura y bienes”
   *   3= “Empresa transportista”
   *   4= “Despachante de Aduanas”
   *   5= “Agente de transporte o intermediario”
   */
  dDesRespEmiNR: DescripcionResponsableEmisionNotaRemision;
  /**
   * E6 - E505 | Kilómetros estimados de recorrido | Pagina 79
   */
  dKmR: number;
  /**
   * E6 - E506 | Fecha futura de emisión de la factura | Pagina 79
   *
   *Formato: AAAA-MM-DD
   *
   * Observaciones:
   *   Fecha en el formato AAAA-MM-DD
   *   Obs.: Informar cuando no se ha emitido aún la factura electrónica, en caso que corresponda
   */
  dFecEm?: string;
  /**
   * E6 - E507 | Costo del Flete | Pagina 3 NT-10
   */
  cPreFle?: number;
}

/**
 * E7 - E600 | Campos que describen la condición de la operación | Pagina 80
 *
 * Observaciones:
 *   Obligatorio si C002 = 1 o 4
 *   No informar si C002 ≠ 1 o 4
 */
export interface GCamCond {
  /**
   * E7 - E601 | Condición de la operación | Pagina 80
   *
   * Observaciones:
   *   1= Contado
   *   2= Crédito
   */
  iCondOpe: CondicionOperacionEnum;
  /**
   * E7 - E602 | Descripción de la condición de operación | Pagina 80
   *
   * Observaciones:
   *   Referente al campo E601
   *   1= “Contado”
   *   2= “Crédito”
   */
  dDCondOpe: DescripcionCondicionOperacionEnum;
  /**
   * E7.1 - E605 | Campos que describen la forma de pago al contado o del monto de la entrega inicial | Pagina 80
   *
   * Observaciones:
   *   Obligatorio si E601 = 1
   *   Obligatorio si existe el campo E645
   */
  gPaConEIni?: GPaConEIni[];
  /**
   * E7.2 - E640 | Campos que describen la operación a crédito | Pagina 84
   *
   * Observaciones:
   *   Obligatorio si E601 = 2
   *   No informar si E601 ≠ 2
   */
  gPagCred?: GPagCred;
}

/**
 * E7.1 - E605 | Campos que describen la forma de pago al contado o del monto de la entrega inicial | Pagina 80
 *
 * Observaciones:
 *   Obligatorio si E601 = 1
 *   Obligatorio si existe el campo E645
 */
export interface GPaConEIni {
  /**
   * E7.1 - E606 | Tipo de pago | Pagina 81
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
  iTiPago: TipoPago;
  /**
   * E7.1 - E607 | Descripción del tipo de pago | Pagina 82
   *
   * Observaciones:
   *   Referente al campo E606
   *   1= “Efectivo”
   *   2= “Cheque”
   *   3= “Tarjeta de crédito”
   *   4= “Tarjeta de débito”
   *   5= “Transferencia”
   *   6= “Giro”
   *   7= “Billetera electrónica”
   *   8= “Tarjeta empresarial”
   *   9= “Vale”
   *   10= “Retención”
   *   11= “Pago por anticipo”
   *   12= “Valor fiscal”
   *   13= “Valor comercial”
   *   14= “Compensación”
   *   15= “Permuta”.
   *   16= “Pago bancario”
   *   17= “Pago Móvil”
   *   18 = “Donación”
   *   19 = “Promoción”
   *   20 = “Consumo Interno”
   *   21 = “Pago Electrónico”
   *   Si E606 = 99, informar el tipo de pago
   */
  dDesTiPag: DescripcionTipoPago;
  /**
   * E7.1 - E608 | Monto por tipo de pago | Pagina 82
   */
  dMonTiPag: string;
  /**
   * E7.1 - E609 | Moneda por tipo de pago | Pagina 82
   *
   * Observaciones:
   *   Según tabla de códigos para monedas de acuerdo con la norma ISO 4217
   *   Se requiere la misma moneda para todos los ítems del DE
   */
  cMoneTiPag: CodigoMoneda;
  /**
   * E7.1 - E610 | Descripción de la moneda por tipo de pago | Pagina 82
   * Observaciones: Referente al campo E609
   */
  dDMoneTiPag: DescripcionCodigoMoneda;
  /**
   * E7.1 - E611 | Tipo de cambio por tipo de pago | Pagina 82
   * Observaciones: Obligatorio si E609 ≠ PYG
   */
  dTiCamTiPag?: string;
  /**
   * E7.1.1 - E620 | Campos que describen el pago o entrega inicial de la operación con tarjeta de crédito/débito | Pagina 83
   * Observaciones: Se activa si E606 = 3 o 4
   */
  gPagTarCD?: GPagTarCD;
  /**
   * E7.1.2 - E630 | Campos que describen el pago o entrega inicial de la operación con cheque | Pagina 84
   * Observaciones: Se activa si E606 = 2
   */
  gPagCheq?: GPagCheq;
}

/**
 * E7.1.1 - E620 | Campos que describen el pago o entrega inicial de la operación con tarjeta de crédito/débito | Pagina 83
 * Observaciones: Se activa si E606 = 3 o 4
 */
export interface GPagTarCD {
  /**
   * E7.1.1 - E621 | Denominación de la tarjeta | Pagina 83
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
  iDenTarj: DenominacionTarjeta;
  /**
   * E7.1.1 - E622 | Descripción de denominación de la tarjeta | Pagina 83
   *
   * Observaciones:
   *   Referente al campo E621
   *   1= “Visa”
   *   2= “Mastercard”
   *   3= “American Express”
   *   4= “Maestro”
   *   5= “Panal”
   *   6= “Cabal”
   *   Si E621 = 99 informar la descripción de la denominación de la tarjeta
   */
  dDesDenTarj: DescripcionDenominacionTarjeta;
  /**
   * E7.1.1 - E623 | Razón social de la procesadora de tarjeta | Pagina 83
   */
  dRSProTar?: string;
  /**
   * E7.1.1 - E624 | RUC de la procesadora de tarjeta | Pagina 83
   */
  dRUCProTar?: string;
  /**
   * E7.1.1 - E625 | Dígito verificador del RUC de la procesadora de tarjeta | Pagina 83
   * Observaciones: Según algoritmo módulo 11
   */
  dDVProTar?: number;
  /**
   * E7.1.1 - E626 | Forma de procesamiento de pago | Pagina 83
   *
   * Observaciones:
   *   1= POS
   *   2= Pago Electrónico (Ejemplo: compras por Internet)
   *   9= Otro
   */
  iForProPa: FormaProcesamientoPago;
  /**
   * E7.1.1 - E627 | Código de autorización de la operación | Pagina 83
   */
  dCodAuOpe?: string;
  /**
   * E7.1.1 - E628 | Nombre del titular de la tarjeta | Pagina 83
   */
  dNomTit?: string;
  /**
   * E7.1.1 - E629 | Número de la tarjeta | Pagina 84
   * Observaciones: Cuatro últimos dígitos de la tarjeta
   */
  dNumTarj?: string;
}

/**
 * E7.1.2 - E630 | Campos que describen el pago o entrega inicial de la operación con cheque | Pagina 84
 * Observaciones: Se activa si E606 = 2
 */
export interface GPagCheq {
  /**
   * E7.1.2 - E631 | Número de cheque | Pagina 84
   * Observaciones: Completar con 0 (cero) a la izquierda hasta alcanzar 8 (ocho) cifras
   */
  dNumCheq: string;
  /**
   * E7.1.2 - E632 | Banco emisor | Pagina 84
   */
  dBcoEmi: string;
}

/**
 * E7.2 - E640 | Campos que describen la operación a crédito | Pagina 84
 *
 * Observaciones:
 *   Obligatorio si E601 = 2
 *   No informar si E601 ≠ 2
 */
export interface GPagCred {
  /**
   * E7.2 - E641 | Condición de la operación a crédito | Pagina 84
   *
   * Observaciones:
   *   1= Plazo
   *   2= Cuota
   */
  iCondCred: CondicionOperacionCredito;
  /**
   * E7.2 - E642 | Descripción de la condición de la operación a crédito | Pagina 84
   *
   * Observaciones:
   *   1= “Plazo”
   *   2= “Cuota”
   */
  dDCondCred: DescripcionCondicionOperacionCredito;
  /**
   * E7.2 - E643 | Plazo del crédito | Pagina 84
   *
   * Observaciones:
   *   Obligatorio si E641 = 1
   *   Ejemplo: 30 días, 12 meses
   */
  dPlazoCre?: string;
  /**
   * E7.2 - E644 | Cantidad de cuotas | Pagina 84
   *
   * Observaciones:
   *   Obligatorio si E641 = 2
   *   Ejemplo: 12, 24, 36
   */
  dCuotas?: number;
  /**
   * E7.2 - E645 | Monto de la entrega inicial | Pagina 84
   */
  dMonEnt?: string;
  /**
   * E7.2.1 - E650 | Campos que describen las cuotas | Pagina 85
   * Observaciones: Se activa si E641 = 2
   */
  gCuotas?: GCuotas[];
}

/**
 * E7.2.1 - E650 | Campos que describen las cuotas | Pagina 85
 * Observaciones: Se activa si E641 = 2
 */
export interface GCuotas {
  /**
   * E7.2.1 - E653 | Moneda de las cuotas | Pagina 85
   *
   * Observaciones:
   *   Según tabla de códigos para monedas de acuerdo con la norma ISO 4217
   *   Se requiere la misma moneda para todos los ítems del DE
   */
  cMoneCuo: CodigoMoneda;
  /**
   * E7.2.1 - E654 | Descripción de la moneda de las cuotas | Pagina 85
   * Observaciones: Referente al campo E653
   */
  dDMoneCuo: DescripcionCodigoMoneda;
  /**
   * E7.2.1 - E651 | Monto de la cuota | Pagina 85
   */
  dMonCuota: string;
  /**
   * E7.2.1 - E652 | Vencimiento de la cuota | Pagina 84
   *
   * Formato: AAAA-MM-DD
   * Observaciones: Fecha en el formato: AAAA-MM-DD
   */
  dVencCuo?: string;
}

/**
 * E8 - E700 | Campos que describen los ítems de la operación | Pagina 85
 */
export interface GCamItem {
  /**
   * E8 - E701 | Código interno | Pagina 85
   * Observaciones: Código interno de identificación de la mercadería o servicio de responsabilidad del emisor. No se pueden tener ítems distintos de mercadería o servicio con el mismo código interno en su catastro de productos o servicios. Este código se puede repetir en el DE siempre que el producto o servicio sea el mismo.
   */
  dCodInt: string;
  /**
   * E8 - E702 | Partida arancelaria | Pagina 85
   */
  dParAranc?: number;
  /**
   * E8 - E703 | Nomenclatura común del Mercosur (NCM) | Pagina 85
   */
  dNCM?: number;
  /**
   * E8 - E704 | Código DNCP – Nivel General | Pagina 86
   *
   * Observaciones:
   *   Obligatorio si D202 = 3
   *   Informar se existe el código de la DNCP
   *   Colocar 0 (cero) a la izquierda para completar los espacios vacíos
   */
  dDncpG?: string;
  /**
   * E8 - E705 | Código DNCP – Nivel Específico | Pagina 86
   * Observaciones: Obligatorio si existe el campo E704
   */
  dDncpE?: string;
  /**
   * E8 - E706 | Código GTIN por producto | Pagina 86
   * Observaciones: Informar si la mercadería tiene GTIN
   */
  dGtin?: number;
  /**
   * E8 - E707 | Código GTIN por paquete | Pagina 86
   * Observaciones: Informar si el paquete tiene GTIN
   */
  dGtinPq?: number;
  /**
   * E8 - E708 | Descripción del producto y/o servicio | Pagina 86
   * Observaciones: Equivalente a nombre del producto establecido en la RG 24/2019
   */
  dDesProSer: string;
  /**
   * E8 - E709 | Unidad de medida | Pagina 86
   *
   * Observaciones:
   *   Según Tabla 5 – Unidad de Medida
   *   Si D202 = 3 utilizar los datos del WS del link de la DNCP
   *   Utilizar el atributo “ID”
   */
  cUniMed: UnidadMedida;
  /**
   * E8 - E710 | Descripción de la unidad de medida | Pagina 86
   *
   * Observaciones:
   *   Referente al campo E709
   *   Utilizar el atributo “Código”
   *   Ejemplo: UNI
   */
  dDesUniMed: DescripcionUnidadMedida;
  /**
   * E8 - E711 | Cantidad del producto y/o servicio | Pagina 86
   */
  dCantProSer: string;
  /**
   * E8 - E712 | Código del país de origen del producto | Pagina 86
   * Observaciones: Según XSD de Codificación de Países
   */
  cPaisOrig?: CodigoPais;
  /**
   * E8 - E713 | Descripción del país de origen del producto | Pagina 86
   * Observaciones: Obligatorio si existe el campo E712
   */
  dDesPaisOrig?: DescripcionCodigoPais;
  /**
   * E8 - E714 | Información de interés del emisor con respecto al ítem | Pagina 86
   */
  dInfItem?: string;
  /**
   * E8 - E715 | Código de datos de relevancia de las mercaderías | Pagina 86
   *
   * Observaciones:
   *   Opcional si C002 = 7
   *   1=Tolerancia de quiebra
   *   2= Tolerancia de merma
   *   Según RG 41/14
   */
  cRelMerc?: CodigoDatosRelevanciaMercaderias;
  /**
   * E8 - E716 | Descripción del código de datos de relevancia de las mercaderías | Pagina 86
   *
   * Observaciones:
   *   1=“Tolerancia de quiebra”
   *   2=“Tolerancia de merma”
   */
  dDesRelMerc?: DescripcionCodigoDatosRelevanciaMercaderias;
  /**
   * E8 - E717 | Cantidad de quiebra o merma | Pagina 87
   *
   * Observaciones:
   *   Obligatorio si se informa E715
   *   Lo informado en este campo se encuentra en la unidad de medida elegida en E709
   *   Según RG 41/14
   */
  dCanQuiMer?: string;
  /**
   * E8 - E718 | Porcentaje de quiebra o merma | Pagina 87
   *
   * Observaciones:
   *   Obligatorio si se informa E715
   *   Según RG 41/14
   */
  dPorQuiMer?: string;
  /**
   * E8 - E719 | CDC del anticipo | Pagina 87
   * Observaciones: Obligatorio cuando se utilice una factura asociada con el tipo de transacción igual a Anticipo (D011 de la factura asociada igual a 9)
   */
  dCDCAnticipo?: string;
  /**
   * E8.1 - E720 | Campos que describen los precios, descuentos y valor total por ítem | Pagina 87
   *
   * Observaciones:
   *   Obligatorio si C002 ≠ 7
   *   No informar si C002 = 7
   */
  gValorItem?: GValorItem;
  /**
   * E8.2 - E730 | Campos que describen el IVA de la operación por ítem | Pagina 89
   *
   * Observaciones:
   *   Obligatorio si D013=1, 3, 4 o 5 y C002 ≠ 4 o 7
   *   No informar si D013=2 y C002= 4 o 7
   */
  gCamIVA?: GCamIVA;
  /**
   * E8.4 - E750 | Grupo de rastreo de la mercadería | Pagina 90
   */
  gRasMerc?: GRasMerc;
  /**
   * E8.5 - E770 | Grupo de detalle de vehículos nuevos | Pagina 91
   */
  gVehNuevo?: GVehNuevo;
}

/**
 * E8.1 - E720 | Campos que describen los precios, descuentos y valor total por ítem | Pagina 87
 *
 * Observaciones:
 *   Obligatorio si C002 ≠ 7
 *   No informar si C002 = 7
 */
export interface GValorItem {
  /**
   * E8.1 - E721 | Precio unitario del producto y/o servicio (incluidos impuestos) | Pagina 87
   */
  dPUniProSer: string;
  /**
   * E8.1 - E725 | Tipo de cambio por ítem | Pagina 87
   *
   * Observaciones:
   *   ~~Obligatorio si D015 ≠ PYG~~
   *   Obligatorio si D017 = 2
   *   No informar si D017 = 1
   */
  dTiCamIt?: string;
  /**
   * E8.1 - E727 | Total bruto de la operación por ítem | Pagina 87
   * Observaciones: Corresponde a la multiplicación del precio por ítem (E721) y la cantidad por ítem (E711)
   */
  dTotBruOpeItem: string;
  /**
   * E8.1.1 - EA001 | Campos que describen descuentos, anticipos y valor total por ítem | Pagina 87
   */
  gValorRestaItem: GValorRestaItem;
}

/**
 * E8.1.1 - EA001 | Campos que describen descuentos, anticipos y valor total por ítem | Pagina 87
 */
export interface GValorRestaItem {
  /**
   * E8.1.1 - EA002 | Descuento particular sobre el precio unitario por ítem (incluidos impuestos) | Pagina 88
   * Observaciones: Si no hay descuento por ítem completar con 0 (cero)
   */
  dDescItem?: string;
  /**
   * E8.1.1 - EA003 | Porcentaje de descuento particular por ítem | Pagina 88
   *
   * Observaciones:
   *   Debe existir si EA002 es mayor a 0 (cero)
   *   [EA002 * 100 / E721]
   */
  dPorcDesIt?: string;
  /**
   * E8.1.1 - EA004 | Descuento global sobre el precio unitario por ítem (incluidos impuestos) | Pagina 88
   * Observaciones: Si se cuenta con un descuento global, debe ser aplicado (no es prorrateo) a cada uno de los ítems, independientemente que un ítem cuente con un descuento particular.
   */
  dDescGloItem?: string;
  /**
   * E8.1.1 - EA006 | Anticipo particular sobre el precio unitario por ítem (incluidos impuestos) | Pagina 88
   *
   * Observaciones:
   *   Se debe informar en la misma denominación monetaria en la que se informó en la FE de anticipo asociada (D015 de la FE asociada)
   *   Si no hay anticipo por ítem completar con 0 (cero)
   */
  dAntPreUniIt?: string;
  /**
   * E8.1.1 - EA007 | Anticipo global sobre el precio unitario por ítem (incluidos impuestos) | Pagina 88
   *
   * Observaciones:
   *   Si se cuenta con un anticipo global, debe ser aplicado a cada uno de los ítems, independientemente de que un ítem cuente con un anticipo particular.
   *   Si no hay anticipo global por ítem, completar con 0 (cero)
   */
  dAntGloPreUniIt?: string;
  /**
   * E8.1.1 - EA008 | Valor total de la operación por ítem | Pagina 89
   *
   * Observaciones:
   *   Cálculo para IVA, Renta, ninguno, IVA - Renta
   *   Si D013 = 1, 3, 4 o 5 (afectado al IVA, Renta, ninguno, IVA - Renta), entonces EA008 corresponde al cálculo aritmético: (E721 (Precio unitario) – EA002 (Descuento particular) – EA004 (Descuento global) – EA006 (Anticipo particular) – EA007 (Anticipo global)) * E711(cantidad)
   *   Cálculo para Autofactura (C002=4):
   *   E721*E711
   */
  dTotOpeItem: string;
  /**
   * E8.1.1 - EA009 | Valor total de la operación por ítem en guaraníes | Pagina 89
   *
   * Observaciones:
   *   Obligatorio si existe el campo E725
   *   Corresponde al cálculo aritmético EA008* E725
   */
  dTotOpeGs?: string;
}

/**
 * E8.2 - E730 | Campos que describen el IVA de la operación por ítem | Pagina 89
 *
 * Observaciones:
 *   Obligatorio si D013=1, 3, 4 o 5 y C002 ≠ 4 o 7
 *   No informar si D013=2 y C002= 4 o 7
 */
export interface GCamIVA {
  /**
   * E8.2 - E731 | Forma de afectación tributaria del IVA | Pagina 89
   *
   * Observaciones:
   *   1= Gravado IVA
   *   2= Exonerado (Art. 83- Ley 125/91)
   *   3= Exento
   *   4= Gravado parcial (Grav-Exento)
   */
  iAfecIVA: FormaAfectacionTributariaIVA;
  /**
   * E8.2 - E732 | Descripción de la forma de afectación tributaria del IVA | Pagina 90
   *
   * Observaciones:
   *   Referente al campo E731
   *   1= “Gravado IVA”
   *   2= “Exonerado (Art. 83- Ley 125/91)”
   *   3= “Exento”
   *   4= “Gravado parcial (Grav-Exento)”
   */
  dDesAfecIVA: DescripcionFormaAfectacionTributariaIVA;
  /**
   * E8.2 - E733 | Proporción gravada de IVA | Pagina 90
   *
   * Observaciones:
   *   Corresponde al porcentaje (%) gravado
   *   Ejemplo:100, 50, 30, 0
   */
  dPropIVA: string;
  /**
   * E8.2 - E734 | Tasa del IVA | Pagina 90
   *
   * Observaciones:
   *   Corresponde al porcentaje (%) de la tasa expresado en números enteros
   *   0 (para E731 = 2 o 3)
   *   5 (para E731 = 1 o 4)
   *   10 (para E731 = 1 o 4)
   */
  dTasaIVA: number;
  /**
   * E8.2 - E735 | Base gravada del IVA por ítem | Pagina 90
   *
   * Observaciones:
   *   Si E731 = 1 o 4 este campo es igual al resultado del cálculo
   *   [EA008* (E733/100)] / 1,1 si la tasa es del 10%
   *   [EA008* (E733/100)] / 1,05 si la tasa es del 5%
   *   Si E731 = 2 o 3 este campo es igual 0
   */
  dBasGravIVA: string;
  /**
   * E8.2 - E736 | Liquidación del IVA por ítem | Pagina 90
   *
   * Observaciones:
   *   Corresponde al cálculo aritmético:
   *   E735 * (E734/100)
   *   Si E731 = 2 o 3 este campo es igual 0
   */
  dLiqIVAItem: string;
  /**
   * E8.2 - E737 | Base Exenta por Item | Pagina 1 NT-13
   */
  dBasExe: string;
}

/**
 * E8.4 - E750 | Grupo de rastreo de la mercadería | Pagina 90
 */
export interface GRasMerc {
  /**
   * E8.4 - E751 | Número de lote | Pagina 90
   * Observaciones: Obligados por la RG N° 24/2019 – Agroquímicos
   */
  dNumLote?: string;
  /**
   * E8.4 - E752 | Fecha de vencimiento de la mercadería | Pagina 91
   *
   * Formato: AAAA-MM-DD
   * Observaciones: Formato AAAA-MM-DD
   */
  dVencMerc?: string;
  /**
   * E8.4 - E753 | Número de serie | Pagina 91
   */
  dNSerie?: string;
  /**
   * E8.4 - E754 | Número de pedido | Pagina 91
   */
  dNumPedi?: string;
  /**
   * E9.4 - E755 | Número de seguimiento del envío | Pagina 91
   */
  dNumSegui?: string;
  /**
   * E8.4 - E759 | Número de registro del producto otorgado por el SENAVE | Pagina 91
   * Observaciones: Obligados por la RG N° 16/2019 y la RG N° 24/2019 – Agroquímicos
   */
  dNumReg?: string;
  /**
   * E8.4 - E760 | Número de registro de entidad comercial otorgado por el SENAVE | Pagina 91
   * Observaciones: Obligados por la RG N° 24/2019 – Agroquímicos
   */
  dNumRegEntCom?: string;
  /**
   * E8.4 - E761 | Nombre del producto | Pagina 2 NT-10
   */
  dNomPro?: string;
}

/**
 * E8.5 - E770 | Grupo de detalle de vehículos nuevos | Pagina 91
 */
export interface GVehNuevo {
  /**
   * E8.5 - E771 | Tipo de operación de venta de vehículos | Pagina 91
   *
   * Observaciones:
   *   1= Venta a representante
   *   2= Venta al consumidor final
   *   3= Venta a gobierno
   *   4= Venta a flota de vehículos
   */
  iTipOpVN?: TipoOperacionVentaVehiculos;
  /**
   * E8.5 - E772 | Descripción del tipo de operación de venta de vehículos | Pagina 92
   *
   * Observaciones:
   *   Obligatorio si existe el campo E762
   *   1= “Venta a representante”
   *   2= “Venta al consumidor final”
   *   3= “Venta a gobierno”
   *   4= “Venta a flota de vehículos”
   */
  dDesTipOpVN?: DescripcionTipoOperacionVentaVehiculos;
  /**
   * E8.5 - E773 | Chasis del vehículo | Pagina 92
   */
  dChasis?: string;
  /**
   * E8.5 - E774 | Color del vehículo | Pagina 92
   */
  dColor?: string;
  /**
   * E8.5 - E775 | Potencia del motor (CV) | Pagina 92
   */
  dPotencia?: number;
  /**
   * E8.5 - E776 | Capacidad del motor | Pagina 92
   * Observaciones: Expresa en centímetros cúbicos (cc)
   */
  dCapMot?: number;
  /**
   * E8.5 - E777 | Peso Neto | Pagina 92
   * Observaciones: Toneladas
   */
  dPNet?: string;
  /**
   * E8.5 - E778 | Peso Bruto | Pagina 92
   * Observaciones: Toneladas
   */
  dPBruto?: string;
  /**
   * E8.5 - E779 | Tipo de combustible | Pagina 92
   *
   * Observaciones:
   *   1= Gasolina
   *   2= Diésel
   *   3= Etanol
   *   4= GNV
   *   5= Flex
   *   9= Otro
   */
  iTipCom?: TipoCombustible;
  /**
   * E8.5 - E780 | Descripción del tipo de combustible | Pagina 92
   *
   * Observaciones:
   *   Obligatorio si existe el campo E770
   *   1= “Gasolina”
   *   2= “Diésel”
   *   3= “Etanol”
   *   4= “GNV”
   *   5= “Flex”
   *   Si E769= 9 describir el tipo de combustible
   */
  dDesTipCom?: DescripcionTipoCombustible;
  /**
   * E8.5 - E781 | Número del motor | Pagina 92
   */
  dNroMotor?: string;
  /**
   * E8.5 - E782 | Capacidad máxima de tracción | Pagina 92
   * Observaciones: Toneladas
   */
  dCapTracc?: string;
  /**
   * E8.5 - E783 | Año de fabricación | Pagina 92
   */
  dAnoFab?: number;
  /**
   * E8.5 - E784 | Tipo de vehículo | Pagina 92
   */
  cTipVeh?: string;
  /**
   * E8.5 - E785 | Capacidad máxima de pasajeros | Pagina 92
   * Observaciones: Capacidad máxima de pasajeros sentados
   */
  dCapac?: number;
  /**
   * E8.5 - E786 | Cilindradas del motor | Pagina 92
   */
  dCilin?: string;
}

/**
 * E9 - E790 | Campos complementarios comerciales de uso específico | Pagina 93
 */
export interface GCamEsp {
  /**
   * E9.2 - E791 | Grupo del sector de energía eléctrica | Pagina 93
   */
  gGrupEner?: GGrupEner;
  /**
   * E9.3 - E800 | Grupo del sector de seguros | Pagina 94
   */
  gGrupSeg?: GGrupSeg;
  /**
   * E9.4 - E810 | Grupo del sector supermercados | Pagina 95
   */
  gGrupSup?: GGrupSup;
  /**
   * E9.5 - E820 | Grupo de datos adicionales de uso comercial | Pagina 95
   */
  gGrupAdi?: GGrupAdi;
}

/**
 * E9.2 - E791 | Grupo del sector de energía eléctrica | Pagina 93
 */
export interface GGrupEner {
  /**
   * E9.2 - E792 | Número de medidor | Pagina 93
   */
  dNroMed?: string;
  /**
   * E9.2 - E793 | Código de actividad | Pagina 93
   */
  dActiv?: number;
  /**
   * E9.2 - E794 | Código de categoría | Pagina 93
   */
  dCateg?: string;
  /**
   * E9.2 - E795 | Lectura anterior | Pagina 93
   */
  dLecAnt?: string;
  /**
   * E9.2 - E796 | Lectura actual | Pagina 93
   */
  dLecAct?: string;
  /**
   * E9.2 - E797 | Consumo | Pagina 93
   * Observaciones: Corresponde a la diferencia entre E785-E784
   */
  dConKwh?: string;
}

/**
 * E9.3 - E800 | Grupo del sector de seguros | Pagina 94
 */
export interface GGrupSeg {
  /**
   * E9.3 - E801 | Código de la empresa de seguros en la Superintendencia de Seguros | Pagina 94
   */
  dCodEmpSeg?: string;
  /**
   * E9.3.1 - EA790 | Grupo de póliza de seguros | Pagina 94
   */
  gGrupPolSeg?: GGrupPolSeg[];
}

/**
 * E9.3.1 - EA790 | Grupo de póliza de seguros | Pagina 94
 */
export interface GGrupPolSeg {
  /**
   * E9.3.1 - EA791 | Código de la póliza | Pagina 94
   */
  dPoliza: string;
  /**
   * E9.3.1 - EA792 | Descripción de la unidad de tiempo de vigencia | Pagina 94
   * Observaciones: Ejemplo: hora, día, mes, año
   */
  dUnidVig: string;
  /**
   * E9.3.1 - EA793 | Vigencia de la póliza | Pagina 94
   */
  dVigencia: string;
  /**
   * E9.3.1 - EA794 | Número de la póliza | Pagina 94
   */
  dNumPoliza: string;
  /**
   * E9.3.1 - EA795 | Fecha de inicio de vigencia | Pagina 94
   *
   * Formato: AAAA-MM-DDThh:mm:ss
   * Observaciones: Según el formato AAAA-MM-DDThh:mm:ss
   */
  dFecIniVig?: string;
  /**
   * E9.3.1 - EA796 | Fecha de fin de vigencia | Pagina 94
   *
   * Formato: AAAA-MM-DDThh:mm:ss
   * Observaciones: Según el formato AAAA-MM-DDThh:mm:ss
   */
  dFecFinVig?: string;
  /**
   * E9.3.1 - EA797 | Código interno del ítem | Pagina 94
   * Observaciones: Como referencia al campo E701, si desea asociar la póliza al ítem
   */
  dCodInt?: string;
}

/**
 * E9.4 - E810 | Grupo del sector supermercados | Pagina 95
 */
export interface GGrupSup {
  /**
   * E9.4 - E811 | Nombre del cajero | Pagina 95
   */
  dNomCaj?: string;
  /**
   * E9.4 - E812 | Efectivo | Pagina 95
   */
  dEfectivo?: string;
  /**
   * E9.4 - E813 | Vuelto | Pagina 95
   */
  dVuelto?: string;
  /**
   * E9.4 - E814 | Monto de la donación | Pagina 95
   */
  dDonac?: string;
  /**
   * E9.4 - E815 | Descripción de la donación | Pagina 95
   */
  dDesDonac?: string;
}

/**
 * E9.5 - E820 | Grupo de datos adicionales de uso comercial | Pagina 95
 */
export interface GGrupAdi {
  /**
   * E9.5 - E821 | Ciclo | Pagina 95
   */
  dCiclo?: string;
  /**
   * E9.5 - E822 | Fecha de inicio de ciclo | Pagina 95
   *
   * Formato: AAAA-MM-DD
   *
   * Observaciones:
   *   Obligatorio si se informa el campo E811
   *   No completar si no se informa el campo E811
   *   Formato AAAA-MM-DD
   */
  dFecIniC?: string;
  /**
   * E9.5 - E823 | Fecha de fin de ciclo | Pagina 95
   *
   * Formato: AAAA-MM-DD
   *
   * Observaciones:
   *   Obligatorio si se informa el campo E812
   *   No completar si no se informa el campo E812
   *   Formato AAAA-MM-DD
   */
  dFecFinC?: string;
  /**
   * E9.5 - E824 | Fecha de vencimiento para el pago | Pagina 95
   *
   * Formato: AAAA-MM-DD
   * Observaciones: Formato AAAA-MM-DD
   */
  dVencPag?: string[];
  /**
   * E9.5 - E825 | Número de contrato | Pagina 96
   */
  dContrato?: string;
  /**
   * E9.5 - E826 | Saldo anterior | Pagina 96
   * Observaciones: Monto del saldo anterior
   */
  dSalAnt?: string;
  /**
   * E9.5 - E827 | Codigo de contratacion de la DNCP | Pagina 1 NT-20
   */
  dCodConDncp?: number;
}

/**
 * E10 - E900 | Campos que describen el transporte de mercaderías | Pagina 95
 *
 * Observaciones:
 *   Obligatorio si C002 = 7
 *   Opcional si C002 = 1
 *   No informar si C002= 4, 5, 6
 */
export interface GTransp {
  /**
   * E10 - E901 | Tipo de transporte | Pagina 96
   *
   * Observaciones:
   *   Obligatorio si C002 = 7
   *   1= Propio
   *   2= Tercero
   */
  iTipTrans?: TipoTransporte;
  /**
   * E10 - E902 | Descripción del tipo de transporte | Pagina 96
   * Observaciones: Obligatorio si existe el campo E901
   */
  dDesTipTrans?: DescripcionTipoTransporte;
  /**
   * E10 - E903 | Modalidad del transporte | Pagina 96
   *
   * Observaciones:
   *   1=Terrestre
   *   2= Fluvial
   *   3= Aéreo
   *   4= Multimodal
   */
  iModTrans: ModalidadTransporte;
  /**
   * E10 - E904 | Descripción de la modalidad del transporte | Pagina 96
   *
   * Observaciones:
   *   Referente al campo E903
   *   1= “Terrestre”
   *   2= “Fluvial”
   *   3= “Aéreo”
   *   4= “Multimodal”
   */
  dDesModTrans: DescripcionModalidadTransporte;
  /**
   * E10 - E905 | Responsable del costo del flete | Pagina 96
   *
   * Observaciones:
   *   1= Emisor de la Factura Electrónica
   *   2= Receptor de la Factura Electrónica
   *   3= Tercero
   *   4= Agente intermediario del transporte (cuando intervenga)
   *   5= Transporte propio
   */
  iRespFlete: ResponsableCostoFlete;
  /**
   * E10 - E906 | Condición de la negociación | Pagina 96
   * Observaciones: Según Tabla 10 - Incoterms
   */
  cCondNeg?: CondicionNegociacion;
  /**
   * E10 - E907 | Número de manifiesto o conocimiento de carga | Pagina 97
   * Observaciones: Campo abierto para informar la numeración de cualquiera de las opciones descriptas
   */
  dNuManif?: string;
  /**
   * E10 - E908 | Número de despacho de importación | Pagina 97
   * Observaciones: Obligatorio si E501 = 5
   */
  dNuDespImp?: string;
  /**
   * E10 - E909 | Fecha estimada de inicio de traslado | Pagina 97
   *
   * Formato: AAAA-MM-DD
   *
   * Observaciones:
   *   Obligatorio si C002 = 7
   *   Opcional si C002 = 1
   *   Fecha en el formato: AAAA-MM-DD
   */
  dIniTras?: string;
  /**
   * E10 - E910 | Fecha estimada de fin de traslado | Pagina 97
   *
   * Formato: AAAA-MM-DD
   *
   * Observaciones:
   *   Obligatorio si existe el campo E909
   *   Fecha en el formato: AAAA-MM-DD
   */
  dFinTras?: string;
  /**
   * E10 - E911 | Código del país de destino | Pagina 97
   * Observaciones: Según XSD de Codificación de Países
   */
  cPaisDest?: CodigoPais;
  /**
   * E10 - E912 | Descripción del país de destino | Pagina 97
   * Observaciones: Obligatorio si existe el campo E911
   */
  dDesPaisDest?: DescripcionCodigoPais;
  /**
   * E10.1 - E920 | Campos que identifican el local de salida de las mercaderías | Pagina 97
   *
   * Observaciones:
   *   Obligatorio si C002 = 7
   *   Opcional si C002 = 1
   *   No informar si C002 = 4, 5, 6
   */
  gCamSal?: GCamSal;
  /**
   * E10.2 - E940 | Campos que identifican el local de entrega de las mercaderías | Pagina 98
   *
   * Observaciones:
   *   Obligatorio si C002 = 7
   *   No informar si C002 = 4, 5, 6
   */
  gCamEnt?: GCamEnt[];
  /**
   * E10.3 - E960 | Campos que identifican el vehículo de traslado de mercaderías | Pagina 98
   *
   * Observaciones:
   *   Obligatorio si C002 = 7
   *   No informar si C002 = 4, 5, 6
   */
  gVehTras?: GVehTras[];
  /**
   * E10.4 - E980 | Campos que identifican al transportista | Pagina 100
   *
   * Observaciones:
   *   Obligatorio si C002 = 7
   *   No informar si C002 = 4, 5, 6
   *   Opcional cuando E903=1 y E967=1
   */
  gCamTrans?: GCamTrans;
}

/**
 * E10.1 - E920 | Campos que identifican el local de salida de las mercaderías | Pagina 97
 *
 * Observaciones:
 *   Obligatorio si C002 = 7
 *   Opcional si C002 = 1
 *   No informar si C002 = 4, 5, 6
 */
export interface GCamSal {
  /**
   * E10.1 - E921 | Dirección del local de salida | Pagina 97
   * Observaciones: Nombre de la calle principal
   */
  dDirLocSal: string;
  /**
   * E10.1 - E922 | Número de casa de salida | Pagina 97
   * Observaciones: Si no tiene numeración, colocar 0 (cero)
   */
  dNumCasSal: number;
  /**
   * E10.1 - E923 | Complemento de dirección 1 salida | Pagina 97
   * Observaciones: Nombre de la calle secundaria
   */
  dComp1Sal?: string;
  /**
   * E10.1 - E924 | Complemento de dirección 2 salida | Pagina 98
   *
   * Observaciones:
   *   Número de departamento/ piso/
   *   local/ edificio/ deposito del local
   *   de salida de la mercadería
   */
  dComp2Sal?: string;
  /**
   * E10.1 - E925 | Código del departamento de salida | Pagina 98
   * Observaciones: Según XSD de Departamentos
   */
  cDepSal?: CodigoDepartamento;
  /**
   * E10.1 - E926 | Descripción del departamento de salida | Pagina 98
   * Observaciones: Referente al campo E925
   */
  dDesDepSal?: DescripcionCodigoDepartamento;
  /**
   * E10.1 - E927 | Código del distrito de salida | Pagina 98
   * Observaciones: Según Tabla 2.1 - Distritos
   */
  cDisSal?: CodigoDistrito;
  /**
   * E10.1 - E928 | Descripción del distrito de salida | Pagina 98
   * Observaciones: Obligatorio si existe el campo E927
   */
  dDesDisSal?: DescripcionCodigoDistrito;
  /**
   * E10.1 - E929 | Código de la ciudad de salida | Pagina 98
   * Observaciones: Según Tabla 2.2 – Ciudades
   */
  cCiuSal?: CodigoCiudad;
  /**
   * E10.1 - E930 | Descripción de la ciudad de salida | Pagina 98
   * Observaciones: Referente al campo E929
   */
  dDesCiuSal?: DescripcionCodigoCiudad;
  /**
   * E10.1 - E931 | Teléfono del local de salida | Pagina 98
   */
  dTelSal?: string;
}

/**
 * E10.2 - E940 | Campos que identifican el local de entrega de las mercaderías | Pagina 98
 *
 * Observaciones:
 *   Obligatorio si C002 = 7
 *   No informar si C002 = 4, 5, 6
 */
export interface GCamEnt {
  /**
   * E10.2 - E941 | Dirección del local de entrega | Pagina 98
   * Observaciones: Nombre de la calle principal
   */
  dDirLocEnt: string;
  /**
   * E10.2 - E942 | Número de casa de entrega | Pagina 98
   * Observaciones: Si no tiene numeración, colocar 0 (cero)
   */
  dNumCasEnt: number;
  /**
   * E10.2 - E943 | Complemento de dirección 1 entrega | Pagina 99
   * Observaciones: Nombre de la calle secundaria
   */
  dComp1Ent?: string;
  /**
   * E10.2 - E944 | Complemento de dirección 2 entrega | Pagina 99
   *
   * Observaciones:
   *   Número de departamento/ piso/
   *   local/ edificio/ deposito del local
   *   de entrega de la mercadería
   */
  dComp2Ent?: string;
  /**
   * E10.2 - E945 | Código del departamento de entrega | Pagina 99
   * Observaciones: Según XSD de Departamentos
   */
  cDepEnt: CodigoDepartamento;
  /**
   * E10.2 - E946 | Descripción del departamento de entrega | Pagina 99
   * Observaciones: Referente al campo E945
   */
  dDesDepEnt: DescripcionCodigoDepartamento;
  /**
   * E10.2 - E947 | Código del distrito de entrega | Pagina 99
   * Observaciones: Según Tabla 2.1 - Distritos
   */
  cDisEnt?: CodigoDistrito;
  /**
   * E10.2 - E948 | Descripción del distrito de entrega | Pagina 99
   * Observaciones: Obligatorio si existe el campo E947
   */
  dDesDisEnt?: DescripcionCodigoDistrito;
  /**
   * E10.2 - E949 | Código de la ciudad de entrega | Pagina 99
   * Observaciones: Según Tabla 2.2 – Ciudades
   */
  cCiuEnt: CodigoCiudad;
  /**
   * E10.2 - E950 | Descripción de la ciudad de entrega | Pagina 99
   * Observaciones: Referente al campo E949
   */
  dDesCiuEnt: DescripcionCodigoCiudad;
  /**
   * E10.2 - E951 | Teléfono del local de entrega | Pagina 99
   */
  dTelEnt?: string;
}

/**
 * E10.3 - E960 | Campos que identifican el vehículo de traslado de mercaderías | Pagina 100
 *
 * Observaciones:
 *   Obligatorio si C002 = 7
 *   No informar si C002 = 4, 5, 6
 */
export interface GVehTras {
  /**
   * E10.3 - E961 | Tipo de vehículo | Pagina 100
   * Observaciones: Debe ser acorde al campo E903
   */
  dTiVehTras: string;
  /**
   * E10.3 - E962 | Marca del vehículo | Pagina 100
   */
  dMarVeh: string;
  /**
   * E10.3 - E967 | Tipo de Identificación del vehículo | Pagina 100
   *
   * Observaciones:
   *   1=Número de identificación del vehículo
   *   2=Número de matrícula del vehículo
   */
  dTipIdenVeh: TipoIdentificacionVehiculo;
  /**
   * E10.3 - E963 | Número de identificación del vehículo | Pagina 100
   * Observaciones: Debe informarse cuando el E967=1
   */
  dNroIDVeh?: string;
  /**
   * E10.3 - E964 | Datos adicionales del vehículo | Pagina 100
   */
  dAdicVeh?: string;
  /**
   * E10.3 - E965 | Número de matrícula del vehiculo | Pagina 100
   * Observaciones: Debe informarse cuando el E967=2
   */
  dNroMatVeh?: string;
  /**
   * E10.3 - E966 | Número de vuelo | Pagina 100
   *
   * Observaciones:
   *   Obligatorio si E903 = 3
   *   No informar si E903 ≠ 3
   */
  dNroVuelo?: string;
}

/**
 * E10.4 - E980 | Campos que identifican al transportista | Pagina 99
 *
 * Observaciones:
 *   Obligatorio si C002 = 7
 *   No informar si C002 = 4, 5, 6
 *   Opcional cuando E903=1 y E967=1
 */
export interface GCamTrans {
  /**
   * E10.4 - E981 | Naturaleza del transportista | Pagina 100
   *
   * Observaciones:
   *   1= Contribuyente
   *   2= No contribuyente
   */
  iNatTrans: NaturalezaTransportista;
  /**
   * E10.4 - E982 | Nombre o razón social del transportista | Pagina 100
   */
  dNomTrans: string;
  /**
   * E10.4 - E983 | RUC del transportista | Pagina 100
   *
   * Observaciones:
   *   Obligatorio si E981 = 1
   *   No informar si E981 ≠ 1
   */
  dRucTrans?: string;
  /**
   * E10.4 - E984 | Dígito verificador del RUC del transportista | Pagina 101
   *
   * Observaciones:
   *   Obligatorio si existe el campo E983
   *   Según algoritmo módulo 11
   */
  dDVTrans?: number;
  /**
   * E10.4 - E985 | Tipo de documento de identidad del transportista | Pagina 101
   *
   * Observaciones:
   *   Obligatorio si E981 = 2
   *   No informar si E981 = 1
   *   1= Cédula paraguaya
   *   2= Pasaporte
   *   3= Cédula extranjera
   *   4= Carnet de residencia
   */
  iTipIDTrans?: TipoDocumentoTransportista;
  /**
   * E10.4 - E986 | Número de documento de identidad del transportista | Pagina 101
   *
   * Observaciones:
   *   Obligatorio si existe el campo E985
   *   1= “Cédula paraguaya”
   *   2= “Pasaporte”
   *   3= “Cédula extranjera”
   *   4= “Carnet de residencia”
   */
  dDTipIDTrans?: DescripcionTipoDocumentoTransportista;
  /**
   * E10.4 - E987 | Número de documento de identidad del transportista | Pagina 101
   * Observaciones: Obligatorio si existe el campo E985
   */
  dNumIDTrans?: string;
  /**
   * E10.4 - E988 | Nacionalidad del transportista | Pagina 101
   * Observaciones: Según XSD de Codificación de Países
   */
  cNacTrans?: CodigoPais;
  /**
   * E10.4 - E989 | Descripción de la nacionalidad del transportista | Pagina 101
   * Observaciones: Obligatorio si existe el campo E988
   */
  dDesNacTrans?: DescripcionCodigoPais;
  /**
   * E10.4 - E990 | Número de documento de identidad del chofer | Pagina 101
   */
  dNumIDChof: string;
  /**
   * E10.4 - E991 | Nombre y apellido del chofer | Pagina 101
   */
  dNomChof: string;
  /**
   * E10.4 - E992 | Domicilio fiscal del transportista | Pagina 101
   */
  dDomFisc: string;
  /**
   * E10.4 - E993 | Dirección del chofer | Pagina 101
   */
  dDirChof: string;
  /**
   * E10.4 - E994 | Nombre o razón social del agente | Pagina 101
   * Observaciones: Casos particulares según RG N° 41/14
   */
  dNombAg?: string;
  /**
   * E10.4 - E995 | RUC del agente | Pagina 101
   * Observaciones: Casos particulares según RG N° 41/14
   */
  dRucAg?: string;
  /**
   * E10.4 - E996 | Dígito verificador del RUC del agente | Pagina 102
   *
   * Observaciones:
   *   Casos particulares según RG N° 41/14
   *   Según algoritmo módulo 11
   */
  dDVAg?: string;
  /**
   * E10.4 - E997 | Dirección del agente | Pagina 102
   * Observaciones: Casos particulares según RG N° 41/14
   */
  dDirAge?: string;
}
