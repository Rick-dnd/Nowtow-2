'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SpacesFilterSidebar } from '@/components/spaces/SpacesFilterSidebar';
import { SpacesList } from '@/components/spaces/SpacesList';
import { SpacesMap } from '@/components/spaces/SpacesMap';
import { ViewControls, type ViewMode, type SortOption } from '@/components/shared/ViewControls';
import { useSpaces } from '@/hooks/useSpaces';

export interface SpaceFilters {
  search: string;
  spaceTypes: string[];
  priceRange: [number, number];
  sizeRange: [number, number];
  capacity: number;
  amenities: string[];
  instantBookOnly: boolean;
}

export default function SpacesPage(): React.ReactElement {
  const [filters, setFilters] = useState<SpaceFilters>({
    search: '',
    spaceTypes: [],
    priceRange: [0, 200],
    sizeRange: [0, 500],
    capacity: 1,
    amenities: [],
    instantBookOnly: false,
  });

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');

  // Fetch spaces from Supabase
  const { data: spaces } = useSpaces({
    searchQuery: filters.search,
    spaceType: filters.spaceTypes.length > 0 ? filters.spaceTypes[0] : undefined,
  });

  const filteredCount = (spaces || []).filter((space) => {
    const hourlyPrice = Number(space.hourly_price) || 0;
    if (hourlyPrice < filters.priceRange[0] || hourlyPrice > filters.priceRange[1]) return false;
    const spaceCapacity = space.capacity || 0;
    if (spaceCapacity < filters.capacity) return false;
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
            <SpacesFilterSidebar filters={filters} onFiltersChange={setFilters} />
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

          {/* Spaces List */}
          <div className="flex-1 overflow-y-auto">
            <SpacesList filters={filters} viewMode={viewMode} sortBy={sortBy} />
          </div>
        </div>

        {/* Right Map */}
        <div className="w-[55%] relative">
          <SpacesMap filters={filters} />
        </div>
      </main>
      <Footer />
    </>
  );
}
