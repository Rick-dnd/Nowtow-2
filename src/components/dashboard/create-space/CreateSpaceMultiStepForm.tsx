'use client';

import React from 'react';
import { MultiStepFormProvider, useMultiStepForm } from '@/components/dashboard/multi-step-form/MultiStepFormProvider';
import { Stepper } from '@/components/ui/stepper';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { spaceFormSchema, spaceStepSchemas, type SpaceFormValues } from './schemas';
import { Step1BasicInfo } from './Step1BasicInfo';
import { Step2Location } from './Step2Location';
import { Step3Features } from './Step3Features';
import { Step4Images } from './Step4Images';
import { Step5Review } from './Step5Review';
import type { MultiStepConfig } from '@/components/dashboard/multi-step-form/types';

const STEPS = [
  { label: 'Grundinfo', description: 'Raum Details' },
  { label: 'Standort', description: 'Adresse & Größe' },
  { label: 'Preise', description: 'Tarife & Features' },
  { label: 'Bilder', description: 'Space-Fotos' },
  { label: 'Überprüfung', description: 'Abschluss' },
];

const config: MultiStepConfig = {
  steps: STEPS,
  stepSchemas: spaceStepSchemas,
  storageKey: 'create-space-draft',
};

interface CreateSpaceMultiStepFormProps {
  onSubmit: (data: SpaceFormValues) => void | Promise<void>;
  defaultValues?: Partial<SpaceFormValues>;
}

function FormContent(): React.ReactElement {
  const { currentStep, isFirstStep, isLastStep, goToPrevious, goToNext, form } = useMultiStepForm<SpaceFormValues>();
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
    <Step3Features key="step3" form={form} />,
    <Step4Images key="step4" form={form} />,
    <Step5Review key="step5" form={form} />,
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
          {isLastStep ? 'Space veröffentlichen' : 'Weiter'}
          {!isLastStep && <ChevronRight className="h-4 w-4 ml-1" />}
        </Button>
      </div>
    </div>
  );
}

export function CreateSpaceMultiStepForm({
  onSubmit,
  defaultValues,
}: CreateSpaceMultiStepFormProps): React.ReactElement {
  const formDefaultValues: Partial<SpaceFormValues> = {
    name: defaultValues?.name ?? '',
    space_category: defaultValues?.space_category ?? '',
    description: defaultValues?.description ?? '',
    address: defaultValues?.address ?? '',
    city: defaultValues?.city ?? '',
    size_sqm: defaultValues?.size_sqm ?? 0,
    capacity: defaultValues?.capacity ?? 0,
    hourly_price: defaultValues?.hourly_price ?? 0,
    daily_price: defaultValues?.daily_price,
    minimum_booking_hours: defaultValues?.minimum_booking_hours ?? 1,
    amenities: defaultValues?.amenities ?? [],
    house_rules: defaultValues?.house_rules ?? [],
    custom_house_rules: defaultValues?.custom_house_rules ?? '',
    images: defaultValues?.images,
  };

  return (
    <MultiStepFormProvider<SpaceFormValues>
      config={config}
      defaultValues={formDefaultValues}
      onSubmit={onSubmit}
      schema={spaceFormSchema}
    >
      <FormContent />
    </MultiStepFormProvider>
  );
}
