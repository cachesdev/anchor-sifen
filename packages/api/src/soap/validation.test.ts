import { describe, expect, it } from 'vitest';
import { escapeXml, normalizeControlId, normalizeSignedXml } from './validation';
import { MAX_SIRECEPDE_SIZE_BYTES } from './config';

describe('SOAP — validacion', () => {
  describe('escapeXml', () => {
    it('escapa & → &amp;', () => {
      expect(escapeXml('foo & bar')).toBe('foo &amp; bar');
    });

    it('escapa < → &lt;', () => {
      expect(escapeXml('a < b')).toBe('a &lt; b');
    });

    it('escapa > → &gt;', () => {
      expect(escapeXml('a > b')).toBe('a &gt; b');
    });

    it('escapa " → &quot;', () => {
      expect(escapeXml('say "hello"')).toBe('say &quot;hello&quot;');
    });

    it('escapa todas las entidades en un mismo string', () => {
      expect(escapeXml('<tag attr="value">&</tag>')).toBe(
        '&lt;tag attr=&quot;value&quot;&gt;&amp;&lt;/tag&gt;'
      );
    });

    it('no modifica texto sin caracteres especiales', () => {
      expect(escapeXml('texto plano')).toBe('texto plano');
    });

    it('no modifica una cadena vacia', () => {
      expect(escapeXml('')).toBe('');
    });
  });

  describe('normalizeSignedXml', () => {
    it('recorta espacios y retorna el XML', () => {
      expect(normalizeSignedXml('  <root/>  ')).toBe('<root/>');
    });

    it('acepta XML no vacio', () => {
      expect(normalizeSignedXml('<DE>contenido</DE>')).toBe('<DE>contenido</DE>');
    });

    it('lanza error si el XML esta vacio', () => {
      expect(() => normalizeSignedXml('')).toThrow();
    });

    it('lanza error si solo hay espacios en blanco', () => {
      expect(() => normalizeSignedXml('   \n\t  ')).toThrow();
    });

    it('lanza error si el XML supera los 1000 KB', () => {
      const largeXml = '<x>' + 'a'.repeat(MAX_SIRECEPDE_SIZE_BYTES) + '</x>';
      expect(() => normalizeSignedXml(largeXml)).toThrow(/1000 KB/);
    });

    it('permite XML exactamente en el limite de 1000 KB', () => {
      const content = 'a'.repeat(MAX_SIRECEPDE_SIZE_BYTES - '<></>'.length);
      const xml = `<>${content}</>`;
      expect(() => normalizeSignedXml(xml)).not.toThrow();
    });
  });

  describe('normalizeControlId', () => {
    it('acepta un string numerico de 1 a 15 digitos', () => {
      expect(normalizeControlId('12345')).toBe('12345');
    });

    it('acepta un solo digito', () => {
      expect(normalizeControlId('7')).toBe('7');
    });

    it('acepta exactamente 15 digitos', () => {
      const id = '123456789012345';
      expect(normalizeControlId(id)).toBe(id);
    });

    it('recorta espacios', () => {
      expect(normalizeControlId('  42  ')).toBe('42');
    });

    it('lanza error si el string no es numerico', () => {
      expect(() => normalizeControlId('abc')).toThrow();
    });

    it('lanza error si el string tiene mas de 15 digitos', () => {
      expect(() => normalizeControlId('1234567890123456')).toThrow();
    });

    it('lanza error si el string esta vacio', () => {
      expect(() => normalizeControlId('')).toThrow();
    });

    it('convierte number a string automaticamente', () => {
      expect(normalizeControlId(42)).toBe('42');
    });
  });
});
