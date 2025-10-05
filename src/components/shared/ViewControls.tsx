'use client';

import React from 'react';
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export type ViewMode = 'grid' | 'list';

export type SortOption =
  | 'relevance'
  | 'price-asc'
  | 'price-desc'
  | 'date-newest'
  | 'date-oldest'
  | 'rating'
  | 'popularity';

interface ViewControlsProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  resultsCount?: number;
  className?: string;
}

const sortLabels: Record<SortOption, string> = {
  relevance: 'Relevanz',
  'price-asc': 'Preis aufsteigend',
  'price-desc': 'Preis absteigend',
  'date-newest': 'Neueste zuerst',
  'date-oldest': 'Älteste zuerst',
  rating: 'Beste Bewertung',
  popularity: 'Beliebtheit',
};

export function ViewControls({
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  resultsCount,
  className,
}: ViewControlsProps): React.ReactElement {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      {/* Results Count */}
      {resultsCount !== undefined && (
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{resultsCount}</span>{' '}
          {resultsCount === 1 ? 'Ergebnis' : 'Ergebnisse'}
        </div>
      )}

      {/* Right Side Controls */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Sort Dropdown */}
        <Select value={sortBy} onValueChange={(value): void => onSortChange(value as SortOption)}>
          <SelectTrigger className="w-[180px]">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sortieren" />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(sortLabels) as SortOption[]).map((option) => (
              <SelectItem key={option} value={option}>
                {sortLabels[option]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* View Toggle */}
        <div className="flex items-center border border-border rounded-md">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'h-9 px-3 rounded-r-none',
              viewMode === 'grid' && 'bg-muted'
            )}
            onClick={(): void => onViewModeChange('grid')}
            aria-label="Grid-Ansicht"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'h-9 px-3 rounded-l-none border-l',
              viewMode === 'list' && 'bg-muted'
            )}
            onClick={(): void => onViewModeChange('list')}
            aria-label="Listen-Ansicht"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
