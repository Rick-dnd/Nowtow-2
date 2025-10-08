'use client';

import { TrendingUp, Users, Loader2 } from 'lucide-react';
import { useCommunities } from '@/hooks/useCommunities';
import { useMemo } from 'react';

const communityColors = [
  'from-purple-500 to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-green-500 to-emerald-500',
  'from-orange-500 to-red-500',
  'from-indigo-500 to-purple-500',
];

export function TrendingSidebar(): React.ReactElement {
  const { data: allCommunities, isLoading: communitiesLoading } = useCommunities({ limit: 100 });

  // Sort communities by member count and take top 3
  const trendingCommunities = useMemo(() => {
    if (!allCommunities) return [];
    return [...allCommunities]
      .sort((a, b) => (b.members_count ?? 0) - (a.members_count ?? 0))
      .slice(0, 3);
  }, [allCommunities]);

  return (
    <div className="space-y-4">
      {/* Trending Communities */}
      <div className="bg-card rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Beliebte Communities</h3>
        </div>
        {communitiesLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : trendingCommunities.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Keine Communities gefunden
          </p>
        ) : (
          <div className="space-y-2">
            {trendingCommunities.map((community, index) => {
              const colorClass = communityColors[index % communityColors.length] ?? 'from-primary to-emerald-600';
              return (
                <a
                  key={community.id}
                  href={`/community/c/${community.slug}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center text-white text-sm font-semibold`}>
                    {community.name?.[0]?.toUpperCase() ?? 'C'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{community.name}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{community.members_count ?? 0} Mitglieder</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* Suggested Users */}
      <div className="bg-card rounded-2xl p-4 shadow-sm">
        <h3 className="font-semibold mb-3">Vorschläge für dich</h3>
        <p className="text-sm text-muted-foreground text-center py-4">
          Keine Vorschläge verfügbar
        </p>
      </div>

      {/* Active Now */}
      <div className="bg-card rounded-2xl p-4 shadow-sm">
        <h3 className="font-semibold mb-3">Gerade aktiv</h3>
        <p className="text-sm text-muted-foreground text-center py-4">
          Niemand ist gerade aktiv
        </p>
      </div>
    </div>
  );
}
