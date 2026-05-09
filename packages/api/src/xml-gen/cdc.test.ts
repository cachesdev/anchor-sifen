import { describe, expect, it } from 'vitest';
import { generateCDC, generateCodigoSeguridad, parseCDC } from './cdc';

describe('xml-gen — cdc', () => {
  const validCDC = {
    tipoDocumento: 1,
    rucEmisor: '80016096',
    dvEmisor: 7,
    establecimiento: '037',
    puntoExpedicion: '005',
    numeroDocumento: '0636619',
    tipoContribuyente: 2,
    fechaEmision: new Date(2026, 4, 7),
    tipoEmision: 1,
    codigoSeguridad: 501598448
  } as const;

  const validCDCString = '01800160967037005063661922026050715015984480';

  describe('generateCDC', () => {
    it('genera CDC de 44 caracteres', () => {
      const cdc = generateCDC(validCDC);
      expect(cdc.length).toBe(44);
    });

    it('genera el CDC correcto', () => {
      expect(generateCDC(validCDC)).toBe(validCDCString);
    });

    it('hace padding de ceros a la izquierda en campos cortos', () => {
      const cdc = generateCDC({
        tipoDocumento: 1,
        rucEmisor: '123',
        dvEmisor: 4,
        establecimiento: '5',
        puntoExpedicion: '1',
        numeroDocumento: '42',
        tipoContribuyente: 2,
        fechaEmision: new Date(2025, 0, 1),
        tipoEmision: 1,
        codigoSeguridad: 123456789
      });
      expect(cdc.slice(0, 2)).toBe('01');
      expect(cdc.slice(2, 10)).toBe('00000123');
      expect(cdc.slice(10, 11)).toBe('4');
      expect(cdc.slice(11, 14)).toBe('005');
      expect(cdc.slice(14, 17)).toBe('001');
      expect(cdc.slice(17, 24)).toBe('0000042');
      expect(cdc.length).toBe(44);
    });

    it('genera codigoSeguridad automaticamente si no se provee', () => {
      const { codigoSeguridad: _, ...withoutCodSeg } = validCDC;
      const cdc = generateCDC(withoutCodSeg);
      expect(cdc.length).toBe(44);
      const codSeg = Number(cdc.slice(34, 43));
      expect(codSeg).toBeGreaterThanOrEqual(100_000_000);
      expect(codSeg).toBeLessThanOrEqual(999_999_999);
      expect(codSeg).not.toEqual(validCDC.codigoSeguridad);
    });

    it('calcula correctamente el DV', () => {
      const cdc = generateCDC({
        tipoDocumento: 1,
        rucEmisor: '80059441',
        dvEmisor: 0,
        establecimiento: '001',
        puntoExpedicion: '001',
        numeroDocumento: '0000006',
        tipoContribuyente: 2,
        fechaEmision: new Date(2026, 3, 23),
        tipoEmision: 1,
        codigoSeguridad: 123456789
      });
      expect(cdc.length).toBe(44);
      expect(cdc.slice(-1)).toMatch(/^\d$/);
    });
  });

  describe('generateCodigoSeguridad', () => {
    it('genera un entero de 9 digitos en el rango 100_000_000 a 999_999_999', () => {
      for (let i = 0; i < 100; i++) {
        const codigo = generateCodigoSeguridad();
        expect(Number.isInteger(codigo)).toBe(true);
        expect(codigo).toBeGreaterThanOrEqual(100_000_000);
        expect(codigo).toBeLessThanOrEqual(999_999_999);
        expect(String(codigo).length).toBe(9);
      }
    });

    it('genera valores distintos en llamadas consecutivas', () => {
      const results = new Set<number>();
      for (let i = 0; i < 100; i++) {
        results.add(generateCodigoSeguridad());
      }
      expect(results.size).toBeGreaterThan(1);
    });
  });

  describe('parseCDC', () => {
    it('decodifica el CDC correctamente', () => {
      const fields = parseCDC(validCDCString);
      expect(fields.tipoDocumento).toBe(1);
      expect(fields.rucEmisor).toBe('80016096');
      expect(fields.dvEmisor).toBe(7);
      expect(fields.establecimiento).toBe('037');
      expect(fields.puntoExpedicion).toBe('005');
      expect(fields.numeroDocumento).toBe('0636619');
      expect(fields.tipoContribuyente).toBe(2);
      expect(fields.tipoEmision).toBe(1);
      expect(fields.codigoSeguridad).toBe(501598448);
    });

    it('extrae fechaEmision correctamente', () => {
      const fields = parseCDC(validCDCString);
      expect(fields.fechaEmision).toBeInstanceOf(Date);
      expect(fields.fechaEmision.getFullYear()).toBe(2026);
      expect(fields.fechaEmision.getMonth()).toBe(4);
      expect(fields.fechaEmision.getDate()).toBe(7);
    });

    it('rechaza CDC de longitud incorrecta', () => {
      expect(() => parseCDC('123')).toThrow('44 caracteres');
    });

    it('roundtrip: parse + generate devuelve el CDC original', () => {
      expect(generateCDC(parseCDC(validCDCString))).toBe(validCDCString);
    });

    it('roundtrip con padding: genera CDC luego parseable', () => {
      const cdc = generateCDC({
        tipoDocumento: 5,
        rucEmisor: '80059441',
        dvEmisor: 0,
        establecimiento: '001',
        puntoExpedicion: '001',
        numeroDocumento: '0000006',
        tipoContribuyente: 2,
        fechaEmision: new Date(2026, 3, 23),
        tipoEmision: 1,
        codigoSeguridad: 987654321
      });
      const parsed = parseCDC(cdc);
      expect(parsed.tipoDocumento).toBe(5);
      expect(parsed.codigoSeguridad).toBe(987654321);
      expect(generateCDC(parsed)).toBe(cdc);
    });
  });
});
