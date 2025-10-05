'use client';

import { useEffect, useState, useRef } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import type { Marker } from '@googlemaps/markerclusterer';
import { useEvents } from '@/hooks/useEvents';
import type { EventFilters } from '@/app/events/page';
import type { Database } from '@/types/database';

type Event = Database['public']['Tables']['events']['Row'];

interface EventsMapProps {
  filters: EventFilters;
}

function ClusteredMarkers({ events }: { events: Event[] }): React.ReactElement {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  // Initialize MarkerClusterer
  useEffect(() => {
    if (!map) return;

    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({
        map,
        markers: [],
        renderer: {
          render: ({ count, position }): google.maps.Marker => {
            const color = count > 10 ? '#dc2626' : count > 5 ? '#f59e0b' : '#10b981';
            return new google.maps.Marker({
              position,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 25,
                fillColor: color,
                fillOpacity: 0.9,
                strokeWeight: 3,
                strokeColor: '#ffffff',
              },
              label: {
                text: String(count),
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 'bold',
              },
              zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
            });
          },
        },
      });
    }
  }, [map]);

  // Update markers when events change
  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string): void => {
    if (marker && markers[key] !== marker) {
      setMarkers((prev) => ({ ...prev, [key]: marker }));
    } else if (!marker && markers[key]) {
      setMarkers((prev) => {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      });
    }
  };

  return (
    <>
      {events.filter(event => event.latitude && event.longitude).map((event, index) => (
        <AdvancedMarker
          key={`event-${index}`}
          position={{ lat: event.latitude!, lng: event.longitude! }}
          ref={(marker) => setMarkerRef(marker, `event-${index}`)}
        >
          <Pin
            background="#10b981"
            borderColor="#059669"
            glyphColor="#d1fae5"
          />
        </AdvancedMarker>
      ))}
    </>
  );
}

export function EventsMap({ filters }: EventsMapProps): React.ReactElement {
  // Fetch events using real Supabase data
  const { data: events, isLoading, error } = useEvents({
    searchQuery: filters.search,
    category: filters.categories.length > 0 ? filters.categories[0] : undefined,
    maxPrice: filters.priceRange[1],
  });

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  if (!apiKey) {
    return (
      <div className="h-[600px] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Google Maps API Key nicht konfiguriert</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-[600px] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Lade Events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[600px] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-destructive">Fehler beim Laden der Events: {error.message}</p>
      </div>
    );
  }

  const filteredEvents = (events || []).filter((event) => {
    // Additional client-side filtering for capacity
    const eventCapacity = event.max_attendees || 0;
    if (eventCapacity < filters.capacity) {
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
          mapId="nowtown-events-map"
          gestureHandling="greedy"
          disableDefaultUI={false}
          streetViewControl={false}
          mapTypeControl={false}
          mapTypeId="roadmap"
        >
          {filteredEvents.length > 0 && <ClusteredMarkers events={filteredEvents} />}
        </Map>
      </APIProvider>
    </div>
  );
}
