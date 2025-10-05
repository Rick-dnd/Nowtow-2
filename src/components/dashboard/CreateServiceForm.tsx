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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const serviceFormSchema = z.object({
  title: z.string().min(5, 'Service title must be at least 5 characters').max(100),
  description: z.string().min(20, 'Description must be at least 20 characters').max(2000),
  category: z.string().min(1, 'Please select a category'),
  location: z.string().min(1, 'Location is required'),
  city: z.string().min(1, 'City is required'),
  service_area: z.string().optional(),
  price_from: z.coerce.number().min(0, 'Price must be 0 or greater'),
  price_unit: z.string().min(1, 'Please select a price unit'),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

interface CreateServiceFormProps {
  onSubmit: (data: ServiceFormValues) => void;
  defaultValues?: Partial<ServiceFormValues>;
  isEditing?: boolean;
}

export function CreateServiceForm({
  onSubmit,
  defaultValues,
  isEditing = false,
}: CreateServiceFormProps): React.ReactElement {
  const form = useForm({
    resolver: zodResolver(serviceFormSchema) as never,
    defaultValues: {
      title: defaultValues?.title ?? '',
      description: defaultValues?.description ?? '',
      category: defaultValues?.category ?? '',
      location: defaultValues?.location ?? '',
      city: defaultValues?.city ?? '',
      service_area: defaultValues?.service_area ?? '',
      price_from: defaultValues?.price_from ?? 50,
      price_unit: defaultValues?.price_unit ?? 'hour',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Service Information</CardTitle>
            <CardDescription>Details about the service you offer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Professional Photography" {...field} />
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
                      placeholder="Describe your service..."
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
                      <SelectItem value="fotografie">Fotografie</SelectItem>
                      <SelectItem value="videografie">Videografie</SelectItem>
                      <SelectItem value="musik">Musik & DJ</SelectItem>
                      <SelectItem value="catering">Catering</SelectItem>
                      <SelectItem value="dekoration">Dekoration</SelectItem>
                      <SelectItem value="moderation">Moderation</SelectItem>
                      <SelectItem value="planung">Event Planung</SelectItem>
                      <SelectItem value="technik">Technik & Equipment</SelectItem>
                      <SelectItem value="sonstiges">Sonstiges</SelectItem>
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
            <CardTitle>Location & Service Area</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Location *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Schwabing" {...field} />
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

            <FormField
              control={form.control}
              name="service_area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Area</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., München and surrounding areas" {...field} />
                  </FormControl>
                  <FormDescription>Where do you provide your services?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                name="price_from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price From (€) *</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" min="0" placeholder="50.00" {...field} />
                    </FormControl>
                    <FormDescription>Starting price</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price_unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Unit *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="hour">Per Hour</SelectItem>
                        <SelectItem value="day">Per Day</SelectItem>
                        <SelectItem value="project">Per Project</SelectItem>
                        <SelectItem value="person">Per Person</SelectItem>
                        <SelectItem value="event">Per Event</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            {isEditing ? 'Update Service' : 'Create Service'}
          </Button>
          <Button type="button" variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
