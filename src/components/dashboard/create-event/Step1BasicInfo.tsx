import React from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { StepComponentProps } from '@/components/dashboard/multi-step-form/types';
import type { EventFormValues } from './schemas';

// DB-konforme Kategorien (müssen mit CHECK constraint übereinstimmen)
const EVENT_CATEGORIES = [
  { value: 'music', label: 'Musik' },
  { value: 'sports', label: 'Sport' },
  { value: 'cultural', label: 'Kunst & Kultur' },
  { value: 'food', label: 'Essen & Trinken' },
  { value: 'networking', label: 'Networking' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'party', label: 'Party & Nightlife' },
  { value: 'other', label: 'Sonstiges' },
] as const;

export function Step1BasicInfo({ form }: StepComponentProps<EventFormValues>): React.ReactElement {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Grundinformationen</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Beginne mit den wichtigsten Informationen - worum geht es bei deinem Event?
        </p>
      </div>

      <FormField
        control={form.control}
        name="name"
        render={({ field }): React.ReactElement => (
          <FormItem>
            <FormLabel>Event Name *</FormLabel>
            <FormControl>
              <Input placeholder="z.B. Sommer Musikfestival 2024" {...field} />
            </FormControl>
            <FormDescription>
              Wähle einen klaren, aussagekräftigen Namen, der zeigt, worum es bei deinem Event geht
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
            <FormLabel>Kategorie *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Kategorie wählen" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {EVENT_CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Hilf anderen, dein Event zu finden, indem du die richtige Kategorie wählst
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
            <FormLabel>Beschreibung *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Beschreibe dein Event im Detail - was macht es besonders? Was erwartet die Teilnehmer?"
                className="min-h-[150px] resize-none"
                {...field}
              />
            </FormControl>
            <FormDescription>
              {field.value?.length ?? 0} / 2000 Zeichen (mindestens 20)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
