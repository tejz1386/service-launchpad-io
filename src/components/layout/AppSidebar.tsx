import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  Server, 
  Box, 
  Rocket, 
  Settings, 
  BookOpen,
  Users,
  Activity,
  ChevronLeft,
  Menu,
  PiggyBank
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Catalog', href: '/catalog', icon: LayoutGrid },
  { name: 'Self-Service', href: '/', icon: Rocket },
  { name: 'My Requests', href: '/requests', icon: Activity },
  { name: 'Teams', href: '/teams', icon: Users },
  { name: 'Cost Insights', href: '/cost-insights', icon: PiggyBank },
  { name: 'Documentation', href: '/docs', icon: BookOpen },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const categories = [
  { name: 'Infrastructure', icon: Server, count: 2 },
  { name: 'Application', icon: Rocket, count: 1 },
  { name: 'Data', icon: Box, count: 0 },
];

export function AppSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-sidebar-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Box className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">DevPortal</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-sidebar-accent text-sidebar-primary" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </div>

          {!collapsed && (
            <>
              <div className="pt-6">
                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Categories
                </p>
              </div>
              <div className="mt-2 space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
                  >
                    <div className="flex items-center gap-3">
                      <category.icon className="h-4 w-4" />
                      <span>{category.name}</span>
                    </div>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </nav>

        {/* User */}
        {!collapsed && (
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary">
                <span className="text-sm font-medium">JD</span>
              </div>
              <div className="flex-1 truncate">
                <p className="text-sm font-medium text-foreground">John Developer</p>
                <p className="text-xs text-muted-foreground">Platform Team</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
