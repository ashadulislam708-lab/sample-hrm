import type { AxiosError } from 'axios';

import type { ApiErrorResponse } from '~/services/httpMethods';

export function getErrorMessage(error: unknown, fallback = 'Something went wrong'): string {
  if (!error) return fallback;

  const axiosErr = error as AxiosError<ApiErrorResponse>;
  const data = axiosErr?.response?.data;
  if (data && typeof data === 'object' && 'message' in data && typeof data.message === 'string') {
    return data.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return fallback;
}

export function getFieldErrors(error: unknown): Record<string, string[]> | null {
  const axiosErr = error as AxiosError<ApiErrorResponse>;
  const data = axiosErr?.response?.data;
  if (data && typeof data === 'object' && 'errors' in data && data.errors) {
    return data.errors;
  }
  return null;
}
