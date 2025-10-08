'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Users, Settings, Bell, Share2, MoreHorizontal, Shield, Calendar, Flag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreatePostBox } from '@/components/community/CreatePostBox';
import { PostCard } from '@/components/community/PostCard';
import { PollDisplayData } from '@/components/community/PollDisplay';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCommunity, useCommunityMembers, useIsCommunityMember, useJoinCommunity, useLeaveCommunity } from '@/hooks/useCommunities';
import { usePosts, useVotePoll } from '@/hooks/useCommunity';
import { useUser } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { CommunitySettingsDialog } from '@/components/community/CommunitySettingsDialog';

export default function CommunityDetailPage(): React.ReactElement {
  const params = useParams();
  const slug = params?.slug as string | undefined;

  const [activeTab, setActiveTab] = useState('posts');
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);

  // Fetch data using hooks
  const { data: user } = useUser();
  const { data: community, isLoading: communityLoading, error: communityError } = useCommunity(slug);
  const { data: posts, isLoading: postsLoading } = usePosts({ communityId: community?.id }, user?.id);
  const { data: isMember, isLoading: memberCheckLoading } = useIsCommunityMember(community?.id, user?.id);
  const { data: members, isLoading: membersLoading } = useCommunityMembers(community?.id);

  // Mutations
  const joinMutation = useJoinCommunity();
  const leaveMutation = useLeaveCommunity();
  const votePollMutation = useVotePoll();

  // Check if user is owner
  const isOwner = user?.id === community?.creator_id;

  const handleJoinLeave = (): void => {
    if (!community || !user) {
      toast.error('Bitte melde dich an, um einer Community beizutreten');
      return;
    }

    if (isMember) {
      leaveMutation.mutate(
        { communityId: community.id, userId: user.id },
        {
          onSuccess: (): void => {
            toast.success('Du hast die Community verlassen');
          },
          onError: (error: Error): void => {
            toast.error(`Fehler: ${error.message}`);
          },
        }
      );
    } else {
      joinMutation.mutate(
        { communityId: community.id, userId: user.id },
        {
          onSuccess: (): void => {
            toast.success('Du bist der Community beigetreten');
          },
          onError: (error: Error): void => {
            toast.error(`Fehler: ${error.message}`);
          },
        }
      );
    }
  };

  const handleShare = (): void => {
    if (!community) return;

    const url = `${window.location.origin}/community/c/${community.slug}`;

    if (navigator.share) {
      navigator
        .share({
          title: community.name,
          text: community.description ?? '',
          url: url,
        })
        .catch(() => {
          // Fallback: Copy to clipboard
          navigator.clipboard.writeText(url);
          toast.success('Link kopiert!');
        });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(url);
      toast.success('Link kopiert!');
    }
  };

  const handleDeleteCommunity = (): void => {
    // TODO: Implement confirmation dialog + delete mutation
    toast.error('Löschen noch nicht implementiert');
  };

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

  // Loading state
  if (communityLoading || memberCheckLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-16 bg-muted/20">
          <div className="container mx-auto px-4 py-8">
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Lädt...</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </>
    );
  }

  // Error state
  if (communityError || !community) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-16 bg-muted/20">
          <div className="container mx-auto px-4 py-8">
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  {communityError ? `Fehler: ${communityError.message}` : 'Community nicht gefunden'}
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
        {/* Community Header */}
        <div className="bg-card border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Community Avatar */}
              {community.image_url ? (
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                  <Image
                    src={community.image_url}
                    alt={community.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white text-4xl font-bold flex-shrink-0">
                  {community.name[0]?.toUpperCase() ?? 'C'}
                </div>
              )}

              {/* Community Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h1 className="text-3xl font-bold mb-1">{community.name}</h1>
                    <p className="text-muted-foreground">c/{community.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {isOwner ? (
                          <>
                            <DropdownMenuItem onClick={() => setShowSettingsDialog(true)}>
                              <Settings className="h-4 w-4 mr-2" />
                              Community bearbeiten
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={handleDeleteCommunity}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Community löschen
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <>
                            <DropdownMenuItem onClick={handleShare}>
                              <Share2 className="h-4 w-4 mr-2" />
                              Teilen
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Flag className="h-4 w-4 mr-2" />
                              Melden
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{community.description}</p>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">{(community.members_count ?? 0).toLocaleString()}</span>
                    <span className="text-muted-foreground">Mitglieder</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="text-sm">
                    <span className="font-semibold">{(posts ?? []).length}</span>
                    <span className="text-muted-foreground ml-1">Posts</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <Badge variant="outline">{community.category ?? 'Allgemein'}</Badge>
                </div>

                {/* Tags */}
                {community.tags && Array.isArray(community.tags) && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {community.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {String(tag)}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {!isOwner && (
                    <Button
                      onClick={handleJoinLeave}
                      size="lg"
                      disabled={joinMutation.isPending || leaveMutation.isPending}
                    >
                      {isMember ? 'Verlassen' : 'Beitreten'}
                    </Button>
                  )}
                  {(isMember || isOwner) && (
                    <>
                      <Button variant="outline" size="lg">
                        <Bell className="h-4 w-4 mr-2" />
                        Benachrichtigungen
                      </Button>
                      {isOwner && (
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => setShowSettingsDialog(true)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Einstellungen
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Content - Posts */}
            <div className="lg:col-span-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="members">Mitglieder</TabsTrigger>
                </TabsList>

                <TabsContent value="posts" className="space-y-4">
                  {(isMember || isOwner) && (
                    <div className="mb-6">
                      <CreatePostBox communityId={community.id} />
                    </div>
                  )}

                  {postsLoading ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">Lädt Posts...</p>
                      </CardContent>
                    </Card>
                  ) : (posts ?? []).length > 0 ? (
                    (posts ?? []).map((post) => {
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
                            timestamp: new Date(post.created_at ?? '').toLocaleString('de-DE'),
                            likes: post.likes_count ?? 0,
                            comments: post.comments_count ?? 0,
                            visibility: 'public',
                            poll: pollData,
                          }}
                          onVote={handleVotePoll}
                        />
                      );
                    })
                  ) : (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">Noch keine Posts in dieser Community</p>
                        {isMember && (
                          <Button className="mt-4">Ersten Post erstellen</Button>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="events" className="space-y-4">
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-4">Noch keine Events geplant</p>
                      {isMember && (
                        <Button>Event erstellen</Button>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="members" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mitglieder ({community.members_count ?? 0})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {membersLoading ? (
                        <div className="py-8 text-center">
                          <p className="text-muted-foreground">Lädt Mitglieder...</p>
                        </div>
                      ) : (members ?? []).length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {(members ?? []).map((member, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50">
                              <Avatar>
                                <AvatarImage src={member.profiles?.avatar_url ?? undefined} alt={member.profiles?.full_name ?? member.profiles?.username ?? 'User'} />
                                <AvatarFallback>
                                  {member.profiles?.full_name?.[0]?.toUpperCase() ??
                                   member.profiles?.username?.[0]?.toUpperCase() ??
                                   'U'}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="font-semibold">
                                  {member.profiles?.full_name ?? member.profiles?.username ?? 'Unbekannt'}
                                </p>
                                {member.profiles?.username && (
                                  <p className="text-xs text-muted-foreground">@{member.profiles.username}</p>
                                )}
                                {member.role === 'owner' && (
                                  <Badge variant="outline" className="text-xs mt-1">
                                    Ersteller
                                  </Badge>
                                )}
                                {member.role === 'moderator' && (
                                  <Badge variant="outline" className="text-xs mt-1">
                                    <Shield className="h-3 w-3 mr-1" />
                                    Moderator
                                  </Badge>
                                )}
                              </div>
                              <Button variant="outline" size="sm">
                                Profil
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-8 text-center">
                          <p className="text-muted-foreground">Keine Mitglieder gefunden</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Sidebar - About & Rules */}
            <aside className="lg:col-span-4">
              <div className="sticky top-20 space-y-4">
                {/* About */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Über diese Community</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{community.description}</p>
                    <Separator />
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Erstellt</span>
                        <span className="font-medium">
                          {new Date(community.created_at ?? '').toLocaleDateString('de-DE')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sichtbarkeit</span>
                        <Badge variant="outline" className="text-xs">
                          {community.privacy === 'public' ? 'Öffentlich' : 'Privat'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Rules */}
                {community.rules && Array.isArray(community.rules) && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Community-Regeln
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-3 text-sm">
                        {community.rules.map((rule, index) => (
                          <li key={index} className="flex gap-2">
                            <span className="font-semibold text-muted-foreground">{index + 1}.</span>
                            <span>{String(rule)}</span>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                )}

                {/* Moderators */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Moderatoren</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {(members ?? [])
                        .filter((m) => m.role === 'moderator' || m.role === 'owner')
                        .map((mod, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={mod.profiles?.avatar_url ?? undefined} alt={mod.profiles?.full_name ?? mod.profiles?.username ?? 'Mod'} />
                              <AvatarFallback className="text-xs">
                                {mod.profiles?.full_name?.[0]?.toUpperCase() ??
                                 mod.profiles?.username?.[0]?.toUpperCase() ??
                                 'M'}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">
                              {mod.profiles?.full_name ?? mod.profiles?.username ?? 'Unbekannt'}
                            </span>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>
          </div>
        </div>

        {/* Settings Dialog */}
        {community && (
          <CommunitySettingsDialog
            open={showSettingsDialog}
            onOpenChange={setShowSettingsDialog}
            community={community}
          />
        )}
      </main>
    </>
  );
}
