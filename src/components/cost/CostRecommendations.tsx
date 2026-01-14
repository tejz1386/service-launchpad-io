import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  Trash2, 
  Minimize2, 
  Calendar, 
  Clock, 
  Zap,
  ArrowDownRight,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { CostRecommendation, getRecommendationTypeLabel } from '@/data/costInsights';
import { cn } from '@/lib/utils';

interface CostRecommendationsProps {
  recommendations: CostRecommendation[];
  showApplicationName?: boolean;
  applicationNames?: Record<string, string>;
}

const getTypeIcon = (type: CostRecommendation['type']) => {
  switch (type) {
    case 'resize':
      return <Minimize2 className="h-4 w-4" />;
    case 'delete':
      return <Trash2 className="h-4 w-4" />;
    case 'rightsize':
      return <ArrowDownRight className="h-4 w-4" />;
    case 'reserved':
      return <Calendar className="h-4 w-4" />;
    case 'spot':
      return <Zap className="h-4 w-4" />;
    case 'schedule':
      return <Clock className="h-4 w-4" />;
  }
};

const getImpactColor = (impact: CostRecommendation['impact']) => {
  switch (impact) {
    case 'high':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'medium':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'low':
      return 'bg-muted text-muted-foreground';
  }
};

const getStatusIcon = (status: CostRecommendation['status']) => {
  switch (status) {
    case 'implemented':
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case 'approved':
      return <AlertCircle className="h-4 w-4 text-blue-500" />;
    case 'dismissed':
      return <XCircle className="h-4 w-4 text-muted-foreground" />;
    default:
      return null;
  }
};

export function CostRecommendations({ 
  recommendations, 
  showApplicationName = false,
  applicationNames = {}
}: CostRecommendationsProps) {
  const pendingRecs = recommendations.filter((r) => r.status === 'pending');
  const otherRecs = recommendations.filter((r) => r.status !== 'pending');

  const totalPotentialSavings = pendingRecs.reduce((sum, r) => sum + r.monthlySavings, 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Cost Optimization Recommendations
          </CardTitle>
          {pendingRecs.length > 0 && (
            <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
              ${totalPotentialSavings.toLocaleString()}/mo potential savings
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {recommendations.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No recommendations at this time. Great job optimizing your resources!
          </p>
        ) : (
          <div className="space-y-4">
            {/* Pending Recommendations */}
            {pendingRecs.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Action Required ({pendingRecs.length})
                </h4>
                {pendingRecs.map((rec) => (
                  <div
                    key={rec.id}
                    className="flex items-start gap-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {getTypeIcon(rec.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium">{rec.resource}</p>
                          <p className="text-sm text-muted-foreground">
                            {rec.resourceType} • {rec.cloud}
                            {showApplicationName && applicationNames[rec.applicationId] && (
                              <> • {applicationNames[rec.applicationId]}</>
                            )}
                          </p>
                        </div>
                        <Badge className={cn('ml-auto', getImpactColor(rec.impact))}>
                          {rec.impact} impact
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                      <div className="flex items-center gap-4 pt-2">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Current: </span>
                          <span className="font-medium">${rec.currentCost.toLocaleString()}/mo</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Projected: </span>
                          <span className="font-medium text-green-600">
                            ${rec.projectedCost.toLocaleString()}/mo
                          </span>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                          Save ${rec.monthlySavings.toLocaleString()}/mo
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm">Approve</Button>
                      <Button size="sm" variant="outline">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Other Recommendations */}
            {otherRecs.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Recent Actions ({otherRecs.length})
                </h4>
                {otherRecs.slice(0, 3).map((rec) => (
                  <div
                    key={rec.id}
                    className="flex items-center gap-4 rounded-lg border p-3 opacity-75"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      {getTypeIcon(rec.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{rec.resource}</p>
                        {getStatusIcon(rec.status)}
                        <Badge variant="outline" className="text-xs">
                          {rec.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {getRecommendationTypeLabel(rec.type)} • ${rec.monthlySavings.toLocaleString()}/mo
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
