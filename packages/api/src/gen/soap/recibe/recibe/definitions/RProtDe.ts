import type { GResProc } from './GResProc.js';

/**
 * rProtDe
 * @targetNSAlias `__tns__`
 * @targetNamespace `http://ekuatia.set.gov.py/sifen/xsd`
 */
export interface RProtDe {
  /** xs:string */
  Id?: string;
  /** fecUTC|xs:dateTime|pattern */
  dFecProc?: string;
  /** xs:base64Binary */
  dDigVal?: string;
  /** xs:string */
  dEstRes?: string;
  /** tdProtAut|xs:long */
  dProtAut?: number;
  /** gResProc[] */
  gResProc?: Array<GResProc>;
}
