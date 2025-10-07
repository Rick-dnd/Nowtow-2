import React from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { StepComponentProps } from '@/components/dashboard/multi-step-form/types';
import type { SpaceFormValues } from './schemas';

export function Step2Location({ form }: StepComponentProps<SpaceFormValues>): React.ReactElement {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Standort & Größe</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Wo befindet sich dein Raum und wie groß ist er?
        </p>
      </div>

      <FormField
        control={form.control}
        name="address"
        render={({ field }): React.ReactElement => (
          <FormItem>
            <FormLabel>Adresse *</FormLabel>
            <FormControl>
              <Input placeholder="z.B. Leopoldstraße 123" {...field} />
            </FormControl>
            <FormDescription>
              Vollständige Straßenadresse deines Raums
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="city"
        render={({ field }): React.ReactElement => (
          <FormItem>
            <FormLabel>Stadt *</FormLabel>
            <FormControl>
              <Input placeholder="z.B. München" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="size_sqm"
          render={({ field }): React.ReactElement => (
            <FormItem>
              <FormLabel>Größe (qm) *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="50"
                  min="1"
                  max="10000"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Größe in Quadratmetern
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="capacity"
          render={({ field }): React.ReactElement => (
            <FormItem>
              <FormLabel>Kapazität *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="10"
                  min="1"
                  max="1000"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Maximale Anzahl an Personen
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
