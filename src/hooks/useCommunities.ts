import { useQuery, useMutation, useQueryClient, type UseQueryResult, type UseMutationResult } from '@tanstack/react-query';
import { communityService, type CommunityFilters, type CommunityWithCreator, type CommunityWithMemberInfo, type CommunityMemberWithProfile } from '@/services/community.service';
import type { Database } from '@/types/database';

type Community = Database['public']['Tables']['communities']['Row'];

export function useCommunities(filters?: CommunityFilters): UseQueryResult<Community[], Error> {
  return useQuery({
    queryKey: ['communities', filters],
    queryFn: (): Promise<Community[]> => communityService.getCommunities(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useCommunity(slug: string | undefined): UseQueryResult<CommunityWithCreator | null, Error> {
  return useQuery({
    queryKey: ['communities', 'slug', slug],
    queryFn: (): Promise<CommunityWithCreator | null> => {
      if (!slug) return Promise.resolve(null);
      return communityService.getCommunityBySlug(slug);
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCommunityById(id: string | undefined): UseQueryResult<Community | null, Error> {
  return useQuery({
    queryKey: ['communities', 'id', id],
    queryFn: (): Promise<Community | null> => {
      if (!id) return Promise.resolve(null);
      return communityService.getCommunityById(id);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCommunityMembers(communityId: string | undefined): UseQueryResult<CommunityMemberWithProfile[], Error> {
  return useQuery({
    queryKey: ['community-members', communityId],
    queryFn: (): Promise<CommunityMemberWithProfile[]> => {
      if (!communityId) return Promise.resolve([]);
      return communityService.getCommunityMembers(communityId);
    },
    enabled: !!communityId,
  });
}

export function useIsCommunityMember(
  communityId: string | undefined,
  userId: string | undefined
): UseQueryResult<boolean, Error> {
  return useQuery({
    queryKey: ['is-community-member', communityId, userId],
    queryFn: (): Promise<boolean> => {
      if (!communityId || !userId) return Promise.resolve(false);
      return communityService.isCommunityMember(communityId, userId);
    },
    enabled: !!communityId && !!userId,
  });
}

export function useJoinCommunity(): UseMutationResult<void, Error, { communityId: string; userId: string }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ communityId, userId }: { communityId: string; userId: string }): Promise<void> =>
      communityService.joinCommunity(communityId, userId),
    onSuccess: (_, variables): void => {
      queryClient.invalidateQueries({ queryKey: ['is-community-member', variables.communityId, variables.userId] });
      queryClient.invalidateQueries({ queryKey: ['community-members', variables.communityId] });
      queryClient.invalidateQueries({ queryKey: ['communities'] });
    },
  });
}

export function useLeaveCommunity(): UseMutationResult<void, Error, { communityId: string; userId: string }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ communityId, userId }: { communityId: string; userId: string }): Promise<void> =>
      communityService.leaveCommunity(communityId, userId),
    onSuccess: (_, variables): void => {
      queryClient.invalidateQueries({ queryKey: ['is-community-member', variables.communityId, variables.userId] });
      queryClient.invalidateQueries({ queryKey: ['community-members', variables.communityId] });
      queryClient.invalidateQueries({ queryKey: ['communities'] });
    },
  });
}

export function useUserCommunities(
  userId: string | undefined
): UseQueryResult<CommunityWithMemberInfo[], Error> {
  return useQuery({
    queryKey: ['user-communities', userId],
    queryFn: (): Promise<CommunityWithMemberInfo[]> => {
      if (!userId) return Promise.resolve([]);
      return communityService.getUserCommunities(userId);
    },
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useCreateCommunity(): UseMutationResult<
  Community,
  Error,
  {
    creatorId: string;
    name: string;
    slug: string;
    description: string;
    category: string;
    privacy: string;
    rules?: string[];
    tags?: string[];
    image_url?: string;
  }
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      creatorId,
      name,
      slug,
      description,
      category,
      privacy,
      rules,
      tags,
      image_url,
    }: {
      creatorId: string;
      name: string;
      slug: string;
      description: string;
      category: string;
      privacy: string;
      rules?: string[];
      tags?: string[];
      image_url?: string;
    }): Promise<Community> =>
      communityService.createCommunity(creatorId, {
        name,
        slug,
        description,
        category,
        privacy,
        rules,
        tags,
        image_url,
      }),
    onSuccess: (data, variables): void => {
      queryClient.invalidateQueries({ queryKey: ['communities'] });
      queryClient.invalidateQueries({ queryKey: ['user-communities', variables.creatorId] });
      queryClient.invalidateQueries({ queryKey: ['is-community-member', data.id, variables.creatorId] });
      queryClient.invalidateQueries({ queryKey: ['community-members', data.id] });
    },
  });
}

export function useUpdateCommunity(): UseMutationResult<
  Community,
  Error,
  {
    communityId: string;
    name?: string;
    description?: string;
    category?: string;
    privacy?: string;
    rules?: string[];
    tags?: string[];
    image_url?: string;
  }
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      communityId,
      name,
      description,
      category,
      privacy,
      rules,
      tags,
      image_url,
    }: {
      communityId: string;
      name?: string;
      description?: string;
      category?: string;
      privacy?: string;
      rules?: string[];
      tags?: string[];
      image_url?: string;
    }): Promise<Community> =>
      communityService.updateCommunity(communityId, {
        name,
        description,
        category,
        privacy,
        rules,
        tags,
        image_url,
      }),
    onSuccess: (_, variables): void => {
      queryClient.invalidateQueries({ queryKey: ['communities'] });
      queryClient.invalidateQueries({ queryKey: ['communities', 'id', variables.communityId] });
      queryClient.invalidateQueries({ queryKey: ['communities', 'slug'] });
    },
  });
}
