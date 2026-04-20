import axios, { type AxiosInstance } from 'axios';

import { requestInterceptor } from './httpMethods/requestInterceptor';
import { responseInterceptor, responseErrorInterceptor } from './httpMethods/responseInterceptor';

const baseURL = import.meta.env.VITE_API_URL ?? '/api';

export const httpService: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

httpService.interceptors.request.use(requestInterceptor);
httpService.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default httpService;
