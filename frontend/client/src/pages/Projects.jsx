import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Edit3, FolderPlus, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input, Textarea } from "../components/ui/input";
import { Skeleton } from "../components/ui/skeleton";
import {
  createProject,
  deleteProject,
  getProjects,
  queryKeys,
  updateProject,
} from "../lib/api/queries";

export default function Projects() {
  const [form, setForm] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading, isError, refetch } = useQuery({
    queryKey: queryKeys.projects,
    queryFn: getProjects,
  });

  const saveProject = useMutation({
    mutationFn: () =>
      editingId ? updateProject({ id: editingId, payload: form }) : createProject(form),
    onSuccess: () => {
      toast.success(editingId ? "Project updated" : "Project created");
      queryClient.invalidateQueries({ queryKey: queryKeys.projects });
      setForm({ name: "", description: "" });
      setEditingId(null);
      setShowModal(false);
    },
    onError: () => toast.error("Something went wrong"),
  });

  const removeProject = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      toast.success("Project deleted");
      queryClient.invalidateQueries({ queryKey: queryKeys.projects });
    },
    onError: () => toast.error("Delete failed"),
  });

  const handleEdit = (project) => {
    setForm({ name: project.name, description: project.description || "" });
    setEditingId(project._id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm({ name: "", description: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create, edit, and organize active workstreams.
          </p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus />
          Add Project
        </Button>
      </div>

      {isError && (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
            <p className="font-semibold">Could not load projects</p>
            <p className="text-sm text-muted-foreground">Make sure the backend server is running.</p>
            <Button onClick={() => refetch()}>Retry</Button>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-40 rounded-xl" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
            <FolderPlus className="size-8 text-primary" />
            <h2 className="font-semibold">No projects yet</h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              Start with one focused project. You can add tasks and richer project metadata later.
            </p>
            <Button onClick={() => setShowModal(true)}>Create project</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card key={project._id} className="group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold">{project.name}</h2>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                      {project.description || "No description added."}
                    </p>
                  </div>
                  <MoreHorizontal className="size-4 text-muted-foreground" />
                </div>
                <div className="mt-5 flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>
                    <Edit3 />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    disabled={removeProject.isPending}
                    onClick={() => removeProject.mutate(project._id)}
                  >
                    <Trash2 />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <h2 className="mb-1 text-lg font-semibold">
                {editingId ? "Edit Project" : "Add Project"}
              </h2>
              <p className="mb-5 text-sm text-muted-foreground">
                Keep names short and descriptions outcome-focused.
              </p>
              <form onSubmit={(event) => { event.preventDefault(); saveProject.mutate(); }} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  required
                />
                <Textarea
                  placeholder="Description"
                  value={form.description}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                />
                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button disabled={saveProject.isPending}>
                    {saveProject.isPending ? "Saving..." : "Save"}
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
