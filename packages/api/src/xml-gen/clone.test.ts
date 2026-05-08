import { describe, expect, it } from 'vitest';
import { clone } from './clone';
import { Big } from './big';

describe('clone', () => {
  it('clona primitivos', () => {
    expect(clone(42, 'input')).toBe(42);
    expect(clone('hello', 'input')).toBe('hello');
    expect(clone(true, 'input')).toBe(true);
    expect(clone(null, 'input')).toBeNull();
    expect(clone(undefined, 'input')).toBeUndefined();
  });

  it('clona Date', () => {
    const date = new Date('2024-01-15');
    const result = clone(date, 'input');
    expect(result).toBeInstanceOf(Date);
    expect(result.getTime()).toBe(date.getTime());
    expect(result).not.toBe(date);
  });

  it('clona Big', () => {
    const value = new Big(100);
    const cloned = clone(value, 'input');
    expect(cloned).not.toBe(value);
    expect(cloned.eq(100)).toBe(true);
  });

  it('clona arrays', () => {
    const input = [1, 'a', { x: 2 }];
    const result = clone(input, 'input');
    expect(result).toEqual(input);
    expect(result).not.toBe(input);
    expect(result[2]).not.toBe(input[2]);
  });

  it('clona objetos anidados', () => {
    const input = { a: { b: { c: 3 } }, d: [1, 2] };
    const result = clone(input, 'input');
    expect(result).toEqual(input);
    expect(result).not.toBe(input);
    expect(result.a).not.toBe(input.a);
    expect(result.a.b).not.toBe(input.a.b);
    expect(result.d).not.toBe(input.d);
  });

  it('no lanza excepcion con propiedades que son funciones', () => {
    const input = {
      value: 42,
      handler() {
        return this.value;
      },
    };
    const result = clone(input, 'input');
    expect(result.value).toBe(42);
    expect(typeof result.handler).toBe('function');
    expect(result.handler()).toBe(42);
  });

  it('maneja objetos con propiedad constructor', () => {
    const input = {
      constructor: function miConstructor() {},
      name: 'test',
    };
    const result = clone(input, 'input');
    expect(result.name).toBe('test');
    expect(typeof result.constructor).toBe('function');
  });

  it('maneja funciones en arrays', () => {
    const input = [1, () => 42, { fn: () => 'hello' }];
    const result = clone(input, 'input');
    expect(result[0]).toBe(1);
    expect(typeof result[1]).toBe('function');
    expect(result[1]()).toBe(42);
    expect(typeof result[2].fn).toBe('function');
    expect(result[2].fn()).toBe('hello');
  });

  it('no muta el original al clonar', () => {
    const input = { x: { y: 10 } };
    const result = clone(input, 'input');
    result.x.y = 20;
    expect(input.x.y).toBe(10);
  });
});
