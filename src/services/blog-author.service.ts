import { createClient } from '@/lib/supabase/client';
import type { Profile } from '@/hooks/useAuth';


export interface AuthorStats {
  total_articles: number;
  total_views: number;
  total_likes: number;
  total_comments: number;
}

export const blogAuthorService = {
  async applyForAuthor(userId: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('profiles')
      .update({
        is_author: true,
        author_status: 'approved',
        author_applied_at: new Date().toISOString(),
        author_accepted_rules_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) {
      throw new Error(`Failed to submit author application: ${error.message}`);
    }
  },

  async getAuthorStatus(userId: string): Promise<{
    is_author: boolean | null;
    author_status: string | null;
    author_applied_at: string | null;
  } | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('profiles')
      .select('is_author, author_status, author_applied_at')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch author status: ${error.message}`);
    }

    return data;
  },

  async getAuthorStats(userId: string): Promise<AuthorStats> {
    const supabase = createClient();

    // Get total articles
    const { count: articlesCount } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('author_id', userId)
      .eq('status', 'published');

    // Get total likes
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('author_id', userId)
      .eq('status', 'published');

    const postIds = (posts || []).map((p) => p.id);

    let likesCount = 0;
    let commentsCount = 0;

    if (postIds.length > 0) {
      const { count: likes } = await supabase
        .from('blog_likes')
        .select('*', { count: 'exact', head: true })
        .in('post_id', postIds);

      const { count: comments } = await supabase
        .from('blog_comments')
        .select('*', { count: 'exact', head: true })
        .in('post_id', postIds);

      likesCount = likes ?? 0;
      commentsCount = comments ?? 0;
    }

    return {
      total_articles: articlesCount ?? 0,
      total_views: 0, // TODO: Implement view tracking
      total_likes: likesCount,
      total_comments: commentsCount,
    };
  },

  async getAllAuthors(): Promise<Profile[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('is_author', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch authors: ${error.message}`);
    }

    return data || [];
  },
};
