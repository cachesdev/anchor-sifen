import Big from 'big.js';
import { faker } from '@faker-js/faker';

/** Toma un valor aleatorio de un objeto const estilo enum. */
export function pickEnum<T extends Record<string, number | string>>(obj: T): T[keyof T] {
  return faker.helpers.arrayElement(Object.values(obj)) as T[keyof T];
}

/** Toma un valor aleatorio de un objeto const (devuelve el valor completo). */
export function pickFrom<T extends Record<string, unknown>>(obj: T): T[keyof T] {
  return faker.helpers.arrayElement(Object.values(obj)) as T[keyof T];
}

/** Genera un arreglo de longitud aleatoria (1–3 elementos por defecto). */
export function many<T>(factory: (index: number) => T, count?: number): T[] {
  const n = count ?? faker.number.int({ min: 1, max: 3 });
  return Array.from({ length: n }, (_, i) => factory(i));
}

/** Un RUC con formato típico como "80001234-5". */
export function fakeRUC(): string {
  return `${faker.string.numeric({ length: { min: 6, max: 8 } })}-${faker.string.numeric(1)}`;
}

/** Crea un Big a partir de un número para campos monetarios de tipos clean. */
export function money(v: number): Big {
  return new Big(v);
}

/**
 * Retorna una copia superficial del objeto sin las claves especificadas.
 */
export function omit<T, K extends string>(obj: T, ...keys: K[]): Omit<T, K> {
  const cloned = { ...obj } as Record<string, unknown>;
  for (const k of keys) {
    delete cloned[k];
  }
  return cloned as Omit<T, K>;
}
