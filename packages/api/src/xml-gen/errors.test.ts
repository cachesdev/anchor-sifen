import { describe, expect, it } from 'vitest';
import {
  XMLGenInputValidationError,
  XMLGenCalculationError,
  XMLGenBusinessValidationError,
  XMLGenMappingError,
  serializeError
} from './errors';

describe('xml-gen — errors', () => {
  describe('XMLGenInputValidationError', () => {
    it('incluye details en el mensaje', () => {
      const err = new XMLGenInputValidationError({ details: 'campo faltante: id_cdc' });
      expect(err.message).toContain('campo faltante: id_cdc');
      expect(err.name).toBe('XMLGenInputValidationError');
    });
  });

  describe('XMLGenCalculationError', () => {
    it('incluye details cuando estan presentes', () => {
      const err = new XMLGenCalculationError({ details: 'division por cero' });
      expect(err.message).toContain('division por cero');
    });

    it('usa sin detalle cuando no hay details', () => {
      const err = new XMLGenCalculationError({});
      expect(err.message).toContain('sin detalle');
    });
  });

  describe('XMLGenBusinessValidationError', () => {
    it('reporta la cantidad de issues', () => {
      const err = new XMLGenBusinessValidationError({
        issues: [
          { id: 'R001', message: 'error 1' },
          { id: 'R002', message: 'error 2' }
        ]
      });
      expect(err.message).toContain('2 error(es) de validacion');
      expect(err.issues).toHaveLength(2);
    });
  });

  describe('XMLGenMappingError', () => {
    it('incluye details', () => {
      const err = new XMLGenMappingError({ details: 'descripcion no encontrada' });
      expect(err.message).toContain('descripcion no encontrada');
    });
  });

  describe('serializeError', () => {
    it('serializa errores con name, message y details', () => {
      const err = new XMLGenMappingError({ details: 'fallo' });
      const serialized = serializeError(err) as { name: string; message: string; details: string };
      expect(serialized.name).toBe('XMLGenMappingError');
      expect(serialized.message).toContain('fallo');
      expect(serialized.details).toBe('fallo');
    });

    it('serializa errores con issues', () => {
      const err = new XMLGenBusinessValidationError({
        issues: [{ id: 'R001', message: 'error' }]
      });
      const serialized = serializeError(err) as { issues: Array<unknown> };
      expect(serialized.issues).toHaveLength(1);
    });

    it('serializa recursivamente la causa', () => {
      const cause = new Error('root cause');
      const err = new XMLGenMappingError({ details: 'fallo', cause });
      const serialized = serializeError(err) as { cause: { message: string } };
      expect(serialized.cause.message).toBe('root cause');
    });

    it('maneja valores que no son Error', () => {
      const serialized = serializeError('string error') as { raw: string };
      expect(serialized.raw).toBe('string error');
    });

    it('maneja Error sin cause', () => {
      const err = new XMLGenMappingError({ details: 'sin causa' });
      const serialized = serializeError(err) as Record<string, unknown>;
      expect(serialized.cause).toBeUndefined();
    });
  });
});
