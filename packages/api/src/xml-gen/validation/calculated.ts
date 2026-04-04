import type { FacturaElectronica } from '../../sifen/types';
import { getItems } from './accessors';
import { validate, validateItems } from './runner';
import { calculatedDocumentRules } from './rules/calculated-document';
import { calculatedItemRules } from './rules/calculated-items';
import type { ValidationError } from './types';

export function validateCalculated(doc: FacturaElectronica): ValidationError[] {
  return [
    ...validate(doc, calculatedDocumentRules),
    ...validateItems(doc, getItems(doc), calculatedItemRules)
  ];
}
