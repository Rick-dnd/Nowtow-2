'use client';

import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { mockEvents } from '@/lib/mock-data';
import type { EventFilters } from '@/app/events/page';

interface EventsMapProps {
  filters: EventFilters;
}

export function EventsMap({ filters }: EventsMapProps): React.ReactElement {
  // Filter events based on filters (using mock data for now)
  const filteredEvents = mockEvents.filter((event) => {
    if (filters.search && !event.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.categories.length > 0 && !filters.categories.includes(event.category)) {
      return false;
    }
    if (event.price < filters.priceRange[0] || event.price > filters.priceRange[1]) {
      return false;
    }
    if (event.capacity < filters.capacity) {
      return false;
    }
    return true;
  });

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  if (!apiKey) {
    return (
      <div className="h-[600px] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Google Maps API Key nicht konfiguriert</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={{ lat: 48.1351, lng: 11.582 }}
          defaultZoom={12}
          mapId="nowtown-events-map"
          gestureHandling="greedy"
          disableDefaultUI={false}
          streetViewControl={false}
          mapTypeControl={false}
          mapTypeId="roadmap"
        >
          {filteredEvents.map((event, index) => (
            <AdvancedMarker
              key={`event-${index}`}
              position={{ lat: event.location_lat, lng: event.location_lng }}
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
