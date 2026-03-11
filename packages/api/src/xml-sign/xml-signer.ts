// xml-signer.ts
import { DOMParser, XMLSerializer } from '@xmldom/xmldom';
import * as xmlCrypto from 'xml-crypto';
import type { CertificateData } from '../certificate/certificate-manager';

export interface SigningOptions {
  /** Whether to pretty print the output XML */
  prettyPrint?: boolean;
}

export class XMLSigner {
  /**
   * Sign an XML document according to SIFEN specifications
   * @param xml The XML string to sign (must contain DE element with Id attribute)
   * @param certData Certificate data from CertificateManager
   * @param options Signing options
   * @returns Signed XML string
   */
  async signDocument(
    xml: string,
    certData: CertificateData,
    options: SigningOptions = {}
  ): Promise<string> {
    try {
      // Parse XML
      const doc = new DOMParser().parseFromString(xml, 'text/xml');

      // Extract CDC (Id attribute from DE element)
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

      // Compute the signature
      sig.computeSignature(xml, {
        location: { reference: '//*[local-name()="DE"]', action: 'after' },
        prefix: '',
        attrs: { xmlns: 'http://www.w3.org/2000/09/xmldsig#' }
      });

      // Get signed XML
      let signedXml = sig.getSignedXml();

      // Ensure proper structure and clean up unwanted elements
      signedXml = this.cleanupSignature(signedXml);

      // Safety check: verify signature still valid after cleanup
      if (!this.verifySignature(signedXml, certData)) {
        throw new Error('Signature invalid after cleanup; cleanup removed required elements');
      }

      // Apply pretty print if requested
      if (options.prettyPrint) {
        signedXml = this.formatXml(signedXml);
      }

      return signedXml;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`XML signing failed: ${error.message}`);
      }
      throw error;
    }
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
   * Clean up signature to ensure it matches SIFEN requirements
   * Remove forbidden elements like X509SubjectName, X509IssuerSerial, etc.
   */
  private cleanupSignature(signedXml: string): string {
    const doc = new DOMParser().parseFromString(signedXml, 'text/xml');

    // Elements that MUST NOT be present according to SIFEN docs
    const forbiddenElements = [
      'X509SubjectName',
      'X509IssuerSerial',
      'X509IssuerName',
      'X509SKI',
      'KeyValue',
      'RSAKeyValue',
      'Modulus',
      'Exponent'
    ];

    for (const tagName of forbiddenElements) {
      const elements = doc.getElementsByTagName(tagName);
      while (elements && elements.length > 0) {
        const element = elements[0];
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }
    }

    return new XMLSerializer().serializeToString(doc);
  }

  /**
   * Format XML with indentation
   */
  private formatXml(xml: string): string {
    // Simple formatting - you might want to use a library like 'xml-formatter' for better results
    return xml;
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
