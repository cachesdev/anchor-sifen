import { Big } from 'big.js';
import { describe, expect, it } from 'vitest';
import { trimStrings } from './trim';

describe('xml-gen — trimStrings', () => {
  it('recorta espacios al inicio y final de strings', () => {
    const obj = { nombre: '  HOLA  ', correo: 'hola@correo.com  ' };
    trimStrings(obj);
    expect(obj.nombre).toBe('HOLA');
    expect(obj.correo).toBe('hola@correo.com');
  });

  it('no modifica instancias de Big', () => {
    const big = new Big(100);
    const obj = { valor: big };
    trimStrings(obj);
    expect(obj.valor).toBe(big);
    expect(obj.valor instanceof Big).toBe(true);
    expect(obj.valor.toFixed(2)).toBe('100.00');
  });

  it('no modifica instancias de Date', () => {
    const date = new Date(2024, 0, 15);
    const obj = { fecha: date };
    trimStrings(obj);
    expect(obj.fecha).toBe(date);
    expect(obj.fecha.getFullYear()).toBe(2024);
  });

  it('no modifica numeros ni booleanos', () => {
    const obj = { edad: 25, activo: true };
    trimStrings(obj);
    expect(obj.edad).toBe(25);
    expect(obj.activo).toBe(true);
  });

  it('maneja null y undefined sin error', () => {
    const obj = { a: null, b: undefined };
    trimStrings(obj);
    expect(obj.a).toBeNull();
    expect(obj.b).toBeUndefined();
  });

  it('recorta strings en objetos anidados', () => {
    const obj = {
      emisor: { nombre: '  UNIVERSIDAD  ', correo: 'correo@test.com  ' },
      receptor: { nombre: '  CLIENTE  ' }
    };
    trimStrings(obj);
    expect(obj.emisor.nombre).toBe('UNIVERSIDAD');
    expect(obj.emisor.correo).toBe('correo@test.com');
    expect(obj.receptor.nombre).toBe('CLIENTE');
  });

  it('recorta strings dentro de arrays', () => {
    const obj = {
      items: [{ descripcion: '  Item 1  ' }, { descripcion: '  Item 2  ' }]
    };
    trimStrings(obj);
    expect(obj.items[0]!.descripcion).toBe('Item 1');
    expect(obj.items[1]!.descripcion).toBe('Item 2');
  });
});
