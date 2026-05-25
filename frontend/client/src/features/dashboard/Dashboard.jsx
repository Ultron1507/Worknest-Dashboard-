import {
  Activity,
  CheckCircle2,
  FolderKanban,
  ListChecks,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { createElement, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import { Button } from "../../components/ui/button";
import { getProjects, getTasks, queryKeys } from "../../lib/api/queries";
import { useAuthUser } from "../../hooks/use-auth-user";

const statusColors = ["#22c55e", "#6366f1", "#f59e0b"];

function formatToday() {
  return new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(new Date());
}

function buildWeeklyActivity(tasks) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);

    return {
      day: new Intl.DateTimeFormat("en", { weekday: "short" }).format(date),
      tasks: tasks.filter((task) => {
        if (task.status !== "done") {
          return false;
        }

        const completedAt = new Date(task.updatedAt || task.createdAt);
        return completedAt >= date && completedAt < nextDate;
      }).length,
    };
  });
}

function StatCard({ title, value, change, icon: Icon, tone, loading }) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <CardContent className="p-5">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-16" />
          </div>
        ) : (
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
              <p className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600">
                <TrendingUp className="size-3.5" />
                {change}
              </p>
            </div>
            <div className={`rounded-xl p-3 shadow-sm ${tone}`}>
              {createElement(Icon, { className: "size-5" })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <StatCard key={index} loading />
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
        <Skeleton className="h-[360px] rounded-xl" />
        <Skeleton className="h-[360px] rounded-xl" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
        <div className="rounded-full bg-primary/10 p-3 text-primary">
          <FolderKanban className="size-6" />
        </div>
        <div>
          <h3 className="font-semibold">No projects yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Create your first project to turn this dashboard into a live workspace.
          </p>
        </div>
        <Button asChild>
          <a href="/projects">Create project</a>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const { data: user, isLoading: userLoading } = useAuthUser();
  const {
    data: projects = [],
    isLoading: projectsLoading,
    isError: projectsError,
    refetch: refetchProjects,
  } = useQuery({
    queryKey: queryKeys.projects,
    queryFn: getProjects,
  });
  const {
    data: tasks = [],
    isLoading: tasksLoading,
    isError: tasksError,
    refetch: refetchTasks,
  } = useQuery({
    queryKey: queryKeys.tasks,
    queryFn: getTasks,
  });

  const isLoading = userLoading || projectsLoading || tasksLoading;
  const totalProjects = projects.length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "done").length;
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress").length;
  const pendingTasks = tasks.filter((task) => task.status === "todo").length;
  const progress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const weeklyActivity = useMemo(() => buildWeeklyActivity(tasks), [tasks]);
  const statusData = [
    { name: "Completed", value: completedTasks },
    { name: "In progress", value: inProgressTasks },
    { name: "Pending", value: pendingTasks },
  ];

  if (projectsError || tasksError) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
          <Activity className="size-8 text-destructive" />
          <h1 className="text-xl font-semibold">Dashboard data is unavailable</h1>
          <p className="text-sm text-muted-foreground">Check the API server and try again.</p>
          <Button
            onClick={() => {
              refetchProjects();
              refetchTasks();
            }}
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/10">{formatToday()}</Badge>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Welcome back, {user?.name || localStorage.getItem("userName") || "User"}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            A cleaner view of project health, weekly momentum, and the work that needs attention.
          </p>
        </div>
        <div className="rounded-xl border bg-card px-4 py-3 text-sm shadow-sm">
          <span className="text-muted-foreground">Workspace health</span>
          <span className="ml-2 font-semibold text-emerald-600">On track</span>
        </div>
      </section>

      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Total Projects" value={totalProjects || 0} change="+12% this month" icon={FolderKanban} tone="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300" />
            <StatCard title="Total Tasks" value={totalTasks} change={`${pendingTasks} pending`} icon={ListChecks} tone="bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300" />
            <StatCard title="Completed" value={completedTasks} change={`${inProgressTasks} in progress`} icon={CheckCircle2} tone="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300" />
            <StatCard title="Progress" value={`${progress}%`} change={`${completedTasks} of ${totalTasks} done`} icon={Activity} tone="bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300" />
          </section>

          {totalProjects === 0 && <EmptyState />}

          <section className="grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
            <Card className="overflow-hidden">
              <CardHeader className="flex-row items-center justify-between">
                <div>
                  <CardTitle>Weekly Activity</CardTitle>
                  <CardDescription>Tasks completed over the last seven days</CardDescription>
                </div>
                <Badge>Live</Badge>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyActivity} margin={{ left: -20, right: 12, top: 10 }}>
                      <defs>
                        <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.28} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "currentColor", fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "currentColor", fontSize: 12 }} />
                      <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", background: "hsl(var(--popover))", color: "hsl(var(--popover-foreground))" }} />
                      <Area type="monotone" dataKey="tasks" stroke="#6366f1" strokeWidth={3} fill="url(#activityFill)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tasks Status</CardTitle>
                <CardDescription>Task split by workflow state</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-[220px_1fr] xl:grid-cols-1 2xl:grid-cols-[220px_1fr]">
                  <div className="relative h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={statusData} dataKey="value" innerRadius={68} outerRadius={94} paddingAngle={4}>
                          {statusData.map((entry, index) => (
                            <Cell key={entry.name} fill={statusColors[index]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", background: "hsl(var(--popover))" }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-3xl font-semibold">{totalTasks}</p>
                      <p className="text-xs text-muted-foreground">Tasks</p>
                    </div>
                  </div>
                  <div className="space-y-4 self-center">
                    {statusData.map((item, index) => (
                      <div key={item.name} className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-sm">
                        <span className="flex items-center gap-2">
                          <span className="size-2.5 rounded-full" style={{ backgroundColor: statusColors[index] }} />
                          {item.name}
                        </span>
                        <span className="font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </>
      )}
    </div>
  );
}
