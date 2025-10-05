'use client';

import { TrendingUp, Users, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const trendingCommunities = [
  { id: '1', name: 'Art & Kreativ', members: 234, color: 'from-purple-500 to-pink-500' },
  { id: '2', name: 'Music', members: 156, color: 'from-blue-500 to-cyan-500' },
  { id: '3', name: 'Sport & Fitness', members: 189, color: 'from-green-500 to-emerald-500' },
];

const suggestedUsers = [
  { id: '1', username: 'photographer_pro', bio: 'Professional photographer' },
  { id: '2', username: 'fitness_coach', bio: 'Personal trainer' },
  { id: '3', username: 'art_enthusiast', bio: 'Art lover & collector' },
];

const activeNow = [
  { id: '1', username: 'user1' },
  { id: '2', username: 'user2' },
  { id: '3', username: 'user3' },
];

export function TrendingSidebar(): React.ReactElement {
  return (
    <div className="space-y-4">
      {/* Trending Communities */}
      <div className="bg-card rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Trending Communities</h3>
        </div>
        <div className="space-y-2">
          {trendingCommunities.map((community) => (
            <div
              key={community.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${community.color} flex items-center justify-center text-white text-sm font-semibold`}>
                {community.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{community.name}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>{community.members} members</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Users */}
      <div className="bg-card rounded-2xl p-4 shadow-sm">
        <h3 className="font-semibold mb-3">Suggested for You</h3>
        <div className="space-y-3">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                {user.username?.[0]?.toUpperCase() ?? 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">@{user.username}</p>
                <p className="text-xs text-muted-foreground truncate">{user.bio}</p>
              </div>
              <Button size="sm" variant="outline" className="rounded-full">
                <UserPlus className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Active Now */}
      <div className="bg-card rounded-2xl p-4 shadow-sm">
        <h3 className="font-semibold mb-3">Active Now</h3>
        <div className="space-y-2">
          {activeNow.map((user) => (
            <div key={user.id} className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white text-sm font-semibold">
                  {user.username?.[0]?.toUpperCase() ?? 'A'}
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
              </div>
              <p className="text-sm font-medium">@{user.username}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
