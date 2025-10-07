'use client';

import React from 'react';
import { MultiStepFormProvider, useMultiStepForm } from '@/components/dashboard/multi-step-form/MultiStepFormProvider';
import { Stepper } from '@/components/ui/stepper';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { serviceFormSchema, serviceStepSchemas, type ServiceFormValues } from './schemas';
import { Step1BasicInfo } from './Step1BasicInfo';
import { Step2Location } from './Step2Location';
import { Step3Pricing } from './Step3Pricing';
import { Step4Images } from './Step4Images';
import { Step5Review } from './Step5Review';
import type { MultiStepConfig } from '@/components/dashboard/multi-step-form/types';

const STEPS = [
  { label: 'Grundinfo', description: 'Service Details' },
  { label: 'Standort', description: 'Service-Bereich' },
  { label: 'Preise', description: 'Deine Tarife' },
  { label: 'Bilder', description: 'Service-Fotos' },
  { label: 'Überprüfung', description: 'Abschluss' },
];

const config: MultiStepConfig = {
  steps: STEPS,
  stepSchemas: serviceStepSchemas,
  storageKey: 'create-service-draft',
};

interface CreateServiceMultiStepFormProps {
  onSubmit: (data: ServiceFormValues) => void | Promise<void>;
  defaultValues?: Partial<ServiceFormValues>;
}

function FormContent(): React.ReactElement {
  const { currentStep, isFirstStep, isLastStep, goToPrevious, goToNext, form } = useMultiStepForm<ServiceFormValues>();
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
    <Step3Pricing key="step3" form={form} />,
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
          {isLastStep ? 'Service veröffentlichen' : 'Weiter'}
          {!isLastStep && <ChevronRight className="h-4 w-4 ml-1" />}
        </Button>
      </div>
    </div>
  );
}

export function CreateServiceMultiStepForm({
  onSubmit,
  defaultValues,
}: CreateServiceMultiStepFormProps): React.ReactElement {
  const formDefaultValues: Partial<ServiceFormValues> = {
    title: defaultValues?.title ?? '',
    category: defaultValues?.category ?? '',
    description: defaultValues?.description ?? '',
    location: defaultValues?.location ?? '',
    city: defaultValues?.city ?? '',
    service_area: defaultValues?.service_area ?? '',
    price_from: defaultValues?.price_from ?? 0,
    price_unit: defaultValues?.price_unit ?? '',
    images: defaultValues?.images,
  };

  return (
    <MultiStepFormProvider<ServiceFormValues>
      config={config}
      defaultValues={formDefaultValues}
      onSubmit={onSubmit}
      schema={serviceFormSchema}
    >
      <FormContent />
    </MultiStepFormProvider>
  );
}
