import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FileText,
  BookOpen,
  Wrench,
  Shield,
  ExternalLink,
  Tag,
  Package,
  Users,
  Clock,
} from 'lucide-react';
import { Documentation } from '@/data/teams';
import { catalogComponents } from '@/data/catalog';

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
  const [topicFilter, setTopicFilter] = useState<string>('all');
  const [catalogFilter, setCatalogFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const allTopics = useMemo(() => {
    const set = new Set<string>();
    documentation.forEach((d) => d.topics?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [documentation]);

  const allCatalogRefs = useMemo(() => {
    const set = new Set<string>();
    documentation.forEach((d) => d.catalogRefs?.forEach((c) => set.add(c)));
    return Array.from(set);
  }, [documentation]);

  const catalogNameById = useMemo(() => {
    const map: Record<string, string> = {};
    catalogComponents.forEach((c) => (map[c.id] = c.name));
    return map;
  }, []);

  const filtered = documentation.filter((d) => {
    if (topicFilter !== 'all' && !d.topics?.includes(topicFilter)) return false;
    if (catalogFilter !== 'all' && !d.catalogRefs?.includes(catalogFilter)) return false;
    if (typeFilter !== 'all' && d.type !== typeFilter) return false;
    return true;
  });

  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Documentation</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {filtered.length} of {documentation.length}
          </Badge>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="h-9 text-xs">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="runbook">Runbook</SelectItem>
              <SelectItem value="architecture">Architecture</SelectItem>
              <SelectItem value="onboarding">Onboarding</SelectItem>
              <SelectItem value="policy">Policy</SelectItem>
            </SelectContent>
          </Select>
          <Select value={topicFilter} onValueChange={setTopicFilter}>
            <SelectTrigger className="h-9 text-xs">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All topics</SelectItem>
              {allTopics.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={catalogFilter} onValueChange={setCatalogFilter}>
            <SelectTrigger className="h-9 text-xs">
              <SelectValue placeholder="Catalog component" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All catalog items</SelectItem>
              {allCatalogRefs.map((id) => (
                <SelectItem key={id} value={id}>
                  {catalogNameById[id] || id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {filtered.length === 0 && (
          <div className="rounded-lg border border-dashed border-border/50 p-6 text-center text-sm text-muted-foreground">
            No documents match the selected filters.
          </div>
        )}
        {filtered.map((doc, idx) => {
          const config = typeConfig[doc.type];
          const Icon = config.icon;
          return (
            <a
              key={idx}
              href={doc.url}
              className="group block rounded-lg border border-border/50 bg-background/50 p-4 transition-all hover:border-primary/50 hover:bg-background"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <Icon className={`mt-0.5 h-5 w-5 ${config.color}`} />
                  <div className="space-y-1">
                    <div className="font-medium text-foreground group-hover:text-primary">
                      {doc.title}
                    </div>
                    {doc.summary && (
                      <p className="text-xs text-muted-foreground">{doc.summary}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="secondary" className="text-xs">
                    {config.label}
                  </Badge>
                  <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </div>

              {(doc.team || doc.author || doc.updatedAt) && (
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  {doc.team && (
                    <span className="inline-flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {doc.team}
                    </span>
                  )}
                  {doc.author && <span>by {doc.author}</span>}
                  {doc.updatedAt && (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Updated {doc.updatedAt}
                    </span>
                  )}
                </div>
              )}

              {(doc.topics?.length || doc.catalogRefs?.length) ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {doc.topics?.map((t) => (
                    <Badge
                      key={`topic-${t}`}
                      variant="outline"
                      className="gap-1 text-[10px] font-normal"
                    >
                      <Tag className="h-2.5 w-2.5" />
                      {t}
                    </Badge>
                  ))}
                  {doc.catalogRefs?.map((id) => (
                    <Badge
                      key={`cat-${id}`}
                      variant="outline"
                      className="gap-1 border-primary/40 text-[10px] font-normal text-primary"
                    >
                      <Package className="h-2.5 w-2.5" />
                      {catalogNameById[id] || id}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </a>
          );
        })}
      </CardContent>
    </Card>
  );
}
