import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { RealtimeChannel } from '@supabase/supabase-js';

export interface UserPresence {
  user_id: string;
  online_at: string;
  username?: string;
}

export function usePresence(channelName: string, userId?: string): {
  onlineUsers: UserPresence[];
  isOnline: (checkUserId: string) => boolean;
} {
  const [onlineUsers, setOnlineUsers] = useState<UserPresence[]>([]);

  useEffect((): (() => void) | void => {
    if (!userId) return;

    const supabase = createClient();

    // Create and subscribe to presence channel
    const presenceChannel = supabase.channel(channelName, {
      config: {
        presence: {
          key: userId,
        },
      },
    });

    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannel.presenceState<UserPresence>();
        const users: UserPresence[] = [];

        Object.values(state).forEach((presences) => {
          presences.forEach((presence) => {
            users.push(presence as UserPresence);
          });
        });

        setOnlineUsers(users);
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log('New users joined:', newPresences);
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        console.log('Users left:', leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          // Track current user's presence
          await presenceChannel.track({
            user_id: userId,
            online_at: new Date().toISOString(),
          });
        }
      });

    // Cleanup on unmount
    return (): void => {
      if (presenceChannel) {
        presenceChannel.untrack();
        presenceChannel.unsubscribe();
      }
    };
  }, [channelName, userId]);

  const isOnline = (checkUserId: string): boolean => {
    return onlineUsers.some((user) => user.user_id === checkUserId);
  };

  return {
    onlineUsers,
    isOnline,
  };
}

export function useTypingIndicator(channelName: string, userId?: string): {
  typingUsers: string[];
  startTyping: () => Promise<void>;
  stopTyping: () => Promise<void>;
} {
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect((): (() => void) | void => {
    if (!userId) return;

    const supabase = createClient();

    const typingChannel = supabase.channel(`${channelName}-typing`);

    typingChannel
      .on('broadcast', { event: 'typing' }, ({ payload }) => {
        const { user_id, typing } = payload as { user_id: string; typing: boolean };

        setTypingUsers((prev) => {
          if (typing && !prev.includes(user_id)) {
            return [...prev, user_id];
          } else if (!typing) {
            return prev.filter((id) => id !== user_id);
          }
          return prev;
        });
      })
      .subscribe();

    setChannel(typingChannel);

    return (): void => {
      if (typingChannel) {
        typingChannel.unsubscribe();
      }
    };
  }, [channelName, userId]);

  const startTyping = async (): Promise<void> => {
    if (channel && userId) {
      await channel.send({
        type: 'broadcast',
        event: 'typing',
        payload: { user_id: userId, typing: true },
      });
    }
  };

  const stopTyping = async (): Promise<void> => {
    if (channel && userId) {
      await channel.send({
        type: 'broadcast',
        event: 'typing',
        payload: { user_id: userId, typing: false },
      });
    }
  };

  return {
    typingUsers,
    startTyping,
    stopTyping,
  };
}
