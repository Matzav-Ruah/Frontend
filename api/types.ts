export interface CsrfTokenResponse {
  csrftoken: string;
}

export interface SignInSchema {
  email: string;
  password: string;
}

export interface UserSchema {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  settings: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface ApiResponse<T = unknown> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface RequestConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: unknown;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiRequestOptions {
  params?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  timeout?: number;
}

export interface LoginCredentials extends SignInSchema { }

export interface RegisterCredentials extends SignInSchema { }
