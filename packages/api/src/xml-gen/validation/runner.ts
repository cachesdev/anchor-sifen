import type { ItemValidationRule, ValidationError, ValidationRule } from './types';

function buildRuleFailure(id: string, reason: string): ValidationError {
  return {
    id,
    message: reason
  };
}

export function validate<T>(doc: T, rules: ReadonlyArray<ValidationRule<T>>): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const rule of rules) {
    let shouldRun = false;
    try {
      shouldRun = rule.when(doc);
    } catch (error) {
      errors.push(
        buildRuleFailure(
          rule.id,
          `Error evaluando condición de regla ${rule.id}: ${(error as Error).message}`
        )
      );
      continue;
    }

    if (!shouldRun) {
      continue;
    }

    let isValid = false;
    try {
      isValid = rule.check(doc);
    } catch (error) {
      errors.push(
        buildRuleFailure(rule.id, `Error evaluando regla ${rule.id}: ${(error as Error).message}`)
      );
      continue;
    }

    if (isValid) {
      continue;
    }

    errors.push({
      id: rule.id,
      message: rule.message(doc)
    });
  }

  return errors;
}

export function validateItems<TDoc, TItem>(
  doc: TDoc,
  items: ReadonlyArray<TItem>,
  rules: ReadonlyArray<ItemValidationRule<TDoc, TItem>>
): ValidationError[] {
  const errors: ValidationError[] = [];

  for (let index = 0; index < items.length; index++) {
    const item = items[index]!;

    for (const rule of rules) {
      let shouldRun = false;
      try {
        shouldRun = rule.when(item, index, doc);
      } catch (error) {
        errors.push(
          buildRuleFailure(
            rule.id,
            `Error evaluando condición de regla ${rule.id} para item ${index + 1}: ${(error as Error).message}`
          )
        );
        continue;
      }

      if (!shouldRun) {
        continue;
      }

      let isValid = false;
      try {
        isValid = rule.check(item, index, doc);
      } catch (error) {
        errors.push(
          buildRuleFailure(
            rule.id,
            `Error evaluando regla ${rule.id} para item ${index + 1}: ${(error as Error).message}`
          )
        );
        continue;
      }

      if (isValid) {
        continue;
      }

      errors.push({
        id: rule.id,
        message: rule.message(item, index, doc)
      });
    }
  }

  return errors;
}
