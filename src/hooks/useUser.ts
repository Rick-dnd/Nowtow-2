import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query';
import {
  userService,
  type UserStats,
} from '@/services/user.service';
import type { BlogPostWithAuthor } from '@/services/blog.service';

/**
 * Hook to check if current user follows another user
 */
export function useFollowStatus(
  followerId: string | undefined,
  followingId: string | undefined
): UseQueryResult<boolean, Error> {
  return useQuery({
    queryKey: ['follow-status', followerId, followingId],
    queryFn: (): Promise<boolean> => {
      if (!followerId || !followingId) return Promise.resolve(false);
      return userService.getFollowStatus(followerId, followingId);
    },
    enabled: !!followerId && !!followingId,
    staleTime: 30 * 1000, // 30 seconds
  });
}

/**
 * Hook to follow a user
 */
export function useFollowUser(): UseMutationResult<
  void,
  Error,
  { followerId: string; followingId: string }
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      followerId,
      followingId,
    }: {
      followerId: string;
      followingId: string;
    }): Promise<void> => userService.followUser(followerId, followingId),
    onSuccess: (_, variables): void => {
      // Invalidate follow status
      queryClient.invalidateQueries({
        queryKey: ['follow-status', variables.followerId, variables.followingId],
      });
      // Invalidate user stats for both users
      queryClient.invalidateQueries({
        queryKey: ['user-stats', variables.followerId],
      });
      queryClient.invalidateQueries({
        queryKey: ['user-stats', variables.followingId],
      });
      // Invalidate followers/following lists
      queryClient.invalidateQueries({
        queryKey: ['followers', variables.followingId],
      });
      queryClient.invalidateQueries({
        queryKey: ['following', variables.followerId],
      });
    },
  });
}

/**
 * Hook to unfollow a user
 */
export function useUnfollowUser(): UseMutationResult<
  void,
  Error,
  { followerId: string; followingId: string }
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      followerId,
      followingId,
    }: {
      followerId: string;
      followingId: string;
    }): Promise<void> => userService.unfollowUser(followerId, followingId),
    onSuccess: (_, variables): void => {
      // Invalidate follow status
      queryClient.invalidateQueries({
        queryKey: ['follow-status', variables.followerId, variables.followingId],
      });
      // Invalidate user stats for both users
      queryClient.invalidateQueries({
        queryKey: ['user-stats', variables.followerId],
      });
      queryClient.invalidateQueries({
        queryKey: ['user-stats', variables.followingId],
      });
      // Invalidate followers/following lists
      queryClient.invalidateQueries({
        queryKey: ['followers', variables.followingId],
      });
      queryClient.invalidateQueries({
        queryKey: ['following', variables.followerId],
      });
    },
  });
}

/**
 * Hook to get user's followers list
 */
export function useFollowers(
  userId: string | undefined
): UseQueryResult<string[], Error> {
  return useQuery({
    queryKey: ['followers', userId],
    queryFn: (): Promise<string[]> => {
      if (!userId) return Promise.resolve([]);
      return userService.getFollowers(userId);
    },
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook to get users that this user follows
 */
export function useFollowing(
  userId: string | undefined
): UseQueryResult<string[], Error> {
  return useQuery({
    queryKey: ['following', userId],
    queryFn: (): Promise<string[]> => {
      if (!userId) return Promise.resolve([]);
      return userService.getFollowing(userId);
    },
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook to get user's follower and following counts
 */
export function useUserStats(
  userId: string | undefined
): UseQueryResult<UserStats, Error> {
  return useQuery({
    queryKey: ['user-stats', userId],
    queryFn: (): Promise<UserStats> => {
      if (!userId)
        return Promise.resolve({ followers_count: 0, following_count: 0 });
      return userService.getUserStats(userId);
    },
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook to get user's bookmarked blog posts
 */
export function useUserBookmarks(
  userId: string | undefined
): UseQueryResult<BlogPostWithAuthor[], Error> {
  return useQuery({
    queryKey: ['user-bookmarks', userId],
    queryFn: (): Promise<BlogPostWithAuthor[]> => {
      if (!userId) return Promise.resolve([]);
      return userService.getUserBookmarks(userId);
    },
    enabled: !!userId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

/**
 * Hook to check if user has liked a specific blog post
 */
export function useLikeStatus(
  userId: string | undefined,
  postId: string | undefined
): UseQueryResult<boolean, Error> {
  return useQuery({
    queryKey: ['like-status', userId, postId],
    queryFn: (): Promise<boolean> => {
      if (!userId || !postId) return Promise.resolve(false);
      return userService.getLikeStatus(userId, postId);
    },
    enabled: !!userId && !!postId,
    staleTime: 30 * 1000, // 30 seconds
  });
}

/**
 * Hook to check if user has bookmarked a specific blog post
 */
export function useBookmarkStatus(
  userId: string | undefined,
  postId: string | undefined
): UseQueryResult<boolean, Error> {
  return useQuery({
    queryKey: ['bookmark-status', userId, postId],
    queryFn: (): Promise<boolean> => {
      if (!userId || !postId) return Promise.resolve(false);
      return userService.getBookmarkStatus(userId, postId);
    },
    enabled: !!userId && !!postId,
    staleTime: 30 * 1000, // 30 seconds
  });
}
