import { useQuery, useMutation, useInfiniteQuery, useQueryClient, type UseQueryResult, type UseMutationResult, type UseInfiniteQueryResult } from '@tanstack/react-query';
import { blogService, type BlogFilters, type BlogComment } from '@/services/blog.service';
import type { BlogPost, BlogPostInsert, BlogPostUpdate } from '@/types/database';

export function useBlogPosts(filters?: BlogFilters): UseQueryResult<BlogPost[], Error> {
  return useQuery({
    queryKey: ['blog-posts', filters],
    queryFn: (): Promise<BlogPost[]> => blogService.getBlogPosts(filters),
  });
}

export function useBlogPost(id: string | undefined): UseQueryResult<BlogPost | null, Error> {
  return useQuery({
    queryKey: ['blog-posts', id],
    queryFn: (): Promise<BlogPost | null> => {
      if (!id) return Promise.resolve(null);
      return blogService.getBlogPost(id);
    },
    enabled: !!id,
  });
}

export function useInfiniteBlogPosts(
  filters?: BlogFilters
): UseInfiniteQueryResult<BlogPost[], Error> {
  return useInfiniteQuery({
    queryKey: ['blog-posts', 'infinite', filters],
    queryFn: async ({ pageParam = 0 }): Promise<BlogPost[]> => {
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

export function useBlogComments(postId: string | undefined): UseQueryResult<BlogComment[], Error> {
  return useQuery({
    queryKey: ['blog-comments', postId],
    queryFn: (): Promise<BlogComment[]> => {
      if (!postId) return Promise.resolve([]);
      return blogService.getBlogComments(postId);
    },
    enabled: !!postId,
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
