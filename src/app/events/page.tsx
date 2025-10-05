'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { EventsFilterSidebar } from '@/components/events/EventsFilterSidebar';
import { EventsList } from '@/components/events/EventsList';
import { EventsMap } from '@/components/events/EventsMap';
import { ViewControls, type ViewMode, type SortOption } from '@/components/shared/ViewControls';
import { useEvents } from '@/hooks/useEvents';

export interface EventFilters {
  search: string;
  categories: string[];
  dateRange: { start: Date | null; end: Date | null };
  priceRange: [number, number];
  capacity: number;
}

export default function EventsPage(): React.ReactElement {
  const [filters, setFilters] = useState<EventFilters>({
    search: '',
    categories: [],
    dateRange: { start: null, end: null },
    priceRange: [0, 100],
    capacity: 1,
  });

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');

  // Fetch events from Supabase
  const { data: events } = useEvents({
    searchQuery: filters.search,
    category: filters.categories.length > 0 ? filters.categories[0] : undefined,
    maxPrice: filters.priceRange[1],
  });

  // Calculate filtered count
  const filteredCount = (events || []).filter((event) => {
    const eventPrice = Number(event.ticket_price) || 0;
    if (eventPrice < filters.priceRange[0] || eventPrice > filters.priceRange[1]) {
      return false;
    }
    const eventCapacity = event.max_attendees || 0;
    if (eventCapacity < filters.capacity) {
      return false;
    }
    return true;
  }).length;

  return (
    <>
      <Header />
      <main className="h-screen pt-16 flex">
        {/* Left Sidebar with Filters and List */}
        <div className="w-[45%] flex-shrink-0 flex flex-col bg-background border-r border-border">
          {/* Filter Bar */}
          <div className="p-4 border-b border-border">
            <EventsFilterSidebar filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* View Controls */}
          <div className="px-4 py-3 border-b border-border bg-muted/30">
            <ViewControls
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortChange={setSortBy}
              resultsCount={filteredCount}
            />
          </div>

          {/* Events List */}
          <div className="flex-1 overflow-y-auto">
            <EventsList filters={filters} viewMode={viewMode} sortBy={sortBy} />
          </div>
        </div>

        {/* Right Map */}
        <div className="w-[55%] relative">
          <EventsMap filters={filters} />
        </div>
      </main>
      <Footer />
    </>
  );
}
