import { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { apiClient, getCsrfToken, fetchCsrfToken, clearAuthData } from './client';
import { ApiResponse } from './types';
import { API_CONFIG } from './config';

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(config.method?.toUpperCase() || '')) {
      let csrfToken = await getCsrfToken();

      if (!csrfToken && config.url !== API_CONFIG.ENDPOINTS.AUTH.CSRF_TOKEN) {
        try {
          csrfToken = await fetchCsrfToken();
        } catch (error) {
          console.error('Failed to fetch CSRF token:', error);
        }
      }

      if (csrfToken && config.headers) {
        config.headers[API_CONFIG.CSRF.HEADER_NAME] = csrfToken;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<unknown>>) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 403 && !originalRequest._retry) {
      const errorData = error.response.data as { detail?: string };
      if (errorData?.detail?.toLowerCase().includes('csrf')) {
        originalRequest._retry = true;
        try {
          const newToken = await fetchCsrfToken();
          if (originalRequest.headers) {
            originalRequest.headers[API_CONFIG.CSRF.HEADER_NAME] = newToken;
          }
          return apiClient(originalRequest);
        } catch (csrfError) {
          return Promise.reject(csrfError);
        }
      }
    }

    if (error.response?.status === 401) {
      console.error('Unauthorized - session expired or invalid');
      await clearAuthData();
    }

    if (error.response) {
      const { status, data } = error.response;
      console.error(`API Error [${status}]:`, data);
    } else if (error.request) {
      console.error('Network error:', error.message);
    } else {
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
