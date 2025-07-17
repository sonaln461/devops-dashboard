"use client";

import { useState } from "react";
import { DeploymentsTable } from "~/components/DeploymentsTable";
import { DeploymentRiskBanner } from "~/components/DeploymentRiskBanner";
import { DeploymentMetricsChart } from "~/components/DeploymentMetricsChart";
import { NewDeploymentForm } from "~/components/NewDeploymentForm";

export default function Home() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <main className="p-10 space-y-6">
      <h1 className="text-4xl font-bold">DevOps Deployment Dashboard</h1>
      <DeploymentRiskBanner />
      <DeploymentMetricsChart />
      <DeploymentsTable project={selected} />
      <NewDeploymentForm />
    </main>
  );
}
