'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import type { DateRange } from 'react-day-picker';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { EventsSearchBar } from '@/components/events/EventsSearchBar';
import { EventsTagBar } from '@/components/events/EventsTagBar';
import { EventsAdvancedFilters } from '@/components/events/EventsAdvancedFilters';
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

function EventsPageContent(): React.ReactElement {
  const searchParams = useSearchParams();

  // State for search bar
  const [location, setLocation] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [subcategory, setSubcategory] = useState<string>('');
  const [guests, setGuests] = useState({ adults: 0, children: 0, pets: 0 });

  // State for tag filters
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // State for advanced filters
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    distance: 10,
    priceRange: [0, 100] as [number, number],
    verifiedOnly: false,
  });

  // Legacy filter state for compatibility
  const [filters, setFilters] = useState<EventFilters>({
    search: '',
    categories: [],
    dateRange: { start: null, end: null },
    priceRange: [0, 100],
    capacity: 1,
  });

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');

  // Initialize from URL parameters on mount
  useEffect((): void => {
    const urlLocation = searchParams.get('location') || '';
    const category = searchParams.get('category');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const adults = parseInt(searchParams.get('adults') || '0');
    const children = parseInt(searchParams.get('children') || '0');

    setLocation(urlLocation);

    if (from && to) {
      setDateRange({ from: new Date(from), to: new Date(to) });
    }

    // Set legacy filters for compatibility
    setFilters(prev => ({
      ...prev,
      search: urlLocation,
      categories: category ? [category] : [],
      dateRange: {
        start: from ? new Date(from) : null,
        end: to ? new Date(to) : null,
      },
      capacity: adults + children || 1,
    }));
  }, [searchParams]);

  // Tag toggle handler
  const handleTagToggle = (tagId: string): void => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  // Clear all tags
  const handleClearAllTags = (): void => {
    setSelectedTags([]);
  };

  // Apply advanced filters
  const handleApplyAdvancedFilters = (): void => {
    // Sync with legacy filter state
    setFilters(prev => ({
      ...prev,
      priceRange: advancedFilters.priceRange,
    }));
  };

  // Reset advanced filters
  const handleResetAdvancedFilters = (): void => {
    setAdvancedFilters({
      distance: 10,
      priceRange: [0, 100],
      verifiedOnly: false,
    });
  };

  // Handle Kostenpflichtig tag click - opens Advanced Filters
  const handleKostenpflichtigClick = (): void => {
    setAdvancedFiltersOpen(true);
  };

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
      <main className="h-screen pt-12 flex flex-col">
        {/* Search Bar */}
        <EventsSearchBar
          location={location}
          onLocationChange={setLocation}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          subcategory={subcategory}
          onSubcategoryChange={setSubcategory}
          guests={guests}
          onGuestsChange={setGuests}
          onAdvancedFiltersClick={(): void => setAdvancedFiltersOpen(true)}
        />

        {/* Tag Bar */}
        <EventsTagBar
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          onClearAll={handleClearAllTags}
          onKostenpflichtigClick={handleKostenpflichtigClick}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar with List */}
          <div className="w-[45%] flex-shrink-0 flex flex-col bg-background border-r border-border">
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
        </div>

        {/* Advanced Filters Sheet */}
        <EventsAdvancedFilters
          open={advancedFiltersOpen}
          onOpenChange={setAdvancedFiltersOpen}
          filters={advancedFilters}
          onFiltersChange={setAdvancedFilters}
          onApply={handleApplyAdvancedFilters}
          onReset={handleResetAdvancedFilters}
        />
      </main>
      <Footer />
    </>
  );
}

export default function EventsPage(): React.ReactElement {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventsPageContent />
    </Suspense>
  );
}
