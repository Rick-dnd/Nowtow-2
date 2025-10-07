import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, DollarSign, Edit2, Image as ImageIcon } from 'lucide-react';
import { useMultiStepForm } from '@/components/dashboard/multi-step-form/MultiStepFormProvider';
import type { StepComponentProps } from '@/components/dashboard/multi-step-form/types';
import type { ServiceFormValues } from './schemas';

export function Step5Review({ form }: StepComponentProps<ServiceFormValues>): React.ReactElement {
  const { goToStep } = useMultiStepForm<ServiceFormValues>();
  const values = form.getValues();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Überprüfung</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Überprüfe alle Details, bevor du deinen Service veröffentlichst
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
              <dt className="text-muted-foreground">Service Titel</dt>
              <dd className="font-medium">{values.title}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Kategorie</dt>
              <dd className="font-medium">{values.category}</dd>
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

      {/* Location & Service Area */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h4 className="font-semibold">Standort & Service-Bereich</h4>
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
              <dt className="text-muted-foreground">Hauptstandort</dt>
              <dd className="font-medium">{values.location}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Stadt</dt>
              <dd className="font-medium">{values.city}</dd>
            </div>
            {values.service_area && (
              <div>
                <dt className="text-muted-foreground">Service-Bereich</dt>
                <dd className="font-medium">{values.service_area}</dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <h4 className="font-semibold">Preise</h4>
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
            <div>
              <dt className="text-muted-foreground">Startpreis</dt>
              <dd className="font-medium">
                €{values.price_from} pro {values.price_unit}
              </dd>
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
              {values.images.slice(0, 3).map((file, index) => (
                <div key={index} className="aspect-square rounded-lg border overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={file instanceof File ? URL.createObjectURL(file) : file}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-muted/50 border rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          Durch die Veröffentlichung dieses Services stimmst du unseren Nutzungsbedingungen zu.
          Stelle sicher, dass alle Informationen korrekt sind, bevor du fortfährst.
        </p>
      </div>
    </div>
  );
}
