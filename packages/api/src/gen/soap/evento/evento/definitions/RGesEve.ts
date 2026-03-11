import type { REve } from "./REve.js";
import type { Signature } from "./Signature.js";

/**
 * rGesEve
 * @targetNSAlias `__tns__`
 * @targetNamespace `http://ekuatia.set.gov.py/sifen/xsd`
 */
export interface RGesEve {
    /** rEve */
    rEve?: REve;
    /** Signature */
    Signature?: Signature;
}
