import { getItemsOperacion } from '../derive/accessors';
import type { DEC } from '../../sifen/types';
import { validate, validateItems } from './runner';
import { calculatedDocumentRules } from './rules/calculated-document';
import { calculatedItemRules } from './rules/calculated-items';
import type { ValidationError } from './types';

export function validateCalculated(doc: DEC): ValidationError[] {
  return [
    ...validate(doc, calculatedDocumentRules),
    ...validateItems(doc, getItemsOperacion(doc), calculatedItemRules)
  ];
}
