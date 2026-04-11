import type { FacturaElectronica } from '../../../sifen/types';
import type { ValidationRule } from '../types';

export const calculatedDocumentRules: ValidationRule<FacturaElectronica>[] = [
  {
    id: 'EXAMPLE_DOCUMENT_RULE',
    description: 'Example placeholder document rule (disabled by default).',
    tags: ['example', 'placeholder'],
    when: () => false,
    check: () => true,
    message: () => 'Example document rule failed.'
  }
];
