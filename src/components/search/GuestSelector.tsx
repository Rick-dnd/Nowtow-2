'use client';

import { useState } from 'react';
import { Minus, Plus } from '@phosphor-icons/react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface GuestCounts {
  adults: number;
  children: number;
  pets: number;
}

interface GuestSelectorProps {
  value: GuestCounts;
  onChange: (value: GuestCounts) => void;
}

export function GuestSelector({ value, onChange }: GuestSelectorProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const updateGuests = (type: keyof GuestCounts, increment: boolean): void => {
    const newValue = { ...value };
    if (increment) {
      newValue[type] += 1;
    } else if (newValue[type] > 0) {
      newValue[type] -= 1;
    }
    onChange(newValue);
  };

  const totalGuests = value.adults + value.children;
  const guestText = totalGuests === 0
    ? 'Gäste hinzufügen'
    : `${totalGuests} Gast${totalGuests > 1 ? 'e' : ''}${value.pets > 0 ? `, ${value.pets} Haustier${value.pets > 1 ? 'e' : ''}` : ''}`;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className="w-full text-sm bg-transparent border-0 outline-none text-left flex items-center gap-2 text-foreground"
          type="button"
        >
          {guestText}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-4">
          {/* Erwachsene */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-foreground">Erwachsene</div>
              <div className="text-sm text-muted-foreground">Ab 13 Jahren</div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={(): void => updateGuests('adults', false)}
                disabled={value.adults === 0}
                type="button"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{value.adults}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={(): void => updateGuests('adults', true)}
                type="button"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Kinder */}
          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <div className="font-semibold text-foreground">Kinder</div>
              <div className="text-sm text-muted-foreground">2–12 Jahre</div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={(): void => updateGuests('children', false)}
                disabled={value.children === 0}
                type="button"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{value.children}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={(): void => updateGuests('children', true)}
                type="button"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Haustiere */}
          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <div className="font-semibold text-foreground">Haustiere</div>
              <div className="text-sm text-muted-foreground">Tiere mitbringen</div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={(): void => updateGuests('pets', false)}
                disabled={value.pets === 0}
                type="button"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{value.pets}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={(): void => updateGuests('pets', true)}
                type="button"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
