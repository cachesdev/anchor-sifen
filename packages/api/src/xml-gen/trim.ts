import { Big } from 'big.js';

export function trimStrings(value: unknown): void {
  if (value === null || value === undefined) return;

  if (value instanceof Big || value instanceof Date) return;

  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        trimStrings(value[i]);
      }
    } else {
      for (const [key, nestedValue] of Object.entries(value as Record<string, unknown>)) {
        if (typeof nestedValue === 'string') {
          (value as Record<string, unknown>)[key] = nestedValue.trim();
        } else {
          trimStrings(nestedValue);
        }
      }
    }
  }
}
