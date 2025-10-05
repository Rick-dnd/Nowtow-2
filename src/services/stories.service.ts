import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/database';

type Story = Database['public']['Tables']['community_stories']['Row'];
type StoryInsert = Database['public']['Tables']['community_stories']['Insert'];
type StoryUpdate = Database['public']['Tables']['community_stories']['Update'];

export interface StoryFilters {
  userId?: string;
  isHighlight?: boolean;
  limit?: number;
  offset?: number;
}

export const storiesService = {
  /**
   * Get all active stories (not expired)
   * Stories auto-expire after 24h via expires_at field
   */
  async getActiveStories(filters?: StoryFilters): Promise<Story[]> {
    const supabase = createClient();

    let query = supabase
      .from('community_stories')
      .select('*')
      .gt('expires_at', new Date().toISOString()) // Only non-expired stories
      .order('created_at', { ascending: false });

    if (filters?.userId) {
      query = query.eq('user_id', filters.userId);
    }

    if (filters?.isHighlight !== undefined) {
      query = query.eq('is_highlight', filters.isHighlight);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch stories: ${error.message}`);
    }

    return data || [];
  },

  /**
   * Get a single story by ID
   */
  async getStory(id: string): Promise<Story | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('community_stories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch story: ${error.message}`);
    }

    return data;
  },

  /**
   * Create a new story
   * Auto-expires after 24 hours (handled by database default)
   */
  async createStory(story: StoryInsert): Promise<Story> {
    const supabase = createClient();

    // If expires_at not provided, set to 24 hours from now
    const storyData: StoryInsert = {
      ...story,
      expires_at: story.expires_at || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    const { data, error } = await supabase
      .from('community_stories')
      .insert(storyData)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create story: ${error.message}`);
    }

    return data;
  },

  /**
   * Update an existing story
   */
  async updateStory(id: string, updates: StoryUpdate): Promise<Story> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('community_stories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update story: ${error.message}`);
    }

    return data;
  },

  /**
   * Delete a story manually (stories also auto-delete after 24h)
   */
  async deleteStory(id: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('community_stories')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete story: ${error.message}`);
    }
  },

  /**
   * Get stories for the stories bar (grouped by user, showing latest per user)
   */
  async getStoriesBarData(): Promise<Array<{ userId: string; stories: Story[] }>> {
    const supabase = createClient();

    const { data: stories, error } = await supabase
      .from('community_stories')
      .select('*')
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch stories bar data: ${error.message}`);
    }

    // Group stories by user_id
    const storiesByUser = new Map<string, Story[]>();

    stories?.forEach((story) => {
      if (!story.user_id) return;

      if (!storiesByUser.has(story.user_id)) {
        storiesByUser.set(story.user_id, []);
      }
      storiesByUser.get(story.user_id)?.push(story);
    });

    return Array.from(storiesByUser.entries()).map(([userId, userStories]) => ({
      userId,
      stories: userStories,
    }));
  },

  /**
   * Increment view count for a story
   */
  async incrementViewCount(id: string): Promise<void> {
    const supabase = createClient();

    const { data: story } = await supabase
      .from('community_stories')
      .select('view_count')
      .eq('id', id)
      .single();

    if (!story) {
      throw new Error('Story not found');
    }

    const { error } = await supabase
      .from('community_stories')
      .update({ view_count: (story.view_count ?? 0) + 1 })
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to increment view count: ${error.message}`);
    }
  },

  /**
   * Save a story to highlights (prevents auto-delete)
   */
  async saveToHighlights(id: string): Promise<Story> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('community_stories')
      .update({ is_highlight: true })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to save story to highlights: ${error.message}`);
    }

    return data;
  },

  /**
   * Get user's highlight stories
   */
  async getHighlights(userId: string): Promise<Story[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('community_stories')
      .select('*')
      .eq('user_id', userId)
      .eq('is_highlight', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch highlights: ${error.message}`);
    }

    return data || [];
  },

  /**
   * Delete expired stories manually
   * Note: This is typically handled by a database trigger/cron job
   */
  async deleteExpiredStories(): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('community_stories')
      .delete()
      .lt('expires_at', new Date().toISOString())
      .eq('is_highlight', false); // Don't delete highlights

    if (error) {
      throw new Error(`Failed to delete expired stories: ${error.message}`);
    }
  },
};
