"use client";
import { useEffect, useState } from "react";
import { useSelectedProject } from "../context/SelectedProjectContext";

type Project = {
  id: number;
  name: string;
};

export function Sidebar() {
  const { selected, setSelected } = useSelectedProject();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then(setProjects);
  }, []);

  return (
    <aside className="w-64 h-screen bg-gray-900 p-4 border-r border-gray-700 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Projects</h2>

      <ul className="space-y-2 flex-1">
        {projects.length === 0 ? (
          <p className="text-gray-400">No projects yet.</p>
        ) : (
          projects.map((project) => (
            <li
              key={project.id}
              onClick={() => setSelected(project.name)}
              className={`cursor-pointer p-2 rounded ${
                selected === project.name
                  ? "bg-blue-700 text-white"
                  : "hover:bg-gray-800 text-white"
              }`}
            >
              {project.name}
            </li>
          ))
        )}
      </ul>

      <button
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded"
        onClick={async () => {
          const name = prompt("Enter new project name:");
          if (!name) return;

          const res = await fetch("/api/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
          });

          if (res.ok) {
            const newProject = await res.json();
            setProjects((prev) => [...prev, newProject]);
            setSelected(newProject.name);
          } else {
            alert("Error creating project");
          }
        }}
      >
        + Add Project
      </button>
    </aside>
  );
}
