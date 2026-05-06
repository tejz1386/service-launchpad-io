export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'active' | 'beta' | 'deprecated';
  icon: string;
  tags: string[];
  owner: string;
  team: string;
  version: string;
  lastUpdated: string;
  documentation: string;
  prerequisites: string[];
  estimatedTime: string;
  features: string[];
  parameters: {
    name: string;
    type: string;
    required: boolean;
    description: string;
    options?: string[];
  }[];
}

export const services: Service[] = [
  {
    id: 'k8s-namespace',
    name: 'Kubernetes Namespace Creation',
    description: 'Provision isolated Kubernetes namespaces in AKS or GKE clusters with pre-configured resource quotas, network policies, and RBAC settings.',
    category: 'Infrastructure',
    status: 'active',
    icon: 'kubernetes',
    tags: ['kubernetes', 'aks', 'gke', 'namespace', 'cloud'],
    owner: 'platform-team',
    team: 'Cloud Infrastructure',
    version: '2.1.0',
    lastUpdated: '2025-01-08',
    documentation: 'https://docs.internal/k8s-namespace',
    estimatedTime: '5-10 minutes',
    prerequisites: [
      'Valid cloud credentials (Azure or GCP)',
      'Cluster access permissions',
      'Approved namespace naming convention'
    ],
    features: [
      'Multi-cloud support (AKS & GKE)',
      'Automatic resource quota configuration',
      'Network policy templates',
      'RBAC role bindings',
      'Namespace labels and annotations',
      'Integration with service mesh'
    ],
    parameters: [
      { name: 'namespace_name', type: 'string', required: true, description: 'Name of the namespace (must follow naming convention)' },
      { name: 'cloud_provider', type: 'select', required: true, description: 'Target cloud provider', options: ['AKS', 'GKE'] },
      { name: 'cluster_name', type: 'select', required: true, description: 'Target Kubernetes cluster', options: ['prod-east', 'prod-west', 'staging', 'dev'] },
      { name: 'resource_quota', type: 'select', required: true, description: 'Resource quota tier', options: ['small', 'medium', 'large', 'custom'] },
      { name: 'enable_istio', type: 'boolean', required: false, description: 'Enable Istio service mesh integration' },
      { name: 'team_label', type: 'string', required: true, description: 'Team ownership label' }
    ]
  },
  {
    id: 'vm-terraform',
    name: 'Virtual Machine Provisioning',
    description: 'Deploy production-ready virtual machines using Terraform with infrastructure-as-code. Supports multiple cloud providers with standardized configurations.',
    category: 'Infrastructure',
    status: 'active',
    icon: 'server',
    tags: ['terraform', 'vm', 'iaas', 'azure', 'gcp', 'aws'],
    owner: 'infra-team',
    team: 'Infrastructure Automation',
    version: '3.0.2',
    lastUpdated: '2025-01-05',
    documentation: 'https://docs.internal/vm-terraform',
    estimatedTime: '10-15 minutes',
    prerequisites: [
      'Cloud provider account with VM creation permissions',
      'SSH key pair generated',
      'Network/VPC already provisioned',
      'Approved VM sizing request'
    ],
    features: [
      'Multi-cloud Terraform modules',
      'Pre-hardened OS images',
      'Automatic security group configuration',
      'Disk encryption enabled by default',
      'Monitoring agent pre-installed',
      'Backup policy integration',
      'Cost tagging automation'
    ],
    parameters: [
      { name: 'vm_name', type: 'string', required: true, description: 'Virtual machine hostname' },
      { name: 'cloud_provider', type: 'select', required: true, description: 'Cloud provider', options: ['Azure', 'GCP', 'AWS'] },
      { name: 'region', type: 'select', required: true, description: 'Deployment region', options: ['us-east-1', 'us-west-2', 'eu-west-1', 'asia-south-1'] },
      { name: 'vm_size', type: 'select', required: true, description: 'VM size/instance type', options: ['small (2 vCPU, 4GB)', 'medium (4 vCPU, 8GB)', 'large (8 vCPU, 16GB)', 'xlarge (16 vCPU, 32GB)'] },
      { name: 'os_image', type: 'select', required: true, description: 'Operating system image', options: ['Ubuntu 22.04 LTS', 'RHEL 9', 'Windows Server 2022', 'Debian 12'] },
      { name: 'disk_size_gb', type: 'number', required: true, description: 'Root disk size in GB' },
      { name: 'ssh_key_name', type: 'string', required: true, description: 'SSH public key name from vault' }
    ]
  },
  {
    id: 'app-deploy-k8s',
    name: 'Application Deployment Pipeline',
    description: 'End-to-end application deployment with Day 0 operations including repository creation, CI/CD pipeline setup, monitoring, logging, and security scanning.',
    category: 'Application',
    status: 'active',
    icon: 'rocket',
    tags: ['deployment', 'cicd', 'monitoring', 'security', 'gitops'],
    owner: 'devops-team',
    team: 'Developer Experience',
    version: '1.5.0',
    lastUpdated: '2025-01-07',
    documentation: 'https://docs.internal/app-deploy',
    estimatedTime: '15-20 minutes',
    prerequisites: [
      'Application architecture reviewed',
      'Container image specifications defined',
      'Target namespace provisioned',
      'Team onboarded to GitOps workflow'
    ],
    features: [
      'GitHub/GitLab repository scaffolding',
      'CI/CD pipeline (GitHub Actions/GitLab CI)',
      'Container image build & push',
      'Kubernetes manifests generation',
      'Prometheus/Grafana monitoring setup',
      'ELK/Loki logging integration',
      'SonarQube code quality scans',
      'Trivy container security scans',
      'Automated secrets management',
      'ArgoCD GitOps deployment'
    ],
    parameters: [
      { name: 'app_name', type: 'string', required: true, description: 'Application name (will be used for repo, deployments, etc.)' },
      { name: 'git_provider', type: 'select', required: true, description: 'Git provider', options: ['GitHub', 'GitLab'] },
      { name: 'language', type: 'select', required: true, description: 'Primary programming language', options: ['Node.js', 'Python', 'Java', 'Go', '.NET', 'Ruby'] },
      { name: 'target_namespace', type: 'string', required: true, description: 'Kubernetes namespace for deployment' },
      { name: 'replicas', type: 'number', required: true, description: 'Number of pod replicas' },
      { name: 'enable_monitoring', type: 'boolean', required: false, description: 'Enable Prometheus metrics & Grafana dashboards' },
      { name: 'enable_logging', type: 'boolean', required: false, description: 'Enable centralized logging' },
      { name: 'enable_security_scans', type: 'boolean', required: false, description: 'Enable SAST/DAST security scans' }
    ]
  },
  {
    id: 'cloud-vending-machine',
    name: 'Cloud Vending Machine',
    description: 'Self-service provisioning of a new cloud tenancy — an Azure Subscription, GCP Project, or AWS Account — with guardrails, baseline policies, networking, tagging, and FinOps onboarding pre-applied.',
    category: 'Infrastructure',
    status: 'active',
    icon: 'cloud',
    tags: ['cloud', 'subscription', 'project', 'account', 'landing-zone', 'governance'],
    owner: 'cloud-architects',
    team: 'Cloud Architects',
    version: '1.0.0',
    lastUpdated: '2025-05-06',
    documentation: 'https://docs.internal/cloud-vending-machine',
    estimatedTime: '20-30 minutes',
    prerequisites: [
      'Approved business unit and cost center',
      'Cloud Architect review for non-standard requests',
      'Valid budget allocation in FinOps system',
      'Tagging policy acknowledgement'
    ],
    features: [
      'Multi-cloud tenancy creation (Azure Subscription / GCP Project / AWS Account)',
      'Landing zone baseline (networking, IAM, logging)',
      'Automated cost-center and business-unit tagging',
      'Budget alerts and FinOps onboarding',
      'Policy guardrails and security baselines',
      'ServiceNow change record auto-creation',
      'Hand-off to owning team with RBAC pre-configured'
    ],
    parameters: [
      { name: 'tenancy_name', type: 'string', required: true, description: 'Name for the new subscription / project / account' },
      { name: 'cloud_provider', type: 'select', required: true, description: 'Target cloud provider', options: ['Azure', 'Google Cloud', 'AWS'] },
      { name: 'tenancy_type', type: 'select', required: true, description: 'Type of cloud tenancy to provision', options: ['Azure Subscription', 'GCP Project', 'AWS Account'] },
      { name: 'environment', type: 'select', required: true, description: 'Environment classification', options: ['production', 'staging', 'development', 'sandbox'] },
      { name: 'business_unit', type: 'select', required: true, description: 'Owning business unit', options: ['Retail Banking', 'Corporate Banking', 'Wealth Management', 'Insurance', 'Technology', 'Shared Services'] },
      { name: 'department', type: 'select', required: true, description: 'Owning department', options: ['Engineering', 'Data & Analytics', 'Security', 'Operations', 'Risk & Compliance', 'Marketing'] },
      { name: 'cost_center', type: 'string', required: true, description: 'Finance cost center code (e.g., CC-10245)' },
      { name: 'monthly_budget_usd', type: 'number', required: true, description: 'Monthly budget cap in USD for alerts and chargeback' },
      { name: 'owning_team', type: 'string', required: true, description: 'Team that will own the tenancy after provisioning' },
      { name: 'enable_landing_zone', type: 'boolean', required: false, description: 'Apply standard landing zone (networking, IAM, logging baseline)' }
    ]
  }
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};
