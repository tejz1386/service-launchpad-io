export type PromptCategory = 'application' | 'business' | 'portfolio';

export interface QuickPrompt {
  id: string;
  category: PromptCategory;
  title: string;
  prompt: string;
}

export interface WorkflowStep {
  step: number;
  agent: string;
  action: string;
  source: string;
  durationMs: number;
  status: 'completed' | 'running' | 'queued';
}

export interface FinOpsResponse {
  summary: string;
  insights: string[];
  recommendations: { title: string; impact: string; savings: string }[];
  dataPoints?: { label: string; value: string }[];
  workflow: WorkflowStep[];
}

export const quickPrompts: QuickPrompt[] = [
  // Application
  {
    id: 'app-1',
    category: 'application',
    title: 'Top cost drivers for my app',
    prompt: 'What are the top cost drivers for the Customer Portal application this month?',
  },
  {
    id: 'app-2',
    category: 'application',
    title: 'Idle resources in my app',
    prompt: 'List all idle or underutilized resources in the Mobile App Backend.',
  },
  {
    id: 'app-3',
    category: 'application',
    title: 'Right-sizing opportunities',
    prompt: 'Identify right-sizing opportunities for VMs in the Payment Gateway application.',
  },
  // Business
  {
    id: 'biz-1',
    category: 'business',
    title: 'Spend trend by business',
    prompt: 'Show monthly spend trend for the Customer Experience business unit over the last 6 months.',
  },
  {
    id: 'biz-2',
    category: 'business',
    title: 'FinOps score breakdown',
    prompt: 'Why is the FinOps score for Lending Services below 70? What can we improve?',
  },
  {
    id: 'biz-3',
    category: 'business',
    title: 'Forecasted overrun',
    prompt: 'Which applications in Payment Processing are forecasted to exceed budget next quarter?',
  },
  // Portfolio
  {
    id: 'pf-1',
    category: 'portfolio',
    title: 'Portfolio savings summary',
    prompt: 'Summarize realized vs approved savings across the Digital Transformation portfolio.',
  },
  {
    id: 'pf-2',
    category: 'portfolio',
    title: 'Reserved instance coverage',
    prompt: 'What is the reserved instance coverage across all portfolios and where are the gaps?',
  },
  {
    id: 'pf-3',
    category: 'portfolio',
    title: 'Cross-cloud spend split',
    prompt: 'Compare spend distribution across AWS, Azure and GCP for the Core Banking portfolio.',
  },
];

export const demoResponses: Record<string, FinOpsResponse> = {
  'app-1': {
    summary:
      'Customer Portal spent $45,000 in December 2024. The top three cost drivers represent 78% of the total spend, mostly compute and database services in Azure.',
    insights: [
      'AKS cluster (aks-cluster-prod) accounts for 35% of monthly cost.',
      'Azure SQL Managed Instance grew 12% MoM driven by storage I/O.',
      'Egress traffic from Application Gateway increased 18% after the v3.4 release.',
    ],
    recommendations: [
      { title: 'Resize vm-portal-prod-01 (D4s_v3 → D2s_v3)', impact: 'Low risk', savings: '$800/mo' },
      { title: 'Purchase 1-year RIs for AKS node pool', impact: 'High', savings: '$2,550/mo' },
      { title: 'Enable CDN caching for static assets', impact: 'Medium', savings: '$420/mo' },
    ],
    dataPoints: [
      { label: 'Current spend', value: '$45,000' },
      { label: 'Forecast next month', value: '$46,000' },
      { label: 'FinOps score', value: '82 / 100' },
    ],
    workflow: [
      { step: 1, agent: 'Intent Parser', action: 'Detected scope: Application = Customer Portal', source: 'NLP classifier', durationMs: 180, status: 'completed' },
      { step: 2, agent: 'Catalog Resolver', action: 'Resolved app-1 from catalog registry', source: 'Catalog Service', durationMs: 95, status: 'completed' },
      { step: 3, agent: 'Cost Collector', action: 'Pulled 30 days of cost & usage data', source: 'Azure Cost Mgmt API', durationMs: 1240, status: 'completed' },
      { step: 4, agent: 'Anomaly Engine', action: 'Ranked top cost drivers via Pareto analysis', source: 'FinOps ML model v2.1', durationMs: 640, status: 'completed' },
      { step: 5, agent: 'Recommendation Engine', action: 'Generated 3 actionable recommendations', source: 'Rules + RI advisor', durationMs: 410, status: 'completed' },
      { step: 6, agent: 'Response Synthesizer', action: 'Composed natural-language answer', source: 'LLM (gemini-3-flash)', durationMs: 720, status: 'completed' },
    ],
  },
  'app-2': {
    summary: 'Identified 7 idle or underutilized resources in Mobile App Backend with combined potential savings of $9,180/month.',
    insights: [
      '1 orphaned managed disk (60+ days unattached): disk-backup-old-001.',
      '4 oversized VMs in batch-processing scale set with <15% avg CPU.',
      '2 dev databases running 24/7 with no traffic outside business hours.',
    ],
    recommendations: [
      { title: 'Delete disk-backup-old-001', impact: 'Low', savings: '$450/mo' },
      { title: 'Convert batch nodes to spot instances', impact: 'High', savings: '$7,200/mo' },
      { title: 'Auto-shutdown dev DBs nights/weekends', impact: 'Medium', savings: '$1,530/mo' },
    ],
    workflow: [
      { step: 1, agent: 'Intent Parser', action: 'Scope = idle resources, app = Mobile App Backend', source: 'NLP classifier', durationMs: 160, status: 'completed' },
      { step: 2, agent: 'Inventory Scanner', action: 'Listed 412 resources tagged app=mobile-backend', source: 'Azure Resource Graph', durationMs: 980, status: 'completed' },
      { step: 3, agent: 'Utilization Analyzer', action: 'Joined 14d metrics, flagged <20% utilization', source: 'Azure Monitor', durationMs: 1450, status: 'completed' },
      { step: 4, agent: 'Recommendation Engine', action: 'Mapped findings to remediation actions', source: 'FinOps Playbook', durationMs: 320, status: 'completed' },
      { step: 5, agent: 'Response Synthesizer', action: 'Composed final answer', source: 'LLM (gemini-3-flash)', durationMs: 690, status: 'completed' },
    ],
  },
  'app-3': {
    summary: 'Found 5 right-sizing opportunities in Payment Gateway with $3,150/month potential savings at low risk.',
    insights: [
      '3 D8s_v4 VMs running at 22% avg CPU — candidates for D4s_v4.',
      '1 Premium SSD over-provisioned at 1TB but using 180GB.',
      'App Service plan P3v3 can be downgraded to P2v3 outside peak hours.',
    ],
    recommendations: [
      { title: 'Downsize 3 VMs D8s_v4 → D4s_v4', impact: 'Low', savings: '$1,800/mo' },
      { title: 'Shrink Premium SSD to 256GB', impact: 'Low', savings: '$450/mo' },
      { title: 'Schedule App Service tier change', impact: 'Medium', savings: '$900/mo' },
    ],
    workflow: [
      { step: 1, agent: 'Intent Parser', action: 'Scope = right-sizing, app = Payment Gateway', source: 'NLP classifier', durationMs: 170, status: 'completed' },
      { step: 2, agent: 'Cost Collector', action: 'Pulled SKU pricing & usage', source: 'Azure Pricing API', durationMs: 1100, status: 'completed' },
      { step: 3, agent: 'Right-sizing Model', action: 'Computed optimal SKU per workload', source: 'ML model rs-v3', durationMs: 880, status: 'completed' },
      { step: 4, agent: 'Response Synthesizer', action: 'Composed recommendations', source: 'LLM (gemini-3-flash)', durationMs: 700, status: 'completed' },
    ],
  },
  'biz-1': {
    summary: 'Customer Experience spend grew from $128k (Jul) to $145k (Dec), a 13% increase, driven mainly by Customer Portal and Mobile Backend.',
    insights: [
      'Steady ~2% MoM growth, consistent with user growth.',
      'December spike of $4k due to holiday traffic auto-scaling.',
      'No anomalies above 2σ detected.',
    ],
    recommendations: [
      { title: 'Apply auto-scale predictive policies', impact: 'Medium', savings: '$2,100/mo' },
      { title: 'Negotiate enterprise discount for Azure Front Door', impact: 'High', savings: '$1,400/mo' },
    ],
    dataPoints: [
      { label: 'Jul 2024', value: '$128,000' },
      { label: 'Dec 2024', value: '$145,000' },
      { label: 'Trend', value: '+13.3%' },
    ],
    workflow: [
      { step: 1, agent: 'Intent Parser', action: 'Scope = business unit trend', source: 'NLP classifier', durationMs: 175, status: 'completed' },
      { step: 2, agent: 'Org Resolver', action: 'Resolved business-1 = Customer Experience', source: 'Org Hierarchy', durationMs: 90, status: 'completed' },
      { step: 3, agent: 'Cost Collector', action: 'Aggregated 6 months of cost across 3 apps', source: 'FinOps Data Lake', durationMs: 1320, status: 'completed' },
      { step: 4, agent: 'Trend Analyzer', action: 'Computed MoM growth, anomaly detection', source: 'Time-series model', durationMs: 540, status: 'completed' },
      { step: 5, agent: 'Response Synthesizer', action: 'Composed answer', source: 'LLM (gemini-3-flash)', durationMs: 680, status: 'completed' },
    ],
  },
  'biz-2': {
    summary: 'Lending Services FinOps score is 65/100. Main drags are low RI coverage (38%), poor tagging hygiene (71%), and rising idle spend.',
    insights: [
      'Only 38% of compute is on reserved/savings plans (target 70%).',
      '29% of resources missing the cost-center tag.',
      'Idle spend grew from $4.2k to $6.8k over 90 days.',
    ],
    recommendations: [
      { title: 'Onboard top 10 SKUs to 1-year RIs', impact: 'High', savings: '$11,300/mo' },
      { title: 'Enforce cost-center tag policy', impact: 'Medium', savings: 'N/A (governance)' },
      { title: 'Schedule weekly idle-resource cleanup', impact: 'Medium', savings: '$2,400/mo' },
    ],
    dataPoints: [
      { label: 'FinOps score', value: '65 / 100' },
      { label: 'RI coverage', value: '38%' },
      { label: 'Tag compliance', value: '71%' },
    ],
    workflow: [
      { step: 1, agent: 'Intent Parser', action: 'Scope = score breakdown for Lending Services', source: 'NLP classifier', durationMs: 165, status: 'completed' },
      { step: 2, agent: 'Score Engine', action: 'Decomposed score into 6 dimensions', source: 'FinOps Score v4', durationMs: 410, status: 'completed' },
      { step: 3, agent: 'Gap Analyzer', action: 'Compared actuals vs targets per dimension', source: 'Policy Catalog', durationMs: 380, status: 'completed' },
      { step: 4, agent: 'Recommendation Engine', action: 'Suggested top remediations', source: 'Playbook engine', durationMs: 290, status: 'completed' },
      { step: 5, agent: 'Response Synthesizer', action: 'Composed answer', source: 'LLM (gemini-3-flash)', durationMs: 700, status: 'completed' },
    ],
  },
  'biz-3': {
    summary: '2 of 2 applications in Payment Processing are forecast to exceed Q1 budget by a combined $42,000.',
    insights: [
      'Payment Gateway: $378k forecast vs $360k budget (+5%).',
      'Fraud Detection: $330k forecast vs $300k budget (+10%).',
      'Primary driver: Cosmos DB throughput growth.',
    ],
    recommendations: [
      { title: 'Move Cosmos DB to autoscale + RU caps', impact: 'High', savings: '$8,400/mo' },
      { title: 'Tier cold data to serverless containers', impact: 'Medium', savings: '$3,100/mo' },
    ],
    workflow: [
      { step: 1, agent: 'Intent Parser', action: 'Scope = forecast vs budget, business = Payment Processing', source: 'NLP classifier', durationMs: 180, status: 'completed' },
      { step: 2, agent: 'Forecast Model', action: 'Ran 90-day Prophet forecast per app', source: 'ML model fc-v2', durationMs: 1620, status: 'completed' },
      { step: 3, agent: 'Budget Service', action: 'Compared with FY25 Q1 budgets', source: 'Budget DB', durationMs: 220, status: 'completed' },
      { step: 4, agent: 'Response Synthesizer', action: 'Composed answer', source: 'LLM (gemini-3-flash)', durationMs: 690, status: 'completed' },
    ],
  },
  'pf-1': {
    summary: 'Digital Transformation portfolio approved $13.4k/mo savings in the last quarter and realized $11.6k (87% realization rate).',
    insights: [
      '5 recommendations approved, 4 fully implemented.',
      '1 recommendation (Synapse rightsizing) blocked on change freeze.',
      'Customer Portal leads with 95% realization rate.',
    ],
    recommendations: [
      { title: 'Unblock Synapse rightsizing post-freeze', impact: 'High', savings: '$10,000/mo' },
      { title: 'Expand spot adoption to ML training', impact: 'High', savings: '$10,800/mo' },
    ],
    dataPoints: [
      { label: 'Approved savings', value: '$13,400/mo' },
      { label: 'Realized savings', value: '$11,600/mo' },
      { label: 'Realization rate', value: '87%' },
    ],
    workflow: [
      { step: 1, agent: 'Intent Parser', action: 'Scope = portfolio savings summary', source: 'NLP classifier', durationMs: 170, status: 'completed' },
      { step: 2, agent: 'Portfolio Resolver', action: 'Resolved portfolio-1 = Digital Transformation', source: 'Org Hierarchy', durationMs: 85, status: 'completed' },
      { step: 3, agent: 'Savings Aggregator', action: 'Joined approved + realized savings across 5 apps', source: 'FinOps Ledger', durationMs: 1080, status: 'completed' },
      { step: 4, agent: 'Response Synthesizer', action: 'Composed summary', source: 'LLM (gemini-3-flash)', durationMs: 710, status: 'completed' },
    ],
  },
  'pf-2': {
    summary: 'Overall RI coverage is 54% across both portfolios. Largest gaps: Lending Services (38%) and Data Analytics (47%).',
    insights: [
      'Digital Transformation portfolio: 61% coverage.',
      'Core Banking portfolio: 49% coverage.',
      'Estimated $34k/mo savings if coverage reaches 75%.',
    ],
    recommendations: [
      { title: 'Bulk-purchase RIs for Lending Services SQL MI', impact: 'High', savings: '$8,400/mo' },
      { title: 'Adopt Azure savings plan for compute', impact: 'High', savings: '$15,000/mo' },
    ],
    dataPoints: [
      { label: 'Overall RI coverage', value: '54%' },
      { label: 'Target', value: '75%' },
      { label: 'Untapped savings', value: '$34,000/mo' },
    ],
    workflow: [
      { step: 1, agent: 'Intent Parser', action: 'Scope = RI coverage across portfolios', source: 'NLP classifier', durationMs: 175, status: 'completed' },
      { step: 2, agent: 'Commitment Analyzer', action: 'Pulled commitment inventory from all clouds', source: 'AWS/Azure/GCP APIs', durationMs: 1850, status: 'completed' },
      { step: 3, agent: 'Coverage Calculator', action: 'Computed coverage per portfolio/business', source: 'FinOps engine', durationMs: 460, status: 'completed' },
      { step: 4, agent: 'Recommendation Engine', action: 'Suggested commitment purchases', source: 'RI advisor', durationMs: 380, status: 'completed' },
      { step: 5, agent: 'Response Synthesizer', action: 'Composed answer', source: 'LLM (gemini-3-flash)', durationMs: 690, status: 'completed' },
    ],
  },
  'pf-3': {
    summary: 'Core Banking portfolio is 78% Azure, 15% AWS, 7% GCP. AWS share grew 4 pts QoQ driven by Fraud Detection ML workloads.',
    insights: [
      'Azure: $328k/mo (78%) — primarily Cosmos DB and AKS.',
      'AWS: $63k/mo (15%) — SageMaker training jobs.',
      'GCP: $29k/mo (7%) — BigQuery analytics for Loan Origination.',
    ],
    recommendations: [
      { title: 'Consolidate ML training to one cloud (Azure ML)', impact: 'High', savings: '$6,500/mo' },
      { title: 'Apply cross-cloud anomaly alerting', impact: 'Medium', savings: 'N/A (risk reduction)' },
    ],
    dataPoints: [
      { label: 'Azure', value: '78%' },
      { label: 'AWS', value: '15%' },
      { label: 'GCP', value: '7%' },
    ],
    workflow: [
      { step: 1, agent: 'Intent Parser', action: 'Scope = cross-cloud split, portfolio = Core Banking', source: 'NLP classifier', durationMs: 180, status: 'completed' },
      { step: 2, agent: 'Cost Collector', action: 'Pulled spend from AWS CUR, Azure CM, GCP Billing', source: 'Multi-cloud connector', durationMs: 2010, status: 'completed' },
      { step: 3, agent: 'Allocator', action: 'Allocated shared services proportionally', source: 'Showback engine', durationMs: 540, status: 'completed' },
      { step: 4, agent: 'Response Synthesizer', action: 'Composed answer with cloud split', source: 'LLM (gemini-3-flash)', durationMs: 720, status: 'completed' },
    ],
  },
};

export const fallbackResponse: FinOpsResponse = {
  summary:
    'I analyzed your question against the FinOps data lake and the catalog. Here is a best-effort answer based on the most relevant cost signals.',
  insights: [
    'No exact match for the requested scope — used fuzzy matching on tags.',
    'Confidence: medium. Consider refining the prompt with an app or business name.',
    'Last 30 days of cost & usage data was included.',
  ],
  recommendations: [
    { title: 'Review top 5 cost drivers in Cost Insights', impact: 'Medium', savings: 'Variable' },
    { title: 'Schedule a FinOps review with the platform team', impact: 'Low', savings: 'N/A' },
  ],
  workflow: [
    { step: 1, agent: 'Intent Parser', action: 'Parsed free-form prompt', source: 'NLP classifier', durationMs: 210, status: 'completed' },
    { step: 2, agent: 'Scope Resolver', action: 'No exact entity match — fuzzy resolution applied', source: 'Catalog + Org Hierarchy', durationMs: 340, status: 'completed' },
    { step: 3, agent: 'Cost Collector', action: 'Pulled last 30d cost data', source: 'FinOps Data Lake', durationMs: 1180, status: 'completed' },
    { step: 4, agent: 'Response Synthesizer', action: 'Composed best-effort answer', source: 'LLM (gemini-3-flash)', durationMs: 720, status: 'completed' },
  ],
};
