'use client';

import { useEvents } from '@/hooks/useEvents';
import Image from 'next/image';
import { MapPin, Users, Heart, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { EventFilters } from '@/app/events/page';
import type { ViewMode, SortOption } from '@/components/shared/ViewControls';
import { cn } from '@/lib/utils';

interface EventsListProps {
  filters: EventFilters;
  viewMode?: ViewMode;
  sortBy?: SortOption;
}

export function EventsList({ filters, viewMode = 'list', sortBy = 'relevance' }: EventsListProps): React.ReactElement {
  // Fetch events using real Supabase data
  const { data: events, isLoading, error } = useEvents({
    searchQuery: filters.search,
    category: filters.categories.length > 0 ? filters.categories[0] : undefined,
    maxPrice: filters.priceRange[1],
  });

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Lade Events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Fehler beim Laden der Events: {error.message}</p>
      </div>
    );
  }

  // Additional client-side filtering
  let filteredEvents = (events || []).filter((event) => {
    const eventPrice = Number(event.ticket_price) || 0;
    if (eventPrice < filters.priceRange[0] || eventPrice > filters.priceRange[1]) {
      return false;
    }
    const eventCapacity = event.max_attendees || 0;
    if (eventCapacity < filters.capacity) {
      return false;
    }
    return true;
  });

  // Sort events
  filteredEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return (Number(a.ticket_price) || 0) - (Number(b.ticket_price) || 0);
      case 'price-desc':
        return (Number(b.ticket_price) || 0) - (Number(a.ticket_price) || 0);
      case 'date-newest':
        return new Date(b.start_datetime).getTime() - new Date(a.start_datetime).getTime();
      case 'date-oldest':
        return new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime();
      case 'popularity':
        return (b.max_attendees || 0) - (a.max_attendees || 0);
      case 'relevance':
      default:
        return 0;
    }
  });

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Keine Events gefunden. Versuche andere Filter.</p>
      </div>
    );
  }

  return (
    <div className={cn(
      'p-4',
      viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'
    )}>
      {filteredEvents.map((event, index) =>
        viewMode === 'list' ? (
          // List View - Horizontal Layout
          <div key={`event-card-${index}`} className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group flex">
            {/* Image */}
            <div className="relative w-48 flex-shrink-0 bg-muted overflow-hidden">
              {event.image_url ? (
                <Image
                  src={event.image_url}
                  alt={event.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="192px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                  <Calendar className="h-16 w-16 text-emerald-600" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg line-clamp-1 mb-1">{event.name}</h3>
                    {event.category && (
                      <Badge variant="secondary" className="mb-2">
                        {event.category}
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full flex-shrink-0"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{event.address?.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{event.max_attendees || 0} Teilnehmer</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-foreground">€{Number(event.ticket_price) || 0}</span>
                  <span className="text-sm text-muted-foreground">/ Ticket</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Grid View - Vertical Layout
          <div key={`event-card-${index}`} className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group">
            {/* Image */}
            <div className="relative w-full h-48 bg-muted overflow-hidden">
              {event.image_url ? (
                <Image
                  src={event.image_url}
                  alt={event.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                <h3 className="font-semibold text-base line-clamp-1 mb-1">{event.name}</h3>
                {event.category && (
                  <Badge variant="secondary" className="mb-2">
                    {event.category}
                  </Badge>
                )}
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="line-clamp-1">{event.address?.split(',')[0]}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Users className="h-4 w-4" />
                <span>{event.max_attendees || 0} Teilnehmer</span>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-foreground">€{Number(event.ticket_price) || 0}</span>
                <span className="text-sm text-muted-foreground">/ Ticket</span>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
