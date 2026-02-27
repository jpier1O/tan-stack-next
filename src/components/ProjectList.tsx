import { Project, ProjectStatus } from "@/types/project";

type ProjectListProps = {
  projects: Project[];
  onChangeStatus?: (id: string, status: ProjectStatus) => void;
  onDelete?: (id: string) => void;
  busyId?: string | null; // disable button per item
};

const badgeClass: Record<ProjectStatus, string> = {
  active: "border-emerald-200 bd-emerald-50 text-emerald-700",
  paused: "border-amber-200 bd-amber-50 text-amber-700",
  done: "border-slate-200 bd-slate-50 text-slate-700",
};

export default function ProjectList({
  projects,
  onChangeStatus,
  onDelete,
  busyId,
}: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div role="status" className="">
        No projects found
      </div>
    );
  }
  return (
    <ul className="grid gap-3">
      {projects.map((p) => {
        const canAct = Boolean(onChangeStatus || onDelete);
        const isBusy = p.id === busyId;
        return (
          <li
            key={`${p.id}-${p.name}`}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-semibold text-slate-900">
                    {p.name}
                  </h3>
                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 text-xs ${badgeClass[p.status]}`}
                  >
                    {p.status}
                  </span>
                </div>
                {p.description ? (
                  <p className="mt-1 text-sm text-slate-600">{p.description}</p>
                ) : null}
                <p className="mt-2 text-sm text-slate-600">{p?.createdAt}</p>
              </div>

              {canAct ? (
                <div>
                  {onChangeStatus ? (
                    <div>
                      {(["active", "done", "paused"] as ProjectStatus[]).map(
                        (ps) => (
                          <button
                            key={ps}
                            type="button"
                            className="rounder-lg border border-slate-300 bg-white px-2 py-1 text-xs"
                            disabled={isBusy || p.status == ps}
                            onClick={() => onChangeStatus(p.id, ps)}
                          >
                            {ps}
                          </button>
                        ),
                      )}
                    </div>
                  ) : null}

                  {onDelete ? (
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => onDelete(p.id)}
                      className="rounder-lg border border-slate-300 bg-white px-2 py-1 text-xs"
                    >
                      Delete
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
