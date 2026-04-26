import { ErrorFactory } from '@praha/error-factory';
import type { ValidationError as RuleValidationError } from './validation/types';

export class XMLGenInputValidationError extends ErrorFactory({
  name: 'XMLGenInputValidationError',
  message: (f) => `Error durante validacion de entrada XML Gen: ${f.details}.`,
  fields: ErrorFactory.fields<{ details: string }>()
}) {}

export class XMLGenCalculationError extends ErrorFactory({
  name: 'XMLGenCalculationError',
  message: (f) => `Error durante calculo de campos XML Gen: ${f.details ?? 'sin detalle'}.`,
  fields: ErrorFactory.fields<{ details?: string }>()
}) {}

export class XMLGenBusinessValidationError extends ErrorFactory({
  name: 'XMLGenBusinessValidationError',
  message: (f) =>
    `Error durante validacion de reglas XML Gen: ${f.issues.length} issue(s) de negocio.`,
  fields: ErrorFactory.fields<{ issues: RuleValidationError[] }>()
}) {}

export class XMLGenMappingError extends ErrorFactory({
  name: 'XMLGenMappingError',
  message: (f) => `Error durante mapeo de DE XML Gen: ${f.details ?? 'sin detalle'}.`,
  fields: ErrorFactory.fields<{ details?: string }>()
}) {}

export type XMLGenBuildError =
  | XMLGenInputValidationError
  | XMLGenCalculationError
  | XMLGenBusinessValidationError
  | XMLGenMappingError;

export function serializeError(error: unknown): object {
  if (!(error instanceof Error)) {
    return { raw: String(error) };
  }

  const errorWithDetails = error as Error & { details?: unknown; issues?: unknown };

  return {
    name: error.name,
    message: error.message,
    ...(errorWithDetails.details !== undefined && { details: errorWithDetails.details }),
    ...(errorWithDetails.issues !== undefined && { issues: errorWithDetails.issues }),
    ...(error.cause !== undefined && { cause: serializeError(error.cause) })
  };
}
