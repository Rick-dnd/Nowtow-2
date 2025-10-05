import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { RealtimeChannel } from '@supabase/supabase-js';

export function useRealtimeEvents(): void {
  const queryClient = useQueryClient();

  useEffect((): (() => void) => {
    const supabase = createClient();

    const channel: RealtimeChannel = supabase
      .channel('events-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'events',
        },
        (): void => {
          queryClient.invalidateQueries({ queryKey: ['events'] });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'events',
        },
        (payload): void => {
          queryClient.invalidateQueries({ queryKey: ['events'] });
          queryClient.invalidateQueries({ queryKey: ['events', payload.new.id] });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'events',
        },
        (): void => {
          queryClient.invalidateQueries({ queryKey: ['events'] });
        }
      )
      .subscribe();

    return (): void => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}

export function useRealtimeSpaces(): void {
  const queryClient = useQueryClient();

  useEffect((): (() => void) => {
    const supabase = createClient();

    const channel: RealtimeChannel = supabase
      .channel('spaces-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'spaces',
        },
        (): void => {
          queryClient.invalidateQueries({ queryKey: ['spaces'] });
        }
      )
      .subscribe();

    return (): void => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}

export function useRealtimeServices(): void {
  const queryClient = useQueryClient();

  useEffect((): (() => void) => {
    const supabase = createClient();

    const channel: RealtimeChannel = supabase
      .channel('services-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'services',
        },
        (): void => {
          queryClient.invalidateQueries({ queryKey: ['services'] });
        }
      )
      .subscribe();

    return (): void => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}

export function useRealtimeEvent(eventId: string | undefined): void {
  const queryClient = useQueryClient();

  useEffect((): (() => void) | void => {
    if (!eventId) return;

    const supabase = createClient();

    const channel: RealtimeChannel = supabase
      .channel(`event:${eventId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'events',
          filter: `id=eq.${eventId}`,
        },
        (): void => {
          queryClient.invalidateQueries({ queryKey: ['events', eventId] });
        }
      )
      .subscribe();

    return (): void => {
      supabase.removeChannel(channel);
    };
  }, [eventId, queryClient]);
}

export function useRealtimePresence(channelName: string): void {
  useEffect((): (() => void) => {
    const supabase = createClient();

    const channel: RealtimeChannel = supabase.channel(channelName, {
      config: {
        presence: {
          key: crypto.randomUUID(),
        },
      },
    });

    channel.subscribe(async (status): Promise<void> => {
      if (status === 'SUBSCRIBED') {
        await channel.track({ online_at: new Date().toISOString() });
      }
    });

    return (): void => {
      supabase.removeChannel(channel);
    };
  }, [channelName]);
}

export function useRealtimePosts(communityId?: string): void {
  const queryClient = useQueryClient();

  useEffect((): (() => void) => {
    const supabase = createClient();

    const channel: RealtimeChannel = supabase
      .channel('community-posts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'community_posts',
          filter: communityId ? `community_id=eq.${communityId}` : undefined,
        },
        (): void => {
          queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
      )
      .subscribe();

    return (): void => {
      supabase.removeChannel(channel);
    };
  }, [communityId, queryClient]);
}

export function useRealtimeMessages(conversationId?: string): void {
  const queryClient = useQueryClient();

  useEffect((): (() => void) | void => {
    if (!conversationId) return;

    const supabase = createClient();

    const channel: RealtimeChannel = supabase
      .channel(`conversation:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (): void => {
          queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
          queryClient.invalidateQueries({ queryKey: ['conversations'] });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (): void => {
          queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
        }
      )
      .subscribe();

    return (): void => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, queryClient]);
}

export function useRealtimeBlogComments(postId?: string): void {
  const queryClient = useQueryClient();

  useEffect((): (() => void) | void => {
    if (!postId) return;

    const supabase = createClient();

    const channel: RealtimeChannel = supabase
      .channel(`blog-post:${postId}:comments`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blog_comments',
          filter: `post_id=eq.${postId}`,
        },
        (): void => {
          queryClient.invalidateQueries({ queryKey: ['blog-comments', postId] });
        }
      )
      .subscribe();

    return (): void => {
      supabase.removeChannel(channel);
    };
  }, [postId, queryClient]);
}

export function useRealtimeNotifications(userId?: string): void {
  const queryClient = useQueryClient();

  useEffect((): (() => void) | void => {
    if (!userId) return;

    const supabase = createClient();

    const channel: RealtimeChannel = supabase
      .channel(`user:${userId}:notifications`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (): void => {
          queryClient.invalidateQueries({ queryKey: ['notifications', userId] });
        }
      )
      .subscribe();

    return (): void => {
      supabase.removeChannel(channel);
    };
  }, [userId, queryClient]);
}
