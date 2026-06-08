import { DOMParser } from '@xmldom/xmldom';
import forge from 'node-forge';
import { describe, expect, it } from 'vitest';
import { XMLSigner, extractCDC, extractDigestValue, extractEventoId } from './xml-signer';
import { pemToBase64, type CertificateData } from '../certificate/certificate-manager';

function makeDoc(xml: string): Document {
  return new DOMParser().parseFromString(xml, 'text/xml');
}

function generateTestCertData(): CertificateData {
  const keys = forge.pki.rsa.generateKeyPair(2048);
  const cert = forge.pki.createCertificate();
  cert.publicKey = keys.publicKey;
  cert.serialNumber = '01';
  cert.validity.notBefore = new Date('2024-01-01');
  cert.validity.notAfter = new Date('2026-12-31');
  cert.setSubject([{ name: 'commonName', value: 'Test' }]);
  cert.setIssuer([{ name: 'commonName', value: 'Test' }]);
  cert.sign(keys.privateKey);

  const certPem = forge.pki.certificateToPem(cert);
  return {
    certificatePem: certPem,
    privateKeyPem: forge.pki.privateKeyToPem(keys.privateKey),
    certificateBase64: pemToBase64(certPem),
    certificate: cert,
    privateKey: keys.privateKey,
    ci: 'CI000'
  };
}

describe('xml-sign', () => {
  describe('extractCDC', () => {
    it('extrae el CDC del atributo Id del DE', () => {
      const doc = makeDoc('<rDE><DE Id="01800195515031005001331122026030517018918308"></DE></rDE>');
      expect(extractCDC(doc).length).toBe(44);
    });

    it('lanza si el elemento DE no existe', () => {
      const doc = makeDoc('<rDE></rDE>');
      expect(() => extractCDC(doc)).toThrow('Elemento DE no encontrado');
    });

    it('lanza si el atributo Id no existe', () => {
      const doc = makeDoc('<rDE><DE></DE></rDE>');
      expect(() => extractCDC(doc)).toThrow('CDC');
    });

    it('lanza si el CDC no tiene 44 caracteres', () => {
      const doc = makeDoc('<rDE><DE Id="corto"></DE></rDE>');
      expect(() => extractCDC(doc)).toThrow('44');
    });
  });

  describe('extractDigestValue', () => {
    it('extrae el DigestValue de un XML firmado', () => {
      const xml =
        '<Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><SignedInfo><Reference><DigestValue>abc123==</DigestValue></Reference></SignedInfo></Signature>';
      expect(extractDigestValue(xml)).toBe('abc123==');
    });

    it('lanza si no encuentra DigestValue', () => {
      expect(() => extractDigestValue('<root></root>')).toThrow('DigestValue no encontrado');
    });
  });

  describe('extractEventoId', () => {
    it('extrae el Id del elemento rEve', () => {
      const doc = makeDoc('<gGroupGesEve><rGesEve><rEve Id="123"/></rGesEve></gGroupGesEve>');
      expect(extractEventoId(doc)).toBe('123');
    });

    it('lanza si el elemento rEve no existe', () => {
      const doc = makeDoc('<gGroupGesEve></gGroupGesEve>');
      expect(() => extractEventoId(doc)).toThrow('rEve');
    });
  });

  describe('sign y verifySignature', () => {
    const certData = generateTestCertData();
    const cdc = '01800195515031005001331122026030517018918308';
    const xml = `<?xml version="1.0" encoding="UTF-8"?><rDE xmlns="http://ekuatia.set.gov.py/sifen/xsd"><dVerFor>150</dVerFor><DE Id="${cdc}"><dDVId>8</dDVId><dFecFirma>2026-01-01T12:00:00</dFecFirma></DE></rDE>`;

    it('firma el XML y retorna signedXml, digestValue y cdc', async () => {
      const signer = new XMLSigner();
      const result = await signer.sign(xml, certData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value.cdc).toBe(cdc);
        expect(result.value.signedXml).toContain('<Signature');
        expect(result.value.digestValue.length).toBeGreaterThan(0);
      }
    });

    it('verifySignature retorna true para un XML recien firmado', async () => {
      const signer = new XMLSigner();
      const signResult = await signer.sign(xml, certData);
      if (!signResult.success) throw signResult.error;
      expect(signer.verifySignature(signResult.value.signedXml, certData)).toBe(true);
    });

    it('verifySignature retorna false para XML sin firma', () => {
      const signer = new XMLSigner();
      expect(signer.verifySignature(xml, certData)).toBe(false);
    });
  });

  describe('signEvento', () => {
    const certData = generateTestCertData();
    const xml =
      '<gGroupGesEve xmlns="http://ekuatia.set.gov.py/sifen/xsd"><rGesEve><rEve Id="123"><dFecFirma>2026-01-01T12:00:00</dFecFirma><dVerFor>150</dVerFor><gGroupTiEvt><rGeVeCan><Id>01800195515031005001331122026030517018918308</Id><mOtEve>Error en datos</mOtEve></rGeVeCan></gGroupTiEvt></rEve></rGesEve></gGroupGesEve>';

    it('firma rEve y retorna signedXml, digestValue e idEvento', async () => {
      const signer = new XMLSigner();
      const result = await signer.signEvento(xml, certData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value.idEvento).toBe('123');
        expect(result.value.signedXml).toContain('<Signature');
        expect(result.value.signedXml.indexOf('</rEve>')).toBeLessThan(
          result.value.signedXml.indexOf('<Signature')
        );
        expect(result.value.digestValue.length).toBeGreaterThan(0);
      }
    });

    it('verifySignature retorna true para un evento recien firmado', async () => {
      const signer = new XMLSigner();
      const signResult = await signer.signEvento(xml, certData);
      if (!signResult.success) throw signResult.error;
      expect(signer.verifySignature(signResult.value.signedXml, certData)).toBe(true);
    });
  });
});
