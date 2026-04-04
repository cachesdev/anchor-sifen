export type Result<TValue, TError> =
  | {
      success: true;
      value: TValue;
      error?: never;
    }
  | {
      success: false;
      value?: never;
      error: TError;
    };

export function Ok<TValue>(value: TValue): Result<TValue, never> {
  return {
    success: true,
    value
  };
}

export function Err<TError>(error: TError): Result<never, TError> {
  return {
    success: false,
    error
  };
}
