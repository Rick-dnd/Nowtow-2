'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import type { SpaceFilters } from '@/app/spaces/page';

interface SpacesFilterSidebarProps {
  filters: SpaceFilters;
  onFiltersChange: (filters: SpaceFilters) => void;
}

const spaceTypes = [
  { id: 'tonstudio', label: 'Tonstudio' },
  { id: 'fotostudio', label: 'Fotostudio' },
  { id: 'werkstaetten', label: 'Werkstätten' },
  { id: 'kunst-toepfer', label: 'Kunst & Töpfer' },
  { id: 'popup-retail', label: 'Popup & Retail' },
  { id: 'sportraeume', label: 'Sporträume' },
  { id: 'gaming-podcast', label: 'Gaming & Podcast' },
  { id: 'kuechen-food', label: 'Küchen & Food' },
];

export function SpacesFilterSidebar({ filters, onFiltersChange }: SpacesFilterSidebarProps): React.ReactElement {
  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Suche Räume..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="pl-10 rounded-full border-border bg-background"
        />
      </div>

      {/* Space Type Pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {spaceTypes.map((type) => (
          <Button
            key={type.id}
            variant={filters.spaceTypes.includes(type.id) ? 'default' : 'outline'}
            size="sm"
            className="rounded-full text-xs px-4"
            onClick={() => {
              const newTypes = filters.spaceTypes.includes(type.id)
                ? filters.spaceTypes.filter((t) => t !== type.id)
                : [...filters.spaceTypes, type.id];
              onFiltersChange({ ...filters, spaceTypes: newTypes });
            }}
          >
            {type.label}
          </Button>
        ))}

        {/* Search on Map Button */}
        <Button variant="outline" size="sm" className="rounded-full ml-auto text-xs">
          <Search className="h-3.5 w-3.5 mr-1.5" />
          Auf Karte suchen
        </Button>
      </div>
    </div>
  );
}
