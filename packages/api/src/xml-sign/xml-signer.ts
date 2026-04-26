// xml-signer.ts
import { DOMParser, XMLSerializer } from '@xmldom/xmldom';
import * as xmlCrypto from 'xml-crypto';
import type { CertificateData } from '../certificate/certificate-manager';

export interface SignedDocumentResult {
  signedXml: string;
  digestValue: string;
  cdc: string;
}

export class XMLSigner {
  /**
   * Firma un XML segun SIFEN
   */
  async sign(xml: string, certData: CertificateData): Promise<SignedDocumentResult> {
    try {
      const doc = new DOMParser().parseFromString(xml, 'text/xml');

      const cdc = this.extractCDC(doc);

      // Find the DE element to insert signature after it
      const deElement = doc.getElementsByTagName('DE')[0];
      if (!deElement) {
        throw new Error('DE element not found in XML');
      }

      // Create signature
      const sig = new xmlCrypto.SignedXml();

      // Configure signature algorithms per SIFEN spec
      sig.signatureAlgorithm = 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256';
      sig.canonicalizationAlgorithm = 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315';

      // Add reference to the DE element using CDC
      // Note: addReference requires xpath, even though we're using URI
      sig.addReference({
        xpath: `//*[@Id='${cdc}']`,
        transforms: [
          'http://www.w3.org/2000/09/xmldsig#enveloped-signature',
          'http://www.w3.org/2001/10/xml-exc-c14n#'
        ],
        digestAlgorithm: 'http://www.w3.org/2001/04/xmlenc#sha256',
        uri: `#${cdc}`
      });

      // Set the private key
      sig.privateKey = certData.privateKeyPem;

      // Set custom key info using the newer API
      sig.getKeyInfoContent = () => {
        return `<X509Data><X509Certificate>${certData.certificateBase64}</X509Certificate></X509Data>`;
      };

      // Serialize the document to ensure consistency between parsed doc and signed content
      const serializedDoc = new XMLSerializer().serializeToString(doc);

      // Compute the signature
      sig.computeSignature(serializedDoc, {
        location: { reference: '//*[local-name()="DE"]', action: 'after' },
        prefix: '',
        attrs: { xmlns: 'http://www.w3.org/2000/09/xmldsig#' }
      });

      // Get signed XML
      const signedXml = sig.getSignedXml();

      // Extract DigestValue from the signed XML
      const digestValue = this.extractDigestValue(signedXml);

      return {
        signedXml,
        digestValue,
        cdc
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`XML signing failed: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Extract DigestValue from signed XML
   * @param signedXml The signed XML string
   * @returns The DigestValue as a string
   */
  private extractDigestValue(signedXml: string): string {
    const doc = new DOMParser().parseFromString(signedXml, 'text/xml');

    // Try namespace-aware lookup first
    let digestValueElements = doc.getElementsByTagNameNS(
      'http://www.w3.org/2000/09/xmldsig#',
      'DigestValue'
    );

    // Fallback to tag name lookup
    if (!digestValueElements || digestValueElements.length === 0) {
      digestValueElements = doc.getElementsByTagName('DigestValue');
    }

    if (!digestValueElements || digestValueElements.length === 0) {
      throw new Error('DigestValue element not found in signed XML');
    }

    const digestValueElement = digestValueElements[0];
    if (!digestValueElement) {
      throw new Error('DigestValue element is null');
    }

    const digestValue = digestValueElement.textContent;
    if (!digestValue) {
      throw new Error('DigestValue is empty');
    }

    return digestValue.trim();
  }

  /**
   * Extract CDC from DE element's Id attribute
   */
  private extractCDC(doc: Document): string {
    const deElements = doc.getElementsByTagName('DE');
    if (!deElements || deElements.length === 0) {
      throw new Error('DE element not found in XML document');
    }

    const deElement = deElements[0];
    if (!deElement) {
      throw new Error('DE element is null');
    }

    const cdc = deElement.getAttribute('Id');
    if (!cdc) {
      throw new Error('Id attribute (CDC) not found in DE element');
    }

    // Validate CDC format (44 characters according to SIFEN)
    if (cdc.length !== 44) {
      throw new Error(`Invalid CDC length: expected 44 characters, got ${cdc.length}`);
    }

    return cdc;
  }

  /**
   * Verify a signed XML document
   * @param signedXml The signed XML string
   * @param certData Certificate data to verify against
   * @returns True if signature is valid
   */
  verifySignature(signedXml: string, certData: CertificateData): boolean {
    try {
      const doc = new DOMParser().parseFromString(signedXml, 'text/xml');

      // Prefer namespace-aware lookup, fallback to tag name
      let signatures = doc.getElementsByTagNameNS(
        'http://www.w3.org/2000/09/xmldsig#',
        'Signature'
      );
      if (!signatures || signatures.length === 0) {
        signatures = doc.getElementsByTagName('Signature');
      }

      if (!signatures || signatures.length === 0) {
        throw new Error('Signature element not found');
      }

      const signature = signatures[0] as Element;

      const sig = new xmlCrypto.SignedXml();
      sig.publicCert = certData.certificatePem;
      sig.loadSignature(signature);

      return sig.checkSignature(signedXml);
    } catch {
      // Signature verification failed
      return false;
    }
  }
}
