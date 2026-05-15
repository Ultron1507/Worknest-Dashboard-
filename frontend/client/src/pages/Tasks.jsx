import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CalendarDays, CheckCircle2, Edit3, ListChecks, Plus, Trash2 } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input, Textarea } from "../components/ui/input";
import { Skeleton } from "../components/ui/skeleton";
import {
  createTask,
  deleteTask,
  getProjects,
  getTasks,
  queryKeys,
  updateTask,
} from "../lib/api/queries";
import { getApiErrorMessage } from "../lib/api/client";

const defaultForm = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  dueDate: "",
  projectId: "",
};

const columns = [
  { id: "todo", title: "To do" },
  { id: "in-progress", title: "In progress" },
  { id: "done", title: "Done" },
];

const priorityClasses = {
  low: "bg-sky-500/10 text-sky-600",
  medium: "bg-amber-500/10 text-amber-700",
  high: "bg-destructive/10 text-destructive",
};

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
        groups[column.id] = tasks.filter((task) => task.status === column.id);
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
    onError: (error) => toast.error(getApiErrorMessage(error, "Could not save task")),
  });

  const removeTask = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success("Task deleted");
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks });
    },
    onError: (error) => toast.error(getApiErrorMessage(error, "Could not delete task")),
  });

  const changeStatus = useMutation({
    mutationFn: ({ task, status }) =>
      updateTask({
        id: task._id,
        payload: {
          title: task.title,
          description: task.description || "",
          status,
          priority: task.priority || "medium",
          dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
          projectId: task.projectId?._id || "",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks });
    },
    onError: (error) => toast.error(getApiErrorMessage(error, "Could not update task")),
  });

  const openCreateModal = () => {
    setForm(defaultForm);
    setEditingId(null);
    setShowModal(true);
  };

  const openEditModal = (task) => {
    setForm({
      title: task.title || "",
      description: task.description || "",
      status: task.status || "todo",
      priority: task.priority || "medium",
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
      projectId: task.projectId?._id || "",
    });
    setEditingId(task._id);
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
          <p className="mt-1 text-sm text-muted-foreground">
            Plan, prioritize, and move active work across your board.
          </p>
        </div>
        <Button onClick={openCreateModal}>
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
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-80 rounded-xl" />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
            <ListChecks className="size-8 text-primary" />
            <h2 className="font-semibold">No tasks yet</h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Create a task and assign it to a project to start tracking daily work.
            </p>
            <Button onClick={openCreateModal}>Create task</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          {columns.map((column) => (
            <section key={column.id} className="rounded-xl border bg-muted/25 p-3">
              <div className="mb-3 flex items-center justify-between px-1">
                <h2 className="font-semibold">{column.title}</h2>
                <Badge>{groupedTasks[column.id]?.length || 0}</Badge>
              </div>
              <div className="space-y-3">
                {groupedTasks[column.id]?.length ? (
                  groupedTasks[column.id].map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onEdit={() => openEditModal(task)}
                      onDelete={() => removeTask.mutate(task._id)}
                      onStatusChange={(status) => changeStatus.mutate({ task, status })}
                      isDeleting={removeTask.isPending}
                      isMoving={changeStatus.isPending}
                    />
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed bg-background p-5 text-center text-sm text-muted-foreground">
                    Nothing here.
                  </div>
                )}
              </div>
            </section>
          ))}
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
                Keep the title clear and set a status before saving.
              </p>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  saveTask.mutate();
                }}
                className="space-y-4"
              >
                <Input
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
                <div className="grid gap-3 sm:grid-cols-2">
                  <SelectField
                    label="Status"
                    value={form.status}
                    onChange={(event) => setForm({ ...form, status: event.target.value })}
                  >
                    <option value="todo">To do</option>
                    <option value="in-progress">In progress</option>
                    <option value="done">Done</option>
                  </SelectField>
                  <SelectField
                    label="Priority"
                    value={form.priority}
                    onChange={(event) => setForm({ ...form, priority: event.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </SelectField>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input
                    type="date"
                    value={form.dueDate}
                    onChange={(event) => setForm({ ...form, dueDate: event.target.value })}
                  />
                  <SelectField
                    label="Project"
                    value={form.projectId}
                    onChange={(event) => setForm({ ...form, projectId: event.target.value })}
                  >
                    <option value="">No project</option>
                    {projects.map((project) => (
                      <option key={project._id} value={project._id}>
                        {project.name}
                      </option>
                    ))}
                  </SelectField>
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

function SelectField({ label, className = "", ...props }) {
  return (
    <label className="space-y-1 text-sm font-medium">
      <span className="text-muted-foreground">{label}</span>
      <select
        className={`flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring ${className}`}
        {...props}
      />
    </label>
  );
}

function TaskCard({ task, onEdit, onDelete, onStatusChange, isDeleting, isMoving }) {
  const nextStatus = task.status === "done" ? "todo" : task.status === "todo" ? "in-progress" : "done";
  const nextStatusLabel = task.status === "done" ? "Reopen" : task.status === "todo" ? "Start" : "Finish";

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold">{task.title}</h3>
            {task.description && (
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{task.description}</p>
            )}
          </div>
          <Badge className={priorityClasses[task.priority] || priorityClasses.medium}>
            {task.priority || "medium"}
          </Badge>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
          {task.projectId?.name && <Badge className="bg-emerald-500/10 text-emerald-700">{task.projectId.name}</Badge>}
          {task.dueDate && (
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="size-3.5" />
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => onStatusChange(nextStatus)} disabled={isMoving}>
            <CheckCircle2 />
            {nextStatusLabel}
          </Button>
          <Button size="sm" variant="ghost" onClick={onEdit}>
            <Edit3 />
            Edit
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-destructive hover:text-destructive"
            onClick={onDelete}
            disabled={isDeleting}
          >
            <Trash2 />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
