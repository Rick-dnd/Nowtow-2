import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Step {
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  className?: string;
}

export function Stepper({ steps, currentStep, onStepClick, className }: StepperProps): React.ReactElement {
  return (
    <div className={cn('w-full', className)}>
      {/* Desktop: Horizontal Layout */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isClickable = isCompleted && onStepClick;

            return (
              <React.Fragment key={index}>
                {/* Step Circle */}
                <div className="flex flex-col items-center flex-1">
                  <button
                    type="button"
                    onClick={(): void => {
                      if (isClickable) {
                        onStepClick(index);
                      }
                    }}
                    disabled={!isClickable}
                    className={cn(
                      'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all',
                      'focus:outline-none',
                      isCompleted && 'bg-primary border-primary text-primary-foreground',
                      isCurrent && 'border-primary text-primary',
                      !isCompleted && !isCurrent && 'border-muted-foreground/30 text-muted-foreground',
                      isClickable && 'cursor-pointer hover:border-primary hover:text-primary'
                    )}
                    aria-label={`Step ${index + 1}: ${step.label}`}
                    aria-current={isCurrent ? 'step' : undefined}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <span className="text-sm font-semibold">{index + 1}</span>
                    )}
                  </button>

                  {/* Step Label */}
                  <div className="mt-2 text-center">
                    <p
                      className={cn(
                        'text-sm font-medium',
                        isCurrent && 'text-primary',
                        isCompleted && 'text-foreground',
                        !isCompleted && !isCurrent && 'text-muted-foreground'
                      )}
                    >
                      {step.label}
                    </p>
                    {step.description && (
                      <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                    )}
                  </div>
                </div>

                {/* Progress Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-2 mb-6">
                    <div
                      className={cn(
                        'h-full transition-all',
                        isCompleted ? 'bg-primary' : 'bg-muted-foreground/30'
                      )}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Mobile: Vertical Layout */}
      <div className="md:hidden space-y-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = isCompleted && onStepClick;

          return (
            <div key={index} className="flex items-start">
              {/* Step Circle & Line Container */}
              <div className="flex flex-col items-center mr-4">
                <button
                  type="button"
                  onClick={(): void => {
                    if (isClickable) {
                      onStepClick(index);
                    }
                  }}
                  disabled={!isClickable}
                  className={cn(
                    'flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all flex-shrink-0',
                    'focus:outline-none',
                    isCompleted && 'bg-primary border-primary text-primary-foreground',
                    isCurrent && 'border-primary text-primary',
                    !isCompleted && !isCurrent && 'border-muted-foreground/30 text-muted-foreground',
                    isClickable && 'cursor-pointer hover:border-primary hover:text-primary'
                  )}
                  aria-label={`Step ${index + 1}: ${step.label}`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <span className="text-xs font-semibold">{index + 1}</span>
                  )}
                </button>

                {/* Vertical Line */}
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-12 mt-2">
                    <div
                      className={cn(
                        'h-full transition-all',
                        isCompleted ? 'bg-primary' : 'bg-muted-foreground/30'
                      )}
                    />
                  </div>
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 pt-1">
                <p
                  className={cn(
                    'text-sm font-medium',
                    isCurrent && 'text-primary',
                    isCompleted && 'text-foreground',
                    !isCompleted && !isCurrent && 'text-muted-foreground'
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-6 w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          role="progressbar"
          aria-valuenow={currentStep + 1}
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-label={`Progress: Step ${currentStep + 1} of ${steps.length}`}
        />
      </div>
    </div>
  );
}
