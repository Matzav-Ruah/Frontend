import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiResponse } from './types';
import { CsrfTokenResponse, UserSchema } from './users/users.types'
import { API_CONFIG } from './config';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

export const getCsrfToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(API_CONFIG.STORAGE_KEYS.CSRF_TOKEN);
    return token ? token : await fetchCsrfToken();
  } catch (error) {
    console.error('Error getting CSRF token:', error);
    return null;
  }
};

export const setCsrfToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(API_CONFIG.STORAGE_KEYS.CSRF_TOKEN, token);
  } catch (error) {
    console.error('Error saving CSRF token:', error);
  }
};

export const removeCsrfToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(API_CONFIG.STORAGE_KEYS.CSRF_TOKEN);
  } catch (error) {
    console.error('Error removing CSRF token:', error);
  }
};

export const getUser = async (): Promise<UserSchema | null> => {
  try {
    const userJson = await AsyncStorage.getItem(API_CONFIG.STORAGE_KEYS.USER);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const setUser = async (user: UserSchema): Promise<void> => {
  try {
    await AsyncStorage.setItem(API_CONFIG.STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

export const removeUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(API_CONFIG.STORAGE_KEYS.USER);
  } catch (error) {
    console.error('Error removing user:', error);
  }
};

export const clearAuthData = async (): Promise<void> => {
  await removeCsrfToken();
  await removeUser();
};

export const fetchCsrfToken = async (): Promise<string> => {
  const response = await apiClient.get<CsrfTokenResponse>(
    API_CONFIG.ENDPOINTS.AUTH.CSRF_TOKEN
  );
  const token = response.data.csrftoken;
  await setCsrfToken(token);
  return token;
};

export const request = async <T = unknown>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<ApiResponse<T>>> => {
  return apiClient.request<ApiResponse<T>>(config);
};

export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getUser();
  return !!user;
};
