import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { portfolios, businesses, applications } from '@/data/costInsights';
import { Building2, Briefcase, AppWindow } from 'lucide-react';

export type ProfileType = 'portfolio' | 'business' | 'application';

interface ProfileSelectorProps {
  profileType: ProfileType;
  selectedId: string;
  onProfileTypeChange: (type: ProfileType) => void;
  onSelectionChange: (id: string) => void;
}

export function ProfileSelector({
  profileType,
  selectedId,
  onProfileTypeChange,
  onSelectionChange,
}: ProfileSelectorProps) {
  const getOptions = () => {
    switch (profileType) {
      case 'portfolio':
        return portfolios.map((p) => ({ id: p.id, name: p.name }));
      case 'business':
        return businesses.map((b) => ({ id: b.id, name: b.name }));
      case 'application':
        return applications.map((a) => ({ id: a.id, name: a.name }));
    }
  };

  const options = getOptions();

  return (
    <div className="flex flex-wrap items-end gap-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium text-muted-foreground">View As</Label>
        <Select value={profileType} onValueChange={(v) => onProfileTypeChange(v as ProfileType)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="portfolio">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span>Portfolio Owner</span>
              </div>
            </SelectItem>
            <SelectItem value="business">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>Business Owner</span>
              </div>
            </SelectItem>
            <SelectItem value="application">
              <div className="flex items-center gap-2">
                <AppWindow className="h-4 w-4" />
                <span>Application Owner</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-muted-foreground">
          {profileType === 'portfolio' && 'Select Portfolio'}
          {profileType === 'business' && 'Select Business'}
          {profileType === 'application' && 'Select Application'}
        </Label>
        <Select value={selectedId} onValueChange={onSelectionChange}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
