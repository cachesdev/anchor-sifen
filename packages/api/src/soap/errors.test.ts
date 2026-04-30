import { describe, expect, it } from 'vitest';
import { mapSoapError } from './errors';

describe('SOAP — errores', () => {
  describe('mapSoapError', () => {
    it('traduce ENOTFOUND al mensaje de conexion', () => {
      const error = new Error('getaddrinfo ENOTFOUND example.com');
      const result = mapSoapError(error);
      expect(result.message).toBe('No se pudo conectar a endpoint de SIFEN.');
    });

    it('traduce ECONNREFUSED al mensaje de conexion', () => {
      const error = new Error('connect ECONNREFUSED 127.0.0.1:443');
      const result = mapSoapError(error);
      expect(result.message).toBe('No se pudo conectar a endpoint de SIFEN.');
    });

    it('traduce ETIMEDOUT al mensaje de conexion', () => {
      const error = new Error('ETIMEDOUT after 30 seconds');
      const result = mapSoapError(error);
      expect(result.message).toBe('No se pudo conectar a endpoint de SIFEN.');
    });

    it('traduce socket hang up al mensaje de conexion', () => {
      const error = new Error('socket hang up');
      const result = mapSoapError(error);
      expect(result.message).toBe('No se pudo conectar a endpoint de SIFEN.');
    });

    it('conserva el mensaje original si el error no es de conexion', () => {
      const error = new Error('Internal server error');
      const result = mapSoapError(error);
      expect(result.message).toBe('Error de request SIFEN: Internal server error');
    });

    it('convierte a string si la entrada no es un Error', () => {
      const result = mapSoapError('algo fallo');
      expect(result.message).toBe('Error de request SIFEN: algo fallo');
    });

    it('detecta los codigos sin importar mayusculas/minusculas', () => {
      const error = new Error('EnotFound');
      const result = mapSoapError(error);
      expect(result.message).toBe('No se pudo conectar a endpoint de SIFEN.');
    });
  });
});
