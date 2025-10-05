'use client';

import React, { use, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { emptyEvents, emptySpaces, emptyServices } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';

// Mock profiles temporarily until we implement user profiles properly
const mockProfiles: Array<{
  id: string;
  username: string;
  full_name: string | null;
  avatar_url?: string;
  subscription_tier?: string;
  is_host?: boolean;
  location?: string;
  website?: string;
  bio?: string;
  trust_score?: number;
}> = [
  {
    id: '1',
    username: 'demo',
    full_name: 'Demo User',
    subscription_tier: 'free',
    is_host: false,
    trust_score: 85,
  },
];
import Image from 'next/image';
import { MapPin, Link as LinkIcon, Calendar, MoreVertical, MessageCircle, Flag, Ban, Settings, UserPlus, UserMinus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EventCard } from '@/components/cards/EventCard';
import { SpaceCard } from '@/components/cards/SpaceCard';
import { ServiceCard } from '@/components/services/ServiceCard';

interface PageProps {
  params: Promise<{ username: string }>;
}

export default function UserProfilePage({ params }: PageProps): React.ReactElement {
  const { username } = use(params);
  const [isFollowing, setIsFollowing] = useState(false);

  // Find profile by username
  const profile = mockProfiles.find((p) => p.username === username);

  if (!profile) {
    notFound();
  }

  // Check if viewing own profile (simplified - in real app would compare user IDs)
  const isOwnProfile = false;

  // Mock stats
  const stats = {
    following: 234,
    followers: 1234,
    events: emptyEvents.length,
    totalBookings: 234,
    responseTime: '2h',
    acceptanceRate: 95,
  };

  // Filter user's content (empty for now, will be fetched from Supabase when user system is implemented)
  const userEvents = emptyEvents.slice(0, 6);
  const userSpaces = emptySpaces.slice(0, 4);
  const userServices = emptyServices.slice(0, 3);

  const handleFollowToggle = (): void => {
    setIsFollowing(!isFollowing);
  };

  // Mock languages from profile or default
  const languages = ['Deutsch', 'English']; // In real app would come from profile data

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        {/* Cover Photo */}
        <div className="relative w-full h-[300px] bg-gradient-to-r from-primary/20 to-accent/20">
          {/* Mock cover photo - in real app would be profile.cover_photo_url */}
          <Image
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
            alt="Cover Photo"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Profile Header */}
        <div className="container mx-auto px-4">
          <div className="relative -mt-16 pb-6 border-b">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              {/* Avatar */}
              <Avatar className="w-32 h-32 border-4 border-background">
                <AvatarImage src={profile.avatar_url || undefined} alt={profile.full_name || 'User'} />
                <AvatarFallback className="text-3xl">
                  {profile.full_name?.split(' ').map((n) => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-2xl font-bold">{profile.full_name}</h1>
                      {profile.subscription_tier === 'premium' && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          ✓ Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">@{profile.username}</p>
                    {profile.is_host && (
                      <p className="text-sm text-muted-foreground mt-1">Event Host & Space Owner</p>
                    )}
                    <div className="flex items-center gap-1 text-sm text-yellow-600 mt-1">
                      ⭐ 4.8 Rating • 🏅 Ambassador
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {isOwnProfile ? (
                      <Button variant="outline" className="gap-2">
                        <Settings className="h-4 w-4" />
                        Edit Profile
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={handleFollowToggle}
                          className="gap-2"
                          variant={isFollowing ? 'outline' : 'default'}
                        >
                          {isFollowing ? (
                            <>
                              <UserMinus className="h-4 w-4" />
                              Following
                            </>
                          ) : (
                            <>
                              <UserPlus className="h-4 w-4" />
                              Follow
                            </>
                          )}
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <MessageCircle className="h-4 w-4" />
                          Message
                        </Button>
                      </>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Flag className="mr-2 h-4 w-4" />
                          Report
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Ban className="mr-2 h-4 w-4" />
                          Block User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Bio & Details */}
                <div className="mt-4 space-y-2">
                  {profile.location && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  {profile.website && (
                    <div className="flex items-center gap-2 text-sm">
                      <LinkIcon className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {profile.website}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Joined January 2024</span>
                  </div>
                </div>

                {/* Bio */}
                {profile.bio && (
                  <p className="mt-3 text-sm max-w-2xl">{profile.bio}</p>
                )}

                {/* Stats */}
                <div className="flex items-center gap-6 mt-4">
                  <button className="hover:underline">
                    <span className="font-semibold">{stats.following}</span>{' '}
                    <span className="text-muted-foreground">Following</span>
                  </button>
                  <button className="hover:underline">
                    <span className="font-semibold">{stats.followers}</span>{' '}
                    <span className="text-muted-foreground">Followers</span>
                  </button>
                  <button className="hover:underline">
                    <span className="font-semibold">{stats.events}</span>{' '}
                    <span className="text-muted-foreground">Events</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-8">
            {/* Left Column - Tabs */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="events">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="spaces">Spaces</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="badges">Badges</TabsTrigger>
                </TabsList>

                <TabsContent value="events" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userEvents.map((event, index) => (
                      <EventCard key={index} event={event} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="spaces" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userSpaces.map((space, index) => (
                      <SpaceCard key={index} space={space} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="services" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userServices.map((service, index) => (
                      <ServiceCard key={index} service={service} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">No reviews yet.</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="badges" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Badges & Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">No badges earned yet.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🏅</div>
                    <div>
                      <p className="font-semibold text-sm">Event Master</p>
                      <p className="text-xs text-muted-foreground">Hosted 50+ events</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">⭐</div>
                    <div>
                      <p className="font-semibold text-sm">Super Host</p>
                      <p className="text-xs text-muted-foreground">4.9+ avg rating</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🎯</div>
                    <div>
                      <p className="font-semibold text-sm">Early Adopter</p>
                      <p className="text-xs text-muted-foreground">Joined in beta</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Events:</span>
                    <span className="font-semibold">{stats.events}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Bookings:</span>
                    <span className="font-semibold">{stats.totalBookings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response Time:</span>
                    <span className="font-semibold">{stats.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Acceptance Rate:</span>
                    <span className="font-semibold">{stats.acceptanceRate}%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Languages */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => (
                      <Badge key={lang} variant="secondary">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Social Proof */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Social Proof</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="text-muted-foreground">Verified by 12 users</p>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Trust Score:</span>
                    <span className="font-semibold">{profile.trust_score}/100</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
