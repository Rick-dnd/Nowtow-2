import React from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import type { StepComponentProps } from '@/components/dashboard/multi-step-form/types';
import type { EventFormValues } from './schemas';

const AMENITIES_OPTIONS = [
  { id: 'wifi', label: 'WiFi verfügbar' },
  { id: 'parking', label: 'Parkplätze vorhanden' },
  { id: 'wheelchair', label: 'Barrierefrei' },
  { id: 'drinks', label: 'Getränke inklusive' },
  { id: 'food', label: 'Essen inklusive' },
  { id: 'wardrobe', label: 'Garderobe' },
  { id: 'outdoor', label: 'Außenbereich' },
  { id: 'camera_allowed', label: 'Fotos erlaubt' },
] as const;

const INCLUDES_OPTIONS = [
  { id: 'ticket', label: 'Eintrittsticket' },
  { id: 'welcome_drink', label: 'Welcome Drink' },
  { id: 'snacks', label: 'Snacks & Fingerfood' },
  { id: 'materials', label: 'Arbeitsmaterialien' },
  { id: 'certificate', label: 'Teilnahmezertifikat' },
  { id: 'goodie_bag', label: 'Goodie Bag' },
  { id: 'photos', label: 'Event-Fotos' },
] as const;

export function Step4Amenities({ form }: StepComponentProps<EventFormValues>): React.ReactElement {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Ausstattung & Leistungen</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Was bietet dein Event? Welche Annehmlichkeiten sind verfügbar?
        </p>
      </div>

      {/* Highlights/Amenities */}
      <FormField
        control={form.control}
        name="highlights"
        render={(): React.ReactElement => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Event-Highlights</FormLabel>
              <FormDescription>
                Wähle alle zutreffenden Ausstattungsmerkmale
              </FormDescription>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {AMENITIES_OPTIONS.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="highlights"
                  render={({ field }): React.ReactElement => {
                    const currentValue = field.value || [];
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={currentValue?.includes(item.label)}
                            onCheckedChange={(checked): void => {
                              const newValue = checked
                                ? [...currentValue, item.label]
                                : currentValue?.filter((value: string) => value !== item.label) || [];
                              field.onChange(newValue);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Includes */}
      <FormField
        control={form.control}
        name="includes"
        render={(): React.ReactElement => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Was ist inklusive?</FormLabel>
              <FormDescription>
                Wähle alle Leistungen, die im Ticketpreis enthalten sind
              </FormDescription>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {INCLUDES_OPTIONS.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="includes"
                  render={({ field }): React.ReactElement => {
                    const currentValue = field.value || [];
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={currentValue?.includes(item.label)}
                            onCheckedChange={(checked): void => {
                              const newValue = checked
                                ? [...currentValue, item.label]
                                : currentValue?.filter((value: string) => value !== item.label) || [];
                              field.onChange(newValue);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
