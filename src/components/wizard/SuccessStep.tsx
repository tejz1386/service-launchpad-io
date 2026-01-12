import { CheckCircle2, ExternalLink, FileText, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface SuccessStepProps {
  serviceName: string;
  requestId: string;
}

export function SuccessStep({ serviceName, requestId }: SuccessStepProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      {/* Success Icon */}
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-success/20" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-success/20">
          <CheckCircle2 className="h-10 w-10 text-success" />
        </div>
      </div>

      {/* Success Message */}
      <h3 className="mt-6 text-xl font-semibold text-foreground">
        Request Submitted Successfully!
      </h3>
      <p className="mt-2 max-w-md text-muted-foreground">
        Your {serviceName} request has been submitted and is now being processed.
      </p>

      {/* Request ID */}
      <div className="mt-6 rounded-lg border border-border bg-muted/30 px-4 py-3">
        <p className="text-xs text-muted-foreground">Request ID</p>
        <p className="font-mono text-sm text-foreground">{requestId}</p>
      </div>

      {/* Status Info */}
      <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          Processing
        </span>
        <span className="flex items-center gap-1">
          <div className="h-2 w-2 animate-pulse rounded-full bg-warning" />
          In Progress
        </span>
      </div>

      {/* Next Steps */}
      <div className="mt-8 w-full max-w-md rounded-xl border border-border bg-card p-6 text-left">
        <h4 className="font-semibold text-foreground">What happens next?</h4>
        <ul className="mt-4 space-y-3">
          {[
            'Your request is being validated by the automation system',
            'Infrastructure will be provisioned according to your specifications',
            'You will receive a notification when the process is complete',
            'Access credentials will be shared via secure channel',
          ].map((step, index) => (
            <li key={index} className="flex items-start gap-3 text-sm">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                {index + 1}
              </span>
              <span className="text-muted-foreground">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link to="/">
          <Button variant="outline" className="gap-2">
            <ArrowRight className="h-4 w-4" />
            Back to Catalog
          </Button>
        </Link>
        <Button variant="outline" className="gap-2">
          <FileText className="h-4 w-4" />
          View Request Details
        </Button>
        <Button variant="outline" className="gap-2">
          <ExternalLink className="h-4 w-4" />
          Track Progress
        </Button>
      </div>
    </div>
  );
}
