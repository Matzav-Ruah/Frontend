import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { ApiResponse, ApiError, UserSchema, LoginCredentials, RegisterCredentials } from '@/api/types';
import { auth } from '@/api/auth';

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
