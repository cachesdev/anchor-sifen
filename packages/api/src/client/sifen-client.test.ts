import { describe, expect, it } from 'vitest';
import { createDummyPKCS12Source } from '../certificate';
import { buildLote, SifenAPI } from './sifen-client';

describe('client — buildLote', () => {
  const deXml1 =
    '<?xml version="1.0" encoding="UTF-8"?><rDE xmlns="http://ekuatia.set.gov.py/sifen/xsd"><dVerFor>150</dVerFor><DE Id="CDC1"><gOpeDE><iTipEmi>1</iTipEmi></gOpeDE></DE></rDE>';
  const deXml2 =
    '<?xml version="1.0" encoding="UTF-8"?><rDE xmlns="http://ekuatia.set.gov.py/sifen/xsd"><dVerFor>150</dVerFor><DE Id="CDC2"><gOpeDE><iTipEmi>2</iTipEmi></gOpeDE></DE></rDE>';

  it('construye un rLoteDE con los DE anidados', () => {
    const lote = buildLote([deXml1]);
    expect(lote).toContain('<rLoteDE');
    expect(lote).toContain('Id="CDC1"');
  });

  it('las declaraciones de namespace viven en los rDE internos, no en rLoteDE', () => {
    const lote = buildLote([deXml1]);
    expect(lote).toContain('xmlns="http://ekuatia.set.gov.py/sifen/xsd"');
    expect(lote).toMatch(/^<rLoteDE><rDE/);
  });

  it('incluye varios DE en el lote', () => {
    const lote = buildLote([deXml1, deXml2]);
    expect(lote).toContain('Id="CDC1"');
    expect(lote).toContain('Id="CDC2"');
  });

  it('elimina las declaraciones XML de los DE y no emite la propia', () => {
    const lote = buildLote([deXml1]);
    const occurrences = (lote.match(/<\?xml/g) || []).length;
    expect(occurrences).toBe(0);
  });

  it('produce XML bien formado con lote vacio', () => {
    const lote = buildLote([]);
    expect(lote).toContain('<rLoteDE');
    expect(lote).not.toContain('\n');
  });
});

describe('client — enviarEvento', () => {
  it('genera y firma XML de evento antes de enviarlo por SOAP', async () => {
    const api = new SifenAPI({
      environment: 'test',
      certificateSource: createDummyPKCS12Source(),
      idCSC: '1',
      csc: 'ABCD0000000000000000000000000000'
    });
    let sent: { digitoControl: string | number; eventoXml: string } | undefined;

    (
      api as unknown as {
        soap: { eventoClient: { enviarEventoXml: typeof stubEnviarEventoXml } };
      }
    ).soap.eventoClient.enviarEventoXml = stubEnviarEventoXml;

    const result = await api.enviarEvento({
      digitoControl: '7',
      evento: {
        tipo: 'cancelacion',
        idEvento: '123',
        cdc: '01800195515031005001331122026030517018918308',
        motivo: 'Error en datos'
      }
    });

    expect(result.success).toBe(true);
    expect(sent?.digitoControl).toBe('7');
    expect(sent?.eventoXml).toContain('<gGroupGesEve');
    expect(sent?.eventoXml).toContain('<rEve Id="123">');
    expect(sent?.eventoXml).toContain('<rGeVeCan>');
    expect(sent?.eventoXml).toContain('<Signature');

    async function stubEnviarEventoXml(params: {
      digitoControl: string | number;
      eventoXml: string;
    }) {
      sent = params;
      return {
        success: true as const,
        value: {
          fechaProcesamiento: new Date('2024-06-15T10:30:00'),
          idEvento: '123',
          estado: 'Aprobado',
          numeroTransaccion: '1234567890',
          validaciones: [{ codigo: '0600', mensaje: 'Evento registrado' }]
        }
      };
    }
  });
});
