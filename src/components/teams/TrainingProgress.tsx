import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, Trophy, Star, Zap } from 'lucide-react';
import { Training } from '@/data/teams';

interface TrainingProgressProps {
  trainings: Training[];
}

export function TrainingProgress({ trainings }: TrainingProgressProps) {
  const completedCount = trainings.filter(t => t.completed).length;
  const totalXP = trainings.filter(t => t.completed).reduce((sum, t) => sum + t.xpReward, 0);
  const maxXP = trainings.reduce((sum, t) => sum + t.xpReward, 0);
  const progressPercent = (completedCount / trainings.length) * 100;

  const requiredTrainings = trainings.filter(t => t.category === 'required');
  const recommendedTrainings = trainings.filter(t => t.category === 'recommended');
  const advancedTrainings = trainings.filter(t => t.category === 'advanced');

  const level = Math.floor(totalXP / 1000) + 1;
  const xpToNextLevel = 1000 - (totalXP % 1000);

  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">New Joiner Training Path</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Level {level}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* XP Progress */}
        <div className="rounded-lg border border-border/50 bg-background/50 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="font-semibold text-foreground">{totalXP} XP</span>
            </div>
            <span className="text-sm text-muted-foreground">{xpToNextLevel} XP to Level {level + 1}</span>
          </div>
          <Progress value={(totalXP % 1000) / 10} className="h-3" />
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>{completedCount}/{trainings.length} trainings completed</span>
            <span>{Math.round(progressPercent)}% complete</span>
          </div>
        </div>

        {/* Required Trainings */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-4 w-4 text-red-400" />
            <h4 className="font-semibold text-foreground">Required</h4>
            <Badge variant="secondary" className="text-xs">
              {requiredTrainings.filter(t => t.completed).length}/{requiredTrainings.length}
            </Badge>
          </div>
          <div className="space-y-2">
            {requiredTrainings.map((training) => (
              <TrainingItem key={training.id} training={training} />
            ))}
          </div>
        </div>

        {/* Recommended Trainings */}
        {recommendedTrainings.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Star className="h-4 w-4 text-yellow-400" />
              <h4 className="font-semibold text-foreground">Recommended</h4>
            </div>
            <div className="space-y-2">
              {recommendedTrainings.map((training) => (
                <TrainingItem key={training.id} training={training} />
              ))}
            </div>
          </div>
        )}

        {/* Advanced Trainings */}
        {advancedTrainings.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="h-4 w-4 text-purple-400" />
              <h4 className="font-semibold text-foreground">Advanced</h4>
            </div>
            <div className="space-y-2">
              {advancedTrainings.map((training) => (
                <TrainingItem key={training.id} training={training} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TrainingItem({ training }: { training: Training }) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg border p-3 transition-colors ${
        training.completed
          ? 'border-green-500/30 bg-green-500/10'
          : 'border-border/50 bg-background/50 hover:border-primary/30'
      }`}
    >
      <div className="flex items-center gap-3">
        {training.completed ? (
          <CheckCircle className="h-5 w-5 text-green-400" />
        ) : (
          <Circle className="h-5 w-5 text-muted-foreground" />
        )}
        <div>
          <div className="flex items-center gap-2">
            <p className={`font-medium ${training.completed ? 'text-green-400' : 'text-foreground'}`}>
              {training.title}
            </p>
            {training.badge && <span className="text-lg">{training.badge}</span>}
          </div>
          <p className="text-xs text-muted-foreground">{training.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">{training.duration}</span>
        <Badge variant={training.completed ? "default" : "secondary"} className="text-xs">
          +{training.xpReward} XP
        </Badge>
      </div>
    </div>
  );
}
