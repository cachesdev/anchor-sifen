import { describe, expect, it } from 'vitest';
import { buildLote } from './sifen-client';

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
