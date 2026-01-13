import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CloudAccount } from '@/data/teams';

const providerColors = {
  aws: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  azure: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  gcp: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const providerLabels = {
  aws: 'AWS',
  azure: 'Azure',
  gcp: 'GCP',
};

const envColors = {
  production: 'bg-green-500/20 text-green-400',
  staging: 'bg-yellow-500/20 text-yellow-400',
  development: 'bg-blue-500/20 text-blue-400',
};

interface CloudAccountsTableProps {
  accounts: CloudAccount[];
}

export function CloudAccountsTable({ accounts }: CloudAccountsTableProps) {
  const totalSpend = accounts.reduce((sum, acc) => sum + acc.monthlySpend, 0);

  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Cloud Accounts</CardTitle>
        <Badge variant="outline" className="text-sm">
          ${totalSpend.toLocaleString()}/mo total
        </Badge>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border/50">
              <TableHead>Provider</TableHead>
              <TableHead>Account Name</TableHead>
              <TableHead>Account ID</TableHead>
              <TableHead>Environment</TableHead>
              <TableHead className="text-right">Monthly Spend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account, idx) => (
              <TableRow key={idx} className="border-border/50">
                <TableCell>
                  <Badge variant="outline" className={providerColors[account.provider]}>
                    {providerLabels[account.provider]}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium text-foreground">{account.name}</TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">{account.accountId}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={envColors[account.environment]}>
                    {account.environment}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium text-foreground">
                  ${account.monthlySpend.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
