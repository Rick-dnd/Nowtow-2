import { createClient } from '@/lib/supabase/client';
import type {
  CommunityPost,
  CommunityPostInsert,
  CommunityPostUpdate,
  Json,
  Database,
} from '@/types/database';

type Community = Database['public']['Tables']['communities']['Row'];
type CommunityMember = Database['public']['Tables']['community_members']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

export interface PostFilters {
  communityId?: string;
  authorId?: string;
  limit?: number;
  offset?: number;
}

export interface CommunityFilters {
  category?: string;
  privacy?: string;
  searchQuery?: string;
  limit?: number;
  offset?: number;
}

export interface CommunityWithCreator extends Community {
  creator?: Profile;
  moderators?: Profile[];
}

export interface CommunityWithMemberInfo {
  id: string;
  community_id: string | null;
  user_id: string | null;
  role: string | null;
  joined_at: string | null;
  community: {
    id: string;
    name: string | null;
    slug: string | null;
    image_url: string | null;
  };
}

export interface CommunityMemberWithProfile extends CommunityMember {
  profiles?: {
    id: string;
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
  } | null;
}

export interface CommunityPostWithAuthor extends CommunityPost {
  author?: {
    id: string;
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
    subscription_tier?: string | null;
  };
}

export interface PostComment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
}

export interface PostCommentWithAuthor extends PostComment {
  author?: {
    id: string;
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
    subscription_tier?: string | null;
  };
}

export interface PollData {
  question: string;
  options: Array<{
    text: string;
    votes: number;
  }>;
  endsAt: string;
  multiSelect: boolean;
  totalVotes?: number;
  hasVoted?: boolean;
  userVotes?: number[];
  [key: string]: unknown;
}

/**
 * Enriches a post with poll vote statistics calculated from community_poll_votes table
 * This ensures vote counts are always accurate and prevents race conditions
 */
async function enrichPostWithPollVotes(
  post: CommunityPost | CommunityPostWithAuthor,
  userId?: string
): Promise<CommunityPost | CommunityPostWithAuthor> {
  if (!post.poll_data) return post;

  const supabase = createClient();
  const pollData = post.poll_data as unknown as PollData;

  // Fetch all votes for this post
  const { data: votes, error: votesError } = await supabase
    .from('community_poll_votes')
    .select('option_index')
    .eq('post_id', post.id);

  if (votesError) {
    console.error('Failed to fetch poll votes:', votesError);
    return post;
  }

  // Count votes per option
  const voteCounts: Record<number, number> = {};
  (votes ?? []).forEach((vote) => {
    const idx = vote.option_index;
    voteCounts[idx] = (voteCounts[idx] ?? 0) + 1;
  });

  // Enrich options with vote counts
  pollData.options = pollData.options.map((option, index) => ({
    ...option,
    votes: voteCounts[index] ?? 0,
  }));

  // Calculate total votes
  pollData.totalVotes = votes?.length ?? 0;

  // Check if user has voted and get their vote
  if (userId) {
    const { data: userVote, error: userVoteError } = await supabase
      .from('community_poll_votes')
      .select('option_index')
      .eq('post_id', post.id)
      .eq('user_id', userId)
      .maybeSingle();

    if (!userVoteError) {
      pollData.hasVoted = !!userVote;
      pollData.userVotes = userVote ? [userVote.option_index] : [];
    }
  } else {
    pollData.hasVoted = false;
    pollData.userVotes = [];
  }

  return {
    ...post,
    poll_data: pollData as unknown as Json,
  };
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

  async getPost(id: string, userId?: string): Promise<CommunityPost | null> {
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

    // Enrich with poll vote statistics
    const enrichedPost = await enrichPostWithPollVotes(data, userId);
    return enrichedPost as CommunityPost;
  },

  async getPostWithAuthor(id: string, userId?: string): Promise<CommunityPostWithAuthor | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('community_posts')
      .select(`
        *,
        author:profiles!community_posts_author_id_fkey (
          id,
          username,
          full_name,
          avatar_url,
          subscription_tier
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch post: ${error.message}`);
    }

    // Enrich with poll vote statistics
    const enrichedPost = await enrichPostWithPollVotes(data as CommunityPostWithAuthor, userId);
    return enrichedPost as CommunityPostWithAuthor;
  },

  async getPosts(filters?: PostFilters, userId?: string): Promise<CommunityPostWithAuthor[]> {
    const supabase = createClient();

    let query = supabase.from('community_posts').select(`
      *,
      author:profiles!community_posts_author_id_fkey (
        id,
        username,
        full_name,
        avatar_url,
        subscription_tier
      )
    `);

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

    // Enrich posts with poll vote statistics
    const enrichedPosts = await Promise.all(
      (data as CommunityPostWithAuthor[]).map((post) => enrichPostWithPollVotes(post, userId))
    );

    return enrichedPosts as CommunityPostWithAuthor[];
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

    // 1. Insert like
    const { error: likeError } = await supabase
      .from('post_likes')
      .insert({ post_id: postId, user_id: userId });

    if (likeError) {
      throw new Error(`Failed to like post: ${likeError.message}`);
    }

    // 2. Increment count via RPC
    const { error: rpcError } = await supabase.rpc('increment_post_likes', {
      post_id_param: postId,
    });

    if (rpcError) {
      throw new Error(`Failed to increment like count: ${rpcError.message}`);
    }
  },

  async unlikePost(postId: string, userId: string): Promise<void> {
    const supabase = createClient();

    // 1. Delete like
    const { error: unlikeError } = await supabase
      .from('post_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', userId);

    if (unlikeError) {
      throw new Error(`Failed to unlike post: ${unlikeError.message}`);
    }

    // 2. Decrement count via RPC
    const { error: rpcError } = await supabase.rpc('decrement_post_likes', {
      post_id_param: postId,
    });

    if (rpcError) {
      throw new Error(`Failed to decrement like count: ${rpcError.message}`);
    }
  },

  async checkUserLikedPost(postId: string, userId: string): Promise<boolean> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('post_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to check like status: ${error.message}`);
    }

    return !!data;
  },

  async createComment(
    postId: string,
    authorId: string,
    content: string
  ): Promise<PostComment> {
    const supabase = createClient();

    // 1. Insert comment
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

    // 2. Increment comment count via RPC
    const { error: rpcError } = await supabase.rpc('increment_post_comments', {
      post_id_param: postId,
    });

    if (rpcError) {
      throw new Error(`Failed to increment comment count: ${rpcError.message}`);
    }

    return data as PostComment;
  },

  async getComments(postId: string): Promise<PostCommentWithAuthor[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('post_comments')
      .select(`
        *,
        author:profiles!post_comments_author_id_fkey (
          id,
          username,
          full_name,
          avatar_url,
          subscription_tier
        )
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch comments: ${error.message}`);
    }

    return data as PostCommentWithAuthor[];
  },

  async deleteComment(commentId: string, postId: string): Promise<void> {
    const supabase = createClient();

    // 1. Delete comment
    const { error: deleteError } = await supabase
      .from('post_comments')
      .delete()
      .eq('id', commentId);

    if (deleteError) {
      throw new Error(`Failed to delete comment: ${deleteError.message}`);
    }

    // 2. Decrement comment count via RPC
    const { error: rpcError } = await supabase.rpc('decrement_post_comments', {
      post_id_param: postId,
    });

    if (rpcError) {
      throw new Error(`Failed to decrement comment count: ${rpcError.message}`);
    }
  },

  async createPoll(
    authorId: string,
    communityId: string | null,
    pollData: PollData
  ): Promise<CommunityPost> {
    const supabase = createClient();

    // Remove votes from options if present (votes are calculated dynamically)
    const cleanedPollData = {
      ...pollData,
      options: pollData.options.map(({ text }) => ({ text })),
    };

    const { data, error } = await supabase
      .from('community_posts')
      .insert({
        author_id: authorId,
        community_id: communityId,
        content: pollData.question,
        poll_data: cleanedPollData as unknown as Json,
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

    // Check if user has already voted
    const { data: existingVote, error: checkError } = await supabase
      .from('community_poll_votes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .maybeSingle();

    if (checkError) {
      throw new Error(`Failed to check vote status: ${checkError.message}`);
    }

    if (existingVote) {
      throw new Error('Du hast bereits abgestimmt');
    }

    // Insert vote (database unique constraint prevents duplicates)
    const { error: insertError } = await supabase
      .from('community_poll_votes')
      .insert({
        post_id: postId,
        user_id: userId,
        option_index: optionIndex,
      });

    if (insertError) {
      // Handle unique constraint violation
      if (insertError.code === '23505') {
        throw new Error('Du hast bereits abgestimmt');
      }
      throw new Error(`Failed to vote: ${insertError.message}`);
    }

    // No need to update poll_data JSON - votes are calculated dynamically
  },

  // ===== COMMUNITY MANAGEMENT =====

  /**
   * Get all communities with optional filters
   */
  async getCommunities(filters?: CommunityFilters): Promise<Community[]> {
    const supabase = createClient();

    let query = supabase.from('communities').select('*');

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.privacy) {
      query = query.eq('privacy', filters.privacy);
    }

    if (filters?.searchQuery) {
      query = query.or(
        `name.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%`
      );
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

    const { data, error } = await query.order('members_count', {
      ascending: false,
    });

    if (error) {
      throw new Error(`Failed to fetch communities: ${error.message}`);
    }

    return data;
  },

  /**
   * Get user's communities with full info
   */
  async getUserCommunities(
    userId: string
  ): Promise<CommunityWithMemberInfo[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('community_members')
      .select(
        `
        *,
        community:communities!community_members_community_id_fkey (
          id,
          name,
          slug,
          image_url
        )
      `
      )
      .eq('user_id', userId);

    if (error) {
      throw new Error(`Failed to fetch user communities: ${error.message}`);
    }

    return data as CommunityWithMemberInfo[];
  },

  /**
   * Get community by slug
   */
  async getCommunityBySlug(slug: string): Promise<CommunityWithCreator | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('communities')
      .select('*, creator:profiles!communities_creator_id_fkey(*)')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch community: ${error.message}`);
    }

    // Get moderators
    const { data: memberData } = await supabase
      .from('community_members')
      .select('user_id, role, profiles(*)')
      .eq('community_id', data.id)
      .in('role', ['moderator', 'admin']);

    const moderators = (memberData || [])
      .map((m) => m.profiles as Profile)
      .filter(Boolean);

    return {
      ...data,
      creator: data.creator as Profile,
      moderators,
    };
  },

  /**
   * Get community by ID
   */
  async getCommunityById(id: string): Promise<Community | null> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('communities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch community: ${error.message}`);
    }

    return data;
  },

  /**
   * Get community members with profile data
   */
  async getCommunityMembers(communityId: string): Promise<CommunityMemberWithProfile[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('community_members')
      .select('*, profiles!community_members_user_id_fkey(id, username, full_name, avatar_url)')
      .eq('community_id', communityId)
      .order('joined_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch community members: ${error.message}`);
    }

    return data;
  },

  /**
   * Join a community
   */
  async joinCommunity(communityId: string, userId: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase.from('community_members').insert({
      community_id: communityId,
      user_id: userId,
      role: 'member',
    });

    if (error) {
      throw new Error(`Failed to join community: ${error.message}`);
    }

    // Increment members count
    await supabase.rpc('increment_community_members', {
      community_id: communityId,
    });
  },

  /**
   * Leave a community
   */
  async leaveCommunity(communityId: string, userId: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from('community_members')
      .delete()
      .eq('community_id', communityId)
      .eq('user_id', userId);

    if (error) {
      throw new Error(`Failed to leave community: ${error.message}`);
    }

    // Decrement members count
    await supabase.rpc('decrement_community_members', {
      community_id: communityId,
    });
  },

  /**
   * Check if user is a member of community
   */
  async isCommunityMember(
    communityId: string,
    userId: string
  ): Promise<boolean> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('community_members')
      .select('id')
      .eq('community_id', communityId)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to check membership: ${error.message}`);
    }

    return !!data;
  },

  /**
   * Create a new community
   */
  async createCommunity(
    creatorId: string,
    data: {
      name: string;
      slug: string;
      description: string;
      category: string;
      privacy: string;
      rules?: string[];
      tags?: string[];
      image_url?: string;
    }
  ): Promise<Community> {
    const supabase = createClient();

    // 1. Create community
    const { data: community, error: createError } = await supabase
      .from('communities')
      .insert({
        creator_id: creatorId,
        name: data.name,
        slug: data.slug,
        description: data.description,
        category: data.category,
        privacy: data.privacy,
        rules: data.rules ?? null,
        tags: data.tags ?? null,
        image_url: data.image_url ?? null,
      })
      .select()
      .single();

    if (createError) {
      throw new Error(`Failed to create community: ${createError.message}`);
    }

    // 2. Add creator as member with 'owner' role
    const { error: memberError } = await supabase
      .from('community_members')
      .insert({
        community_id: community.id,
        user_id: creatorId,
        role: 'owner',
      });

    if (memberError) {
      throw new Error(`Failed to add creator as member: ${memberError.message}`);
    }

    // 3. Increment members count
    await supabase.rpc('increment_community_members', {
      community_id: community.id,
    });

    return community as Community;
  },

  /**
   * Update an existing community
   */
  async updateCommunity(
    communityId: string,
    data: {
      name?: string;
      description?: string;
      category?: string;
      privacy?: string;
      rules?: string[];
      tags?: string[];
      image_url?: string;
    }
  ): Promise<Community> {
    const supabase = createClient();

    const { data: community, error } = await supabase
      .from('communities')
      .update({
        ...(data.name !== undefined && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.privacy !== undefined && { privacy: data.privacy }),
        ...(data.rules !== undefined && { rules: data.rules }),
        ...(data.tags !== undefined && { tags: data.tags }),
        ...(data.image_url !== undefined && { image_url: data.image_url }),
      })
      .eq('id', communityId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update community: ${error.message}`);
    }

    return community as Community;
  },
};
