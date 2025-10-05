'use client';

import { mockSpaces } from '@/lib/mock-data';
import Image from 'next/image';
import { MapPin, Users, Heart, Ruler, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { SpaceFilters } from '@/app/spaces/page';

interface SpacesListProps {
  filters: SpaceFilters;
}

export function SpacesList({ filters }: SpacesListProps): React.ReactElement {
  // Filter spaces based on filters (using mock data for now)
  const filteredSpaces = mockSpaces.filter((space) => {
    if (filters.search && !space.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.spaceTypes.length > 0 && !filters.spaceTypes.includes(space.space_type)) {
      return false;
    }
    if (space.hourly_rate < filters.priceRange[0] || space.hourly_rate > filters.priceRange[1]) {
      return false;
    }
    if (space.size_sqm < filters.sizeRange[0] || space.size_sqm > filters.sizeRange[1]) {
      return false;
    }
    if (space.capacity < filters.capacity) {
      return false;
    }
    return true;
  });

  if (filteredSpaces.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Keine Räume gefunden. Versuche andere Filter.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {filteredSpaces.map((space, index) => (
        <div key={`space-card-${index}`} className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group">
          {/* Image */}
          <div className="relative w-full h-48 bg-muted overflow-hidden">
            {space.image_urls?.[0] ? (
              <Image
                src={space.image_urls[0]}
                alt={space.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                <Building2 className="h-20 w-20 text-emerald-600" />
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 h-8 w-8 bg-white/90 hover:bg-white rounded-full"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="mb-2">
              <h3 className="font-semibold text-base line-clamp-1 mb-1">{space.title}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span className="line-clamp-1">{space.location_address.split(',')[0]}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{space.capacity} Personen</span>
              </div>
              <div className="flex items-center gap-1">
                <Ruler className="h-4 w-4" />
                <span>{space.size_sqm}m²</span>
              </div>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-foreground">€{space.hourly_rate}</span>
              <span className="text-sm text-muted-foreground">/ Stunde</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
