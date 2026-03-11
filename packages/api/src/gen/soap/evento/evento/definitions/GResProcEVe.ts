import type { GResProc } from "./GResProc.js";

/**
 * gResProcEVe
 * @targetNSAlias `__tns__`
 * @targetNamespace `http://ekuatia.set.gov.py/sifen/xsd`
 */
export interface GResProcEVe {
    /** tdEstRes|xs:string|minLength,maxLength */
    dEstRes?: string;
    /** tdProtAut|xs:long */
    dProtAut?: number;
    /** tid|xs:integer|pattern,minInclusive,maxInclusive */
    id?: string;
    /** gResProc[] */
    gResProc?: Array<GResProc>;
}
