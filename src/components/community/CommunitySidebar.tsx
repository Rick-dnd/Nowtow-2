'use client';

import { Home, Users, Calendar, Bookmark, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useUser, useProfile } from '@/hooks/useAuth';
import { useProfileStats } from '@/hooks/useProfiles';
import { useUserCommunities } from '@/hooks/useCommunities';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { icon: Home, label: 'Feed', href: '/community' },
  { icon: Users, label: 'Communities', href: '/community/communities' },
  { icon: Calendar, label: 'Events', href: '/events' },
  { icon: Bookmark, label: 'Gespeichert', href: '/community/saved' },
  { icon: TrendingUp, label: 'Bestenliste', href: '/community/leaderboard' },
];

export function CommunitySidebar(): React.ReactElement {
  const { data: user } = useUser();
  const { data: profile } = useProfile(user?.id);
  const { data: stats } = useProfileStats(user?.id);
  const { data: userCommunities, isLoading: membersLoading } = useUserCommunities(user?.id);

  return (
    <div className="space-y-4">
      {/* User Profile Card */}
      {user && (
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <a href={`/user/${profile?.username ?? user.id}`} className="block">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <Avatar className="w-12 h-12">
                  {profile?.avatar_url && <AvatarImage src={profile.avatar_url} alt={profile.full_name ?? profile.username ?? 'User'} />}
                  <AvatarFallback className="bg-gradient-to-br from-primary to-emerald-600 text-white text-lg font-semibold">
                    {profile?.full_name?.[0]?.toUpperCase() ??
                     profile?.username?.[0]?.toUpperCase() ??
                     user.email?.[0]?.toUpperCase() ?? 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">
                  {profile?.full_name ?? `@${profile?.username ?? 'user'}`}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {profile?.bio ?? 'Nowtown Mitglied'}
                </p>
              </div>
            </div>
            {stats && (
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="font-semibold">{stats.followers_count}</span>
                  <span className="text-muted-foreground ml-1">Follower</span>
                </div>
                <div>
                  <span className="font-semibold">{stats.following_count}</span>
                  <span className="text-muted-foreground ml-1">Folge ich</span>
                </div>
                <div>
                  <span className="font-semibold">{stats.events_count + stats.spaces_count + stats.services_count}</span>
                  <span className="text-muted-foreground ml-1">Posts</span>
                </div>
              </div>
            )}
          </a>
        </div>
      )}

      {/* Main Menu */}
      <div className="bg-card rounded-2xl p-4 shadow-sm">
        <h3 className="font-semibold mb-3">Menü</h3>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start gap-3"
                asChild
              >
                <a href={item.href}>
                  <Icon className="h-5 w-5" />
                  {item.label}
                </a>
              </Button>
            );
          })}
        </nav>
      </div>

      {/* My Communities */}
      <div className="bg-card rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Meine Communities</h3>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" asChild>
            <Link href="/community/communities">+ Neu</Link>
          </Button>
        </div>
        {membersLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : !userCommunities || userCommunities.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Noch keine Communities beigetreten
          </p>
        ) : (
          <div className="space-y-2">
            {userCommunities.slice(0, 5).map((member) => (
              <Link
                key={member.id}
                href={`/community/c/${member.community.slug ?? ''}`}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-left"
              >
                <Avatar className="w-8 h-8">
                  {member.community.image_url && (
                    <AvatarImage src={member.community.image_url} alt={member.community.name ?? 'Community'} />
                  )}
                  <AvatarFallback className="bg-gradient-to-br from-primary to-emerald-600 text-white text-xs font-semibold">
                    {member.community.name?.[0]?.toUpperCase() ?? 'C'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{member.community.name ?? 'Community'}</p>
                  <p className="text-xs text-muted-foreground capitalize">{member.role ?? 'Mitglied'}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
