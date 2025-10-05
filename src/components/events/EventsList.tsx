'use client';

import { mockEvents } from '@/lib/mock-data';
import Image from 'next/image';
import { MapPin, Users, Heart, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { EventFilters } from '@/app/events/page';

interface EventsListProps {
  filters: EventFilters;
}

export function EventsList({ filters }: EventsListProps): React.ReactElement {
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

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Keine Events gefunden. Versuche andere Filter.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {filteredEvents.map((event, index) => (
        <div key={`event-card-${index}`} className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group">
          {/* Image */}
          <div className="relative w-full h-48 bg-muted overflow-hidden">
            {event.image_urls?.[0] ? (
              <Image
                src={event.image_urls[0]}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                <Calendar className="h-20 w-20 text-emerald-600" />
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
              <h3 className="font-semibold text-base line-clamp-1 mb-1">{event.title}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span className="line-clamp-1">{event.location_address.split(',')[0]}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Users className="h-4 w-4" />
              <span>{event.capacity} Teilnehmer</span>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-foreground">€{event.price}</span>
              <span className="text-sm text-muted-foreground">/ Monat</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
