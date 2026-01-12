import { Service } from '@/data/services';
import { CheckCircle2, AlertTriangle, FileCode } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ReviewStepProps {
  service: Service;
  formValues: Record<string, string | boolean>;
}

export function ReviewStep({ service, formValues }: ReviewStepProps) {
  const configuredParams = service.parameters.filter(
    (param) => formValues[param.name] !== undefined && formValues[param.name] !== ''
  );

  const enabledFeatures = service.parameters
    .filter((p) => p.type === 'boolean' && formValues[p.name])
    .map((p) => p.name.replace(/_/g, ' '));

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Review & Confirm</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Please review your configuration before submitting
        </p>
      </div>

      {/* Service Summary */}
      <div className="rounded-xl border border-border bg-muted/30 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-foreground">{service.name}</h4>
            <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
          </div>
          <Badge className="bg-primary/20 text-primary">
            v{service.version}
          </Badge>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>Team: {service.team}</span>
          <span>•</span>
          <span>Est. Time: {service.estimatedTime}</span>
        </div>
      </div>

      {/* Configuration Summary */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 text-foreground">
          <FileCode className="h-5 w-5 text-primary" />
          <h4 className="font-semibold">Configuration Summary</h4>
        </div>

        <div className="mt-4 divide-y divide-border">
          {configuredParams.map((param) => (
            <div key={param.name} className="flex items-center justify-between py-3">
              <div>
                <span className="text-sm font-medium text-foreground">
                  {param.name.replace(/_/g, ' ')}
                </span>
                {param.required && (
                  <Badge variant="outline" className="ml-2 text-xs">Required</Badge>
                )}
              </div>
              <span className="font-mono text-sm text-muted-foreground">
                {typeof formValues[param.name] === 'boolean' 
                  ? formValues[param.name] ? '✓ Enabled' : '✗ Disabled'
                  : formValues[param.name]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Enabled Features */}
      {enabledFeatures.length > 0 && (
        <div className="rounded-xl border border-success/30 bg-success/5 p-6">
          <div className="flex items-center gap-2 text-success">
            <CheckCircle2 className="h-5 w-5" />
            <h4 className="font-semibold">Enabled Features</h4>
          </div>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {enabledFeatures.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-success" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Warning */}
      <div className="rounded-xl border border-warning/30 bg-warning/5 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-warning">Before you submit</p>
            <p className="mt-1 text-sm text-muted-foreground">
              This action will initiate the provisioning process. Resources will be created 
              according to your configuration. This may take approximately {service.estimatedTime}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
