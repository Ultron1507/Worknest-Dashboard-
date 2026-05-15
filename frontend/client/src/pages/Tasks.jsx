import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CalendarDays, CheckCircle2, Circle, Clock3, Edit3, ListChecks, Plus, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input, Textarea } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import {
  createTask,
  deleteTask,
  getProjects,
  getTasks,
  queryKeys,
  updateTask,
} from "../lib/api/queries";

const defaultForm = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  dueDate: "",
  projectId: "",
};

const columns = [
  { key: "todo", label: "To do", icon: Circle },
  { key: "in-progress", label: "In progress", icon: Clock3 },
  { key: "done", label: "Done", icon: CheckCircle2 },
];

const priorityClasses = {
  low: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  medium: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  high: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
};

function formatDate(value) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function Tasks() {
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading, isError, refetch } = useQuery({
    queryKey: queryKeys.tasks,
    queryFn: getTasks,
  });

  const { data: projects = [] } = useQuery({
    queryKey: queryKeys.projects,
    queryFn: getProjects,
  });

  const groupedTasks = useMemo(
    () =>
      columns.reduce((groups, column) => {
        groups[column.key] = tasks.filter((task) => task.status === column.key);
        return groups;
      }, {}),
    [tasks],
  );

  const saveTask = useMutation({
    mutationFn: () => {
      const payload = {
        ...form,
        dueDate: form.dueDate || undefined,
        projectId: form.projectId || undefined,
      };

      return editingId ? updateTask({ id: editingId, payload }) : createTask(payload);
    },
    onSuccess: () => {
      toast.success(editingId ? "Task updated" : "Task created");
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks });
      closeModal();
    },
    onError: () => toast.error("Something went wrong"),
  });

  const removeTask = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success("Task deleted");
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks });
    },
    onError: () => toast.error("Delete failed"),
  });

  const handleEdit = (task) => {
    setForm({
      title: task.title,
      description: task.description || "",
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
      projectId: task.projectId?._id || task.projectId || "",
    });
    setEditingId(task._id);
    setShowModal(true);
  };

  const openCreateModal = (status = "todo") => {
    setForm({ ...defaultForm, status });
    setEditingId(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(defaultForm);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Tasks</h1>
          <p className="mt-1 text-sm text-muted-foreground">Plan, prioritize, and move work through a focused board.</p>
        </div>
        <Button onClick={() => openCreateModal()}>
          <Plus />
          New Task
        </Button>
      </div>

      {isError && (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
            <p className="font-semibold">Could not load tasks</p>
            <p className="text-sm text-muted-foreground">Make sure the backend server is running.</p>
            <Button onClick={() => refetch()}>Retry</Button>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="grid gap-4 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-44 rounded-xl" />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
            <ListChecks className="size-8 text-primary" />
            <h2 className="font-semibold">No tasks yet</h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              Create your first task and attach it to a project when it belongs to a workstream.
            </p>
            <Button onClick={() => openCreateModal()}>Create task</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          {columns.map((column) => {
            const Icon = column.icon;
            const columnTasks = groupedTasks[column.key] || [];

            return (
              <section key={column.key} className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border bg-card px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Icon className="size-4 text-primary" />
                    <h2 className="font-semibold">{column.label}</h2>
                    <Badge>{columnTasks.length}</Badge>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => openCreateModal(column.key)} aria-label={`Add ${column.label} task`}>
                    <Plus />
                  </Button>
                </div>

                <div className="space-y-3">
                  {columnTasks.map((task) => (
                    <Card key={task._id} className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="font-semibold">{task.title}</h3>
                            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                              {task.description || "No description added."}
                            </p>
                          </div>
                          <Badge className={priorityClasses[task.priority]}>
                            {task.priority}
                          </Badge>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          {task.projectId?.name && <Badge>{task.projectId.name}</Badge>}
                          {task.dueDate && (
                            <span className="inline-flex items-center gap-1">
                              <CalendarDays className="size-3.5" />
                              {formatDate(task.dueDate)}
                            </span>
                          )}
                        </div>

                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(task)}>
                            <Edit3 />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            disabled={removeTask.isPending}
                            onClick={() => removeTask.mutate(task._id)}
                          >
                            <Trash2 />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-lg">
            <CardContent className="p-6">
              <h2 className="mb-1 text-lg font-semibold">
                {editingId ? "Edit Task" : "New Task"}
              </h2>
              <p className="mb-5 text-sm text-muted-foreground">
                Keep the next action clear and assign the right priority.
              </p>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  saveTask.mutate();
                }}
                className="space-y-4"
              >
                <Input
                  type="text"
                  placeholder="Title"
                  value={form.title}
                  onChange={(event) => setForm({ ...form, title: event.target.value })}
                  required
                />
                <Textarea
                  placeholder="Description"
                  value={form.description}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-1 text-sm font-medium">
                    <span>Status</span>
                    <select
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
                      value={form.status}
                      onChange={(event) => setForm({ ...form, status: event.target.value })}
                    >
                      <option value="todo">To do</option>
                      <option value="in-progress">In progress</option>
                      <option value="done">Done</option>
                    </select>
                  </label>
                  <label className="space-y-1 text-sm font-medium">
                    <span>Priority</span>
                    <select
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
                      value={form.priority}
                      onChange={(event) => setForm({ ...form, priority: event.target.value })}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </label>
                  <label className="space-y-1 text-sm font-medium">
                    <span>Due date</span>
                    <Input
                      type="date"
                      value={form.dueDate}
                      onChange={(event) => setForm({ ...form, dueDate: event.target.value })}
                    />
                  </label>
                  <label className="space-y-1 text-sm font-medium">
                    <span>Project</span>
                    <select
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
                      value={form.projectId}
                      onChange={(event) => setForm({ ...form, projectId: event.target.value })}
                    >
                      <option value="">No project</option>
                      {projects.map((project) => (
                        <option key={project._id} value={project._id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button disabled={saveTask.isPending}>
                    {saveTask.isPending ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
