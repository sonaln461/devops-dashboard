import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { deployments } from "~/server/db/schema";

export async function GET() {
  const data = await db.select().from(deployments);
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  let aiRisk: number | null = null;
  try {
    const res = await fetch("http://3.16.111.88:8000/predict-risk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        version: body.version,
        environment: body.environment,
        project: body.project,
      }),
    });

    const result = await res.json();
    console.log(result)
    aiRisk = result.risk_score;
    console.log(aiRisk)
  } catch (error) {
    console.error("Error contacting AI risk scoring service:", error);
  }

  await db.insert(deployments).values({
    project: body.project,
    environment: body.environment,
    version: body.version,
    status: body.status,
    riskScore:
      typeof aiRisk === "number" && !Number.isNaN(aiRisk)
      ? Math.round(aiRisk * 100)
      : null,
    });

  return NextResponse.json({
    message: "Deployment created",
    aiRiskScore: aiRisk,
  });
}
