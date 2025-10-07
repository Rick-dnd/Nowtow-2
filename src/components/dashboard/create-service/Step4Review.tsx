import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, DollarSign, Edit2 } from 'lucide-react';
import { useMultiStepForm } from '@/components/dashboard/multi-step-form/MultiStepFormProvider';
import type { StepComponentProps } from '@/components/dashboard/multi-step-form/types';
import type { ServiceFormValues } from './schemas';

export function Step4Review({ form }: StepComponentProps<ServiceFormValues>): React.ReactElement {
  const { goToStep } = useMultiStepForm<ServiceFormValues>();
  const values = form.getValues();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Review Your Service</h3>
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
              <dt className="text-muted-foreground">Service Title</dt>
              <dd className="font-medium">{values.title}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Category</dt>
              <dd className="font-medium">{values.category}</dd>
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

      {/* Location & Service Area */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h4 className="font-semibold">Location & Service Area</h4>
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
              <dt className="text-muted-foreground">Base Location</dt>
              <dd className="font-medium">{values.location}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">City</dt>
              <dd className="font-medium">{values.city}</dd>
            </div>
            {values.service_area && (
              <div>
                <dt className="text-muted-foreground">Service Area</dt>
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
              <h4 className="font-semibold">Pricing</h4>
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
            <div>
              <dt className="text-muted-foreground">Starting Price</dt>
              <dd className="font-medium">
                ${values.price_from} per {values.price_unit}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <div className="bg-muted/50 border rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          By publishing this service, you agree to our terms and conditions.
          Make sure all information is accurate before proceeding.
        </p>
      </div>
    </div>
  );
}
