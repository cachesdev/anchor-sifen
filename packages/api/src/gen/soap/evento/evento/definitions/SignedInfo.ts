import type { CanonicalizationMethod } from './CanonicalizationMethod.js';
import type { SignatureMethod } from './SignatureMethod.js';
import type { Reference } from './Reference.js';

/**
 * SignedInfo
 * @targetNSAlias `ds`
 * @targetNamespace `http://www.w3.org/2000/09/xmldsig#`
 */
export interface SignedInfo {
  /** CanonicalizationMethod */
  CanonicalizationMethod?: CanonicalizationMethod;
  /** SignatureMethod */
  SignatureMethod?: SignatureMethod;
  /** Reference */
  Reference?: Reference;
}
