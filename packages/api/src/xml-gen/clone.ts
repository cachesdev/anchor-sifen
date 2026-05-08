import { Big } from './big';

export function clone<T>(value: T, path: string): T {
  if (value instanceof Date) {
    return new Date(value.getTime()) as unknown as T;
  }

  if (value instanceof Big) {
    return new Big(value) as unknown as T;
  }

  if (Array.isArray(value)) {
    return value.map((item, index) => clone(item, `${path}[${index}]`)) as unknown as T;
  }

  if (typeof value === 'function') {
    return value;
  }

  if (value && typeof value === 'object') {
    const clonedObject: Record<string, unknown> = {};

    for (const [key, nestedValue] of Object.entries(value as Record<string, unknown>)) {
      clonedObject[key] = clone(nestedValue, `${path}.${key}`);
    }

    return clonedObject as unknown as T;
  }

  return value;
}
