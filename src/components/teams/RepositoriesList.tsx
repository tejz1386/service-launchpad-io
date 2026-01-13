import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GitBranch, ExternalLink, Clock } from 'lucide-react';
import { Repository } from '@/data/teams';

const languageColors: Record<string, string> = {
  HCL: 'bg-purple-500',
  YAML: 'bg-red-500',
  Python: 'bg-blue-500',
  Go: 'bg-cyan-500',
  TypeScript: 'bg-blue-600',
  JavaScript: 'bg-yellow-500',
  Markdown: 'bg-gray-500',
};

interface RepositoriesListProps {
  repositories: Repository[];
}

export function RepositoriesList({ repositories }: RepositoriesListProps) {
  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader>
        <CardTitle className="text-lg">Repositories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {repositories.map((repo, idx) => (
          <a
            key={idx}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-3 transition-all hover:border-primary/50 hover:bg-background"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-muted p-2 text-muted-foreground group-hover:text-primary">
                <GitBranch className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-sm font-medium text-foreground group-hover:text-primary">
                    {repo.name}
                  </p>
                  <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-muted-foreground">{repo.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className={`h-3 w-3 rounded-full ${languageColors[repo.language] || 'bg-gray-500'}`} />
                <span className="text-xs text-muted-foreground">{repo.language}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {repo.lastUpdated}
              </div>
            </div>
          </a>
        ))}
      </CardContent>
    </Card>
  );
}
