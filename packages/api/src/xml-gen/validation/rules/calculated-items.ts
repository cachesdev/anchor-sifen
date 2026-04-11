import type { FacturaElectronica, ItemOperacion_FE } from '../../../sifen/types';
import type { ItemValidationRule } from '../types';

export const calculatedItemRules: ItemValidationRule<FacturaElectronica, ItemOperacion_FE>[] = [
  {
    id: 'EXAMPLE_ITEM_RULE',
    description: 'Example placeholder item rule (disabled by default).',
    tags: ['example', 'placeholder'],
    when: () => false,
    check: () => true,
    message: (_item, index) => `Example item rule failed for item ${index + 1}.`
  }
];
