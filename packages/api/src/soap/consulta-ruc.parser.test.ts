import { describe, expect, it } from 'vitest';
import { parseConsultaRuc } from './consulta-ruc.parser';

describe('SOAP — parseConsultaRuc', () => {
  it('retorna Ok con datos basicos cuando el codigo es 0502', () => {
    const raw = { dCodRes: '0502', dMsgRes: 'OK' };
    const result = parseConsultaRuc(raw);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.codigoResultado).toBe('0502');
      expect(result.value.contenedorRuc).toBeUndefined();
    }
  });

  it('incluye contenedor RUC cuando xContRUC esta presente', () => {
    const raw = {
      dCodRes: '0502',
      dMsgRes: 'OK',
      xContRUC: {
        dRUCCons: '80001234',
        dRazCons: 'EMPRESA SA',
        dCodEstCons: 'ACT',
        dDesEstCons: 'Activo',
        dRUCFactElec: 'S'
      }
    };
    const result = parseConsultaRuc(raw);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value.contenedorRuc!.rucConsultado).toBe('80001234');
      expect(result.value.contenedorRuc!.razonSocial).toBe('EMPRESA SA');
      expect(result.value.contenedorRuc!.esFacturadorElectronico).toBe('S');
    }
  });

  it('retorna Err si xContRUC esta presente pero mal formado', () => {
    const raw = {
      dCodRes: '0502',
      dMsgRes: 'OK',
      xContRUC: {
        dRUCCons: '80001234'
      }
    };

    const result = parseConsultaRuc(raw);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.isSifenRejection).toBe(false);
      expect(result.error.details).toContain('dRazCons');
    }
  });

  it('retorna Err SIFEN cuando el codigo no es 0502', () => {
    const raw = { dCodRes: '0501', dMsgRes: 'RUC no encontrado' };
    const result = parseConsultaRuc(raw);
    expect(result.success).toBe(false);
  });
});
