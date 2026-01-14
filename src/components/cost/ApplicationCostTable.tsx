import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Application, getFinOpsScoreColor, getFinOpsScoreLabel } from '@/data/costInsights';
import { ArrowUpRight, ArrowDownRight, ExternalLink, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApplicationCostTableProps {
  applications: Application[];
  onSelectApplication?: (appId: string) => void;
}

export function ApplicationCostTable({ applications, onSelectApplication }: ApplicationCostTableProps) {
  const totalCost = applications.reduce((sum, app) => sum + app.currentMonthCost, 0);
  const avgScore = Math.round(
    applications.reduce((sum, app) => sum + app.finOpsScore, 0) / applications.length
  );
  const totalPendingRecs = applications.reduce(
    (sum, app) => sum + app.recommendations.filter((r) => r.status === 'pending').length,
    0
  );

  const getCostTrend = (app: Application) => {
    const costs = app.costTrend.filter((c) => c.actual !== undefined);
    if (costs.length < 2) return 0;
    const first = costs[0].actual!;
    const last = costs[costs.length - 1].actual!;
    return Math.round(((last - first) / first) * 100);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Layers className="h-5 w-5 text-primary" />
            Applications Overview
          </CardTitle>
          <div className="flex gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total Spend: </span>
              <span className="font-semibold">${totalCost.toLocaleString()}/mo</span>
            </div>
            <div>
              <span className="text-muted-foreground">Avg Score: </span>
              <span className={cn('font-semibold', getFinOpsScoreColor(avgScore))}>{avgScore}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Pending: </span>
              <span className="font-semibold">{totalPendingRecs} recommendations</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application</TableHead>
              <TableHead>Environment</TableHead>
              <TableHead className="text-right">Monthly Cost</TableHead>
              <TableHead className="text-right">Trend</TableHead>
              <TableHead className="text-center">FinOps Score</TableHead>
              <TableHead className="text-right">Pending Savings</TableHead>
              <TableHead className="text-right">Realized (3mo)</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => {
              const trend = getCostTrend(app);
              const pendingRecs = app.recommendations.filter((r) => r.status === 'pending');
              const pendingSavings = pendingRecs.reduce((sum, r) => sum + r.monthlySavings, 0);

              return (
                <TableRow key={app.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <p className="font-medium">{app.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {pendingRecs.length} recommendation{pendingRecs.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        app.environment === 'production' && 'border-green-500 text-green-600',
                        app.environment === 'staging' && 'border-yellow-500 text-yellow-600',
                        app.environment === 'development' && 'border-blue-500 text-blue-600'
                      )}
                    >
                      {app.environment}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${app.currentMonthCost.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <span className={trend >= 0 ? 'text-red-500' : 'text-green-500'}>
                        {trend >= 0 ? '+' : ''}{trend}%
                      </span>
                      {trend >= 0 ? (
                        <ArrowUpRight className="h-4 w-4 text-red-500" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col items-center gap-1">
                      <span className={cn('font-semibold', getFinOpsScoreColor(app.finOpsScore))}>
                        {app.finOpsScore}
                      </span>
                      <Progress 
                        value={app.finOpsScore} 
                        className="h-1.5 w-16"
                      />
                      <span className="text-[10px] text-muted-foreground">
                        {getFinOpsScoreLabel(app.finOpsScore)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {pendingSavings > 0 ? (
                      <span className="text-green-600 font-medium">
                        ${pendingSavings.toLocaleString()}/mo
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-green-600 font-medium">
                      ${app.realizedSavingsLast3Months.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onSelectApplication?.(app.id)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
