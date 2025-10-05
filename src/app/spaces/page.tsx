'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SpacesFilterSidebar } from '@/components/spaces/SpacesFilterSidebar';
import { SpacesList } from '@/components/spaces/SpacesList';
import { SpacesMap } from '@/components/spaces/SpacesMap';

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

          {/* Spaces List */}
          <div className="flex-1 overflow-y-auto">
            <SpacesList filters={filters} />
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
