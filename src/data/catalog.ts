export type CatalogType = 'service' | 'library' | 'api' | 'cloud-workspace';

export interface CatalogComponent {
  id: string;
  name: string;
  owner: string;
  type: CatalogType;
  description: string;
  tags: string[];
  deployable: boolean;
  deployServiceId?: string;
  lastUpdated: string;
  status: 'active' | 'deprecated' | 'beta';
}

export const catalogOwners = [
  'Infrastructure Platform Engineering',
  'Cloud Modernization',
  'Cloud Operations',
  'FinOps & SWAM',
  'Security Team',
  'DevOps Team',
];

export const catalogComponents: CatalogComponent[] = [
  // Services
  {
    id: 'svc-k8s-namespace',
    name: 'Kubernetes Namespace Service',
    owner: 'Infrastructure Platform Engineering',
    type: 'service',
    description: 'Automated provisioning of Kubernetes namespaces in AKS and GKE clusters with resource quotas and RBAC.',
    tags: ['kubernetes', 'aks', 'gke', 'infrastructure'],
    deployable: true,
    deployServiceId: 'k8s-namespace',
    lastUpdated: '2024-01-10',
    status: 'active',
  },
  {
    id: 'svc-vm-provisioning',
    name: 'Virtual Machine Provisioning',
    owner: 'Cloud Modernization',
    type: 'service',
    description: 'Terraform-based VM provisioning across AWS, Azure, and GCP with automated configuration management.',
    tags: ['terraform', 'vm', 'iaas', 'multi-cloud'],
    deployable: true,
    deployServiceId: 'vm-provisioning',
    lastUpdated: '2024-01-08',
    status: 'active',
  },
  {
    id: 'svc-app-deployment',
    name: 'Application Deployment Pipeline',
    owner: 'DevOps Team',
    type: 'service',
    description: 'Complete CI/CD pipeline with Day 0 operations including monitoring, logging, and security scanning.',
    tags: ['cicd', 'pipeline', 'monitoring', 'security'],
    deployable: true,
    deployServiceId: 'app-deployment',
    lastUpdated: '2024-01-12',
    status: 'active',
  },
  {
    id: 'svc-database',
    name: 'Managed Database Service',
    owner: 'Cloud Operations',
    type: 'service',
    description: 'Provisioning and management of PostgreSQL, MySQL, and MongoDB databases across cloud providers.',
    tags: ['database', 'postgresql', 'mysql', 'mongodb'],
    deployable: false,
    lastUpdated: '2024-01-05',
    status: 'beta',
  },
  // Libraries
  {
    id: 'lib-auth-sdk',
    name: 'Authentication SDK',
    owner: 'Security Team',
    type: 'library',
    description: 'Standardized authentication library supporting OAuth 2.0, SAML, and OpenID Connect protocols.',
    tags: ['auth', 'oauth', 'security', 'sdk'],
    deployable: false,
    lastUpdated: '2024-01-09',
    status: 'active',
  },
  {
    id: 'lib-logging',
    name: 'Centralized Logging Library',
    owner: 'Cloud Operations',
    type: 'library',
    description: 'Unified logging library with structured logging, log aggregation, and integration with ELK stack.',
    tags: ['logging', 'elk', 'observability'],
    deployable: false,
    lastUpdated: '2024-01-07',
    status: 'active',
  },
  {
    id: 'lib-metrics',
    name: 'Metrics Collection Library',
    owner: 'Infrastructure Platform Engineering',
    type: 'library',
    description: 'Prometheus-compatible metrics library for application instrumentation and custom metrics.',
    tags: ['metrics', 'prometheus', 'observability'],
    deployable: false,
    lastUpdated: '2024-01-06',
    status: 'active',
  },
  // APIs
  {
    id: 'api-cost-management',
    name: 'Cost Management API',
    owner: 'FinOps & SWAM',
    type: 'api',
    description: 'RESTful API for querying cloud costs, budgets, and generating cost optimization recommendations.',
    tags: ['finops', 'cost', 'api', 'rest'],
    deployable: false,
    lastUpdated: '2024-01-11',
    status: 'active',
  },
  {
    id: 'api-resource-inventory',
    name: 'Resource Inventory API',
    owner: 'Cloud Operations',
    type: 'api',
    description: 'GraphQL API providing real-time inventory of all cloud resources across subscriptions.',
    tags: ['inventory', 'graphql', 'cmdb'],
    deployable: false,
    lastUpdated: '2024-01-04',
    status: 'active',
  },
  {
    id: 'api-secrets',
    name: 'Secrets Management API',
    owner: 'Security Team',
    type: 'api',
    description: 'Secure API for managing secrets, certificates, and encryption keys with audit logging.',
    tags: ['secrets', 'vault', 'security', 'encryption'],
    deployable: false,
    lastUpdated: '2024-01-03',
    status: 'active',
  },
  // Cloud Workspaces
  {
    id: 'ws-dev-sandbox',
    name: 'Development Sandbox',
    owner: 'Infrastructure Platform Engineering',
    type: 'cloud-workspace',
    description: 'Isolated cloud environment for development and experimentation with pre-configured networking.',
    tags: ['sandbox', 'development', 'isolated'],
    deployable: false,
    lastUpdated: '2024-01-10',
    status: 'active',
  },
  {
    id: 'ws-data-analytics',
    name: 'Data Analytics Workspace',
    owner: 'Cloud Modernization',
    type: 'cloud-workspace',
    description: 'Pre-configured workspace with data analytics tools including Spark, Databricks, and BigQuery access.',
    tags: ['analytics', 'spark', 'bigquery', 'data'],
    deployable: false,
    lastUpdated: '2024-01-02',
    status: 'active',
  },
  {
    id: 'ws-ml-platform',
    name: 'ML Platform Workspace',
    owner: 'Cloud Modernization',
    type: 'cloud-workspace',
    description: 'Machine learning workspace with GPU compute, MLflow, and model registry integration.',
    tags: ['ml', 'ai', 'gpu', 'mlops'],
    deployable: false,
    lastUpdated: '2024-01-01',
    status: 'beta',
  },
];

export const getCatalogTypeLabel = (type: CatalogType): string => {
  const labels: Record<CatalogType, string> = {
    'service': 'Service',
    'library': 'Library',
    'api': 'API',
    'cloud-workspace': 'Cloud Workspace',
  };
  return labels[type];
};
