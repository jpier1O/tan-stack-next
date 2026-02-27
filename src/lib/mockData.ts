import { Project } from "@/types/project";

export const mockData: Project[] = [
  {
    id: "p1",
    name: "Backstage Plugin",
    description: "Custom plugin for internal status visibility",
    status: "active",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "p2",
    name: "Landing migration to React",
    description: "Migrate Tailwind landing",
    status: "paused",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "p3",
    name: "Security Notifications",
    description: "Notifications pipeline",
    status: "done",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
];
