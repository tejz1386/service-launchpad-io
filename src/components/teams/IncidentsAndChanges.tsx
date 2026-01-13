import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Clock, CheckCircle, XCircle, Calendar, User } from 'lucide-react';
import { Incident, Change } from '@/data/teams';
import { format, parseISO } from 'date-fns';

const severityColors = {
  critical: 'bg-red-500/20 text-red-400 border-red-500/30',
  high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

const incidentStatusIcons = {
  open: Clock,
  investigating: AlertTriangle,
  resolved: CheckCircle,
};

const changeStatusColors = {
  scheduled: 'bg-blue-500/20 text-blue-400',
  'in-progress': 'bg-yellow-500/20 text-yellow-400',
  completed: 'bg-green-500/20 text-green-400',
  cancelled: 'bg-red-500/20 text-red-400',
};

const changeTypeColors = {
  standard: 'bg-green-500/20 text-green-400',
  normal: 'bg-blue-500/20 text-blue-400',
  emergency: 'bg-red-500/20 text-red-400',
};

interface IncidentsAndChangesProps {
  incidents: Incident[];
  changes: Change[];
}

export function IncidentsAndChanges({ incidents, changes }: IncidentsAndChangesProps) {
  const openIncidents = incidents.filter(i => i.status !== 'resolved');

  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader>
        <CardTitle className="text-lg">Incidents & Changes</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="incidents" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="incidents" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Incidents
              {openIncidents.length > 0 && (
                <Badge variant="destructive" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                  {openIncidents.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="changes" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Changes
              <Badge variant="secondary" className="ml-1 text-xs">
                {changes.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="incidents" className="mt-4 space-y-3">
            {incidents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <CheckCircle className="h-12 w-12 mb-2 text-green-400" />
                <p>No open incidents</p>
              </div>
            ) : (
              incidents.map((incident) => {
                const StatusIcon = incidentStatusIcons[incident.status];
                return (
                  <div
                    key={incident.id}
                    className="rounded-lg border border-border/50 bg-background/50 p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <StatusIcon className={`h-5 w-5 mt-0.5 ${
                          incident.status === 'resolved' ? 'text-green-400' : 
                          incident.severity === 'critical' ? 'text-red-400' : 'text-yellow-400'
                        }`} />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm text-muted-foreground">{incident.id}</span>
                            <Badge variant="outline" className={severityColors[incident.severity]}>
                              {incident.severity}
                            </Badge>
                          </div>
                          <p className="mt-1 font-medium text-foreground">{incident.title}</p>
                          <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {incident.assignee}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {format(parseISO(incident.createdAt), 'MMM d, HH:mm')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="capitalize">
                        {incident.status}
                      </Badge>
                    </div>
                  </div>
                );
              })
            )}
          </TabsContent>

          <TabsContent value="changes" className="mt-4 space-y-3">
            {changes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mb-2" />
                <p>No scheduled changes</p>
              </div>
            ) : (
              changes.map((change) => (
                <div
                  key={change.id}
                  className="rounded-lg border border-border/50 bg-background/50 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm text-muted-foreground">{change.id}</span>
                        <Badge variant="outline" className={changeTypeColors[change.type]}>
                          {change.type}
                        </Badge>
                      </div>
                      <p className="mt-1 font-medium text-foreground">{change.title}</p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {change.owner}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {change.scheduledDate}
                        </span>
                      </div>
                    </div>
                    <Badge variant="secondary" className={changeStatusColors[change.status]}>
                      {change.status}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
