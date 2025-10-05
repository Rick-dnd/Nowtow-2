import { createClient } from '@/lib/supabase/client';
import type {
  CommunityPost,
  CommunityPostInsert,
  CommunityPostUpdate,
  Json,
} from '@/types/database';

export interface PostFilters {
  communityId?: string;
  authorId?: string;
  limit?: number;
  offset?: number;
}

export interface PostComment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
}

export interface PollData {
  question: string;
  options: Array<{
    text: string;
    votes: number;
  }>;
  endsAt: string;
  multiSelect: boolean;
  [key: string]: unknown;
}

export const communityService = {
  async createPost(data: CommunityPostInsert): Promise<CommunityPost> {
    const supabase = createClient();

    const { data: post, error } = await supabase
      .from('community_posts')
      .insert(data)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create post: ${error.message}`);
    }

    return post;
  },

  async getPost(id: string): Promise<CommunityPost | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('community_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch post: ${error.message}`);
    }

    return data;
  },

  async getPosts(filters?: PostFilters): Promise<CommunityPost[]> {
    const supabase = createClient();

    let query = supabase.from('community_posts').select('*');

    if (filters?.communityId) {
      query = query.eq('community_id', filters.communityId);
    }

    if (filters?.authorId) {
      query = query.eq('author_id', filters.authorId);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit ?? 10) - 1);
    }

    const { data, error } = await query.order('created_at', {
      ascending: false,
    });

    if (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }

    return data;
  },

  async updatePost(
    id: string,
    updates: CommunityPostUpdate
  ): Promise<CommunityPost> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('community_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update post: ${error.message}`);
    }

    return data;
  },

  async deletePost(id: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('community_posts')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete post: ${error.message}`);
    }
  },

  async likePost(postId: string, userId: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('post_likes')
      .insert({ post_id: postId, user_id: userId });

    if (error) {
      throw new Error(`Failed to like post: ${error.message}`);
    }
  },

  async unlikePost(postId: string, userId: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('post_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', userId);

    if (error) {
      throw new Error(`Failed to unlike post: ${error.message}`);
    }
  },

  async createComment(
    postId: string,
    authorId: string,
    content: string
  ): Promise<PostComment> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('post_comments')
      .insert({
        post_id: postId,
        author_id: authorId,
        content,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create comment: ${error.message}`);
    }

    return data as PostComment;
  },

  async getComments(postId: string): Promise<PostComment[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('post_comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch comments: ${error.message}`);
    }

    return data as PostComment[];
  },

  async createPoll(
    authorId: string,
    communityId: string | null,
    pollData: PollData
  ): Promise<CommunityPost> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('community_posts')
      .insert({
        author_id: authorId,
        community_id: communityId,
        content: pollData.question,
        post_type: 'poll',
        poll_data: pollData as unknown as Json,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create poll: ${error.message}`);
    }

    return data;
  },

  async votePoll(
    postId: string,
    optionIndex: number,
    userId: string
  ): Promise<void> {
    const supabase = createClient();

    // Get current poll data
    const { data: post, error: fetchError } = await supabase
      .from('community_posts')
      .select('poll_data')
      .eq('id', postId)
      .single();

    if (fetchError) {
      throw new Error(`Failed to fetch poll: ${fetchError.message}`);
    }

    const pollData = post.poll_data as unknown as PollData;

    // Increment vote count
    if (pollData.options[optionIndex]) {
      pollData.options[optionIndex].votes += 1;
    }

    // Update poll
    const { error: updateError } = await supabase
      .from('community_posts')
      .update({ poll_data: pollData as unknown as Json })
      .eq('id', postId);

    if (updateError) {
      throw new Error(`Failed to vote on poll: ${updateError.message}`);
    }

    // Record vote in community_poll_votes table
    await supabase.from('community_poll_votes').insert({
      post_id: postId,
      user_id: userId,
      option_index: optionIndex,
    });
  },
};
