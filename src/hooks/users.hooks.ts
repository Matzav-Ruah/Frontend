import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { ApiResponse, ApiError } from '@/src/api/types';
import { UserSchema, LoginCredentials, RegisterCredentials, LeaderboardSchema, StreakSchema } from '@/src/api/users/users.types';
import { auth, getCurrentStreak, getLeaderboard } from '@/src/api/users/users.api';

export const useCurrentUser = (
    options?: Omit<UseQueryOptions<ApiResponse<UserSchema>, ApiError, ApiResponse<UserSchema>>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ApiResponse<UserSchema>, ApiError>({
        queryKey: ['user', 'current'],
        queryFn: async () => auth.getCurrentUser(),
        ...options,
    });
};

export const useLogin = (
    options?: Omit<UseMutationOptions<ApiResponse<UserSchema>, ApiError, LoginCredentials>, 'mutationFn'>
) => {
    return useMutation<ApiResponse<UserSchema>, ApiError, LoginCredentials>({
        mutationFn: async (credentials) => auth.login(credentials),
        ...options,
    });
};

export const useRegister = (
    options?: Omit<UseMutationOptions<ApiResponse<UserSchema>, ApiError, RegisterCredentials>, 'mutationFn'>
) => {
    return useMutation<ApiResponse<UserSchema>, ApiError, RegisterCredentials>({
        mutationFn: async (credentials) => auth.register(credentials),
        ...options,
    });
};

export const useLogout = (
    options?: Omit<UseMutationOptions<ApiResponse<void>, ApiError, void>, 'mutationFn'>
) => {
    return useMutation<ApiResponse<void>, ApiError, void>({
        mutationFn: async () => auth.logout(),
        ...options,
    });
};


export const useLeaderboard = (
    options?: Omit<UseQueryOptions<ApiResponse<LeaderboardSchema>, ApiError, ApiResponse<LeaderboardSchema>>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ApiResponse<LeaderboardSchema>, ApiError>({
        queryKey: ['user', 'leaderboard'],
        queryFn: async () => getLeaderboard(),
        staleTime: 1000 * 60 * 15,
        gcTime: 1000 * 60 * 30,
        ...options,
    });
};


export const useCurrentStreak = (
    options?: Omit<UseQueryOptions<ApiResponse<StreakSchema>, ApiError, ApiResponse<StreakSchema>>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ApiResponse<StreakSchema>, ApiError>({
        queryKey: ['user', 'streak'],
        queryFn: async () => getCurrentStreak(),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
};
