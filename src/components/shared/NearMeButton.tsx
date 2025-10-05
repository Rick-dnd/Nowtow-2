'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Navigation, Loader2 } from 'lucide-react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { toast } from 'sonner';

interface NearMeButtonProps {
  onLocationFound?: (latitude: number, longitude: number) => void;
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showLabel?: boolean;
  className?: string;
}

export function NearMeButton({
  onLocationFound,
  variant = 'outline',
  size = 'default',
  showLabel = true,
  className,
}: NearMeButtonProps): React.ReactElement {
  const {
    latitude,
    longitude,
    error,
    loading,
    requestLocation,
    clearError,
  } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 300000, // 5 minutes
  });

  useEffect(() => {
    if (latitude && longitude && onLocationFound) {
      onLocationFound(latitude, longitude);
      toast.success('Standort gefunden', {
        description: 'Events in deiner Nähe werden angezeigt',
      });
    }
  }, [latitude, longitude, onLocationFound]);

  useEffect(() => {
    if (error) {
      toast.error('Standort nicht verfügbar', {
        description: error,
      });
      clearError();
    }
  }, [error, clearError]);

  const handleClick = (): void => {
    requestLocation();
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={loading}
      className={className}
      aria-label="In meiner Nähe suchen"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Navigation className="h-4 w-4" />
      )}
      {showLabel && <span className="ml-2">{loading ? 'Suche...' : 'In meiner Nähe'}</span>}
    </Button>
  );
}
