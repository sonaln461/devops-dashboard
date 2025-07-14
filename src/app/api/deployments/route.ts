// NEW: src/app/api/deployments/route.ts
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { deployments } from "~/server/db/schema";

export async function GET() {
  const data = await db.select().from(deployments);
  return NextResponse.json(data);
}
