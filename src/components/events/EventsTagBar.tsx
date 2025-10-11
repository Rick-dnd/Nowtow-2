'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface TagFilter {
  id: string;
  label: string;
  icon: string; // Emoji
  category: 'kategorie' | 'ort' | 'preis' | 'zeit' | 'zielgruppe';
  color: string; // Tailwind bg class for active state
}

interface EventsTagBarProps {
  selectedTags: string[];
  onTagToggle: (tagId: string) => void;
  onClearAll: () => void;
  onKostenpflichtigClick?: () => void;
}

// Tag definitions with icons and colors
// Note: Kategorie-Tags (Musik/Kunst/Food/Sport/Workshops/Networking) removed - duplicates exist in CategorySelector
export const EVENT_TAGS: TagFilter[] = [
  // Ort-Tags
  { id: 'indoor', label: 'Indoor', icon: '🏠', category: 'ort', color: 'bg-gray-100 text-gray-700 border-gray-200' },
  { id: 'outdoor', label: 'Outdoor', icon: '🌳', category: 'ort', color: 'bg-green-100 text-green-700 border-green-200' },

  // Preis-Tags
  { id: 'kostenlos', label: 'Kostenlos', icon: '💸', category: 'preis', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { id: 'spende', label: 'Spende', icon: '🤝', category: 'preis', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { id: 'kostenpflichtig', label: 'Kostenpflichtig', icon: '💳', category: 'preis', color: 'bg-red-100 text-red-700 border-red-200' },

  // Zeit-Tags
  { id: 'heute', label: 'Heute', icon: '📅', category: 'zeit', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'morgen', label: 'Morgen', icon: '🌅', category: 'zeit', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  { id: 'wochenende', label: 'Wochenende', icon: '🎉', category: 'zeit', color: 'bg-violet-100 text-violet-700 border-violet-200' },

  // Zielgruppen-Tags
  { id: 'fuer-alle', label: 'Für Alle', icon: '🌍', category: 'zielgruppe', color: 'bg-slate-100 text-slate-700 border-slate-200' },
  { id: 'girls', label: 'Girls', icon: '👩', category: 'zielgruppe', color: 'bg-pink-100 text-pink-700 border-pink-200' },
  { id: 'boys', label: 'Boys', icon: '👦', category: 'zielgruppe', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'kinder', label: 'Kinder', icon: '👶', category: 'zielgruppe', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { id: 'lgbtq', label: 'LGBTQ+', icon: '🏳️‍🌈', category: 'zielgruppe', color: 'bg-gradient-to-r from-red-100 via-yellow-100 to-blue-100 text-purple-700 border-purple-200' },
];

export function EventsTagBar({ selectedTags, onTagToggle, onClearAll, onKostenpflichtigClick }: EventsTagBarProps): React.ReactElement {
  const hasSelectedTags = selectedTags.length > 0;

  return (
    <div className="bg-background border-b border-border/50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Horizontal scrollable tag container */}
          <div className="flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex flex-wrap gap-2 min-w-min">
              {EVENT_TAGS.map((tag): React.ReactElement => {
                const isSelected = selectedTags.includes(tag.id);
                const isKostenpflichtig = tag.id === 'kostenpflichtig';

                return (
                  <button
                    key={tag.id}
                    onClick={(): void => {
                      // If Kostenpflichtig is clicked, open Advanced Filters instead of toggling
                      if (isKostenpflichtig && onKostenpflichtigClick) {
                        onKostenpflichtigClick();
                      } else {
                        onTagToggle(tag.id);
                      }
                    }}
                    className={cn(
                      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 whitespace-nowrap',
                      'hover:scale-105 active:scale-95 transform-gpu',
                      isSelected
                        ? `${tag.color} shadow-md`
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    )}
                    type="button"
                  >
                    <span className="text-base leading-none">{tag.icon}</span>
                    <span>{tag.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clear All Button */}
          {hasSelectedTags && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="shrink-0 rounded-full px-3"
              type="button"
            >
              <X className="h-4 w-4 mr-1" />
              Alle löschen
            </Button>
          )}
        </div>

        {/* Mobile: Show selected count */}
        {hasSelectedTags && (
          <div className="mt-2 text-xs text-muted-foreground">
            {selectedTags.length} Filter aktiv
          </div>
        )}
      </div>
    </div>
  );
}
