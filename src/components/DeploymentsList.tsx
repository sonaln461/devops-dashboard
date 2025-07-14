"use client";

import { useEffect, useState } from "react";

type Deployment = {
  id: number;
  status: string;
  project: string;
  environment: string;
  version: string;
  createdAt: string;
  updatedAt: string;
};

export function DeploymentsList() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/deployments")
      .then((res) => res.json())
      .then((data) => {
        setDeployments(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-gray-300">Loading deployments...</p>;

  return (
    <ul className="space-y-4">
      {deployments.map((d) => (
        <li
          key={d.id}
          className="p-4 rounded border border-gray-700 bg-gray-800"
        >
          <p className="text-lg font-semibold">Project: {d.project}</p>
          <p>Status: {d.status}</p>
          <p>Env: {d.environment} | Version: {d.version}</p>
          <p className="text-sm text-gray-400">
            Created: {new Date(d.createdAt).toLocaleString()}
          </p>
        </li>
      ))}
    </ul>
  );
}
