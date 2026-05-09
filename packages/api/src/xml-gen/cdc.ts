import { calcularDv } from './ruc';
import { generateCodigoSeguridad } from './derive/operacion-de';

export interface CDCFields {
  /** C002 — iTiDE */
  tipoDocumento: number;
  /** D101 — dRucEm */
  rucEmisor: string;
  /** D102 — dDVEmi */
  dvEmisor: number;
  /** C005 — dEst */
  establecimiento: string;
  /** C006 — dPunExp */
  puntoExpedicion: string;
  /** C007 — dNumDoc */
  numeroDocumento: string;
  /** D103 — iTipCont */
  tipoContribuyente: number;
  /** D002 — dFeEmiDE */
  fechaEmision: Date;
  /** B002 — iTipEmi */
  tipoEmision: number;
  /** B004 — dCodSeg */
  codigoSeguridad?: number;
}

function toAAAAMMDD(fecha: Date): string {
  const yyyy = fecha.getFullYear();
  const mm = String(fecha.getMonth() + 1).padStart(2, '0');
  const dd = String(fecha.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
}

export function generateCDC(input: CDCFields): string {
  const codSeg = input.codigoSeguridad ?? generateCodigoSeguridad();

  const base =
    String(input.tipoDocumento).padStart(2, '0') +
    String(input.rucEmisor).padStart(8, '0') +
    String(input.dvEmisor).padStart(1, '0') +
    String(input.establecimiento).padStart(3, '0') +
    String(input.puntoExpedicion).padStart(3, '0') +
    String(input.numeroDocumento).padStart(7, '0') +
    String(input.tipoContribuyente).padStart(1, '0') +
    toAAAAMMDD(input.fechaEmision) +
    String(input.tipoEmision).padStart(1, '0') +
    String(codSeg).padStart(9, '0');

  const dv = calcularDv(base);
  return base + String(dv);
}

export function parseCDC(cdc: string): CDCFields {
  if (cdc.length !== 44) {
    throw new Error(`CDC invalido: se esperaban 44 caracteres, se recibieron ${cdc.length}.`);
  }

  const fechaStr = cdc.slice(25, 33);
  const yyyy = Number(fechaStr.slice(0, 4));
  const mm = Number(fechaStr.slice(4, 6)) - 1;
  const dd = Number(fechaStr.slice(6, 8));

  return {
    tipoDocumento: Number(cdc.slice(0, 2)),
    rucEmisor: cdc.slice(2, 10),
    dvEmisor: Number(cdc[10]),
    establecimiento: cdc.slice(11, 14),
    puntoExpedicion: cdc.slice(14, 17),
    numeroDocumento: cdc.slice(17, 24),
    tipoContribuyente: Number(cdc[24]),
    fechaEmision: new Date(yyyy, mm, dd),
    tipoEmision: Number(cdc[33]),
    codigoSeguridad: Number(cdc.slice(34, 43))
  };
}
