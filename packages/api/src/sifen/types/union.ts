import type { LiteralUnion, Primitive } from 'type-fest';

/** Castea value al tipo de datos literal de LiteralUnion. */
export function asLiteral<T extends number, U extends Primitive>(value: LiteralUnion<T, U>): T {
  return value as T;
}
