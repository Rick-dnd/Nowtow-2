'use client';

import { TrendingUp, Users, Loader2, User } from 'lucide-react';
import { usePosts } from '@/hooks/useCommunity';
import { useCommunities } from '@/hooks/useCommunities';
import { useMemo } from 'react';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface PostDetailSidebarProps {
  currentPostId: string;
  communityId?: string | null;
  authorId?: string | null;
  authorUsername?: string | null;
}

const communityColors = [
  'from-purple-500 to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-green-500 to-emerald-500',
  'from-orange-500 to-red-500',
  'from-indigo-500 to-purple-500',
];

export function PostDetailSidebar({ currentPostId, communityId, authorId, authorUsername }: PostDetailSidebarProps): React.ReactElement {
  // Fetch related posts from same community
  const { data: communityPosts, isLoading: communityPostsLoading } = usePosts(
    communityId ? { communityId, limit: 10 } : undefined
  );

  // Fetch more posts from author
  const { data: authorPosts, isLoading: authorPostsLoading } = usePosts(
    authorId ? { authorId, limit: 10 } : undefined
  );

  // Fetch trending communities
  const { data: allCommunities, isLoading: communitiesLoading } = useCommunities({ limit: 100 });

  // Filter out current post and take top 3
  const relatedCommunityPosts = useMemo(() => {
    if (!communityPosts) return [];
    return communityPosts
      .filter((post) => post.id !== currentPostId)
      .slice(0, 3);
  }, [communityPosts, currentPostId]);

  const relatedAuthorPosts = useMemo(() => {
    if (!authorPosts) return [];
    return authorPosts
      .filter((post) => post.id !== currentPostId)
      .slice(0, 3);
  }, [authorPosts, currentPostId]);

  // Sort communities by member count and take top 3
  const trendingCommunities = useMemo(() => {
    if (!allCommunities) return [];
    const sorted = [...allCommunities]
      .sort((a, b) => (b.members_count ?? 0) - (a.members_count ?? 0))
      .slice(0, 3);

    // Debug: Log community images
    console.log('🖼️ Community Images Debug:',
      sorted.map(c => ({
        name: c.name,
        image_url: c.image_url,
        has_image: !!c.image_url
      }))
    );

    return sorted;
  }, [allCommunities]);

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Gerade eben';
    if (diffMins < 60) return `vor ${diffMins}m`;
    if (diffHours < 24) return `vor ${diffHours}h`;
    if (diffDays < 7) return `vor ${diffDays}d`;
    return date.toLocaleDateString('de-DE');
  };

  return (
    <div className="space-y-4">
      {/* More from Author */}
      {authorId && relatedAuthorPosts.length > 0 && (
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <User className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Mehr von @{authorUsername ?? 'user'}</h3>
          </div>
          {authorPostsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-3">
              {relatedAuthorPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/community/post/${post.id}`}
                  className="block p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <Avatar className="w-6 h-6 flex-shrink-0">
                      {post.author?.avatar_url && (
                        <AvatarImage src={post.author.avatar_url} alt={post.author.username ?? 'User'} />
                      )}
                      <AvatarFallback className="bg-gradient-to-br from-primary to-emerald-600 text-white text-xs">
                        {post.author?.username?.[0]?.toUpperCase() ?? 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">
                        @{post.author?.username ?? 'Unbekannt'} · {formatTimestamp(post.created_at ?? '')}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm line-clamp-3">{post.content}</p>
                  {(post.likes_count ?? 0) > 0 && (
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>❤️ {post.likes_count}</span>
                      <span>💬 {post.comments_count ?? 0}</span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Related Posts from Community */}
      {communityId && relatedCommunityPosts.length > 0 && (
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Ähnliche Beiträge</h3>
          </div>
          {communityPostsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-3">
              {relatedCommunityPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/community/post/${post.id}`}
                  className="block p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <Avatar className="w-6 h-6 flex-shrink-0">
                      {post.author?.avatar_url && (
                        <AvatarImage src={post.author.avatar_url} alt={post.author.username ?? 'User'} />
                      )}
                      <AvatarFallback className="bg-gradient-to-br from-primary to-emerald-600 text-white text-xs">
                        {post.author?.username?.[0]?.toUpperCase() ?? 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">
                        @{post.author?.username ?? 'Unbekannt'} · {formatTimestamp(post.created_at ?? '')}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm line-clamp-3">{post.content}</p>
                  {(post.likes_count ?? 0) > 0 && (
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>❤️ {post.likes_count}</span>
                      <span>💬 {post.comments_count ?? 0}</span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Trending Communities */}
      <div className="bg-card rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Beliebte Communities</h3>
        </div>
        {communitiesLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : trendingCommunities.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Keine Communities gefunden
          </p>
        ) : (
          <div className="space-y-2">
            {trendingCommunities.map((community, index) => {
              const colorClass = communityColors[index % communityColors.length] ?? 'from-primary to-emerald-600';
              return (
                <Link
                  key={community.id}
                  href={`/community/c/${community.slug}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <Avatar className="w-10 h-10 rounded-lg">
                    {community.image_url ? (
                      <AvatarImage src={community.image_url} alt={community.name ?? 'Community'} />
                    ) : (
                      <AvatarFallback className={`rounded-lg bg-gradient-to-br ${colorClass} text-white text-sm font-semibold`}>
                        {community.name?.[0]?.toUpperCase() ?? 'C'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{community.name}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{community.members_count ?? 0} Mitglieder</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
