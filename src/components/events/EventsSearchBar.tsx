'use client';

import { Search, SlidersHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import type { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { LocationAutocomplete } from '@/components/search/LocationAutocomplete';
import { CategorySelector } from '@/components/search/CategorySelector';
import { GuestSelector } from '@/components/search/GuestSelector';
import { motion } from 'framer-motion';

interface EventsSearchBarProps {
  location: string;
  onLocationChange: (location: string) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (dateRange: DateRange | undefined) => void;
  subcategory: string;
  onSubcategoryChange: (subcategory: string) => void;
  guests: { adults: number; children: number; pets: number };
  onGuestsChange: (guests: { adults: number; children: number; pets: number }) => void;
  onAdvancedFiltersClick: () => void;
}

export function EventsSearchBar({
  location,
  onLocationChange,
  dateRange,
  onDateRangeChange,
  subcategory,
  onSubcategoryChange,
  guests,
  onGuestsChange,
  onAdvancedFiltersClick,
}: EventsSearchBarProps): React.ReactElement {
  return (
    <div className="bg-gradient-to-b from-background to-muted/20 border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          {/* Main Search Bar - 5 Fields like HeroSection */}
          <div className="flex-1 bg-white rounded-full shadow-lg border border-border/50 p-2 flex flex-col lg:flex-row items-stretch lg:items-center gap-0">
          {/* Wohin Field - Location */}
          <motion.div
            className="flex-1 px-4 py-3 rounded-full cursor-pointer transition-all"
            whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}
            tabIndex={0}
          >
            <label className="text-xs font-semibold text-foreground block mb-1">Wohin</label>
            <LocationAutocomplete
              value={location}
              onChange={onLocationChange}
              placeholder="Reiseziele suchen"
            />
          </motion.div>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-px h-12 bg-border/50" />

          {/* Kategorie Field - Event Category */}
          <motion.div
            className="flex-1 px-4 py-3 rounded-full cursor-pointer transition-all"
            whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}
            tabIndex={0}
          >
            <label className="text-xs font-semibold text-foreground block mb-1">Kategorie</label>
            <CategorySelector
              mainCategory="Events"
              value={subcategory}
              onChange={onSubcategoryChange}
              placeholder="Alle Kategorien"
            />
          </motion.div>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-px h-12 bg-border/50" />

          {/* Wann Field - Date Range */}
          <motion.div
            className="flex-1 px-4 py-3 rounded-full cursor-pointer transition-all"
            whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}
            tabIndex={0}
          >
            <label className="text-xs font-semibold text-foreground block mb-1">Wann</label>
            <Popover>
              <PopoverTrigger asChild>
                <button className="w-full text-sm bg-transparent border-0 outline-none text-left text-foreground" type="button">
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, 'dd.MM.yy', { locale: de })} – {format(dateRange.to, 'dd.MM.yy', { locale: de })}
                      </>
                    ) : (
                      format(dateRange.from, 'dd.MM.yy', { locale: de })
                    )
                  ) : (
                    <span className="text-muted-foreground">Datum hinzufügen</span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={onDateRangeChange}
                  locale={de}
                  numberOfMonths={2}
                  disabled={(date): boolean => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </motion.div>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-px h-12 bg-border/50" />

          {/* Wer Field - Guests + Search Button */}
          <motion.div
            className="flex-1 px-4 py-3 rounded-full cursor-pointer transition-all flex items-center gap-3"
            whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}
            tabIndex={0}
          >
            <div className="flex-1">
              <label className="text-xs font-semibold text-foreground block mb-1">Wer</label>
              <GuestSelector value={guests} onChange={onGuestsChange} />
            </div>

            {/* Search Button */}
            <Button
              size="icon"
              className="rounded-full h-12 w-12 bg-primary hover:bg-primary/90 shrink-0"
              aria-label="Suchen"
              type="button"
            >
              <Search className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        {/* Filter Button - Separate outside rounded bar */}
        <Button
          variant="outline"
          size="default"
          className="rounded-full px-4 h-12 flex items-center gap-2 border-2 hover:bg-accent/50 transition-all"
          onClick={onAdvancedFiltersClick}
          type="button"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden md:inline font-medium">Filter</span>
        </Button>
      </div>
      </div>
    </div>
  );
}
