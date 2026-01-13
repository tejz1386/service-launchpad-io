import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, ArrowDown } from 'lucide-react';
import { TeamMember } from '@/data/teams';

interface EscalationMatrixProps {
  members: TeamMember[];
}

export function EscalationMatrix({ members }: EscalationMatrixProps) {
  const sortedMembers = [...members].sort((a, b) => a.escalationLevel - b.escalationLevel);
  const groupedByLevel = sortedMembers.reduce((acc, member) => {
    const level = member.escalationLevel;
    if (!acc[level]) acc[level] = [];
    acc[level].push(member);
    return acc;
  }, {} as Record<number, TeamMember[]>);

  const levels = Object.keys(groupedByLevel).map(Number).sort();

  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader>
        <CardTitle className="text-lg">Escalation Matrix</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {levels.map((level, idx) => (
          <div key={level}>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant={level === 1 ? "destructive" : level === 2 ? "default" : "secondary"}>
                Level {level}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {level === 1 ? 'Primary Contact' : level === 2 ? 'Secondary Contact' : 'Team Member'}
              </span>
            </div>
            <div className="grid gap-3">
              {groupedByLevel[level].map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="rounded-full p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                    )}
                    <a
                      href={`mailto:${member.email}`}
                      className="rounded-full p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            {idx < levels.length - 1 && (
              <div className="flex justify-center py-2">
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
