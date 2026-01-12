import { useState, useCallback } from 'react';
import { Service } from '@/data/services';
import { WizardStepper, WizardStep } from './WizardStepper';
import { WizardNavigation } from './WizardNavigation';
import { ConfigurationStep } from './ConfigurationStep';
import { ReviewStep } from './ReviewStep';
import { SuccessStep } from './SuccessStep';
import { Progress } from '@/components/ui/progress';

interface ServiceWizardProps {
  service: Service;
}

const WIZARD_STEPS: WizardStep[] = [
  { id: 'configure', title: 'Configure', description: 'Set parameters' },
  { id: 'review', title: 'Review', description: 'Verify settings' },
  { id: 'complete', title: 'Complete', description: 'Submission done' },
];

export function ServiceWizard({ service }: ServiceWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState<Record<string, string | boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestId, setRequestId] = useState('');

  const handleValueChange = useCallback((name: string, value: string | boolean) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    // Clear error when value changes
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const validateStep = useCallback((): boolean => {
    if (currentStep === 0) {
      const newErrors: Record<string, string> = {};
      
      service.parameters.forEach((param) => {
        if (param.required) {
          const value = formValues[param.name];
          if (value === undefined || value === '' || value === false) {
            newErrors[param.name] = `${param.name.replace(/_/g, ' ')} is required`;
          }
        }

        // Additional validation for specific types
        if (param.type === 'string' && formValues[param.name]) {
          const value = formValues[param.name] as string;
          if (param.name.includes('name') && !/^[a-z][a-z0-9-]*[a-z0-9]$/.test(value) && value.length > 1) {
            newErrors[param.name] = 'Must be lowercase, start with letter, and contain only letters, numbers, and hyphens';
          }
        }

        if (param.type === 'number' && formValues[param.name]) {
          const value = Number(formValues[param.name]);
          if (isNaN(value) || value <= 0) {
            newErrors[param.name] = 'Must be a positive number';
          }
        }
      });

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
    return true;
  }, [currentStep, formValues, service.parameters]);

  const handleNext = useCallback(() => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, WIZARD_STEPS.length - 1));
    }
  }, [validateStep]);

  const handlePrevious = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleStepClick = useCallback((stepIndex: number) => {
    if (stepIndex < currentStep) {
      setCurrentStep(stepIndex);
    }
  }, [currentStep]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Generate mock request ID
    const id = `REQ-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setRequestId(id);
    
    setIsSubmitting(false);
    setCurrentStep(2); // Move to success step
  }, []);

  const progressValue = ((currentStep + 1) / WIZARD_STEPS.length) * 100;

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      {/* Progress bar at top */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-foreground">{Math.round(progressValue)}%</span>
        </div>
        <Progress value={progressValue} className="h-2" />
      </div>

      {/* Stepper */}
      <WizardStepper 
        steps={WIZARD_STEPS} 
        currentStep={currentStep}
        onStepClick={currentStep < 2 ? handleStepClick : undefined}
      />

      {/* Step Content */}
      <div className="mt-8 min-h-[400px]">
        {currentStep === 0 && (
          <ConfigurationStep
            service={service}
            formValues={formValues}
            errors={errors}
            onValueChange={handleValueChange}
          />
        )}
        
        {currentStep === 1 && (
          <ReviewStep
            service={service}
            formValues={formValues}
          />
        )}
        
        {currentStep === 2 && (
          <SuccessStep
            serviceName={service.name}
            requestId={requestId}
          />
        )}
      </div>

      {/* Navigation */}
      {currentStep < 2 && (
        <WizardNavigation
          currentStep={currentStep}
          totalSteps={WIZARD_STEPS.length - 1} // Exclude success step from count
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isNextDisabled={Object.keys(errors).length > 0}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
