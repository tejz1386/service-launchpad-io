import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Calendar, Video, Clock, Users, Slack } from 'lucide-react';

interface TeamCollaborationProps {
  slackChannel: string;
  onCallRotation: string;
  memberCount: number;
}

export function TeamCollaboration({ slackChannel, onCallRotation, memberCount }: TeamCollaborationProps) {
  const upcomingMeetings = [
    { title: 'Daily Standup', time: '09:00 AM', recurring: 'Daily' },
    { title: 'Sprint Planning', time: '10:00 AM', recurring: 'Bi-weekly' },
    { title: 'Team Retrospective', time: '03:00 PM', recurring: 'Weekly' },
  ];

  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader>
        <CardTitle className="text-lg">Team Collaboration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg border border-border/50 bg-background/50 p-3 transition-all hover:border-primary/50 hover:bg-background"
          >
            <div className="rounded-lg bg-[#4A154B]/20 p-2">
              <Slack className="h-5 w-5 text-[#4A154B]" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Slack Channel</p>
              <p className="text-xs text-muted-foreground">{slackChannel}</p>
            </div>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg border border-border/50 bg-background/50 p-3 transition-all hover:border-primary/50 hover:bg-background"
          >
            <div className="rounded-lg bg-blue-500/20 p-2">
              <Video className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Team Room</p>
              <p className="text-xs text-muted-foreground">Virtual meeting space</p>
            </div>
          </a>
        </div>

        {/* On-Call Info */}
        <div className="rounded-lg border border-border/50 bg-background/50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-medium text-foreground">On-Call Rotation</span>
          </div>
          <p className="text-sm text-muted-foreground">{onCallRotation}</p>
        </div>

        {/* Upcoming Meetings */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-foreground">Recurring Meetings</span>
          </div>
          <div className="space-y-2">
            {upcomingMeetings.map((meeting, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-3"
              >
                <div className="flex items-center gap-3">
                  <Video className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{meeting.title}</p>
                    <p className="text-xs text-muted-foreground">{meeting.time}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {meeting.recurring}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="rounded-lg border border-border/50 bg-background/50 p-3 text-center">
            <Users className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
            <p className="text-lg font-semibold text-foreground">{memberCount}</p>
            <p className="text-xs text-muted-foreground">Team Size</p>
          </div>
          <div className="rounded-lg border border-border/50 bg-background/50 p-3 text-center">
            <MessageSquare className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
            <p className="text-lg font-semibold text-foreground">24</p>
            <p className="text-xs text-muted-foreground">Active Threads</p>
          </div>
          <div className="rounded-lg border border-border/50 bg-background/50 p-3 text-center">
            <Calendar className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
            <p className="text-lg font-semibold text-foreground">3</p>
            <p className="text-xs text-muted-foreground">This Week</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
