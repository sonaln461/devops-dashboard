"use client";
import { useEffect, useState } from "react";

export function DeploymentRiskBanner() {
  const [risk, setRisk] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/deployments")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const latest = data[data.length - 1];
          setRisk(latest.riskScore ?? null); 
        }
      });
  }, []);

  if (risk === null) return null;

  let riskLevel = "Low";
  let color = "green";
  if (risk > 70) {
    riskLevel = "High";
    color = "red";
  } else if (risk > 40) {
    riskLevel = "Moderate";
    color = "yellow";
  }

  return (
    <div className={`bg-${color}-900 border border-${color}-700 p-4 rounded text-${color}-200`}>
      <strong>Risk Alert:</strong> AI predicts a <b>{riskLevel}</b> deployment risk ({risk}%)
    </div>
  );
}
