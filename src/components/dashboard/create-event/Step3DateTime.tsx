import React from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { StepComponentProps } from '@/components/dashboard/multi-step-form/types';
import type { EventFormValues } from './schemas';

export function Step3DateTime({ form }: StepComponentProps<EventFormValues>): React.ReactElement {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Datum & Uhrzeit</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Wann findet dein Event statt?
        </p>
      </div>

      <FormField
        control={form.control}
        name="start_datetime"
        render={({ field }): React.ReactElement => (
          <FormItem className="flex flex-col">
            <FormLabel>Start Date & Time *</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? format(field.value, 'PPP') : 'Pick a date'}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date): boolean => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormDescription>
              Select the date when your event starts
            </FormDescription>
            <FormMessage />

            {/* Time Input */}
            {field.value && (
              <div className="mt-2">
                <FormLabel>Start Time</FormLabel>
                <Input
                  type="time"
                  value={field.value ? format(field.value, 'HH:mm') : ''}
                  onChange={(e): void => {
                    if (field.value && e.target.value) {
                      const [hours, minutes] = e.target.value.split(':');
                      const newDate = new Date(field.value);
                      if (hours && minutes) {
                        newDate.setHours(parseInt(hours), parseInt(minutes));
                        field.onChange(newDate);
                      }
                    }
                  }}
                  className="mt-1"
                />
              </div>
            )}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="end_datetime"
        render={({ field }): React.ReactElement => (
          <FormItem className="flex flex-col">
            <FormLabel>End Date & Time *</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? format(field.value, 'PPP') : 'Pick a date'}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date): boolean => {
                    const startDate = form.getValues('start_datetime');
                    return date < (startDate || new Date());
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormDescription>
              Select the date when your event ends
            </FormDescription>
            <FormMessage />

            {/* Time Input */}
            {field.value && (
              <div className="mt-2">
                <FormLabel>End Time</FormLabel>
                <Input
                  type="time"
                  value={field.value ? format(field.value, 'HH:mm') : ''}
                  onChange={(e): void => {
                    if (field.value && e.target.value) {
                      const [hours, minutes] = e.target.value.split(':');
                      const newDate = new Date(field.value);
                      if (hours && minutes) {
                        newDate.setHours(parseInt(hours), parseInt(minutes));
                        field.onChange(newDate);
                      }
                    }
                  }}
                  className="mt-1"
                />
              </div>
            )}
          </FormItem>
        )}
      />
    </div>
  );
}
