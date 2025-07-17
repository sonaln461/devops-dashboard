"use client";
import { useState } from "react";
import { useSelectedProject } from "../context/SelectedProjectContext";

export function NewDeploymentForm() {
  const { selected } = useSelectedProject();
  const [version, setVersion] = useState("");
  const [env, setEnv] = useState("staging");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/deployments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        version,
        environment: env,
        project: selected ?? "demo",
        status: "pending",
      }),
    });
    setVersion("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-gray-900 p-4 rounded border border-gray-700"
    >
      <h2 className="text-xl font-semibold">Trigger New Deployment</h2>
      <input
        type="text"
        placeholder="Version"
        value={version}
        onChange={(e) => setVersion(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 border border-gray-600"
      />
      <select
        value={env}
        onChange={(e) => setEnv(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 border border-gray-600"
      >
        <option value="staging">Staging</option>
        <option value="production">Production</option>
      </select>
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
        Deploy
      </button>
    </form>
  );
}
