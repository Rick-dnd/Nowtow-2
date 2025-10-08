import { createClient } from '@/lib/supabase/client';
import type { BlogPostWithAuthor } from '@/services/blog.service';

export interface FollowStatus {
  isFollowing: boolean;
}

export interface UserStats {
  followers_count: number;
  following_count: number;
}

export const userService = {
  /**
   * Follow a user
   */
  async followUser(followerId: string, followingId: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('user_follows')
      .insert({
        follower_id: followerId,
        following_id: followingId,
      });

    if (error) {
      throw new Error(`Failed to follow user: ${error.message}`);
    }
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

    if (error) {
      throw new Error(`Failed to unfollow user: ${error.message}`);
    }
  },

  /**
   * Check if user A follows user B
   */
  async getFollowStatus(
    followerId: string,
    followingId: string
  ): Promise<boolean> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('user_follows')
      .select('id')
      .eq('follower_id', followerId)
      .eq('following_id', followingId)
      .maybeSingle();

    if (error) {
      console.error('Failed to check follow status:', error);
      return false;
    }

    return !!data;
  },

  /**
   * Get list of user's followers
   */
  async getFollowers(userId: string): Promise<string[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('user_follows')
      .select('follower_id')
      .eq('following_id', userId);

    if (error) {
      throw new Error(`Failed to fetch followers: ${error.message}`);
    }

    return (data || []).map((follow) => follow.follower_id);
  },

  /**
   * Get list of users that this user follows
   */
  async getFollowing(userId: string): Promise<string[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('user_follows')
      .select('following_id')
      .eq('follower_id', userId);

    if (error) {
      throw new Error(`Failed to fetch following: ${error.message}`);
    }

    return (data || []).map((follow) => follow.following_id);
  },

  /**
   * Get user's follower and following counts
   */
  async getUserStats(userId: string): Promise<UserStats> {
    const supabase = createClient();

    // Get followers count
    const { count: followersCount } = await supabase
      .from('user_follows')
      .select('*', { count: 'exact', head: true })
      .eq('following_id', userId);

    // Get following count
    const { count: followingCount } = await supabase
      .from('user_follows')
      .select('*', { count: 'exact', head: true })
      .eq('follower_id', userId);

    return {
      followers_count: followersCount ?? 0,
      following_count: followingCount ?? 0,
    };
  },

  /**
   * Get user's bookmarked blog posts
   */
  async getUserBookmarks(userId: string): Promise<BlogPostWithAuthor[]> {
    const supabase = createClient();

    // Get bookmarked post IDs
    const { data: bookmarks, error: bookmarksError } = await supabase
      .from('blog_bookmarks')
      .select('post_id')
      .eq('user_id', userId);

    if (bookmarksError) {
      throw new Error(`Failed to fetch bookmarks: ${bookmarksError.message}`);
    }

    if (!bookmarks || bookmarks.length === 0) {
      return [];
    }

    const postIds = bookmarks.map((b) => b.post_id);

    // Fetch full post data
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select('*')
      .in('id', postIds)
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (postsError) {
      throw new Error(`Failed to fetch bookmarked posts: ${postsError.message}`);
    }

    if (!posts || posts.length === 0) {
      return [];
    }

    // Fetch authors for all posts
    const authorIds = [...new Set(posts.map((p) => p.author_id))];
    const { data: authors } = await supabase
      .from('profiles')
      .select('id, username, full_name, avatar_url, subscription_tier')
      .in('id', authorIds);

    // Create author lookup map
    const authorMap = new Map(
      (authors || []).map((author) => [author.id, author])
    );

    // Attach authors to posts
    return posts.map((post) => ({
      ...post,
      author: authorMap.get(post.author_id),
    })) as BlogPostWithAuthor[];
  },

  /**
   * Check if user has liked a specific blog post
   */
  async getLikeStatus(userId: string, postId: string): Promise<boolean> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('blog_likes')
      .select('id')
      .eq('user_id', userId)
      .eq('post_id', postId)
      .maybeSingle();

    if (error) {
      console.error('Failed to check like status:', error);
      return false;
    }

    return !!data;
  },

  /**
   * Check if user has bookmarked a specific blog post
   */
  async getBookmarkStatus(userId: string, postId: string): Promise<boolean> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('blog_bookmarks')
      .select('id')
      .eq('user_id', userId)
      .eq('post_id', postId)
      .maybeSingle();

    if (error) {
      console.error('Failed to check bookmark status:', error);
      return false;
    }

    return !!data;
  },
};
