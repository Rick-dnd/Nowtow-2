import { createClient } from '@/lib/supabase/client';
import type { BlogPost, BlogPostInsert, BlogPostUpdate } from '@/types/database';

export interface BlogFilters {
  categoryId?: string;
  authorId?: string;
  status?: string;
  limit?: number;
  offset?: number;
}

export interface BlogComment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
}

export const blogService = {
  async createBlogPost(data: BlogPostInsert): Promise<BlogPost> {
    const supabase = createClient();

    const { data: post, error } = await supabase
      .from('blog_posts')
      .insert(data)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create blog post: ${error.message}`);
    }

    return post;
  },

  async getBlogPost(id: string): Promise<BlogPost | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch blog post: ${error.message}`);
    }

    return data;
  },

  async getBlogPosts(filters?: BlogFilters): Promise<BlogPost[]> {
    const supabase = createClient();

    let query = supabase.from('blog_posts').select('*');

    if (filters?.categoryId) {
      query = query.eq('category_id', filters.categoryId);
    }

    if (filters?.authorId) {
      query = query.eq('author_id', filters.authorId);
    }

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(
        filters.offset,
        filters.offset + (filters.limit ?? 10) - 1
      );
    }

    const { data, error } = await query.order('created_at', {
      ascending: false,
    });

    if (error) {
      throw new Error(`Failed to fetch blog posts: ${error.message}`);
    }

    return data;
  },

  async updateBlogPost(
    id: string,
    updates: BlogPostUpdate
  ): Promise<BlogPost> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update blog post: ${error.message}`);
    }

    return data;
  },

  async deleteBlogPost(id: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase.from('blog_posts').delete().eq('id', id);

    if (error) {
      throw new Error(`Failed to delete blog post: ${error.message}`);
    }
  },

  async likeBlogPost(postId: string, userId: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('blog_likes')
      .insert({ post_id: postId, user_id: userId });

    if (error) {
      throw new Error(`Failed to like blog post: ${error.message}`);
    }
  },

  async unlikeBlogPost(postId: string, userId: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('blog_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', userId);

    if (error) {
      throw new Error(`Failed to unlike blog post: ${error.message}`);
    }
  },

  async bookmarkBlogPost(postId: string, userId: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('blog_bookmarks')
      .insert({ post_id: postId, user_id: userId });

    if (error) {
      throw new Error(`Failed to bookmark blog post: ${error.message}`);
    }
  },

  async unbookmarkBlogPost(postId: string, userId: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('blog_bookmarks')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', userId);

    if (error) {
      throw new Error(`Failed to remove bookmark: ${error.message}`);
    }
  },

  async createBlogComment(
    postId: string,
    authorId: string,
    content: string
  ): Promise<BlogComment> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('blog_comments')
      .insert({
        post_id: postId,
        author_id: authorId,
        content,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create blog comment: ${error.message}`);
    }

    return data as BlogComment;
  },

  async getBlogComments(postId: string): Promise<BlogComment[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('blog_comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch blog comments: ${error.message}`);
    }

    return data as BlogComment[];
  },

  async deleteBlogComment(id: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('blog_comments')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete blog comment: ${error.message}`);
    }
  },
};
