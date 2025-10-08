import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query';
import {
  blogAuthorService,
  type AuthorStats,
} from '@/services/blog-author.service';
import type { Profile } from '@/hooks/useAuth';

export function useAuthorStatus(
  userId: string | undefined
): UseQueryResult<
  {
    is_author: boolean | null;
    author_status: string | null;
    author_applied_at: string | null;
  } | null,
  Error
> {
  return useQuery({
    queryKey: ['author-status', userId],
    queryFn: (): Promise<{
      is_author: boolean | null;
      author_status: string | null;
      author_applied_at: string | null;
    } | null> => {
      if (!userId) return Promise.resolve(null);
      return blogAuthorService.getAuthorStatus(userId);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useApplyForAuthor(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string): Promise<void> =>
      blogAuthorService.applyForAuthor(userId),
    onSuccess: (_, userId): void => {
      // Invalidate author status
      queryClient.invalidateQueries({
        queryKey: ['author-status', userId],
      });

      // Invalidate user query to update profile immediately
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });

      // Invalidate profile query
      queryClient.invalidateQueries({
        queryKey: ['profile', userId],
      });
    },
  });
}

export function useAuthorStats(
  userId: string | undefined
): UseQueryResult<AuthorStats, Error> {
  return useQuery({
    queryKey: ['author-stats', userId],
    queryFn: (): Promise<AuthorStats> => {
      if (!userId) throw new Error('User ID is required');
      return blogAuthorService.getAuthorStats(userId);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useAllAuthors(): UseQueryResult<Profile[], Error> {
  return useQuery({
    queryKey: ['all-authors'],
    queryFn: (): Promise<Profile[]> => blogAuthorService.getAllAuthors(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
