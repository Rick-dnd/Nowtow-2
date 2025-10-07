import React from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { StepComponentProps } from '@/components/dashboard/multi-step-form/types';
import type { ServiceFormValues } from './schemas';

export function Step2Location({ form }: StepComponentProps<ServiceFormValues>): React.ReactElement {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Location & Service Area</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Where do you provide your service?
        </p>
      </div>

      <FormField
        control={form.control}
        name="location"
        render={({ field }): React.ReactElement => (
          <FormItem>
            <FormLabel>Base Location *</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Downtown Manhattan" {...field} />
            </FormControl>
            <FormDescription>
              Your primary location or area
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
        name="service_area"
        render={({ field }): React.ReactElement => (
          <FormItem>
            <FormLabel>Service Area</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. All NYC boroughs, Within 50 miles (optional)"
                {...field}
                value={field.value ?? ''}
              />
            </FormControl>
            <FormDescription>
              Specify the areas you serve
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
