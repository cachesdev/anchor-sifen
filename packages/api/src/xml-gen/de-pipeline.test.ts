import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DateTime } from 'luxon';
import { prepareDE } from './de-pipeline';
import { facturaElectronicaSchema } from './schema/factura-electronica';
import { createFacturaElectronicaInput } from '../test-utils/factories';

describe('xml-gen — de-pipeline', () => {
  const frozenTime = new Date('2026-04-30T12:00:00Z');

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(frozenTime);
  });

  it('deriva todos los campos calculables y mapea a raw', () => {
    const input = createFacturaElectronicaInput();
    const result = prepareDE(input, facturaElectronicaSchema, 'FacturaElectronica');
    if (!result.success) throw result.error;

    const { raw, cdc } = result.value;

    // CDC preservado
    expect(cdc).toBe(input.id_cdc);

    // Fecha de firma en zona Asunción con hora congelada
    const expectedFirma = DateTime.fromJSDate(frozenTime, { zone: 'America/Asuncion' }).toFormat(
      "yyyy-MM-dd'T'HH:mm:ss"
    );
    expect(raw.dFecFirma).toBe(expectedFirma);

    // DV derivado del último dígito del CDC
    expect(raw.dDVId).toBe(Number.parseInt(cdc.slice(-1), 10));

    // Codigo de seguridad generado con crypto real
    expect(raw.gOpeDE.dCodSeg).toBeGreaterThanOrEqual(100_000_000);

    // Timbrado con padding a la izquierda
    expect(raw.gTimb.dEst).toMatch(/^\d{3}$/);
    expect(raw.gTimb.dPunExp).toMatch(/^\d{3}$/);
    expect(raw.gTimb.dNumDoc).toMatch(/^\d{7}$/);

    // Items mapeados
    expect(raw.gDtipDE.gCamItem!.length).toBeGreaterThanOrEqual(1);

    // Subtotales calculados (no son cero)
    const sub = raw.gTotSub!;
    expect(Number.parseFloat(sub.dTotOpe)).toBeGreaterThan(0);
    expect(Number.parseFloat(sub.dTotGralOpe)).toBeGreaterThan(0);
  });

  it('retorna Err si el CDC no es valido', () => {
    const input = createFacturaElectronicaInput({ id_cdc: 'INVALID-CDC' });
    const result = prepareDE(input, facturaElectronicaSchema, 'FacturaElectronica');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.name).toBe('XMLGenCalculationError');
    }
  });
});
