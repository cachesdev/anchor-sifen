import { describe, expect, it } from 'vitest';
import {
  parseRecibeLote,
  parseConsultaRuc,
  parseConsultaDE,
  parseConsultaLote,
  parseRecibe,
  parseEvento,
  parseSIFENResponse
} from './response-parsers';

describe('SOAP — response parsers', () => {
  describe('parseRecibeLote', () => {
    it('retorna Ok cuando dCodRes es 0300', () => {
      const raw = { dFecProc: '2024-01-01T00:00:00', dCodRes: '0300', dMsgRes: 'OK' };
      const result = parseRecibeLote(raw);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value.codigoResultado).toBe('0300');
        expect(result.value.mensajeResultado).toBe('OK');
        expect(result.value.fechaProcesamiento).toBeInstanceOf(Date);
      }
    });

    it('incluye numeroLote y tiempoProcesamiento cuando estan presentes', () => {
      const raw = {
        dFecProc: '2024-01-01T00:00:00',
        dCodRes: '0300',
        dMsgRes: 'OK',
        dProtConsLote: '12345',
        dTpoProces: 100
      };
      const result = parseRecibeLote(raw);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value.numeroLote).toBe('12345');
        expect(result.value.tiempoProcesamiento).toBe(100);
      }
    });

    it('retorna Err con reject de SIFEN cuando el codigo no es 0300', () => {
      const raw = { dFecProc: '', dCodRes: '0400', dMsgRes: 'Error SIFEN' };
      const result = parseRecibeLote(raw);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.sifenCodigo).toBe('0400');
        expect(result.error.isSifenRejection).toBe(true);
      }
    });

    it('retorna Err cuando el raw no es un objeto valido', () => {
      const result = parseRecibeLote('no es un objeto');
      expect(result.success).toBe(false);
    });
  });

  describe('parseConsultaRuc', () => {
    it('retorna Ok con datos basicos cuando el codigo es 0502', () => {
      const raw = { dCodRes: '0502', dMsgRes: 'OK' };
      const result = parseConsultaRuc(raw);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value.codigoResultado).toBe('0502');
        expect(result.value.contenedorRuc).toBeUndefined();
      }
    });

    it('incluye contenedor RUC cuando xContRUC esta presente', () => {
      const raw = {
        dCodRes: '0502',
        dMsgRes: 'OK',
        xContRUC: {
          dRUCCons: '80001234',
          dRazCons: 'EMPRESA SA',
          dCodEstCons: 'ACT',
          dDesEstCons: 'Activo',
          dRUCFactElec: 'S'
        }
      };
      const result = parseConsultaRuc(raw);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value.contenedorRuc!.rucConsultado).toBe('80001234');
        expect(result.value.contenedorRuc!.razonSocial).toBe('EMPRESA SA');
        expect(result.value.contenedorRuc!.esFacturadorElectronico).toBe('S');
      }
    });

    it('retorna Err SIFEN cuando el codigo no es 0502', () => {
      const raw = { dCodRes: '0501', dMsgRes: 'RUC no encontrado' };
      const result = parseConsultaRuc(raw);
      expect(result.success).toBe(false);
    });
  });

  describe('parseConsultaDE', () => {
    it('retorna Ok cuando el codigo es 0422', () => {
      const raw = { dCodRes: '0422', dMsgRes: 'OK' };
      const result = parseConsultaDE(raw);
      expect(result.success).toBe(true);
      if (result.success) expect(result.value.codigoResultado).toBe('0422');
    });

    it('incluye xmlDE y fecha cuando estan presentes', () => {
      const raw = {
        dCodRes: '0422',
        dMsgRes: 'OK',
        dFecProc: '2024-06-15T10:30:00',
        xContenDE: '<DE>contenido</DE>'
      };
      const result = parseConsultaDE(raw);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value.xmlDE).toBe('<DE>contenido</DE>');
        expect(result.value.fechaProcesamiento).toBeInstanceOf(Date);
      }
    });

    it('retorna Err cuando el codigo no es 0422', () => {
      const raw = { dCodRes: '0421', dMsgRes: 'CDC no encontrado' };
      const result = parseConsultaDE(raw);
      expect(result.success).toBe(false);
    });
  });

  describe('parseConsultaLote', () => {
    it('retorna Ok con resultados cuando el codigo es 0362', () => {
      const raw = {
        dCodResLot: '0362',
        dMsgResLot: 'OK',
        gResProcLote: [{ id: 'CDC123', dEstRes: 'Aprobado' }]
      };
      const result = parseConsultaLote(raw);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value.codigoResultado).toBe('0362');
        expect(result.value.resultados!).toHaveLength(1);
        expect(result.value.resultados![0]!.cdc).toBe('CDC123');
        expect(result.value.resultados![0]!.estado).toBe('Aprobado');
      }
    });

    it('incluye validaciones dentro de cada resultado', () => {
      const raw = {
        dCodResLot: '0362',
        dMsgResLot: 'OK',
        gResProcLote: [
          {
            id: 'CDC456',
            dEstRes: 'Aprobado',
            dProtAut: '98765',
            gResProc: [{ dCodRes: '0422', dMsgRes: 'OK' }]
          }
        ]
      };
      const result = parseConsultaLote(raw);
      expect(result.success).toBe(true);
      if (result.success) {
        const r = result.value.resultados![0]!;
        expect(r.numeroTransaccion).toBe('98765');
        expect(r.validaciones).toHaveLength(1);
        expect(r.validaciones[0]!.codigo).toBe('0422');
      }
    });

    it('retorna Err cuando el codigo no es 0362', () => {
      const raw = { dCodResLot: '0361', dMsgResLot: 'Lote no encontrado' };
      const result = parseConsultaLote(raw);
      expect(result.success).toBe(false);
    });
  });

  describe('parseRecibe', () => {
    it('retorna Ok cuando el estado es Aprobado', () => {
      const raw = {
        rProtDe: { Id: 'CDC789', dFecProc: '2024-01-01T00:00:00', dEstRes: 'Aprobado' }
      };
      const result = parseRecibe(raw);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value.cdc).toBe('CDC789');
        expect(result.value.estado).toBe('Aprobado');
      }
    });

    it('retorna Ok con Aprobado con observacion', () => {
      const raw = {
        rProtDe: {
          Id: 'CDC789',
          dFecProc: '2024-01-01T00:00:00',
          dEstRes: 'Aprobado con observación'
        }
      };
      const result = parseRecibe(raw);
      expect(result.success).toBe(true);
    });

    it('retorna Err cuando el estado es Rechazado', () => {
      const raw = {
        rProtDe: {
          Id: 'CDC789',
          dFecProc: '',
          dEstRes: 'Rechazado',
          gResProc: [{ dCodRes: '0400', dMsgRes: 'Error de schema' }]
        }
      };
      const result = parseRecibe(raw);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.isSifenRejection).toBe(true);
        expect(result.error.sifenCodigo).toBe('0400');
      }
    });

    it('retorna Err cuando no hay rProtDe', () => {
      const result = parseRecibe({});
      expect(result.success).toBe(false);
    });
  });

  describe('parseEvento', () => {
    it('retorna Ok cuando todos los resultados son Aprobado', () => {
      const raw = {
        gResProcEVe: [{ id: 'EVT001', dEstRes: 'Aprobado' }]
      };
      const result = parseEvento(raw);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value.resultados!).toHaveLength(1);
        expect(result.value.resultados![0]!.id).toBe('EVT001');
      }
    });

    it('retorna Ok con varios resultados aprobados', () => {
      const raw = {
        gResProcEVe: [
          { id: 'EVT001', dEstRes: 'Aprobado' },
          { id: 'EVT002', dEstRes: 'Aprobado con observación' }
        ]
      };
      const result = parseEvento(raw);
      expect(result.success).toBe(true);
    });

    it('retorna Err si algun resultado no es Aprobado', () => {
      const raw = {
        gResProcEVe: [
          { id: 'EVT001', dEstRes: 'Aprobado' },
          { id: 'EVT002', dEstRes: 'Rechazado', gResProc: [{ dCodRes: '0500', dMsgRes: 'error' }] }
        ]
      };
      const result = parseEvento(raw);
      expect(result.success).toBe(false);
      if (!result.success) expect(result.error.sifenCodigo).toBe('0500');
    });

    it('retorna Err si no hay resultados', () => {
      const raw = {};
      const result = parseEvento(raw);
      expect(result.success).toBe(false);
    });

    it('incluye fecha de procesamiento cuando esta presente', () => {
      const raw = {
        dFecProc: '2024-06-15T10:30:00',
        gResProcEVe: [{ id: 'EVT001', dEstRes: 'Aprobado' }]
      };
      const result = parseEvento(raw);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.value.fechaProcesamiento).toBeInstanceOf(Date);
      }
    });
  });

  describe('withRetEnviDeFallback', () => {
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
        // Takes the first error code
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
});
