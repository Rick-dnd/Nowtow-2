'use client';

import { useState, useEffect } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  error: string | null;
  loading: boolean;
  permission: 'granted' | 'denied' | 'prompt' | null;
}

interface UseGeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  watch?: boolean;
}

interface UseGeolocationReturn extends GeolocationState {
  requestLocation: () => void;
  clearError: () => void;
}

export function useGeolocation(
  options: UseGeolocationOptions = {}
): UseGeolocationReturn {
  const {
    enableHighAccuracy = true,
    timeout = 10000,
    maximumAge = 0,
    watch = false,
  } = options;

  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    error: null,
    loading: false,
    permission: null,
  });

  const handleSuccess = (position: GeolocationPosition): void => {
    setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      error: null,
      loading: false,
      permission: 'granted',
    });
  };

  const handleError = (error: GeolocationPositionError): void => {
    let errorMessage = 'Failed to get location';

    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = 'Location permission denied. Please enable location access in your browser settings.';
        setState((prev) => ({ ...prev, permission: 'denied', error: errorMessage, loading: false }));
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = 'Location information unavailable. Please try again.';
        setState((prev) => ({ ...prev, error: errorMessage, loading: false }));
        break;
      case error.TIMEOUT:
        errorMessage = 'Location request timed out. Please try again.';
        setState((prev) => ({ ...prev, error: errorMessage, loading: false }));
        break;
      default:
        setState((prev) => ({ ...prev, error: errorMessage, loading: false }));
    }
  };

  const requestLocation = (): void => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
        loading: false,
      }));
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    const positionOptions: PositionOptions = {
      enableHighAccuracy,
      timeout,
      maximumAge,
    };

    if (watch) {
      navigator.geolocation.watchPosition(
        handleSuccess,
        handleError,
        positionOptions
      );
    } else {
      navigator.geolocation.getCurrentPosition(
        handleSuccess,
        handleError,
        positionOptions
      );
    }
  };

  const clearError = (): void => {
    setState((prev) => ({ ...prev, error: null }));
  };

  useEffect(() => {
    // Check permission status on mount
    if ('permissions' in navigator) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((result) => {
          setState((prev) => ({ ...prev, permission: result.state }));
        })
        .catch(() => {
          // Permission API not supported, ignore
        });
    }
  }, []);

  return {
    ...state,
    requestLocation,
    clearError,
  };
}
