'use client';

import Image from 'next/image';
import { Heart, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Service } from '@/types/database';

interface ServiceCardProps {
  service: Omit<Service, 'id' | 'created_at' | 'updated_at'>;
}

export function ServiceCard({ service }: ServiceCardProps): React.ReactElement {
  // Mock data for demo
  const rating = 5.0;
  const reviewCount = 47;
  const providerName = '@photographer_pro';
  const packages = [
    { name: 'Basic', price: 99 },
    { name: 'Standard', price: 199 },
    { name: 'Premium', price: 399 },
  ];

  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group">
      {/* Provider Info */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white font-semibold">
            {providerName?.[0]?.toUpperCase() ?? 'P'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{providerName}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
              <span>({reviewCount})</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Image */}
      <div className="relative w-full h-48 bg-muted overflow-hidden">
        {service.image_urls?.[0] ? (
          <Image
            src={service.image_urls[0]}
            alt={service.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50" />
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-base mb-2 line-clamp-1">{service.title}</h3>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {service.description}
        </p>

        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <MapPin className="h-3.5 w-3.5" />
          <span>München</span>
        </div>

        {/* Packages */}
        <div className="space-y-1 mb-4">
          <p className="text-xs font-medium text-muted-foreground uppercase">Packages:</p>
          {packages.map((pkg, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">• {pkg.name}</span>
              <span className="font-semibold">€{pkg.price}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 rounded-full text-sm">
            Details
          </Button>
          <Button className="flex-1 rounded-full text-sm">
            Kontakt
          </Button>
        </div>
      </div>
    </div>
  );
}
