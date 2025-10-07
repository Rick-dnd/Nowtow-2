'use client';

import React from 'react';
import { MultiStepFormProvider, useMultiStepForm } from '@/components/dashboard/multi-step-form/MultiStepFormProvider';
import { Stepper } from '@/components/ui/stepper';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { eventFormSchema, eventStepSchemas, type EventFormValues } from './schemas';
import { Step1BasicInfo } from './Step1BasicInfo';
import { Step2Location } from './Step2Location';
import { Step3DateTime } from './Step3DateTime';
import { Step4Pricing } from './Step4Pricing';
import { Step4Amenities } from './Step4Amenities';
import { Step5Images } from './Step5Images';
import { Step6Review } from './Step6Review';
import type { MultiStepConfig } from '@/components/dashboard/multi-step-form/types';

const STEPS = [
  { label: 'Grundinfo', description: 'Event Details' },
  { label: 'Standort', description: 'Wo findet es statt' },
  { label: 'Datum & Zeit', description: 'Wann findet es statt' },
  { label: 'Preise', description: 'Tickets & Details' },
  { label: 'Ausstattung', description: 'Highlights & Leistungen' },
  { label: 'Bilder', description: 'Event-Fotos' },
  { label: 'Überprüfung', description: 'Abschluss' },
];

const config: MultiStepConfig = {
  steps: STEPS,
  stepSchemas: eventStepSchemas,
  storageKey: 'create-event-draft',
};

interface CreateEventMultiStepFormProps {
  onSubmit: (data: EventFormValues) => void | Promise<void>;
  defaultValues?: Partial<EventFormValues>;
  isEditing?: boolean;
}

function FormContent(): React.ReactElement {
  const { currentStep, isFirstStep, isLastStep, goToPrevious, goToNext, form } = useMultiStepForm<EventFormValues>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleNext = async (): Promise<void> => {
    setIsSubmitting(true);
    try {
      await goToNext();
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepComponents = [
    <Step1BasicInfo key="step1" form={form} />,
    <Step2Location key="step2" form={form} />,
    <Step3DateTime key="step3" form={form} />,
    <Step4Pricing key="step4" form={form} />,
    <Step4Amenities key="step4b" form={form} />,
    <Step5Images key="step5" form={form} />,
    <Step6Review key="step6" form={form} />,
  ];

  return (
    <div className="space-y-8">
      {/* Stepper */}
      <Stepper steps={STEPS} currentStep={currentStep} />

      {/* Current Step Content */}
      <div className="min-h-[400px]">{stepComponents[currentStep]}</div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={goToPrevious}
          disabled={isFirstStep || isSubmitting}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Zurück
        </Button>

        <Button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {isLastStep ? 'Event veröffentlichen' : 'Weiter'}
          {!isLastStep && <ChevronRight className="h-4 w-4 ml-1" />}
        </Button>
      </div>
    </div>
  );
}

export function CreateEventMultiStepForm({
  onSubmit,
  defaultValues,
}: CreateEventMultiStepFormProps): React.ReactElement {
  const formDefaultValues: Partial<EventFormValues> = {
    name: defaultValues?.name ?? '',
    category: defaultValues?.category ?? '',
    description: defaultValues?.description ?? '',
    venue_name: defaultValues?.venue_name ?? '',
    address: defaultValues?.address ?? '',
    city: defaultValues?.city ?? '',
    district: defaultValues?.district ?? '',
    start_datetime: defaultValues?.start_datetime,
    end_datetime: defaultValues?.end_datetime,
    ticket_price: defaultValues?.ticket_price ?? 0,
    max_attendees: defaultValues?.max_attendees ?? 100,
    min_age: defaultValues?.min_age,
    early_bird_enabled: defaultValues?.early_bird_enabled ?? false,
    early_bird_price: defaultValues?.early_bird_price,
    early_bird_quota: defaultValues?.early_bird_quota,
    dress_code: defaultValues?.dress_code ?? '',
    cancellation_policy: defaultValues?.cancellation_policy ?? '',
    highlights: defaultValues?.highlights ?? [],
    includes: defaultValues?.includes ?? [],
    images: defaultValues?.images,
  };

  return (
    <MultiStepFormProvider<EventFormValues>
      config={config}
      defaultValues={formDefaultValues}
      onSubmit={onSubmit}
      schema={eventFormSchema}
    >
      <FormContent />
    </MultiStepFormProvider>
  );
}
