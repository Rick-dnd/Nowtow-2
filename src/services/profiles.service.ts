import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];
type Event = Database['public']['Tables']['events']['Row'];
type Space = Database['public']['Tables']['spaces']['Row'];
type Service = Database['public']['Tables']['services']['Row'];

export interface ProfileStats {
  events_count: number;
  spaces_count: number;
  services_count: number;
  followers_count: number;
  following_count: number;
  total_bookings: number;
  reviews_count: number;
  average_rating: number;
}

export interface UserContent {
  events: Event[];
  spaces: Space[];
  services: Service[];
}

export const profilesService = {
  /**
   * Get profile by username
   */
  async getProfileByUsername(username: string): Promise<Profile | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }

    return data;
  },

  /**
   * Get profile by ID
   */
  async getProfileById(id: string): Promise<Profile | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }

    return data;
  },

  /**
   * Get user's content (events, spaces, services)
   */
  async getUserContent(userId: string): Promise<UserContent> {
    const supabase = createClient();

    const [eventsResult, spacesResult, servicesResult] = await Promise.all([
      supabase
        .from('events')
        .select('*')
        .eq('organizer_id', userId)
        .order('created_at', { ascending: false }),

      supabase
        .from('spaces')
        .select('*')
        .eq('owner_id', userId)
        .order('created_at', { ascending: false }),

      supabase
        .from('services')
        .select('*')
        .eq('provider_id', userId)
        .order('created_at', { ascending: false }),
    ]);

    return {
      events: eventsResult.data || [],
      spaces: spacesResult.data || [],
      services: servicesResult.data || [],
    };
  },

  /**
   * Get user statistics
   */
  async getProfileStats(userId: string): Promise<ProfileStats> {
    const supabase = createClient();

    // Get counts in parallel
    const [
      eventsCount,
      spacesCount,
      servicesCount,
      followersCount,
      followingCount,
      bookingsCount,
      reviewsResult,
    ] = await Promise.all([
      supabase.from('events').select('id', { count: 'exact', head: true }).eq('organizer_id', userId),
      supabase.from('spaces').select('id', { count: 'exact', head: true }).eq('owner_id', userId),
      supabase.from('services').select('id', { count: 'exact', head: true }).eq('provider_id', userId),
      supabase.from('user_follows').select('id', { count: 'exact', head: true }).eq('following_id', userId),
      supabase.from('user_follows').select('id', { count: 'exact', head: true }).eq('follower_id', userId),
      supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('user_id', userId),
      supabase.from('reviews').select('rating').eq('provider_id', userId),
    ]);

    // Calculate average rating
    const reviews = reviewsResult.data || [];
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
      : 0;

    return {
      events_count: eventsCount.count || 0,
      spaces_count: spacesCount.count || 0,
      services_count: servicesCount.count || 0,
      followers_count: followersCount.count || 0,
      following_count: followingCount.count || 0,
      total_bookings: bookingsCount.count || 0,
      reviews_count: reviews.length,
      average_rating: Math.round(avgRating * 10) / 10,
    };
  },

  /**
   * Get user's followers
   */
  async getFollowers(userId: string): Promise<Profile[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('user_follows')
      .select('follower_id')
      .eq('following_id', userId);

    if (error) throw error;

    const followerIds = (data || []).map((item) => item.follower_id);

    if (followerIds.length === 0) return [];

    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .in('id', followerIds);

    if (profilesError) throw profilesError;

    return profiles || [];
  },

  /**
   * Get users that this user is following
   */
  async getFollowing(userId: string): Promise<Profile[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('user_follows')
      .select('following_id')
      .eq('follower_id', userId);

    if (error) throw error;

    const followingIds = (data || []).map((item) => item.following_id);

    if (followingIds.length === 0) return [];

    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .in('id', followingIds);

    if (profilesError) throw profilesError;

    return profiles || [];
  },

  /**
   * Follow a user
   */
  async followUser(followerId: string, followingId: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('user_follows')
      .insert({ follower_id: followerId, following_id: followingId });

    if (error) throw error;
  },

  /**
   * Unfollow a user
   */
  async unfollowUser(followerId: string, followingId: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('user_follows')
      .delete()
      .eq('follower_id', followerId)
      .eq('following_id', followingId);

    if (error) throw error;
  },

  /**
   * Check if user is following another user
   */
  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('user_follows')
      .select('id')
      .eq('follower_id', followerId)
      .eq('following_id', followingId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    return !!data;
  },
};
