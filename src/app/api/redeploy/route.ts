import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await fetch("http://localhost:8000/redeploy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const response = await result.json();
  return NextResponse.json(response);
}
