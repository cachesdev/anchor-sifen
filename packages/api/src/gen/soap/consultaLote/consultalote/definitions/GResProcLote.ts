import type { GResProc } from './GResProc.js';

/**
 * gResProcLote
 * @targetNSAlias `__tns__`
 * @targetNamespace `http://ekuatia.set.gov.py/sifen/xsd`
 */
export interface GResProcLote {
  /** xs:string|minLength,maxLength */
  id?: string;
  /** xs:string|minLength,maxLength */
  dEstRes?: string;
  /** xs:integer|pattern */
  dProtAut?: string;
  /** gResProc[] */
  gResProc?: Array<GResProc>;
}
