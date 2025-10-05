import { useQuery, useMutation, useQueryClient, type UseQueryResult, type UseMutationResult } from '@tanstack/react-query';
import { storiesService, type StoryFilters } from '@/services/stories.service';
import type { Database } from '@/types/database';

type Story = Database['public']['Tables']['community_stories']['Row'];
type StoryInsert = Database['public']['Tables']['community_stories']['Insert'];
type StoryUpdate = Database['public']['Tables']['community_stories']['Update'];

export function useStories(filters?: StoryFilters): UseQueryResult<Story[], Error> {
  return useQuery({
    queryKey: ['stories', filters],
    queryFn: (): Promise<Story[]> => storiesService.getActiveStories(filters),
    staleTime: 1 * 60 * 1000, // 1 minute (stories are time-sensitive)
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes to check for expired stories
  });
}

export function useStory(id: string | undefined): UseQueryResult<Story | null, Error> {
  return useQuery({
    queryKey: ['stories', id],
    queryFn: (): Promise<Story | null> => {
      if (!id) throw new Error('Story ID is required');
      return storiesService.getStory(id);
    },
    enabled: !!id,
    staleTime: 1 * 60 * 1000,
  });
}

export function useStoriesBar(): UseQueryResult<Array<{ userId: string; stories: Story[] }>, Error> {
  return useQuery({
    queryKey: ['stories', 'bar'],
    queryFn: (): Promise<Array<{ userId: string; stories: Story[] }>> => storiesService.getStoriesBarData(),
    staleTime: 1 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
}

export function useCreateStory(): UseMutationResult<Story, Error, StoryInsert> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (story: StoryInsert): Promise<Story> => storiesService.createStory(story),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });
}

export function useUpdateStory(): UseMutationResult<Story, Error, { id: string; updates: StoryUpdate }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: StoryUpdate }): Promise<Story> =>
      storiesService.updateStory(id, updates),
    onSuccess: (_data, variables): void => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      queryClient.invalidateQueries({ queryKey: ['stories', variables.id] });
    },
  });
}

export function useDeleteStory(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string): Promise<void> => storiesService.deleteStory(id),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });
}

export function useIncrementStoryView(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string): Promise<void> => storiesService.incrementViewCount(id),
    onSuccess: (_data, id): void => {
      queryClient.invalidateQueries({ queryKey: ['stories', id] });
    },
  });
}

export function useSaveToHighlights(): UseMutationResult<Story, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string): Promise<Story> => storiesService.saveToHighlights(id),
    onSuccess: (_data, id): void => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      queryClient.invalidateQueries({ queryKey: ['stories', id] });
    },
  });
}

export function useHighlights(userId: string | undefined): UseQueryResult<Story[], Error> {
  return useQuery({
    queryKey: ['stories', 'highlights', userId],
    queryFn: (): Promise<Story[]> => {
      if (!userId) throw new Error('User ID is required');
      return storiesService.getHighlights(userId);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
}
