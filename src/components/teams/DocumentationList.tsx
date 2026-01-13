import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, BookOpen, Wrench, Shield, ExternalLink } from 'lucide-react';
import { Documentation } from '@/data/teams';

const typeConfig = {
  runbook: { icon: Wrench, color: 'text-orange-400', label: 'Runbook' },
  architecture: { icon: BookOpen, color: 'text-blue-400', label: 'Architecture' },
  onboarding: { icon: FileText, color: 'text-green-400', label: 'Onboarding' },
  policy: { icon: Shield, color: 'text-purple-400', label: 'Policy' },
};

interface DocumentationListProps {
  documentation: Documentation[];
}

export function DocumentationList({ documentation }: DocumentationListProps) {
  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader>
        <CardTitle className="text-lg">Documentation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {documentation.map((doc, idx) => {
          const config = typeConfig[doc.type];
          const Icon = config.icon;
          return (
            <a
              key={idx}
              href={doc.url}
              className="group flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-3 transition-all hover:border-primary/50 hover:bg-background"
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${config.color}`} />
                <span className="font-medium text-foreground group-hover:text-primary">
                  {doc.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {config.label}
                </Badge>
                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          );
        })}
      </CardContent>
    </Card>
  );
}
