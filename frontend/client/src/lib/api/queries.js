import { apiClient } from "./client";

export const queryKeys = {
  profile: ["profile"],
  projects: ["projects"],
  adminUsers: ["admin", "users"],
};

export async function getProfile() {
  const { data } = await apiClient.get("/user/profile");
  return data.user;
}

export async function updateProfile(payload) {
  const { data } = await apiClient.put("/user/profile", payload);
  return data.user;
}

export async function getProjects() {
  const { data } = await apiClient.get("/projects");
  return Array.isArray(data) ? data : [];
}

export async function createProject(payload) {
  const { data } = await apiClient.post("/projects", payload);
  return data.project;
}

export async function updateProject({ id, payload }) {
  const { data } = await apiClient.put(`/projects/${id}`, payload);
  return data.project;
}

export async function deleteProject(id) {
  await apiClient.delete(`/projects/${id}`);
  return id;
}

export async function getAdminUsers() {
  const { data } = await apiClient.get("/admin/users");
  return Array.isArray(data) ? data : [];
}
