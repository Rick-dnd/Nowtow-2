'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Calendar, Loader2, UserPlus, UserMinus } from 'lucide-react';
import { useAuthorProfile, useBlogPosts } from '@/hooks/useBlog';
import { useFollowStatus, useFollowUser, useUnfollowUser, useUserStats } from '@/hooks/useUser';
import { useAuth } from '@/hooks/useAuth';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { toast } from 'sonner';

interface AuthorPageProps {
  params: Promise<{
    username: string;
  }>;
}

export default function AuthorPage({ params }: AuthorPageProps): React.ReactElement {
  const [username, setUsername] = React.useState<string>('');

  React.useEffect((): void => {
    void params.then((resolvedParams) => {
      setUsername(resolvedParams.username);
    });
  }, [params]);

  // Get current user
  const { user } = useAuth();

  // Load author profile from database
  const { data: author, isLoading: authorLoading, error: authorError } = useAuthorProfile(username);

  // Load all posts to filter by author
  const { data: allPosts, isLoading: postsLoading } = useBlogPosts({ status: 'published' });

  // Check if current user follows this author
  const { data: isFollowing } = useFollowStatus(user?.id, author?.id);

  // Load user stats (followers/following counts)
  const { data: userStats } = useUserStats(author?.id);

  // Mutations for follow/unfollow
  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();

  const authorPosts = React.useMemo(() => {
    if (!allPosts || !author) return [];
    return (allPosts || []).filter((post) => post.author_id === author.id);
  }, [allPosts, author]);

  const authorStats = React.useMemo(() => {
    const totalViews = authorPosts.reduce(
      (sum, post) => sum + (post.view_count ?? 0),
      0
    );
    const totalLikes = authorPosts.reduce(
      (sum, post) => sum + (post.likes_count ?? 0),
      0
    );

    return {
      totalViews,
      totalLikes,
      articleCount: authorPosts.length,
    };
  }, [authorPosts]);

  const isLoading = authorLoading || postsLoading;

  // Check if viewing own profile
  const isOwnProfile = user?.id === author?.id;

  // Handle follow/unfollow
  const handleFollowToggle = (): void => {
    if (!user) {
      toast.error('Bitte melde dich an, um Autoren zu folgen');
      return;
    }
    if (!author) return;

    if (isFollowing) {
      unfollowMutation.mutate(
        { followerId: user.id, followingId: author.id },
        {
          onSuccess: () => {
            toast.success('Du folgst diesem Autor nicht mehr');
          },
          onError: () => {
            toast.error('Fehler beim Entfolgen');
          },
        }
      );
    } else {
      followMutation.mutate(
        { followerId: user.id, followingId: author.id },
        {
          onSuccess: () => {
            toast.success('Du folgst diesem Autor jetzt');
          },
          onError: () => {
            toast.error('Fehler beim Folgen');
          },
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/blog/authors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : authorError || !author ? (
          <div className="text-center py-12">
            <p className="text-destructive">Fehler beim Laden des Profils</p>
            {authorError && (
              <p className="text-sm text-muted-foreground mt-2">{authorError.message}</p>
            )}
            {!author && !authorError && (
              <p className="text-sm text-muted-foreground mt-2">Autor nicht gefunden</p>
            )}
          </div>
        ) : (
          <>
            {/* Author Profile */}
            <Card className="p-8 mb-8">
              <div className="flex flex-col md:flex-row gap-6">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={author.avatar_url ?? undefined} alt={author.full_name ?? author.username ?? 'Autor'} />
                  <AvatarFallback className="text-4xl">
                    {author.full_name
                      ? author.full_name
                          .split(' ')
                          .map((n: string) => n[0])
                          .join('')
                          .toUpperCase()
                      : author.username?.[0]?.toUpperCase() ?? 'A'}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">
                        {author.full_name ?? author.username ?? 'Unbekannter Autor'}
                      </h1>
                      <p className="text-muted-foreground">@{author.username ?? 'unbekannt'}</p>
                    </div>
                    {!isOwnProfile && (
                      <Button
                        onClick={handleFollowToggle}
                        disabled={followMutation.isPending || unfollowMutation.isPending}
                        variant={isFollowing ? 'outline' : 'default'}
                      >
                        {followMutation.isPending || unfollowMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : isFollowing ? (
                          <UserMinus className="h-4 w-4 mr-2" />
                        ) : (
                          <UserPlus className="h-4 w-4 mr-2" />
                        )}
                        {isFollowing ? 'Entfolgen' : 'Folgen'}
                      </Button>
                    )}
                  </div>

                  {author.author_bio && (
                    <p className="text-muted-foreground mb-4">
                      {author.author_bio}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    {author.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{author.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Mitglied seit {format(new Date(author.created_at), 'MMM yyyy', { locale: de })}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div>
                      <div className="text-2xl font-bold">
                        {authorStats.articleCount}
                      </div>
                      <div className="text-sm text-muted-foreground">Artikel</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">
                        {userStats?.followers_count ?? 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Follower</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">
                        {authorStats.totalViews.toLocaleString('de-DE')}
                      </div>
                      <div className="text-sm text-muted-foreground">Aufrufe</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">
                        {authorStats.totalLikes.toLocaleString('de-DE')}
                      </div>
                      <div className="text-sm text-muted-foreground">Likes</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Topics */}
            {authorPosts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Themen</h2>
                <div className="flex flex-wrap gap-2">
                  {Array.from(
                    new Set(authorPosts.map((post) => post.category).filter(Boolean))
                  ).map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Articles */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Artikel ({authorStats.articleCount})
              </h2>
              {authorPosts.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">
                    Dieser Autor hat noch keine Artikel veröffentlicht
                  </p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {authorPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.id}`}>
                      <Card className="p-6 hover:shadow-lg transition-all">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{post.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                          {post.excerpt ?? (post.content ?? '').substring(0, 150) + '...'}
                        </p>
                        {post.category && (
                          <Badge variant="secondary">{post.category}</Badge>
                        )}
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
