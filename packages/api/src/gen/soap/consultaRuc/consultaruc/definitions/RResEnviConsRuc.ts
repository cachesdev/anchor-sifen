import type { XContRuc } from './XContRuc.js';

/** rResEnviConsRUC */
export interface RResEnviConsRuc {
  /** xs:string|length */
  dCodRes?: string;
  /** xs:string|minLength,maxLength */
  dMsgRes?: string;
  /** xContRUC */
  xContRUC?: XContRuc;
}
