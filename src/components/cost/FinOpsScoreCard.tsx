import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus, Award, Target, Zap, DollarSign } from 'lucide-react';
import { getFinOpsScoreColor, getFinOpsScoreLabel } from '@/data/costInsights';
import { cn } from '@/lib/utils';

interface FinOpsScoreCardProps {
  score: number;
  approvedSavings: number;
  realizedSavings: number;
  pendingRecommendations: number;
  totalPotentialSavings: number;
}

export function FinOpsScoreCard({
  score,
  approvedSavings,
  realizedSavings,
  pendingRecommendations,
  totalPotentialSavings,
}: FinOpsScoreCardProps) {
  const scoreColor = getFinOpsScoreColor(score);
  const scoreLabel = getFinOpsScoreLabel(score);
  
  const savingsEfficiency = approvedSavings > 0 
    ? Math.round((realizedSavings / approvedSavings) * 100) 
    : 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Award className="h-5 w-5 text-primary" />
          FinOps Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Score */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <svg className="h-24 w-24 -rotate-90 transform">
              <circle
                cx="48"
                cy="48"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-muted"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={`${score * 2.51} 251`}
                className={cn(scoreColor)}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={cn('text-2xl font-bold', scoreColor)}>{score}</span>
            </div>
          </div>
          <div>
            <p className={cn('text-lg font-semibold', scoreColor)}>{scoreLabel}</p>
            <p className="text-sm text-muted-foreground">
              Based on resource utilization, cost optimization, and savings realization
            </p>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="h-4 w-4" />
              Pending Recommendations
            </div>
            <p className="text-xl font-semibold">{pendingRecommendations}</p>
            <p className="text-sm text-muted-foreground">
              ${totalPotentialSavings.toLocaleString()}/mo potential
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4" />
              Savings Efficiency
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xl font-semibold">{savingsEfficiency}%</p>
              {savingsEfficiency >= 80 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : savingsEfficiency >= 50 ? (
                <Minus className="h-4 w-4 text-yellow-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
            </div>
            <Progress value={savingsEfficiency} className="h-2" />
          </div>
        </div>

        {/* Savings Summary */}
        <div className="rounded-lg bg-muted/50 p-4">
          <div className="flex items-center gap-2 text-sm font-medium mb-3">
            <DollarSign className="h-4 w-4 text-green-500" />
            Last 3 Months Savings
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Approved</p>
              <p className="text-lg font-semibold text-foreground">
                ${approvedSavings.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Realized</p>
              <p className="text-lg font-semibold text-green-600">
                ${realizedSavings.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
