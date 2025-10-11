'use client';

import { useState, useEffect, useRef } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { MapPin } from 'lucide-react';

interface LocationSuggestion {
  name: string;
  description: string;
}

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Suggested destinations for fallback and initial display
const suggestedDestinations: LocationSuggestion[] = [
  { name: 'München', description: 'Bayern, Deutschland' },
  { name: 'Berlin', description: 'Deutschland' },
  { name: 'Hamburg', description: 'Deutschland' },
  { name: 'Frankfurt', description: 'Hessen, Deutschland' },
  { name: 'Köln', description: 'Nordrhein-Westfalen, Deutschland' },
  { name: 'Stuttgart', description: 'Baden-Württemberg, Deutschland' },
  { name: 'Düsseldorf', description: 'Nordrhein-Westfalen, Deutschland' },
  { name: 'Leipzig', description: 'Sachsen, Deutschland' },
  { name: 'Nürnberg', description: 'Bayern, Deutschland' },
  { name: 'Dresden', description: 'Sachsen, Deutschland' },
];

export function LocationAutocomplete({ value, onChange, placeholder = 'Reiseziele suchen' }: LocationAutocompleteProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);

  const places = useMapsLibrary('places');

  // Initialize AutocompleteService
  useEffect((): void => {
    if (!places || autocompleteServiceRef.current) return;

    try {
      autocompleteServiceRef.current = new places.AutocompleteService();
      setApiError(false);
    } catch (error) {
      console.error('Failed to initialize Google Places API:', error);
      setApiError(true);
    }
  }, [places]);

  // Debounced fetch predictions
  useEffect((): (() => void) => {
    const timeoutId = setTimeout((): void => {
      if (!value.trim() || !autocompleteServiceRef.current || apiError) {
        setPredictions([]);
        return;
      }

      const fetchPredictions = (): void => {
        setIsLoading(true);

        autocompleteServiceRef.current!.getPlacePredictions(
          {
            input: value,
            componentRestrictions: { country: 'de' },
            language: 'de',
          },
          (results, status): void => {
            setIsLoading(false);

            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
              setPredictions(results);
              setApiError(false);
            } else if (status === google.maps.places.PlacesServiceStatus.REQUEST_DENIED) {
              console.error('Google Places API: Request denied. Please enable Places API in Google Cloud Console.');
              setPredictions([]);
              setApiError(true);
            } else {
              setPredictions([]);
            }
          }
        );
      };

      fetchPredictions();
    }, 300); // 300ms debounce

    return (): void => clearTimeout(timeoutId);
  }, [value, apiError]);

  const handleSelectPrediction = (description: string): void => {
    onChange(description);
    setIsOpen(false);
    setPredictions([]);
  };

  const handleSelectSuggested = (locationName: string): void => {
    onChange(locationName);
    setIsOpen(false);
  };

  const showSuggestedDestinations = value.trim() === '';
  const showPredictions = predictions.length > 0 && !showSuggestedDestinations;

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e): void => {
          onChange(e.target.value);
          if (!isOpen) setIsOpen(true);
        }}
        onFocus={(): void => setIsOpen(true)}
        onBlur={(): void => {
          // Delay closing to allow click on suggestions
          setTimeout((): void => {
            setIsOpen(false);
          }, 200);
        }}
        className="w-full text-sm bg-transparent border-0 outline-none placeholder:text-muted-foreground focus:ring-0 p-0"
      />

      {/* Custom Dropdown - absolutely positioned */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {/* Vorgeschlagene Reiseziele - shown when input is empty */}
          {showSuggestedDestinations && (
            <>
              <div className="px-4 py-3 text-xs font-semibold text-muted-foreground border-b">
                Vorgeschlagene Reiseziele
              </div>
              <div className="py-2">
                {suggestedDestinations.map((location, index): React.ReactElement => (
                  <button
                    key={index}
                    type="button"
                    onPointerDown={(e): void => {
                      e.preventDefault();
                      handleSelectSuggested(location.name);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg shrink-0">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{location.name}</div>
                      <div className="text-sm text-muted-foreground">{location.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Google Places Predictions - shown when user types */}
          {showPredictions && (
            <div className="py-2">
              {predictions.map((prediction): React.ReactElement => (
                <button
                  key={prediction.place_id}
                  type="button"
                  onPointerDown={(e): void => {
                    e.preventDefault();
                    handleSelectPrediction(prediction.description);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg shrink-0">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">
                      {prediction.structured_formatting.main_text}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {prediction.structured_formatting.secondary_text}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Loading state */}
          {isLoading && !showSuggestedDestinations && (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              Wird geladen...
            </div>
          )}

          {/* No results */}
          {!isLoading && !showSuggestedDestinations && predictions.length === 0 && value.trim() !== '' && (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              Keine Ergebnisse gefunden
            </div>
          )}
        </div>
      )}
    </div>
  );
}
