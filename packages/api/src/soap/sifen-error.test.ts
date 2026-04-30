import { describe, expect, it } from 'vitest';
import { SifenError } from './sifen-error';

describe('SifenError', () => {
  it('el name de la instancia es SifenError', () => {
    const err = new SifenError({});
    expect(err.name).toBe('SifenError');
  });

  it('usa sifenMessage como mensaje principal si existe', () => {
    const err = new SifenError({
      sifenCodigo: '0422',
      sifenMessage: 'Documento inexistente'
    });
    expect(err.message).toBe('Documento inexistente');
  });

  it('usa details como fallback si sifenMessage no esta presente', () => {
    const err = new SifenError({
      details: 'Error interno del parser'
    });
    expect(err.message).toBe('Error interno del parser');
  });

  it('cae al mensaje por defecto si no hay sifenMessage ni details', () => {
    const err = new SifenError({});
    expect(err.message).toBe('Error desconocido de SIFEN.');
  });

  it('guarda sifenCodigo', () => {
    const err = new SifenError({ sifenCodigo: '0301' });
    expect(err.sifenCodigo).toBe('0301');
  });

  it('guarda rawObject para debug', () => {
    const raw = { dCodRes: '0422', dMsgRes: 'OK' };
    const err = new SifenError({ rawObject: raw });
    expect(err.rawObject).toEqual(raw);
  });

  describe('isSifenRejection', () => {
    it('devuelve true cuando sifenCodigo esta definido', () => {
      const err = new SifenError({ sifenCodigo: '0422' });
      expect(err.isSifenRejection).toBe(true);
    });

    it('devuelve false cuando sifenCodigo es undefined', () => {
      const err = new SifenError({ details: 'solo detalles' });
      expect(err.isSifenRejection).toBe(false);
    });

    it('devuelve true incluso con sifenCodigo vacio (es truthy)', () => {
      const err = new SifenError({ sifenCodigo: '' });
      expect(err.isSifenRejection).toBe(true);
    });
  });
});
