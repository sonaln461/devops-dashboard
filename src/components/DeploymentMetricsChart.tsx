"use client";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export function DeploymentMetricsChart() {
  const [metrics, setMetrics] = useState<number[]>([]);

  useEffect(() => {
    setMetrics([20, 30, 45, 50, 38, 40]);
  }, []);

  return (
    <div className="bg-gray-900 p-4 rounded border border-gray-700">
      <h2 className="text-xl font-semibold mb-2">Error Rate (last 6 deploys)</h2>
      <Line
        data={{
          labels: ["D1", "D2", "D3", "D4", "D5", "D6"],
          datasets: [
            {
              label: "Error Rate %",
              data: metrics,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              labels: { color: "#fff" },
            },
          },
          scales: {
            x: {
              ticks: { color: "#ccc" },
            },
            y: {
              ticks: { color: "#ccc" },
            },
          },
        }}
      />
    </div>
  );
}