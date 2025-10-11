'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

interface AdvancedFiltersState {
  distance: number;
  priceRange: [number, number];
  verifiedOnly: boolean;
}

interface EventsAdvancedFiltersProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: AdvancedFiltersState;
  onFiltersChange: (filters: AdvancedFiltersState) => void;
  onApply: () => void;
  onReset: () => void;
}

export function EventsAdvancedFilters({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  onApply,
  onReset,
}: EventsAdvancedFiltersProps): React.ReactElement {
  const updateFilter = <K extends keyof AdvancedFiltersState>(
    key: K,
    value: AdvancedFiltersState[K]
  ): void => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto p-0">
        <div className="sticky top-0 z-10 bg-background border-b border-border px-6 py-4">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold">Erweiterte Filter</SheetTitle>
            <SheetDescription className="text-sm">
              Verfeinere deine Suche mit zusätzlichen Filteroptionen
            </SheetDescription>
          </SheetHeader>
        </div>

        <div className="px-6 py-6 space-y-8">
          {/* Distance Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Entfernung</Label>
              <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                {filters.distance} km
              </span>
            </div>
            <div className="pt-2">
              <Slider
                value={[filters.distance]}
                onValueChange={(value): void => updateFilter('distance', value[0] || 10)}
                min={1}
                max={50}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>1 km</span>
                <span>25 km</span>
                <span>50 km</span>
              </div>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Preisspanne</Label>
              <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                {filters.priceRange[0]}€ - {filters.priceRange[1]}€
              </span>
            </div>
            <div className="pt-2">
              <Slider
                value={filters.priceRange}
                onValueChange={(value): void => {
                  if (value.length === 2) {
                    updateFilter('priceRange', [value[0] || 0, value[1] || 100]);
                  }
                }}
                min={0}
                max={100}
                step={5}
                minStepsBetweenThumbs={1}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Kostenlos</span>
                <span>50€</span>
                <span>100€+</span>
              </div>
            </div>
          </div>

          {/* Verified Hosts Checkbox */}
          <div className="bg-muted/30 border border-border rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="verified"
                checked={filters.verifiedOnly}
                onCheckedChange={(checked): void =>
                  updateFilter('verifiedOnly', checked === true)
                }
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label
                  htmlFor="verified"
                  className="text-sm font-medium leading-snug cursor-pointer block"
                >
                  Nur verifizierte Hosts anzeigen
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Zeige nur Events von verifizierten Veranstaltern
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions - Sticky */}
        <div className="sticky bottom-0 bg-background border-t border-border px-6 py-4">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onReset}
              className="flex-1 h-11"
              type="button"
            >
              Zurücksetzen
            </Button>
            <Button
              onClick={(): void => {
                onApply();
                onOpenChange(false);
              }}
              className="flex-1 h-11 bg-primary hover:bg-primary/90"
              type="button"
            >
              Anwenden
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export type { AdvancedFiltersState };
