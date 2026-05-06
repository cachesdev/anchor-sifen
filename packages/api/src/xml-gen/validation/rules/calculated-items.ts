import type { DEC, ItemOperacion } from '../../../sifen/types';
import type { ItemValidationRule } from '../types';

export const calculatedItemRules: ItemValidationRule<DEC, ItemOperacion>[] = [
  {
    id: 'EXAMPLE_ITEM_RULE',
    description: 'Regla de item de ejemplo (deshabilitada por defecto).',
    tags: ['example', 'placeholder'],
    when: () => false,
    check: () => true,
    message: (_item, index) => `Regla de item de ejemplo fallo para el item ${index + 1}.`
  }
];
