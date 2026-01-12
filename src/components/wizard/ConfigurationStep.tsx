import { Service } from '@/data/services';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConfigurationStepProps {
  service: Service;
  formValues: Record<string, string | boolean>;
  errors: Record<string, string>;
  onValueChange: (name: string, value: string | boolean) => void;
}

export function ConfigurationStep({ 
  service, 
  formValues, 
  errors,
  onValueChange 
}: ConfigurationStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Configuration</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in the required parameters to provision this service
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {service.parameters.map((param) => {
          const hasError = !!errors[param.name];
          
          return (
            <div key={param.name} className={cn(
              "space-y-2",
              param.type === 'boolean' && "md:col-span-2"
            )}>
              <Label htmlFor={param.name} className="flex items-center gap-2">
                {param.name.replace(/_/g, ' ')}
                {param.required && (
                  <span className="text-destructive">*</span>
                )}
              </Label>
              <p className="text-xs text-muted-foreground">{param.description}</p>
              
              {param.type === 'boolean' ? (
                <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4">
                  <Switch 
                    id={param.name}
                    checked={!!formValues[param.name]}
                    onCheckedChange={(checked) => onValueChange(param.name, checked)}
                  />
                  <div>
                    <span className="text-sm font-medium text-foreground">
                      {formValues[param.name] ? 'Enabled' : 'Disabled'}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {param.description}
                    </p>
                  </div>
                </div>
              ) : param.type === 'select' && param.options ? (
                <select 
                  id={param.name}
                  value={(formValues[param.name] as string) || ''}
                  className={cn(
                    "w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground transition-colors",
                    hasError ? "border-destructive" : "border-border",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                  )}
                  onChange={(e) => onValueChange(param.name, e.target.value)}
                >
                  <option value="">Select {param.name.replace(/_/g, ' ')}</option>
                  {param.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <Input
                  id={param.name}
                  type={param.type === 'number' ? 'number' : 'text'}
                  placeholder={`Enter ${param.name.replace(/_/g, ' ')}`}
                  value={(formValues[param.name] as string) || ''}
                  className={cn(
                    "bg-background",
                    hasError && "border-destructive"
                  )}
                  onChange={(e) => onValueChange(param.name, e.target.value)}
                />
              )}

              {hasError && (
                <p className="flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="h-3 w-3" />
                  {errors[param.name]}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
