import { useQuery, useMutation, useQueryClient, type UseQueryResult, type UseMutationResult } from '@tanstack/react-query';
import { reviewsService, type ReviewFilters } from '@/services/reviews.service';
import type { Review, ReviewInsert, ReviewUpdate } from '@/types/database';

export function useReviews(filters?: ReviewFilters): UseQueryResult<Review[], Error> {
  return useQuery({
    queryKey: ['reviews', filters],
    queryFn: (): Promise<Review[]> => reviewsService.getReviews(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useReview(id: string | undefined): UseQueryResult<Review | null, Error> {
  return useQuery({
    queryKey: ['reviews', id],
    queryFn: (): Promise<Review | null> => {
      if (!id) return Promise.resolve(null);
      return reviewsService.getReview(id);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useReviewsByReviewed(
  reviewType: string,
  reviewedId: string | undefined
): UseQueryResult<Review[], Error> {
  return useQuery({
    queryKey: ['reviews', reviewType, reviewedId],
    queryFn: (): Promise<Review[]> => {
      if (!reviewedId) return Promise.resolve([]);
      return reviewsService.getReviewsByReviewed(reviewType, reviewedId);
    },
    enabled: !!reviewedId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useReviewsByAuthor(authorId: string | undefined): UseQueryResult<Review[], Error> {
  return useQuery({
    queryKey: ['reviews', 'author', authorId],
    queryFn: (): Promise<Review[]> => {
      if (!authorId) return Promise.resolve([]);
      return reviewsService.getReviewsByAuthor(authorId);
    },
    enabled: !!authorId,
  });
}

export function useAverageRating(
  reviewType: string,
  reviewedId: string | undefined
): UseQueryResult<number, Error> {
  return useQuery({
    queryKey: ['reviews', 'average', reviewType, reviewedId],
    queryFn: (): Promise<number> => {
      if (!reviewedId) return Promise.resolve(0);
      return reviewsService.getAverageRating(reviewType, reviewedId);
    },
    enabled: !!reviewedId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useCreateReview(): UseMutationResult<Review, Error, ReviewInsert> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReviewInsert): Promise<Review> => reviewsService.createReview(data),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}

export function useUpdateReview(): UseMutationResult<Review, Error, { id: string; updates: ReviewUpdate }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: ReviewUpdate }): Promise<Review> =>
      reviewsService.updateReview(id, updates),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}

export function useDeleteReview(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string): Promise<void> => reviewsService.deleteReview(id),
    onSuccess: (): void => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}
