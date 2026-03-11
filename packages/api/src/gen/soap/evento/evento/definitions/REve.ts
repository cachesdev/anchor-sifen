import type { GGroupTiEvt } from './GGroupTiEvt.js';

/**
 * rEve
 * @targetNSAlias `__tns__`
 * @targetNamespace `http://ekuatia.set.gov.py/sifen/xsd`
 */
export interface REve {
  /** fecHhmmss|xs:dateTime|pattern */
  dFecFirma?: string;
  /** tVerFor|xs:integer|pattern,totalDigits */
  dVerFor?: string;
  /** gGroupTiEvt */
  gGroupTiEvt?: GGroupTiEvt;
}
