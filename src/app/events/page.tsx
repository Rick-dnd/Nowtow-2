'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { EventsFilterSidebar } from '@/components/events/EventsFilterSidebar';
import { EventsList } from '@/components/events/EventsList';
import { EventsMap } from '@/components/events/EventsMap';

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

          {/* Events List */}
          <div className="flex-1 overflow-y-auto">
            <EventsList filters={filters} />
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
