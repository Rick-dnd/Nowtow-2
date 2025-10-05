'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Users, Settings, Bell, Share2, MoreHorizontal, Shield, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { CreatePostBox } from '@/components/community/CreatePostBox';
import { PostCard } from '@/components/community/PostCard';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface CommunityData {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  members_count: number;
  posts_count: number;
  created_at: string;
  rules: string[];
  tags: string[];
  privacy: 'public' | 'private';
  creator: {
    username: string;
    avatar: string | null;
  };
  moderators: Array<{
    username: string;
    avatar: string | null;
  }>;
}

// Mock data - will be replaced with real Supabase data
const mockCommunity: CommunityData = {
  id: '1',
  name: 'München Techies',
  slug: 'muenchen-techies',
  description:
    'Die Community für Tech-Enthusiasten in München. Hier teilen wir Wissen, networken und organisieren Tech-Events. Von Startups bis Konzerne, von Developers bis Product Manager - alle sind willkommen!',
  category: 'Technologie',
  members_count: 1247,
  posts_count: 432,
  created_at: '2024-01-15T10:00:00Z',
  rules: [
    'Sei respektvoll und professionell',
    'Kein Spam oder Eigenwerbung ohne Genehmigung',
    'Halte dich an das Thema der Community',
    'Keine politischen oder religiösen Diskussionen',
    'Teile nur verifizierte Informationen',
  ],
  tags: ['Tech', 'Networking', 'Startups', 'Innovation'],
  privacy: 'public',
  creator: {
    username: 'techmax',
    avatar: null,
  },
  moderators: [
    { username: 'anna_dev', avatar: null },
    { username: 'maxcode', avatar: null },
  ],
};

const mockPosts = [
  {
    id: '1',
    author: { username: 'techmax', avatar: null },
    content: 'Wer kommt heute zum Tech Meetup? 🚀',
    images: [],
    timestamp: '2h',
    likes: 24,
    comments: 8,
    visibility: 'public',
  },
  {
    id: '2',
    author: { username: 'anna_dev', avatar: null },
    content: 'Spannender Artikel über KI-Entwicklung in München. Was denkt ihr darüber?',
    images: [],
    timestamp: '5h',
    likes: 15,
    comments: 12,
    visibility: 'public',
  },
];

export default function CommunityDetailPage(): React.ReactElement {
  const [isMember, setIsMember] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');

  const handleJoinLeave = (): void => {
    setIsMember(!isMember);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 bg-muted/20">
        {/* Community Header */}
        <div className="bg-card border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Community Avatar */}
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white text-4xl font-bold flex-shrink-0">
                {mockCommunity.name[0]?.toUpperCase() ?? 'C'}
              </div>

              {/* Community Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h1 className="text-3xl font-bold mb-1">{mockCommunity.name}</h1>
                    <p className="text-muted-foreground">c/{mockCommunity.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{mockCommunity.description}</p>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">{mockCommunity.members_count.toLocaleString()}</span>
                    <span className="text-muted-foreground">Mitglieder</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="text-sm">
                    <span className="font-semibold">{mockCommunity.posts_count}</span>
                    <span className="text-muted-foreground ml-1">Posts</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <Badge variant="outline">{mockCommunity.category}</Badge>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {mockCommunity.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button onClick={handleJoinLeave} size="lg">
                    {isMember ? 'Verlassen' : 'Beitreten'}
                  </Button>
                  {isMember && (
                    <>
                      <Button variant="outline" size="lg">
                        <Bell className="h-4 w-4 mr-2" />
                        Benachrichtigungen
                      </Button>
                      <Button variant="outline" size="lg">
                        <Settings className="h-4 w-4 mr-2" />
                        Einstellungen
                      </Button>
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
                  {isMember && (
                    <div className="mb-6">
                      <CreatePostBox />
                    </div>
                  )}

                  {mockPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}

                  {mockPosts.length === 0 && (
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
                      <CardTitle>Mitglieder ({mockCommunity.members_count})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Mock member list */}
                        {[mockCommunity.creator, ...mockCommunity.moderators].map((member, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50">
                            <Avatar>
                              <AvatarFallback>
                                {member.username[0]?.toUpperCase() ?? 'U'}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-semibold">@{member.username}</p>
                              {index === 0 && (
                                <Badge variant="outline" className="text-xs">
                                  Ersteller
                                </Badge>
                              )}
                              {index > 0 && (
                                <Badge variant="outline" className="text-xs">
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
                    <p className="text-sm text-muted-foreground">{mockCommunity.description}</p>
                    <Separator />
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Erstellt</span>
                        <span className="font-medium">
                          {new Date(mockCommunity.created_at).toLocaleDateString('de-DE')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sichtbarkeit</span>
                        <Badge variant="outline" className="text-xs">
                          {mockCommunity.privacy === 'public' ? 'Öffentlich' : 'Privat'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Rules */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Community-Regeln
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-3 text-sm">
                      {mockCommunity.rules.map((rule, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="font-semibold text-muted-foreground">{index + 1}.</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>

                {/* Moderators */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Moderatoren</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockCommunity.moderators.map((mod, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {mod.username[0]?.toUpperCase() ?? 'M'}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">@{mod.username}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
