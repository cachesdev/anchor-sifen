import type { GResProcLote } from "./GResProcLote.js";

/** rResEnviConsLoteDe */
export interface RResEnviConsLoteDe {
    /** fecUTC|xs:dateTime|pattern */
    dFecProc?: string;
    /** xs:string|minLength,maxLength */
    dCodResLot?: string;
    /** xs:string|minLength,maxLength */
    dMsgResLot?: string;
    /** gResProcLote[] */
    gResProcLote?: Array<GResProcLote>;
}
