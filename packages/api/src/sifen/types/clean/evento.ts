import type { LiteralUnion } from 'type-fest';
import type { CodigoCiudad } from '../../../gen/ciudades';
import type { CodigoDepartamento } from '../../../gen/departamentos';
import type { CodigoDistrito } from '../../../gen/distritos';
import type { CodigoPais } from '../../../gen/paises';
import type { NumBig } from '../big';
import type {
  ModalidadTransporte,
  MotivoActualizacionTransporteEvento,
  NaturalezaReceptor,
  NaturalezaTransportista,
  TipoConformidadEvento,
  TipoContribuyenteReceptor,
  TipoDocumentoElectronico,
  TipoDocumentoReceptor,
  TipoDocumentoTransportista,
  TipoEndosoEvento,
  TipoFactorEndosoEvento,
  TipoIdentificacionVehiculo,
  TipoOperacion,
  TipoTransporte
} from '../enums';

export interface EventoRecepcion {
  fechaProcesamiento: Date;
  idEvento: string;
  estado: string;
  numeroTransaccion?: string;
  validaciones: Array<{ codigo: string; mensaje: string }>;
}

/** Eventos registrables por siRecepEvento. */
export interface EventoRegistrableBase<TTipo extends string> {
  /** GDE007 | gGroupTiEvt | Tipo de evento registrable | MT 150 p. 120 | Selecciona el elemento XML específico del evento. */
  tipo: TTipo;
  /** GDE003 | rEve@Id | Identificador del evento | MT 150 p. 120 | Atributo de rEve; no es el CDC. */
  idEvento: string;
}

/**
 * GEC001 | rGeVeCan | Raíz Gestión de Eventos Cancelación | MT 150 p. 121
 * Observaciones: evento emisor para cancelar un DTE aprobado cuando la transacción no se completó.
 */
export interface EventoCancelacion extends EventoRegistrableBase<'cancelacion'> {
  /** GEC002 | Id | Identificador del DTE (CDC) | MT 150 p. 121 | Ocu 1-1. */
  cdc: string;
  /** GEC003 | mOtEve | Motivo del Evento | MT 150 p. 121 | Ocu 1-1; campo abierto. */
  motivo: string;
}

/**
 * GEI001 | rGeVeInu | Raíz Gestión de Eventos Inutilización | MT 150 p. 121
 * Observaciones: evento emisor para inutilizar un rango de numeración no usado; NT 010 agrega dSerieNum.
 */
export interface EventoInutilizacion extends EventoRegistrableBase<'inutilizacion'> {
  /** GEI002 | dNumTim | Número del Timbrado | MT 150 p. 122 | Ocu 1-1. */
  numeroTimbrado: string;
  /** GEI003 | dEst | Establecimiento | MT 150 p. 122 | Ocu 1-1; completar con ceros a la izquierda. */
  establecimiento: string;
  /** GEI004 | dPunExp | Punto de expedición | MT 150 p. 122 | Ocu 1-1; completar con ceros a la izquierda. */
  puntoExpedicion: string;
  /** GEI005 | dNumIn | Número Inicio del rango del documento | MT 150 p. 122 | Ocu 1-1; máximo 1000 números. */
  numeroInicio: string;
  /** GEI006 | dNumFin | Número Final del rango del documento | MT 150 p. 122 | Ocu 1-1. */
  numeroFin: string;
  /** GEI007 | iTiDE | Tipo de Documento Electrónico | MT 150 p. 122 | Ocu 1-1. */
  tipoDE: LiteralUnion<TipoDocumentoElectronico, number>;
  /** GEI008 | mOtEve | Motivo del Evento | MT 150 p. 122 | Ocu 1-1; campo libre. */
  motivo: string;
  /** dSerieNum | Serie del número de documento | NT 010 | Ocu 0-1. */
  serie?: string;
}

/**
 * GEN001 | rGeVeNotRec | Raíz Gestión de Eventos Notificación - Recepción DE o DTE | MT 150 p. 123
 * Observaciones: evento receptor informativo; NT 019 elimina la matriz anterior de secuencia de eventos.
 */
export interface EventoNotificacionRecepcion extends EventoRegistrableBase<'notificacionRecepcion'> {
  /** GEN002 | Id | Identificador del DE/DTE (CDC) | MT 150 p. 123 | Ocu 1-1. */
  cdc: string;
  /** GEN003 | dFecEmi | Fecha de emisión del DE/DTE | MT 150 p. 123 | Ocu 1-1. */
  fechaEmision: Date;
  /** GEN004 | dFecRecep | Fecha Recepción DE | MT 150 p. 123 | Ocu 1-1; recepción física o electrónica. */
  fechaRecepcion: Date;
  /** GEN005 | iTipRec | Tipo de Receptor | MT 150 p. 123 | Ocu 1-1; 1=Contribuyente, 2=No Contribuyente. */
  tipoReceptor: LiteralUnion<NaturalezaReceptor, number>;
  /** GEN006 | dNomRec | Nombre o Razón Social del Receptor del DE/DTE | MT 150 p. 123 | Ocu 1-1. */
  nombreReceptor: string;
  /** GEN007 | dRucRec | RUC del Receptor | MT 150 p. 123 | Ocu 0-1; requerido si GEN005=1. */
  rucReceptor?: string;
  /** GEN009 | dTipIDRec | Tipo de documento de identidad del receptor | MT 150 p. 123 | Ocu 0-1; requerido si GEN005=2. */
  tipoDocumentoReceptor?: LiteralUnion<TipoDocumentoReceptor, number>;
  /** GEN010 | dNumID | Número de documento de identidad | MT 150 p. 123 | Ocu 0-1; requerido si GEN005=2. */
  numeroDocumentoReceptor?: string;
  /** GEN011 | dTotalGs | Total general de la operación en Guaraníes | MT 150 p. 123 | Ocu 1-1. */
  totalGuaranies: NumBig;
}

/**
 * GCO001 | rGeVeConf | Raíz Gestión de Eventos Conformidad | MT 150 p. 124
 * Observaciones: evento receptor conclusivo; NT 019 actualiza plazo y secuencia.
 */
export interface EventoConformidad extends EventoRegistrableBase<'conformidad'> {
  /** GCO002 | Id | CDC del DTE | MT 150 p. 124 | Ocu 1-1. */
  cdc: string;
  /** GCO003 | iTipConf | Tipo de Conformidad | MT 150 p. 124 | Ocu 1-1; 1=total, 2=parcial. */
  tipoConformidad: LiteralUnion<TipoConformidadEvento, number>;
  /** GCO004 | dFecRecep | Fecha Estimada de Recepción | MT 150 p. 124 | Ocu 0-1; obligatorio si GCO003=2. */
  fechaRecepcion?: Date;
}

/**
 * GDI001 | rGeVeDisconf | Raíz Gestión de Eventos Disconformidad | MT 150 p. 124
 * Observaciones: evento receptor conclusivo por errores o inconsistencias del DTE; NT 019 actualiza secuencia.
 */
export interface EventoDisconformidad extends EventoRegistrableBase<'disconformidad'> {
  /** GDI002 | Id | CDC del DTE | MT 150 p. 124 | Ocu 1-1. */
  cdc: string;
  /** GDI004 | mOtEve | Motivo del Evento | MT 150 p. 124 | Ocu 1-1. */
  motivo: string;
}

/**
 * GED001 | rGeVeDescon | Raíz Gestión de Eventos Desconocimiento | MT 150 p. 124
 * Observaciones: evento receptor informativo; NT 019 actualiza plazo y secuencia.
 */
export interface EventoDesconocimiento extends EventoRegistrableBase<'desconocimiento'> {
  /** GED002 | Id | CDC del DE/DTE | MT 150 p. 124 | Ocu 1-1. */
  cdc: string;
  /** GED003 | dFecEmi | Fecha de emisión del DE/DTE | MT 150 p. 125 | Ocu 1-1. */
  fechaEmision: Date;
  /** GED004 | dFecRecep | Fecha Recepción DE | MT 150 p. 125 | Ocu 1-1. */
  fechaRecepcion: Date;
  /** GED005 | iTipRec | Tipo de Receptor | MT 150 p. 125 | Ocu 1-1; 1=Contribuyente, 2=No Contribuyente. */
  tipoReceptor: LiteralUnion<NaturalezaReceptor, number>;
  /** GED006 | dNomRec | Nombre o Razón Social del Receptor del DE/DTE | MT 150 p. 125 | Ocu 1-1. */
  nombreReceptor: string;
  /** GED007 | dRucRec | RUC del Receptor | MT 150 p. 125 | Ocu 0-1; requerido si GED005=1. */
  rucReceptor?: string;
  /** GED009 | dTipIDRec | Tipo de documento de identidad del receptor | MT 150 p. 125 | Ocu 0-1; requerido si GED005=2. */
  tipoDocumentoReceptor?: LiteralUnion<TipoDocumentoReceptor, number>;
  /** GED010 | dNumID | Número de documento de identidad | MT 150 p. 125 | Ocu 0-1; requerido si GED005=2. */
  numeroDocumentoReceptor?: string;
  /** GED011 | mOtEve | Motivo del Evento | MT 150 p. 125 | Ocu 1-1. */
  motivo: string;
}

/**
 * rGeVeEnd | Raíz Gestión de Eventos Endoso | siRecepEvento_v150.xsd
 * Observaciones: MT 150 p. 114 presenta Endoso de FE como evento futuro; el XSD vigente restringe tipo de endoso/factor.
 */
export interface EventoEndoso extends EventoRegistrableBase<'endoso'> {
  /** Id | CDC del DTE endosado | siRecepEvento_v150.xsd | Ocu 1-1. */
  cdc: string;
  /** iTipRec | Tipo de Receptor | siRecepEvento_v150.xsd | Ocu 1-1; 1=Contribuyente, 2=No Contribuyente. */
  tipoReceptor: LiteralUnion<NaturalezaReceptor, number>;
  /** dNomRec | Nombre o razón social del receptor | siRecepEvento_v150.xsd | Ocu 1-1. */
  nombreReceptor: string;
  /** dRucRec | RUC del receptor | siRecepEvento_v150.xsd | Ocu 0-1. */
  rucReceptor?: string;
  /** dTipIDRec | Tipo de documento de identidad del receptor | siRecepEvento_v150.xsd | Ocu 0-1. */
  tipoDocumentoReceptor?: LiteralUnion<TipoDocumentoReceptor, number>;
  /** dNumIDRec | Número de documento de identidad del receptor | siRecepEvento_v150.xsd | Ocu 0-1. */
  numeroDocumentoReceptor?: string;
  /** dRucEmi | RUC del emisor | siRecepEvento_v150.xsd | Ocu 1-1. */
  rucEmisor: string;
  /** dNomEmi | Nombre o razón social del emisor | siRecepEvento_v150.xsd | Ocu 1-1. */
  nombreEmisor: string;
  /** dTipEnd | Tipo de Endoso | siRecepEvento_v150.xsd | Ocu 1-1; XSD permite 1 o 2. */
  tipoEndoso: LiteralUnion<TipoEndosoEvento, number>;
  /** iTipFac | Tipo de Factor | siRecepEvento_v150.xsd | Ocu 1-1; XSD permite 1. */
  tipoFactor: LiteralUnion<TipoFactorEndosoEvento, number>;
  /** dNomFac | Nombre o razón social del factor | siRecepEvento_v150.xsd | Ocu 1-1. */
  nombreFactor: string;
  /** dRucFac | RUC del factor | siRecepEvento_v150.xsd | Ocu 1-1. */
  rucFactor: string;
  /** dNumCon | Número de contrato | siRecepEvento_v150.xsd | Ocu 0-1. */
  numeroContrato?: string;
  /** dNumRegPubCon | Número de registro público del contrato | siRecepEvento_v150.xsd | Ocu 0-1. */
  numeroRegistroPublicoContrato?: string;
  /** dTotalGs | Total en guaraníes | siRecepEvento_v150.xsd | Ocu 1-1. */
  totalGuaranies: NumBig;
  /** dPorDes | Porcentaje de descuento | siRecepEvento_v150.xsd | Ocu 1-1. */
  porcentajeDescuento: NumBig;
  /** dMonDesMonExt | Monto de descuento en moneda extranjera | siRecepEvento_v150.xsd | Ocu 0-1. */
  montoDescuentoMonedaExtranjera?: NumBig;
  /** dTipCamDesMonExt | Tipo de cambio del descuento en moneda extranjera | siRecepEvento_v150.xsd | Ocu 0-1. */
  tipoCambioDescuentoMonedaExtranjera?: NumBig;
  /** dMonDesGs | Monto de descuento en guaraníes | siRecepEvento_v150.xsd | Ocu 1-1. */
  montoDescuentoGuaranies: NumBig;
  /** dTotOpeEndGs | Total de la operación de endoso en guaraníes | siRecepEvento_v150.xsd | Ocu 1-1. */
  totalOperacionEndosoGuaranies: NumBig;
}

/**
 * GET001 | rGeVeTr | Raíz Gestión de Eventos por actualización de datos del transporte | MT 150 p. 130
 * Observaciones: NT 018 corrige reglas/códigos de validación del evento de transporte.
 */
export interface EventoActualizacionTransporte extends EventoRegistrableBase<'actualizacionTransporte'> {
  /** GET002 | Id | CDC del DTE | MT 150 p. 130 | Ocu 1-1. */
  cdc: string;
  /** GET003 | dMotEv | Motivo del evento | MT 150 p. 130 | Ocu 1-1; 1=local entrega, 2=chofer, 3=transportista, 4=vehículo. */
  motivo: LiteralUnion<MotivoActualizacionTransporteEvento, number>;
  /** GET004 | cDepEnt | Código del departamento del local de la entrega | MT 150 p. 130 | Ocu 0-1; obligatorio si GET003=1. */
  codigoDepartamentoEntrega?: LiteralUnion<CodigoDepartamento, number>;
  /** GET006 | cDisEnt | Código del distrito del local de la entrega | MT 150 p. 130 | Ocu 0-1. */
  codigoDistritoEntrega?: LiteralUnion<CodigoDistrito, number>;
  /** GET008 | cCiuEnt | Código de la ciudad del local de la entrega | MT 150 p. 130 | Ocu 0-1; obligatorio si GET003=1. */
  codigoCiudadEntrega?: LiteralUnion<CodigoCiudad, number>;
  /** GET010 | dDirEnt | Dirección del local de la entrega | MT 150 p. 130 | Ocu 0-1; obligatorio si GET003=1. */
  direccionEntrega?: string;
  /** GET011 | dNumCas | Número de casa del local de la entrega | MT 150 p. 130 | Ocu 0-1; obligatorio si GET003=1. */
  numeroCasaEntrega?: string;
  /** GET012 | dCompDir1 | Complemento de dirección del local de la entrega | MT 150 p. 130 | Ocu 0-1; opcional si GET003=1. */
  complementoDireccionEntrega?: string;
  /** GET013 | dNomChof | Nombre y apellido del chofer | MT 150 p. 131 | Ocu 0-1; obligatorio si GET003=2. */
  nombreChofer?: string;
  /** GET014 | dNumIDChof | Número de documento de identidad del chofer | MT 150 p. 131 | Ocu 0-1; obligatorio si GET003=2. */
  numeroDocumentoChofer?: string;
  /** GET015 | iNatTrans | Naturaleza del transportista | MT 150 p. 131 | Ocu 0-1; obligatorio si GET003=3. */
  naturalezaTransportista?: LiteralUnion<NaturalezaTransportista, number>;
  /** GET016 | dRucTrans | RUC del transportista | MT 150 p. 131 | Ocu 0-1; obligatorio si GET015=1. */
  rucTransportista?: string;
  /** GET018 | dNomTrans | Nombre o razón social del transportista | MT 150 p. 131 | Ocu 0-1; obligatorio si GET003=3. */
  nombreTransportista?: string;
  /** GET019 | iTipIDTrans | Tipo de documento de identidad del transportista | MT 150 p. 131 | Ocu 0-1; obligatorio si GET015=2. */
  tipoDocumentoTransportista?: LiteralUnion<TipoDocumentoTransportista, number>;
  /** GET021 | dNumIDTrans | Número de documento de identidad del transportista | MT 150 p. 131 | Ocu 0-1; obligatorio si existe GET019. */
  numeroDocumentoTransportista?: string;
  /** GET022 | iTipTrans | Tipo de transporte | MT 150 p. 132 | Ocu 0-1; obligatorio si GET003=4. */
  tipoTransporte?: LiteralUnion<TipoTransporte, number>;
  /** GET024 | iModTrans | Modalidad del transporte | MT 150 p. 132 | Ocu 0-1; obligatorio si GET003=4. */
  modalidadTransporte?: LiteralUnion<ModalidadTransporte, number>;
  /** GET026 | dTiVehTras | Tipo de vehículo | MT 150 p. 132 | Ocu 0-1; obligatorio si GET003=4. */
  tipoVehiculo?: string;
  /** GET027 | dMarVeh | Marca del vehículo | MT 150 p. 132 | Ocu 0-1; obligatorio si GET003=4. */
  marcaVehiculo?: string;
  /** GET028 | dTipIdenVeh | Tipo de identificación del vehículo | MT 150 p. 132 | Ocu 0-1; obligatorio si GET003=4. */
  tipoIdentificacionVehiculo?: LiteralUnion<TipoIdentificacionVehiculo, number>;
  /** GET029 | dNroIDVeh | Número de identificación del vehículo | MT 150 p. 132 | Ocu 0-1; informar si GET028=1. */
  numeroIdentificacionVehiculo?: string;
  /** GET030 | dNroMatVeh | Número de matrícula del vehículo | MT 150 p. 132 | Ocu 0-1; informar si GET028=2. */
  matriculaVehiculo?: string;
}

/**
 * GENFE001 | rGEveNom | Raíz Gestión de Eventos Nominación | NT 014 sec. 1.1
 * Observaciones: nominación de Factura Electrónica; NT 027 cambia Tarjeta Diplomática a código 6.
 */
export interface EventoNominacionFacturaElectronica extends EventoRegistrableBase<'nominacionFacturaElectronica'> {
  /** GENFE002 | Id | Identificador del DTE (CDC) | NT 014 sec. 1.1 | Ocu 1-1. */
  cdc: string;
  /** GENFE003 | mOtEve | Motivo del Evento | NT 014 sec. 1.1 | Ocu 1-1; campo abierto. */
  motivo: string;
  /** GENFE004 | iNatRec | Naturaleza del receptor | NT 014 sec. 1.1 | Ocu 1-1; 1=contribuyente, 2=no contribuyente. */
  naturalezaReceptor: LiteralUnion<NaturalezaReceptor, number>;
  /** GENFE027 | iTiOpe | Tipo de operación | NT 014 sec. 1.1 | Ocu 1-1; 1=B2B, 2=B2C, 4=B2F. */
  tipoOperacion: LiteralUnion<TipoOperacion, number>;
  /** GENFE005 | cPaisRec | Código de país del receptor | NT 014 sec. 1.1 | Ocu 1-1; según XSD de países. */
  codigoPaisReceptor: LiteralUnion<CodigoPais, string>;
  /** GENFE007 | iTiContRec | Tipo de contribuyente receptor | NT 014 sec. 1.1 | Ocu 0-1; obligatorio si GENFE004=1. */
  tipoContribuyenteReceptor?: LiteralUnion<TipoContribuyenteReceptor, number>;
  /** GENFE008 | dRucRec | RUC del receptor | NT 014 sec. 1.1 | Ocu 0-1; obligatorio si GENFE004=1. */
  rucReceptor?: string;
  /** GENFE010 | iTipIDRec | Tipo de documento de identidad del receptor | NT 027 sec. 1.1 | Ocu 0-1; código 6=Tarjeta Diplomática. */
  tipoDocumentoReceptor?: LiteralUnion<TipoDocumentoReceptor, number>;
  /** GENFE012 | dNumIDRec | Número de documento de identidad | NT 014 sec. 1.1 | Ocu 0-1; obligatorio si GENFE004=2. */
  numeroDocumentoReceptor?: string;
  /** GENFE013 | dNomRec | Nombre o razón social del receptor del DTE | NT 014 sec. 1.1 | Ocu 1-1. */
  nombreReceptor: string;
  /** GENFE014 | dNomFanRec | Nombre de fantasía | NT 014 sec. 1.1 | Ocu 0-1; campo abierto. */
  nombreFantasiaReceptor?: string;
  /** GENFE015 | dDirRec | Dirección del receptor | NT 014 sec. 1.1 | Ocu 0-1; campo abierto. */
  direccionReceptor?: string;
  /** GENFE016 | dNumCasRec | Número de casa del receptor | NT 014 sec. 1.1 | Ocu 0-1; obligatorio si se informa GENFE015. */
  numeroCasaReceptor?: string;
  /** GENFE017 | cDepRec | Código del departamento del receptor | NT 014 sec. 1.1 | Ocu 0-1; según XSD de departamentos. */
  codigoDepartamentoReceptor?: LiteralUnion<CodigoDepartamento, number>;
  /** GENFE019 | cDisRec | Código del distrito del receptor | NT 014 sec. 1.1 | Ocu 0-1; según tabla de distritos. */
  codigoDistritoReceptor?: LiteralUnion<CodigoDistrito, number>;
  /** GENFE021 | cCiuRec | Código de la ciudad del receptor | NT 014 sec. 1.1 | Ocu 0-1; según tabla de ciudades. */
  codigoCiudadReceptor?: LiteralUnion<CodigoCiudad, number>;
  /** GENFE023 | dTelRec | Número de teléfono del receptor | NT 014 sec. 1.1 | Ocu 0-1; incluir prefijo si GENFE005=PRY. */
  telefonoReceptor?: string;
  /** GENFE024 | dCelRec | Número de celular del receptor | NT 014 sec. 1.1 | Ocu 0-1. */
  celularReceptor?: string;
  /** GENFE025 | dEmailRec | Correo electrónico del receptor | NT 014 sec. 1.1 | Ocu 0-1. */
  emailReceptor?: string;
  /** GENFE026 | dCodCliente | Código del cliente | NT 014 sec. 1.1 | Ocu 0-1. */
  codigoCliente?: string;
}

/** GDE007 | gGroupTiEvt | Grupo de campos del tipo de evento | MT 150 p. 120. */
export type EventoRegistrable =
  | EventoCancelacion
  | EventoInutilizacion
  | EventoNotificacionRecepcion
  | EventoConformidad
  | EventoDisconformidad
  | EventoDesconocimiento
  | EventoEndoso
  | EventoActualizacionTransporte
  | EventoNominacionFacturaElectronica;

export interface EnviarEventoInput {
  digitoControl: string | number;
  evento: EventoRegistrable;
}

export interface Evento {
  tipoXml: string;
  idEvento?: string;
  fechaFirma?: Date;
  fechaFirmaRaw?: string;
  versionFormato?: number;
  versionFormatoRaw?: string;
  eventoXml: string;
  payloadXml: string;
  recepcionXml?: string;
}

/**
 * ContDE01 | rContDe | ContenedorDE_v150.xsd (Contenedor de DE) | Pagina 51
 */
export interface ConsultaDEXML {
  /**
   * ContDE02 | rDE | Archivo XML del DE | Pagina 51
   */
  deXml: string;
  /**
   * ContDE03 | dProtAut | Número de Transacción | Pagina 51
   *
   * Número de transacción del DE, recibido por el contribuyente en el mensaje
   * de respuesta del WS DeRecepDE o del WS deResultLoteDE

   * • definido en el Schema XML 4
   */
  protocoloAutorizacionXml: string;
  /**
   * ContDE04 | xContEv | Contenedor de Evento | Pagina 51
   *
   * Información de todos los eventos registrados (contenedor montado por la SET)
   * o disponibles (contenedor montado por el emisor) hasta la fecha

   * • Definido en el Schema XML 12
   */
  eventos: Evento[];
}
