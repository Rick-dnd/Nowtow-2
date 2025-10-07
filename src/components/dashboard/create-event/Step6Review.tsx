import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { Calendar, MapPin, DollarSign, Users, Edit2, Image as ImageIcon } from 'lucide-react';
import { useMultiStepForm } from '@/components/dashboard/multi-step-form/MultiStepFormProvider';
import type { StepComponentProps } from '@/components/dashboard/multi-step-form/types';
import type { EventFormValues } from './schemas';

export function Step6Review({ form }: StepComponentProps<EventFormValues>): React.ReactElement {
  const { goToStep } = useMultiStepForm<EventFormValues>();
  const values = form.getValues();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Überprüfung</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Überprüfe alle Details, bevor du dein Event veröffentlichst
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
              <dt className="text-muted-foreground">Event Name</dt>
              <dd className="font-medium">{values.name}</dd>
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

      {/* Location */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h4 className="font-semibold">Standort</h4>
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
              <dt className="text-muted-foreground">Veranstaltungsort</dt>
              <dd className="font-medium">{values.venue_name}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Adresse</dt>
              <dd className="font-medium">
                {values.address}, {values.city}
                {values.district && `, ${values.district}`}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Date & Time */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h4 className="font-semibold">Datum & Uhrzeit</h4>
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
              <dt className="text-muted-foreground">Beginnt</dt>
              <dd className="font-medium">
                {values.start_datetime && format(values.start_datetime, 'PPP p')}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Endet</dt>
              <dd className="font-medium">
                {values.end_datetime && format(values.end_datetime, 'PPP p')}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {/* Pricing & Details */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <h4 className="font-semibold">Preise & Details</h4>
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
          <dl className="space-y-2 text-sm">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <dt className="text-muted-foreground">Ticketpreis</dt>
                <dd className="font-medium">
                  {values.ticket_price === 0 ? 'Kostenlos' : `€${values.ticket_price}`}
                </dd>
              </div>
              <div className="flex-1">
                <dt className="text-muted-foreground flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Max Teilnehmer
                </dt>
                <dd className="font-medium">{values.max_attendees}</dd>
              </div>
            </div>

            {values.early_bird_enabled && (
              <div>
                <dt className="text-muted-foreground">Frühbucher</dt>
                <dd className="font-medium">
                  €{values.early_bird_price} ({values.early_bird_quota} Tickets)
                </dd>
              </div>
            )}

            {values.min_age !== undefined && values.min_age > 0 && (
              <div>
                <dt className="text-muted-foreground">Mindestalter</dt>
                <dd className="font-medium">{values.min_age}+</dd>
              </div>
            )}

            {values.dress_code && (
              <div>
                <dt className="text-muted-foreground">Dresscode</dt>
                <dd className="font-medium">{values.dress_code}</dd>
              </div>
            )}

            {values.cancellation_policy && (
              <div>
                <dt className="text-muted-foreground">Stornierungsrichtlinie</dt>
                <dd className="font-medium text-muted-foreground line-clamp-2">
                  {values.cancellation_policy}
                </dd>
              </div>
            )}
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
                onClick={(): void => goToStep(4)}
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
          Durch die Veröffentlichung dieses Events stimmst du unseren Nutzungsbedingungen zu.
          Stelle sicher, dass alle Informationen korrekt sind, bevor du fortfährst.
        </p>
      </div>
    </div>
  );
}
