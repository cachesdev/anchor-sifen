// SIFEN I group - Información de la Firma Digital del DTE (I001-I049)

/**
 * I - I001 | Signature | Firma Digital del DTE | Pagina 110
 * Minimal representation of XML Signature per XMLDSig standard
 */
export interface Signature {
  /** SignedInfo canonicalized */
  SignedInfo: {
    CanonicalizationMethod?: { Algorithm?: string };
    SignatureMethod?: { Algorithm?: string };
    Reference?: Array<{
      URI?: string;
      Transforms?: Record<string, unknown>;
      DigestMethod?: { Algorithm?: string };
      DigestValue?: string;
    }>;
  };
  /** Signature value (base64) */
  SignatureValue: string;
  /** Key information, typically contains X509Certificate */
  KeyInfo?: {
    X509Data?: { X509Certificate?: string };
    KeyName?: string;
  };
}
