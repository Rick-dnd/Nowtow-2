'use client';

import Image from 'next/image';
import { MapPin, Users, Heart, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { SpaceFilters } from '@/app/spaces/page';
import type { ViewMode, SortOption } from '@/components/shared/ViewControls';
import { cn } from '@/lib/utils';
import { useSpaces } from '@/hooks/useSpaces';

interface SpacesListProps {
  filters: SpaceFilters;
  viewMode?: ViewMode;
  sortBy?: SortOption;
}

export function SpacesList({ filters, viewMode = 'list', sortBy = 'relevance' }: SpacesListProps): React.ReactElement {
  // Fetch spaces from Supabase
  const { data: spaces, isLoading, error } = useSpaces({
    searchQuery: filters.search,
    spaceType: filters.spaceTypes.length > 0 ? filters.spaceTypes[0] : undefined,
  });

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Lädt Räume...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Fehler beim Laden der Räume.</p>
      </div>
    );
  }

  // Filter spaces based on filters
  let filteredSpaces = (spaces || []).filter((space) => {
    const hourlyPrice = Number(space.hourly_price) || 0;
    if (hourlyPrice < filters.priceRange[0] || hourlyPrice > filters.priceRange[1]) {
      return false;
    }
    const spaceCapacity = space.capacity || 0;
    if (spaceCapacity < filters.capacity) {
      return false;
    }
    return true;
  });

  // Sort spaces
  filteredSpaces = [...filteredSpaces].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return (a.hourly_price || 0) - (b.hourly_price || 0);
      case 'price-desc':
        return (b.hourly_price || 0) - (a.hourly_price || 0);
      case 'date-newest':
      case 'date-oldest':
        return 0;
      case 'popularity':
        return (b.capacity || 0) - (a.capacity || 0);
      case 'relevance':
      default:
        return 0;
    }
  });

  if (filteredSpaces.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Keine Räume gefunden. Versuche andere Filter.</p>
      </div>
    );
  }

  return (
    <div className={cn(
      'p-4',
      viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'
    )}>
      {filteredSpaces.map((space, index) =>
        viewMode === 'list' ? (
          // List View
          <div key={`space-card-${index}`} className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group flex">
            <div className="relative w-48 flex-shrink-0 bg-muted overflow-hidden">
              {space.image_url ? (
                <Image
                  src={space.image_url}
                  alt={space.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="192px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <Building2 className="h-16 w-16 text-blue-600" />
                </div>
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg line-clamp-1 mb-1">{space.name}</h3>
                    {space.type && (
                      <Badge variant="secondary" className="mb-2">
                        {space.type}
                      </Badge>
                    )}
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full flex-shrink-0">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{space.address?.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{space.capacity || 0} Personen</span>
                  </div>
                </div>
              </div>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-xl font-bold text-foreground">€{space.hourly_price || 0}</span>
                <span className="text-sm text-muted-foreground">/ Stunde</span>
              </div>
            </div>
          </div>
        ) : (
          // Grid View
          <div key={`space-card-${index}`} className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group">
            <div className="relative w-full h-48 bg-muted overflow-hidden">
              {space.image_url ? (
                <Image
                  src={space.image_url}
                  alt={space.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <Building2 className="h-20 w-20 text-blue-600" />
                </div>
              )}
              <Button variant="ghost" size="icon" className="absolute top-3 right-3 h-8 w-8 bg-white/90 hover:bg-white rounded-full">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4">
              <div className="mb-2">
                <h3 className="font-semibold text-base line-clamp-1 mb-1">{space.name}</h3>
                {space.type && (
                  <Badge variant="secondary" className="mb-2">
                    {space.type}
                  </Badge>
                )}
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="line-clamp-1">{space.address?.split(',')[0]}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Users className="h-4 w-4" />
                <span>{space.capacity || 0} Personen</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-foreground">€{space.hourly_price || 0}</span>
                <span className="text-sm text-muted-foreground">/ Stunde</span>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
