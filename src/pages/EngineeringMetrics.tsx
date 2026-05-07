import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import {
  Activity,
  GitPullRequest,
  GitMerge,
  Rocket,
  Timer,
  AlertTriangle,
  TrendingUp,
  Package,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RTooltip,
  Legend,
} from 'recharts';
import {
  teamEngineeringMetrics,
  serviceEngineeringMetrics,
  DoraRating,
} from '@/data/engineeringMetrics';
import { cn } from '@/lib/utils';

const ratingColor: Record<DoraRating, string> = {
  Elite: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  High: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
  Medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Low: 'bg-red-500/15 text-red-400 border-red-500/30',
};

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="border-border/50 bg-card/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
            {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
          </div>
          <Icon className="h-8 w-8 text-primary/60" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function EngineeringMetrics() {
  const [selectedTeamId, setSelectedTeamId] = useState(teamEngineeringMetrics[0].teamId);
  const team = teamEngineeringMetrics.find((t) => t.teamId === selectedTeamId)!;

  const totalDeploys = teamEngineeringMetrics.reduce(
    (acc, t) => acc + t.delivery.successfulDeployments + t.delivery.failedDeployments,
    0,
  );
  const totalOpenPRs = teamEngineeringMetrics.reduce((acc, t) => acc + t.delivery.openPRs, 0);
  const totalReleases = teamEngineeringMetrics.reduce((acc, t) => acc + t.delivery.releasesLast30d, 0);
  const avgCFR =
    teamEngineeringMetrics.reduce((acc, t) => acc + t.dora.changeFailureRate, 0) /
    teamEngineeringMetrics.length;

  const orgTrend = teamEngineeringMetrics[0].trend.map((_, i) => {
    const week = teamEngineeringMetrics[0].trend[i].week;
    return {
      week,
      deployments: teamEngineeringMetrics.reduce((a, t) => a + t.trend[i].deployments, 0),
      prs: teamEngineeringMetrics.reduce((a, t) => a + t.trend[i].prs, 0),
      failures: teamEngineeringMetrics.reduce((a, t) => a + t.trend[i].failures, 0),
    };
  });

  return (
    <AppLayout>
      <div className="space-y-8 p-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Engineering Metrics</h1>
          <p className="mt-2 text-muted-foreground">
            DORA metrics, pull request activity and release cadence across teams and self-service offerings.
          </p>
        </div>

        {/* Org-level summary */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Deployments / 30d" value={totalDeploys} hint="All teams" icon={Rocket} />
          <StatCard label="Open PRs" value={totalOpenPRs} hint="Across all repos" icon={GitPullRequest} />
          <StatCard label="Releases / 30d" value={totalReleases} hint="Production" icon={Package} />
          <StatCard
            label="Avg Change Failure Rate"
            value={`${avgCFR.toFixed(1)}%`}
            hint="Org-wide DORA"
            icon={AlertTriangle}
          />
        </div>

        <Tabs defaultValue="teams" className="w-full">
          <TabsList className="bg-background/50 border border-border/50">
            <TabsTrigger value="teams">By Team</TabsTrigger>
            <TabsTrigger value="services">By Self-Service Offering</TabsTrigger>
            <TabsTrigger value="org">Org Trends</TabsTrigger>
          </TabsList>

          {/* TEAM TAB */}
          <TabsContent value="teams" className="mt-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Team:</span>
              <Select value={selectedTeamId} onValueChange={setSelectedTeamId}>
                <SelectTrigger className="w-72">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {teamEngineeringMetrics.map((t) => (
                    <SelectItem key={t.teamId} value={t.teamId}>
                      {t.teamName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Badge className={cn('border', ratingColor[team.dora.rating])}>
                DORA: {team.dora.rating} performer
              </Badge>
            </div>

            {/* DORA core */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                label="Deployment Frequency"
                value={team.dora.deploymentFrequency}
                hint={`${team.dora.deploymentFrequencyPerWeek}/week`}
                icon={Rocket}
              />
              <StatCard
                label="Lead Time for Changes"
                value={team.dora.leadTimeForChanges}
                hint="Commit → production"
                icon={Timer}
              />
              <StatCard
                label="Change Failure Rate"
                value={`${team.dora.changeFailureRate}%`}
                hint="Failed / total deploys"
                icon={AlertTriangle}
              />
              <StatCard
                label="MTTR"
                value={`${team.dora.meanTimeToRestoreHours}h`}
                hint="Mean time to restore"
                icon={Activity}
              />
            </div>

            {/* Delivery details */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitPullRequest className="h-5 w-5 text-primary" />
                    Pull Requests & Releases
                  </CardTitle>
                  <CardDescription>Last 30 days for {team.teamName}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: 'Open PRs', value: team.delivery.openPRs, icon: GitPullRequest },
                    { label: 'Merged PRs (30d)', value: team.delivery.mergedPRsLast30d, icon: GitMerge },
                    { label: 'Avg PR Review Time', value: `${team.delivery.avgPRReviewHours}h`, icon: Timer },
                    { label: 'Releases (30d)', value: team.delivery.releasesLast30d, icon: Package },
                    { label: 'Release Frequency', value: team.delivery.releaseFrequency, icon: TrendingUp },
                    { label: 'Hotfixes (30d)', value: team.delivery.hotfixesLast30d, icon: AlertTriangle },
                    { label: 'Rollbacks (30d)', value: team.delivery.rollbacksLast30d, icon: AlertTriangle },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between border-b border-border/30 pb-2 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <row.icon className="h-4 w-4" />
                        {row.label}
                      </div>
                      <span className="font-semibold text-foreground">{row.value}</span>
                    </div>
                  ))}
                  <div className="pt-2">
                    <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                      <span>Deployment Success Rate</span>
                      <span>
                        {(
                          (team.delivery.successfulDeployments /
                            (team.delivery.successfulDeployments + team.delivery.failedDeployments)) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (team.delivery.successfulDeployments /
                          (team.delivery.successfulDeployments + team.delivery.failedDeployments)) *
                        100
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle>4-Week Trend</CardTitle>
                  <CardDescription>Deployments, PRs and failures</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={team.trend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <RTooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: 8,
                        }}
                      />
                      <Legend />
                      <Bar dataKey="deployments" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="prs" fill="hsl(var(--chart-2, 200 80% 60%))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="failures" fill="hsl(0 80% 60%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* All-team comparison */}
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>Cross-Team Comparison</CardTitle>
                <CardDescription>DORA metrics across all engineering teams</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Deploy Freq</TableHead>
                      <TableHead>Lead Time</TableHead>
                      <TableHead>CFR</TableHead>
                      <TableHead>MTTR</TableHead>
                      <TableHead>Open PRs</TableHead>
                      <TableHead>Releases (30d)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamEngineeringMetrics.map((t) => (
                      <TableRow key={t.teamId}>
                        <TableCell className="font-medium">{t.teamName}</TableCell>
                        <TableCell>
                          <Badge className={cn('border', ratingColor[t.dora.rating])}>{t.dora.rating}</Badge>
                        </TableCell>
                        <TableCell>{t.dora.deploymentFrequency}</TableCell>
                        <TableCell>{t.dora.leadTimeForChanges}</TableCell>
                        <TableCell>{t.dora.changeFailureRate}%</TableCell>
                        <TableCell>{t.dora.meanTimeToRestoreHours}h</TableCell>
                        <TableCell>{t.delivery.openPRs}</TableCell>
                        <TableCell>{t.delivery.releasesLast30d}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SERVICES TAB */}
          <TabsContent value="services" className="mt-6 space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {serviceEngineeringMetrics.map((s) => (
                <Card key={s.serviceId} className="border-border/50 bg-card/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{s.serviceName}</CardTitle>
                        <CardDescription className="mt-1">{s.ownerTeam}</CardDescription>
                      </div>
                      <Badge variant="outline">{s.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Provisions (30d)</span>
                      <span className="font-semibold">{s.provisionsLast30d}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total provisions</span>
                      <span className="font-semibold">{s.totalProvisions.toLocaleString()}</span>
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="text-muted-foreground">Success rate</span>
                        <span>{s.successRate}%</span>
                      </div>
                      <Progress value={s.successRate} />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg duration</span>
                      <span>{s.avgProvisionMinutes} min</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>Self-Service Offerings — Engineering Metrics</CardTitle>
                <CardDescription>
                  PR activity, releases and deployment cadence per catalog offering
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Open PRs</TableHead>
                      <TableHead>Merged PRs (30d)</TableHead>
                      <TableHead>Releases (30d)</TableHead>
                      <TableHead>Deploy Freq</TableHead>
                      <TableHead>CFR</TableHead>
                      <TableHead>Last Released</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {serviceEngineeringMetrics.map((s) => (
                      <TableRow key={s.serviceId}>
                        <TableCell className="font-medium">{s.serviceName}</TableCell>
                        <TableCell className="text-muted-foreground">{s.ownerTeam}</TableCell>
                        <TableCell>{s.openPRs}</TableCell>
                        <TableCell>{s.mergedPRsLast30d}</TableCell>
                        <TableCell>{s.releasesLast30d}</TableCell>
                        <TableCell>{s.deploymentFrequency}</TableCell>
                        <TableCell>{s.changeFailureRate}%</TableCell>
                        <TableCell>{s.lastReleased}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ORG TRENDS TAB */}
          <TabsContent value="org" className="mt-6 space-y-6">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>Organization Delivery Trend</CardTitle>
                <CardDescription>Aggregated weekly deployments, PRs and failed deploys</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={360}>
                  <LineChart data={orgTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <RTooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 8,
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="deployments" stroke="hsl(var(--primary))" strokeWidth={2} />
                    <Line type="monotone" dataKey="prs" stroke="hsl(200 80% 60%)" strokeWidth={2} />
                    <Line type="monotone" dataKey="failures" stroke="hsl(0 80% 60%)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {teamEngineeringMetrics.map((t) => (
                <Card key={t.teamId} className="border-border/50 bg-card/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{t.teamName}</CardTitle>
                      <Badge className={cn('border', ratingColor[t.dora.rating])}>{t.dora.rating}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deploys</span>
                      <span>{t.dora.deploymentFrequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lead time</span>
                      <span>{t.dora.leadTimeForChanges}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CFR</span>
                      <span>{t.dora.changeFailureRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Open PRs</span>
                      <span>{t.delivery.openPRs}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
