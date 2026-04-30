export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  escalationLevel: number;
  phone?: string;
}

export interface Repository {
  name: string;
  url: string;
  description: string;
  language: string;
  lastUpdated: string;
}

export interface Documentation {
  title: string;
  url: string;
  type: 'runbook' | 'architecture' | 'onboarding' | 'policy';
  summary?: string;
  team?: string;
  topics?: string[];
  catalogRefs?: string[];
  author?: string;
  updatedAt?: string;
}

export interface CloudAccount {
  provider: 'aws' | 'azure' | 'gcp';
  accountId: string;
  name: string;
  environment: 'production' | 'staging' | 'development';
  monthlySpend: number;
}

export interface ADGroup {
  name: string;
  type: 'security' | 'distribution' | 'role';
  memberCount: number;
  description: string;
}

export interface ServiceAccount {
  name: string;
  provider: 'aws' | 'azure' | 'gcp' | 'kubernetes';
  purpose: string;
  lastRotated: string;
}

export interface Training {
  id: string;
  title: string;
  description: string;
  duration: string;
  xpReward: number;
  completed: boolean;
  category: 'required' | 'recommended' | 'advanced';
  badge?: string;
}

export interface Incident {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'investigating' | 'resolved';
  createdAt: string;
  assignee: string;
}

export interface Change {
  id: string;
  title: string;
  type: 'standard' | 'normal' | 'emergency';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  scheduledDate: string;
  owner: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
  members: TeamMember[];
  repositories: Repository[];
  documentation: Documentation[];
  cloudAccounts: CloudAccount[];
  adGroups: ADGroup[];
  serviceAccounts: ServiceAccount[];
  trainings: Training[];
  incidents: Incident[];
  changes: Change[];
  slackChannel: string;
  onCallRotation: string;
}

export const teams: Team[] = [
  {
    id: 'infrastructure-platform',
    name: 'Infrastructure Platform Engineering',
    shortName: 'IPE',
    description: 'Designs and maintains the core infrastructure platform, including Kubernetes clusters, CI/CD pipelines, and developer tooling.',
    icon: 'Server',
    color: 'from-blue-500 to-cyan-500',
    slackChannel: '#infra-platform',
    onCallRotation: 'Weekly rotation - Fridays',
    members: [
      { id: '1', name: 'Sarah Chen', role: 'Principal Engineer', email: 'sarah.chen@company.com', avatar: 'SC', escalationLevel: 1, phone: '+1-555-0101' },
      { id: '2', name: 'Marcus Johnson', role: 'Senior Platform Engineer', email: 'marcus.j@company.com', avatar: 'MJ', escalationLevel: 2 },
      { id: '3', name: 'Priya Patel', role: 'Platform Engineer', email: 'priya.p@company.com', avatar: 'PP', escalationLevel: 3 },
      { id: '4', name: 'Alex Rivera', role: 'Platform Engineer', email: 'alex.r@company.com', avatar: 'AR', escalationLevel: 3 },
      { id: '5', name: 'Jordan Kim', role: 'Junior Engineer', email: 'jordan.k@company.com', avatar: 'JK', escalationLevel: 4 },
    ],
    repositories: [
      { name: 'platform-terraform-modules', url: 'https://github.com/company/platform-terraform-modules', description: 'Shared Terraform modules for infrastructure', language: 'HCL', lastUpdated: '2 hours ago' },
      { name: 'k8s-cluster-config', url: 'https://github.com/company/k8s-cluster-config', description: 'Kubernetes cluster configurations and GitOps', language: 'YAML', lastUpdated: '1 day ago' },
      { name: 'cicd-templates', url: 'https://github.com/company/cicd-templates', description: 'Reusable CI/CD pipeline templates', language: 'YAML', lastUpdated: '3 days ago' },
      { name: 'platform-cli', url: 'https://github.com/company/platform-cli', description: 'Internal CLI tool for developers', language: 'Go', lastUpdated: '1 week ago' },
    ],
    documentation: [
      { title: 'Platform Onboarding Guide', url: '/docs/onboarding', type: 'onboarding', summary: 'Step-by-step guide for new engineers joining the platform team.', team: 'Infrastructure Platform Engineering', topics: ['onboarding', 'kubernetes', 'cicd'], catalogRefs: ['svc-k8s-namespace', 'svc-app-deployment'], author: 'Sarah Chen', updatedAt: '2024-04-12' },
      { title: 'Kubernetes Cluster Architecture', url: '/docs/k8s-arch', type: 'architecture', summary: 'Multi-region AKS/GKE topology, networking, and ingress design.', team: 'Infrastructure Platform Engineering', topics: ['kubernetes', 'networking', 'architecture'], catalogRefs: ['svc-k8s-namespace'], author: 'Marcus Johnson', updatedAt: '2024-04-22' },
      { title: 'Incident Response Runbook', url: '/docs/incident-runbook', type: 'runbook', summary: 'Triage, escalation paths, and rollback procedures for platform incidents.', team: 'Infrastructure Platform Engineering', topics: ['incident-response', 'sre', 'runbook'], catalogRefs: [], author: 'Priya Patel', updatedAt: '2024-04-18' },
      { title: 'Platform Security Policies', url: '/docs/security', type: 'policy', summary: 'RBAC, secrets management, and image scanning standards.', team: 'Infrastructure Platform Engineering', topics: ['security', 'compliance', 'rbac'], catalogRefs: ['svc-k8s-namespace'], author: 'Sarah Chen', updatedAt: '2024-04-05' },
      { title: 'CI/CD Template Catalog', url: '/docs/cicd-templates', type: 'architecture', summary: 'Reusable pipeline templates for build, test, and deploy.', team: 'Infrastructure Platform Engineering', topics: ['cicd', 'pipelines', 'templates'], catalogRefs: ['svc-app-deployment'], author: 'Alex Rivera', updatedAt: '2024-04-25' },
      { title: 'Terraform Module Standards', url: '/docs/tf-modules', type: 'policy', summary: 'Module structure, versioning, and contribution guidelines for shared IaC.', team: 'Infrastructure Platform Engineering', topics: ['terraform', 'iac', 'standards'], catalogRefs: ['svc-vm-provisioning'], author: 'Marcus Johnson', updatedAt: '2024-04-28' },
      { title: 'Cluster Upgrade Runbook', url: '/docs/cluster-upgrade', type: 'runbook', summary: 'Zero-downtime upgrade procedure for AKS/GKE control planes and node pools.', team: 'Infrastructure Platform Engineering', topics: ['kubernetes', 'upgrade', 'runbook'], catalogRefs: ['svc-k8s-namespace'], author: 'Priya Patel', updatedAt: '2024-04-30' },
      { title: 'Developer Self-Service Portal Guide', url: '/docs/devportal', type: 'onboarding', summary: 'How to use DevPortal to provision namespaces, VMs, and deploy apps.', team: 'Infrastructure Platform Engineering', topics: ['onboarding', 'devportal', 'self-service'], catalogRefs: ['svc-k8s-namespace', 'svc-vm-provisioning', 'svc-app-deployment'], author: 'Jordan Kim', updatedAt: '2024-05-01' },
      { title: 'Service Mesh Architecture (Istio)', url: '/docs/service-mesh', type: 'architecture', summary: 'mTLS, traffic policies, and observability via Istio across clusters.', team: 'Infrastructure Platform Engineering', topics: ['service-mesh', 'istio', 'networking'], catalogRefs: ['svc-app-deployment'], author: 'Sarah Chen', updatedAt: '2024-04-14' },
      { title: 'Secrets Management Standard', url: '/docs/secrets', type: 'policy', summary: 'Vault integration, rotation cadence, and break-glass procedures.', team: 'Infrastructure Platform Engineering', topics: ['security', 'secrets', 'vault'], catalogRefs: [], author: 'Alex Rivera', updatedAt: '2024-04-07' },
      { title: 'GitOps with ArgoCD Playbook', url: '/docs/gitops-argocd', type: 'runbook', summary: 'Application sync, rollback, and progressive delivery patterns.', team: 'Infrastructure Platform Engineering', topics: ['gitops', 'argocd', 'cicd'], catalogRefs: ['svc-app-deployment'], author: 'Marcus Johnson', updatedAt: '2024-04-29' },
    ],
    cloudAccounts: [
      { provider: 'aws', accountId: '123456789012', name: 'Platform-Prod', environment: 'production', monthlySpend: 45000 },
      { provider: 'aws', accountId: '234567890123', name: 'Platform-Staging', environment: 'staging', monthlySpend: 12000 },
      { provider: 'azure', accountId: 'sub-platform-001', name: 'Platform-Core', environment: 'production', monthlySpend: 28000 },
      { provider: 'gcp', accountId: 'platform-gcp-prod', name: 'Platform-GCP', environment: 'production', monthlySpend: 18000 },
    ],
    adGroups: [
      { name: 'SG-Platform-Engineers', type: 'security', memberCount: 12, description: 'Platform team access group' },
      { name: 'SG-K8s-Admins', type: 'security', memberCount: 5, description: 'Kubernetes cluster administrators' },
      { name: 'DL-Platform-Team', type: 'distribution', memberCount: 15, description: 'Platform team distribution list' },
    ],
    serviceAccounts: [
      { name: 'sa-terraform-prod', provider: 'aws', purpose: 'Terraform automation for production', lastRotated: '2024-01-15' },
      { name: 'sa-k8s-deployer', provider: 'kubernetes', purpose: 'CI/CD deployments to clusters', lastRotated: '2024-01-10' },
      { name: 'sa-monitoring', provider: 'gcp', purpose: 'Monitoring and alerting services', lastRotated: '2024-01-05' },
    ],
    trainings: [
      { id: 't1', title: 'Kubernetes Fundamentals', description: 'Core concepts of container orchestration', duration: '4 hours', xpReward: 500, completed: true, category: 'required', badge: '🎯' },
      { id: 't2', title: 'Terraform Mastery', description: 'Infrastructure as Code best practices', duration: '6 hours', xpReward: 750, completed: true, category: 'required', badge: '🏗️' },
      { id: 't3', title: 'GitOps with ArgoCD', description: 'Continuous deployment patterns', duration: '3 hours', xpReward: 400, completed: false, category: 'required' },
      { id: 't4', title: 'Platform Security', description: 'Security hardening and compliance', duration: '5 hours', xpReward: 600, completed: false, category: 'recommended', badge: '🛡️' },
      { id: 't5', title: 'SRE Principles', description: 'Site Reliability Engineering practices', duration: '8 hours', xpReward: 1000, completed: false, category: 'advanced', badge: '⚡' },
    ],
    incidents: [
      { id: 'INC-001', title: 'High latency in prod cluster', severity: 'high', status: 'investigating', createdAt: '2024-01-20T10:30:00Z', assignee: 'Marcus Johnson' },
      { id: 'INC-002', title: 'Certificate expiry warning', severity: 'medium', status: 'open', createdAt: '2024-01-19T14:00:00Z', assignee: 'Priya Patel' },
    ],
    changes: [
      { id: 'CHG-101', title: 'Upgrade Kubernetes to 1.29', type: 'normal', status: 'scheduled', scheduledDate: '2024-01-25', owner: 'Sarah Chen' },
      { id: 'CHG-102', title: 'Add new node pool for ML workloads', type: 'standard', status: 'in-progress', scheduledDate: '2024-01-21', owner: 'Alex Rivera' },
    ],
  },
  {
    id: 'cloud-modernization',
    name: 'Cloud Modernization',
    shortName: 'CM',
    description: 'Leads cloud migration initiatives, containerization strategies, and application modernization efforts across the organization.',
    icon: 'Cloud',
    color: 'from-purple-500 to-pink-500',
    slackChannel: '#cloud-modernization',
    onCallRotation: 'Bi-weekly rotation - Mondays',
    members: [
      { id: '6', name: 'David Thompson', role: 'Cloud Architect', email: 'david.t@company.com', avatar: 'DT', escalationLevel: 1, phone: '+1-555-0201' },
      { id: '7', name: 'Emily Watson', role: 'Senior Cloud Engineer', email: 'emily.w@company.com', avatar: 'EW', escalationLevel: 2 },
      { id: '8', name: 'Raj Sharma', role: 'Cloud Engineer', email: 'raj.s@company.com', avatar: 'RS', escalationLevel: 3 },
      { id: '9', name: 'Lisa Chang', role: 'Cloud Engineer', email: 'lisa.c@company.com', avatar: 'LC', escalationLevel: 3 },
    ],
    repositories: [
      { name: 'migration-playbooks', url: 'https://github.com/company/migration-playbooks', description: 'Cloud migration patterns and playbooks', language: 'Markdown', lastUpdated: '4 hours ago' },
      { name: 'containerization-toolkit', url: 'https://github.com/company/containerization-toolkit', description: 'Tools for containerizing legacy apps', language: 'Python', lastUpdated: '2 days ago' },
      { name: 'cloud-patterns', url: 'https://github.com/company/cloud-patterns', description: 'Reference architectures and patterns', language: 'HCL', lastUpdated: '1 week ago' },
    ],
    documentation: [
      { title: 'Migration Assessment Framework', url: '/docs/migration-framework', type: 'architecture', summary: '6Rs assessment, dependency mapping, and wave planning.', team: 'Cloud Modernization', topics: ['migration', 'assessment', 'architecture'], catalogRefs: ['svc-vm-provisioning'], author: 'David Thompson', updatedAt: '2024-04-20' },
      { title: 'Containerization Playbook', url: '/docs/containerization', type: 'runbook', summary: 'Step-by-step containerization of legacy Java and .NET apps.', team: 'Cloud Modernization', topics: ['containers', 'docker', 'modernization'], catalogRefs: ['svc-app-deployment'], author: 'Emily Watson', updatedAt: '2024-04-15' },
      { title: 'Cloud Readiness Checklist', url: '/docs/readiness', type: 'onboarding', summary: 'Pre-migration checks for security, networking, and cost.', team: 'Cloud Modernization', topics: ['onboarding', 'migration', 'checklist'], catalogRefs: [], author: 'Raj Sharma', updatedAt: '2024-04-09' },
      { title: 'Landing Zone Reference Architecture', url: '/docs/landing-zone', type: 'architecture', summary: 'AWS Control Tower & Azure Landing Zone blueprints.', team: 'Cloud Modernization', topics: ['landing-zone', 'aws', 'azure', 'architecture'], catalogRefs: ['svc-vm-provisioning'], author: 'Lisa Chang', updatedAt: '2024-04-23' },
      { title: 'Database Migration Runbook', url: '/docs/db-migration', type: 'runbook', summary: 'Schema conversion, CDC replication, and cutover procedures using DMS.', team: 'Cloud Modernization', topics: ['migration', 'database', 'runbook'], catalogRefs: ['svc-vm-provisioning'], author: 'Raj Sharma', updatedAt: '2024-04-26' },
      { title: 'App Refactoring Patterns', url: '/docs/refactor-patterns', type: 'architecture', summary: 'Strangler fig, anti-corruption layer, and event-driven decomposition.', team: 'Cloud Modernization', topics: ['modernization', 'patterns', 'architecture'], catalogRefs: ['svc-app-deployment'], author: 'Emily Watson', updatedAt: '2024-04-30' },
      { title: 'Multi-Cloud Networking Policy', url: '/docs/multicloud-net', type: 'policy', summary: 'Transit Gateway, ExpressRoute, and Interconnect standards.', team: 'Cloud Modernization', topics: ['networking', 'multicloud', 'policy'], catalogRefs: [], author: 'David Thompson', updatedAt: '2024-04-11' },
      { title: 'New Joiner Migration Bootcamp', url: '/docs/migration-bootcamp', type: 'onboarding', summary: 'Two-week ramp-up program with hands-on labs.', team: 'Cloud Modernization', topics: ['onboarding', 'training', 'migration'], catalogRefs: [], author: 'Lisa Chang', updatedAt: '2024-05-02' },
      { title: 'Lift-and-Shift Runbook', url: '/docs/lift-and-shift', type: 'runbook', summary: 'Rehost workloads using AWS MGN and Azure Migrate.', team: 'Cloud Modernization', topics: ['migration', 'rehost', 'runbook'], catalogRefs: ['svc-vm-provisioning'], author: 'Raj Sharma', updatedAt: '2024-04-17' },
    ],
    cloudAccounts: [
      { provider: 'aws', accountId: '345678901234', name: 'Migration-Sandbox', environment: 'development', monthlySpend: 8000 },
      { provider: 'azure', accountId: 'sub-modernization-001', name: 'Modernization-Dev', environment: 'development', monthlySpend: 6500 },
      { provider: 'gcp', accountId: 'modernization-gcp', name: 'GCP-Migration', environment: 'staging', monthlySpend: 9200 },
    ],
    adGroups: [
      { name: 'SG-Cloud-Modernization', type: 'security', memberCount: 8, description: 'Cloud modernization team access' },
      { name: 'SG-Migration-Tools', type: 'security', memberCount: 15, description: 'Migration tools access' },
    ],
    serviceAccounts: [
      { name: 'sa-migration-automation', provider: 'aws', purpose: 'Automated migration workflows', lastRotated: '2024-01-12' },
      { name: 'sa-container-registry', provider: 'azure', purpose: 'Container registry access', lastRotated: '2024-01-08' },
    ],
    trainings: [
      { id: 't6', title: 'Cloud Migration Strategies', description: '6 Rs of cloud migration', duration: '5 hours', xpReward: 600, completed: true, category: 'required', badge: '☁️' },
      { id: 't7', title: 'Docker & Containerization', description: 'Container fundamentals', duration: '4 hours', xpReward: 500, completed: false, category: 'required' },
      { id: 't8', title: 'AWS Well-Architected', description: 'AWS best practices framework', duration: '6 hours', xpReward: 700, completed: false, category: 'recommended', badge: '🏛️' },
      { id: 't9', title: 'Azure Landing Zones', description: 'Enterprise-scale architecture', duration: '5 hours', xpReward: 650, completed: false, category: 'advanced' },
    ],
    incidents: [
      { id: 'INC-003', title: 'Migration job failed - DB sync', severity: 'medium', status: 'open', createdAt: '2024-01-20T08:00:00Z', assignee: 'Raj Sharma' },
    ],
    changes: [
      { id: 'CHG-201', title: 'Migrate legacy app to containers', type: 'normal', status: 'in-progress', scheduledDate: '2024-01-22', owner: 'Emily Watson' },
      { id: 'CHG-202', title: 'Update migration toolkit v2.5', type: 'standard', status: 'scheduled', scheduledDate: '2024-01-28', owner: 'David Thompson' },
    ],
  },
  {
    id: 'cloud-operations',
    name: 'Cloud Operations',
    shortName: 'CloudOps',
    description: 'Manages day-to-day cloud operations, monitoring, incident response, and ensures reliability across all cloud environments.',
    icon: 'Activity',
    color: 'from-green-500 to-emerald-500',
    slackChannel: '#cloud-ops',
    onCallRotation: '24/7 rotation - Daily handoffs',
    members: [
      { id: '10', name: 'Michael Brown', role: 'SRE Lead', email: 'michael.b@company.com', avatar: 'MB', escalationLevel: 1, phone: '+1-555-0301' },
      { id: '11', name: 'Anna Kowalski', role: 'Senior SRE', email: 'anna.k@company.com', avatar: 'AK', escalationLevel: 2, phone: '+1-555-0302' },
      { id: '12', name: 'James Wilson', role: 'Cloud Operations Engineer', email: 'james.w@company.com', avatar: 'JW', escalationLevel: 3 },
      { id: '13', name: 'Sophie Martinez', role: 'Cloud Operations Engineer', email: 'sophie.m@company.com', avatar: 'SM', escalationLevel: 3 },
      { id: '14', name: 'Kevin Lee', role: 'Junior SRE', email: 'kevin.l@company.com', avatar: 'KL', escalationLevel: 4 },
      { id: '15', name: 'Rachel Green', role: 'Junior SRE', email: 'rachel.g@company.com', avatar: 'RG', escalationLevel: 4 },
    ],
    repositories: [
      { name: 'monitoring-configs', url: 'https://github.com/company/monitoring-configs', description: 'Prometheus and Grafana configurations', language: 'YAML', lastUpdated: '1 hour ago' },
      { name: 'alerting-rules', url: 'https://github.com/company/alerting-rules', description: 'Alerting rules and thresholds', language: 'YAML', lastUpdated: '6 hours ago' },
      { name: 'runbooks', url: 'https://github.com/company/runbooks', description: 'Operational runbooks for incidents', language: 'Markdown', lastUpdated: '1 day ago' },
      { name: 'automation-scripts', url: 'https://github.com/company/automation-scripts', description: 'Operational automation scripts', language: 'Python', lastUpdated: '3 days ago' },
    ],
    documentation: [
      { title: 'Incident Management Process', url: '/docs/incident-mgmt', type: 'runbook', summary: 'Severity matrix, comms templates, and post-mortem workflow.', team: 'Cloud Operations', topics: ['incident-response', 'sre', 'process'], catalogRefs: [], author: 'Michael Brown', updatedAt: '2024-04-26' },
      { title: 'Monitoring & Observability Architecture', url: '/docs/monitoring-arch', type: 'architecture', summary: 'Prometheus, Grafana, Loki, and OTEL pipeline overview.', team: 'Cloud Operations', topics: ['monitoring', 'observability', 'architecture'], catalogRefs: ['svc-app-deployment'], author: 'Anna Kowalski', updatedAt: '2024-04-19' },
      { title: 'On-Call Handbook', url: '/docs/oncall', type: 'onboarding', summary: 'Rotation rules, paging, and runbook conventions for new on-callers.', team: 'Cloud Operations', topics: ['onboarding', 'oncall', 'sre'], catalogRefs: [], author: 'James Wilson', updatedAt: '2024-04-11' },
      { title: 'SLA / SLO Definitions', url: '/docs/sla-slo', type: 'policy', summary: 'Service tier definitions and error budget policy.', team: 'Cloud Operations', topics: ['sla', 'slo', 'policy', 'reliability'], catalogRefs: ['svc-k8s-namespace', 'svc-app-deployment'], author: 'Michael Brown', updatedAt: '2024-04-03' },
      { title: 'Alerting Rules Catalog', url: '/docs/alerting-catalog', type: 'runbook', summary: 'Standard alert rules with thresholds and remediation links.', team: 'Cloud Operations', topics: ['alerting', 'monitoring', 'runbook'], catalogRefs: [], author: 'Sophie Martinez', updatedAt: '2024-04-24' },
      { title: 'Post-Mortem Template & Examples', url: '/docs/postmortem', type: 'runbook', summary: 'Blameless template with timeline, RCA, and action items.', team: 'Cloud Operations', topics: ['incident-response', 'postmortem', 'sre'], catalogRefs: [], author: 'Anna Kowalski', updatedAt: '2024-04-28' },
      { title: 'Disaster Recovery Plan', url: '/docs/dr-plan', type: 'policy', summary: 'RTO/RPO targets, failover regions, and quarterly DR drills.', team: 'Cloud Operations', topics: ['dr', 'reliability', 'policy'], catalogRefs: ['svc-vm-provisioning'], author: 'Michael Brown', updatedAt: '2024-04-06' },
      { title: 'Chaos Engineering Playbook', url: '/docs/chaos', type: 'runbook', summary: 'GameDay scenarios, blast radius controls, and tooling.', team: 'Cloud Operations', topics: ['chaos', 'reliability', 'runbook'], catalogRefs: ['svc-app-deployment'], author: 'Kevin Lee', updatedAt: '2024-04-30' },
      { title: 'Logging Pipeline Architecture', url: '/docs/logging-arch', type: 'architecture', summary: 'Fluent Bit → Loki → S3 cold storage with retention tiers.', team: 'Cloud Operations', topics: ['logging', 'observability', 'architecture'], catalogRefs: [], author: 'Sophie Martinez', updatedAt: '2024-04-13' },
      { title: 'Paging & Escalation Policy', url: '/docs/paging', type: 'policy', summary: 'PagerDuty service mappings, escalation tiers, and quiet hours.', team: 'Cloud Operations', topics: ['oncall', 'pagerduty', 'policy'], catalogRefs: [], author: 'James Wilson', updatedAt: '2024-04-09' },
      { title: 'New SRE Onboarding Checklist', url: '/docs/sre-onboarding', type: 'onboarding', summary: 'Tooling access, shadow rotations, and first-30-days plan.', team: 'Cloud Operations', topics: ['onboarding', 'sre', 'checklist'], catalogRefs: [], author: 'Rachel Green', updatedAt: '2024-05-01' },
    ],
    cloudAccounts: [
      { provider: 'aws', accountId: '456789012345', name: 'Monitoring-Central', environment: 'production', monthlySpend: 15000 },
      { provider: 'azure', accountId: 'sub-ops-monitoring', name: 'Azure-Monitor', environment: 'production', monthlySpend: 12000 },
      { provider: 'gcp', accountId: 'ops-logging-gcp', name: 'GCP-Logging', environment: 'production', monthlySpend: 8500 },
      { provider: 'aws', accountId: '567890123456', name: 'Ops-Tools', environment: 'production', monthlySpend: 5000 },
    ],
    adGroups: [
      { name: 'SG-CloudOps-Team', type: 'security', memberCount: 10, description: 'Cloud operations team access' },
      { name: 'SG-OnCall-Engineers', type: 'security', memberCount: 8, description: 'On-call rotation members' },
      { name: 'SG-Incident-Responders', type: 'role', memberCount: 12, description: 'Incident response role' },
    ],
    serviceAccounts: [
      { name: 'sa-prometheus', provider: 'kubernetes', purpose: 'Prometheus metrics collection', lastRotated: '2024-01-18' },
      { name: 'sa-pagerduty-integration', provider: 'aws', purpose: 'PagerDuty alerting integration', lastRotated: '2024-01-14' },
      { name: 'sa-log-aggregator', provider: 'gcp', purpose: 'Centralized logging', lastRotated: '2024-01-10' },
    ],
    trainings: [
      { id: 't10', title: 'Incident Response 101', description: 'Fundamentals of incident management', duration: '3 hours', xpReward: 400, completed: true, category: 'required', badge: '🚨' },
      { id: 't11', title: 'Prometheus & Grafana', description: 'Monitoring and visualization', duration: '5 hours', xpReward: 600, completed: true, category: 'required', badge: '📊' },
      { id: 't12', title: 'On-Call Best Practices', description: 'Effective on-call rotations', duration: '2 hours', xpReward: 300, completed: false, category: 'required' },
      { id: 't13', title: 'Chaos Engineering', description: 'Building resilient systems', duration: '6 hours', xpReward: 800, completed: false, category: 'advanced', badge: '💥' },
    ],
    incidents: [
      { id: 'INC-004', title: 'Elevated error rates - API gateway', severity: 'critical', status: 'investigating', createdAt: '2024-01-20T11:45:00Z', assignee: 'Anna Kowalski' },
      { id: 'INC-005', title: 'Disk usage warning - logging cluster', severity: 'medium', status: 'open', createdAt: '2024-01-20T09:15:00Z', assignee: 'James Wilson' },
      { id: 'INC-006', title: 'Intermittent network timeouts', severity: 'low', status: 'investigating', createdAt: '2024-01-19T16:30:00Z', assignee: 'Sophie Martinez' },
    ],
    changes: [
      { id: 'CHG-301', title: 'Upgrade Prometheus to v2.48', type: 'standard', status: 'scheduled', scheduledDate: '2024-01-26', owner: 'Michael Brown' },
      { id: 'CHG-302', title: 'Implement new alerting thresholds', type: 'normal', status: 'in-progress', scheduledDate: '2024-01-21', owner: 'Anna Kowalski' },
    ],
  },
  {
    id: 'finops-swam',
    name: 'FinOps & SWAM',
    shortName: 'FinOps',
    description: 'Manages cloud cost optimization, software asset management, license compliance, and financial governance across all cloud platforms.',
    icon: 'DollarSign',
    color: 'from-amber-500 to-orange-500',
    slackChannel: '#finops',
    onCallRotation: 'Business hours only',
    members: [
      { id: '16', name: 'Jennifer Adams', role: 'FinOps Lead', email: 'jennifer.a@company.com', avatar: 'JA', escalationLevel: 1, phone: '+1-555-0401' },
      { id: '17', name: 'Robert Taylor', role: 'Senior FinOps Analyst', email: 'robert.t@company.com', avatar: 'RT', escalationLevel: 2 },
      { id: '18', name: 'Michelle Park', role: 'SWAM Specialist', email: 'michelle.p@company.com', avatar: 'MP', escalationLevel: 2 },
      { id: '19', name: 'Chris Anderson', role: 'FinOps Analyst', email: 'chris.a@company.com', avatar: 'CA', escalationLevel: 3 },
    ],
    repositories: [
      { name: 'cost-allocation-tags', url: 'https://github.com/company/cost-allocation-tags', description: 'Tagging standards and automation', language: 'Python', lastUpdated: '5 hours ago' },
      { name: 'finops-dashboards', url: 'https://github.com/company/finops-dashboards', description: 'Cost visualization dashboards', language: 'JavaScript', lastUpdated: '2 days ago' },
      { name: 'license-tracker', url: 'https://github.com/company/license-tracker', description: 'Software license management tool', language: 'TypeScript', lastUpdated: '1 week ago' },
    ],
    documentation: [
      { title: 'Cost Allocation & Tagging Guidelines', url: '/docs/cost-allocation', type: 'policy', summary: 'Mandatory tags, hierarchy, and showback model.', team: 'FinOps & SWAM', topics: ['finops', 'tagging', 'policy'], catalogRefs: [], author: 'Jennifer Adams', updatedAt: '2024-04-21' },
      { title: 'Software Procurement Process', url: '/docs/procurement', type: 'runbook', summary: 'Intake, approvals, and vendor onboarding workflow.', team: 'FinOps & SWAM', topics: ['procurement', 'swam', 'process'], catalogRefs: [], author: 'Michelle Park', updatedAt: '2024-04-08' },
      { title: 'FinOps Framework Overview', url: '/docs/finops-framework', type: 'architecture', summary: 'Inform, optimize, operate phases applied to our org.', team: 'FinOps & SWAM', topics: ['finops', 'framework', 'architecture'], catalogRefs: [], author: 'Robert Taylor', updatedAt: '2024-04-17' },
      { title: 'License Compliance Guide', url: '/docs/license-compliance', type: 'policy', summary: 'True-up cycles, audits, and BYOL guidance.', team: 'FinOps & SWAM', topics: ['licensing', 'compliance', 'swam'], catalogRefs: [], author: 'Michelle Park', updatedAt: '2024-04-02' },
      { title: 'FinOps Score Methodology', url: '/docs/finops-score', type: 'architecture', summary: 'How application FinOps scores are calculated and improved.', team: 'FinOps & SWAM', topics: ['finops', 'scoring', 'optimization'], catalogRefs: ['svc-vm-provisioning'], author: 'Chris Anderson', updatedAt: '2024-04-27' },
      { title: 'Reserved Instance & Savings Plan Guide', url: '/docs/ri-sp', type: 'runbook', summary: 'Commitment-based discount strategy and renewal cadence.', team: 'FinOps & SWAM', topics: ['finops', 'aws', 'optimization'], catalogRefs: ['svc-vm-provisioning'], author: 'Robert Taylor', updatedAt: '2024-04-29' },
      { title: 'Idle Resource Cleanup Runbook', url: '/docs/idle-cleanup', type: 'runbook', summary: 'Identify and decommission unattached disks, idle VMs, and stale snapshots.', team: 'FinOps & SWAM', topics: ['finops', 'cleanup', 'optimization'], catalogRefs: ['svc-vm-provisioning'], author: 'Chris Anderson', updatedAt: '2024-05-02' },
      { title: 'Showback & Chargeback Model', url: '/docs/showback', type: 'architecture', summary: 'Cost attribution flow from cloud bill to BU-level chargeback.', team: 'FinOps & SWAM', topics: ['finops', 'chargeback', 'architecture'], catalogRefs: [], author: 'Jennifer Adams', updatedAt: '2024-04-14' },
      { title: 'FinOps Onboarding for Engineers', url: '/docs/finops-onboarding', type: 'onboarding', summary: 'How engineering teams can read dashboards and act on recommendations.', team: 'FinOps & SWAM', topics: ['onboarding', 'finops', 'training'], catalogRefs: [], author: 'Robert Taylor', updatedAt: '2024-04-10' },
      { title: 'Budget & Forecast Policy', url: '/docs/budget-policy', type: 'policy', summary: 'Quarterly budget cycles, variance thresholds, and approval gates.', team: 'FinOps & SWAM', topics: ['finops', 'budget', 'policy'], catalogRefs: [], author: 'Jennifer Adams', updatedAt: '2024-04-04' },
      { title: 'Cost Anomaly Detection Runbook', url: '/docs/anomaly-detection', type: 'runbook', summary: 'Investigate alerts from anomaly detector and triage workflow.', team: 'FinOps & SWAM', topics: ['finops', 'anomaly', 'runbook'], catalogRefs: [], author: 'Chris Anderson', updatedAt: '2024-04-25' },
    ],
    cloudAccounts: [
      { provider: 'aws', accountId: '678901234567', name: 'FinOps-Management', environment: 'production', monthlySpend: 2500 },
      { provider: 'azure', accountId: 'sub-finops-central', name: 'CostMgmt-Azure', environment: 'production', monthlySpend: 1800 },
      { provider: 'gcp', accountId: 'billing-analytics-gcp', name: 'GCP-Billing', environment: 'production', monthlySpend: 1200 },
    ],
    adGroups: [
      { name: 'SG-FinOps-Team', type: 'security', memberCount: 6, description: 'FinOps team access' },
      { name: 'SG-Billing-Admins', type: 'security', memberCount: 4, description: 'Cloud billing administrators' },
      { name: 'SG-License-Managers', type: 'role', memberCount: 5, description: 'Software license managers' },
    ],
    serviceAccounts: [
      { name: 'sa-cost-exporter', provider: 'aws', purpose: 'Cost and usage data export', lastRotated: '2024-01-16' },
      { name: 'sa-billing-api', provider: 'azure', purpose: 'Azure billing API access', lastRotated: '2024-01-11' },
      { name: 'sa-bq-billing', provider: 'gcp', purpose: 'BigQuery billing exports', lastRotated: '2024-01-06' },
    ],
    trainings: [
      { id: 't14', title: 'FinOps Fundamentals', description: 'Cloud financial management basics', duration: '4 hours', xpReward: 500, completed: true, category: 'required', badge: '💰' },
      { id: 't15', title: 'AWS Cost Management', description: 'AWS billing and cost tools', duration: '3 hours', xpReward: 400, completed: false, category: 'required' },
      { id: 't16', title: 'Azure Cost Analysis', description: 'Azure cost management features', duration: '3 hours', xpReward: 400, completed: false, category: 'required' },
      { id: 't17', title: 'License Compliance', description: 'Software asset management', duration: '2 hours', xpReward: 300, completed: false, category: 'recommended', badge: '📜' },
      { id: 't18', title: 'Advanced Showback/Chargeback', description: 'Cost allocation strategies', duration: '4 hours', xpReward: 550, completed: false, category: 'advanced' },
    ],
    incidents: [
      { id: 'INC-007', title: 'Budget alert - Dev account overspend', severity: 'medium', status: 'open', createdAt: '2024-01-20T07:00:00Z', assignee: 'Chris Anderson' },
    ],
    changes: [
      { id: 'CHG-401', title: 'Implement new tagging policy', type: 'normal', status: 'scheduled', scheduledDate: '2024-01-24', owner: 'Jennifer Adams' },
      { id: 'CHG-402', title: 'Deploy cost anomaly detection', type: 'standard', status: 'in-progress', scheduledDate: '2024-01-21', owner: 'Robert Taylor' },
    ],
  },
];

export function getTeamById(id: string): Team | undefined {
  return teams.find((team) => team.id === id);
}
