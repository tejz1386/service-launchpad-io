import { AppLayout } from '@/components/layout/AppLayout';
import { TeamCard } from '@/components/teams/TeamCard';
import { teams } from '@/data/teams';
import { Input } from '@/components/ui/input';
import { Search, Users } from 'lucide-react';
import { useState } from 'react';

export default function Teams() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.shortName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Teams</h1>
          </div>
          <p className="text-muted-foreground">
            Explore platform teams, their members, and collaboration resources.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search teams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background/50 border-border/50"
          />
        </div>

        {/* Teams Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredTeams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Users className="h-12 w-12 mb-4" />
            <p className="text-lg">No teams found matching your search.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
