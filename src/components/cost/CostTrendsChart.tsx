import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MonthlyCost } from '@/data/costInsights';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from 'recharts';

interface CostTrendsChartProps {
  costData: MonthlyCost[];
  title?: string;
}

export function CostTrendsChart({ costData, title = 'Cost Trends' }: CostTrendsChartProps) {
  const actualData = costData.filter((d) => d.actual !== undefined);
  const projectedData = costData.filter((d) => d.projected !== undefined);

  const lastActual = actualData[actualData.length - 1]?.actual || 0;
  const firstActual = actualData[0]?.actual || 0;
  const lastProjected = projectedData[projectedData.length - 1]?.projected || 0;

  const historicalChange = firstActual > 0 
    ? Math.round(((lastActual - firstActual) / firstActual) * 100) 
    : 0;
  
  const projectedChange = lastActual > 0 
    ? Math.round(((lastProjected - lastActual) / lastActual) * 100) 
    : 0;

  // Combine data for chart
  const chartData = costData.map((item) => ({
    month: item.month.split(' ')[0],
    actual: item.actual,
    projected: item.projected,
  }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-primary" />
            {title}
          </CardTitle>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Last 3 mo:</span>
              <span className={historicalChange >= 0 ? 'text-red-500' : 'text-green-500'}>
                {historicalChange >= 0 ? '+' : ''}{historicalChange}%
              </span>
              {historicalChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4 text-red-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-green-500" />
              )}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Next 3 mo:</span>
              <span className={projectedChange >= 0 ? 'text-red-500' : 'text-green-500'}>
                {projectedChange >= 0 ? '+' : ''}{projectedChange}%
              </span>
              {projectedChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4 text-red-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-green-500" />
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
              />
              <YAxis 
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                labelFormatter={(label) => `Month: ${label}`}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="actual"
                name="Actual Cost"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                connectNulls={false}
              />
              <Area
                type="monotone"
                dataKey="projected"
                name="Projected Cost"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="hsl(var(--muted))"
                fillOpacity={0.3}
                dot={{ fill: 'hsl(var(--muted-foreground))', strokeWidth: 2, r: 4 }}
                connectNulls={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Current Month</p>
            <p className="text-xl font-semibold">${lastActual.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">3-Month Average</p>
            <p className="text-xl font-semibold">
              ${Math.round(actualData.reduce((sum, d) => sum + (d.actual || 0), 0) / actualData.length).toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Projected (3 mo)</p>
            <p className="text-xl font-semibold">${lastProjected.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
