import { useQuery, useMutation, useQueryClient, useInfiniteQuery, type UseQueryResult, type UseMutationResult, type UseInfiniteQueryResult } from '@tanstack/react-query';
import { spacesService, type SpaceFilters } from '@/services/spaces.service';
import type { Database } from '@/types/database';

type Space = Database['public']['Tables']['spaces']['Row'];
type SpaceInsert = Database['public']['Tables']['spaces']['Insert'];
type SpaceUpdate = Database['public']['Tables']['spaces']['Update'];

export function useSpaces(filters?: SpaceFilters): UseQueryResult<Space[], Error> {
  return useQuery({
    queryKey: ['spaces', filters],
    queryFn: (): Promise<Space[]> => spacesService.getSpaces(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSpace(id: string | undefined): UseQueryResult<Space | null, Error> {
  return useQuery({
    queryKey: ['spaces', id],
    queryFn: (): Promise<Space | null> => {
      if (!id) throw new Error('Space ID is required');
      return spacesService.getSpaceById(id);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useInfiniteSpaces(filters?: SpaceFilters): UseInfiniteQueryResult<Space[], Error> {
  return useInfiniteQuery({
    queryKey: ['spaces', 'infinite', filters],
    queryFn: ({ pageParam = 0 }): Promise<Space[]> =>
      spacesService.getSpaces({ ...filters, offset: pageParam as number, limit: 12 }),
    getNextPageParam: (lastPage, allPages): number | undefined =>
      lastPage.length === 12 ? allPages.length * 12 : undefined,
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
  });
}

export function useOwnerSpaces(ownerId: string | undefined): UseQueryResult<Space[], Error> {
  return useQuery({
    queryKey: ['spaces', 'owner', ownerId],
    queryFn: (): Promise<Space[]> => {
      if (!ownerId) throw new Error('Owner ID is required');
      return spacesService.getSpacesByOwner(ownerId);
    },
    enabled: !!ownerId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateSpace(): UseMutationResult<Space, Error, SpaceInsert> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (space: SpaceInsert): Promise<Space> => spacesService.createSpace(space),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['spaces'] });
    },
  });
}

export function useUpdateSpace(): UseMutationResult<Space, Error, { id: string; updates: SpaceUpdate }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: SpaceUpdate }): Promise<Space> =>
      spacesService.updateSpace(id, updates),
    onSuccess: (_data, variables): void => {
      queryClient.invalidateQueries({ queryKey: ['spaces'] });
      queryClient.invalidateQueries({ queryKey: ['spaces', variables.id] });
    },
  });
}

export function useDeleteSpace(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string): Promise<void> => spacesService.deleteSpace(id),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['spaces'] });
    },
  });
}
