import React from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import type { StepComponentProps } from '@/components/dashboard/multi-step-form/types';
import type { EventFormValues } from './schemas';

export function Step4Pricing({ form }: StepComponentProps<EventFormValues>): React.ReactElement {
  const earlyBirdEnabled = form.watch('early_bird_enabled');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Preise & Details</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Lege Preise und zusätzliche Details für dein Event fest
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="ticket_price"
          render={({ field }): React.ReactElement => (
            <FormItem>
              <FormLabel>Ticket Price *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Price per ticket (use 0 for free events)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="max_attendees"
          render={({ field }): React.ReactElement => (
            <FormItem>
              <FormLabel>Maximum Attendees *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="100"
                  min="1"
                  max="10000"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Maximum capacity for your event
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="min_age"
        render={({ field }): React.ReactElement => (
          <FormItem>
            <FormLabel>Minimum Age</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="0 (optional)"
                min="0"
                max="99"
                {...field}
                value={field.value ?? ''}
              />
            </FormControl>
            <FormDescription>
              Minimum age requirement (leave empty if no age restriction)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Early Bird Pricing */}
      <div className="border rounded-lg p-4 space-y-4">
        <FormField
          control={form.control}
          name="early_bird_enabled"
          render={({ field }): React.ReactElement => (
            <FormItem className="flex items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel>Enable Early Bird Pricing</FormLabel>
                <FormDescription>
                  Offer discounted tickets for early bookings
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {earlyBirdEnabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <FormField
              control={form.control}
              name="early_bird_price"
              render={({ field }): React.ReactElement => (
                <FormItem>
                  <FormLabel>Early Bird Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="early_bird_quota"
              render={({ field }): React.ReactElement => (
                <FormItem>
                  <FormLabel>Early Bird Quota</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="50"
                      min="1"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormDescription>
                    Number of early bird tickets
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>

      {/* Optional Details */}
      <FormField
        control={form.control}
        name="dress_code"
        render={({ field }): React.ReactElement => (
          <FormItem>
            <FormLabel>Dress Code</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. Casual, Business, Formal (optional)"
                {...field}
                value={field.value ?? ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cancellation_policy"
        render={({ field }): React.ReactElement => (
          <FormItem>
            <FormLabel>Cancellation Policy</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe your cancellation and refund policy (optional)"
                className="min-h-[100px] resize-none"
                {...field}
                value={field.value ?? ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
