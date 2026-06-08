import type { CodigoCiudad, DescripcionCodigoCiudad } from '../../../gen/ciudades';
import type { CodigoDepartamento, DescripcionCodigoDepartamento } from '../../../gen/departamentos';
import type { CodigoDistrito, DescripcionCodigoDistrito } from '../../../gen/distritos';
import type { CodigoPais, DescripcionCodigoPais } from '../../../gen/paises';
import type {
  DescripcionModalidadTransporte,
  DescripcionTipoDocumentoReceptor,
  DescripcionTipoDocumentoTransportista,
  DescripcionTipoTransporte,
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

/**
 * GEC001 | rGeVeCan | Raíz Gestión de Eventos Cancelación | MT 150 p. 121
 * Observaciones: elemento raíz del evento emisor de cancelación bajo GDE007.
 */
export interface RGeVeCan {
  /** GEC002 | Id | Identificador del DTE (CDC) | MT 150 p. 121 | Ocu 1-1. */
  Id: string;
  /** GEC003 | mOtEve | Motivo del Evento | MT 150 p. 121 | Ocu 1-1; campo abierto. */
  mOtEve: string;
}

/**
 * GEI001 | rGeVeInu | Raíz Gestión de Eventos Inutilización | MT 150 p. 121
 * Observaciones: evento emisor para inutilización de rango de numeración de DE.
 */
export interface RGeVeInu {
  /** GEI002 | dNumTim | Número del Timbrado | MT 150 p. 122 | Ocu 1-1. */
  dNumTim: string;
  /** GEI003 | dEst | Establecimiento | MT 150 p. 122 | Ocu 1-1; completar con ceros a la izquierda. */
  dEst: string;
  /** GEI004 | dPunExp | Punto de expedición | MT 150 p. 122 | Ocu 1-1; completar con ceros a la izquierda. */
  dPunExp: string;
  /** GEI005 | dNumIn | Número Inicio del rango del documento | MT 150 p. 122 | Ocu 1-1; máximo 1000 números. */
  dNumIn: string;
  /** GEI006 | dNumFin | Número Final del rango del documento | MT 150 p. 122 | Ocu 1-1. */
  dNumFin: string;
  /** GEI007 | iTiDE | Tipo de Documento Electrónico | MT 150 p. 122 | Ocu 1-1. */
  iTiDE: TipoDocumentoElectronico;
  /** GEI008 | mOtEve | Motivo del Evento | MT 150 p. 122 | Ocu 1-1; campo libre. */
  mOtEve: string;
  /** dSerieNum | Serie del número de documento | NT 010 | Ocu 0-1. */
  dSerieNum?: string;
}

/**
 * GEN001 | rGeVeNotRec | Raíz Gestión de Eventos Notificación - Recepción DE o DTE | MT 150 p. 123
 * Observaciones: evento receptor informativo; NT 019 actualiza reglas de secuencia y plazo.
 */
export interface RGeVeNotRec {
  /** GEN002 | Id | Identificador del DE/DTE (CDC) | MT 150 p. 123 | Ocu 1-1. */
  Id: string;
  /** GEN003 | dFecEmi | Fecha de emisión del DE/DTE | MT 150 p. 123 | Ocu 1-1; formato AAAA-MM-DDThh:mm:ss. */
  dFecEmi: string;
  /** GEN004 | dFecRecep | Fecha Recepción DE | MT 150 p. 123 | Ocu 1-1; recepción física o electrónica. */
  dFecRecep: string;
  /** GEN005 | iTipRec | Tipo de Receptor | MT 150 p. 123 | Ocu 1-1; 1=Contribuyente, 2=No Contribuyente. */
  iTipRec: NaturalezaReceptor;
  /** GEN006 | dNomRec | Nombre o Razón Social del Receptor del DE/DTE | MT 150 p. 123 | Ocu 1-1. */
  dNomRec: string;
  /** GEN007 | dRucRec | RUC del Receptor | MT 150 p. 123 | Ocu 0-1; requerido si GEN005=1. */
  dRucRec?: string;
  /** GEN008 | dDVRec | Dígito verificador del RUC del receptor | MT 150 p. 123 | Ocu 0-1; requerido si GEN005=1. */
  dDVRec?: string;
  /** GEN009 | dTipIDRec | Tipo de documento de identidad del receptor | MT 150 p. 123 | Ocu 0-1; requerido si GEN005=2. */
  dTipIDRec?: TipoDocumentoReceptor;
  /** GEN010 | dNumID | Número de documento de identidad | MT 150 p. 123 | Ocu 0-1; requerido si GEN005=2. */
  dNumID?: string;
  /** GEN011 | dTotalGs | Total general de la operación en Guaraníes | MT 150 p. 123 | Ocu 1-1. */
  dTotalGs: string;
}

/**
 * GCO001 | rGeVeConf | Raíz Gestión de Eventos Conformidad | MT 150 p. 124
 * Observaciones: evento receptor conclusivo; NT 019 actualiza reglas de secuencia y plazo.
 */
export interface RGeVeConf {
  /** GCO002 | Id | CDC del DTE | MT 150 p. 124 | Ocu 1-1. */
  Id: string;
  /** GCO003 | iTipConf | Tipo de Conformidad | MT 150 p. 124 | Ocu 1-1; 1=total, 2=parcial. */
  iTipConf: TipoConformidadEvento;
  /** GCO004 | dFecRecep | Fecha Estimada de Recepción | MT 150 p. 124 | Ocu 0-1; obligatorio si GCO003=2. */
  dFecRecep?: string;
}

/**
 * GDI001 | rGeVeDisconf | Raíz Gestión de Eventos Disconformidad | MT 150 p. 124
 * Observaciones: evento receptor conclusivo; NT 019 actualiza reglas de secuencia y plazo.
 */
export interface RGeVeDisconf {
  /** GDI002 | Id | CDC del DTE | MT 150 p. 124 | Ocu 1-1. */
  Id: string;
  /** GDI004 | mOtEve | Motivo del Evento | MT 150 p. 124 | Ocu 1-1. */
  mOtEve: string;
}

/**
 * GED001 | rGeVeDescon | Raíz Gestión de Eventos Desconocimiento | MT 150 p. 124
 * Observaciones: evento receptor informativo; NT 019 actualiza reglas de secuencia y plazo.
 */
export interface RGeVeDescon {
  /** GED002 | Id | CDC del DE/DTE | MT 150 p. 124 | Ocu 1-1. */
  Id: string;
  /** GED003 | dFecEmi | Fecha de emisión del DE/DTE | MT 150 p. 125 | Ocu 1-1; formato AAAA-MM-DDThh:mm:ss. */
  dFecEmi: string;
  /** GED004 | dFecRecep | Fecha Recepción DE | MT 150 p. 125 | Ocu 1-1; formato AAAA-MM-DDThh:mm:ss. */
  dFecRecep: string;
  /** GED005 | iTipRec | Tipo de Receptor | MT 150 p. 125 | Ocu 1-1; 1=Contribuyente, 2=No Contribuyente. */
  iTipRec: NaturalezaReceptor;
  /** GED006 | dNomRec | Nombre o Razón Social del Receptor del DE/DTE | MT 150 p. 125 | Ocu 1-1. */
  dNomRec: string;
  /** GED007 | dRucRec | RUC del Receptor | MT 150 p. 125 | Ocu 0-1; requerido si GED005=1. */
  dRucRec?: string;
  /** GED008 | dDVRec | Dígito verificador del RUC del receptor | MT 150 p. 125 | Ocu 0-1; requerido si GED005=1. */
  dDVRec?: string;
  /** GED009 | dTipIDRec | Tipo de documento de identidad del receptor | MT 150 p. 125 | Ocu 0-1; requerido si GED005=2. */
  dTipIDRec?: TipoDocumentoReceptor;
  /** GED010 | dNumID | Número de documento de identidad | MT 150 p. 125 | Ocu 0-1; requerido si GED005=2. */
  dNumID?: string;
  /** GED011 | mOtEve | Motivo del Evento | MT 150 p. 125 | Ocu 1-1. */
  mOtEve: string;
}

/**
 * rGeVeEnd | Raíz Gestión de Eventos Endoso | siRecepEvento_v150.xsd
 * Observaciones: MT 150 p. 114 presenta Endoso de FE como evento futuro; el XSD vigente restringe algunos códigos.
 */
export interface RGeVeEnd {
  /** Id | CDC del DTE endosado | siRecepEvento_v150.xsd | Ocu 1-1. */
  Id: string;
  /** iTipRec | Tipo de Receptor | siRecepEvento_v150.xsd | Ocu 1-1; 1=Contribuyente, 2=No Contribuyente. */
  iTipRec: NaturalezaReceptor;
  /** dNomRec | Nombre o razón social del receptor | siRecepEvento_v150.xsd | Ocu 1-1. */
  dNomRec: string;
  /** dRucRec | RUC del receptor | siRecepEvento_v150.xsd | Ocu 0-1. */
  dRucRec?: string;
  /** dDVRec | Dígito verificador del RUC del receptor | siRecepEvento_v150.xsd | Ocu 0-1. */
  dDVRec?: string;
  /** dTipIDRec | Tipo de documento de identidad del receptor | siRecepEvento_v150.xsd | Ocu 0-1. */
  dTipIDRec?: TipoDocumentoReceptor;
  /** dNumIDRec | Número de documento de identidad del receptor | siRecepEvento_v150.xsd | Ocu 0-1. */
  dNumIDRec?: string;
  /** dRucEmi | RUC del emisor | siRecepEvento_v150.xsd | Ocu 1-1. */
  dRucEmi: string;
  /** dDVEmi | Dígito verificador del RUC del emisor | siRecepEvento_v150.xsd | Ocu 1-1. */
  dDVEmi: string;
  /** dNomEmi | Nombre o razón social del emisor | siRecepEvento_v150.xsd | Ocu 1-1. */
  dNomEmi: string;
  /** dTipEnd | Tipo de Endoso | siRecepEvento_v150.xsd | Ocu 1-1; XSD permite 1 o 2. */
  dTipEnd: TipoEndosoEvento;
  /** iTipFac | Tipo de Factor | siRecepEvento_v150.xsd | Ocu 1-1; XSD permite 1. */
  iTipFac: TipoFactorEndosoEvento;
  /** dNomFac | Nombre o razón social del factor | siRecepEvento_v150.xsd | Ocu 1-1. */
  dNomFac: string;
  /** dRucFac | RUC del factor | siRecepEvento_v150.xsd | Ocu 1-1. */
  dRucFac: string;
  /** dDVFac | Dígito verificador del RUC del factor | siRecepEvento_v150.xsd | Ocu 1-1. */
  dDVFac: string;
  /** dNumCon | Número de contrato | siRecepEvento_v150.xsd | Ocu 0-1. */
  dNumCon?: string;
  /** dNumRegPubCon | Número de registro público del contrato | siRecepEvento_v150.xsd | Ocu 0-1. */
  dNumRegPubCon?: string;
  /** dTotalGs | Total en guaraníes | siRecepEvento_v150.xsd | Ocu 1-1. */
  dTotalGs: string;
  /** dPorDes | Porcentaje de descuento | siRecepEvento_v150.xsd | Ocu 1-1. */
  dPorDes: string;
  /** dMonDesMonExt | Monto de descuento en moneda extranjera | siRecepEvento_v150.xsd | Ocu 0-1. */
  dMonDesMonExt?: string;
  /** dTipCamDesMonExt | Tipo de cambio del descuento en moneda extranjera | siRecepEvento_v150.xsd | Ocu 0-1. */
  dTipCamDesMonExt?: string;
  /** dMonDesGs | Monto de descuento en guaraníes | siRecepEvento_v150.xsd | Ocu 1-1. */
  dMonDesGs: string;
  /** dTotOpeEndGs | Total de la operación de endoso en guaraníes | siRecepEvento_v150.xsd | Ocu 1-1. */
  dTotOpeEndGs: string;
}

/**
 * GET001 | rGeVeTr | Raíz Gestión de Eventos por actualización de datos del transporte | MT 150 p. 130
 * Observaciones: NT 018 corrige reglas/códigos de validación del evento de transporte.
 */
export interface RGeVeTr {
  /** GET002 | Id | CDC del DTE | MT 150 p. 130 | Ocu 1-1. */
  Id: string;
  /** GET003 | dMotEv | Motivo del evento | MT 150 p. 130 | Ocu 1-1; 1=local entrega, 2=chofer, 3=transportista, 4=vehículo. */
  dMotEv: MotivoActualizacionTransporteEvento;
  /** GET004 | cDepEnt | Código del departamento del local de la entrega | MT 150 p. 130 | Ocu 0-1; obligatorio si GET003=1. */
  cDepEnt?: CodigoDepartamento;
  /** GET005 | dDesDepEnt | Descripción del departamento del local de la entrega | MT 150 p. 130 | Ocu 0-1; referente a GET004. */
  dDesDepEnt?: DescripcionCodigoDepartamento;
  /** GET006 | cDisEnt | Código del distrito del local de la entrega | MT 150 p. 130 | Ocu 0-1. */
  cDisEnt?: CodigoDistrito;
  /** GET007 | dDesDisEnt | Descripción de distrito del local de la entrega | MT 150 p. 130 | Ocu 0-1; obligatorio si existe GET006. */
  dDesDisEnt?: DescripcionCodigoDistrito;
  /** GET008 | cCiuEnt | Código de la ciudad del local de la entrega | MT 150 p. 130 | Ocu 0-1; obligatorio si GET003=1. */
  cCiuEnt?: CodigoCiudad;
  /** GET009 | dDesCiuEnt | Descripción de ciudad del local de la entrega | MT 150 p. 130 | Ocu 0-1; referente a GET008. */
  dDesCiuEnt?: DescripcionCodigoCiudad;
  /** GET010 | dDirEnt | Dirección del local de la entrega | MT 150 p. 130 | Ocu 0-1; obligatorio si GET003=1. */
  dDirEnt?: string;
  /** GET011 | dNumCas | Número de casa del local de la entrega | MT 150 p. 130 | Ocu 0-1; obligatorio si GET003=1. */
  dNumCas?: string;
  /** GET012 | dCompDir1 | Complemento de dirección del local de la entrega | MT 150 p. 130 | Ocu 0-1; opcional si GET003=1. */
  dCompDir1?: string;
  /** GET013 | dNomChof | Nombre y apellido del chofer | MT 150 p. 131 | Ocu 0-1; obligatorio si GET003=2. */
  dNomChof?: string;
  /** GET014 | dNumIDChof | Número de documento de identidad del chofer | MT 150 p. 131 | Ocu 0-1; obligatorio si GET003=2. */
  dNumIDChof?: string;
  /** GET015 | iNatTrans | Naturaleza del transportista | MT 150 p. 131 | Ocu 0-1; obligatorio si GET003=3. */
  iNatTrans?: NaturalezaTransportista;
  /** GET016 | dRucTrans | RUC del transportista | MT 150 p. 131 | Ocu 0-1; obligatorio si GET015=1. */
  dRucTrans?: string;
  /** GET017 | dDVTrans | Dígito verificador del RUC del transportista | MT 150 p. 131 | Ocu 0-1; obligatorio si GET015=1. */
  dDVTrans?: string;
  /** GET018 | dNomTrans | Nombre o razón social del transportista | MT 150 p. 131 | Ocu 0-1; obligatorio si GET003=3. */
  dNomTrans?: string;
  /** GET019 | iTipIDTrans | Tipo de documento de identidad del transportista | MT 150 p. 131 | Ocu 0-1; obligatorio si GET015=2. */
  iTipIDTrans?: TipoDocumentoTransportista;
  /** GET020 | dDTipIDTrans | Descripción del tipo de documento de identidad del transportista | MT 150 p. 131 | Ocu 0-1; obligatorio si existe GET019. */
  dDTipIDTrans?: DescripcionTipoDocumentoTransportista;
  /** GET021 | dNumIDTrans | Número de documento de identidad del transportista | MT 150 p. 131 | Ocu 0-1; obligatorio si existe GET019. */
  dNumIDTrans?: string;
  /** GET022 | iTipTrans | Tipo de transporte | MT 150 p. 132 | Ocu 0-1; obligatorio si GET003=4. */
  iTipTrans?: TipoTransporte;
  /** GET023 | dDesTipTrans | Descripción del tipo de transporte | MT 150 p. 132 | Ocu 0-1; obligatorio si existe GET022. */
  dDesTipTrans?: DescripcionTipoTransporte;
  /** GET024 | iModTrans | Modalidad del transporte | MT 150 p. 132 | Ocu 0-1; obligatorio si GET003=4. */
  iModTrans?: ModalidadTransporte;
  /** GET025 | dDesModTrans | Descripción de la modalidad del transporte | MT 150 p. 132 | Ocu 0-1; referente a GET024. */
  dDesModTrans?: DescripcionModalidadTransporte;
  /** GET026 | dTiVehTras | Tipo de vehículo | MT 150 p. 132 | Ocu 0-1; obligatorio si GET003=4. */
  dTiVehTras?: string;
  /** GET027 | dMarVeh | Marca del vehículo | MT 150 p. 132 | Ocu 0-1; obligatorio si GET003=4. */
  dMarVeh?: string;
  /** GET028 | dTipIdenVeh | Tipo de identificación del vehículo | MT 150 p. 132 | Ocu 0-1; obligatorio si GET003=4. */
  dTipIdenVeh?: TipoIdentificacionVehiculo;
  /** GET029 | dNroIDVeh | Número de identificación del vehículo | MT 150 p. 132 | Ocu 0-1; informar si GET028=1. */
  dNroIDVeh?: string;
  /** GET030 | dNroMatVeh | Número de matrícula del vehículo | MT 150 p. 132 | Ocu 0-1; informar si GET028=2. */
  dNroMatVeh?: string;
}

/**
 * GENFE001 | rGEveNom | Raíz Gestión de Eventos Nominación | NT 014 sec. 1.1
 * Observaciones: evento de nominación de Factura Electrónica; NT 027 cambia Tarjeta Diplomática a código 6.
 */
export interface RGEveNom {
  /** GENFE002 | Id | Identificador del DTE (CDC) | NT 014 sec. 1.1 | Ocu 1-1. */
  Id: string;
  /** GENFE003 | mOtEve | Motivo del Evento | NT 014 sec. 1.1 | Ocu 1-1; campo abierto. */
  mOtEve: string;
  /** GENFE004 | iNatRec | Naturaleza del receptor | NT 014 sec. 1.1 | Ocu 1-1; 1=contribuyente, 2=no contribuyente. */
  iNatRec: NaturalezaReceptor;
  /** GENFE027 | iTiOpe | Tipo de operación | NT 014 sec. 1.1 | Ocu 1-1; 1=B2B, 2=B2C, 4=B2F. */
  iTiOpe: TipoOperacion;
  /** GENFE005 | cPaisRec | Código de país del receptor | NT 014 sec. 1.1 | Ocu 1-1; según XSD de países. */
  cPaisRec: CodigoPais;
  /** GENFE006 | dDesPaisRe | Descripción del país receptor | NT 014 sec. 1.1 | Ocu 1-1; referente a GENFE005. */
  dDesPaisRe: DescripcionCodigoPais;
  /** GENFE007 | iTiContRec | Tipo de contribuyente receptor | NT 014 sec. 1.1 | Ocu 0-1; obligatorio si GENFE004=1. */
  iTiContRec?: TipoContribuyenteReceptor;
  /** GENFE008 | dRucRec | RUC del receptor | NT 014 sec. 1.1 | Ocu 0-1; obligatorio si GENFE004=1. */
  dRucRec?: string;
  /** GENFE009 | dDVRec | Dígito verificador del RUC del receptor | NT 014 sec. 1.1 | Ocu 0-1; obligatorio si existe GENFE008. */
  dDVRec?: string;
  /** GENFE010 | iTipIDRec | Tipo de documento de identidad del receptor | NT 027 sec. 1.1 | Ocu 0-1; código 6=Tarjeta Diplomática. */
  iTipIDRec?: TipoDocumentoReceptor;
  /** GENFE011 | dDTipIDRec | Descripción del tipo de documento de identidad | NT 027 sec. 1.1 | Ocu 0-1; obligatorio si existe GENFE010. */
  dDTipIDRec?: DescripcionTipoDocumentoReceptor;
  /** GENFE012 | dNumIDRec | Número de documento de identidad | NT 014 sec. 1.1 | Ocu 0-1; obligatorio si GENFE004=2. */
  dNumIDRec?: string;
  /** GENFE013 | dNomRec | Nombre o razón social del receptor del DTE | NT 014 sec. 1.1 | Ocu 1-1. */
  dNomRec: string;
  /** GENFE014 | dNomFanRec | Nombre de fantasía | NT 014 sec. 1.1 | Ocu 0-1; campo abierto. */
  dNomFanRec?: string;
  /** GENFE015 | dDirRec | Dirección del receptor | NT 014 sec. 1.1 | Ocu 0-1; campo abierto. */
  dDirRec?: string;
  /** GENFE016 | dNumCasRec | Número de casa del receptor | NT 014 sec. 1.1 | Ocu 0-1; obligatorio si se informa GENFE015. */
  dNumCasRec?: string;
  /** GENFE017 | cDepRec | Código del departamento del receptor | NT 014 sec. 1.1 | Ocu 0-1; según XSD de departamentos. */
  cDepRec?: CodigoDepartamento;
  /** GENFE018 | dDesDepRec | Descripción del departamento del receptor | NT 014 sec. 1.1 | Ocu 0-1; referente a GENFE017. */
  dDesDepRec?: DescripcionCodigoDepartamento;
  /** GENFE019 | cDisRec | Código del distrito del receptor | NT 014 sec. 1.1 | Ocu 0-1; según tabla de distritos. */
  cDisRec?: CodigoDistrito;
  /** GENFE020 | dDesDisRec | Descripción del distrito del receptor | NT 014 sec. 1.1 | Ocu 0-1; obligatorio si existe GENFE019. */
  dDesDisRec?: DescripcionCodigoDistrito;
  /** GENFE021 | cCiuRec | Código de la ciudad del receptor | NT 014 sec. 1.1 | Ocu 0-1; según tabla de ciudades. */
  cCiuRec?: CodigoCiudad;
  /** GENFE022 | dDesCiuRec | Descripción de la ciudad del receptor | NT 014 sec. 1.1 | Ocu 0-1; referente a GENFE021. */
  dDesCiuRec?: DescripcionCodigoCiudad;
  /** GENFE023 | dTelRec | Número de teléfono del receptor | NT 014 sec. 1.1 | Ocu 0-1; incluir prefijo si GENFE005=PRY. */
  dTelRec?: string;
  /** GENFE024 | dCelRec | Número de celular del receptor | NT 014 sec. 1.1 | Ocu 0-1. */
  dCelRec?: string;
  /** GENFE025 | dEmailRec | Correo electrónico del receptor | NT 014 sec. 1.1 | Ocu 0-1. */
  dEmailRec?: string;
  /** GENFE026 | dCodCliente | Código del cliente | NT 014 sec. 1.1 | Ocu 0-1. */
  dCodCliente?: string;
}

/**
 * GDE007 | gGroupTiEvt | Grupo de campos del tipo de evento | MT 150 p. 120
 * Observaciones: debe contener exactamente un evento registrable.
 */
export type GGroupTiEvt =
  | { rGeVeCan: RGeVeCan }
  | { rGeVeInu: RGeVeInu }
  | { rGeVeNotRec: RGeVeNotRec }
  | { rGeVeConf: RGeVeConf }
  | { rGeVeDisconf: RGeVeDisconf }
  | { rGeVeDescon: RGeVeDescon }
  | { rGeVeEnd: RGeVeEnd }
  | { rGeVeTr: RGeVeTr }
  | { rGEveNom: RGEveNom };

/**
 * GDE002 | rEve | Grupos de campos generales del evento | MT 150 p. 120
 * Observaciones: grupo incluido en la firma digital.
 */
export interface REve {
  /** GDE004 | dFecFirma | Fecha y Hora del firmado | MT 150 p. 120 | Ocu 1-1; formato AAAA-MM-DDThh:mm:ss. */
  dFecFirma: string;
  /** GDE005 | dVerFor | Versión del formato | MT 150 p. 120 | Ocu 1-1; control de versiones. */
  dVerFor: 150;
  /** GDE007 | gGroupTiEvt | Grupo de campos del tipo de evento | MT 150 p. 120 | Ocu 1-1. */
  gGroupTiEvt: GGroupTiEvt;
}

/**
 * GDE001 | rGesEve | Raíz de Gestión de Eventos | MT 150 p. 120
 * Observaciones: siRecepEvento permite hasta 15 eventos por envío.
 */
export interface RGesEve {
  /** GDE003 | Id | Identificador del evento | MT 150 p. 120 | Ocu 1-1; atributo de rEve. */
  idEvento: string;
  /** GDE002 | rEve | Grupos de campos generales del evento | MT 150 p. 120 | Ocu 1-1. */
  rEve: REve;
}
