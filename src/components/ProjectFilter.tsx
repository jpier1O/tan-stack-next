"use client";

import { ProjectStatus } from "@/types/project";

type ProjectFilterProps = {
  query: string;
  status: ProjectStatus | "all";
  onQueryChange: (value: string) => void;
  onStatusChange: (value: ProjectStatus | "all") => void;
};

export default function ProjectFilter({
  query,
  status,
  onQueryChange,
  onStatusChange,
}: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <div>
        <label>Search</label>
        <input
          id="q"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by name"
          className=""
        />
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) =>
            onStatusChange(e.target.value as ProjectFilterProps["status"])
          }
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
}
