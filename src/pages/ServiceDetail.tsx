import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ExternalLink, 
  Clock, 
  Users, 
  GitBranch, 
  CheckCircle2,
  AlertCircle,
  Play,
  Copy,
  Box,
  Server,
  Rocket
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { getServiceById } from '@/data/services';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  kubernetes: Box,
  server: Server,
  rocket: Rocket,
};

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const service = getServiceById(id || '');
  const { toast } = useToast();
  const [formValues, setFormValues] = useState<Record<string, string | boolean>>({});

  if (!service) {
    return (
      <AppLayout>
        <div className="flex h-[50vh] items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">Service not found</h2>
            <p className="mt-2 text-muted-foreground">The service you're looking for doesn't exist.</p>
            <Link to="/">
              <Button className="mt-4">Back to Catalog</Button>
            </Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  const Icon = iconMap[service.icon] || Box;

  const handleSubmit = () => {
    toast({
      title: "Request Submitted",
      description: `Your ${service.name} request has been submitted for provisioning.`,
    });
  };

  return (
    <AppLayout>
      <div className="px-8 py-8">
        {/* Breadcrumb */}
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Catalog
        </Link>

        {/* Header */}
        <div className="mt-6 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">{service.name}</h1>
                <Badge 
                  className={cn(
                    "text-xs",
                    service.status === 'active' 
                      ? "bg-success/20 text-success hover:bg-success/30" 
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <span className={cn(
                    "mr-1.5 inline-block h-1.5 w-1.5 rounded-full",
                    service.status === 'active' ? "bg-success" : "bg-muted-foreground"
                  )} />
                  {service.status}
                </Badge>
              </div>
              <p className="mt-1 text-muted-foreground">{service.description}</p>
              <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {service.team}
                </span>
                <span className="flex items-center gap-1">
                  <GitBranch className="h-4 w-4" />
                  v{service.version}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {service.estimatedTime}
                </span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Documentation
          </Button>
        </div>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted px-2.5 py-1 text-xs font-mono text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Features */}
            <section className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground">Features</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Configuration Form */}
            <section className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground">Configuration</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill in the required parameters to provision this service
              </p>
              
              <div className="mt-6 space-y-6">
                {service.parameters.map((param) => (
                  <div key={param.name}>
                    <Label htmlFor={param.name} className="flex items-center gap-2">
                      {param.name.replace(/_/g, ' ')}
                      {param.required && (
                        <span className="text-destructive">*</span>
                      )}
                    </Label>
                    <p className="mt-0.5 text-xs text-muted-foreground">{param.description}</p>
                    
                    {param.type === 'boolean' ? (
                      <div className="mt-2 flex items-center gap-2">
                        <Switch 
                          id={param.name}
                          checked={!!formValues[param.name]}
                          onCheckedChange={(checked) => 
                            setFormValues(prev => ({ ...prev, [param.name]: checked }))
                          }
                        />
                        <span className="text-sm text-muted-foreground">
                          {formValues[param.name] ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    ) : param.type === 'select' && param.options ? (
                      <select 
                        id={param.name}
                        className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
                        onChange={(e) => 
                          setFormValues(prev => ({ ...prev, [param.name]: e.target.value }))
                        }
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
                        className="mt-2 bg-background"
                        onChange={(e) => 
                          setFormValues(prev => ({ ...prev, [param.name]: e.target.value }))
                        }
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Button onClick={handleSubmit} className="gap-2">
                  <Play className="h-4 w-4" />
                  Submit Request
                </Button>
                <Button variant="outline" className="gap-2">
                  <Copy className="h-4 w-4" />
                  Save as Template
                </Button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Prerequisites */}
            <section className="rounded-xl border border-border bg-card p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <AlertCircle className="h-4 w-4 text-warning" />
                Prerequisites
              </h3>
              <ul className="mt-4 space-y-3">
                {service.prerequisites.map((prereq, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground" />
                    <span className="text-muted-foreground">{prereq}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Metadata */}
            <section className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground">Service Info</h3>
              <dl className="mt-4 space-y-3">
                {[
                  { label: 'Owner', value: service.owner },
                  { label: 'Team', value: service.team },
                  { label: 'Category', value: service.category },
                  { label: 'Version', value: service.version },
                  { label: 'Last Updated', value: service.lastUpdated },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <dt className="text-sm text-muted-foreground">{item.label}</dt>
                    <dd className="text-sm font-mono text-foreground">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Recent Activity */}
            <section className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground">Recent Requests</h3>
              <ul className="mt-4 space-y-3">
                {[
                  { user: 'alice@company.com', time: '2 hours ago', status: 'completed' },
                  { user: 'bob@company.com', time: '5 hours ago', status: 'completed' },
                  { user: 'carol@company.com', time: '1 day ago', status: 'completed' },
                ].map((activity, index) => (
                  <li key={index} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{activity.user}</span>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
