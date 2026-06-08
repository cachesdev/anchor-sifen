import { describe, expect, it } from 'vitest';
import { parseConsultaLote } from './consulta-lote.parser';

const CDC_1 = '1'.repeat(44);
const CDC_2 = '2'.repeat(44);

describe('SOAP — parseConsultaLote', () => {
  it('retorna Ok con resultados cuando el codigo es 0362', () => {
    const raw = {
      dFecProc: '2026-05-15T10:30:00',
      dCodResLot: '0362',
      dMsgResLot: 'OK',
      gResProcLote: [
        { id: CDC_1, dEstRes: 'Aprobado', gResProc: [{ dCodRes: '0422', dMsgRes: 'OK' }] }
      ]
    };
    const result = parseConsultaLote(raw);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.codigoResultado).toBe('0362');
      expect(result.value.fechaProcesamiento).toBeInstanceOf(Date);
      expect(result.value.resultados!).toHaveLength(1);
      expect(result.value.resultados![0]!.cdc).toBe(CDC_1);
      expect(result.value.resultados![0]!.estado).toBe('Aprobado');
    }
  });

  it('normaliza gResProcLote y gResProc individuales a arrays', () => {
    const raw = {
      dFecProc: '2026-05-15T10:30:00',
      dCodResLot: '0362',
      dMsgResLot: 'OK',
      gResProcLote: {
        id: CDC_1,
        dEstRes: 'Aprobado',
        gResProc: { dCodRes: '0422', dMsgRes: 'OK' }
      }
    };

    const result = parseConsultaLote(raw);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.resultados).toHaveLength(1);
      expect(result.value.resultados![0]!.validaciones).toEqual([
        { codigo: '0422', mensaje: 'OK' }
      ]);
    }
  });

  it('incluye validaciones dentro de cada resultado', () => {
    const raw = {
      dFecProc: '2026-05-15T10:30:00',
      dCodResLot: '0362',
      dMsgResLot: 'OK',
      gResProcLote: [
        {
          id: CDC_2,
          dEstRes: 'Aprobado',
          dProtAut: ' 98765 ',
          gResProc: [{ dCodRes: '0422', dMsgRes: 'OK' }]
        }
      ]
    };
    const result = parseConsultaLote(raw);
    expect(result.success).toBe(true);
    if (result.success) {
      const r = result.value.resultados![0]!;
      expect(r.numeroTransaccion).toBe('98765');
      expect(r.validaciones).toHaveLength(1);
      expect(r.validaciones[0]!.codigo).toBe('0422');
    }
  });

  it('normaliza dProtAut numerico a string', () => {
    const raw = {
      dFecProc: '2026-05-15T10:30:00',
      dCodResLot: '0362',
      dMsgResLot: 'OK',
      gResProcLote: {
        id: CDC_1,
        dEstRes: 'Aprobado',
        dProtAut: 98765,
        gResProc: { dCodRes: '0422', dMsgRes: 'OK' }
      }
    };

    const result = parseConsultaLote(raw);

    expect(result.success).toBe(true);
    if (result.success) expect(result.value.resultados![0]!.numeroTransaccion).toBe('98765');
  });

  it('retorna Err cuando el codigo no es 0362', () => {
    const raw = {
      dFecProc: '2026-05-15T10:30:00',
      dCodResLot: '0361',
      dMsgResLot: 'Lote no encontrado'
    };
    const result = parseConsultaLote(raw);
    expect(result.success).toBe(false);
  });

  it('retorna Err si algun resultado del lote no cumple el schema', () => {
    const raw = {
      dFecProc: '2026-05-15T10:30:00',
      dCodResLot: '0362',
      dMsgResLot: 'OK',
      gResProcLote: [{ dEstRes: 'Aprobado' }]
    };
    const result = parseConsultaLote(raw);
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.details).toContain('id');
  });

  it('retorna Err si un resultado de lote no contiene gResProc', () => {
    const raw = {
      dFecProc: '2026-05-15T10:30:00',
      dCodResLot: '0362',
      dMsgResLot: 'OK',
      gResProcLote: [{ id: CDC_1, dEstRes: 'Aprobado' }]
    };

    const result = parseConsultaLote(raw);

    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.details).toContain('gResProc');
  });

  it('retorna Err si dProtAut esta presente pero vacio', () => {
    const raw = {
      dFecProc: '2026-05-15T10:30:00',
      dCodResLot: '0362',
      dMsgResLot: 'OK',
      gResProcLote: {
        id: CDC_1,
        dEstRes: 'Aprobado',
        dProtAut: '   ',
        gResProc: { dCodRes: '0422', dMsgRes: 'OK' }
      }
    };

    const result = parseConsultaLote(raw);

    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.details).toContain('dProtAut');
  });
});
