import { describe, expect, it } from 'vitest';
import { generateDEXML } from './generator';
import type { PreparedDE } from './de-pipeline';

describe('xml-gen — generator', () => {
  const prepared: PreparedDE = {
    type: 'FacturaElectronica',
    cdc: 'CDC123',
    clean: undefined!,
    raw: {
      dDVId: 8,
      dFecFirma: '2026-04-30T12:00:00',
      dSisFact: 1,
      gOpeDE: { iTipEmi: 1, dDesTipEmi: 'Normal', dCodSeg: 123456789 },
      gTimb: {
        iTiDE: 1,
        dDesTiDE: 'Factura electrónica',
        dNumTim: 12345678,
        dEst: '001',
        dPunExp: '001',
        dNumDoc: '0000001',
        dFeIniT: '2026-01-01'
      },
      gDatGralOpe: undefined!,
      gDtipDE: undefined!
    }
  };

  it('genera XML compacto sin declaracion ni whitespace', () => {
    const xml = generateDEXML(prepared);
    expect(xml).not.toContain('<?xml');
    expect(xml).not.toContain('\n');
  });

  it('incluye el namespace de SIFEN en el elemento raiz', () => {
    const xml = generateDEXML(prepared);
    expect(xml).toContain('xmlns="http://ekuatia.set.gov.py/sifen/xsd"');
    expect(xml).toContain('rDE');
  });

  it('incluye el CDC como atributo Id del elemento DE', () => {
    const xml = generateDEXML(prepared);
    expect(xml).toContain('Id="CDC123"');
  });

  it('incluye la version del formato (150)', () => {
    const xml = generateDEXML(prepared);
    expect(xml).toContain('<dVerFor>150</dVerFor>');
  });

  it('incluye los campos de operacion DE', () => {
    const xml = generateDEXML(prepared);
    expect(xml).toContain('<iTipEmi>1</iTipEmi>');
    expect(xml).toContain('<dDesTipEmi>Normal</dDesTipEmi>');
    expect(xml).toContain('<dCodSeg>123456789</dCodSeg>');
  });

  it('incluye los datos de timbrado', () => {
    const xml = generateDEXML(prepared);
    expect(xml).toContain('<dEst>001</dEst>');
    expect(xml).toContain('<dPunExp>001</dPunExp>');
    expect(xml).toContain('<dNumDoc>0000001</dNumDoc>');
  });
});
