import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, Send, Bot, User, Workflow, Lightbulb, TrendingDown, CheckCircle2, Building2, Briefcase, LayoutGrid } from 'lucide-react';
import { quickPrompts, demoResponses, fallbackResponse, type FinOpsResponse, type PromptCategory } from '@/data/finopsAI';
import { cn } from '@/lib/utils';

interface ChatTurn {
  id: string;
  prompt: string;
  promptId?: string;
  response: FinOpsResponse;
}

const categoryMeta: Record<PromptCategory, { label: string; icon: typeof Building2; color: string }> = {
  application: { label: 'Application Owners', icon: LayoutGrid, color: 'text-blue-500' },
  business: { label: 'Business Owners', icon: Briefcase, color: 'text-purple-500' },
  portfolio: { label: 'Portfolio Owners', icon: Building2, color: 'text-emerald-500' },
};

export default function FinOpsAI() {
  const [input, setInput] = useState('');
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [thinking, setThinking] = useState(false);
  const [activeTurnId, setActiveTurnId] = useState<string | null>(null);

  const handleSubmit = (prompt: string, promptId?: string) => {
    if (!prompt.trim()) return;
    setThinking(true);
    setInput('');
    setTimeout(() => {
      const response = (promptId && demoResponses[promptId]) || fallbackResponse;
      const turn: ChatTurn = { id: crypto.randomUUID(), prompt, promptId, response };
      setTurns((prev) => [...prev, turn]);
      setActiveTurnId(turn.id);
      setThinking(false);
    }, 900);
  };

  const activeTurn = turns.find((t) => t.id === activeTurnId) ?? turns[turns.length - 1];

  return (
    <AppLayout>
      <div className="border-b border-border bg-card/40">
        <div className="px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">AI for FinOps</h1>
              <p className="text-sm text-muted-foreground">
                Ask anything about cost, usage, savings, and forecasts in natural language.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 p-8">
        {/* Quick Prompts */}
        <div className="col-span-12 lg:col-span-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                Quick Prompts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(Object.keys(categoryMeta) as PromptCategory[]).map((cat) => {
                const meta = categoryMeta[cat];
                const Icon = meta.icon;
                return (
                  <div key={cat}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={cn('h-3.5 w-3.5', meta.color)} />
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {meta.label}
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      {quickPrompts.filter((p) => p.category === cat).map((p) => (
                        <button
                          key={p.id}
                          onClick={() => handleSubmit(p.prompt, p.id)}
                          className="w-full text-left rounded-md border border-border bg-background px-3 py-2 text-xs hover:border-primary hover:bg-accent transition-colors"
                        >
                          {p.title}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Chat */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
          <Card className="flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Bot className="h-4 w-4 text-primary" />
                Conversation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[480px] pr-4">
                {turns.length === 0 && !thinking && (
                  <div className="flex flex-col items-center justify-center h-[440px] text-center">
                    <Sparkles className="h-12 w-12 text-muted-foreground/40 mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Pick a quick prompt or type your own FinOps question.
                    </p>
                  </div>
                )}
                <div className="space-y-5">
                  {turns.map((turn) => (
                    <div key={turn.id} className="space-y-3">
                      {/* User */}
                      <div className="flex gap-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
                          <User className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex-1 rounded-lg bg-muted px-3 py-2 text-sm">
                          {turn.prompt}
                        </div>
                      </div>
                      {/* Assistant */}
                      <div className="flex gap-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15">
                          <Bot className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <div className="flex-1 space-y-3">
                          <p className="text-sm leading-relaxed">{turn.response.summary}</p>

                          {turn.response.dataPoints && (
                            <div className="grid grid-cols-3 gap-2">
                              {turn.response.dataPoints.map((dp) => (
                                <div key={dp.label} className="rounded-md border border-border bg-background px-3 py-2">
                                  <p className="text-[10px] uppercase text-muted-foreground">{dp.label}</p>
                                  <p className="text-sm font-semibold">{dp.value}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          <div>
                            <p className="text-xs font-semibold text-muted-foreground mb-1.5">Key insights</p>
                            <ul className="space-y-1">
                              {turn.response.insights.map((i, idx) => (
                                <li key={idx} className="flex gap-2 text-sm">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{i}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-muted-foreground mb-1.5">Recommendations</p>
                            <div className="space-y-1.5">
                              {turn.response.recommendations.map((r, idx) => (
                                <div key={idx} className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2">
                                  <div className="flex items-center gap-2">
                                    <TrendingDown className="h-3.5 w-3.5 text-emerald-500" />
                                    <span className="text-sm">{r.title}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-[10px]">{r.impact}</Badge>
                                    <Badge className="text-[10px] bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/15">{r.savings}</Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setActiveTurnId(turn.id)}
                            className="text-xs h-7"
                          >
                            <Workflow className="h-3 w-3 mr-1" /> View workflow ({turn.response.workflow.length} steps)
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {thinking && (
                    <div className="flex gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15">
                        <Bot className="h-3.5 w-3.5 text-primary animate-pulse" />
                      </div>
                      <div className="flex items-center gap-1 rounded-lg bg-muted px-3 py-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce" />
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0.15s]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0.3s]" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Composer */}
          <Card>
            <CardContent className="p-3">
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask: e.g. Why did our Azure spend grow last month?"
                  className="min-h-[60px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(input);
                    }
                  }}
                />
                <Button onClick={() => handleSubmit(input)} disabled={!input.trim() || thinking} className="self-end">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Artifacts */}
        <div className="col-span-12 lg:col-span-3">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Workflow className="h-4 w-4 text-primary" />
                Artifacts & Workflow
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!activeTurn ? (
                <div className="text-center py-12 text-xs text-muted-foreground">
                  Workflow steps and data sources will appear here after the first response.
                </div>
              ) : (
                <Tabs defaultValue="workflow">
                  <TabsList className="grid w-full grid-cols-2 h-8">
                    <TabsTrigger value="workflow" className="text-xs">Workflow</TabsTrigger>
                    <TabsTrigger value="raw" className="text-xs">Raw Data</TabsTrigger>
                  </TabsList>
                  <TabsContent value="workflow" className="mt-3">
                    <ScrollArea className="h-[480px] pr-3">
                      <ol className="relative border-l border-border pl-4 space-y-3">
                        {activeTurn.response.workflow.map((s) => (
                          <li key={s.step} className="relative">
                            <span className="absolute -left-[21px] top-1 flex h-3 w-3 items-center justify-center rounded-full bg-primary ring-2 ring-background" />
                            <div className="rounded-md border border-border bg-background p-2.5">
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-xs font-semibold">{s.agent}</p>
                                <Badge variant="outline" className="text-[10px]">{s.durationMs}ms</Badge>
                              </div>
                              <p className="text-xs text-foreground/80 mb-1">{s.action}</p>
                              <p className="text-[10px] text-muted-foreground">Source: {s.source}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="raw" className="mt-3">
                    <ScrollArea className="h-[480px]">
                      <pre className="text-[10px] bg-muted rounded-md p-3 overflow-x-auto">
{JSON.stringify(activeTurn.response, null, 2)}
                      </pre>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
