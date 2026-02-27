import { NextResponse } from "next/server";
import { deleteProject, updateProjectStatus } from "@/lib/store";
import { ProjectStatus } from "@/types/project";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request, cntx: { params: { id: string } }) {
  const { id } = cntx.params;
  const body = (await req.json()) as { status?: ProjectStatus };

  const status = body?.status;
  if (!status || !["active", "paused", "done"].includes(status)) {
    return NextResponse.json({ message: "Invalid status" }, { status: 400 });
  }

  const updated = updateProjectStatus(id, status);
  if (!updated)
    return NextResponse.json({ message: "Not found" }, { status: 404 });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, cntx: { params: { id: string } }) {
  const { id } = cntx.params;
  const ok = deleteProject(id);
  if (!ok) return NextResponse.json({ message: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
