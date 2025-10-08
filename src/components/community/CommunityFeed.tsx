'use client';

import { useState } from 'react';
import { StoriesBar } from './StoriesBar';
import { CreatePostBox } from './CreatePostBox';
import { PostCard } from './PostCard';
import { PollDisplayData } from './PollDisplay';
import { usePosts, useVotePoll } from '@/hooks/useCommunity';
import { useUser } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

type FeedFilter = 'for_you' | 'following' | 'trending' | 'communities';

export function CommunityFeed(): React.ReactElement {
  const [activeFilter, setActiveFilter] = useState<FeedFilter>('for_you');
  const { data: user } = useUser();
  const { data: posts, isLoading, error } = usePosts({ limit: 50 }, user?.id);
  const votePollMutation = useVotePoll();

  const handleVotePoll = (postId: string, optionIndices: number[]): void => {
    if (!user) {
      toast.error('Bitte melde dich an, um abzustimmen');
      return;
    }

    const optionIndex = optionIndices[0];
    if (optionIndex === undefined) return;

    votePollMutation.mutate(
      { postId, optionIndex, userId: user.id },
      {
        onSuccess: (): void => {
          toast.success('Stimme abgegeben!');
        },
        onError: (err: Error): void => {
          if (err.message.includes('bereits abgestimmt')) {
            toast.error('Du hast bereits abgestimmt!');
          } else {
            toast.error(`Fehler: ${err.message}`);
          }
        },
      }
    );
  };

  return (
    <div className="space-y-4">
      {/* Stories Bar */}
      <StoriesBar />

      {/* Create Post Box */}
      <CreatePostBox />

      {/* Feed Filters */}
      <div className="bg-card rounded-2xl p-3 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveFilter('for_you')}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === 'for_you'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Für dich
          </button>
          <button
            onClick={() => setActiveFilter('following')}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === 'following'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Folge ich
          </button>
          <button
            onClick={() => setActiveFilter('trending')}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === 'trending'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Im Trend
          </button>
          <button
            onClick={() => setActiveFilter('communities')}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === 'communities'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Communities
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      {isLoading ? (
        <Card>
          <CardContent className="py-16 flex flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Lade Posts...</p>
          </CardContent>
        </Card>
      ) : error ? (
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-destructive">Fehler beim Laden der Posts</p>
            <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
          </CardContent>
        </Card>
      ) : (posts || []).length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-muted-foreground">Noch keine Posts vorhanden</p>
            <p className="text-sm text-muted-foreground mt-2">
              Sei der Erste und erstelle einen Post!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {(posts || []).map((post) => {
            // Transform database post to PostCard format
            const timestamp = new Date(post.created_at ?? '').toLocaleString('de-DE', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            // Poll data is now enriched in the service layer
            const pollData = post.poll_data as unknown as PollDisplayData | undefined;

            return (
              <PostCard
                key={post.id}
                post={{
                  id: post.id,
                  author: {
                    username: post.author?.username ?? post.author?.full_name ?? 'Unknown',
                    avatar: post.author?.avatar_url ?? null,
                    subscription_tier: (post.author?.subscription_tier ?? 'free') as 'free' | 'plus' | 'premium',
                  },
                  content: post.content,
                  images: post.image_url ? [post.image_url] : [],
                  timestamp,
                  likes: post.likes_count ?? 0,
                  comments: post.comments_count ?? 0,
                  visibility: 'public',
                  poll: pollData,
                }}
                onVote={handleVotePoll}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
