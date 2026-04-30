import { useMemo } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { DocumentationList } from '@/components/teams/DocumentationList';
import { teams } from '@/data/teams';
import { BookOpen } from 'lucide-react';

export default function DocumentationPage() {
  const allDocs = useMemo(
    () =>
      teams.flatMap((t) =>
        t.documentation.map((d) => ({ ...d, team: d.team || t.name }))
      ),
    []
  );

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Documentation</h1>
          </div>
          <p className="text-muted-foreground">
            Browse runbooks, architectures, onboarding guides and policies across all teams.
            Filter by type, topic or catalog component.
          </p>
        </div>

        <DocumentationList documentation={allDocs} />
      </div>
    </AppLayout>
  );
}
