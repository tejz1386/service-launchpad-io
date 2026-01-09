import { Link } from 'react-router-dom';
import { ArrowRight, Box, Server, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Service } from '@/data/services';
import { Badge } from '@/components/ui/badge';

interface ServiceCardProps {
  service: Service;
  index: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  kubernetes: Box,
  server: Server,
  rocket: Rocket,
};

export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Box;

  return (
    <Link
      to={`/service/${service.id}`}
      className="group block"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300",
        "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
        "animate-slide-up"
      )}>
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        
        <div className="relative">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg",
              "bg-gradient-to-br from-primary/20 to-primary/5"
            )}>
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <Badge 
              variant={service.status === 'active' ? 'default' : 'secondary'}
              className={cn(
                "text-xs",
                service.status === 'active' && "bg-success/20 text-success hover:bg-success/30"
              )}
            >
              <span className={cn(
                "mr-1.5 inline-block h-1.5 w-1.5 rounded-full",
                service.status === 'active' ? "bg-success" : "bg-muted-foreground"
              )} />
              {service.status}
            </Badge>
          </div>

          {/* Content */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {service.name}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {service.description}
            </p>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {service.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted px-2 py-1 text-xs font-mono text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {service.tags.length > 3 && (
              <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                +{service.tags.length - 3}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-mono">{service.version}</span>
              <span>•</span>
              <span>{service.team}</span>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              <span>Configure</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
