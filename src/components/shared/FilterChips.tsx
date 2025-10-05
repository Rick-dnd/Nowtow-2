'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ActiveFilter {
  id: string;
  label: string;
  value: string;
  category: string;
}

interface FilterChipsProps {
  filters: ActiveFilter[];
  onRemove: (filterId: string) => void;
  onClearAll?: () => void;
  className?: string;
}

export function FilterChips({
  filters,
  onRemove,
  onClearAll,
  className,
}: FilterChipsProps): React.ReactElement | null {
  if (filters.length === 0) return null;

  return (
    <div className={cn('flex items-center gap-2 flex-wrap', className)}>
      <span className="text-sm text-muted-foreground">Active filters:</span>

      {filters.map((filter) => (
        <Badge key={filter.id} variant="secondary" className="gap-1 pr-1">
          <span className="text-xs font-normal">
            {filter.label}: {filter.value}
          </span>
          <button
            onClick={() => onRemove(filter.id)}
            className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5 transition-colors"
            aria-label={`Remove ${filter.label} filter`}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}

      {onClearAll && filters.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="h-7 px-2 text-xs"
        >
          Clear all
        </Button>
      )}
    </div>
  );
}
