'use client';

import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { mockSpaces } from '@/lib/mock-data';
import type { SpaceFilters } from '@/app/spaces/page';

interface SpacesMapProps {
  filters: SpaceFilters;
}

export function SpacesMap({ filters }: SpacesMapProps): React.ReactElement {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  // Filter spaces based on filters
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

  return (
    <div className="h-full w-full">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={{ lat: 48.1351, lng: 11.582 }}
          defaultZoom={12}
          mapId="nowtown-spaces-map"
          gestureHandling="greedy"
          disableDefaultUI={false}
          streetViewControl={false}
          mapTypeControl={false}
          mapTypeId="roadmap"
        >
          {filteredSpaces.map((space, index) => (
            <AdvancedMarker
              key={`space-${index}`}
              position={{ lat: space.location_lat, lng: space.location_lng }}
            >
              <Pin
                background="#10b981"
                borderColor="#059669"
                glyphColor="#d1fae5"
              />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}
