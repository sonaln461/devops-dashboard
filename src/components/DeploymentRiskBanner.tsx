"use client";

export function DeploymentRiskBanner() {
  return (
    <div className="bg-yellow-900 border border-yellow-700 p-4 rounded text-yellow-200">
      <strong>Risk Alert:</strong> AI predicts increased failure risk on latest staging deploy.
    </div>
  );
}