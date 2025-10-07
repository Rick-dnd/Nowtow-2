import React from 'react';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FileUpload } from '@/components/ui/file-upload';
import type { StepComponentProps } from '@/components/dashboard/multi-step-form/types';
import type { ServiceFormValues } from './schemas';

export function Step4Images({ form }: StepComponentProps<ServiceFormValues>): React.ReactElement {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Service-Bilder</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Lade Bilder für deinen Service hoch (optional)
        </p>
      </div>

      <FormField
        control={form.control}
        name="images"
        render={({ field }): React.ReactElement => {
          // Filter only File objects for the FileUpload component
          const fileValues = (field.value || []).filter((img): img is File => img instanceof File);

          return (
            <FormItem>
              <FormLabel>Bilder hochladen</FormLabel>
              <FileUpload
                value={fileValues}
                onChange={field.onChange}
                maxFiles={5}
                maxSize={5 * 1024 * 1024}
              />
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}
