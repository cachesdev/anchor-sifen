import type { SignedInfo } from './SignedInfo.js';
import type { KeyInfo } from './KeyInfo.js';
import type { Object } from './Object.js';

/**
 * Signature
 * @targetNSAlias `ds`
 * @targetNamespace `http://www.w3.org/2000/09/xmldsig#`
 */
export interface Signature {
  /** SignedInfo */
  SignedInfo?: SignedInfo;
  /** base64Binary */
  SignatureValue?: string;
  /** KeyInfo */
  KeyInfo?: KeyInfo;
  /** Object */
  Object?: Object;
}
