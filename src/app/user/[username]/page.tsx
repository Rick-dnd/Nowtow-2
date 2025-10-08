'use client';

import React, { use, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MapPin, Link as LinkIcon, Calendar, MoreVertical, MessageCircle, Flag, Ban, Settings, UserPlus, UserMinus, Loader2 } from 'lucide-react';
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
import { useProfile, useUserContent, useProfileStats, useIsFollowing, useFollowUser, useUnfollowUser } from '@/hooks/useProfiles';
import { useUser } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface PageProps {
  params: Promise<{ username: string }>;
}

export default function UserProfilePage({ params }: PageProps): React.ReactElement {
  const { username } = use(params);
  const [activeTab, setActiveTab] = useState('events');

  // Fetch current user
  const { data: currentUser } = useUser();

  // Fetch profile data
  const { data: profile, isLoading: profileLoading, error: profileError } = useProfile(username);
  const { data: userContent, isLoading: contentLoading } = useUserContent(profile?.id);
  const { data: stats, isLoading: statsLoading } = useProfileStats(profile?.id);
  const { data: isFollowing, isLoading: followCheckLoading } = useIsFollowing(currentUser?.id, profile?.id);

  // Mutations
  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();

  // Check if viewing own profile
  const isOwnProfile = currentUser?.id === profile?.id;

  const handleFollowToggle = (): void => {
    if (!currentUser || !profile) {
      toast.error('Bitte melde dich an, um jemandem zu folgen');
      return;
    }

    if (isFollowing) {
      unfollowMutation.mutate(
        { followerId: currentUser.id, followingId: profile.id },
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
        { followerId: currentUser.id, followingId: profile.id },
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
        <main className="min-h-screen pt-16 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-lg text-muted-foreground">Lade Profil...</p>
          </div>
        </main>
      </>
    );
  }

  // Error or not found
  if (profileError || !profile) {
    notFound();
  }

  const userEvents = userContent?.events || [];
  const userSpaces = userContent?.spaces || [];
  const userServices = userContent?.services || [];

  // Mock languages from profile or default
  const languages = ['Deutsch', 'English'];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        {/* Cover Photo */}
        <div className="relative w-full h-[300px] bg-gradient-to-r from-primary/20 to-accent/20">
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
                      <h1 className="text-2xl font-bold">{profile.full_name || profile.username}</h1>
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
                    {stats && stats.average_rating > 0 && (
                      <div className="flex items-center gap-1 text-sm text-yellow-600 mt-1">
                        ⭐ {stats.average_rating.toFixed(1)} Rating
                      </div>
                    )}
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
                          disabled={followMutation.isPending || unfollowMutation.isPending}
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
                    <span>
                      Joined {new Date(profile.created_at || '').toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                {/* Bio */}
                {profile.bio && (
                  <p className="mt-3 text-sm max-w-2xl">{profile.bio}</p>
                )}

                {/* Stats */}
                {!statsLoading && stats && (
                  <div className="flex items-center gap-6 mt-4">
                    <button className="hover:underline">
                      <span className="font-semibold">{stats.following_count}</span>{' '}
                      <span className="text-muted-foreground">Following</span>
                    </button>
                    <button className="hover:underline">
                      <span className="font-semibold">{stats.followers_count}</span>{' '}
                      <span className="text-muted-foreground">Followers</span>
                    </button>
                    <button className="hover:underline">
                      <span className="font-semibold">{stats.events_count}</span>{' '}
                      <span className="text-muted-foreground">Events</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-8">
            {/* Left Column - Tabs */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="spaces">Spaces</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="badges">Badges</TabsTrigger>
                </TabsList>

                <TabsContent value="events" className="mt-6">
                  {contentLoading ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
                        <p className="text-muted-foreground">Lädt Events...</p>
                      </CardContent>
                    </Card>
                  ) : userEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">Keine Events gefunden</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="spaces" className="mt-6">
                  {contentLoading ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
                        <p className="text-muted-foreground">Lädt Spaces...</p>
                      </CardContent>
                    </Card>
                  ) : userSpaces.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userSpaces.map((space) => (
                        <SpaceCard key={space.id} space={space} />
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">Keine Spaces gefunden</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="services" className="mt-6">
                  {contentLoading ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
                        <p className="text-muted-foreground">Lädt Services...</p>
                      </CardContent>
                    </Card>
                  ) : userServices.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userServices.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">Keine Services gefunden</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Keine Reviews vorhanden.</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="badges" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Badges & Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Keine Badges vorhanden.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              {!statsLoading && stats && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Events:</span>
                      <span className="font-semibold">{stats.events_count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Spaces:</span>
                      <span className="font-semibold">{stats.spaces_count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Services:</span>
                      <span className="font-semibold">{stats.services_count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Bookings:</span>
                      <span className="font-semibold">{stats.total_bookings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reviews:</span>
                      <span className="font-semibold">{stats.reviews_count}</span>
                    </div>
                    {stats.average_rating > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Average Rating:</span>
                        <span className="font-semibold">{stats.average_rating.toFixed(1)}/5.0</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

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
              {profile.trust_score && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Social Proof</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Trust Score:</span>
                      <span className="font-semibold">{profile.trust_score}/100</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
