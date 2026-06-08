import { describe, expect, it } from 'vitest';
import { parseRecibe } from './recibe.parser';

describe('SOAP — parseRecibe', () => {
  it('retorna Ok cuando el estado es Aprobado', () => {
    const raw = {
      rProtDe: {
        Id: 'CDC789',
        dFecProc: '2024-01-01T00:00:00',
        dDigVal: 'DIGEST123',
        dEstRes: 'Aprobado',
        dProtAut: ' 98765 '
      }
    };
    const result = parseRecibe(raw);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.cdc).toBe('CDC789');
      expect(result.value.estado).toBe('Aprobado');
      expect(result.value.digestValue).toBe('DIGEST123');
      expect(result.value.numeroTransaccion).toBe('98765');
    }
  });

  it('normaliza dProtAut numerico a string', () => {
    const raw = {
      rProtDe: {
        Id: 'CDC789',
        dFecProc: '2024-01-01T00:00:00',
        dEstRes: 'Aprobado',
        dProtAut: 1234567890
      }
    };

    const result = parseRecibe(raw);

    expect(result.success).toBe(true);
    if (result.success) expect(result.value.numeroTransaccion).toBe('1234567890');
  });

  it('normaliza dProtAut bigint a string', () => {
    const raw = {
      rProtDe: {
        Id: 'CDC789',
        dFecProc: '2024-01-01T00:00:00',
        dEstRes: 'Aprobado',
        dProtAut: 12345678901234567890n
      }
    };

    const result = parseRecibe(raw);

    expect(result.success).toBe(true);
    if (result.success) expect(result.value.numeroTransaccion).toBe('12345678901234567890');
  });

  it('retorna Err local si dProtAut esta presente pero vacio', () => {
    const raw = {
      rProtDe: {
        Id: 'CDC789',
        dFecProc: '2024-01-01T00:00:00',
        dEstRes: 'Aprobado',
        dProtAut: '   '
      }
    };

    const result = parseRecibe(raw);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.isSifenRejection).toBe(false);
      expect(result.error.details).toContain('dProtAut');
    }
  });

  it('retorna Err local si el estado es aprobado pero falta Id', () => {
    const raw = {
      rProtDe: { dFecProc: '2024-01-01T00:00:00', dEstRes: 'Aprobado' }
    };

    const result = parseRecibe(raw);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.isSifenRejection).toBe(false);
      expect(result.error.details).toContain('Id esta ausente');
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
