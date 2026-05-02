import { describe, expect, it } from 'vitest';
import forge from 'node-forge';
import {
  CertificateManager,
  CertError,
  pemToBase64,
  extractCI,
  type CertificateData
} from './certificate-manager';

function generateTestCert(): { certData: CertificateData; p12Buffer: Buffer } {
  const keys = forge.pki.rsa.generateKeyPair(2048);
  const cert = forge.pki.createCertificate();
  cert.publicKey = keys.publicKey;
  cert.serialNumber = '01';
  cert.validity.notBefore = new Date('2024-01-01');
  cert.validity.notAfter = new Date('2026-12-31');
  const attrs: forge.pki.CertificateField[] = [
    { name: 'commonName', value: 'Test Cert' },
    { name: 'serialNumber', type: '2.5.4.5', value: 'CI1234567' }
  ];
  cert.setSubject(attrs);
  cert.setIssuer(attrs);
  cert.sign(keys.privateKey);

  const certPem = forge.pki.certificateToPem(cert);
  const keyPem = forge.pki.privateKeyToPem(keys.privateKey);
  const base64 = pemToBase64(certPem);

  // Generar PKCS#12 en memoria
  const p12Asn1 = forge.pkcs12.toPkcs12Asn1(keys.privateKey, [cert], 'test123', {
    algorithm: '3des'
  });
  const p12Der = forge.asn1.toDer(p12Asn1).getBytes();
  const p12Buffer = Buffer.from(p12Der, 'binary');

  return {
    certData: {
      certificatePem: certPem,
      privateKeyPem: keyPem,
      certificateBase64: base64,
      certificate: cert,
      privateKey: keys.privateKey,
      ci: 'CI1234567'
    },
    p12Buffer
  };
}

describe('certificate', () => {
  describe('pemToBase64', () => {
    it('convierte PEM a base64 sin headers ni whitespace', () => {
      const pem = '-----BEGIN CERTIFICATE-----\nABC123\nDEF456\n-----END CERTIFICATE-----';
      expect(pemToBase64(pem)).toBe('ABC123DEF456');
    });

    it('maneja lineas con carriage return', () => {
      const pem = '-----BEGIN CERTIFICATE-----\r\nABC\r\nDEF\r\n-----END CERTIFICATE-----';
      expect(pemToBase64(pem)).toBe('ABCDEF');
    });

    it('descarta lineas que empiezan con -----', () => {
      const pem = '-----BEGIN CERTIFICATE-----\nline1\n-----END CERTIFICATE-----';
      expect(pemToBase64(pem)).toBe('line1');
    });
  });

  describe('extractCI', () => {
    it('extrae CI del atributo serialNumber del subject', () => {
      const { certData } = generateTestCert();
      expect(extractCI(certData.certificate)).toBe('CI1234567');
    });

    it('lanza si no hay CI en el certificado', () => {
      const keys = forge.pki.rsa.generateKeyPair(512);
      const cert = forge.pki.createCertificate();
      cert.publicKey = keys.publicKey;
      cert.validity.notBefore = new Date('2024-01-01');
      cert.validity.notAfter = new Date('2026-12-31');
      cert.setSubject([{ name: 'commonName', value: 'No CI' }]);
      cert.setIssuer([{ name: 'commonName', value: 'No CI' }]);
      cert.sign(keys.privateKey);
      expect(() => extractCI(cert)).toThrow(CertError);
    });
  });

  describe('validateCertificate', () => {
    it('no lanza si el certificado esta vigente', () => {
      const { certData } = generateTestCert();
      expect(() => new CertificateManager().validateCertificate(certData)).not.toThrow();
    });

    it('lanza si el certificado aun no es valido', () => {
      const { certData } = generateTestCert();
      certData.certificate.validity.notBefore = new Date('2099-01-01');
      expect(() => new CertificateManager().validateCertificate(certData)).toThrow(CertError);
    });

    it('lanza si el certificado esta expirado', () => {
      const { certData } = generateTestCert();
      certData.certificate.validity.notAfter = new Date('2020-01-01');
      expect(() => new CertificateManager().validateCertificate(certData)).toThrow(CertError);
    });
  });
});
