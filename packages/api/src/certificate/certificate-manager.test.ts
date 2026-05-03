import { describe, expect, it } from 'vitest';
import forge from 'node-forge';
import {
  CertificateManager,
  CertError,
  pemToBase64,
  extractCI,
  createBufferPKCS12Source,
  createDummyPKCS12Source,
  type CertificateData
} from './certificate-manager';

function generateTestP12(password: string): { p12Buffer: Buffer; expected: CertificateData } {
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

  const p12Asn1 = forge.pkcs12.toPkcs12Asn1(keys.privateKey, [cert], password, {
    algorithm: '3des'
  });
  const p12Der = forge.asn1.toDer(p12Asn1).getBytes();
  const p12Buffer = Buffer.from(p12Der, 'binary');

  return {
    p12Buffer,
    expected: {
      certificatePem: certPem,
      privateKeyPem: keyPem,
      certificateBase64: pemToBase64(certPem),
      certificate: cert,
      privateKey: keys.privateKey,
      ci: 'CI1234567'
    }
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
      const { expected } = generateTestP12('test');
      expect(extractCI(expected.certificate)).toBe('CI1234567');
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
      const { expected } = generateTestP12('test');
      expect(() => new CertificateManager().validateCertificate(expected)).not.toThrow();
    });

    it('lanza si el certificado aun no es valido', () => {
      const { expected } = generateTestP12('test');
      expected.certificate.validity.notBefore = new Date('2099-01-01');
      expect(() => new CertificateManager().validateCertificate(expected)).toThrow(CertError);
    });

    it('lanza si el certificado esta expirado', () => {
      const { expected } = generateTestP12('test');
      expected.certificate.validity.notAfter = new Date('2020-01-01');
      expect(() => new CertificateManager().validateCertificate(expected)).toThrow(CertError);
    });
  });

  describe('createBufferPKCS12Source', () => {
    it('retorna un PKCS12Source que provee DER como Buffer', () => {
      const { p12Buffer } = generateTestP12('secret');
      const source = createBufferPKCS12Source(p12Buffer, 'secret');
      const { der, password } = source.read();
      expect(Buffer.isBuffer(der)).toBe(true);
      expect(der.length).toBeGreaterThan(0);
      expect(password).toBe('secret');
    });

    it('el DER es valido para parseo con forge', () => {
      const { p12Buffer } = generateTestP12('secret');
      const source = createBufferPKCS12Source(p12Buffer, 'secret');
      const { der, password } = source.read();
      const asn1 = forge.asn1.fromDer(der.toString('binary'));
      const p12 = forge.pkcs12.pkcs12FromAsn1(asn1, password);
      expect(p12).toBeDefined();
    });
  });

  describe('loadPKCS12 con buffer adapter', () => {
    it('carga correctamente desde buffer y extrae todos los campos', () => {
      const { p12Buffer, expected } = generateTestP12('test123');
      const source = createBufferPKCS12Source(p12Buffer, 'test123');
      const result = new CertificateManager().loadPKCS12(source);

      expect(result.ci).toBe('CI1234567');
      expect(result.certificatePem).toBe(expected.certificatePem);
      expect(result.privateKeyPem).toBe(expected.privateKeyPem);
      expect(result.certificateBase64).toBe(expected.certificateBase64);
      expect(result.certificate).toBeDefined();
      expect(result.privateKey).toBeDefined();
    });

    it('lanza CertError con contrasena incorrecta', () => {
      const { p12Buffer } = generateTestP12('correcta');
      const source = createBufferPKCS12Source(p12Buffer, 'incorrecta');
      expect(() => new CertificateManager().loadPKCS12(source)).toThrow(
        'Contrasena PKCS#12 invalida'
      );
    });

    it('lanza CertError con buffer corrupto', () => {
      const source = createBufferPKCS12Source(Buffer.from('datos basura'), 'pw');
      expect(() => new CertificateManager().loadPKCS12(source)).toThrow(
        'Formato de archivo PKCS#12 invalido'
      );
    });
  });

  describe('createDummyPKCS12Source', () => {
    it('genera un PKCS12Source valido que puede ser cargado', () => {
      const source = createDummyPKCS12Source('test123');
      const result = new CertificateManager().loadPKCS12(source);
      expect(result.ci).toBe('CI0000000');
      expect(result.certificatePem).toContain('-----BEGIN CERTIFICATE-----');
      expect(result.privateKeyPem).toContain('-----BEGIN RSA PRIVATE KEY-----');
      expect(result.certificateBase64.length).toBeGreaterThan(0);
    });

    it('usa dummy como contrasena por defecto', () => {
      const source = createDummyPKCS12Source();
      const { password } = source.read();
      expect(password).toBe('dummy');
    });

    it('el certificado es valido por 1 año', () => {
      const source = createDummyPKCS12Source();
      const result = new CertificateManager().loadPKCS12(source);
      expect(() => new CertificateManager().validateCertificate(result)).not.toThrow();
    });

    it('genera certificados distintos en cada llamada', () => {
      const result1 = new CertificateManager().loadPKCS12(createDummyPKCS12Source());
      const result2 = new CertificateManager().loadPKCS12(createDummyPKCS12Source());
      expect(result1.certificatePem).not.toBe(result2.certificatePem);
    });
  });
});
