import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, TrendingDown, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface CostSummaryCardsProps {
  totalSpend: number;
  potentialSavings: number;
  pendingRecommendations: number;
  realizedSavings: number;
}

export function CostSummaryCards({
  totalSpend,
  potentialSavings,
  pendingRecommendations,
  realizedSavings,
}: CostSummaryCardsProps) {
  const cards = [
    {
      title: 'Total Monthly Spend',
      value: `$${totalSpend.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Potential Savings',
      value: `$${potentialSavings.toLocaleString()}/mo`,
      icon: TrendingDown,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      title: 'Pending Recommendations',
      value: pendingRecommendations.toString(),
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
    {
      title: 'Realized Savings (3mo)',
      value: `$${realizedSavings.toLocaleString()}`,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${card.bgColor}`}>
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{card.title}</p>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
