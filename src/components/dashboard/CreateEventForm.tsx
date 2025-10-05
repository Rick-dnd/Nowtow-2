'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Zod schema for event creation/editing
const eventFormSchema = z.object({
  name: z.string().min(5, 'Event name must be at least 5 characters').max(100),
  description: z.string().min(20, 'Description must be at least 20 characters').max(2000),
  category: z.string().min(1, 'Please select a category'),
  venue_name: z.string().min(1, 'Venue name is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  district: z.string().optional(),
  start_datetime: z.date({ required_error: 'Start date and time is required' }),
  end_datetime: z.date({ required_error: 'End date and time is required' }),
  ticket_price: z.coerce.number().min(0, 'Price must be 0 or greater'),
  max_attendees: z.coerce.number().min(1, 'Must allow at least 1 attendee').max(10000),
  min_age: z.coerce.number().min(0).max(99).optional(),
  early_bird_enabled: z.boolean().default(false),
  early_bird_price: z.coerce.number().min(0).optional(),
  early_bird_quota: z.coerce.number().min(1).optional(),
  dress_code: z.string().optional(),
  cancellation_policy: z.string().optional(),
}).refine((data) => data.end_datetime > data.start_datetime, {
  message: 'End time must be after start time',
  path: ['end_datetime'],
});

type EventFormValues = z.infer<typeof eventFormSchema>;

interface CreateEventFormProps {
  onSubmit: (data: EventFormValues) => void;
  defaultValues?: Partial<EventFormValues>;
  isEditing?: boolean;
}

export function CreateEventForm({
  onSubmit,
  defaultValues,
  isEditing = false,
}: CreateEventFormProps): React.ReactElement {
  const form = useForm({
    resolver: zodResolver(eventFormSchema) as never,
    defaultValues: {
      name: defaultValues?.name ?? '',
      description: defaultValues?.description ?? '',
      category: defaultValues?.category ?? '',
      venue_name: defaultValues?.venue_name ?? '',
      address: defaultValues?.address ?? '',
      city: defaultValues?.city ?? '',
      district: defaultValues?.district ?? '',
      start_datetime: defaultValues?.start_datetime ?? new Date(),
      end_datetime: defaultValues?.end_datetime ?? new Date(Date.now() + 2 * 60 * 60 * 1000),
      ticket_price: defaultValues?.ticket_price ?? 0,
      max_attendees: defaultValues?.max_attendees ?? 50,
      min_age: defaultValues?.min_age ?? 0,
      early_bird_enabled: defaultValues?.early_bird_enabled ?? false,
      early_bird_price: defaultValues?.early_bird_price ?? 0,
      early_bird_quota: defaultValues?.early_bird_quota ?? 0,
      dress_code: defaultValues?.dress_code ?? '',
      cancellation_policy: defaultValues?.cancellation_policy ?? '',
    },
  });

  const handleSubmit = (data: EventFormValues): void => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Essential details about your event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Summer Night Party" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your event in detail..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value.length}/2000 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="musik-konzerte">Musik & Konzerte</SelectItem>
                      <SelectItem value="kunst-kultur">Kunst & Kultur</SelectItem>
                      <SelectItem value="food-drink">Food & Drink</SelectItem>
                      <SelectItem value="nightlife">Nightlife & Party</SelectItem>
                      <SelectItem value="workshop">Workshops</SelectItem>
                      <SelectItem value="sport">Sport & Fitness</SelectItem>
                      <SelectItem value="networking">Networking</SelectItem>
                      <SelectItem value="other">Sonstiges</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
            <CardDescription>Where will your event take place?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="venue_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., The Grand Hall" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Maximilianstraße 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., München" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Schwabing" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Date & Time */}
        <Card>
          <CardHeader>
            <CardTitle>Date & Time</CardTitle>
            <CardDescription>When will your event take place?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_datetime"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date & Time *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP HH:mm')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_datetime"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date & Time *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP HH:mm')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Capacity */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing & Capacity</CardTitle>
            <CardDescription>Set ticket prices and attendee limits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="ticket_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ticket Price (€) *</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" min="0" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormDescription>Set to 0 for free events</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="max_attendees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Attendees *</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" placeholder="50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="min_age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Age</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" max="99" placeholder="18" {...field} />
                  </FormControl>
                  <FormDescription>Leave empty or 0 for no age restriction</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Early Bird Pricing */}
            <FormField
              control={form.control}
              name="early_bird_enabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Enable Early Bird Pricing</FormLabel>
                    <FormDescription>
                      Offer discounted tickets for early bookings
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch('early_bird_enabled') && (
              <div className="grid grid-cols-2 gap-4 ml-4">
                <FormField
                  control={form.control}
                  name="early_bird_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Early Bird Price (€)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" min="0" placeholder="8.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="early_bird_quota"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Early Bird Quota</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" placeholder="20" {...field} />
                      </FormControl>
                      <FormDescription>Number of early bird tickets</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Details */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
            <CardDescription>Optional information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="dress_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dress Code</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Casual, Smart Casual, Formal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cancellation_policy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cancellation Policy</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your cancellation and refund policy..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            {isEditing ? 'Update Event' : 'Create Event'}
          </Button>
          <Button type="button" variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
