'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import {
  MapPin,
  Calendar,
  Mail,
  MessageCircle,
  UserPlus,
  Trophy,
  Users,
  MessageSquare,
  Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PostCard } from '@/components/community/PostCard';
import { useProfileById, useProfileStats, useIsFollowing, useFollowUser, useUnfollowUser } from '@/hooks/useProfiles';
import { usePosts } from '@/hooks/useCommunity';
import { useUser } from '@/hooks/useAuth';
import { toast } from 'sonner';

export default function CommunityProfilePage(): React.ReactElement {
  const params = useParams();
  const profileId = params?.id as string | undefined;

  const [activeTab, setActiveTab] = useState('posts');

  // Fetch data using hooks
  const { data: currentUser } = useUser();
  const { data: profile, isLoading: profileLoading, error: profileError } = useProfileById(profileId);
  const { data: stats, isLoading: statsLoading } = useProfileStats(profileId);
  const { data: posts, isLoading: postsLoading } = usePosts({ authorId: profileId });
  const { data: isFollowing, isLoading: followCheckLoading } = useIsFollowing(currentUser?.id, profileId);

  // Mutations
  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();

  const handleFollow = (): void => {
    if (!currentUser || !profileId) {
      toast.error('Bitte melde dich an, um jemandem zu folgen');
      return;
    }

    if (isFollowing) {
      unfollowMutation.mutate(
        { followerId: currentUser.id, followingId: profileId },
        {
          onSuccess: (): void => {
            toast.success('Du folgst diesem Nutzer nicht mehr');
          },
          onError: (error: Error): void => {
            toast.error(`Fehler: ${error.message}`);
          },
        }
      );
    } else {
      followMutation.mutate(
        { followerId: currentUser.id, followingId: profileId },
        {
          onSuccess: (): void => {
            toast.success('Du folgst diesem Nutzer jetzt');
          },
          onError: (error: Error): void => {
            toast.error(`Fehler: ${error.message}`);
          },
        }
      );
    }
  };

  // Loading state
  if (profileLoading || followCheckLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-16 bg-muted/20">
          <div className="container mx-auto px-4 py-8">
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Lädt Profil...</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </>
    );
  }

  // Error state
  if (profileError || !profile) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-16 bg-muted/20">
          <div className="container mx-auto px-4 py-8">
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  {profileError ? `Fehler: ${profileError.message}` : 'Profil nicht gefunden'}
                </p>
                <Button variant="outline" onClick={(): void => window.history.back()}>
                  Zurück
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 bg-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Profile Header Card */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Avatar */}
                    <Avatar className="h-32 w-32">
                      <AvatarFallback className="text-4xl bg-gradient-to-br from-primary to-emerald-600 text-white">
                        {(profile.username ?? 'U')[0]?.toUpperCase() ?? 'U'}
                      </AvatarFallback>
                    </Avatar>

                    {/* Profile Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h1 className="text-3xl font-bold mb-1">{profile.full_name ?? 'Unbekannt'}</h1>
                          <p className="text-muted-foreground">@{profile.username ?? 'user'}</p>
                        </div>
                        {currentUser?.id !== profileId && (
                          <div className="flex gap-2">
                            <Button
                              onClick={handleFollow}
                              variant={isFollowing ? 'outline' : 'default'}
                              disabled={followMutation.isPending || unfollowMutation.isPending}
                            >
                              <UserPlus className="h-4 w-4 mr-2" />
                              {isFollowing ? 'Entfolgen' : 'Folgen'}
                            </Button>
                            <Button variant="outline">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Nachricht
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Bio */}
                      {profile.bio && (
                        <p className="text-muted-foreground mb-4">{profile.bio}</p>
                      )}

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        {profile.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{profile.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Dabei seit{' '}
                            {new Date(profile.created_at ?? '').toLocaleDateString('de-DE', {
                              month: 'long',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Stats */}
                      {!statsLoading && stats && (
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div>
                            <span className="font-semibold">{stats.events_count + stats.spaces_count + stats.services_count}</span>
                            <span className="text-muted-foreground ml-1">Posts</span>
                          </div>
                          <div>
                            <span className="font-semibold">{stats.followers_count}</span>
                            <span className="text-muted-foreground ml-1">Follower</span>
                          </div>
                          <div>
                            <span className="font-semibold">{stats.following_count}</span>
                            <span className="text-muted-foreground ml-1">Folge ich</span>
                          </div>
                          <div>
                            <span className="font-semibold">{stats.reviews_count}</span>
                            <span className="text-muted-foreground ml-1">Reviews</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Stats */}
              {!statsLoading && stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{stats.reviews_count}</p>
                        <p className="text-sm text-muted-foreground">Reviews</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="p-3 bg-red-100 rounded-full">
                        <Heart className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{stats.average_rating.toFixed(1)}</p>
                        <p className="text-sm text-muted-foreground">Durchschnittsbewertung</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="p-3 bg-amber-100 rounded-full">
                        <Trophy className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{stats.total_bookings}</p>
                        <p className="text-sm text-muted-foreground">Buchungen</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Content Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="comments">Kommentare</TabsTrigger>
                </TabsList>

                <TabsContent value="posts" className="space-y-4">
                  {postsLoading ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">Lädt Posts...</p>
                      </CardContent>
                    </Card>
                  ) : (posts ?? []).length > 0 ? (
                    (posts ?? []).map((post) => (
                      <PostCard
                        key={post.id}
                        post={{
                          id: post.id,
                          author: {
                            username: post.author_id ?? 'Unknown',
                            avatar: null,
                          },
                          content: post.content,
                          images: post.image_url ? [post.image_url] : [],
                          timestamp: new Date(post.created_at ?? '').toLocaleString('de-DE'),
                          likes: post.likes_count ?? 0,
                          comments: post.comments_count ?? 0,
                          visibility: 'public',
                        }}
                      />
                    ))
                  ) : (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">Noch keine Posts</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="comments" className="space-y-4">
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground">Kommentare werden hier angezeigt</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-20 space-y-6">
                {/* Achievements Placeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-amber-600" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="py-8 text-center">
                      <p className="text-sm text-muted-foreground">Keine Achievements verfügbar</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Communities Placeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Communities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="py-8 text-center">
                      <p className="text-sm text-muted-foreground">Keine Communities</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact */}
                {currentUser?.id !== profileId && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Kontakt</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Nachricht senden
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Mail className="h-4 w-4 mr-2" />
                        E-Mail senden
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
