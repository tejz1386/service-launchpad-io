// DORA + delivery metrics per team and per self-service catalog offering.
// All values are mock data for the developer platform demo.

export type DoraRating = 'Elite' | 'High' | 'Medium' | 'Low';

export interface DoraMetrics {
  // Core DORA
  deploymentFrequency: string;          // e.g. "12 / day"
  deploymentFrequencyPerWeek: number;   // numeric for charts
  leadTimeForChanges: string;           // e.g. "1.2 days"
  leadTimeHours: number;                // numeric
  changeFailureRate: number;            // percentage 0-100
  meanTimeToRestoreHours: number;       // hours
  rating: DoraRating;
}

export interface DeliveryMetrics {
  openPRs: number;
  mergedPRsLast30d: number;
  avgPRReviewHours: number;
  releasesLast30d: number;
  releaseFrequency: string;             // human readable cadence
  hotfixesLast30d: number;
  rollbacksLast30d: number;
  successfulDeployments: number;
  failedDeployments: number;
}

export interface TeamEngineeringMetrics {
  teamId: string;
  teamName: string;
  dora: DoraMetrics;
  delivery: DeliveryMetrics;
  trend: { week: string; deployments: number; prs: number; failures: number }[];
}

export interface ServiceEngineeringMetrics {
  serviceId: string;
  serviceName: string;
  category: string;
  ownerTeam: string;
  provisionsLast30d: number;
  totalProvisions: number;
  successRate: number;          // %
  avgProvisionMinutes: number;
  openPRs: number;
  mergedPRsLast30d: number;
  releasesLast30d: number;
  deploymentFrequency: string;
  changeFailureRate: number;
  lastReleased: string;
}

export const teamEngineeringMetrics: TeamEngineeringMetrics[] = [
  {
    teamId: 'infrastructure-platform',
    teamName: 'Infrastructure Platform',
    dora: {
      deploymentFrequency: '14 / day',
      deploymentFrequencyPerWeek: 98,
      leadTimeForChanges: '6.4 hours',
      leadTimeHours: 6.4,
      changeFailureRate: 8.2,
      meanTimeToRestoreHours: 1.1,
      rating: 'Elite',
    },
    delivery: {
      openPRs: 23,
      mergedPRsLast30d: 187,
      avgPRReviewHours: 4.2,
      releasesLast30d: 42,
      releaseFrequency: 'Multiple per day',
      hotfixesLast30d: 3,
      rollbacksLast30d: 1,
      successfulDeployments: 412,
      failedDeployments: 18,
    },
    trend: [
      { week: 'W1', deployments: 84, prs: 41, failures: 4 },
      { week: 'W2', deployments: 92, prs: 47, failures: 3 },
      { week: 'W3', deployments: 105, prs: 52, failures: 6 },
      { week: 'W4', deployments: 98, prs: 47, failures: 5 },
    ],
  },
  {
    teamId: 'cloud-modernization',
    teamName: 'Cloud Modernization',
    dora: {
      deploymentFrequency: '4 / day',
      deploymentFrequencyPerWeek: 28,
      leadTimeForChanges: '1.8 days',
      leadTimeHours: 43.2,
      changeFailureRate: 12.5,
      meanTimeToRestoreHours: 3.6,
      rating: 'High',
    },
    delivery: {
      openPRs: 17,
      mergedPRsLast30d: 96,
      avgPRReviewHours: 9.4,
      releasesLast30d: 18,
      releaseFrequency: 'Daily',
      hotfixesLast30d: 2,
      rollbacksLast30d: 2,
      successfulDeployments: 142,
      failedDeployments: 19,
    },
    trend: [
      { week: 'W1', deployments: 26, prs: 22, failures: 3 },
      { week: 'W2', deployments: 32, prs: 25, failures: 4 },
      { week: 'W3', deployments: 28, prs: 24, failures: 5 },
      { week: 'W4', deployments: 31, prs: 25, failures: 7 },
    ],
  },
  {
    teamId: 'cloud-operations',
    teamName: 'Cloud Operations',
    dora: {
      deploymentFrequency: '6 / day',
      deploymentFrequencyPerWeek: 42,
      leadTimeForChanges: '11 hours',
      leadTimeHours: 11,
      changeFailureRate: 6.1,
      meanTimeToRestoreHours: 0.9,
      rating: 'Elite',
    },
    delivery: {
      openPRs: 12,
      mergedPRsLast30d: 134,
      avgPRReviewHours: 3.1,
      releasesLast30d: 26,
      releaseFrequency: 'Multiple per day',
      hotfixesLast30d: 5,
      rollbacksLast30d: 1,
      successfulDeployments: 248,
      failedDeployments: 16,
    },
    trend: [
      { week: 'W1', deployments: 58, prs: 31, failures: 4 },
      { week: 'W2', deployments: 64, prs: 34, failures: 3 },
      { week: 'W3', deployments: 61, prs: 35, failures: 4 },
      { week: 'W4', deployments: 65, prs: 34, failures: 5 },
    ],
  },
  {
    teamId: 'finops-swam',
    teamName: 'FinOps & SWAM',
    dora: {
      deploymentFrequency: '1 / day',
      deploymentFrequencyPerWeek: 7,
      leadTimeForChanges: '3.2 days',
      leadTimeHours: 76.8,
      changeFailureRate: 14.0,
      meanTimeToRestoreHours: 5.5,
      rating: 'Medium',
    },
    delivery: {
      openPRs: 9,
      mergedPRsLast30d: 41,
      avgPRReviewHours: 18.6,
      releasesLast30d: 6,
      releaseFrequency: 'Weekly',
      hotfixesLast30d: 1,
      rollbacksLast30d: 1,
      successfulDeployments: 36,
      failedDeployments: 6,
    },
    trend: [
      { week: 'W1', deployments: 7, prs: 9, failures: 1 },
      { week: 'W2', deployments: 9, prs: 11, failures: 2 },
      { week: 'W3', deployments: 8, prs: 10, failures: 1 },
      { week: 'W4', deployments: 10, prs: 11, failures: 2 },
    ],
  },
  {
    teamId: 'cloud-architects',
    teamName: 'Cloud Architects',
    dora: {
      deploymentFrequency: '2 / day',
      deploymentFrequencyPerWeek: 14,
      leadTimeForChanges: '1.5 days',
      leadTimeHours: 36,
      changeFailureRate: 9.3,
      meanTimeToRestoreHours: 2.4,
      rating: 'High',
    },
    delivery: {
      openPRs: 14,
      mergedPRsLast30d: 58,
      avgPRReviewHours: 7.2,
      releasesLast30d: 11,
      releaseFrequency: 'Daily',
      hotfixesLast30d: 1,
      rollbacksLast30d: 0,
      successfulDeployments: 71,
      failedDeployments: 7,
    },
    trend: [
      { week: 'W1', deployments: 14, prs: 13, failures: 1 },
      { week: 'W2', deployments: 17, prs: 15, failures: 2 },
      { week: 'W3', deployments: 16, prs: 14, failures: 1 },
      { week: 'W4', deployments: 18, prs: 16, failures: 3 },
    ],
  },
];

export const serviceEngineeringMetrics: ServiceEngineeringMetrics[] = [
  {
    serviceId: 'k8s-namespace',
    serviceName: 'Kubernetes Namespace Creation',
    category: 'Infrastructure',
    ownerTeam: 'Infrastructure Platform',
    provisionsLast30d: 86,
    totalProvisions: 1247,
    successRate: 98.4,
    avgProvisionMinutes: 6.2,
    openPRs: 7,
    mergedPRsLast30d: 34,
    releasesLast30d: 5,
    deploymentFrequency: 'Daily',
    changeFailureRate: 4.1,
    lastReleased: '2026-05-04',
  },
  {
    serviceId: 'vm-terraform',
    serviceName: 'VM Provisioning (Terraform)',
    category: 'Infrastructure',
    ownerTeam: 'Infrastructure Platform',
    provisionsLast30d: 142,
    totalProvisions: 3120,
    successRate: 96.1,
    avgProvisionMinutes: 12.8,
    openPRs: 11,
    mergedPRsLast30d: 52,
    releasesLast30d: 8,
    deploymentFrequency: 'Multiple per day',
    changeFailureRate: 6.8,
    lastReleased: '2026-05-06',
  },
  {
    serviceId: 'app-deploy-k8s',
    serviceName: 'Application Deployment to K8s',
    category: 'Application',
    ownerTeam: 'Cloud Modernization',
    provisionsLast30d: 214,
    totalProvisions: 5840,
    successRate: 94.7,
    avgProvisionMinutes: 4.1,
    openPRs: 9,
    mergedPRsLast30d: 71,
    releasesLast30d: 14,
    deploymentFrequency: 'Multiple per day',
    changeFailureRate: 7.5,
    lastReleased: '2026-05-07',
  },
  {
    serviceId: 'cloud-vending-machine',
    serviceName: 'Cloud Vending Machine',
    category: 'Infrastructure',
    ownerTeam: 'Cloud Architects',
    provisionsLast30d: 23,
    totalProvisions: 184,
    successRate: 99.1,
    avgProvisionMinutes: 24.5,
    openPRs: 4,
    mergedPRsLast30d: 18,
    releasesLast30d: 3,
    deploymentFrequency: 'Weekly',
    changeFailureRate: 3.2,
    lastReleased: '2026-05-02',
  },
];
