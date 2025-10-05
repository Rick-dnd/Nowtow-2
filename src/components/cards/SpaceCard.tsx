'use client';

import { motion } from 'framer-motion';
import { Building2, MapPin, Users, Heart, Square } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import type { Space } from '@/types/database';

interface SpaceCardProps {
  space: Omit<Space, 'id' | 'created_at' | 'updated_at'>;
}

const spaceTypeLabels: Record<Space['space_type'], string> = {
  'tonstudio': 'Tonstudio',
  'fotostudio': 'Fotostudio',
  'werkstaetten': 'Werkstätten',
  'kunst-toepfer': 'Kunst & Töpfer',
  'popup-retail': 'Popup & Retail',
  'sportraeume': 'Sporträume',
  'gaming-podcast': 'Gaming & Podcast',
  'kuechen-food': 'Küchen & Food',
  'other': 'Sonstiges',
};

export function SpaceCard({ space }: SpaceCardProps): React.ReactElement {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
        {/* Image */}
        <div className="relative aspect-video bg-muted">
          {space.image_urls[0] ? (
            <Image
              src={space.image_urls[0]}
              alt={space.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Building2 className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
              {spaceTypeLabels[space.space_type]}
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
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{space.title}</h3>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {space.description}
          </p>

          <div className="space-y-2 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{space.location_address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Square className="h-4 w-4" />
              <span>{space.size_sqm}m²</span>
              <Users className="h-4 w-4 ml-2" />
              <span>bis {space.capacity} Personen</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1 mb-3">
            {space.amenities.slice(0, 3).map((amenity) => (
              <Badge key={amenity} variant="outline" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {space.amenities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{space.amenities.length - 3}
              </Badge>
            )}
          </div>

          <div className="mt-auto flex items-center justify-between pt-3 border-t border-border">
            <div>
              <span className="text-lg font-bold">€{space.hourly_rate}</span>
              <span className="text-sm text-muted-foreground">/Stunde</span>
            </div>
            <Button asChild>
              <Link href={`/spaces/${space.title.toLowerCase().replace(/\s+/g, '-')}`}>
                Details
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
