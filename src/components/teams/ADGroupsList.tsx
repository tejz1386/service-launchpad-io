import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, UserCheck } from 'lucide-react';
import { ADGroup } from '@/data/teams';

const typeIcons = {
  security: Shield,
  distribution: Users,
  role: UserCheck,
};

const typeColors = {
  security: 'text-red-400',
  distribution: 'text-blue-400',
  role: 'text-purple-400',
};

interface ADGroupsListProps {
  groups: ADGroup[];
}

export function ADGroupsList({ groups }: ADGroupsListProps) {
  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader>
        <CardTitle className="text-lg">Active Directory Groups</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {groups.map((group, idx) => {
          const Icon = typeIcons[group.type];
          return (
            <div
              key={idx}
              className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-3"
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-lg bg-muted p-2 ${typeColors[group.type]}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-mono text-sm font-medium text-foreground">{group.name}</p>
                  <p className="text-xs text-muted-foreground">{group.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {group.memberCount} members
                </Badge>
                <Badge variant="outline" className="text-xs capitalize">
                  {group.type}
                </Badge>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
