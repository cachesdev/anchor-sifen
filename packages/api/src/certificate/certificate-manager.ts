import { readFileSync } from 'node:fs';
import forge from 'node-forge';

export interface CertificateData {
  /** Certificado X.509 en formato PEM */
  certificatePem: string;
  /** Llave privada en formato PEM */
  privateKeyPem: string;
  /** Certificado en Base64 sin cabecera y espacios para XML */
  certificateBase64: string;
  /** Objecto certifiado parseado para validacion */
  certificate: forge.pki.Certificate;
  /** Objecto llave privada */
  privateKey: forge.pki.PrivateKey;
  /** CI del sujeto */
  ci: string;
}

export class CertificateManager {
  /**
   * Carga un archivo de certificado PKCS#12 y extrae el certificado y llave privada.
   * @param filePath Ruta al archivo .p12/.pfx
   * @param password Contraseña del archivo PKCS#12
   */
  loadPKCS12(filePath: string, password: string): CertificateData {
    try {
      const p12 = this.parsePKCS12File(filePath, password);
      const certificate = this.extractCertificate(p12);
      const privateKey = this.extractPrivateKey(p12);

      const certificatePem = forge.pki.certificateToPem(certificate);
      const privateKeyPem = forge.pki.privateKeyToPem(privateKey);
      const certificateBase64 = this.pemToBase64(certificatePem);
      const ci = this.extractCI(certificate);

      return {
        certificatePem,
        privateKeyPem,
        certificateBase64,
        certificate,
        privateKey,
        ci
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Invalid password') || error.message.includes('MAC')) {
          throw new Error('Contraseña PKCS#12 invalida');
        }

        if (error.message.includes('ASN.1')) {
          throw new Error('Formato de archivo PKCS#12 Invalido');
        }

        throw new Error(`Error cargando archivo PKCS#12: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Valida que el certificado este dentro de su periodo de validez.
   */
  validateCertificate(certData: CertificateData): void {
    const now = new Date();
    const { notBefore, notAfter } = certData.certificate.validity;

    if (now < notBefore) {
      throw new Error(`Certificado aun no es valido. Valido desde: ${notBefore.toISOString()}`);
    }
    if (now > notAfter) {
      throw new Error(`Certificado invalido. Expirado en on: ${notAfter.toISOString()}`);
    }
  }

  private parsePKCS12File(filePath: string, password: string): forge.pkcs12.Pkcs12Pfx {
    const p12Der = readFileSync(filePath).toString('binary');
    const asn1 = forge.asn1.fromDer(p12Der);
    return forge.pkcs12.pkcs12FromAsn1(asn1, password);
  }

  /**
   * Extrae el primer certifiado encontrado dentro del archivo PKCS#12.
   */
  private extractCertificate(p12: forge.pkcs12.Pkcs12Pfx): forge.pki.Certificate {
    const bags = p12.getBags({ bagType: forge.pki.oids.certBag });
    const certBags = bags[forge.pki.oids.certBag!] ?? [];
    const cert = certBags[0]?.cert;

    if (!cert) {
      throw new Error('No se encontraron certificados dentro del archivo PKCS#12');
    }
    return cert;
  }

  /**
   * Extrae la llave privada del archivo PKCS#12.
   */
  private extractPrivateKey(p12: forge.pkcs12.Pkcs12Pfx): forge.pki.PrivateKey {
    const keyBagOids = [forge.pki.oids.pkcs8ShroudedKeyBag, forge.pki.oids.keyBag] as const;

    for (const oid of keyBagOids) {
      if (!oid) continue;

      const bags = p12.getBags({ bagType: oid })[oid] ?? [];
      const keyBag = bags.find((b) => b.key != null);

      if (keyBag?.key) {
        return keyBag.key as forge.pki.PrivateKey;
      }
    }

    throw new Error('No se encontro llave privada dentro del archivo PKCS#12');
  }

  /**
   * Helper que elimina el header/footer y whitespace del certificado PEM
   */
  private pemToBase64(pem: string): string {
    return pem
      .split(/\r?\n/)
      .filter((line) => line.length > 0 && !line.startsWith('-----'))
      .map((line) => line.trim())
      .join('');
  }

  /**
   * Extrae CI (Cedula de Identidad) del certificado.
   *
   * El CI esta guardado como el atributo SerialNumber (OID 2.5.4.5) dentro del sujeto, prefijo con CI.
   * Checkea Subject y la extension SubjectAlternativeName como alternativa.
   */
  private extractCI(cert: forge.pki.Certificate): string {
    // 1. Subject → SerialNumber (OID 2.5.4.5)
    const serialNumberAttr = cert.subject.attributes.find(
      (attr) => attr.shortName === 'serialNumber' || attr.type === '2.5.4.5'
    );

    if (serialNumberAttr) {
      const value = serialNumberAttr.value as string;
      if (value?.startsWith('CI')) return value;
    }

    // 2. extension SubjectAlternativeName
    const sanExt = cert.extensions.find((ext) => ext.name === 'subjectAltName');

    if (sanExt) {
      const altNames: Array<{ value?: unknown }> = sanExt.altNames ?? [];
      const match = altNames.find(
        (an) => typeof an.value === 'string' && an.value.startsWith('CI')
      );
      if (match) return match.value as string;
    }

    throw new Error('CI no encontrado en certificado');
  }
}
