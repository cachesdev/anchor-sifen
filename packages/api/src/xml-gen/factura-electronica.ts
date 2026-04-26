import type { FacturaElectronicaInput } from '../sifen/types';
import { tipoDocumentoElectronico } from '../sifen/types/enums';
import { facturaElectronicaSchema } from './schema';
import { prepareDE, type PreparedDE } from './de-pipeline';
import type { Result } from '../result';
import type { XMLGenBuildError } from './errors';

export type { PreparedDE };

export function buildFacturaElectronica(
  input: FacturaElectronicaInput
): Result<PreparedDE, XMLGenBuildError> {
  return prepareDE(input, facturaElectronicaSchema, tipoDocumentoElectronico.FacturaElectronica);
}
