import { AxiosError, AxiosResponse } from 'axios';
import { apiClient } from './client';
import { ApiResponse, ApiError, ApiRequestOptions, HttpMethod } from './types';

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    const response = error.response;
    return {
      message: response?.data?.message || response?.data?.detail || error.message || 'Unknown error occurred',
      code: response?.data?.code || error.code,
      status: response?.status,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: 'Unknown error occurred',
  };
};

export const isNetworkError = (error: unknown): boolean => {
  return error instanceof AxiosError && !error.response;
};

export const isUnauthorizedError = (error: unknown): boolean => {
  return error instanceof AxiosError && error.response?.status === 401;
};

export const isCsrfError = (error: unknown): boolean => {
  if (!(error instanceof AxiosError) || error.response?.status !== 403) {
    return false;
  }
  const data = error.response.data as { detail?: string };
  return data?.detail?.toLowerCase().includes('csrf') || false;
};

export const apiRequest = async <T = unknown>(
  method: HttpMethod,
  url: string,
  data?: unknown,
  options?: ApiRequestOptions
): Promise<ApiResponse<T>> => {
  const config = {
    method,
    url,
    data,
    params: options?.params,
    headers: options?.headers,
    timeout: options?.timeout,
  };

  const response: AxiosResponse<ApiResponse<T>> = await apiClient.request(config);
  return response.data;
};

export const api = {
  get: <T = unknown>(url: string, options?: ApiRequestOptions): Promise<ApiResponse<T>> => {
    return apiRequest<T>('GET', url, undefined, options);
  },

  post: <T = unknown>(url: string, data?: unknown, options?: ApiRequestOptions): Promise<ApiResponse<T>> => {
    return apiRequest<T>('POST', url, data, options);
  },

  put: <T = unknown>(url: string, data?: unknown, options?: ApiRequestOptions): Promise<ApiResponse<T>> => {
    return apiRequest<T>('PUT', url, data, options);
  },

  patch: <T = unknown>(url: string, data?: unknown, options?: ApiRequestOptions): Promise<ApiResponse<T>> => {
    return apiRequest<T>('PATCH', url, data, options);
  },

  delete: <T = unknown>(url: string, options?: ApiRequestOptions): Promise<ApiResponse<T>> => {
    return apiRequest<T>('DELETE', url, undefined, options);
  },
};

export const isSuccess = (response: ApiResponse<unknown>): boolean => {
  return response.success === true;
};

export const createQueryFn =
  <T>(url: string, options?: ApiRequestOptions) =>
    async (): Promise<T> => {
      const response = await api.get<T>(url, options);
      return response.data;
    };

export const createMutationFn =
  <T, D = unknown>(url: string, method: HttpMethod = 'POST') =>
    async (data: D): Promise<T> => {
      const response = await apiRequest<T>(method, url, data);
      return response.data;
    };

export default {
  api,
  apiRequest,
  handleApiError,
  isNetworkError,
  isUnauthorizedError,
  isCsrfError,
  isSuccess,
  createQueryFn,
  createMutationFn,
};
