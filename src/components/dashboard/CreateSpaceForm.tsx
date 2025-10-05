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

const spaceFormSchema = z.object({
  name: z.string().min(5, 'Space name must be at least 5 characters').max(100),
  description: z.string().min(20, 'Description must be at least 20 characters').max(2000),
  space_category: z.string().min(1, 'Please select a category'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  size_sqm: z.coerce.number().min(1, 'Size must be at least 1 sqm').max(10000),
  capacity: z.coerce.number().min(1, 'Capacity must be at least 1').max(1000),
  hourly_rate: z.coerce.number().min(0, 'Hourly rate must be 0 or greater'),
  daily_rate: z.coerce.number().min(0, 'Daily rate must be 0 or greater').optional(),
  minimum_booking_hours: z.coerce.number().min(1, 'Minimum booking must be at least 1 hour').max(24),
  instant_booking: z.boolean().default(false),
  cancellation_policy: z.string().optional(),
});

type SpaceFormValues = z.infer<typeof spaceFormSchema>;

interface CreateSpaceFormProps {
  onSubmit: (data: SpaceFormValues) => void;
  defaultValues?: Partial<SpaceFormValues>;
  isEditing?: boolean;
}

export function CreateSpaceForm({
  onSubmit,
  defaultValues,
  isEditing = false,
}: CreateSpaceFormProps): React.ReactElement {
  const form = useForm({
    resolver: zodResolver(spaceFormSchema) as never,
    defaultValues: {
      name: defaultValues?.name ?? '',
      description: defaultValues?.description ?? '',
      space_category: defaultValues?.space_category ?? '',
      address: defaultValues?.address ?? '',
      city: defaultValues?.city ?? '',
      size_sqm: defaultValues?.size_sqm ?? 50,
      capacity: defaultValues?.capacity ?? 10,
      hourly_rate: defaultValues?.hourly_rate ?? 20,
      daily_rate: defaultValues?.daily_rate ?? 150,
      minimum_booking_hours: defaultValues?.minimum_booking_hours ?? 2,
      instant_booking: defaultValues?.instant_booking ?? false,
      cancellation_policy: defaultValues?.cancellation_policy ?? '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Essential details about your space</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Space Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Modern Photography Studio" {...field} />
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
                      placeholder="Describe your space in detail..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{field.value.length}/2000 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="space_category"
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
                      <SelectItem value="fotostudios">Fotostudios</SelectItem>
                      <SelectItem value="veranstaltungsraeume">Veranstaltungsräume</SelectItem>
                      <SelectItem value="bueros-coworking">Büros & Coworking</SelectItem>
                      <SelectItem value="tanzstudios">Tanzstudios</SelectItem>
                      <SelectItem value="musikstudios">Musikstudios</SelectItem>
                      <SelectItem value="werkstaetten">Werkstätten</SelectItem>
                      <SelectItem value="kunst-toepfer">Kunst & Töpfer</SelectItem>
                      <SelectItem value="popup-retail">Pop-up Retail</SelectItem>
                      <SelectItem value="sportraeume">Sporträume</SelectItem>
                      <SelectItem value="gaming-podcast">Gaming & Podcast</SelectItem>
                      <SelectItem value="kuechen-food">Küchen & Food</SelectItem>
                      <SelectItem value="other">Sonstiges</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Maximilianstraße 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Space Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="size_sqm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size (sqm) *</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" placeholder="50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity (people) *</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" placeholder="10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="hourly_rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hourly Rate (€) *</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" min="0" placeholder="20.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="daily_rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Daily Rate (€)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" min="0" placeholder="150.00" {...field} />
                    </FormControl>
                    <FormDescription>Optional discount for full-day bookings</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="minimum_booking_hours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Booking (hours) *</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" max="24" placeholder="2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instant_booking"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Instant Booking</FormLabel>
                    <FormDescription>
                      Allow guests to book without waiting for approval
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
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
                      placeholder="Describe your cancellation policy..."
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

        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            {isEditing ? 'Update Space' : 'Create Space'}
          </Button>
          <Button type="button" variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
