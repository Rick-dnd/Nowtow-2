'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EventCard } from '@/components/cards/EventCard';
import type { Event } from '@/types/database';
import { cn } from '@/lib/utils';

interface EventCarouselProps {
  events: Event[];
  title?: string;
  className?: string;
}

export function EventCarousel({ events, title = 'Ähnliche Events', className = '' }: EventCarouselProps): React.ReactElement {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right'): void => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of container width
    const targetScroll = direction === 'left'
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  if (events.length === 0) {
    return <div />;
  }

  return (
    <div className={cn('relative', className)} role="region" aria-label={title}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            aria-label="Vorherige Events"
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            aria-label="Nächste Events"
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {events.map((event) => (
          <div
            key={event.id}
            className="flex-shrink-0 snap-start"
            style={{
              width: 'calc(100% - 1rem)', // Mobile: full width
              maxWidth: '400px', // Desktop: max 400px
            }}
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>

      {/* Keyboard Instructions (screen reader only) */}
      <div className="sr-only" aria-live="polite">
        Nutze die Pfeiltasten oder die Buttons zum Navigieren durch {events.length} ähnliche Events.
      </div>
    </div>
  );
}
