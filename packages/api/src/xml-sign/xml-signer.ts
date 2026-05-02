import { DOMParser, XMLSerializer } from '@xmldom/xmldom';
import * as xmlCrypto from 'xml-crypto';
import type { CertificateData } from '../certificate/certificate-manager';
import { Err, Ok, type Result } from '../result';
import { ErrorFactory } from '@praha/error-factory';

export class XMLSignError extends ErrorFactory({
  name: 'XMLSignError',
  message: (f) => f.details ?? 'Fallo al firmar XML.',
  fields: ErrorFactory.fields<{ details?: string }>()
}) {}

export interface SignedDocumentResult {
  /** XML firmado con la firma digital insertada */
  signedXml: string;
  /** DigestValue extraido de la firma XML */
  digestValue: string;
  /** CDC del DE firmado */
  cdc: string;
}

export class XMLSigner {
  /**
   * Firma un XML segun la especificacion SIFEN.
   *
   * El proceso:
   * 1. Extrae el CDC del elemento DE.
   * 2. Configura los algoritmos requeridos (RSA-SHA256, C14N, SHA256).
   * 3. Agrega una referencia al elemento DE usando el CDC como URI.
   * 4. Inserta la firma XAdES despues del elemento DE.
   * 5. Extrae el DigestValue del XML firmado.
   *
   * @param xml - XML del DE a firmar (debe contener el elemento DE con atributo Id)
   * @param certData - Datos del certificado (PEM, llave privada, Base64)
   * @returns Resultado con el XML firmado, DigestValue y CDC
   */
  async sign(
    xml: string,
    certData: CertificateData
  ): Promise<Result<SignedDocumentResult, XMLSignError>> {
    try {
      const doc = new DOMParser().parseFromString(xml, 'text/xml');
      const cdc = extractCDC(doc);

      const deElement = doc.getElementsByTagName('DE')[0];
      if (!deElement) {
        return Err(new XMLSignError({ details: 'Elemento DE no encontrado en el XML.' }));
      }

      const sig = new xmlCrypto.SignedXml();
      sig.signatureAlgorithm = 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256';
      sig.canonicalizationAlgorithm = 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315';

      sig.addReference({
        xpath: `//*[@Id='${cdc}']`,
        transforms: [
          'http://www.w3.org/2000/09/xmldsig#enveloped-signature',
          'http://www.w3.org/2001/10/xml-exc-c14n#'
        ],
        digestAlgorithm: 'http://www.w3.org/2001/04/xmlenc#sha256',
        uri: `#${cdc}`
      });

      sig.privateKey = certData.privateKeyPem;
      sig.getKeyInfoContent = () => {
        return `<X509Data><X509Certificate>${certData.certificateBase64}</X509Certificate></X509Data>`;
      };

      const serializedDoc = new XMLSerializer().serializeToString(doc);
      sig.computeSignature(serializedDoc, {
        location: { reference: '//*[local-name()="DE"]', action: 'after' },
        prefix: '',
        attrs: { xmlns: 'http://www.w3.org/2000/09/xmldsig#' }
      });

      const signedXml = sig.getSignedXml();
      const digestValue = extractDigestValue(signedXml);

      return Ok({ signedXml, digestValue, cdc });
    } catch (error) {
      return Err(
        new XMLSignError({
          details: error instanceof Error ? error.message : 'Error desconocido al firmar.',
          cause: error
        })
      );
    }
  }

  /**
   * Verifica la firma digital de un XML firmado.
   *
   * @param signedXml - XML firmado a verificar
   * @param certData - Datos del certificado para verificar la firma
   * @returns true si la firma es valida, false en caso contrario
   */
  verifySignature(signedXml: string, certData: CertificateData): boolean {
    try {
      const doc = new DOMParser().parseFromString(signedXml, 'text/xml');

      let signatures = doc.getElementsByTagNameNS(
        'http://www.w3.org/2000/09/xmldsig#',
        'Signature'
      );
      if (!signatures || signatures.length === 0) {
        signatures = doc.getElementsByTagName('Signature');
      }

      if (!signatures || signatures.length === 0) {
        return false;
      }

      const signature = signatures[0] as Element;
      const sig = new xmlCrypto.SignedXml();
      sig.publicCert = certData.certificatePem;
      sig.loadSignature(signature);

      return sig.checkSignature(signedXml);
    } catch {
      return false;
    }
  }
}

/**
 * Extrae el CDC del atributo Id del elemento DE.
 *
 * Valida que:
 * - El elemento DE exista en el documento.
 * - El atributo Id este presente.
 * - El CDC tenga exactamente 44 caracteres.
 */
export function extractCDC(doc: Document): string {
  const deElements = doc.getElementsByTagName('DE');
  if (!deElements || deElements.length === 0) {
    throw new Error('Elemento DE no encontrado en el documento XML.');
  }

  const deElement = deElements[0];
  if (!deElement) {
    throw new Error('Elemento DE es nulo.');
  }

  const cdc = deElement.getAttribute('Id');
  if (!cdc) {
    throw new Error('Atributo Id (CDC) no encontrado en el elemento DE.');
  }

  if (cdc.length !== 44) {
    throw new Error(
      `Longitud de CDC invalida: se esperaban 44 caracteres, se recibieron ${cdc.length}.`
    );
  }

  return cdc;
}

/**
 * Extrae el DigestValue del XML firmado.
 *
 * Busca primero con namespace, luego por nombre de etiqueta como fallback.
 */
export function extractDigestValue(signedXml: string): string {
  const doc = new DOMParser().parseFromString(signedXml, 'text/xml');

  let elements = doc.getElementsByTagNameNS('http://www.w3.org/2000/09/xmldsig#', 'DigestValue');
  if (!elements || elements.length === 0) {
    elements = doc.getElementsByTagName('DigestValue');
  }

  if (!elements || elements.length === 0) {
    throw new Error('Elemento DigestValue no encontrado en el XML firmado.');
  }

  const el = elements[0];
  if (!el?.textContent) {
    throw new Error('DigestValue vacio.');
  }

  return el.textContent.trim();
}
