export interface CostRecommendation {
  id: string;
  type: 'resize' | 'delete' | 'rightsize' | 'reserved' | 'spot' | 'schedule';
  resource: string;
  resourceType: string;
  cloud: 'AWS' | 'Azure' | 'GCP';
  currentCost: number;
  projectedCost: number;
  monthlySavings: number;
  impact: 'high' | 'medium' | 'low';
  effort: 'easy' | 'medium' | 'hard';
  status: 'pending' | 'approved' | 'implemented' | 'dismissed';
  description: string;
  applicationId: string;
}

export interface MonthlyCost {
  month: string;
  actual?: number;
  projected?: number;
}

export interface Application {
  id: string;
  name: string;
  businessId: string;
  finOpsScore: number;
  currentMonthCost: number;
  costTrend: MonthlyCost[];
  recommendations: CostRecommendation[];
  approvedSavingsLast3Months: number;
  realizedSavingsLast3Months: number;
  environment: 'production' | 'staging' | 'development';
  criticality: 'critical' | 'high' | 'medium' | 'low';
}

export interface Business {
  id: string;
  name: string;
  portfolioId: string;
  applications: string[];
  totalMonthlySpend: number;
  averageFinOpsScore: number;
}

export interface Portfolio {
  id: string;
  name: string;
  businesses: string[];
  totalMonthlySpend: number;
  averageFinOpsScore: number;
}

export const portfolios: Portfolio[] = [
  {
    id: 'portfolio-1',
    name: 'Digital Transformation',
    businesses: ['business-1', 'business-2'],
    totalMonthlySpend: 285000,
    averageFinOpsScore: 72,
  },
  {
    id: 'portfolio-2',
    name: 'Core Banking',
    businesses: ['business-3', 'business-4'],
    totalMonthlySpend: 420000,
    averageFinOpsScore: 68,
  },
];

export const businesses: Business[] = [
  {
    id: 'business-1',
    name: 'Customer Experience',
    portfolioId: 'portfolio-1',
    applications: ['app-1', 'app-2', 'app-3'],
    totalMonthlySpend: 145000,
    averageFinOpsScore: 75,
  },
  {
    id: 'business-2',
    name: 'Data Analytics',
    portfolioId: 'portfolio-1',
    applications: ['app-4', 'app-5'],
    totalMonthlySpend: 140000,
    averageFinOpsScore: 69,
  },
  {
    id: 'business-3',
    name: 'Payment Processing',
    portfolioId: 'portfolio-2',
    applications: ['app-6', 'app-7'],
    totalMonthlySpend: 220000,
    averageFinOpsScore: 71,
  },
  {
    id: 'business-4',
    name: 'Lending Services',
    portfolioId: 'portfolio-2',
    applications: ['app-8', 'app-9'],
    totalMonthlySpend: 200000,
    averageFinOpsScore: 65,
  },
];

export const applications: Application[] = [
  {
    id: 'app-1',
    name: 'Customer Portal',
    businessId: 'business-1',
    finOpsScore: 82,
    currentMonthCost: 45000,
    environment: 'production',
    criticality: 'critical',
    costTrend: [
      { month: 'Oct 2024', actual: 42000 },
      { month: 'Nov 2024', actual: 44500 },
      { month: 'Dec 2024', actual: 45000 },
      { month: 'Jan 2025', projected: 46000 },
      { month: 'Feb 2025', projected: 47500 },
      { month: 'Mar 2025', projected: 48000 },
    ],
    recommendations: [
      {
        id: 'rec-1',
        type: 'resize',
        resource: 'vm-portal-prod-01',
        resourceType: 'Virtual Machine',
        cloud: 'Azure',
        currentCost: 2400,
        projectedCost: 1600,
        monthlySavings: 800,
        impact: 'low',
        effort: 'easy',
        status: 'pending',
        description: 'Resize from D4s_v3 to D2s_v3 based on 30% average CPU utilization',
        applicationId: 'app-1',
      },
      {
        id: 'rec-2',
        type: 'reserved',
        resource: 'aks-cluster-prod',
        resourceType: 'Kubernetes Cluster',
        cloud: 'Azure',
        currentCost: 8500,
        projectedCost: 5950,
        monthlySavings: 2550,
        impact: 'high',
        effort: 'medium',
        status: 'approved',
        description: 'Purchase 1-year reserved instances for stable workloads',
        applicationId: 'app-1',
      },
    ],
    approvedSavingsLast3Months: 4200,
    realizedSavingsLast3Months: 3800,
  },
  {
    id: 'app-2',
    name: 'Mobile App Backend',
    businessId: 'business-1',
    finOpsScore: 71,
    currentMonthCost: 62000,
    environment: 'production',
    criticality: 'high',
    costTrend: [
      { month: 'Oct 2024', actual: 58000 },
      { month: 'Nov 2024', actual: 60000 },
      { month: 'Dec 2024', actual: 62000 },
      { month: 'Jan 2025', projected: 64000 },
      { month: 'Feb 2025', projected: 66000 },
      { month: 'Mar 2025', projected: 68000 },
    ],
    recommendations: [
      {
        id: 'rec-3',
        type: 'delete',
        resource: 'disk-backup-old-001',
        resourceType: 'Managed Disk',
        cloud: 'Azure',
        currentCost: 450,
        projectedCost: 0,
        monthlySavings: 450,
        impact: 'low',
        effort: 'easy',
        status: 'pending',
        description: 'Delete orphaned disk not attached to any VM for 60+ days',
        applicationId: 'app-2',
      },
      {
        id: 'rec-4',
        type: 'spot',
        resource: 'batch-processing-nodes',
        resourceType: 'VM Scale Set',
        cloud: 'Azure',
        currentCost: 12000,
        projectedCost: 4800,
        monthlySavings: 7200,
        impact: 'high',
        effort: 'hard',
        status: 'pending',
        description: 'Convert batch processing workloads to spot instances',
        applicationId: 'app-2',
      },
    ],
    approvedSavingsLast3Months: 2100,
    realizedSavingsLast3Months: 1800,
  },
  {
    id: 'app-3',
    name: 'Notification Service',
    businessId: 'business-1',
    finOpsScore: 68,
    currentMonthCost: 38000,
    environment: 'production',
    criticality: 'medium',
    costTrend: [
      { month: 'Oct 2024', actual: 35000 },
      { month: 'Nov 2024', actual: 36500 },
      { month: 'Dec 2024', actual: 38000 },
      { month: 'Jan 2025', projected: 39000 },
      { month: 'Feb 2025', projected: 40000 },
      { month: 'Mar 2025', projected: 41000 },
    ],
    recommendations: [
      {
        id: 'rec-5',
        type: 'schedule',
        resource: 'dev-environment',
        resourceType: 'Resource Group',
        cloud: 'Azure',
        currentCost: 3200,
        projectedCost: 1280,
        monthlySavings: 1920,
        impact: 'medium',
        effort: 'medium',
        status: 'implemented',
        description: 'Implement auto-shutdown for dev environment during non-business hours',
        applicationId: 'app-3',
      },
    ],
    approvedSavingsLast3Months: 5760,
    realizedSavingsLast3Months: 5760,
  },
  {
    id: 'app-4',
    name: 'Data Lake Platform',
    businessId: 'business-2',
    finOpsScore: 65,
    currentMonthCost: 85000,
    environment: 'production',
    criticality: 'critical',
    costTrend: [
      { month: 'Oct 2024', actual: 78000 },
      { month: 'Nov 2024', actual: 82000 },
      { month: 'Dec 2024', actual: 85000 },
      { month: 'Jan 2025', projected: 88000 },
      { month: 'Feb 2025', projected: 92000 },
      { month: 'Mar 2025', projected: 95000 },
    ],
    recommendations: [
      {
        id: 'rec-6',
        type: 'rightsize',
        resource: 'synapse-analytics-pool',
        resourceType: 'Synapse Analytics',
        cloud: 'Azure',
        currentCost: 25000,
        projectedCost: 15000,
        monthlySavings: 10000,
        impact: 'high',
        effort: 'medium',
        status: 'pending',
        description: 'Scale down dedicated SQL pool during off-peak hours',
        applicationId: 'app-4',
      },
      {
        id: 'rec-7',
        type: 'delete',
        resource: 'staging-storage-old',
        resourceType: 'Storage Account',
        cloud: 'Azure',
        currentCost: 1200,
        projectedCost: 0,
        monthlySavings: 1200,
        impact: 'low',
        effort: 'easy',
        status: 'approved',
        description: 'Delete deprecated staging storage with no access in 90 days',
        applicationId: 'app-4',
      },
    ],
    approvedSavingsLast3Months: 3600,
    realizedSavingsLast3Months: 2400,
  },
  {
    id: 'app-5',
    name: 'ML Pipeline',
    businessId: 'business-2',
    finOpsScore: 73,
    currentMonthCost: 55000,
    environment: 'production',
    criticality: 'high',
    costTrend: [
      { month: 'Oct 2024', actual: 50000 },
      { month: 'Nov 2024', actual: 52000 },
      { month: 'Dec 2024', actual: 55000 },
      { month: 'Jan 2025', projected: 57000 },
      { month: 'Feb 2025', projected: 59000 },
      { month: 'Mar 2025', projected: 61000 },
    ],
    recommendations: [
      {
        id: 'rec-8',
        type: 'spot',
        resource: 'training-compute-cluster',
        resourceType: 'ML Compute',
        cloud: 'Azure',
        currentCost: 18000,
        projectedCost: 7200,
        monthlySavings: 10800,
        impact: 'high',
        effort: 'medium',
        status: 'pending',
        description: 'Use spot instances for model training workloads',
        applicationId: 'app-5',
      },
    ],
    approvedSavingsLast3Months: 0,
    realizedSavingsLast3Months: 0,
  },
  {
    id: 'app-6',
    name: 'Payment Gateway',
    businessId: 'business-3',
    finOpsScore: 78,
    currentMonthCost: 120000,
    environment: 'production',
    criticality: 'critical',
    costTrend: [
      { month: 'Oct 2024', actual: 115000 },
      { month: 'Nov 2024', actual: 118000 },
      { month: 'Dec 2024', actual: 120000 },
      { month: 'Jan 2025', projected: 122000 },
      { month: 'Feb 2025', projected: 124000 },
      { month: 'Mar 2025', projected: 126000 },
    ],
    recommendations: [
      {
        id: 'rec-9',
        type: 'reserved',
        resource: 'cosmos-db-prod',
        resourceType: 'Cosmos DB',
        cloud: 'Azure',
        currentCost: 35000,
        projectedCost: 24500,
        monthlySavings: 10500,
        impact: 'high',
        effort: 'easy',
        status: 'implemented',
        description: 'Apply reserved capacity discount for Cosmos DB',
        applicationId: 'app-6',
      },
    ],
    approvedSavingsLast3Months: 31500,
    realizedSavingsLast3Months: 31500,
  },
  {
    id: 'app-7',
    name: 'Fraud Detection',
    businessId: 'business-3',
    finOpsScore: 64,
    currentMonthCost: 100000,
    environment: 'production',
    criticality: 'critical',
    costTrend: [
      { month: 'Oct 2024', actual: 92000 },
      { month: 'Nov 2024', actual: 96000 },
      { month: 'Dec 2024', actual: 100000 },
      { month: 'Jan 2025', projected: 105000 },
      { month: 'Feb 2025', projected: 110000 },
      { month: 'Mar 2025', projected: 115000 },
    ],
    recommendations: [
      {
        id: 'rec-10',
        type: 'rightsize',
        resource: 'event-hub-namespace',
        resourceType: 'Event Hub',
        cloud: 'Azure',
        currentCost: 8500,
        projectedCost: 5100,
        monthlySavings: 3400,
        impact: 'medium',
        effort: 'medium',
        status: 'pending',
        description: 'Reduce throughput units during low-traffic periods',
        applicationId: 'app-7',
      },
      {
        id: 'rec-11',
        type: 'resize',
        resource: 'stream-analytics-job',
        resourceType: 'Stream Analytics',
        cloud: 'Azure',
        currentCost: 4200,
        projectedCost: 2800,
        monthlySavings: 1400,
        impact: 'low',
        effort: 'easy',
        status: 'pending',
        description: 'Optimize streaming units based on actual throughput',
        applicationId: 'app-7',
      },
    ],
    approvedSavingsLast3Months: 0,
    realizedSavingsLast3Months: 0,
  },
  {
    id: 'app-8',
    name: 'Loan Origination',
    businessId: 'business-4',
    finOpsScore: 61,
    currentMonthCost: 110000,
    environment: 'production',
    criticality: 'high',
    costTrend: [
      { month: 'Oct 2024', actual: 100000 },
      { month: 'Nov 2024', actual: 105000 },
      { month: 'Dec 2024', actual: 110000 },
      { month: 'Jan 2025', projected: 115000 },
      { month: 'Feb 2025', projected: 120000 },
      { month: 'Mar 2025', projected: 125000 },
    ],
    recommendations: [
      {
        id: 'rec-12',
        type: 'delete',
        resource: 'snapshot-archive-2023',
        resourceType: 'Disk Snapshots',
        cloud: 'Azure',
        currentCost: 2800,
        projectedCost: 0,
        monthlySavings: 2800,
        impact: 'low',
        effort: 'easy',
        status: 'pending',
        description: 'Delete outdated disk snapshots older than retention policy',
        applicationId: 'app-8',
      },
      {
        id: 'rec-13',
        type: 'reserved',
        resource: 'sql-managed-instance',
        resourceType: 'SQL Managed Instance',
        cloud: 'Azure',
        currentCost: 28000,
        projectedCost: 19600,
        monthlySavings: 8400,
        impact: 'high',
        effort: 'easy',
        status: 'approved',
        description: 'Apply 3-year reserved instance for critical database',
        applicationId: 'app-8',
      },
    ],
    approvedSavingsLast3Months: 8400,
    realizedSavingsLast3Months: 5600,
  },
  {
    id: 'app-9',
    name: 'Credit Scoring Engine',
    businessId: 'business-4',
    finOpsScore: 69,
    currentMonthCost: 90000,
    environment: 'production',
    criticality: 'high',
    costTrend: [
      { month: 'Oct 2024', actual: 85000 },
      { month: 'Nov 2024', actual: 87000 },
      { month: 'Dec 2024', actual: 90000 },
      { month: 'Jan 2025', projected: 92000 },
      { month: 'Feb 2025', projected: 94000 },
      { month: 'Mar 2025', projected: 96000 },
    ],
    recommendations: [
      {
        id: 'rec-14',
        type: 'schedule',
        resource: 'qa-environment',
        resourceType: 'Resource Group',
        cloud: 'Azure',
        currentCost: 5500,
        projectedCost: 2200,
        monthlySavings: 3300,
        impact: 'medium',
        effort: 'medium',
        status: 'pending',
        description: 'Auto-shutdown QA environment on weekends',
        applicationId: 'app-9',
      },
    ],
    approvedSavingsLast3Months: 0,
    realizedSavingsLast3Months: 0,
  },
];

export const getFinOpsScoreColor = (score: number): string => {
  if (score >= 80) return 'text-green-600';
  if (score >= 70) return 'text-yellow-600';
  if (score >= 60) return 'text-orange-500';
  return 'text-red-500';
};

export const getFinOpsScoreLabel = (score: number): string => {
  if (score >= 80) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 60) return 'Needs Improvement';
  return 'Critical';
};

export const getRecommendationTypeLabel = (type: CostRecommendation['type']): string => {
  const labels: Record<CostRecommendation['type'], string> = {
    resize: 'Resize Resource',
    delete: 'Delete Unused',
    rightsize: 'Rightsize',
    reserved: 'Reserved Instance',
    spot: 'Use Spot/Preemptible',
    schedule: 'Schedule On/Off',
  };
  return labels[type];
};
