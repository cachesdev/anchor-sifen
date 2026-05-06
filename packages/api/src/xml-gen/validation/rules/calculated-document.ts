import type { DEC } from '../../../sifen/types';
import type { ValidationRule } from '../types';

export const calculatedDocumentRules: ValidationRule<DEC>[] = [
  {
    id: 'EXAMPLE_DOCUMENT_RULE',
    description: 'Regla de documento de ejemplo (deshabilitada por defecto).',
    tags: ['example', 'placeholder'],
    when: () => false,
    check: () => true,
    message: () => 'Regla de documento de ejemplo fallo.'
  }
];
