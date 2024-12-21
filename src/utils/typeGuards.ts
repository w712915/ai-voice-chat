import { APIError } from '../types/errors';

export function isOpenAIError(error: unknown): error is APIError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof (error as APIError).status === 'number'
  );
}