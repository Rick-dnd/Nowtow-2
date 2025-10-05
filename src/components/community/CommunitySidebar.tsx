'use client';

import { Home, Users, Calendar, Bookmark, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const menuItems = [
  { icon: Home, label: 'Feed', href: '/community' },
  { icon: Users, label: 'Communities', href: '/community/communities' },
  { icon: Calendar, label: 'Events', href: '/events' },
  { icon: Bookmark, label: 'Saved', href: '/community/saved' },
  { icon: TrendingUp, label: 'Leaderboard', href: '/community/leaderboard' },
];

const myCommunities = [
  { id: '1', name: 'Art & Kreativ', members: 234 },
  { id: '2', name: 'Musik', members: 156 },
  { id: '3', name: 'Sport', members: 189 },
];

export function CommunitySidebar(): React.ReactElement {
  return (
    <div className="space-y-4">
      {/* Main Menu */}
      <div className="bg-card rounded-2xl p-4 shadow-sm">
        <h3 className="font-semibold mb-3">Menu</h3>
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
          <h3 className="font-semibold">My Communities</h3>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
            + New
          </Button>
        </div>
        <div className="space-y-2">
          {myCommunities.map((community) => (
            <button
              key={community.id}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white text-xs font-semibold">
                {community.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{community.name}</p>
                <p className="text-xs text-muted-foreground">{community.members} members</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
