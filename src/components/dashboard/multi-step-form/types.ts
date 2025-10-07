import type { Step } from '@/components/ui/stepper';
import type { UseFormReturn, FieldValues, Path } from 'react-hook-form';
import type { z } from 'zod';

export interface MultiStepConfig {
  steps: Step[];
  stepSchemas: z.ZodTypeAny[];
  storageKey: string;
}

export interface MultiStepFormContextValue<T extends FieldValues = FieldValues> {
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  canGoNext: boolean;
  canGoPrevious: boolean;
  goToStep: (step: number) => void;
  goToNext: () => Promise<boolean>;
  goToPrevious: () => void;
  form: UseFormReturn<T>;
  validateCurrentStep: () => Promise<boolean>;
}

export interface StepComponentProps<T extends FieldValues = FieldValues> {
  form: UseFormReturn<T>;
}

export type StepField<T extends FieldValues> = Path<T>;

export interface StepValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}
