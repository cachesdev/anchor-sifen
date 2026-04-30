import { describe, expect, it } from 'vitest';
import { validate, validateItems } from './runner';
import type { ItemValidationRule, ValidationRule } from './types';

function makeRule(
  overrides: Partial<ValidationRule<{ value: number }>> = {}
): ValidationRule<{ value: number }> {
  return {
    id: 'TEST_RULE',
    description: 'regla de prueba',
    tags: ['test'],
    when: () => true,
    check: () => true,
    message: () => 'fallo',
    ...overrides
  };
}

function makeItemRule(
  overrides: Partial<ItemValidationRule<unknown, { price: number }>> = {}
): ItemValidationRule<unknown, { price: number }> {
  return {
    id: 'TEST_ITEM_RULE',
    description: 'regla de item de prueba',
    tags: ['test'],
    when: () => true,
    check: () => true,
    message: () => 'fallo en item',
    ...overrides
  };
}

describe('runner de validacion', () => {
  describe('validate (reglas de documento)', () => {
    it('retorna array vacio cuando todas las reglas pasan', () => {
      const doc = { value: 42 };
      const rules = [
        makeRule({ id: 'R1', check: (d) => d.value > 0 }),
        makeRule({ id: 'R2', check: (d) => d.value < 100 })
      ];
      expect(validate(doc, rules)).toEqual([]);
    });

    it('retorna errores cuando una regla falla', () => {
      const doc = { value: 200 };
      const rules = [
        makeRule({
          id: 'MAX',
          check: (d) => d.value < 100,
          message: (d) => `valor ${d.value} excede 100`
        })
      ];
      const result = validate(doc, rules);
      expect(result).toHaveLength(1);
      expect(result[0]!.id).toBe('MAX');
      expect(result[0]!.message).toBe('valor 200 excede 100');
    });

    it('omite la regla cuando when() retorna false', () => {
      const doc = { value: 50 };
      const rules = [
        makeRule({
          id: 'SKIP',
          when: () => false,
          check: () => {
            throw new Error('no deberia correr');
          }
        })
      ];
      expect(validate(doc, rules)).toEqual([]);
    });

    it('acumula errores de multiples reglas fallidas', () => {
      const doc = { value: 200 };
      const rules = [
        makeRule({ id: 'R1', check: () => false, message: () => 'error 1' }),
        makeRule({ id: 'R2', check: () => false, message: () => 'error 2' })
      ];
      const result = validate(doc, rules);
      expect(result).toHaveLength(2);
      expect(result.map((e) => e.id)).toEqual(['R1', 'R2']);
    });

    it('captura errores lanzados en when() y los convierte en errores de validacion', () => {
      const doc = { value: 1 };
      const rules = [
        makeRule({
          id: 'BROKEN_WHEN',
          when: () => {
            throw new Error('exploto when');
          },
          check: () => true
        })
      ];
      const result = validate(doc, rules);
      expect(result).toHaveLength(1);
      expect(result[0]!.id).toBe('BROKEN_WHEN');
      expect(result[0]!.message).toContain('Error evaluando condición');
      expect(result[0]!.message).toContain('exploto when');
    });

    it('captura errores lanzados en check() y los convierte en errores de validacion', () => {
      const doc = { value: 1 };
      const rules = [
        makeRule({
          id: 'BROKEN_CHECK',
          check: () => {
            throw new Error('exploto check');
          }
        })
      ];
      const result = validate(doc, rules);
      expect(result).toHaveLength(1);
      expect(result[0]!.id).toBe('BROKEN_CHECK');
      expect(result[0]!.message).toContain('Error evaluando regla');
      expect(result[0]!.message).toContain('exploto check');
    });
  });

  describe('validateItems (reglas por item)', () => {
    it('aplica reglas a cada item usando el indice correcto', () => {
      const items = [{ price: 10 }, { price: 20 }, { price: 30 }];
      const rules = [
        makeItemRule({
          id: 'PRICE_CHECK',
          check: (item) => item.price > 5
        })
      ];
      expect(validateItems(null, items, rules)).toEqual([]);
    });

    it('reporta el item fallido con su indice', () => {
      const items = [{ price: 10 }, { price: 0 }, { price: 30 }];
      const rules = [
        makeItemRule({
          id: 'PRICE_MIN',
          check: (item) => item.price > 5,
          message: (item, index) => `item ${index + 1} con precio ${item.price}`
        })
      ];
      const result = validateItems(null, items, rules);
      expect(result).toHaveLength(1);
      expect(result[0]!.message).toContain('item 2');
    });

    it('omite items donde when() retorna false', () => {
      const items = [{ price: 10 }, { price: 0 }];
      const rules = [
        makeItemRule({
          id: 'ONLY_ZEROS',
          when: (item) => item.price === 0,
          check: (item) => item.price >= 0,
          message: (item) => `precio invalido: ${item.price}`
        })
      ];
      expect(validateItems(null, items, rules)).toEqual([]);
    });

    it('captura errores en when() de item', () => {
      const items = [{ price: 10 }];
      const rules = [
        makeItemRule({
          id: 'ITEM_WHEN_BROKEN',
          when: () => {
            throw new Error('when roto');
          },
          check: () => true
        })
      ];
      const result = validateItems(null, items, rules);
      expect(result).toHaveLength(1);
      expect(result[0]!.message).toContain('item 1');
      expect(result[0]!.message).toContain('when roto');
    });

    it('captura errores en check() de item', () => {
      const items = [{ price: 10 }];
      const rules = [
        makeItemRule({
          id: 'ITEM_CHECK_BROKEN',
          check: () => {
            throw new Error('check roto');
          }
        })
      ];
      const result = validateItems(null, items, rules);
      expect(result).toHaveLength(1);
      expect(result[0]!.message).toContain('item 1');
      expect(result[0]!.message).toContain('check roto');
    });

    it('acumula errores de multiples reglas sobre multiples items', () => {
      const items = [{ price: 0 }, { price: 0 }];
      const rules = [
        makeItemRule({ id: 'R1', check: (i) => i.price > 5, message: () => 'fallo R1' }),
        makeItemRule({ id: 'R2', check: (i) => i.price > 10, message: () => 'fallo R2' })
      ];
      const result = validateItems(null, items, rules);
      expect(result).toHaveLength(4);
    });
  });
});
