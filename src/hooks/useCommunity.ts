import { useQuery, useMutation, useInfiniteQuery, useQueryClient, type UseQueryResult, type UseMutationResult, type UseInfiniteQueryResult } from '@tanstack/react-query';
import { communityService, type PostFilters, type PostComment, type PollData } from '@/services/community.service';
import type { CommunityPost, CommunityPostInsert, CommunityPostUpdate } from '@/types/database';

export function usePosts(filters?: PostFilters): UseQueryResult<CommunityPost[], Error> {
  return useQuery({
    queryKey: ['posts', filters],
    queryFn: (): Promise<CommunityPost[]> => communityService.getPosts(filters),
  });
}

export function usePost(id: string | undefined): UseQueryResult<CommunityPost | null, Error> {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: (): Promise<CommunityPost | null> => {
      if (!id) return Promise.resolve(null);
      return communityService.getPost(id);
    },
    enabled: !!id,
  });
}

export function useInfinitePosts(
  filters?: PostFilters
): UseInfiniteQueryResult<CommunityPost[], Error> {
  return useInfiniteQuery({
    queryKey: ['posts', 'infinite', filters],
    queryFn: async ({ pageParam = 0 }): Promise<CommunityPost[]> => {
      return communityService.getPosts({
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

export function useCreatePost(): UseMutationResult<CommunityPost, Error, CommunityPostInsert> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CommunityPostInsert): Promise<CommunityPost> => communityService.createPost(data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useUpdatePost(): UseMutationResult<CommunityPost, Error, { id: string; updates: CommunityPostUpdate }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: CommunityPostUpdate }): Promise<CommunityPost> =>
      communityService.updatePost(id, updates),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useDeletePost(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string): Promise<void> => communityService.deletePost(id),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useLikePost(): UseMutationResult<void, Error, { postId: string; userId: string }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }): Promise<void> =>
      communityService.likePost(postId, userId),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useUnlikePost(): UseMutationResult<void, Error, { postId: string; userId: string }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }): Promise<void> =>
      communityService.unlikePost(postId, userId),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useCreateComment(): UseMutationResult<PostComment, Error, { postId: string; authorId: string; content: string }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, authorId, content }: { postId: string; authorId: string; content: string }): Promise<PostComment> =>
      communityService.createComment(postId, authorId, content),
    onSuccess: (_, variables): void => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useComments(postId: string | undefined): UseQueryResult<PostComment[], Error> {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: (): Promise<PostComment[]> => {
      if (!postId) return Promise.resolve([]);
      return communityService.getComments(postId);
    },
    enabled: !!postId,
  });
}

export function useCreatePoll(): UseMutationResult<CommunityPost, Error, { authorId: string; communityId: string | null; pollData: PollData }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ authorId, communityId, pollData }: { authorId: string; communityId: string | null; pollData: PollData }): Promise<CommunityPost> =>
      communityService.createPoll(authorId, communityId, pollData),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useVotePoll(): UseMutationResult<void, Error, { postId: string; optionIndex: number; userId: string }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, optionIndex, userId }: { postId: string; optionIndex: number; userId: string }): Promise<void> =>
      communityService.votePoll(postId, optionIndex, userId),
    onSuccess: (_, variables): void => {
      queryClient.invalidateQueries({ queryKey: ['posts', variables.postId] });
    },
  });
}
