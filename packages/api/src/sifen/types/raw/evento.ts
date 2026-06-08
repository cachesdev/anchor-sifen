export interface RGeVeCan {
  Id: string;
  mOtEve: string;
}

export interface RGeVeInu {
  dNumTim: string;
  dEst: string;
  dPunExp: string;
  dNumIn: string;
  dNumFin: string;
  iTiDE: string;
  mOtEve: string;
  dSerieNum?: string;
}

export interface RGeVeNotRec {
  Id: string;
  dFecEmi: string;
  dFecRecep: string;
  iTipRec: string;
  dNomRec: string;
  dRucRec?: string;
  dDVRec?: string;
  dTipIDRec?: string;
  dNumID?: string;
  dTotalGs: string;
}

export interface RGeVeConf {
  Id: string;
  iTipConf: string;
  dFecRecep?: string;
}

export interface RGeVeDisconf {
  Id: string;
  mOtEve: string;
}

export interface RGeVeDescon {
  Id: string;
  dFecEmi: string;
  dFecRecep: string;
  iTipRec: string;
  dNomRec: string;
  dRucRec?: string;
  dDVRec?: string;
  dTipIDRec?: string;
  dNumID?: string;
  mOtEve: string;
}

export interface RGeVeEnd {
  Id: string;
  iTipRec: string;
  dNomRec: string;
  dRucRec?: string;
  dDVRec?: string;
  dTipIDRec?: string;
  dNumIDRec?: string;
  dRucEmi: string;
  dDVEmi: string;
  dNomEmi: string;
  dTipEnd: string;
  iTipFac: string;
  dNomFac: string;
  dRucFac: string;
  dDVFac: string;
  dNumCon?: string;
  dNumRegPubCon?: string;
  dTotalGs: string;
  dPorDes: string;
  dMonDesMonExt?: string;
  dTipCamDesMonExt?: string;
  dMonDesGs: string;
  dTotOpeEndGs: string;
}

export interface RGeVeTr {
  Id: string;
  dMotEv: string;
  cDepEnt?: string;
  dDesDepEnt?: string;
  cDisEnt?: string;
  dDesDisEnt?: string;
  cCiuEnt?: string;
  dDesCiuEnt?: string;
  dDirEnt?: string;
  dNumCas?: string;
  dCompDir1?: string;
  dNomChof?: string;
  dNumIDChof?: string;
  iNatTrans?: string;
  dRucTrans?: string;
  dDVTrans?: string;
  dNomTrans?: string;
  iTipIDTrans?: string;
  dDTipIDTrans?: string;
  dNumIDTrans?: string;
  iTipTrans?: string;
  dDesTipTrans?: string;
  iModTrans?: string;
  dDesModTrans?: string;
  dTiVehTras?: string;
  dMarVeh?: string;
  dTipIdenVeh?: string;
  dNroIDVeh?: string;
  dNroMatVeh?: string;
}

export interface RGEveNom {
  Id: string;
  mOtEve: string;
  iNatRec: string;
  iTiOpe: string;
  cPaisRec: string;
  dDesPaisRe: string;
  iTiContRec?: string;
  dRucRec?: string;
  dDVRec?: string;
  iTipIDRec?: string;
  dDTipIDRec?: string;
  dNumIDRec?: string;
  dNomRec: string;
  dNomFanRec?: string;
  dDirRec?: string;
  dNumCasRec?: string;
  cDepRec?: string;
  dDesDepRec?: string;
  cDisRec?: string;
  dDesDisRec?: string;
  cCiuRec?: string;
  dDesCiuRec?: string;
  dTelRec?: string;
  dCelRec?: string;
  dEmailRec?: string;
  dCodCliente?: string;
}

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

export interface REve {
  dFecFirma: string;
  dVerFor: 150;
  gGroupTiEvt: GGroupTiEvt;
}

export interface RGesEve {
  idEvento: string;
  rEve: REve;
}
