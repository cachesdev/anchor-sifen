import type { DEC, ItemOperacion } from '../../../sifen/types';
import type { ItemValidationRule } from '../types';

export const calculatedItemRules: ItemValidationRule<DEC, ItemOperacion>[] = [
  {
    id: 'EXAMPLE_ITEM_RULE',
    description: 'Example placeholder item rule (disabled by default).',
    tags: ['example', 'placeholder'],
    when: () => false,
    check: () => true,
    message: (_item, index) => `Example item rule failed for item ${index + 1}.`
  }
];
