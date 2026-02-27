import { Project, ProjectStatus } from "@/types/project";

let projects: Project[] = [
  {
    id: "p1",
    name: "Backstage Plugin - Kathu Status",
    description: "Custom plugin for internal status visibility.",
    status: "active",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "p2",
    name: "Landing migration to React",
    description: "Migrate HTML/Tailwind landing to React components.",
    status: "paused",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
  },
];

export const listProject = () => {
  return projects;
};

export function createProject(input: {
  name: string;
  description?: string;
  status: ProjectStatus;
}) {
  const p: Project = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };

  projects = [p, ...projects];
  return p;
}

export function updateProjectStatus(id: string, status: ProjectStatus) {
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const updated: Project = { ...projects[idx], status };
  projects = projects.map((p, ind) => (ind === idx ? updated : p));
  return updated;
}

export function deleteProject(id: string) {
  const exists = projects.some((p) => p.id === id);
  if (!exists) return false;
  projects = projects.filter((p) => p.id !== id);
  return true;
}
