import type { LiteralUnion, Primitive } from 'type-fest';

/** Castea value al tipo de datos literal de LiteralUnion. maneja opcionales. */
export function asLiteral<T, U extends Primitive>(value: LiteralUnion<T, U>): T;
export function asLiteral<T, U extends Primitive>(value?: LiteralUnion<T, U>): undefined;
export function asLiteral<T, U extends Primitive>(value?: LiteralUnion<T, U>): T | undefined {
  if (value !== undefined) return value as T;
  return undefined;
}
