// SIFEN Events - Chapter 11 (Gestión de eventos) — v150
// Implements core event groups (GDE, GEC, GEI, GEN, GCO, GDI, GED, GEA and related) per Manual Técnico v150

import type { INatRec, ITiDE } from './enums';
import type { Signature } from './i';

/**
 * GDE - GDE000 | Raíz del grupo de eventos | Pagina 120
 */
export interface gGroupGesEve {
  /**
   * GDE - GDE001 | rGesEve | Raíz de Gestión de Eventos (1..15)
   */
  rGesEve: [rGesEve, ...rGesEve[]];
}

/**
 * GDE - GDE001 | rGesEve | Raíz de Gestión de Eventos | Pagina 120
 */
export interface rGesEve {
  /** GDE - GDE002 | rEve | Grupos de campos generales del evento */
  rEve: rEve;
  /** GDE - GDE008 | Signature | Firma Digital del campo rEve (GDE001) */
  Signature: Signature;
}

/**
 * GDE - GDE002 | rEve | Grupos de campos generales del evento | Pagina 120
 */
export interface rEve {
  /** GDE - GDE003 | Id | Identificador del evento (atributo) */
  Id: number;
  /** GDE - GDE004 | dFecFirma | Fecha y Hora del firmado */
  dFecFirma: string; // AAAA-MM-DDThh:mm:ss
  /** GDE - GDE005 | dVerFor | Versión del formato */
  dVerFor: 150;
  /** GDE - GDE006 | dTiGDE | Tipo de Evento */
  dTiGDE: DTiGDE;
  /** GDE - GDE007 | gGroupTiEvt | Grupo correspondiente al tipo de evento (dependiente de dTiGDE) */
  gGroupTiEvt:
    | GecCancelacion
    | GeiInutilizacion
    | GenNotificacion
    | GcoConformidad
    | GdiDisconformidad
    | GedDesconocimiento
    | GeaRetencion
    | GeraRetencion
    | GecfCreditosFiscales
    | GedfDevolucionCreditos
    | GeddDevolucionCreditos
    | GeaAnticipo
    | GereRemision
    | GetTransUpdate;
}

// --- Evento Anticipo (GEA) ---
export interface GeaAnticipo {
  rGeVeAnt: {
    /** GEA002 | Id | CDC del DTE asociado */
    Id: string; // 44 chars CDC
  };
}

// --- Evento Remisión (GERE) ---
export interface GereRemision {
  rGeVeRem: {
    /** GERE002 | Id | CDC del DTE asociado */
    Id: string; // 44 chars CDC
  };
}

// --- Evento actualización de datos del transporte (GET) ---
export interface GetTransUpdate {
  rGeVeTr: {
    /** GET002 | Id | CDC del DTE */
    Id: string; // 44 chars
    /** GET003 | dMotEv | Motivo del evento | 1=Local entrega,2=Chofer,3=Transportista,4=Vehículo */
    dMotEv: number;
    /** GET004 | cDepEnt | Código del departamento del local de la entrega */
    cDepEnt?: number;
    /** GET005 | dDesDepEnt | Descripción del departamento del local de la entrega */
    dDesDepEnt?: string;
    /** GET006 | cDisEnt | Código del distrito del local de la entrega */
    cDisEnt?: number;
    /** GET007 | dDesDisEnt | Descripción del distrito del local de la entrega */
    dDesDisEnt?: string;
    /** GET008 | cCiuEnt | Código de la ciudad del local de la entrega */
    cCiuEnt?: number;
    /** GET009 | dDesCiuEnt | Descripción de ciudad del local de la entrega */
    dDesCiuEnt?: string;
    /** GET010 | dDirEnt | Dirección del local de la entrega */
    dDirEnt?: string;
    /** GET011 | dNumCas | Número de casa del local de la entrega */
    dNumCas?: number;
    /** GET012 | dCompDir1 | Complemento de dirección del local de la entrega */
    dCompDir1?: string;
    /** GET013 | dNomChof | Nombre y apellido del chofer */
    dNomChof?: string;
    /** GET014 | dNumIDChof | Número de documento de identidad del chofer */
    dNumIDChof?: string;
    /** GET015 | iNatTrans | Naturaleza del transportista (1=Contribuyente,2=No contribuyente) */
    iNatTrans?: number;
    /** GET016 | dRucTrans | RUC del transportista */
    dRucTrans?: string;
    /** GET017 | dDVTrans | Dígito verificador del RUC del transportista */
    dDVTrans?: number;
    /** GET018 | dNomTrans | Nombre o razón social del transportista */
    dNomTrans?: string;
    /** GET019 | iTipIDTrans | Tipo de documento de identidad del transportista */
    iTipIDTrans?: number;
    /** GET020 | dDTipIDTrans | Descripción del tipo de documento de identidad del transportista */
    dDTipIDTrans?: string;
    /** GET021 | dNumIDTrans | Número de documento de identidad del transportista */
    dNumIDTrans?: string;
    /** GET022 | iTipTrans | Tipo de transporte (1=Propio,2=Tercero) */
    iTipTrans?: number;
    /** GET023 | dDesTipTrans | Descripción del tipo de transporte */
    dDesTipTrans?: string;
    /** GET024 | iModTrans | Modalidad del transporte */
    iModTrans?: number;
    /** GET025 | dDesModTrans | Descripción de la modalidad del transporte */
    dDesModTrans?: string;
    /** GET026 | dTiVehTras | Tipo de vehículo (texto) */
    dTiVehTras?: string;
    /** GET027 | dMarVeh | Marca del vehículo */
    dMarVeh?: string;
    /** GET028 | dTipIdenVeh | Tipo de identificación del vehículo (1=ID,2=Matrícula) */
    dTipIdenVeh?: number;
    /** GET029 | dNroIDVeh | Número de identificación del vehículo */
    dNroIDVeh?: string;
    /** GET030 | dNroMatVeh | Número de matrícula del vehículo */
    dNroMatVeh?: string;
  };
}

// --- Enumerations for event types ---
export const DTiGDEValues = {
  Cancelacion: 1,
  Inutilizacion: 2,
  EndosoFuture: 3,
  AcuseFuture: 10,
  Conformidad: 11,
  Disconformidad: 12,
  Desconocimiento: 13
} as const;
export type DTiGDE = (typeof DTiGDEValues)[keyof typeof DTiGDEValues];
export const DDesTiGDEValues = {
  Cancelacion: 'Cancelación',
  Inutilizacion: 'Inutilización',
  EndosoFuture: 'Endoso (futuro)',
  AcuseFuture: 'Acuse del DE (futuro)',
  Conformidad: 'Conformidad del DE',
  Disconformidad: 'Disconformidad del DE',
  Desconocimiento: 'Desconocimiento del DE'
} as const;
export type DDesTiGDE = (typeof DDesTiGDEValues)[keyof typeof DDesTiGDEValues];

// --- Evento Cancelación (GEC) ---
export interface GecCancelacion {
  /** GEC - GEC001 | rGeVeCan | Raíz Gestión de Eventos Cancelación */
  rGeVeCan: {
    /** GEC - GEC002 | Id | Identificador del DTE (CDC) */
    Id: string; // 44 chars CDC
    /** GEC - GEC003 | mOtEve | Motivo del Evento */
    mOtEve: string; // 5-500
  };
}

// --- Evento Inutilización (GEI) ---
export interface GeiInutilizacion {
  /** GEI - GEI001 | rGeVeInu | Raiz Gestión de Eventos Inutilización */
  rGeVeInu: {
    dNumTim: number; // Número del Timbrado (8)
    dEst: string; // Establecimiento (3)
    dPunExp: string; // Punto de expedición (3)
    dNumIn: string; // Número inicio del rango (7)
    dNumFin: string; // Número final del rango (7)
    iTiDE: ITiDE; // Tipo de Documento Electrónico
    mOtEve: string; // Motivo del Evento (5-500)
  };
}

// --- Evento Notificación / Recepción (GEN) ---
export interface GenNotificacion {
  /** GEN - GEN001 | rGeVeNotRec | Raíz Gestión de Eventos Notificación – Recepción */
  rGeVeNotRec: {
    Id: string; // CDC
    dFecEmi: string; // Fecha de emisión del DE/DTE
    dFecRecep: string; // Fecha Recepción DE
    iTipRec: INatRec; // 1=Contribuyente,2=No Contribuyente (reuse INatRec)
    dNomRec: string;
    dRucRec?: string;
    dDVRec?: number;
    dTipIDRec?: number; // 1=Cédula paraguaya.. etc (not deep enum here)
    dNumID?: string;
    dTotalGs: number;
  };
}

// --- Evento Conformidad (GCO) ---
export const ITipConfValues = {
  Total: 1,
  Parcial: 2
} as const;
export type ITipConf = (typeof ITipConfValues)[keyof typeof ITipConfValues];
export const DDesTipConfValues = {
  Total: 'Conformidad Total',
  Parcial: 'Conformidad Parcial'
} as const;
export type DDesTipConf = (typeof DDesTipConfValues)[keyof typeof DDesTipConfValues];

export interface GcoConformidad {
  rGeVeConf: {
    Id: string; // CDC del DTE
    iTipConf: ITipConf;
    dFecRecep?: string; // Fecha Estimada de Recepción (required when iTipConf==2)
  };
}

// --- Evento Disconformidad (GDI) ---
export interface GdiDisconformidad {
  rGeVeDisconf: {
    Id: string; // CDC
    mOtEve: string;
  };
}

// --- Evento Desconocimiento (GED) ---
export interface GedDesconocimiento {
  rGeVeDescon: {
    Id: string; // CDC
    dFecEmi: string;
    dFecRecep: string;
    iTipRec: INatRec; // 1=Contribuyente,2=No Contribuyente
    dNomRec: string;
    dRucRec?: string;
    dDVRec?: number;
    dTipIDRec?: number;
    dNumID?: string;
    mOtEve: string;
  };
}

// --- Evento Asociación Retención (GEA) ---
export interface GeaRetencion {
  rGeVeRetAce: {
    Id: string; // CDC
    dNumTimRet: number;
    dEstRet: string;
    dPunExpRet: string;
    dNumDocRet: string;
    dCodConRet: string;
    dFeEmiRet: string; // Fecha
  };
}

// --- Evento Anulación de Retención (GERA) ---
export interface GeraRetencion {
  rGeVeRetAnu: {
    Id: string; // CDC
    dNumTimRet: number;
    dEstRet: string;
    dPunExpRet: string;
    dNumDocRet: string;
    dCodConRet: string;
    dFeEmiRet: string;
    dFecAnRet: string;
  };
}

// --- Evento Créditos Fiscales (GECF) ---
export interface GecfCreditosFiscales {
  rGeVeCCFF: {
    Id: string; // CDC
    dNumTraCCFF: string; // Número de transferencia
    dFeAceTraCCFF: string; // Fecha de aceptación
  };
}

// --- Evento Devolución de Créditos (GEDF) ---
export interface GedfDevolucionCreditos {
  rGeDevCCFFCue: {
    Id: string; // CDC
    dNumDevSol: string; // Número DIR
    dNumDevInf: string; // Número de informe
    dNumDevRes: string; // Número de resolución de la devolución
    dFeEmiSol: string; // Fecha de emisión de DIR
    dFeEmiInf: string; // Fecha de emisión del informe
    dFeEmiRes: string; // Fecha de emisión de la resolución
  };
}

// --- Evento Devolución de Créditos (GEDD - Devuelto) ---
export interface GeddDevolucionCreditos {
  rGeDevCCFFDev: {
    Id: string; // CDC
    dNumDevSol: string; // Número DIR
    dNumDevInf: string; // Número de informe
    dNumDevRes: string; // Número de resolución de la devolución
    dFeEmiSol: string; // Fecha de emisión de DIR
    dFeEmiInf: string; // Fecha de emisión del informe
    dFeEmiRes: string; // Fecha de emisión de la resolución
  };
}

// TODO: Implement further event groups and detailed enums as needed (e.g., campos para eventos de anticipo, remisión y actualizaciones de transporte).
