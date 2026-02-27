export type ProjectStatus = "active" | "paused" | "done";

export type Project = {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  createdAt: string; //ISO
};
