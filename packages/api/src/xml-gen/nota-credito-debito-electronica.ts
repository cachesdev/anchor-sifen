import type { NotaCreditoElectronicaInput, NotaDebitoElectronicaInput } from '../sifen/types';
import type { Result } from '../result';
import {
  prepareDE,
  type PreparedNotaCreditoElectronica,
  type PreparedNotaDebitoElectronica
} from './de-pipeline';
import type { XMLGenBuildError } from './errors';
import {
  notaCreditoElectronicaSchema,
  notaDebitoElectronicaSchema
} from './schema/nota-credito-debito-electronica';

export function buildNotaCreditoElectronica(
  input: NotaCreditoElectronicaInput
): Result<PreparedNotaCreditoElectronica, XMLGenBuildError> {
  return prepareDE(input, notaCreditoElectronicaSchema, 'NotaCreditoElectronica');
}

export function buildNotaDebitoElectronica(
  input: NotaDebitoElectronicaInput
): Result<PreparedNotaDebitoElectronica, XMLGenBuildError> {
  return prepareDE(input, notaDebitoElectronicaSchema, 'NotaDebitoElectronica');
}
