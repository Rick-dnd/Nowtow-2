'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ViewControls, type ViewMode, type SortOption } from '@/components/shared/ViewControls';
import { useEvents } from '@/hooks/useEvents';
import { useSpaces } from '@/hooks/useSpaces';
import { useServices } from '@/hooks/useServices';
import { EventCard } from '@/components/cards/EventCard';
import { SpaceCard } from '@/components/cards/SpaceCard';
import { ServiceCard } from '@/components/services/ServiceCard';
import { Badge } from '@/components/ui/badge';
import { Calendar, Building2, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

type SearchCategory = 'all' | 'events' | 'spaces' | 'services';

function SearchPageContent(): React.ReactElement {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') as SearchCategory | null;

  const [activeCategory, setActiveCategory] = useState<SearchCategory>(categoryParam || 'all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');

  // Fetch data from Supabase
  const { data: events } = useEvents({ searchQuery: query });
  const { data: spaces } = useSpaces({ searchQuery: query });
  const { data: services } = useServices({ searchQuery: query });

  useEffect((): void => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  // Filter results are already handled by the API queries
  const filteredEvents = events || [];
  const filteredSpaces = spaces || [];
  const filteredServices = services || [];

  const totalResults = filteredEvents.length + filteredSpaces.length + filteredServices.length;

  const getActiveResults = (): number => {
    switch (activeCategory) {
      case 'events':
        return filteredEvents.length;
      case 'spaces':
        return filteredSpaces.length;
      case 'services':
        return filteredServices.length;
      case 'all':
      default:
        return totalResults;
    }
  };

  // Sort functions
  const sortEvents = (events: typeof filteredEvents): typeof filteredEvents => {
    return [...events].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return (Number(a.ticket_price) || 0) - (Number(b.ticket_price) || 0);
        case 'price-desc':
          return (Number(b.ticket_price) || 0) - (Number(a.ticket_price) || 0);
        case 'relevance':
        default:
          return 0;
      }
    });
  };

  const sortSpaces = (spaces: typeof filteredSpaces): typeof filteredSpaces => {
    return [...spaces].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return (Number(a.hourly_price) || 0) - (Number(b.hourly_price) || 0);
        case 'price-desc':
          return (Number(b.hourly_price) || 0) - (Number(a.hourly_price) || 0);
        case 'relevance':
        default:
          return 0;
      }
    });
  };

  const sortServices = (services: typeof filteredServices): typeof filteredServices => {
    return [...services].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return (Number(a.price_from) || 0) - (Number(b.price_from) || 0);
        case 'price-desc':
          return (Number(b.price_from) || 0) - (Number(a.price_from) || 0);
        case 'relevance':
        default:
          return 0;
      }
    });
  };

  const sortedEvents = sortEvents(filteredEvents);
  const sortedSpaces = sortSpaces(filteredSpaces);
  const sortedServices = sortServices(filteredServices);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Search Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">
              Suchergebnisse für &quot;{query}&quot;
            </h1>
            <p className="text-muted-foreground">
              {totalResults} {totalResults === 1 ? 'Ergebnis' : 'Ergebnisse'} gefunden
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeCategory} onValueChange={(value): void => setActiveCategory(value as SearchCategory)}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <TabsList>
                <TabsTrigger value="all">
                  Alle ({totalResults})
                </TabsTrigger>
                <TabsTrigger value="events">
                  <Calendar className="h-4 w-4 mr-2" />
                  Events ({filteredEvents.length})
                </TabsTrigger>
                <TabsTrigger value="spaces">
                  <Building2 className="h-4 w-4 mr-2" />
                  Räume ({filteredSpaces.length})
                </TabsTrigger>
                <TabsTrigger value="services">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Services ({filteredServices.length})
                </TabsTrigger>
              </TabsList>

              <ViewControls
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                sortBy={sortBy}
                onSortChange={setSortBy}
                resultsCount={getActiveResults()}
              />
            </div>

            {/* All Results */}
            <TabsContent value="all">
              {totalResults === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Keine Ergebnisse gefunden. Versuche eine andere Suchanfrage.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {filteredEvents.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-xl font-semibold">Events</h2>
                        <Badge variant="secondary">{filteredEvents.length}</Badge>
                      </div>
                      <div className={cn(
                        viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'
                      )}>
                        {sortedEvents.slice(0, 6).map((event, index: number) => (
                          <EventCard key={`event-${index}`} event={event} />
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredSpaces.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-xl font-semibold">Räume</h2>
                        <Badge variant="secondary">{filteredSpaces.length}</Badge>
                      </div>
                      <div className={cn(
                        viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'
                      )}>
                        {sortedSpaces.slice(0, 6).map((space, index: number) => (
                          <SpaceCard key={`space-${index}`} space={space} />
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredServices.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-xl font-semibold">Services</h2>
                        <Badge variant="secondary">{filteredServices.length}</Badge>
                      </div>
                      <div className={cn(
                        viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'
                      )}>
                        {sortedServices.slice(0, 6).map((service, index: number) => (
                          <ServiceCard key={`service-${index}`} service={service} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            {/* Events Only */}
            <TabsContent value="events">
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Keine Events gefunden.</p>
                </div>
              ) : (
                <div className={cn(
                  viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'
                )}>
                  {sortedEvents.map((event, index: number) => (
                    <EventCard key={`event-${index}`} event={event} />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Spaces Only */}
            <TabsContent value="spaces">
              {filteredSpaces.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Keine Räume gefunden.</p>
                </div>
              ) : (
                <div className={cn(
                  viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'
                )}>
                  {sortedSpaces.map((space, index: number) => (
                    <SpaceCard key={`space-${index}`} space={space} />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Services Only */}
            <TabsContent value="services">
              {filteredServices.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Keine Services gefunden.</p>
                </div>
              ) : (
                <div className={cn(
                  viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'
                )}>
                  {sortedServices.map((service, index: number) => (
                    <ServiceCard key={`service-${index}`} service={service} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function SearchPage(): React.ReactElement {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
