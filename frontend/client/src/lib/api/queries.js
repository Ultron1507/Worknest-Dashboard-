import { apiClient } from "./client";

export const queryKeys = {
  profile: ["profile"],
  projects: ["projects"],
  tasks: ["tasks"],
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

export async function getTasks() {
  const { data } = await apiClient.get("/tasks");
  return Array.isArray(data) ? data : [];
}

export async function createTask(payload) {
  const { data } = await apiClient.post("/tasks", payload);
  return data.task;
}

export async function updateTask({ id, payload }) {
  const { data } = await apiClient.put(`/tasks/${id}`, payload);
  return data.task;
}

export async function deleteTask(id) {
  await apiClient.delete(`/tasks/${id}`);
  return id;
}

export async function getAdminUsers({ page = 1, limit = 20 } = {}) {
  const { data } = await apiClient.get("/admin/users", {
    params: { page, limit }
  });
  // Expecting backend to return { users: [], totalCount: number }
  return data;
}
