import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  buildFacturaElectronica,
  generateCDC,
  generateDEXML,
  parseDEXML,
  parseDEXMLToClean
} from '../index';
import { createFacturaElectronicaInput } from '../test-utils/factories';

const fixtureDir = path.resolve(import.meta.dirname, '../../fixtures/de-xml');
const fixturePath = path.resolve(fixtureDir, '01800160967037005064803122026052914819933703.xml');
const xmlFixtures = readdirSync(fixtureDir)
  .filter((entry) => entry.endsWith('.xml'))
  .map((entry) => path.resolve(fixtureDir, entry));

function readFixture(): string {
  return readFileSync(fixturePath, 'utf8');
}

describe('xml-parse — DE', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-30T12:00:00Z'));
  });

  it.each(xmlFixtures)('parsea el fixture del corpus %s a datos raw y clean de DE', (path) => {
    const xml = readFileSync(path, 'utf8');

    expect(parseDEXML(xml).success).toBe(true);
    expect(parseDEXMLToClean(xml).success).toBe(true);
  });

  it('parsea XML rDE real de SIFEN a DocumentoElectronico raw', () => {
    const result = parseDEXML(readFixture());

    expect(result.success).toBe(true);
    if (!result.success) return;

    const de = result.value.rDE.DE;
    expect(result.value.rDE.dVerFor).toBe(150);
    expect(de.gTimb.iTiDE).toBe(1);
    expect(de.gTimb.dEst).toBe('037');
    expect(de.gDtipDE.gCamItem).toHaveLength(3);
    expect(de.gDatGralOpe.gEmis.gActEco).toHaveLength(6);
    expect(de.gDatGralOpe.gOpeCom?.gOblAfe).toHaveLength(1);
    expect(de.gDtipDE.gCamCond?.gPaConEIni).toHaveLength(1);
    expect(typeof de.gDtipDE.gCamItem[0]?.dCantProSer).toBe('string');
    expect(typeof de.gDtipDE.gCamItem[0]?.gValorItem?.dPUniProSer).toBe('string');
  });

  it('descarta metadata XML fuera del limite raw de DocumentoElectronico', () => {
    const result = parseDEXML(readFixture());

    expect(result.success).toBe(true);
    if (!result.success) return;

    expect(result.value.rDE).not.toHaveProperty('@xmlns');
    expect(result.value.rDE).not.toHaveProperty('Signature');
    expect(result.value.rDE).not.toHaveProperty('gCamFuFD');
    expect(result.value.rDE.DE).not.toHaveProperty('@Id');
  });

  it('compone el parseo y el mapeo reverso a datos clean de DE', () => {
    const result = parseDEXMLToClean(readFixture());

    expect(result.success).toBe(true);
    if (!result.success) return;

    const de = result.value.rDE.DE;
    expect(de.tipoDE).toBe('FacturaElectronica');
    expect(de.datosEspecificosPorTipoDE.itemsOperacion).toHaveLength(3);
    expect(de.datosGeneralesOperacion.emisor.actividadesEconomicas).toHaveLength(6);
  });

  it('retorna Err para XML mal formado', () => {
    const result = parseDEXML('<rDE><dVerFor>150</dVerFor>');

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error.name).toBe('XMLParseError');
  });

  it('hace ida y vuelta de clean a raw, XML, raw y clean preservando los datos del DE', () => {
    const fechaEmision = new Date('2026-04-30T12:00:00-04:00');
    const baseInput = createFacturaElectronicaInput();
    const input = createFacturaElectronicaInput({
      id_cdc: generateCDC({
        tipoDocumento: 1,
        rucEmisor: '80012345',
        dvEmisor: 0,
        establecimiento: '001',
        puntoExpedicion: '001',
        numeroDocumento: '0000001',
        tipoContribuyente: 1,
        fechaEmision,
        tipoEmision: 1,
        codigoSeguridad: 123456789
      }),
      operacionDE: {
        ...baseInput.operacionDE,
        tipoEmision: 1
      },
      timbrado: {
        ...baseInput.timbrado,
        establecimiento: 1,
        puntoExpedicion: 1,
        numeroDocumento: 1
      },
      datosGeneralesOperacion: {
        ...baseInput.datosGeneralesOperacion,
        fechaEmisionDE: fechaEmision,
        emisor: {
          ...baseInput.datosGeneralesOperacion.emisor,
          rucEmisor: '80012345-0',
          tipoContribuyente: 1
        }
      }
    });
    const prepared = buildFacturaElectronica(input);
    if (!prepared.success) throw prepared.error;

    const xml = generateDEXML(prepared.value);
    const parsedRaw = parseDEXML(xml);
    const parsedClean = parseDEXMLToClean(xml);

    expect(parsedRaw.success).toBe(true);
    expect(parsedClean.success).toBe(true);
    if (!parsedRaw.success || !parsedClean.success) return;

    const original = prepared.value.clean;
    const reparsed = parsedClean.value.rDE.DE;

    expect(parsedRaw.value.rDE.DE.gTimb.dEst).toBe(prepared.value.raw.gTimb.dEst);
    expect(reparsed.id_cdc).toBe(original.id_cdc);
    expect(reparsed.tipoDE).toBe(original.tipoDE);
    expect(reparsed.operacionDE.codigoSeguridad).toBe(original.operacionDE.codigoSeguridad);
    expect(reparsed.timbrado.establecimiento).toBe(original.timbrado.establecimiento);
    expect(reparsed.timbrado.puntoExpedicion).toBe(original.timbrado.puntoExpedicion);
    expect(reparsed.timbrado.numeroDocumento).toBe(original.timbrado.numeroDocumento);
    expect(reparsed.datosEspecificosPorTipoDE.itemsOperacion).toHaveLength(
      original.datosEspecificosPorTipoDE.itemsOperacion.length
    );
    expect(
      reparsed.datosEspecificosPorTipoDE.itemsOperacion[0]?.valorItem?.precioUnitario.toString()
    ).toBe(
      original.datosEspecificosPorTipoDE.itemsOperacion[0]?.valorItem?.precioUnitario.toString()
    );
    expect(reparsed.subtotalesTotales?.totalNetoOperacion.toString()).toBe(
      original.subtotalesTotales?.totalNetoOperacion.toString()
    );
  });
});
