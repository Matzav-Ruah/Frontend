import { apiClient } from './client';
import {
  ApiResponse,
  LoginCredentials,
  RegisterCredentials,
  UserSchema,
} from './types';
import { API_CONFIG } from './config';
import {
  setUser,
  removeUser,
  getCsrfToken,
  removeCsrfToken,
} from './client';

export const login = async (
  credentials: LoginCredentials
): Promise<ApiResponse<UserSchema>> => {
  const csrfToken = await getCsrfToken();
  if (!csrfToken) {
    await apiClient.get(API_CONFIG.ENDPOINTS.AUTH.CSRF_TOKEN);
  }

  const response = await apiClient.post<ApiResponse<UserSchema>>(
    API_CONFIG.ENDPOINTS.AUTH.LOGIN,
    credentials
  );

  if (response.data.success && response.data.data) {
    await setUser(response.data.data);
  }

  return response.data;
};

export const register = async (
  credentials: RegisterCredentials
): Promise<ApiResponse<UserSchema>> => {
  const csrfToken = await getCsrfToken();
  if (!csrfToken) {
    await apiClient.get(API_CONFIG.ENDPOINTS.AUTH.CSRF_TOKEN);
  }

  const response = await apiClient.post<ApiResponse<UserSchema>>(
    API_CONFIG.ENDPOINTS.AUTH.REGISTER,
    credentials
  );

  if (response.data.success && response.data.data) {
    await setUser(response.data.data);
  }

  return response.data;
};

export const logout = async (): Promise<ApiResponse<void>> => {
  try {
    const response = await apiClient.post<ApiResponse<void>>(
      API_CONFIG.ENDPOINTS.AUTH.LOGOUT
    );

    await removeUser();
    await removeCsrfToken();

    return response.data;
  } catch (error) {
    await removeUser();
    await removeCsrfToken();
    throw error;
  }
};

export const getCurrentUser = async (): Promise<ApiResponse<UserSchema>> => {
  const response = await apiClient.get<ApiResponse<UserSchema>>(
    API_CONFIG.ENDPOINTS.AUTH.CURRENT_USER
  );
  if (response.data.success && response.data.data) {
    await setUser(response.data.data);
  }

  return response.data;
};

export const auth = {
  login,
  register,
  logout,
  getCurrentUser,
};

export default auth;
