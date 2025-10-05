import { useQuery, useMutation, useQueryClient, type UseQueryResult, type UseMutationResult } from '@tanstack/react-query';
import { bookingsService, type BookingFilters } from '@/services/bookings.service';
import type { Booking, BookingInsert, BookingUpdate } from '@/types/database';

export function useBookings(filters?: BookingFilters): UseQueryResult<Booking[], Error> {
  return useQuery({
    queryKey: ['bookings', filters],
    queryFn: (): Promise<Booking[]> => bookingsService.getBookings(filters),
  });
}

export function useBooking(id: string | undefined): UseQueryResult<Booking | null, Error> {
  return useQuery({
    queryKey: ['bookings', id],
    queryFn: (): Promise<Booking | null> => {
      if (!id) return Promise.resolve(null);
      return bookingsService.getBooking(id);
    },
    enabled: !!id,
  });
}

export function useUserBookings(userId: string | undefined): UseQueryResult<Booking[], Error> {
  return useQuery({
    queryKey: ['bookings', 'user', userId],
    queryFn: (): Promise<Booking[]> => {
      if (!userId) return Promise.resolve([]);
      return bookingsService.getBookingsByUser(userId);
    },
    enabled: !!userId,
  });
}

export function useBookableBookings(
  bookableType: string,
  bookableId: string | undefined
): UseQueryResult<Booking[], Error> {
  return useQuery({
    queryKey: ['bookings', bookableType, bookableId],
    queryFn: (): Promise<Booking[]> => {
      if (!bookableId) return Promise.resolve([]);
      return bookingsService.getBookingsByBookable(bookableType, bookableId);
    },
    enabled: !!bookableId,
  });
}

export function useCreateBooking(): UseMutationResult<Booking, Error, BookingInsert> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BookingInsert): Promise<Booking> => bookingsService.createBooking(data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function useUpdateBooking(): UseMutationResult<Booking, Error, { id: string; updates: BookingUpdate }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: BookingUpdate }): Promise<Booking> =>
      bookingsService.updateBooking(id, updates),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function useCancelBooking(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string): Promise<void> => bookingsService.cancelBooking(id),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function useConfirmBooking(): UseMutationResult<Booking, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string): Promise<Booking> => bookingsService.confirmBooking(id),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function useDeleteBooking(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string): Promise<void> => bookingsService.deleteBooking(id),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}
