import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import httpService from '../httpService';

interface RetryableRequest extends InternalAxiosRequestConfig {
  _isRetry?: boolean;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
  path?: string;
  timestamp?: string;
}

export const responseInterceptor = (response: AxiosResponse) => response;

export const responseErrorInterceptor = async (error: AxiosError<ApiErrorResponse>) => {
  const original = error.config as RetryableRequest | undefined;

  if (error.response?.status === 401 && original && !original._isRetry) {
    original._isRetry = true;
    try {
      await httpService.post('/auth/refresh');
      return httpService(original);
    } catch (refreshError) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};

export const createErrorResponse = (error: unknown): ApiErrorResponse => {
  if ((error as AxiosError<ApiErrorResponse>)?.response?.data) {
    return (error as AxiosError<ApiErrorResponse>).response!.data;
  }
  return {
    statusCode: 500,
    message: error instanceof Error ? error.message : 'Unknown error',
  };
};
