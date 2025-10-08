import { useQuery, useMutation, useInfiniteQuery, useQueryClient, type UseQueryResult, type UseMutationResult, type UseInfiniteQueryResult } from '@tanstack/react-query';
import { blogService, type BlogFilters, type BlogComment, type BlogPostWithAuthor, type BlogCommentWithAuthor, type AuthorWithStats, type AuthorProfile } from '@/services/blog.service';
import type { BlogPost, BlogPostInsert, BlogPostUpdate } from '@/types/database';

export function useBlogPosts(filters?: BlogFilters): UseQueryResult<BlogPostWithAuthor[], Error> {
  return useQuery({
    queryKey: ['blog-posts', filters],
    queryFn: (): Promise<BlogPostWithAuthor[]> => blogService.getBlogPosts(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useBlogPost(id: string | undefined): UseQueryResult<BlogPostWithAuthor | null, Error> {
  return useQuery({
    queryKey: ['blog-posts', id],
    queryFn: (): Promise<BlogPostWithAuthor | null> => {
      if (!id) return Promise.resolve(null);
      return blogService.getBlogPost(id);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useInfiniteBlogPosts(
  filters?: BlogFilters
): UseInfiniteQueryResult<BlogPostWithAuthor[], Error> {
  return useInfiniteQuery({
    queryKey: ['blog-posts', 'infinite', filters],
    queryFn: async ({ pageParam = 0 }): Promise<BlogPostWithAuthor[]> => {
      return blogService.getBlogPosts({
        ...filters,
        limit: 10,
        offset: pageParam as number,
      });
    },
    getNextPageParam: (lastPage, allPages): number | undefined => {
      if (lastPage.length < 10) return undefined;
      return allPages.length * 10;
    },
    initialPageParam: 0,
  });
}

export function useCreateBlogPost(): UseMutationResult<BlogPost, Error, BlogPostInsert> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BlogPostInsert): Promise<BlogPost> => blogService.createBlogPost(data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
  });
}

export function useUpdateBlogPost(): UseMutationResult<BlogPost, Error, { id: string; updates: BlogPostUpdate }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: BlogPostUpdate }): Promise<BlogPost> =>
      blogService.updateBlogPost(id, updates),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
  });
}

export function useDeleteBlogPost(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string): Promise<void> => blogService.deleteBlogPost(id),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
  });
}

export function useLikeBlogPost(): UseMutationResult<void, Error, { postId: string; userId: string }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }): Promise<void> =>
      blogService.likeBlogPost(postId, userId),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
  });
}

export function useUnlikeBlogPost(): UseMutationResult<void, Error, { postId: string; userId: string }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }): Promise<void> =>
      blogService.unlikeBlogPost(postId, userId),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
  });
}

export function useBookmarkBlogPost(): UseMutationResult<void, Error, { postId: string; userId: string }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }): Promise<void> =>
      blogService.bookmarkBlogPost(postId, userId),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
  });
}

export function useUnbookmarkBlogPost(): UseMutationResult<void, Error, { postId: string; userId: string }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }): Promise<void> =>
      blogService.unbookmarkBlogPost(postId, userId),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
  });
}

export function useCreateBlogComment(): UseMutationResult<BlogComment, Error, { postId: string; authorId: string; content: string }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, authorId, content }: { postId: string; authorId: string; content: string }): Promise<BlogComment> =>
      blogService.createBlogComment(postId, authorId, content),
    onSuccess: (_, variables): void => {
      queryClient.invalidateQueries({ queryKey: ['blog-comments', variables.postId] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
  });
}

export function useBlogComments(postId: string | undefined): UseQueryResult<BlogCommentWithAuthor[], Error> {
  return useQuery({
    queryKey: ['blog-comments', postId],
    queryFn: (): Promise<BlogCommentWithAuthor[]> => {
      if (!postId) return Promise.resolve([]);
      return blogService.getBlogComments(postId);
    },
    enabled: !!postId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

export function useDeleteBlogComment(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string): Promise<void> => blogService.deleteBlogComment(id),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['blog-comments'] });
    },
  });
}

export function useBlogStats(): UseQueryResult<
  {
    total_articles: number;
    total_comments: number;
    categories: Array<{ name: string; count: number }>;
  },
  Error
> {
  return useQuery({
    queryKey: ['blog-stats'],
    queryFn: (): Promise<{
      total_articles: number;
      total_comments: number;
      categories: Array<{ name: string; count: number }>;
    }> => blogService.getBlogStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function usePopularBlogPosts(
  limit = 5
): UseQueryResult<BlogPostWithAuthor[], Error> {
  return useQuery({
    queryKey: ['popular-blog-posts', limit],
    queryFn: (): Promise<BlogPostWithAuthor[]> =>
      blogService.getPopularBlogPosts(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useAuthors(): UseQueryResult<AuthorWithStats[], Error> {
  return useQuery({
    queryKey: ['authors'],
    queryFn: (): Promise<AuthorWithStats[]> => blogService.getAuthors(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useAuthorProfile(username: string | undefined): UseQueryResult<AuthorProfile | null, Error> {
  return useQuery({
    queryKey: ['author-profile', username],
    queryFn: (): Promise<AuthorProfile | null> => {
      if (!username) return Promise.resolve(null);
      return blogService.getAuthorByUsername(username);
    },
    enabled: !!username,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
