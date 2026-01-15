import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Users, 
  Package, 
  BookOpen, 
  ArrowRight,
  TrendingUp,
  Activity,
  Server,
  Code,
  Shield,
  Zap
} from 'lucide-react';

const portalStats = [
  { label: 'Teams Onboarded', value: '47', icon: Users, trend: '+12%', trendLabel: 'this quarter' },
  { label: 'Services Published', value: '156', icon: Package, trend: '+28%', trendLabel: 'this quarter' },
  { label: 'Monthly Active Users', value: '1,234', icon: Activity, trend: '+18%', trendLabel: 'vs last month' },
  { label: 'API Calls This Month', value: '2.4M', icon: Zap, trend: '+45%', trendLabel: 'vs last month' },
  { label: 'Deployments This Week', value: '89', icon: Server, trend: '+8%', trendLabel: 'vs last week' },
  { label: 'Code Repositories', value: '312', icon: Code, trend: '+15%', trendLabel: 'this quarter' },
];

const quickActions = [
  {
    title: 'Onboard Your Team',
    description: 'Create a workspace for your team and start collaborating. Set up escalation matrices, manage cloud accounts, and track training progress.',
    icon: Users,
    action: '/teams',
    buttonText: 'Get Started',
    color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  },
  {
    title: 'Publish to Catalog',
    description: 'Register your services, libraries, APIs, or cloud workspaces to the catalog. Make them discoverable and deployable by other teams.',
    icon: Package,
    action: '/catalog',
    buttonText: 'Browse Catalog',
    color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  },
  {
    title: 'Documentation & Guides',
    description: 'Learn how to navigate the portal, understand its capabilities, and make the most of the self-service offerings available.',
    icon: BookOpen,
    action: '#docs',
    buttonText: 'Read Docs',
    color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  },
];

const recentActivity = [
  { team: 'Cloud Operations', action: 'deployed', resource: 'Monitoring Dashboard API', time: '2 hours ago' },
  { team: 'Infrastructure Platform', action: 'published', resource: 'Terraform AWS Module', time: '4 hours ago' },
  { team: 'FinOps & SWAM', action: 'onboarded', resource: 'Cost Analyzer Service', time: '1 day ago' },
  { team: 'Cloud Modernization', action: 'updated', resource: 'Container Migration Toolkit', time: '2 days ago' },
];

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <AppLayout>
      <div className="p-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">DevPortal</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your unified platform for team collaboration, service discovery, and infrastructure self-service. 
            Accelerate delivery with standardized workflows and centralized governance.
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto mt-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for services, APIs, libraries, teams, or documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-24 h-14 text-lg rounded-xl border-2 focus:border-primary"
              />
              <Button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                Search
              </Button>
            </div>
          </form>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          {quickActions.map((action) => (
            <Card 
              key={action.title} 
              className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer"
              onClick={() => navigate(action.action)}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${action.color} border flex items-center justify-center mb-2`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <CardTitle className="flex items-center justify-between">
                  {action.title}
                  <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </CardTitle>
                <CardDescription className="text-sm">
                  {action.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {action.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Portal Stats */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Portal Statistics</h2>
            <Badge variant="outline" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              Live Data
            </Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {portalStats.map((stat) => (
              <Card key={stat.label} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <stat.icon className="h-4 w-4" />
                    <span className="text-xs font-medium">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-emerald-500 font-medium">{stat.trend}</span>
                    <span className="text-xs text-muted-foreground">{stat.trendLabel}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>Latest updates across the portal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="font-medium">{activity.team}</span>
                    <span className="text-muted-foreground">{activity.action}</span>
                    <span className="font-medium text-primary">{activity.resource}</span>
                    <span className="text-muted-foreground ml-auto text-xs">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Links</CardTitle>
              <CardDescription>Frequently accessed resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="justify-start gap-2" onClick={() => navigate('/self-service')}>
                  <Server className="h-4 w-4" />
                  Self-Service
                </Button>
                <Button variant="outline" className="justify-start gap-2" onClick={() => navigate('/catalog')}>
                  <Package className="h-4 w-4" />
                  Catalog
                </Button>
                <Button variant="outline" className="justify-start gap-2" onClick={() => navigate('/teams')}>
                  <Users className="h-4 w-4" />
                  Teams
                </Button>
                <Button variant="outline" className="justify-start gap-2" onClick={() => navigate('/cost-insights')}>
                  <TrendingUp className="h-4 w-4" />
                  Cost Insights
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
