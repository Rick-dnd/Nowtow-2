import React from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { StepComponentProps } from '@/components/dashboard/multi-step-form/types';
import type { EventFormValues } from './schemas';

export function Step2Location({ form }: StepComponentProps<EventFormValues>): React.ReactElement {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Standort</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Wo findet dein Event statt?
        </p>
      </div>

      <FormField
        control={form.control}
        name="venue_name"
        render={({ field }): React.ReactElement => (
          <FormItem>
            <FormLabel>Venue Name *</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Central Park Amphitheater" {...field} />
            </FormControl>
            <FormDescription>
              The name of the venue or location
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="address"
        render={({ field }): React.ReactElement => (
          <FormItem>
            <FormLabel>Street Address *</FormLabel>
            <FormControl>
              <Input placeholder="e.g. 123 Main Street" {...field} />
            </FormControl>
            <FormDescription>
              The full street address of the venue
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="city"
          render={({ field }): React.ReactElement => (
            <FormItem>
              <FormLabel>City *</FormLabel>
              <FormControl>
                <Input placeholder="e.g. New York" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="district"
          render={({ field }): React.ReactElement => (
            <FormItem>
              <FormLabel>District / Neighborhood</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Manhattan (optional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
