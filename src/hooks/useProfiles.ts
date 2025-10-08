import { useQuery, useMutation, useQueryClient, type UseQueryResult, type UseMutationResult } from '@tanstack/react-query';
import { profilesService, type ProfileStats, type UserContent } from '@/services/profiles.service';
import type { Database } from '@/types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];

export function useProfile(username: string | undefined): UseQueryResult<Profile | null, Error> {
  return useQuery({
    queryKey: ['profiles', 'username', username],
    queryFn: (): Promise<Profile | null> => {
      if (!username) return Promise.resolve(null);
      return profilesService.getProfileByUsername(username);
    },
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useProfileById(id: string | undefined): UseQueryResult<Profile | null, Error> {
  return useQuery({
    queryKey: ['profiles', 'id', id],
    queryFn: (): Promise<Profile | null> => {
      if (!id) return Promise.resolve(null);
      return profilesService.getProfileById(id);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUserContent(userId: string | undefined): UseQueryResult<UserContent, Error> {
  return useQuery({
    queryKey: ['user-content', userId],
    queryFn: (): Promise<UserContent> => {
      if (!userId) return Promise.resolve({ events: [], spaces: [], services: [] });
      return profilesService.getUserContent(userId);
    },
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useProfileStats(userId: string | undefined): UseQueryResult<ProfileStats, Error> {
  return useQuery({
    queryKey: ['profile-stats', userId],
    queryFn: (): Promise<ProfileStats> => {
      if (!userId) {
        return Promise.resolve({
          events_count: 0,
          spaces_count: 0,
          services_count: 0,
          followers_count: 0,
          following_count: 0,
          total_bookings: 0,
          reviews_count: 0,
          average_rating: 0,
        });
      }
      return profilesService.getProfileStats(userId);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useFollowers(userId: string | undefined): UseQueryResult<Profile[], Error> {
  return useQuery({
    queryKey: ['followers', userId],
    queryFn: (): Promise<Profile[]> => {
      if (!userId) return Promise.resolve([]);
      return profilesService.getFollowers(userId);
    },
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useFollowing(userId: string | undefined): UseQueryResult<Profile[], Error> {
  return useQuery({
    queryKey: ['following', userId],
    queryFn: (): Promise<Profile[]> => {
      if (!userId) return Promise.resolve([]);
      return profilesService.getFollowing(userId);
    },
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useIsFollowing(followerId: string | undefined, followingId: string | undefined): UseQueryResult<boolean, Error> {
  return useQuery({
    queryKey: ['is-following', followerId, followingId],
    queryFn: (): Promise<boolean> => {
      if (!followerId || !followingId) return Promise.resolve(false);
      return profilesService.isFollowing(followerId, followingId);
    },
    enabled: !!followerId && !!followingId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

export function useFollowUser(): UseMutationResult<void, Error, { followerId: string; followingId: string }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ followerId, followingId }: { followerId: string; followingId: string }): Promise<void> =>
      profilesService.followUser(followerId, followingId),
    onSuccess: (_, variables): void => {
      queryClient.invalidateQueries({ queryKey: ['is-following', variables.followerId, variables.followingId] });
      queryClient.invalidateQueries({ queryKey: ['followers', variables.followingId] });
      queryClient.invalidateQueries({ queryKey: ['following', variables.followerId] });
      queryClient.invalidateQueries({ queryKey: ['profile-stats'] });
    },
  });
}

export function useUnfollowUser(): UseMutationResult<void, Error, { followerId: string; followingId: string }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ followerId, followingId }: { followerId: string; followingId: string }): Promise<void> =>
      profilesService.unfollowUser(followerId, followingId),
    onSuccess: (_, variables): void => {
      queryClient.invalidateQueries({ queryKey: ['is-following', variables.followerId, variables.followingId] });
      queryClient.invalidateQueries({ queryKey: ['followers', variables.followingId] });
      queryClient.invalidateQueries({ queryKey: ['following', variables.followerId] });
      queryClient.invalidateQueries({ queryKey: ['profile-stats'] });
    },
  });
}
