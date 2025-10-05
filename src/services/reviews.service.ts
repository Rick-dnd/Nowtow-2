import { createClient } from '@/lib/supabase/client';
import type { Review, ReviewInsert, ReviewUpdate } from '@/types/database';

export interface ReviewFilters {
  reviewType?: string;
  reviewedId?: string;
  authorId?: string;
}

export const reviewsService = {
  async createReview(data: ReviewInsert): Promise<Review> {
    const supabase = createClient();

    const { data: review, error } = await supabase
      .from('reviews')
      .insert(data)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create review: ${error.message}`);
    }

    return review;
  },

  async getReview(id: string): Promise<Review | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch review: ${error.message}`);
    }

    return data;
  },

  async getReviews(filters?: ReviewFilters): Promise<Review[]> {
    const supabase = createClient();

    let query = supabase.from('reviews').select('*');

    if (filters?.reviewType) {
      query = query.eq('review_type', filters.reviewType);
    }

    if (filters?.reviewedId) {
      query = query.eq('reviewed_id', filters.reviewedId);
    }

    if (filters?.authorId) {
      query = query.eq('author_id', filters.authorId);
    }

    const { data, error } = await query.order('created_at', {
      ascending: false,
    });

    if (error) {
      throw new Error(`Failed to fetch reviews: ${error.message}`);
    }

    return data;
  },

  async getReviewsByReviewed(
    reviewType: string,
    reviewedId: string
  ): Promise<Review[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('review_type', reviewType)
      .eq('reviewed_id', reviewedId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch reviews: ${error.message}`);
    }

    return data;
  },

  async getReviewsByAuthor(authorId: string): Promise<Review[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('author_id', authorId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch author reviews: ${error.message}`);
    }

    return data;
  },

  async getAverageRating(
    reviewType: string,
    reviewedId: string
  ): Promise<number> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('review_type', reviewType)
      .eq('reviewed_id', reviewedId);

    if (error) {
      throw new Error(`Failed to calculate average rating: ${error.message}`);
    }

    if (!data || data.length === 0) {
      return 0;
    }

    const sum = data.reduce((acc, review) => acc + (review.rating ?? 0), 0);
    return sum / data.length;
  },

  async updateReview(id: string, updates: ReviewUpdate): Promise<Review> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update review: ${error.message}`);
    }

    return data;
  },

  async deleteReview(id: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase.from('reviews').delete().eq('id', id);

    if (error) {
      throw new Error(`Failed to delete review: ${error.message}`);
    }
  },
};
