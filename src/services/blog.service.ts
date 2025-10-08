import { createClient } from '@/lib/supabase/client';
import type { BlogPost, BlogPostInsert, BlogPostUpdate } from '@/types/database';

export interface BlogFilters {
  categoryId?: string;
  authorId?: string;
  status?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
  searchQuery?: string;
}

export interface BlogPostWithAuthor extends BlogPost {
  author?: {
    id: string;
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
    subscription_tier?: string | null;
  };
  likes_count?: number;
  comments_count?: number;
}

export interface BlogComment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
}

export interface BlogCommentWithAuthor extends BlogComment {
  author?: {
    id: string;
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
    subscription_tier?: string | null;
  };
}

export interface AuthorWithStats {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  subscription_tier?: string | null;
  articles_count: number;
  total_views: number;
}

export interface AuthorProfile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  author_bio: string | null;
  location: string | null;
  subscription_tier?: string | null;
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

  async getBlogPost(id: string): Promise<BlogPostWithAuthor | null> {
    const supabase = createClient();

    const { data: post, error } = await supabase
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

    // Fetch author separately
    if (post.author_id) {
      const { data: author } = await supabase
        .from('profiles')
        .select('id, username, full_name, avatar_url, subscription_tier')
        .eq('id', post.author_id)
        .single();

      return { ...post, author: author ?? undefined } as BlogPostWithAuthor;
    }

    return post as BlogPostWithAuthor;
  },

  async getBlogPosts(filters?: BlogFilters): Promise<BlogPostWithAuthor[]> {
    const supabase = createClient();

    let query = supabase.from('blog_posts').select('*');

    // Only published posts
    query = query.eq('status', filters?.status ?? 'published');

    if (filters?.categoryId) {
      query = query.eq('category_id', filters.categoryId);
    }

    if (filters?.authorId) {
      query = query.eq('author_id', filters.authorId);
    }

    if (filters?.featured) {
      query = query.eq('featured', true);
    }

    if (filters?.searchQuery) {
      query = query.or(`title.ilike.%${filters.searchQuery}%,content.ilike.%${filters.searchQuery}%`);
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

    const { data: posts, error } = await query.order('created_at', {
      ascending: false,
    });

    if (error) {
      throw new Error(`Failed to fetch blog posts: ${error.message}`);
    }

    if (!posts || posts.length === 0) {
      return [];
    }

    // Fetch authors for all posts
    const authorIds = [...new Set(posts.map(p => p.author_id))];
    const { data: authors } = await supabase
      .from('profiles')
      .select('id, username, full_name, avatar_url, subscription_tier')
      .in('id', authorIds);

    // Create author lookup map
    const authorMap = new Map(
      (authors || []).map(author => [author.id, author])
    );

    // Attach authors to posts
    return posts.map(post => ({
      ...post,
      author: authorMap.get(post.author_id),
    })) as BlogPostWithAuthor[];
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

  async getBlogComments(postId: string): Promise<BlogCommentWithAuthor[]> {
    const supabase = createClient();

    const { data: comments, error } = await supabase
      .from('blog_comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch blog comments: ${error.message}`);
    }

    if (!comments || comments.length === 0) {
      return [];
    }

    // Fetch authors for all comments
    const authorIds = [...new Set(comments.map(c => c.author_id))];
    const { data: authors } = await supabase
      .from('profiles')
      .select('id, username, full_name, avatar_url, subscription_tier')
      .in('id', authorIds);

    // Create author lookup map
    const authorMap = new Map(
      (authors || []).map(author => [author.id, author])
    );

    // Attach authors to comments
    return comments.map(comment => ({
      ...comment,
      author: authorMap.get(comment.author_id),
    })) as BlogCommentWithAuthor[];
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

  async getBlogStats(): Promise<{
    total_articles: number;
    total_comments: number;
    categories: Array<{ name: string; count: number }>;
  }> {
    const supabase = createClient();

    // Get total published articles
    const { count: articlesCount } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published');

    // Get total comments
    const { count: commentsCount } = await supabase
      .from('blog_comments')
      .select('*', { count: 'exact', head: true });

    // Get categories with counts
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('category')
      .eq('status', 'published');

    const categoryMap = new Map<string, number>();
    (posts || []).forEach((post) => {
      if (post.category) {
        categoryMap.set(post.category, (categoryMap.get(post.category) ?? 0) + 1);
      }
    });

    const categories = Array.from(categoryMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return {
      total_articles: articlesCount ?? 0,
      total_comments: commentsCount ?? 0,
      categories,
    };
  },

  async getPopularBlogPosts(limit = 5): Promise<BlogPostWithAuthor[]> {
    const supabase = createClient();

    // Get posts with their like counts
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(limit * 3); // Get more to sort by likes

    if (!posts || posts.length === 0) {
      return [];
    }

    // Get like counts for each post
    const postIds = posts.map((p) => p.id);
    const { data: likes } = await supabase
      .from('blog_likes')
      .select('post_id')
      .in('post_id', postIds);

    // Count likes per post
    const likeCountMap = new Map<string, number>();
    (likes || []).forEach((like) => {
      likeCountMap.set(
        like.post_id,
        (likeCountMap.get(like.post_id) ?? 0) + 1
      );
    });

    // Sort by likes and take top N
    const sortedPosts = posts
      .sort((a, b) => {
        const aLikes = likeCountMap.get(a.id) ?? 0;
        const bLikes = likeCountMap.get(b.id) ?? 0;
        return bLikes - aLikes;
      })
      .slice(0, limit);

    // Fetch authors for sorted posts
    const authorIds = [...new Set(sortedPosts.map((p) => p.author_id))];
    const { data: authors } = await supabase
      .from('profiles')
      .select('id, username, full_name, avatar_url, subscription_tier')
      .in('id', authorIds);

    const authorMap = new Map(
      (authors || []).map((author) => [author.id, author])
    );

    return sortedPosts.map((post) => ({
      ...post,
      author: authorMap.get(post.author_id),
      likes_count: likeCountMap.get(post.id) ?? 0,
    })) as BlogPostWithAuthor[];
  },

  async getAuthors(): Promise<AuthorWithStats[]> {
    const supabase = createClient();

    // Get all authors from profiles
    const { data: authors, error: authorsError } = await supabase
      .from('profiles')
      .select('id, username, full_name, avatar_url, subscription_tier, articles_count')
      .eq('is_author', true);

    if (authorsError) {
      throw new Error(`Failed to fetch authors: ${authorsError.message}`);
    }

    if (!authors || authors.length === 0) {
      return [];
    }

    // Get published article counts for each author
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('author_id, view_count')
      .eq('status', 'published');

    // Create a map of author stats
    const statsMap = new Map<string, { articles: number; views: number }>();
    (posts || []).forEach((post) => {
      const current = statsMap.get(post.author_id) ?? { articles: 0, views: 0 };
      statsMap.set(post.author_id, {
        articles: current.articles + 1,
        views: current.views + (post.view_count ?? 0),
      });
    });

    // Combine author data with stats
    return authors
      .map((author) => {
        const stats = statsMap.get(author.id) ?? { articles: 0, views: 0 };
        return {
          id: author.id,
          username: author.username,
          full_name: author.full_name,
          avatar_url: author.avatar_url,
          subscription_tier: author.subscription_tier,
          articles_count: stats.articles,
          total_views: stats.views,
        };
      })
      .sort((a, b) => b.articles_count - a.articles_count);
  },

  async getAuthorByUsername(username: string): Promise<AuthorProfile | null> {
    const supabase = createClient();

    const { data: author, error } = await supabase
      .from('profiles')
      .select('id, username, full_name, avatar_url, author_bio, location, subscription_tier, created_at')
      .eq('username', username)
      .eq('is_author', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch author profile: ${error.message}`);
    }

    return author as AuthorProfile;
  },
};
