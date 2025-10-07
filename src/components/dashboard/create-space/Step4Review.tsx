import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, DollarSign, Users, Edit2, Square } from 'lucide-react';
import { useMultiStepForm } from '@/components/dashboard/multi-step-form/MultiStepFormProvider';
import type { StepComponentProps } from '@/components/dashboard/multi-step-form/types';
import type { SpaceFormValues } from './schemas';

export function Step4Review({ form }: StepComponentProps<SpaceFormValues>): React.ReactElement {
  const { goToStep } = useMultiStepForm<SpaceFormValues>();
  const values = form.getValues();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Review Your Space</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Check all details before publishing
        </p>
      </div>

      {/* Basic Information */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <h4 className="font-semibold">Basic Information</h4>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(): void => goToStep(0)}
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-muted-foreground">Space Name</dt>
              <dd className="font-medium">{values.name}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Category</dt>
              <dd className="font-medium">{values.space_category}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Description</dt>
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
              <h4 className="font-semibold">Location & Size</h4>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(): void => goToStep(1)}
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-muted-foreground">Address</dt>
              <dd className="font-medium">
                {values.address}, {values.city}
              </dd>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <dt className="text-muted-foreground flex items-center gap-1">
                  <Square className="h-4 w-4" />
                  Size
                </dt>
                <dd className="font-medium">{values.size_sqm} sqm</dd>
              </div>
              <div className="flex-1">
                <dt className="text-muted-foreground flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Capacity
                </dt>
                <dd className="font-medium">{values.capacity} people</dd>
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
              <DollarSign className="h-5 w-5 text-primary" />
              <h4 className="font-semibold">Pricing & Features</h4>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(): void => goToStep(2)}
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
          <dl className="space-y-2 text-sm">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <dt className="text-muted-foreground">Hourly Rate</dt>
                <dd className="font-medium">${values.hourly_price}/hour</dd>
              </div>
              {values.daily_price !== undefined && values.daily_price > 0 && (
                <div className="flex-1">
                  <dt className="text-muted-foreground">Daily Rate</dt>
                  <dd className="font-medium">${values.daily_price}/day</dd>
                </div>
              )}
            </div>
            <div>
              <dt className="text-muted-foreground">Minimum Booking</dt>
              <dd className="font-medium">{values.minimum_booking_hours} hours</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <div className="bg-muted/50 border rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          By publishing this space, you agree to our terms and conditions.
          Make sure all information is accurate before proceeding.
        </p>
      </div>
    </div>
  );
}
