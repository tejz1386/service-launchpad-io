import { useState, useMemo } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProfileSelector, ProfileType } from '@/components/cost/ProfileSelector';
import { CostSummaryCards } from '@/components/cost/CostSummaryCards';
import { FinOpsScoreCard } from '@/components/cost/FinOpsScoreCard';
import { CostRecommendations } from '@/components/cost/CostRecommendations';
import { CostTrendsChart } from '@/components/cost/CostTrendsChart';
import { ApplicationCostTable } from '@/components/cost/ApplicationCostTable';
import { 
  portfolios, 
  businesses, 
  applications, 
  MonthlyCost,
  CostRecommendation 
} from '@/data/costInsights';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CostInsights() {
  const [profileType, setProfileType] = useState<ProfileType>('portfolio');
  const [selectedId, setSelectedId] = useState<string>(portfolios[0].id);

  // Get filtered applications based on profile selection
  const filteredApplications = useMemo(() => {
    switch (profileType) {
      case 'portfolio': {
        const portfolio = portfolios.find((p) => p.id === selectedId);
        if (!portfolio) return [];
        const businessIds = portfolio.businesses;
        return applications.filter((app) => businessIds.includes(app.businessId));
      }
      case 'business': {
        const business = businesses.find((b) => b.id === selectedId);
        if (!business) return [];
        return applications.filter((app) => app.businessId === business.id);
      }
      case 'application': {
        return applications.filter((app) => app.id === selectedId);
      }
    }
  }, [profileType, selectedId]);

  // Get filtered businesses for portfolio view
  const filteredBusinesses = useMemo(() => {
    if (profileType === 'portfolio') {
      const portfolio = portfolios.find((p) => p.id === selectedId);
      if (!portfolio) return [];
      return businesses.filter((b) => portfolio.businesses.includes(b.id));
    }
    return [];
  }, [profileType, selectedId]);

  // Calculate aggregated metrics
  const metrics = useMemo(() => {
    const totalSpend = filteredApplications.reduce((sum, app) => sum + app.currentMonthCost, 0);
    
    const allRecommendations = filteredApplications.flatMap((app) => app.recommendations);
    const pendingRecs = allRecommendations.filter((r) => r.status === 'pending');
    const potentialSavings = pendingRecs.reduce((sum, r) => sum + r.monthlySavings, 0);
    
    const realizedSavings = filteredApplications.reduce(
      (sum, app) => sum + app.realizedSavingsLast3Months,
      0
    );
    const approvedSavings = filteredApplications.reduce(
      (sum, app) => sum + app.approvedSavingsLast3Months,
      0
    );

    const avgScore = filteredApplications.length > 0
      ? Math.round(
          filteredApplications.reduce((sum, app) => sum + app.finOpsScore, 0) / filteredApplications.length
        )
      : 0;

    return {
      totalSpend,
      potentialSavings,
      pendingRecommendations: pendingRecs.length,
      realizedSavings,
      approvedSavings,
      avgScore,
      allRecommendations: pendingRecs,
    };
  }, [filteredApplications]);

  // Aggregate cost trends
  const aggregatedCostTrend = useMemo((): MonthlyCost[] => {
    if (filteredApplications.length === 0) return [];
    
    const months = filteredApplications[0].costTrend.map((c) => c.month);
    
    return months.map((month) => {
      const monthData: MonthlyCost = { month };
      
      filteredApplications.forEach((app) => {
        const appMonth = app.costTrend.find((c) => c.month === month);
        if (appMonth?.actual !== undefined) {
          monthData.actual = (monthData.actual || 0) + appMonth.actual;
        }
        if (appMonth?.projected !== undefined) {
          monthData.projected = (monthData.projected || 0) + appMonth.projected;
        }
      });
      
      return monthData;
    });
  }, [filteredApplications]);

  // Create application name lookup
  const applicationNames = useMemo(() => {
    return applications.reduce((acc, app) => {
      acc[app.id] = app.name;
      return acc;
    }, {} as Record<string, string>);
  }, []);

  // Handle profile type change
  const handleProfileTypeChange = (type: ProfileType) => {
    setProfileType(type);
    // Set default selection for new profile type
    switch (type) {
      case 'portfolio':
        setSelectedId(portfolios[0].id);
        break;
      case 'business':
        setSelectedId(businesses[0].id);
        break;
      case 'application':
        setSelectedId(applications[0].id);
        break;
    }
  };

  // Handle drill-down to application
  const handleSelectApplication = (appId: string) => {
    setProfileType('application');
    setSelectedId(appId);
  };

  // Get current selection name for display
  const getSelectionName = () => {
    switch (profileType) {
      case 'portfolio':
        return portfolios.find((p) => p.id === selectedId)?.name || '';
      case 'business':
        return businesses.find((b) => b.id === selectedId)?.name || '';
      case 'application':
        return applications.find((a) => a.id === selectedId)?.name || '';
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Cost Insights</h1>
            <p className="text-muted-foreground mt-1">
              Optimize cloud spending with actionable recommendations and FinOps scoring
            </p>
          </div>
          <ProfileSelector
            profileType={profileType}
            selectedId={selectedId}
            onProfileTypeChange={handleProfileTypeChange}
            onSelectionChange={setSelectedId}
          />
        </div>

        {/* Context Badge */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Viewing:</span>
          <Badge variant="secondary" className="text-sm">
            {getSelectionName()}
          </Badge>
          <span className="text-sm text-muted-foreground">
            ({filteredApplications.length} application{filteredApplications.length !== 1 ? 's' : ''})
          </span>
        </div>

        {/* Summary Cards */}
        <CostSummaryCards
          totalSpend={metrics.totalSpend}
          potentialSavings={metrics.potentialSavings}
          pendingRecommendations={metrics.pendingRecommendations}
          realizedSavings={metrics.realizedSavings}
        />

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            {profileType === 'portfolio' && (
              <TabsTrigger value="businesses">Businesses</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CostTrendsChart 
                  costData={aggregatedCostTrend} 
                  title="Cost Run Rate & Projection"
                />
              </div>
              <div>
                <FinOpsScoreCard
                  score={metrics.avgScore}
                  approvedSavings={metrics.approvedSavings}
                  realizedSavings={metrics.realizedSavings}
                  pendingRecommendations={metrics.pendingRecommendations}
                  totalPotentialSavings={metrics.potentialSavings}
                />
              </div>
            </div>

            {/* Top Recommendations Preview */}
            <CostRecommendations
              recommendations={metrics.allRecommendations.slice(0, 5)}
              showApplicationName={profileType !== 'application'}
              applicationNames={applicationNames}
            />
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <CostRecommendations
              recommendations={metrics.allRecommendations}
              showApplicationName={profileType !== 'application'}
              applicationNames={applicationNames}
            />
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <ApplicationCostTable
              applications={filteredApplications}
              onSelectApplication={handleSelectApplication}
            />

            {/* Individual Application Details (for single app view) */}
            {profileType === 'application' && filteredApplications.length === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CostTrendsChart
                  costData={filteredApplications[0].costTrend}
                  title={`${filteredApplications[0].name} Cost Trend`}
                />
                <FinOpsScoreCard
                  score={filteredApplications[0].finOpsScore}
                  approvedSavings={filteredApplications[0].approvedSavingsLast3Months}
                  realizedSavings={filteredApplications[0].realizedSavingsLast3Months}
                  pendingRecommendations={
                    filteredApplications[0].recommendations.filter((r) => r.status === 'pending').length
                  }
                  totalPotentialSavings={
                    filteredApplications[0].recommendations
                      .filter((r) => r.status === 'pending')
                      .reduce((sum, r) => sum + r.monthlySavings, 0)
                  }
                />
              </div>
            )}
          </TabsContent>

          {profileType === 'portfolio' && (
            <TabsContent value="businesses" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBusinesses.map((business) => {
                  const businessApps = applications.filter((a) => a.businessId === business.id);
                  const businessSpend = businessApps.reduce((sum, a) => sum + a.currentMonthCost, 0);
                  const businessScore = Math.round(
                    businessApps.reduce((sum, a) => sum + a.finOpsScore, 0) / businessApps.length
                  );
                  const businessPendingRecs = businessApps.reduce(
                    (sum, a) => sum + a.recommendations.filter((r) => r.status === 'pending').length,
                    0
                  );

                  return (
                    <div
                      key={business.id}
                      className="rounded-lg border p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => {
                        setProfileType('business');
                        setSelectedId(business.id);
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{business.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {businessApps.length} applications
                          </p>
                        </div>
                        <Badge
                          className={
                            businessScore >= 70
                              ? 'bg-green-100 text-green-700'
                              : businessScore >= 60
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }
                        >
                          Score: {businessScore}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Monthly Spend</p>
                          <p className="font-semibold">${businessSpend.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Pending Recs</p>
                          <p className="font-semibold">{businessPendingRecs}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Applications</p>
                          <p className="font-semibold">{businessApps.length}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </AppLayout>
  );
}
