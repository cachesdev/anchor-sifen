import type { RGeVeCan } from "./RGeVeCan.js";
import type { RGeVeInu } from "./RGeVeInu.js";
import type { RGeVeNotRec } from "./RGeVeNotRec.js";
import type { RGeVeConf } from "./RGeVeConf.js";
import type { RGeVeDisconf } from "./RGeVeDisconf.js";
import type { RGeVeDescon } from "./RGeVeDescon.js";
import type { RGeVeEnd } from "./RGeVeEnd.js";
import type { RGeVeTr } from "./RGeVeTr.js";
import type { RgEveNom } from "./RgEveNom.js";

/**
 * gGroupTiEvt
 * @targetNSAlias `__tns__`
 * @targetNamespace `http://ekuatia.set.gov.py/sifen/xsd`
 */
export interface GGroupTiEvt {
    /** rGeVeCan */
    rGeVeCan?: RGeVeCan;
    /** rGeVeInu */
    rGeVeInu?: RGeVeInu;
    /** rGeVeNotRec */
    rGeVeNotRec?: RGeVeNotRec;
    /** rGeVeConf */
    rGeVeConf?: RGeVeConf;
    /** rGeVeDisconf */
    rGeVeDisconf?: RGeVeDisconf;
    /** rGeVeDescon */
    rGeVeDescon?: RGeVeDescon;
    /** rGeVeEnd */
    rGeVeEnd?: RGeVeEnd;
    /** rGeVeTr */
    rGeVeTr?: RGeVeTr;
    /** rGEveNom */
    rGEveNom?: RgEveNom;
}
