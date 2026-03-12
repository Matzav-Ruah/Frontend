import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { auth } from '@/src/api/users/users.api';
import { UserSchema, LoginCredentials, RegisterCredentials } from '@/src/api/users/users.types';
import { getUser, removeUser, setUser } from '@/src/api/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface AuthContextType {
  user: UserSchema | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [user, setUserState] = useState<UserSchema | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await getUser();
        if (storedUser) setUserState(storedUser);
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const { data: userData, refetch } = useQuery({
    queryKey: ['user', 'current'],
    queryFn: async () => {
      const response = await auth.getCurrentUser();
      return response.data;
    },
    enabled: false,
  });

  useEffect(() => {
    if (userData) {
      setUserState(userData);
    }
  }, [userData]);

  const loginMutation = useMutation({
    mutationFn: auth.login,
    onSuccess: (response) => {
      if (response.data) {
        setUserState(response.data);
        setUser(response.data);
      }
      queryClient.invalidateQueries();
    },
  });

  const registerMutation = useMutation({
    mutationFn: auth.register,
    onSuccess: (response) => {
      if (response.data) {
        setUserState(response.data);
        setUser(response.data);
      }
      queryClient.invalidateQueries();
    },
  });

  const logoutMutation = useMutation({
    mutationFn: auth.logout,
    onSuccess: () => {
      setUserState(null);
      removeUser();
      queryClient.clear();
    },
  });

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      await loginMutation.mutateAsync(credentials);
    },
    [loginMutation]
  );

  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      await registerMutation.mutateAsync(credentials);
    },
    [registerMutation]
  );

  const logout = useCallback(async () => {
    await logoutMutation.mutateAsync();
  }, [logoutMutation]);

  const refreshUser = useCallback(async () => {
    const { data } = await refetch();
    if (data) {
      setUserState(data);
    }
  }, [refetch]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
