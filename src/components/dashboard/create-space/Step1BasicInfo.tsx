import React from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { StepComponentProps } from '@/components/dashboard/multi-step-form/types';
import type { SpaceFormValues } from './schemas';

const SPACE_CATEGORIES = [
  { value: 'tonstudio', label: 'Tonstudio' },
  { value: 'fotostudio', label: 'Fotostudio' },
  { value: 'werkstaetten', label: 'Werkstätten' },
  { value: 'kunst-toepfer', label: 'Kunst & Töpfer' },
  { value: 'popup-retail', label: 'Popup & Retail' },
  { value: 'sportraeume', label: 'Sporträume' },
  { value: 'gaming-podcast', label: 'Gaming & Podcast' },
  { value: 'kuechen-food', label: 'Küchen & Food' },
  { value: 'other', label: 'Sonstiges' },
] as const;

export function Step1BasicInfo({ form }: StepComponentProps<SpaceFormValues>): React.ReactElement {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Grundinformationen</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Erzähle uns über deinen Raum
        </p>
      </div>

      <FormField
        control={form.control}
        name="name"
        render={({ field }): React.ReactElement => (
          <FormItem>
            <FormLabel>Raum Name *</FormLabel>
            <FormControl>
              <Input placeholder="z.B. Modernes Tonstudio in Schwabing" {...field} />
            </FormControl>
            <FormDescription>
              Gib deinem Raum einen aussagekräftigen Namen
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="space_category"
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
                {SPACE_CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Welche Art von Raum bietest du an?
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
                placeholder="Beschreibe deinen Raum - was macht ihn besonders? Welche Ausstattung ist inbegriffen?"
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
