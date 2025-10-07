import React from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { StepComponentProps } from '@/components/dashboard/multi-step-form/types';
import type { SpaceFormValues } from './schemas';

// Amenities grouped by category
const AMENITIES = {
  'Basis': ['WiFi', 'Klimaanlage', 'Heizung', 'Parkplatz'],
  'Studio': ['Beleuchtung', 'Hintergründe', 'Softboxen', 'Reflektoren'],
  'Arbeitsplatz': ['Schreibtisch', 'Bürostuhl', 'Whiteboard', 'Monitor'],
  'Küche': ['Küche', 'Kühlschrank', 'Mikrowelle', 'Kaffeemaschine'],
  'Sicherheit': ['Rauchmelder', 'Feuerlöscher', 'Erste-Hilfe-Set', 'Notausgang'],
};

// House rules options
const HOUSE_RULES = [
  'Rauchen verboten',
  'Keine Haustiere',
  'Keine Partys oder Events',
  'Ruhezeiten 22:00-08:00 Uhr',
  'Space sauber hinterlassen',
  'Pünktliches Check-out',
];

export function Step3Features({ form }: StepComponentProps<SpaceFormValues>): React.ReactElement {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Preise & Ausstattung</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Lege deine Preise und Buchungseinstellungen fest
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="hourly_price"
          render={({ field }): React.ReactElement => (
            <FormItem>
              <FormLabel>Stündlicher Preis *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="25.00"
                  step="0.01"
                  min="0"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Preis pro Stunde in €
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="daily_price"
          render={({ field }): React.ReactElement => (
            <FormItem>
              <FormLabel>Tagespreis</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="150.00 (optional)"
                  step="0.01"
                  min="0"
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormDescription>
                Preis pro Tag in € (optional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="minimum_booking_hours"
        render={({ field }): React.ReactElement => (
          <FormItem>
            <FormLabel>Mindestbuchung (Stunden) *</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="2"
                min="1"
                max="24"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Minimale Anzahl an Stunden pro Buchung
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Amenities Section */}
      <Card>
        <CardHeader>
          <CardTitle>Ausstattung & Features</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="amenities"
            render={(): React.ReactElement => (
              <FormItem>
                <div className="space-y-4">
                  {Object.entries(AMENITIES).map(([category, items]) => (
                    <div key={category}>
                      <h4 className="text-sm font-semibold mb-2">{category}</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {items.map((amenity) => (
                          <FormField
                            key={amenity}
                            control={form.control}
                            name="amenities"
                            render={({ field }): React.ReactElement => {
                              const currentValue = field.value ?? [];
                              return (
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={currentValue.includes(amenity)}
                                      onCheckedChange={(checked): void => {
                                        const newValue = checked
                                          ? [...currentValue, amenity]
                                          : currentValue.filter((val: string) => val !== amenity);
                                        field.onChange(newValue);
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal cursor-pointer">
                                    {amenity}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* House Rules Section */}
      <Card>
        <CardHeader>
          <CardTitle>Hausregeln</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="house_rules"
            render={(): React.ReactElement => (
              <FormItem>
                <div className="space-y-3">
                  {HOUSE_RULES.map((rule) => (
                    <FormField
                      key={rule}
                      control={form.control}
                      name="house_rules"
                      render={({ field }): React.ReactElement => {
                        const currentValue = field.value ?? [];
                        return (
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={currentValue.includes(rule)}
                                onCheckedChange={(checked): void => {
                                  const newValue = checked
                                    ? [...currentValue, rule]
                                    : currentValue.filter((val: string) => val !== rule);
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal cursor-pointer">
                              {rule}
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

          <FormField
            control={form.control}
            name="custom_house_rules"
            render={({ field }): React.ReactElement => (
              <FormItem>
                <FormLabel>Zusätzliche Hausregeln</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Weitere Regeln oder Hinweise für Gäste (optional)"
                    className="resize-none"
                    rows={4}
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormDescription>
                  Füge individuelle Regeln oder wichtige Hinweise hinzu
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
