import { useParams, Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Server, Cloud, Activity, DollarSign, Users, GitBranch, Shield, BookOpen } from 'lucide-react';
import { getTeamById } from '@/data/teams';
import { EscalationMatrix } from '@/components/teams/EscalationMatrix';
import { CloudAccountsTable } from '@/components/teams/CloudAccountsTable';
import { ADGroupsList } from '@/components/teams/ADGroupsList';
import { ServiceAccountsList } from '@/components/teams/ServiceAccountsList';
import { TrainingProgress } from '@/components/teams/TrainingProgress';
import { IncidentsAndChanges } from '@/components/teams/IncidentsAndChanges';
import { RepositoriesList } from '@/components/teams/RepositoriesList';
import { DocumentationList } from '@/components/teams/DocumentationList';
import { TeamCollaboration } from '@/components/teams/TeamCollaboration';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Server,
  Cloud,
  Activity,
  DollarSign,
};

export default function TeamDetail() {
  const { id } = useParams<{ id: string }>();
  const team = getTeamById(id || '');

  if (!team) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold text-foreground mb-4">Team Not Found</h1>
          <Link to="/teams">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Teams
            </Button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  const Icon = iconMap[team.icon] || Server;
  const openIncidents = team.incidents.filter(i => i.status !== 'resolved').length;

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Back Button */}
        <Link to="/teams">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Teams
          </Button>
        </Link>

        {/* Header */}
        <div className="flex items-start gap-6">
          <div className={cn("flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br", team.color)}>
            <Icon className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-foreground">{team.name}</h1>
              <Badge variant="outline" className="text-sm">{team.shortName}</Badge>
            </div>
            <p className="mt-2 text-muted-foreground max-w-2xl">{team.description}</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{team.members.length} members</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GitBranch className="h-4 w-4" />
                <span>{team.repositories.length} repositories</span>
              </div>
              {openIncidents > 0 && (
                <Badge variant="destructive">
                  {openIncidents} open incident{openIncidents > 1 ? 's' : ''}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-background/50 border border-border/50">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="cloud" className="flex items-center gap-2">
              <Cloud className="h-4 w-4" />
              Cloud Accounts
            </TabsTrigger>
            <TabsTrigger value="access" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Access & Security
            </TabsTrigger>
            <TabsTrigger value="onboarding" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              New Joiner
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <EscalationMatrix members={team.members} />
              <TeamCollaboration 
                slackChannel={team.slackChannel} 
                onCallRotation={team.onCallRotation}
                memberCount={team.members.length}
              />
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <RepositoriesList repositories={team.repositories} />
              <DocumentationList documentation={team.documentation} />
            </div>
            <IncidentsAndChanges incidents={team.incidents} changes={team.changes} />
          </TabsContent>

          <TabsContent value="cloud" className="mt-6">
            <CloudAccountsTable accounts={team.cloudAccounts} />
          </TabsContent>

          <TabsContent value="access" className="mt-6 space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <ADGroupsList groups={team.adGroups} />
              <ServiceAccountsList accounts={team.serviceAccounts} />
            </div>
          </TabsContent>

          <TabsContent value="onboarding" className="mt-6">
            <TrainingProgress trainings={team.trainings} />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
