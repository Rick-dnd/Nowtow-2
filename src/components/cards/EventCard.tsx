'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import type { Event } from '@/types/database';

interface EventCardProps {
  event: Omit<Event, 'id' | 'created_at' | 'updated_at'>;
}

const categoryLabels: Record<Event['category'], string> = {
  'kunst-kreativ': 'Kunst & Kreativ',
  'musik-performance': 'Musik & Performance',
  'sport-fitness': 'Sport & Fitness',
  'familie-kinder': 'Familie & Kinder',
  'workshop': 'Workshop',
  'essen-geniessen': 'Essen & Genießen',
  'spontane-treffen': 'Spontane Treffen',
  'party-nightlife': 'Party & Nightlife',
};

export function EventCard({ event }: EventCardProps): React.ReactElement {
  const eventDate = new Date(event.start_time);
  const formattedDate = eventDate.toLocaleDateString('de-DE', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
  const formattedTime = eventDate.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
        {/* Image */}
        <div className="relative aspect-video bg-muted">
          {event.image_urls[0] ? (
            <Image
              src={event.image_urls[0]}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Calendar className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
              {categoryLabels[event.category]}
            </Badge>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm hover:bg-background"
            aria-label="Zu Favoriten hinzufügen"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <CardContent className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{event.title}</h3>

          <div className="space-y-2 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {formattedDate} • {formattedTime} Uhr
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{event.location_address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{event.capacity} Teilnehmer</span>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between pt-3 border-t border-border">
            <div>
              <span className="text-lg font-bold">
                {event.price === 0 ? 'Kostenlos' : `€${event.price}`}
              </span>
              {event.price > 0 && (
                <span className="text-sm text-muted-foreground">/Person</span>
              )}
            </div>
            <Button asChild>
              <Link href={`/events/${event.title.toLowerCase().replace(/\s+/g, '-')}`}>
                Details
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
