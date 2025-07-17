import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { projects } from "~/server/db/schema";

export async function GET() {
  const all = await db.select().from(projects);
  return NextResponse.json(all);
}

export async function POST(req: Request) {
  const body = await req.json();
  await db.insert(projects).values({ name: body.name });
  return NextResponse.json({ status: "created" });
}
