'use client';

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EventCard } from '@/components/cards/EventCard';
import { SpaceCard } from '@/components/cards/SpaceCard';
import { ServiceCard } from '@/components/services/ServiceCard';
import { cn } from '@/lib/utils';
import type { Event, Space, Service } from '@/types/database';

// Discriminated union types for proper type safety
type EventCarouselProps = {
  title: string;
  items: Omit<Event, 'id' | 'created_at' | 'updated_at'>[];
  type: 'events';
  className?: string;
};

type SpaceCarouselProps = {
  title: string;
  items: Omit<Space, 'id' | 'created_at' | 'updated_at'>[];
  type: 'spaces';
  className?: string;
};

type ServiceCarouselProps = {
  title: string;
  items: Omit<Service, 'id' | 'created_at' | 'updated_at'>[];
  type: 'services';
  className?: string;
};

type SimilarListingsCarouselProps = EventCarouselProps | SpaceCarouselProps | ServiceCarouselProps;

export function SimilarListingsCarousel({
  title,
  items,
  type,
  className,
}: SimilarListingsCarouselProps): React.ReactElement {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    skipSnaps: false,
    dragFree: false,
  });

  const scrollPrev = useCallback((): void => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback((): void => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (items.length === 0) {
    return <div />;
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header with Navigation */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            aria-label="Vorherige Slides"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            aria-label="Nächste Slides"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {type === 'events' && items.map((item, index) => (
            <div key={index} className="flex-[0_0_auto] w-[280px] md:w-[320px]">
              <EventCard event={item as Event} />
            </div>
          ))}
          {type === 'spaces' && items.map((item, index) => (
            <div key={index} className="flex-[0_0_auto] w-[280px] md:w-[320px]">
              <SpaceCard space={item as Space} />
            </div>
          ))}
          {type === 'services' && items.map((item, index) => (
            <div key={index} className="flex-[0_0_auto] w-[280px] md:w-[320px]">
              <ServiceCard service={item as Service} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
