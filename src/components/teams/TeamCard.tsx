import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Server, Cloud, Activity, DollarSign, Users, AlertTriangle, GitBranch } from 'lucide-react';
import { Team } from '@/data/teams';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Server,
  Cloud,
  Activity,
  DollarSign,
};

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  const Icon = iconMap[team.icon] || Server;
  const openIncidents = team.incidents.filter(i => i.status !== 'resolved').length;
  const criticalIncidents = team.incidents.filter(i => i.severity === 'critical' && i.status !== 'resolved').length;

  return (
    <Link to={`/teams/${team.id}`}>
      <Card className="group cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br", team.color)}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            {criticalIncidents > 0 && (
              <Badge variant="destructive" className="animate-pulse">
                <AlertTriangle className="mr-1 h-3 w-3" />
                {criticalIncidents} Critical
              </Badge>
            )}
          </div>

          {/* Title */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {team.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {team.description}
            </p>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground">
                <Users className="h-4 w-4" />
              </div>
              <p className="mt-1 text-lg font-semibold text-foreground">{team.members.length}</p>
              <p className="text-xs text-muted-foreground">Members</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground">
                <GitBranch className="h-4 w-4" />
              </div>
              <p className="mt-1 text-lg font-semibold text-foreground">{team.repositories.length}</p>
              <p className="text-xs text-muted-foreground">Repos</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <p className="mt-1 text-lg font-semibold text-foreground">{openIncidents}</p>
              <p className="text-xs text-muted-foreground">Incidents</p>
            </div>
          </div>

          {/* Team Members Preview */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex -space-x-2">
              {team.members.slice(0, 4).map((member) => (
                <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                  <AvatarFallback className="bg-primary/20 text-xs text-primary">
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
              ))}
              {team.members.length > 4 && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs text-muted-foreground">
                  +{team.members.length - 4}
                </div>
              )}
            </div>
            <Badge variant="outline" className="text-xs">
              {team.shortName}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
