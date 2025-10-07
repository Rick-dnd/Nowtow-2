import React from 'react';
import { FormProvider, useForm, type FieldValues, type DefaultValues, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import type { MultiStepFormContextValue, MultiStepConfig } from './types';

const MultiStepFormContext = React.createContext<MultiStepFormContextValue<FieldValues> | null>(null);

export function useMultiStepForm<T extends FieldValues = FieldValues>(): MultiStepFormContextValue<T> {
  const context = React.useContext(MultiStepFormContext);
  if (!context) {
    throw new Error('useMultiStepForm must be used within MultiStepFormProvider');
  }
  return context as MultiStepFormContextValue<T>;
}

interface MultiStepFormProviderProps<T extends FieldValues> {
  children: React.ReactNode;
  config: MultiStepConfig;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => void | Promise<void>;
  schema: z.ZodTypeAny;
}

export function MultiStepFormProvider<T extends FieldValues>({
  children,
  config,
  defaultValues,
  onSubmit,
  schema,
}: MultiStepFormProviderProps<T>): React.ReactElement {
  const [currentStep, setCurrentStep] = React.useState<number>(0);

  // Initialize form with zodResolver
  const form = useForm({
    resolver: zodResolver(schema) as never,
    defaultValues,
    mode: 'onChange',
  }) as UseFormReturn<T>;

  // Load saved form data from localStorage on mount
  React.useEffect((): void => {
    if (config.storageKey) {
      try {
        const savedData = localStorage.getItem(config.storageKey);
        if (savedData) {
          const parsed = JSON.parse(savedData) as Partial<T>;
          // Reset form with saved data
          form.reset({ ...defaultValues, ...parsed } as DefaultValues<T>);
        }
      } catch (error) {
        console.error('Failed to load saved form data:', error);
      }
    }
  }, [config.storageKey, defaultValues, form]);

  // Save form data to localStorage when it changes
  React.useEffect((): (() => void) => {
    if (!config.storageKey) return (): void => {};

    const subscription = form.watch((data): void => {
      try {
        localStorage.setItem(config.storageKey, JSON.stringify(data));
      } catch (error) {
        console.error('Failed to save form data:', error);
      }
    });

    return (): void => {
      subscription.unsubscribe();
    };
  }, [config.storageKey, form]);

  // Clear localStorage after successful submission
  const handleSubmit = form.handleSubmit(async (data: T): Promise<void> => {
    await onSubmit(data);

    // Clear saved data on successful submission
    if (config.storageKey) {
      try {
        localStorage.removeItem(config.storageKey);
      } catch (error) {
        console.error('Failed to clear saved form data:', error);
      }
    }
  });

  // Validate current step using per-step schema
  const validateCurrentStep = React.useCallback(async (): Promise<boolean> => {
    const stepSchema = config.stepSchemas[currentStep];
    if (!stepSchema) return true;

    const formValues = form.getValues();

    try {
      await stepSchema.parseAsync(formValues);
      return true;
    } catch {
      // Trigger validation to show errors
      await form.trigger();
      return false;
    }
  }, [currentStep, config.stepSchemas, form]);

  // Navigation functions
  const goToStep = React.useCallback((step: number): void => {
    if (step >= 0 && step < config.steps.length) {
      setCurrentStep(step);
    }
  }, [config.steps.length]);

  const goToNext = React.useCallback(async (): Promise<boolean> => {
    // Validate current step before proceeding
    const isValid = await validateCurrentStep();

    if (!isValid) {
      return false;
    }

    if (currentStep < config.steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      return true;
    }

    // If on last step, submit the form
    if (currentStep === config.steps.length - 1) {
      await handleSubmit();
      return true;
    }

    return false;
  }, [currentStep, config.steps.length, validateCurrentStep, handleSubmit]);

  const goToPrevious = React.useCallback((): void => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  // Computed values
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === config.steps.length - 1;
  const canGoNext = currentStep < config.steps.length - 1;
  const canGoPrevious = currentStep > 0;

  const contextValue: MultiStepFormContextValue<FieldValues> = {
    currentStep,
    totalSteps: config.steps.length,
    isFirstStep,
    isLastStep,
    canGoNext,
    canGoPrevious,
    goToStep,
    goToNext,
    goToPrevious,
    form: form as UseFormReturn<FieldValues>,
    validateCurrentStep,
  };

  return (
    <MultiStepFormContext.Provider value={contextValue}>
      <FormProvider {...form}>{children}</FormProvider>
    </MultiStepFormContext.Provider>
  );
}
