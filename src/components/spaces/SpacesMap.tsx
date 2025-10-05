'use client';

import { useEffect, useState, useRef } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import type { Marker } from '@googlemaps/markerclusterer';
import { useSpaces } from '@/hooks/useSpaces';
import type { SpaceFilters } from '@/app/spaces/page';
import type { Database } from '@/types/database';

type Space = Database['public']['Tables']['spaces']['Row'];

interface SpacesMapProps {
  filters: SpaceFilters;
}

function ClusteredMarkers({ spaces }: { spaces: Space[] }): React.ReactElement {
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

  // Update markers when spaces change
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
      {spaces.filter(space => space.latitude && space.longitude).map((space, index) => (
        <AdvancedMarker
          key={`space-${index}`}
          position={{ lat: space.latitude!, lng: space.longitude! }}
          ref={(marker) => setMarkerRef(marker, `space-${index}`)}
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

export function SpacesMap({ filters }: SpacesMapProps): React.ReactElement {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  // Fetch spaces from Supabase
  const { data: spaces, isLoading, error } = useSpaces({
    searchQuery: filters.search,
    spaceType: filters.spaceTypes.length > 0 ? filters.spaceTypes[0] : undefined,
  });

  // Filter spaces based on filters
  const filteredSpaces = (spaces || []).filter((space) => {
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

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-muted">
        <p className="text-muted-foreground">Lädt Karte...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-muted">
        <p className="text-destructive">Fehler beim Laden der Karte.</p>
      </div>
    );
  }

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
          {filteredSpaces.length > 0 && <ClusteredMarkers spaces={filteredSpaces} />}
        </Map>
      </APIProvider>
    </div>
  );
}
