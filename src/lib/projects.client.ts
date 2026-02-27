import { Project, ProjectStatus } from "@/types/project";

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as {
      message?: string;
    } | null;
    throw new Error(data?.message || `Request failed (${res.status})`);
  }

  return res.json() as Promise<T>;
}

export function getProjects() {
  return api<Project[]>("api/projects");
}

export function createProject(input: {
  name: string;
  description?: string;
  status: ProjectStatus;
}) {
  return api<Project>("/api/projects", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateStatus(id: string, status: ProjectStatus) {
  return api<Project>(`/api/projects/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function deleteProject(id: string) {
  return api<{ ok: true }>(`/api/projects/${id}`, { method: "DELETE" });
}
