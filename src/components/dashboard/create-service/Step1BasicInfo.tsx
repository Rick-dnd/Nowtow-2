import React from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { StepComponentProps } from '@/components/dashboard/multi-step-form/types';
import type { ServiceFormValues } from './schemas';

const SERVICE_CATEGORIES = [
  'Photography',
  'Catering',
  'DJ & Music',
  'Event Planning',
  'Design & Decoration',
  'Tech & AV',
  'Entertainment',
  'Other',
] as const;

export function Step1BasicInfo({ form }: StepComponentProps<ServiceFormValues>): React.ReactElement {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Basic Information</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Tell us about your service
        </p>
      </div>

      <FormField
        control={form.control}
        name="title"
        render={({ field }): React.ReactElement => (
          <FormItem>
            <FormLabel>Service Title *</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Professional Event Photography" {...field} />
            </FormControl>
            <FormDescription>
              Give your service a clear, descriptive title
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="category"
        render={({ field }): React.ReactElement => (
          <FormItem>
            <FormLabel>Category *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {SERVICE_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              What type of service do you offer?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }): React.ReactElement => (
          <FormItem>
            <FormLabel>Description *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe your service - what do you offer? What makes you unique?"
                className="min-h-[150px] resize-none"
                {...field}
              />
            </FormControl>
            <FormDescription>
              {field.value?.length ?? 0} / 2000 characters (minimum 20)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
