import { describe, expect, it } from 'vitest';
import { parseRecibeLote } from './recibe-lote.parser';
import { parseSIFENResponse } from './parser-utils';

describe('SOAP — withRetEnviDeFallback', () => {
  const rawXml = `<?xml version="1.0" encoding="UTF-8"?>
<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">
  <env:Header/>
  <env:Body>
    <ns2:rRetEnviDe xmlns:ns2="http://ekuatia.set.gov.py/sifen/xsd">
      <ns2:rProtDe>
        <ns2:dFecProc>2026-05-08T19:03:07-03:00</ns2:dFecProc>
        <ns2:dEstRes>Rechazado</ns2:dEstRes>
        <ns2:gResProc>
          <ns2:dCodRes>0160</ns2:dCodRes>
          <ns2:dMsgRes>XML Mal Formado.</ns2:dMsgRes>
        </ns2:gResProc>
      </ns2:rProtDe>
    </ns2:rRetEnviDe>
  </env:Body>
</env:Envelope>`;

  it('delega al normalParser cuando parsed es valido', () => {
    const parsed = { dFecProc: '2024-01-01', dCodRes: '0300', dMsgRes: 'OK' };
    const result = parseSIFENResponse(parsed, undefined, parseRecibeLote);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.codigoResultado).toBe('0300');
    }
  });

  it('extrae rRetEnviDe del XML crudo cuando parsed es undefined', () => {
    const result = parseSIFENResponse(undefined, rawXml, parseRecibeLote);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.sifenCodigo).toBe('0160');
      expect(result.error.sifenMessage).toBe('XML Mal Formado.');
      expect(result.error.details).toContain('Rechazado');
      expect(result.error.details).toContain('0160');
      expect(result.error.rawObject).toBe(rawXml);
    }
  });

  it('extrae rRetEnviDe del XML crudo cuando parsed es null', () => {
    const result = parseSIFENResponse(null, rawXml, parseRecibeLote);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.sifenCodigo).toBe('0160');
    }
  });

  it('devuelve error generico si el XML crudo no contiene rRetEnviDe', () => {
    const badXml = '<root><not>rRetEnviDe</not></root>';
    const result = parseSIFENResponse(undefined, badXml, parseRecibeLote);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.sifenCodigo).toBeUndefined();
      expect(result.error.details).toContain('estructura esperada');
      expect(result.error.rawObject).toBe(badXml);
    }
  });

  it('devuelve error generico si raw no es un string XML', () => {
    const result = parseSIFENResponse(undefined, 42, parseRecibeLote);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.sifenCodigo).toBeUndefined();
      expect(result.error.rawObject).toBe(42);
    }
  });

  it('maneja multiples gResProc en el XML', () => {
    const multiXml = `<?xml version="1.0" encoding="UTF-8"?>
<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">
  <env:Body>
    <ns2:rRetEnviDe xmlns:ns2="http://ekuatia.set.gov.py/sifen/xsd">
      <ns2:rProtDe>
        <ns2:dEstRes>Rechazado</ns2:dEstRes>
        <ns2:gResProc>
          <ns2:dCodRes>0100</ns2:dCodRes>
          <ns2:dMsgRes>Error A</ns2:dMsgRes>
        </ns2:gResProc>
        <ns2:gResProc>
          <ns2:dCodRes>0200</ns2:dCodRes>
          <ns2:dMsgRes>Error B</ns2:dMsgRes>
        </ns2:gResProc>
      </ns2:rProtDe>
    </ns2:rRetEnviDe>
  </env:Body>
</env:Envelope>`;
    const result = parseSIFENResponse(undefined, multiXml, parseRecibeLote);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.sifenCodigo).toBe('0100');
      expect(result.error.sifenMessage).toBe('Error A');
    }
  });

  it('maneja rRetEnviDe sin gResProc (solo dEstRes)', () => {
    const simpleXml = `<?xml version="1.0" encoding="UTF-8"?>
<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">
  <env:Body>
    <ns2:rRetEnviDe xmlns:ns2="http://ekuatia.set.gov.py/sifen/xsd">
      <ns2:rProtDe>
        <ns2:dEstRes>Rechazado</ns2:dEstRes>
      </ns2:rProtDe>
    </ns2:rRetEnviDe>
  </env:Body>
</env:Envelope>`;
    const result = parseSIFENResponse(undefined, simpleXml, parseRecibeLote);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.sifenCodigo).toBeUndefined();
      expect(result.error.sifenMessage).toBe('Rechazado');
      expect(result.error.details).toContain('Rechazado');
    }
  });
});
