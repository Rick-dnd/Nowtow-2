import { useQuery, useMutation, useQueryClient, type UseQueryResult, type UseMutationResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import { authService, type SignUpData, type SignInData, type AuthResponse } from '@/services/auth.service';
import type { User, Session } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];
type Profile = Database['public']['Tables']['profiles']['Row'];

// Helper function to get initial user from localStorage (Supabase session)
function getInitialUserFromStorage(): User | null {
  if (typeof window === 'undefined') return null;

  try {
    const keys = Object.keys(localStorage);
    const sessionKey = keys.find((key) => key.includes('supabase.auth.token'));

    if (!sessionKey) return null;

    const sessionData = localStorage.getItem(sessionKey);
    if (!sessionData) return null;

    const parsed = JSON.parse(sessionData);
    return (parsed.currentSession?.user as User | undefined) ?? null;
  } catch {
    return null;
  }
}

export function useUser(): UseQueryResult<User | null, Error> {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['user'],
    queryFn: (): Promise<User | null> => authService.getCurrentUser(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false, // Prevent refetch on tab switch (prevents flickering)
    refetchOnMount: false, // Prevent refetch on component mount
    initialData: getInitialUserFromStorage, // Instant hydration from localStorage
  });

  // Subscribe to auth state changes
  useEffect((): (() => void) => {
    const unsubscribe = authService.onAuthStateChange((newUser): void => {
      queryClient.setQueryData(['user'], newUser);
    });

    return (): void => {
      unsubscribe();
    };
  }, [queryClient]);

  return query;
}

export function useSession(): UseQueryResult<Session | null, Error> {
  return useQuery({
    queryKey: ['session'],
    queryFn: (): Promise<Session | null> => authService.getCurrentSession(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useProfile(userId: string | undefined): UseQueryResult<Profile | null, Error> {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: (): Promise<Profile | null> => {
      if (!userId) throw new Error('User ID is required');
      return authService.getProfile(userId);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSignUp(): UseMutationResult<AuthResponse, Error, SignUpData> {
  return useMutation({
    mutationFn: (data: SignUpData): Promise<AuthResponse> => authService.signUp(data),
  });
}

export function useSignIn(): UseMutationResult<AuthResponse, Error, SignInData> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignInData): Promise<AuthResponse> => authService.signIn(data),
    onSuccess: (response): void => {
      // Instant update of user in cache (prevents flickering)
      queryClient.setQueryData(['user'], response.user);
      queryClient.invalidateQueries({ queryKey: ['session'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

export function useSignOut(): UseMutationResult<{ error: Error | null }, Error, void> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (): Promise<{ error: Error | null }> => authService.signOut(),
    onSuccess: (): void => {
      // Instant update of user in cache (prevents flickering)
      queryClient.setQueryData(['user'], null);
      queryClient.clear();
    },
  });
}

export function useUpdateProfile(): UseMutationResult<Profile, Error, { userId: string; updates: ProfileUpdate }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, updates }: { userId: string; updates: ProfileUpdate }): Promise<Profile> =>
      authService.updateProfile(userId, updates),
    onSuccess: (_data, variables): void => {
      queryClient.invalidateQueries({ queryKey: ['profile', variables.userId] });
    },
  });
}

export function useResetPassword(): UseMutationResult<{ error: Error | null }, Error, string> {
  return useMutation({
    mutationFn: (email: string): Promise<{ error: Error | null }> => authService.resetPassword(email),
  });
}

export function useUpdatePassword(): UseMutationResult<{ error: Error | null }, Error, string> {
  return useMutation({
    mutationFn: (newPassword: string): Promise<{ error: Error | null }> => authService.updatePassword(newPassword),
  });
}
