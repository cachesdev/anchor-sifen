import { describe, expect, it } from 'vitest';
import { parseEvento } from './evento.parser';

describe('SOAP — parseEvento', () => {
  it('retorna Ok flatten cuando el evento tiene codigo 0600', () => {
    const raw = {
      dFecProc: '2024-06-15T10:30:00',
      gResProcEVe: {
        id: '1',
        dEstRes: 'Aprobado',
        dProtAut: '1234567890',
        gResProc: { dCodRes: '0600', dMsgRes: 'Evento registrado' }
      }
    };

    const result = parseEvento(raw);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.idEvento).toBe('1');
      expect(result.value.estado).toBe('Aprobado');
      expect(result.value.numeroTransaccion).toBe('1234567890');
      expect(result.value.fechaProcesamiento).toBeInstanceOf(Date);
      expect(result.value.validaciones).toEqual([{ codigo: '0600', mensaje: 'Evento registrado' }]);
    }
  });

  it('normaliza dProtAut numerico a string', () => {
    const raw = {
      dFecProc: '2024-06-15T10:30:00',
      gResProcEVe: {
        id: '1',
        dEstRes: 'Aprobado',
        dProtAut: 1234567890,
        gResProc: [{ dCodRes: '0600', dMsgRes: 'Evento registrado' }]
      }
    };

    const result = parseEvento(raw);

    expect(result.success).toBe(true);
    if (result.success) expect(result.value.numeroTransaccion).toBe('1234567890');
  });

  it('retorna Err si el evento no tiene codigo 0600', () => {
    const raw = {
      dFecProc: '2024-06-15T10:30:00',
      gResProcEVe: {
        id: '1',
        dEstRes: 'Rechazado',
        gResProc: [{ dCodRes: '0500', dMsgRes: 'error' }]
      }
    };

    const result = parseEvento(raw);

    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.sifenCodigo).toBe('0500');
  });

  it('retorna Err si falta dFecProc', () => {
    const raw = {
      gResProcEVe: {
        id: '1',
        dEstRes: 'Aprobado',
        gResProc: [{ dCodRes: '0600', dMsgRes: 'Evento registrado' }]
      }
    };

    const result = parseEvento(raw);

    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.details).toContain('dFecProc');
  });

  it('retorna Err si la respuesta contiene varios resultados', () => {
    const raw = {
      dFecProc: '2024-06-15T10:30:00',
      gResProcEVe: [
        {
          id: '1',
          dEstRes: 'Aprobado',
          gResProc: [{ dCodRes: '0600', dMsgRes: 'Evento registrado' }]
        },
        {
          id: '2',
          dEstRes: 'Aprobado',
          gResProc: [{ dCodRes: '0600', dMsgRes: 'Evento registrado' }]
        }
      ]
    };

    const result = parseEvento(raw);

    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.details).toContain('contener un resultado');
  });

  it('retorna Err si el resultado usa Id en lugar de id', () => {
    const raw = {
      dFecProc: '2024-06-15T10:30:00',
      gResProcEVe: {
        Id: '1',
        dEstRes: 'Aprobado',
        gResProc: [{ dCodRes: '0600', dMsgRes: 'Evento registrado' }]
      }
    };

    const result = parseEvento(raw);

    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.details).toContain('id');
  });
});
