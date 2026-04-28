import { readFileSync } from 'node:fs';
import forge from 'node-forge';
import { ErrorFactory } from '@praha/error-factory';

export class CertError extends ErrorFactory({
  name: 'CertError',
  message: (f) => f.details ?? 'Error de certificado.',
  fields: ErrorFactory.fields<{ details?: string }>()
}) {}

export interface CertificateData {
  /** Certificado X.509 en formato PEM */
  certificatePem: string;
  /** Llave privada en formato PEM */
  privateKeyPem: string;
  /** Certificado en Base64 sin cabecera y espacios para XML */
  certificateBase64: string;
  /** Objeto certificado parseado para validacion */
  certificate: forge.pki.Certificate;
  /** Objeto llave privada */
  privateKey: forge.pki.PrivateKey;
  /** CI del sujeto */
  ci: string;
}

export class CertificateManager {
  /**
   * Carga un archivo de certificado PKCS#12 y extrae el certificado y llave privada.
   *
   * @param filePath - Ruta al archivo .p12/.pfx
   * @param password - Contrasena del archivo PKCS#12
   * @throws {CertError} Si el archivo no existe, la contrasena es invalida o el formato es incorrecto.
   */
  loadPKCS12(filePath: string, password: string): CertificateData {
    try {
      const p12 = parsePKCS12File(filePath, password);
      const certificate = extractCertificate(p12);
      const privateKey = extractPrivateKey(p12);

      const certificatePem = forge.pki.certificateToPem(certificate);
      const privateKeyPem = forge.pki.privateKeyToPem(privateKey);
      const certificateBase64 = pemToBase64(certificatePem);
      const ci = extractCI(certificate);

      return { certificatePem, privateKeyPem, certificateBase64, certificate, privateKey, ci };
    } catch (error) {
      if (error instanceof CertError) throw error;
      if (error instanceof Error) {
        if (error.message.includes('Invalid password') || error.message.includes('MAC')) {
          throw new CertError({ details: 'Contrasena PKCS#12 invalida.', cause: error });
        }
        if (error.message.includes('ASN.1')) {
          throw new CertError({ details: 'Formato de archivo PKCS#12 invalido.', cause: error });
        }
        throw new CertError({ details: error.message, cause: error });
      }
      throw new CertError({ details: 'Error desconocido al cargar PKCS#12.', cause: error });
    }
  }

  /**
   * Valida que el certificado este dentro de su periodo de validez.
   *
   * @throws {CertError} Si el certificado no es valido o esta expirado.
   */
  validateCertificate(certData: CertificateData): void {
    const now = new Date();
    const { notBefore, notAfter } = certData.certificate.validity;

    if (now < notBefore) {
      throw new CertError({
        details: `Certificado aun no es valido. Valido desde: ${notBefore.toISOString()}`
      });
    }
    if (now > notAfter) {
      throw new CertError({
        details: `Certificado expirado: ${notAfter.toISOString()}`
      });
    }
  }
}

function parsePKCS12File(filePath: string, password: string): forge.pkcs12.Pkcs12Pfx {
  const p12Der = readFileSync(filePath).toString('binary');
  const asn1 = forge.asn1.fromDer(p12Der);
  return forge.pkcs12.pkcs12FromAsn1(asn1, password);
}

/** Extrae el primer certificado encontrado dentro del archivo PKCS#12. */
function extractCertificate(p12: forge.pkcs12.Pkcs12Pfx): forge.pki.Certificate {
  const bags = p12.getBags({ bagType: forge.pki.oids.certBag });
  const certBags = bags[forge.pki.oids.certBag!] ?? [];
  const cert = certBags[0]?.cert;

  if (!cert) {
    throw new CertError({ details: 'No se encontraron certificados dentro del archivo PKCS#12.' });
  }
  return cert;
}

/** Extrae la llave privada del archivo PKCS#12. */
function extractPrivateKey(p12: forge.pkcs12.Pkcs12Pfx): forge.pki.PrivateKey {
  const keyBagOids = [forge.pki.oids.pkcs8ShroudedKeyBag, forge.pki.oids.keyBag] as const;

  for (const oid of keyBagOids) {
    if (!oid) continue;
    const bags = p12.getBags({ bagType: oid })[oid] ?? [];
    const keyBag = bags.find((b) => b.key != null);
    if (keyBag?.key) return keyBag.key as forge.pki.PrivateKey;
  }

  throw new CertError({ details: 'No se encontro llave privada dentro del archivo PKCS#12.' });
}

/** Elimina el header/footer y whitespace del certificado PEM. */
function pemToBase64(pem: string): string {
  return pem
    .split(/\r?\n/)
    .filter((line) => line.length > 0 && !line.startsWith('-----'))
    .map((line) => line.trim())
    .join('');
}

/**
 * Extrae CI (Cedula de Identidad) del certificado.
 *
 * El CI esta guardado como el atributo SerialNumber (OID 2.5.4.5) dentro del
 * sujeto, con prefijo CI. Verifica Subject y la extension SubjectAlternativeName
 * como alternativa.
 */
function extractCI(cert: forge.pki.Certificate): string {
  const serialNumberAttr = cert.subject.attributes.find(
    (attr) => attr.shortName === 'serialNumber' || attr.type === '2.5.4.5'
  );

  if (serialNumberAttr) {
    const value = serialNumberAttr.value as string;
    if (value?.startsWith('CI')) return value;
  }

  const sanExt = cert.extensions.find((ext) => ext.name === 'subjectAltName');

  if (sanExt) {
    const altNames: Array<{ value?: unknown }> = sanExt.altNames ?? [];
    const match = altNames.find(
      (an) => typeof an.value === 'string' && an.value.startsWith('CI')
    );
    if (match) return match.value as string;
  }

  throw new CertError({ details: 'CI no encontrado en certificado.' });
}
