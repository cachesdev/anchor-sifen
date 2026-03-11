import type { GResProcEVe } from './GResProcEVe.js';

/** rRetEnviEventoDe */
export interface RRetEnviEventoDe {
  /** fecUTC|xs:dateTime|pattern */
  dFecProc?: string;
  /** gResProcEVe[] */
  gResProcEVe?: Array<GResProcEVe>;
}
