import { describe, expect, it } from 'vitest';
import { getQRUrl, attachQRToSignedXML } from './qr-generator';

const cdc = '01800195515031005001331122026030517018918308';

function makeSignedXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rDE xmlns="http://ekuatia.set.gov.py/sifen/xsd"
  xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
  <dVerFor>150</dVerFor>
  <DE Id="${cdc}">
    <gDatGralOpe>
      <dFeEmiDE>2026-04-30T08:00:00</dFeEmiDE>
      <gDatRec><dRucRec>80001234</dRucRec></gDatRec>
    </gDatGralOpe>
    <gDtipDE>
      <gCamItem><dDesProSer>Item 1</dDesProSer></gCamItem>
      <gCamItem><dDesProSer>Item 2</dDesProSer></gCamItem>
    </gDtipDE>
    <gTotSub>
      <dTotGralOpe>100000</dTotGralOpe>
      <dTotIVA>10000</dTotIVA>
    </gTotSub>
  </DE>
  <ds:Signature>
    <ds:SignedInfo>
      <ds:Reference>
        <ds:DigestValue>testDigestABC123=</ds:DigestValue>
      </ds:Reference>
    </ds:SignedInfo>
  </ds:Signature>
</rDE>`;
}

describe('qr', () => {
  describe('getQRUrl', () => {
    it('retorna una URL que incluye los parametros del DE', () => {
      const xml = makeSignedXml();
      const result = getQRUrl(xml, '0001', 'testCSC', 'test');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value).toContain('nVersion=150');
        expect(result.value).toContain(`Id=${cdc}`);
        expect(result.value).toContain('cItems=2');
        expect(result.value).toContain('cHashQR=');
      }
    });

    it('usa la URL de produccion cuando env=prod', () => {
      const result = getQRUrl(makeSignedXml(), '0001', 'testCSC', 'prod');
      if (result.success) {
        expect(result.value).toContain('consultas/qr');
      }
    });

    it('retorna Err para XML sin elemento DE', () => {
      const result = getQRUrl('<root></root>', '0001', 'testCSC', 'test');
      expect(result.success).toBe(false);
    });
  });

  describe('attachQRToSignedXML', () => {
    it('agrega gCamFuFD con dCarQR al XML firmado', () => {
      const xml = makeSignedXml();
      const result = attachQRToSignedXML(xml, '0001', 'testCSC', 'test');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value).toContain('<gCamFuFD>');
        expect(result.value).toContain('<dCarQR>');
      }
    });
  });
});
