import { createElement, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Camera, Mail, Shield, User, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Skeleton } from "../components/ui/skeleton";
import { useAuthUser } from "../hooks/use-auth-user";
import { queryKeys, updateProfile } from "../lib/api/queries";
import { absoluteUploadUrl, getInitials } from "../lib/utils";

export default function Profile() {
  const { data: user, isLoading } = useAuthUser();
  const [form, setForm] = useState({ name: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: () => {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      if (imageFile) formData.append("profileImage", imageFile);
      return updateProfile(formData);
    },
    onSuccess: () => {
      toast.success("Profile updated");
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
      setImageFile(null);
      setImagePreview("");
      setEditMode(false);
    },
    onError: () => toast.error("Update failed"),
  });

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-40 rounded-xl" />
        <Skeleton className="h-72 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your account details and workspace identity.</p>
      </div>

      <Card className="overflow-hidden">
        <div className="h-24 bg-[linear-gradient(120deg,#6366f1,#14b8a6,#f59e0b)]" />
        <CardContent className="-mt-10 flex flex-col gap-5 p-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <div className="relative">
              <Avatar className="size-24 border-4 border-card">
                <AvatarImage src={imagePreview || absoluteUploadUrl(user?.profileImage)} alt={user?.name || "User"} />
                <AvatarFallback className="text-xl">{getInitials(user?.name)}</AvatarFallback>
              </Avatar>
              {editMode && (
                <label className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/45 text-white opacity-0 transition hover:opacity-100">
                  <Camera className="size-5" />
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              )}
            </div>
            <div className="pb-2">
              <h2 className="text-xl font-semibold">{user?.name || "Worknest user"}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <Badge className="mt-2 capitalize">{user?.role || "user"}</Badge>
            </div>
          </div>
          <Button
            variant={editMode ? "outline" : "default"}
            onClick={() => {
              if (!editMode) setForm({ name: user?.name || "", email: user?.email || "" });
              setEditMode((value) => !value);
            }}
          >
            {editMode ? <X /> : <User />}
            {editMode ? "Cancel" : "Edit Profile"}
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <InfoRow icon={User} label="Full name" value={user?.name || "-"} />
            <InfoRow icon={Mail} label="Email" value={user?.email || "-"} />
            <InfoRow icon={Shield} label="Role" value={user?.role || "user"} />
          </CardContent>
        </Card>

        {editMode && (
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  updateMutation.mutate();
                }}
                className="space-y-4"
              >
                <Input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Full name" />
                <Input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="Email" />
                <Input type="file" accept="image/*" onChange={handleImageChange} />
                <Button className="w-full" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border bg-background p-4">
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        {createElement(Icon, { className: "size-4" })}
        {label}
      </p>
      <p className="mt-2 font-semibold">{value}</p>
    </div>
  );
}
