import type { DNumTim } from "./DNumTim.js";

/**
 * rGeVeInu
 * @targetNSAlias `__tns__`
 * @targetNamespace `http://ekuatia.set.gov.py/sifen/xsd`
 */
export interface RGeVeInu {
    /** dNumTim */
    dNumTim?: DNumTim;
    /** tdEst|xs:string|minLength,pattern */
    dEst?: string;
    /** tdPunExp|xs:string|minLength,pattern */
    dPunExp?: string;
    /** tdNumDE|xs:string|minLength,pattern */
    dNumIn?: string;
    /** tdNumDE|xs:string|minLength,pattern */
    dNumFin?: string;
    /** tiTiDEEv|xs:short|totalDigits,1,2,3,4,5,6,7,8,9 */
    iTiDE?: string;
    /** tmotEve|xs:string|minLength,maxLength */
    mOtEve?: string;
    /** tserieNum|xs:string|pattern,minLength,maxLength */
    dSerieNum?: string;
}
