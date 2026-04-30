import type { AutofacturaElectronicaInput } from '../sifen/types';
import { autofacturaElectronicaSchema } from './schema';
import { prepareDE, type PreparedDE } from './de-pipeline';
import type { Result } from '../result';
import type { XMLGenBuildError } from './errors';

export function buildAutofacturaElectronica(
  input: AutofacturaElectronicaInput
): Result<PreparedDE, XMLGenBuildError> {
  return prepareDE(input, autofacturaElectronicaSchema, 'AutofacturaElectronica');
}
