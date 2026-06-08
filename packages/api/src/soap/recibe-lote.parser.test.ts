import { describe, expect, it } from 'vitest';
import { parseRecibeLote } from './recibe-lote.parser';

describe('SOAP — parseRecibeLote', () => {
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
