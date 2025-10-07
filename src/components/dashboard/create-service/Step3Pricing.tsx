import React from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { StepComponentProps } from '@/components/dashboard/multi-step-form/types';
import type { ServiceFormValues } from './schemas';

const PRICE_UNITS = [
  'hour',
  'day',
  'event',
  'project',
  'person',
  'item',
] as const;

export function Step3Pricing({ form }: StepComponentProps<ServiceFormValues>): React.ReactElement {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Pricing</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Set your pricing structure
        </p>
      </div>

      <FormField
        control={form.control}
        name="price_from"
        render={({ field }): React.ReactElement => (
          <FormItem>
            <FormLabel>Starting Price *</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="100.00"
                step="0.01"
                min="0"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Your base price or starting rate
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="price_unit"
        render={({ field }): React.ReactElement => (
          <FormItem>
            <FormLabel>Price Unit *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select price unit" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {PRICE_UNITS.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    per {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              How do you charge for your service?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="bg-muted/50 border rounded-lg p-4 mt-6">
        <p className="text-sm text-muted-foreground">
          <strong>Pricing Tip:</strong> Set your starting price based on your experience and market rates.
          You can always adjust it later based on demand.
        </p>
      </div>
    </div>
  );
}
