import type { KeyValue } from "./KeyValue.js";
import type { RetrievalMethod } from "./RetrievalMethod.js";
import type { X509Data } from "./X509Data.js";
import type { PgpData } from "./PgpData.js";
import type { SpkiData } from "./SpkiData.js";

/**
 * KeyInfo
 * @targetNSAlias `ds`
 * @targetNamespace `http://www.w3.org/2000/09/xmldsig#`
 */
export interface KeyInfo {
    /** a */
    0?: string;
    /** n */
    1?: string;
    /** y */
    2?: string;
    /** string */
    KeyName?: string;
    /** KeyValue */
    KeyValue?: KeyValue;
    /** RetrievalMethod */
    RetrievalMethod?: RetrievalMethod;
    /** X509Data */
    X509Data?: X509Data;
    /** PGPData */
    PGPData?: PgpData;
    /** SPKIData */
    SPKIData?: SpkiData;
    /** string */
    MgmtData?: string;
}
