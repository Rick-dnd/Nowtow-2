'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import type { EventFilters } from '@/app/events/page';

interface EventsFilterSidebarProps {
  filters: EventFilters;
  onFiltersChange: (filters: EventFilters) => void;
}

const categories = [
  { id: 'kunst-kreativ', label: 'Kunst & Kreativ' },
  { id: 'musik-performance', label: 'Musik & Performance' },
  { id: 'sport-fitness', label: 'Sport & Fitness' },
  { id: 'familie-kinder', label: 'Familie & Kinder' },
  { id: 'workshop', label: 'Workshop' },
  { id: 'essen-geniessen', label: 'Essen & Genießen' },
  { id: 'spontane-treffen', label: 'Spontane Treffen' },
  { id: 'party-nightlife', label: 'Party & Nightlife' },
];

export function EventsFilterSidebar({ filters, onFiltersChange }: EventsFilterSidebarProps): React.ReactElement {
  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Suche Events..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="pl-10 rounded-full border-border bg-background"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={filters.categories.includes(category.id) ? 'default' : 'outline'}
            size="sm"
            className="rounded-full text-xs px-4"
            onClick={() => {
              const newCategories = filters.categories.includes(category.id)
                ? filters.categories.filter((c) => c !== category.id)
                : [...filters.categories, category.id];
              onFiltersChange({ ...filters, categories: newCategories });
            }}
          >
            {category.label}
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
