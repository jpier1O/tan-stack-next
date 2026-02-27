"use client";

import { useMemo, useState } from "react";
import { Project, ProjectStatus } from "@/types/project";

type ProjectFormPros = {
  onCreate: (project: Omit<Project, "id" | "createdAt">) => void;
  isSubmitting?: boolean;
};

const statusValues: ProjectStatus[] = ["active", "paused", "done"];

export default function ProjectForm({
  onCreate,
  isSubmitting,
}: ProjectFormPros) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("active");
  const [touched, setTouched] = useState(false);

  const nameError = useMemo(() => {
    if (!touched) return null;
    const v = name.trim();
    if (!v) return "Name is required";
    if (v.length < 3) return "Name must be at least 3 characters";
    return null;
  }, [name, touched]);

  const submit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setTouched(true);

    const normalized = name.trim();
    if (!normalized || normalized.length < 3) return;
    onCreate({
      name: normalized,
      description: description.trim() || undefined,
      status,
    });

    setName("");
    setDescription("");
    setStatus("active");
    setTouched(false);
  };

  return (
    <form
      onSubmit={submit}
      className="mt-3 grid gap-3 rounded-xl border border-slate-200 p-4"
    >
      <div>
        <label>Project Name</label>
        <input
          id="name"
          value={name}
          onBlur={() => setTouched(true)}
          onChange={(e) => setName(e.target.value)}
          placeholder="Billing App"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none"
        />
        {nameError && <p className="mt-1 text-xs text-red-600">{nameError}</p>}
      </div>

      <div>
        <label>Description</label>
        <input
          id="desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none"
        />
      </div>

      <div>
        <label>Status</label>
        <select
          id="status2"
          value={status}
          onChange={(e) => setStatus(e.target.value as ProjectStatus)}
          className=""
        >
          {statusValues.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg border border-slate-300 bg-slate-900 px-4 py-2 text-sm text-white"
      >
        {isSubmitting ? "Adding..." : "Add Project"}
      </button>
    </form>
  );
}
