"use client";
import { useEffect, useState } from "react";

export function DeploymentsTable() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/deployments")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="bg-gray-900 p-4 rounded border border-gray-700">
      <h2 className="text-xl font-semibold mb-2">Recent Deployments</h2>
      <table className="w-full text-sm">
        <thead className="text-left text-gray-400">
          <tr>
            <th>Project</th>
            <th>Env</th>
            <th>Version</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t border-gray-800">
              <td>{item.project}</td>
              <td>{item.environment}</td>
              <td>{item.version}</td>
              <td>{item.status}</td>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}