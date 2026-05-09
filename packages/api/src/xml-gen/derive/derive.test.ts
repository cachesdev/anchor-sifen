import { beforeEach, describe, expect, it, vi } from 'vitest';
import { calculateFields, calculateFieldsResult } from './derive';
import { createFacturaElectronicaDec } from '../../test-utils/factories';
import { parseCDC } from '../cdc';

describe('derive — calculateFields', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-30T12:00:00Z'));
  });

  it('muta el DE in-place y retorna la misma referencia', () => {
    const de = createFacturaElectronicaDec();
    const dvOriginal = de.digitoVerificadorId;

    const result = calculateFields(de);

    // Misma referencia: muta el original
    expect(result).toBe(de);

    // El original fue mutado
    expect(de.digitoVerificadorId).not.toBe(dvOriginal);

    // Valores derivados presentes
    expect(result.fechaFirma).toEqual(new Date('2026-04-30T12:00:00Z'));
  });

  it('extrae codigoSeguridad del CDC', () => {
    const de = createFacturaElectronicaDec();
    const result = calculateFields(de);
    const { codigoSeguridad } = parseCDC(de.id_cdc);
    expect(result.operacionDE.codigoSeguridad).toBe(codigoSeguridad);
  });
});

describe('derive — calculateFieldsResult', () => {
  it('retorna Ok con el DE derivado', () => {
    const de = createFacturaElectronicaDec();
    const result = calculateFieldsResult(de);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.id_cdc).toBe(de.id_cdc);
    }
  });

  it('retorna Err si ocurre un error', () => {
    const de = createFacturaElectronicaDec({ id_cdc: 'INVALID-CDC' });
    const result = calculateFieldsResult(de);
    expect(result.success).toBe(false);
  });
});
