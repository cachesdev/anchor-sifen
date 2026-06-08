import type { EventoRecepcion } from '../clean/evento';

// Draft event interpretation types preserved from the rich parser spike.
// Phase-1 parsers intentionally return the lean clean Evento instead.
export type EventoXMLValueDraft = string | number | EventoXMLObjectDraft | EventoXMLValueDraft[];

export interface EventoXMLObjectDraft {
  [campo: string]: EventoXMLValueDraft | undefined;
}

export interface EventoBaseDraft<TTipo extends string> {
  tipo: TTipo;
  tipoXml: string;
  idEvento?: string;
  fechaFirma?: Date;
  fechaFirmaRaw?: string;
  versionFormato?: number;
  versionFormatoRaw?: string;
  eventoXml: string;
  sourceXml: string;
  datos: EventoXMLObjectDraft;
  recepcion?: EventoRecepcion;
}

export interface EventoCancelacionDraft extends EventoBaseDraft<'cancelacion'> {
  cdc?: string;
  motivo?: string;
}

export interface EventoInutilizacionDraft extends EventoBaseDraft<'inutilizacion'> {
  numeroTimbrado?: string;
  establecimiento?: string;
  puntoExpedicion?: string;
  numeroInicio?: string;
  numeroFin?: string;
  tipoDE?: number;
  motivo?: string;
  serie?: string;
}

export interface EventoNotificacionRecepcionDraft extends EventoBaseDraft<'notificacionRecepcion'> {
  cdc?: string;
  fechaEmision?: Date;
  fechaRecepcion?: Date;
  tipoReceptor?: number;
  nombreReceptor?: string;
  rucReceptor?: string;
  dvReceptor?: number;
  tipoIdReceptor?: number;
  numeroIdReceptor?: string;
  totalGuaranies?: string;
}

export interface EventoConformidadDraft extends EventoBaseDraft<'conformidad'> {
  cdc?: string;
  tipoConformidad?: number;
  fechaEstimadaRecepcion?: Date;
}

export interface EventoDisconformidadDraft extends EventoBaseDraft<'disconformidad'> {
  cdc?: string;
  motivo?: string;
}

export interface EventoDesconocimientoDraft extends EventoBaseDraft<'desconocimiento'> {
  cdc?: string;
  fechaEmision?: Date;
  fechaRecepcion?: Date;
  tipoReceptor?: number;
  nombreReceptor?: string;
  rucReceptor?: string;
  dvReceptor?: number;
  tipoIdReceptor?: number;
  numeroIdReceptor?: string;
  motivo?: string;
}

export interface EventoAsociacionRetencionDraft extends EventoBaseDraft<'asociacionRetencion'> {
  cdc?: string;
  numeroTimbradoRetencion?: string;
  establecimientoRetencion?: string;
  puntoExpedicionRetencion?: string;
  numeroDocumentoRetencion?: string;
  codigoConceptoRetencion?: string;
  fechaEmisionRetencion?: Date;
}

export interface EventoAnulacionRetencionDraft extends EventoBaseDraft<'anulacionRetencion'> {
  cdc?: string;
  numeroTimbradoRetencion?: string;
  establecimientoRetencion?: string;
  puntoExpedicionRetencion?: string;
  numeroDocumentoRetencion?: string;
  codigoConceptoRetencion?: string;
  fechaEmisionRetencion?: Date;
  fechaAnulacionRetencion?: Date;
}

export interface EventoTransferenciaCreditosFiscalesDraft extends EventoBaseDraft<'transferenciaCreditosFiscales'> {
  cdc?: string;
  numeroTransferencia?: string;
  fechaAceptacion?: Date;
}

export interface EventoDevolucionCreditosFiscalesCuestionadoDraft extends EventoBaseDraft<'devolucionCreditosFiscalesCuestionado'> {
  cdc?: string;
  numeroSolicitudDir?: string;
  numeroInforme?: string;
  numeroResolucion?: string;
  fechaEmisionDir?: Date;
  fechaEmisionInforme?: Date;
  fechaEmisionResolucion?: Date;
}

export interface EventoDevolucionCreditosFiscalesDevueltoDraft extends EventoBaseDraft<'devolucionCreditosFiscalesDevuelto'> {
  cdc?: string;
  numeroSolicitudDir?: string;
  numeroInforme?: string;
  numeroResolucion?: string;
  fechaEmisionDir?: Date;
  fechaEmisionInforme?: Date;
  fechaEmisionResolucion?: Date;
}

export interface EventoAnticipoDraft extends EventoBaseDraft<'anticipo'> {
  cdc?: string;
}

export interface EventoRemisionDraft extends EventoBaseDraft<'remision'> {
  cdc?: string;
}

export interface EventoActualizacionTransporteDraft extends EventoBaseDraft<'actualizacionTransporte'> {
  cdc?: string;
  motivo?: number;
  codigoDepartamento?: number;
  codigoDistrito?: number;
  codigoCiudad?: number;
  direccion?: string;
  numeroCasa?: number;
  complementoDireccion?: string;
  nombreChofer?: string;
  numeroIdChofer?: string;
  naturalezaTransportista?: number;
  rucTransportista?: string;
  dvTransportista?: number;
  nombreTransportista?: string;
  tipoIdTransportista?: number;
  descripcionTipoIdTransportista?: string;
  numeroIdTransportista?: string;
  tipoTransporte?: number;
  descripcionTipoTransporte?: string;
  modalidadTransporte?: number;
  descripcionModalidadTransporte?: string;
  tipoVehiculo?: string;
  marcaVehiculo?: string;
  tipoIdentificacionVehiculo?: number;
  numeroIdentificacionVehiculo?: string;
  matriculaVehiculo?: string;
}

export interface EventoNominacionFacturaElectronicaDraft extends EventoBaseDraft<'nominacionFacturaElectronica'> {
  cdc?: string;
  motivo?: string;
  naturalezaReceptor?: number;
  tipoOperacion?: number;
  codigoPaisReceptor?: string;
  descripcionPaisReceptor?: string;
  tipoContribuyenteReceptor?: number;
  rucReceptor?: string;
  dvReceptor?: number;
  tipoIdReceptor?: number;
  descripcionTipoIdReceptor?: string;
  numeroIdReceptor?: string;
  nombreReceptor?: string;
  nombreFantasia?: string;
  direccionReceptor?: string;
  numeroCasaReceptor?: number;
  codigoDepartamentoReceptor?: number;
  codigoDistritoReceptor?: number;
  codigoCiudadReceptor?: number;
  telefonoReceptor?: string;
  celularReceptor?: string;
  emailReceptor?: string;
  codigoCliente?: string;
}

export interface EventoDesconocidoDraft extends EventoBaseDraft<'desconocido'> {
  tipoXml: string;
}

export type EventoInterpretadoDraft =
  | EventoCancelacionDraft
  | EventoInutilizacionDraft
  | EventoNotificacionRecepcionDraft
  | EventoConformidadDraft
  | EventoDisconformidadDraft
  | EventoDesconocimientoDraft
  | EventoAsociacionRetencionDraft
  | EventoAnulacionRetencionDraft
  | EventoTransferenciaCreditosFiscalesDraft
  | EventoDevolucionCreditosFiscalesCuestionadoDraft
  | EventoDevolucionCreditosFiscalesDevueltoDraft
  | EventoAnticipoDraft
  | EventoRemisionDraft
  | EventoActualizacionTransporteDraft
  | EventoNominacionFacturaElectronicaDraft
  | EventoDesconocidoDraft;
