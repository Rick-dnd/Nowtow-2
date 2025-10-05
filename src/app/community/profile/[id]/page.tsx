'use client';

import { useState } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PostCard } from '@/components/community/PostCard';
import Link from 'next/link';

interface UserProfile {
  id: string;
  username: string;
  full_name: string;
  bio: string | null;
  location: string | null;
  avatar_url: string | null;
  joined_date: string;
  stats: {
    posts_count: number;
    comments_count: number;
    likes_received: number;
    communities_count: number;
    followers_count: number;
    following_count: number;
  };
  achievements: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    unlocked_at: string;
  }>;
  communities: Array<{
    id: string;
    name: string;
    slug: string;
    role: 'member' | 'moderator' | 'creator';
  }>;
}

// Mock data - will be replaced with real Supabase data
const mockProfile: UserProfile = {
  id: '1',
  username: 'techmax',
  full_name: 'Max Mustermann',
  bio: 'Software Developer aus München. Begeistert von Tech, Startups und Innovation. Community Manager bei München Techies.',
  location: 'München, Bayern',
  avatar_url: null,
  joined_date: '2024-03-15T10:00:00Z',
  stats: {
    posts_count: 127,
    comments_count: 543,
    likes_received: 892,
    communities_count: 5,
    followers_count: 234,
    following_count: 189,
  },
  achievements: [
    {
      id: '1',
      name: 'Community Builder',
      description: 'Community mit 1000+ Mitgliedern erstellt',
      icon: '🏗️',
      unlocked_at: '2024-08-01T10:00:00Z',
    },
    {
      id: '2',
      name: 'Super Contributor',
      description: '100+ Posts erstellt',
      icon: '⭐',
      unlocked_at: '2024-09-15T10:00:00Z',
    },
    {
      id: '3',
      name: 'Early Adopter',
      description: 'In den ersten 100 Mitgliedern',
      icon: '🚀',
      unlocked_at: '2024-03-15T10:00:00Z',
    },
  ],
  communities: [
    {
      id: '1',
      name: 'München Techies',
      slug: 'muenchen-techies',
      role: 'creator',
    },
    {
      id: '2',
      name: 'Startup München',
      slug: 'startup-muenchen',
      role: 'moderator',
    },
    {
      id: '3',
      name: 'Developer Hub',
      slug: 'developer-hub',
      role: 'member',
    },
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
    author: { username: 'techmax', avatar: null },
    content: 'Spannender Artikel über KI-Entwicklung in München.',
    images: [],
    timestamp: '1d',
    likes: 45,
    comments: 12,
    visibility: 'public',
  },
];

export default function CommunityProfilePage(): React.ReactElement {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');

  const handleFollow = (): void => {
    setIsFollowing(!isFollowing);
  };

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
                        {mockProfile.username[0]?.toUpperCase() ?? 'U'}
                      </AvatarFallback>
                    </Avatar>

                    {/* Profile Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h1 className="text-3xl font-bold mb-1">{mockProfile.full_name}</h1>
                          <p className="text-muted-foreground">@{mockProfile.username}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleFollow} variant={isFollowing ? 'outline' : 'default'}>
                            <UserPlus className="h-4 w-4 mr-2" />
                            {isFollowing ? 'Entfolgen' : 'Folgen'}
                          </Button>
                          <Button variant="outline">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Nachricht
                          </Button>
                        </div>
                      </div>

                      {/* Bio */}
                      {mockProfile.bio && (
                        <p className="text-muted-foreground mb-4">{mockProfile.bio}</p>
                      )}

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        {mockProfile.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{mockProfile.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Dabei seit{' '}
                            {new Date(mockProfile.joined_date).toLocaleDateString('de-DE', {
                              month: 'long',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="font-semibold">{mockProfile.stats.posts_count}</span>
                          <span className="text-muted-foreground ml-1">Posts</span>
                        </div>
                        <div>
                          <span className="font-semibold">{mockProfile.stats.followers_count}</span>
                          <span className="text-muted-foreground ml-1">Follower</span>
                        </div>
                        <div>
                          <span className="font-semibold">{mockProfile.stats.following_count}</span>
                          <span className="text-muted-foreground ml-1">Folge ich</span>
                        </div>
                        <div>
                          <span className="font-semibold">{mockProfile.stats.communities_count}</span>
                          <span className="text-muted-foreground ml-1">Communities</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{mockProfile.stats.comments_count}</p>
                      <p className="text-sm text-muted-foreground">Kommentare</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-3 bg-red-100 rounded-full">
                      <Heart className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{mockProfile.stats.likes_received}</p>
                      <p className="text-sm text-muted-foreground">Likes erhalten</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-3 bg-amber-100 rounded-full">
                      <Trophy className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{mockProfile.achievements.length}</p>
                      <p className="text-sm text-muted-foreground">Achievements</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Content Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="comments">Kommentare</TabsTrigger>
                </TabsList>

                <TabsContent value="posts" className="space-y-4">
                  {mockPosts.length > 0 ? (
                    mockPosts.map((post) => <PostCard key={post.id} post={post} />)
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
                {/* Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-amber-600" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockProfile.achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                        >
                          <div className="text-2xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{achievement.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {achievement.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(achievement.unlocked_at).toLocaleDateString('de-DE')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Communities */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Communities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockProfile.communities.map((community) => (
                        <Link
                          key={community.id}
                          href={`/community/c/${community.slug}`}
                          className="block"
                        >
                          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
                                {community.name[0]?.toUpperCase() ?? 'C'}
                              </div>
                              <div>
                                <p className="font-semibold text-sm">{community.name}</p>
                                {community.role !== 'member' && (
                                  <Badge variant="outline" className="text-xs mt-1">
                                    {community.role === 'creator' ? 'Ersteller' : 'Moderator'}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Contact */}
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
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
