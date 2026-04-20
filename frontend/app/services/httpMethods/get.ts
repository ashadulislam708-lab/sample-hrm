import type { AxiosRequestConfig } from 'axios';

import httpService from '../httpService';

export const get = async <T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await httpService.get<{ data: T }>(url, config);
  return response.data.data as T;
};
