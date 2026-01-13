import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Key, RefreshCw } from 'lucide-react';
import { ServiceAccount } from '@/data/teams';
import { format, parseISO, differenceInDays } from 'date-fns';

const providerColors = {
  aws: 'bg-orange-500/20 text-orange-400',
  azure: 'bg-blue-500/20 text-blue-400',
  gcp: 'bg-red-500/20 text-red-400',
  kubernetes: 'bg-purple-500/20 text-purple-400',
};

interface ServiceAccountsListProps {
  accounts: ServiceAccount[];
}

export function ServiceAccountsList({ accounts }: ServiceAccountsListProps) {
  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader>
        <CardTitle className="text-lg">Service Accounts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {accounts.map((account, idx) => {
          const lastRotatedDate = parseISO(account.lastRotated);
          const daysSinceRotation = differenceInDays(new Date(), lastRotatedDate);
          const needsRotation = daysSinceRotation > 30;

          return (
            <div
              key={idx}
              className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-3"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-muted p-2 text-muted-foreground">
                  <Key className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-mono text-sm font-medium text-foreground">{account.name}</p>
                  <p className="text-xs text-muted-foreground">{account.purpose}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={providerColors[account.provider]}>
                  {account.provider}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <RefreshCw className={`h-3 w-3 ${needsRotation ? 'text-yellow-400' : ''}`} />
                  <span className={needsRotation ? 'text-yellow-400' : ''}>
                    {format(lastRotatedDate, 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
