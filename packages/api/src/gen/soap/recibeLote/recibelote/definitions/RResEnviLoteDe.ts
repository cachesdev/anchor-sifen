
/** rResEnviLoteDe */
export interface RResEnviLoteDe {
    /** fecUTC|xs:dateTime|pattern */
    dFecProc?: string;
    /** xs:string|minLength */
    dCodRes?: string;
    /** xs:string */
    dMsgRes?: string;
    /** xs:decimal|totalDigits,fractionDigits,minInclusive,maxInclusive */
    dProtConsLote?: string;
    /** xs:integer */
    dTpoProces?: number;
}
