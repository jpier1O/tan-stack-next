import { NextResponse } from "next/server";
import { createProject, listProject } from "@/lib/store";
import { ProjectStatus } from "@/types/project";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(listProject());
}

export async function POST(req: Request) {
  const body = (await req.json()) as {
    name?: string;
    description?: string;
    status?: ProjectStatus;
  };

  const name = body?.name?.trim() ?? "";
  const status = body?.status ?? "active";

  if (!name)
    return NextResponse.json({ message: "Name is required" }, { status: 400 });
  if (name?.length < 3)
    return NextResponse.json(
      { message: "Name must be at least 3 characters" },
      { status: 400 },
    );
  if (!["active", "paused", "done"].includes(status))
    return NextResponse.json({ message: "Status invalided" }, { status: 400 });

  const created = createProject({
    name,
    description: body?.description?.trim() || undefined,
    status,
  });

  return NextResponse.json({ created }, { status: 201 });
}
