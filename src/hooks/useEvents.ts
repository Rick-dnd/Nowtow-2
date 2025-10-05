import { useQuery, useMutation, useQueryClient, useInfiniteQuery, type UseQueryResult, type UseMutationResult, type UseInfiniteQueryResult } from '@tanstack/react-query';
import { eventsService, type EventFilters } from '@/services/events.service';
import type { Database } from '@/types/database';

type Event = Database['public']['Tables']['events']['Row'];
type EventInsert = Database['public']['Tables']['events']['Insert'];
type EventUpdate = Database['public']['Tables']['events']['Update'];

export function useEvents(filters?: EventFilters): UseQueryResult<Event[], Error> {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: (): Promise<Event[]> => eventsService.getEvents(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useEvent(id: string | undefined): UseQueryResult<Event | null, Error> {
  return useQuery({
    queryKey: ['events', id],
    queryFn: (): Promise<Event | null> => {
      if (!id) throw new Error('Event ID is required');
      return eventsService.getEventById(id);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useInfiniteEvents(filters?: EventFilters): UseInfiniteQueryResult<Event[], Error> {
  return useInfiniteQuery({
    queryKey: ['events', 'infinite', filters],
    queryFn: ({ pageParam = 0 }): Promise<Event[]> =>
      eventsService.getEvents({ ...filters, offset: pageParam as number, limit: 12 }),
    getNextPageParam: (lastPage, allPages): number | undefined =>
      lastPage.length === 12 ? allPages.length * 12 : undefined,
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
  });
}

export function useOrganizerEvents(organizerId: string | undefined): UseQueryResult<Event[], Error> {
  return useQuery({
    queryKey: ['events', 'organizer', organizerId],
    queryFn: (): Promise<Event[]> => {
      if (!organizerId) throw new Error('Organizer ID is required');
      return eventsService.getEventsByOrganizer(organizerId);
    },
    enabled: !!organizerId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateEvent(): UseMutationResult<Event, Error, EventInsert> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (event: EventInsert): Promise<Event> => eventsService.createEvent(event),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}

export function useUpdateEvent(): UseMutationResult<Event, Error, { id: string; updates: EventUpdate }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: EventUpdate }): Promise<Event> =>
      eventsService.updateEvent(id, updates),
    onSuccess: (_data, variables): void => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['events', variables.id] });
    },
  });
}

export function useDeleteEvent(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string): Promise<void> => eventsService.deleteEvent(id),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}

export function useIncrementAttendees(): UseMutationResult<Event, Error, { id: string; count?: number }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, count }: { id: string; count?: number }): Promise<Event> =>
      eventsService.incrementAttendees(id, count),
    onSuccess: (_data, variables): void => {
      queryClient.invalidateQueries({ queryKey: ['events', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}
