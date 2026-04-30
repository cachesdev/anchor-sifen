import { describe, expect, it } from 'vitest';
import { Err, Ok } from './result';

describe('result', () => {
  describe('Ok', () => {
    it('setea success=true y guarda el valor provisto', () => {
      const result = Ok(42);
      expect(result.success).toBe(true);
      expect(result.value).toBe(42);
    });

    it('envuelve un string', () => {
      const result = Ok('hello');
      expect(result.success).toBe(true);
      expect(result.value).toBe('hello');
    });

    it('envuelve un objeto', () => {
      const obj = { foo: 'bar' };
      const result = Ok(obj);
      expect(result.success).toBe(true);
      expect(result.value).toBe(obj);
    });

    it('permite undefined como valor (no es lo mismo que Err)', () => {
      const result = Ok(undefined);
      expect(result.success).toBe(true);
      expect(result.value).toBeUndefined();
    });

    it('el discriminante success estrecha al tipo Ok', () => {
      const result = Ok(42);
      if (result.success) {
        expect(result.value).toBe(42);
      } else {
        expect.fail('deberia haber entrado por success');
      }
    });
  });

  describe('Err', () => {
    it('setea success=false y guarda el error', () => {
      const error = new Error('algo fallo');
      const result = Err(error);
      expect(result.success).toBe(false);
      expect(result.error).toBe(error);
    });

    it('envuelve un string como error', () => {
      const result = Err('entrada invalida');
      expect(result.success).toBe(false);
      expect(result.error).toBe('entrada invalida');
    });

    it('envuelve un objeto como error', () => {
      const errObj = { code: 'E001', message: 'malo' };
      const result = Err(errObj);
      expect(result.success).toBe(false);
      expect(result.error).toEqual(errObj);
    });

    it('el discriminante success estrecha al tipo Err', () => {
      const result = Err(new Error('fallo'));
      if (result.success) {
        expect.fail('deberia haber entrado por error');
      } else {
        expect(result.error.message).toBe('fallo');
      }
    });
  });
});
