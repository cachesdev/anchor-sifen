import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { DEC } from '../../sifen/types/clean/de';
import { applyBaseDerivedFields } from './base';

function makeDec(id_cdc: string): DEC {
  return { id_cdc, digitoVerificadorId: 0, fechaFirma: new Date(0) } as DEC;
}

describe('derive — base', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('extrae el digito verificador del ultimo caracter del CDC', () => {
    const de = makeDec('01800195515031005001331122026030517018918301');
    applyBaseDerivedFields(de);
    expect(de.digitoVerificadorId).toBe(1);
  });

  it('extrae DV 0 correctamente', () => {
    const de = makeDec('01800195515031005001331122026030517018918300');
    applyBaseDerivedFields(de);
    expect(de.digitoVerificadorId).toBe(0);
  });

  it('extrae DV 9 correctamente', () => {
    const de = makeDec('01800195515031005001331122026030517018918309');
    applyBaseDerivedFields(de);
    expect(de.digitoVerificadorId).toBe(9);
  });

  it('excepcion si el ultimo caracter no es un digito', () => {
    const de = makeDec('0180019551503100500133112202603051701891830X');
    expect(() => applyBaseDerivedFields(de)).toThrow(
      'No se pudo derivar digito verificador del CDC.'
    );
  });

  it('fija fechaFirma a la fecha/hora actual', () => {
    const now = new Date('2026-04-30T12:00:00Z');
    vi.setSystemTime(now);

    const de = makeDec('01800195515031005001331122026030517018918308');
    applyBaseDerivedFields(de);
    expect(de.fechaFirma).toEqual(now);
  });

  it('muta el objeto de entrada en lugar de crear uno nuevo', () => {
    const de = makeDec('01800195515031005001331122026030517018918305');
    const ref = de;
    applyBaseDerivedFields(de);
    expect(de).toBe(ref);
  });
});
