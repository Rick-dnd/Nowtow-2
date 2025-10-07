import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Banknote, Users, Edit2, Square, Image as ImageIcon } from 'lucide-react';
import { useMultiStepForm } from '@/components/dashboard/multi-step-form/MultiStepFormProvider';
import type { StepComponentProps } from '@/components/dashboard/multi-step-form/types';
import type { SpaceFormValues } from './schemas';

export function Step5Review({ form }: StepComponentProps<SpaceFormValues>): React.ReactElement {
  const { goToStep } = useMultiStepForm<SpaceFormValues>();
  const values = form.getValues();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Überprüfung</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Überprüfe alle Details, bevor du deinen Space veröffentlichst
        </p>
      </div>

      {/* Basic Information */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <h4 className="font-semibold">Grundinformationen</h4>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(): void => goToStep(0)}
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Bearbeiten
            </Button>
          </div>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-muted-foreground">Space Name</dt>
              <dd className="font-medium">{values.name}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Kategorie</dt>
              <dd className="font-medium">{values.space_category}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Beschreibung</dt>
              <dd className="font-medium text-muted-foreground line-clamp-3">
                {values.description}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Location & Size */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h4 className="font-semibold">Standort & Größe</h4>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(): void => goToStep(1)}
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Bearbeiten
            </Button>
          </div>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-muted-foreground">Adresse</dt>
              <dd className="font-medium">
                {values.address}, {values.city}
              </dd>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <dt className="text-muted-foreground flex items-center gap-1">
                  <Square className="h-4 w-4" />
                  Größe
                </dt>
                <dd className="font-medium">{values.size_sqm} qm</dd>
              </div>
              <div className="flex-1">
                <dt className="text-muted-foreground flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Kapazität
                </dt>
                <dd className="font-medium">{values.capacity} Personen</dd>
              </div>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Pricing & Features */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Banknote className="h-5 w-5 text-primary" />
              <h4 className="font-semibold">Preise & Features</h4>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(): void => goToStep(2)}
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Bearbeiten
            </Button>
          </div>
          <dl className="space-y-2 text-sm">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <dt className="text-muted-foreground">Stundensatz</dt>
                <dd className="font-medium">€{values.hourly_price}/Stunde</dd>
              </div>
              {values.daily_price !== undefined && values.daily_price > 0 && (
                <div className="flex-1">
                  <dt className="text-muted-foreground">Tagessatz</dt>
                  <dd className="font-medium">€{values.daily_price}/Tag</dd>
                </div>
              )}
            </div>
            <div>
              <dt className="text-muted-foreground">Mindestbuchung</dt>
              <dd className="font-medium">{values.minimum_booking_hours} Stunden</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Images */}
      {values.images && values.images.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Bilder ({values.images.length})</h4>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={(): void => goToStep(3)}
              >
                <Edit2 className="h-4 w-4 mr-1" />
                Bearbeiten
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {values.images.slice(0, 3).map((file, index) => {
                // Handle different image input types
                const imageSrc = file instanceof File
                  ? URL.createObjectURL(file)
                  : typeof file === 'string'
                    ? file
                    : typeof file === 'object' && 'url' in file
                      ? file.url
                      : '';

                return (
                  <div key={index} className="aspect-square rounded-lg border overflow-hidden bg-muted">
                    {imageSrc && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={imageSrc}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-muted/50 border rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          Durch die Veröffentlichung dieses Spaces stimmst du unseren Nutzungsbedingungen zu.
          Stelle sicher, dass alle Informationen korrekt sind, bevor du fortfährst.
        </p>
      </div>
    </div>
  );
}
