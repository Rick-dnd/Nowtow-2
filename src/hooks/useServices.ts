import { useQuery, useMutation, useQueryClient, useInfiniteQuery, type UseQueryResult, type UseMutationResult, type UseInfiniteQueryResult } from '@tanstack/react-query';
import { servicesService, type ServiceFilters } from '@/services/services.service';
import type { Database } from '@/types/database';

type Service = Database['public']['Tables']['services']['Row'];
type ServiceInsert = Database['public']['Tables']['services']['Insert'];
type ServiceUpdate = Database['public']['Tables']['services']['Update'];

export function useServices(filters?: ServiceFilters): UseQueryResult<Service[], Error> {
  return useQuery({
    queryKey: ['services', filters],
    queryFn: (): Promise<Service[]> => servicesService.getServices(filters),
    staleTime: 5 * 60 * 1000,
  });
}

export function useService(id: string | undefined): UseQueryResult<Service | null, Error> {
  return useQuery({
    queryKey: ['services', id],
    queryFn: (): Promise<Service | null> => {
      if (!id) throw new Error('Service ID is required');
      return servicesService.getServiceById(id);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useInfiniteServices(filters?: ServiceFilters): UseInfiniteQueryResult<Service[], Error> {
  return useInfiniteQuery({
    queryKey: ['services', 'infinite', filters],
    queryFn: ({ pageParam = 0 }): Promise<Service[]> =>
      servicesService.getServices({ ...filters, offset: pageParam as number, limit: 12 }),
    getNextPageParam: (lastPage, allPages): number | undefined =>
      lastPage.length === 12 ? allPages.length * 12 : undefined,
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProviderServices(providerId: string | undefined): UseQueryResult<Service[], Error> {
  return useQuery({
    queryKey: ['services', 'provider', providerId],
    queryFn: (): Promise<Service[]> => {
      if (!providerId) throw new Error('Provider ID is required');
      return servicesService.getServicesByProvider(providerId);
    },
    enabled: !!providerId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateService(): UseMutationResult<Service, Error, ServiceInsert> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (service: ServiceInsert): Promise<Service> => servicesService.createService(service),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
}

export function useUpdateService(): UseMutationResult<Service, Error, { id: string; updates: ServiceUpdate }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: ServiceUpdate }): Promise<Service> =>
      servicesService.updateService(id, updates),
    onSuccess: (_data, variables): void => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['services', variables.id] });
    },
  });
}

export function useDeleteService(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string): Promise<void> => servicesService.deleteService(id),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
}
