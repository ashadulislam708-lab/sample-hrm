import type { AxiosRequestConfig } from 'axios';

import httpService from '../httpService';

export const post = async <T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await httpService.post<{ data: T }>(url, data, config);
  return response.data.data as T;
};
