import { describe, expect, it } from 'vitest';
import { extractQRUrlFromDEXML } from '../index';
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
  describe('extractQRUrlFromDEXML', () => {
    it('retorna la URL QR embebida en gCamFuFD/dCarQR', () => {
      const qrUrl = 'https://ekuatia.set.gov.py/consultas-test/qr?nVersion=150&Id=123&cHashQR=abc';
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rDE xmlns="http://ekuatia.set.gov.py/sifen/xsd">
  <dVerFor>150</dVerFor>
  <DE Id="${cdc}"></DE>
  <gCamFuFD>
    <dCarQR>https://ekuatia.set.gov.py/consultas-test/qr?nVersion=150&amp;Id=123&amp;cHashQR=abc</dCarQR>
  </gCamFuFD>
</rDE>`;

      const result = extractQRUrlFromDEXML(xml);

      expect(result.success).toBe(true);
      if (!result.success) return;
      expect(result.value).toBe(qrUrl);
    });

    it('retorna Err util cuando falta gCamFuFD', () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rDE xmlns="http://ekuatia.set.gov.py/sifen/xsd">
  <dVerFor>150</dVerFor>
  <DE Id="${cdc}"></DE>
</rDE>`;

      const result = extractQRUrlFromDEXML(xml);

      expect(result.success).toBe(false);
      if (result.success) return;
      expect(result.error.message).toContain('gCamFuFD');
    });

    it.each([
      ['falta dCarQR', '<gCamFuFD></gCamFuFD>'],
      ['dCarQR esta vacio', '<gCamFuFD><dCarQR>   </dCarQR></gCamFuFD>']
    ])('retorna Err util cuando %s', (_, gCamFuFD) => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rDE xmlns="http://ekuatia.set.gov.py/sifen/xsd">
  <dVerFor>150</dVerFor>
  <DE Id="${cdc}"></DE>
  ${gCamFuFD}
</rDE>`;

      const result = extractQRUrlFromDEXML(xml);

      expect(result.success).toBe(false);
      if (result.success) return;
      expect(result.error.message).toContain('dCarQR');
    });
  });

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
        expect(result.value).not.toContain('test');
      }
    });

    it('preserva los valores decimales sin redondear', () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rDE xmlns="http://ekuatia.set.gov.py/sifen/xsd">
  <dVerFor>150</dVerFor>
  <DE Id="${cdc}">
    <gDatGralOpe>
      <dFeEmiDE>2026-04-30T08:00:00</dFeEmiDE>
      <gDatRec><dRucRec>80001234</dRucRec></gDatRec>
    </gDatGralOpe>
    <gDtipDE>
      <gCamItem><dDesProSer>Item 1</dDesProSer></gCamItem>
    </gDtipDE>
    <gTotSub>
      <dTotGralOpe>93350.00000000</dTotGralOpe>
      <dTotIVA>8487.27272727</dTotIVA>
    </gTotSub>
  </DE>
  <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
    <SignedInfo>
      <Reference>
        <DigestValue>testDigestABC123=</DigestValue>
      </Reference>
    </SignedInfo>
  </Signature>
</rDE>`;
      const result = getQRUrl(xml, '0001', 'testCSC', 'test');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value).toContain('dTotGralOpe=93350.00000000');
        expect(result.value).toContain('dTotIVA=8487.27272727');
      }
    });

    it('usa "0" cuando los totales no estan presentes', () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rDE xmlns="http://ekuatia.set.gov.py/sifen/xsd">
  <dVerFor>150</dVerFor>
  <DE Id="${cdc}">
    <gDatGralOpe>
      <dFeEmiDE>2026-04-30T08:00:00</dFeEmiDE>
    </gDatGralOpe>
    <gDtipDE>
      <gCamItem><dDesProSer>Item 1</dDesProSer></gCamItem>
    </gDtipDE>
  </DE>
  <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
    <SignedInfo>
      <Reference>
        <DigestValue>testDigestABC123=</DigestValue>
      </Reference>
    </SignedInfo>
  </Signature>
</rDE>`;
      const result = getQRUrl(xml, '0001', 'testCSC', 'test');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value).toContain('dTotGralOpe=0');
        expect(result.value).toContain('dTotIVA=0');
      }
    });

    it('usa dNumIDRec cuando iNatRec no es 1', () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rDE xmlns="http://ekuatia.set.gov.py/sifen/xsd">
  <dVerFor>150</dVerFor>
  <DE Id="${cdc}">
    <gDatGralOpe>
      <dFeEmiDE>2026-04-30T08:00:00</dFeEmiDE>
      <gDatRec><iNatRec>2</iNatRec><dNumIDRec>6133889</dNumIDRec></gDatRec>
    </gDatGralOpe>
    <gDtipDE>
      <gCamItem><dDesProSer>Item 1</dDesProSer></gCamItem>
    </gDtipDE>
    <gTotSub>
      <dTotGralOpe>100000</dTotGralOpe>
      <dTotIVA>0</dTotIVA>
    </gTotSub>
  </DE>
  <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
    <SignedInfo>
      <Reference>
        <DigestValue>testDigestABC123=</DigestValue>
      </Reference>
    </SignedInfo>
  </Signature>
</rDE>`;
      const result = getQRUrl(xml, '0001', 'testCSC', 'test');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value).toContain('dNumIDRec=6133889');
        expect(result.value).not.toContain('dRucRec=');
      }
    });

    it('usa dNumIDRec con fallback "0" cuando iNatRec no es 1 y no hay documento', () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rDE xmlns="http://ekuatia.set.gov.py/sifen/xsd">
  <dVerFor>150</dVerFor>
  <DE Id="${cdc}">
    <gDatGralOpe>
      <dFeEmiDE>2026-04-30T08:00:00</dFeEmiDE>
      <gDatRec><iNatRec>2</iNatRec></gDatRec>
    </gDatGralOpe>
    <gDtipDE>
      <gCamItem><dDesProSer>Item 1</dDesProSer></gCamItem>
    </gDtipDE>
    <gTotSub>
      <dTotGralOpe>100000</dTotGralOpe>
      <dTotIVA>0</dTotIVA>
    </gTotSub>
  </DE>
  <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
    <SignedInfo>
      <Reference>
        <DigestValue>testDigestABC123=</DigestValue>
      </Reference>
    </SignedInfo>
  </Signature>
</rDE>`;
      const result = getQRUrl(xml, '0001', 'testCSC', 'test');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value).toContain('dNumIDRec=0');
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
