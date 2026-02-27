"use client";

import ProjectFilter from "@/components/ProjectFilter";
import ProjectForm from "@/components/ProjectForm";
import ProjectList from "@/components/ProjectList";
import { Project, ProjectStatus } from "@/types/project";
import { useEffect, useMemo, useState } from "react";
import * as api from "@/lib/projects.client";

export default function Page() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "all">("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [busyId, setBusyId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.getProjects();
      setProjects(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return projects.filter((d) => {
      const matchesQuery = q ? d.name.toLowerCase().includes(q) : true;
      const matchesStatus = status === "all" ? true : d.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [projects, query, status]);

  const onCreate = async (input: Omit<Project, "id" | "createdAt">) => {
    setCreating(true);
    setError(null);

    try {
      const created = await api.createProject(input);
      setProjects((prev) => [created, ...prev]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown Error");
    } finally {
      setCreating(false);
    }
  };

  const onChangeStatus = async (id: string, next: ProjectStatus) => {
    setBusyId(id);
    setError(null);

    try {
      const updated = await api.updateStatus(id, next);
      setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown Error");
    } finally {
      setBusyId(null);
    }
  };

  const onDelete = async (id: string) => {
    const ok = confirm("Delete this project?");
    if (!ok) return;

    setBusyId(id);
    setError(null);

    try {
      await api.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown Error");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <main className="mx-auto max-w-3xl space-y-4 p-6">
      <header>
        <h1>Projects</h1>

        <ProjectFilter
          query={query}
          status={status}
          onQueryChange={setQuery}
          onStatusChange={setStatus}
        />

        <ProjectForm onCreate={onCreate} isSubmitting={creating || loading} />

        <div>
          <button type="button" onClick={load}>
            Refresh
          </button>
          {loading ? <span> loading...</span> : null}
        </div>

        {error ? <div role="alert">{error}</div> : null}
      </header>

      {loading ? (
        <div>Loading Projects...</div>
      ) : (
        <ProjectList
          projects={filtered}
          onChangeStatus={onChangeStatus}
          onDelete={onDelete}
          busyId={busyId}
        />
      )}
    </main>
  );
}
