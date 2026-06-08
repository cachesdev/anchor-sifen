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

// Eventos registrables por siRecepEvento

export interface EventoRegistrableBase<TTipo extends string> {
  tipo: TTipo;
  idEvento: string;
}

export interface EventoCancelacion extends EventoRegistrableBase<'cancelacion'> {
  cdc: string;
  motivo: string;
}

export interface EventoInutilizacion extends EventoRegistrableBase<'inutilizacion'> {
  numeroTimbrado: string;
  establecimiento: string;
  puntoExpedicion: string;
  numeroInicio: string;
  numeroFin: string;
  tipoDE: LiteralUnion<TipoDocumentoElectronico, number>;
  motivo: string;
  serie?: string;
}

export interface EventoNotificacionRecepcion extends EventoRegistrableBase<'notificacionRecepcion'> {
  cdc: string;
  fechaEmision: Date;
  fechaRecepcion: Date;
  tipoReceptor: LiteralUnion<NaturalezaReceptor, number>;
  nombreReceptor: string;
  rucReceptor?: string;
  tipoDocumentoReceptor?: LiteralUnion<TipoDocumentoReceptor, number>;
  numeroDocumentoReceptor?: string;
  totalGuaranies: NumBig;
}

export interface EventoConformidad extends EventoRegistrableBase<'conformidad'> {
  cdc: string;
  tipoConformidad: LiteralUnion<TipoConformidadEvento, number>;
  fechaRecepcion?: Date;
}

export interface EventoDisconformidad extends EventoRegistrableBase<'disconformidad'> {
  cdc: string;
  motivo: string;
}

export interface EventoDesconocimiento extends EventoRegistrableBase<'desconocimiento'> {
  cdc: string;
  fechaEmision: Date;
  fechaRecepcion: Date;
  tipoReceptor: LiteralUnion<NaturalezaReceptor, number>;
  nombreReceptor: string;
  rucReceptor?: string;
  tipoDocumentoReceptor?: LiteralUnion<TipoDocumentoReceptor, number>;
  numeroDocumentoReceptor?: string;
  motivo: string;
}

export interface EventoEndoso extends EventoRegistrableBase<'endoso'> {
  cdc: string;
  tipoReceptor: LiteralUnion<NaturalezaReceptor, number>;
  nombreReceptor: string;
  rucReceptor?: string;
  tipoDocumentoReceptor?: LiteralUnion<TipoDocumentoReceptor, number>;
  numeroDocumentoReceptor?: string;
  rucEmisor: string;
  nombreEmisor: string;
  tipoEndoso: LiteralUnion<TipoEndosoEvento, number>;
  tipoFactor: LiteralUnion<TipoFactorEndosoEvento, number>;
  nombreFactor: string;
  rucFactor: string;
  numeroContrato?: string;
  numeroRegistroPublicoContrato?: string;
  totalGuaranies: NumBig;
  porcentajeDescuento: NumBig;
  montoDescuentoMonedaExtranjera?: NumBig;
  tipoCambioDescuentoMonedaExtranjera?: NumBig;
  montoDescuentoGuaranies: NumBig;
  totalOperacionEndosoGuaranies: NumBig;
}

export interface EventoActualizacionTransporte extends EventoRegistrableBase<'actualizacionTransporte'> {
  cdc: string;
  motivo: LiteralUnion<MotivoActualizacionTransporteEvento, number>;
  codigoDepartamentoEntrega?: LiteralUnion<CodigoDepartamento, number>;
  codigoDistritoEntrega?: LiteralUnion<CodigoDistrito, number>;
  codigoCiudadEntrega?: LiteralUnion<CodigoCiudad, number>;
  direccionEntrega?: string;
  numeroCasaEntrega?: string;
  complementoDireccionEntrega?: string;
  nombreChofer?: string;
  numeroDocumentoChofer?: string;
  naturalezaTransportista?: LiteralUnion<NaturalezaTransportista, number>;
  rucTransportista?: string;
  nombreTransportista?: string;
  tipoDocumentoTransportista?: LiteralUnion<TipoDocumentoTransportista, number>;
  numeroDocumentoTransportista?: string;
  tipoTransporte?: LiteralUnion<TipoTransporte, number>;
  modalidadTransporte?: LiteralUnion<ModalidadTransporte, number>;
  tipoVehiculo?: string;
  marcaVehiculo?: string;
  tipoIdentificacionVehiculo?: LiteralUnion<TipoIdentificacionVehiculo, number>;
  numeroIdentificacionVehiculo?: string;
  matriculaVehiculo?: string;
}

export interface EventoNominacionFacturaElectronica extends EventoRegistrableBase<'nominacionFacturaElectronica'> {
  cdc: string;
  motivo: string;
  naturalezaReceptor: LiteralUnion<NaturalezaReceptor, number>;
  tipoOperacion: LiteralUnion<TipoOperacion, number>;
  codigoPaisReceptor: LiteralUnion<CodigoPais, string>;
  tipoContribuyenteReceptor?: LiteralUnion<TipoContribuyenteReceptor, number>;
  rucReceptor?: string;
  tipoDocumentoReceptor?: LiteralUnion<TipoDocumentoReceptor, number>;
  numeroDocumentoReceptor?: string;
  nombreReceptor: string;
  nombreFantasiaReceptor?: string;
  direccionReceptor?: string;
  numeroCasaReceptor?: string;
  codigoDepartamentoReceptor?: LiteralUnion<CodigoDepartamento, number>;
  codigoDistritoReceptor?: LiteralUnion<CodigoDistrito, number>;
  codigoCiudadReceptor?: LiteralUnion<CodigoCiudad, number>;
  telefonoReceptor?: string;
  celularReceptor?: string;
  emailReceptor?: string;
  codigoCliente?: string;
}

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
