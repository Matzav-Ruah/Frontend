import { apiClient, clearAuthData, setUser } from '../client';
import { LeaderboardSchema, LoginCredentials, RegisterCredentials, StreakSchema, UserSchema } from './users.types';
import { ApiResponse } from '../types';
import { API_CONFIG } from '../config';
import "../interceptors";

export const login = async (
  credentials: LoginCredentials
): Promise<ApiResponse<UserSchema>> => {
  const response = await apiClient.post<ApiResponse<UserSchema>>(
    API_CONFIG.ENDPOINTS.AUTH.LOGIN,
    credentials
  );

  if (response.data.success && response.data.data) await setUser(response.data.data);
  return response.data;
};

export const register = async (
  credentials: RegisterCredentials
): Promise<ApiResponse<UserSchema>> => {
  const response = await apiClient.post<ApiResponse<UserSchema>>(
    API_CONFIG.ENDPOINTS.AUTH.REGISTER,
    credentials
  );

  if (response.data.success && response.data.data) await setUser(response.data.data);
  return response.data;
};

export const logout = async (): Promise<ApiResponse<void>> => {
  const response = await apiClient.post<ApiResponse<void>>(
    API_CONFIG.ENDPOINTS.AUTH.LOGOUT
  );
  await clearAuthData();

  return response.data;
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

export const getLeaderboard = async (): Promise<ApiResponse<LeaderboardSchema>> => {
  const response = await apiClient.get<ApiResponse<LeaderboardSchema>>(
    API_CONFIG.ENDPOINTS.USERS.LEADERBOARD,
  );
  return response.data;
};

export const getCurrentStreak = async (): Promise<ApiResponse<StreakSchema>> => {
  const response = await apiClient.get<ApiResponse<StreakSchema>>(
    API_CONFIG.ENDPOINTS.USERS.STREAK
  );
  return response.data;
};


export const auth = {
  login,
  register,
  logout,
  getCurrentUser,
};

export default auth;
