"use client";

import { createContext, useContext, useState } from "react";

type SelectedProjectContextType = {
  selected: string | null;
  setSelected: (project: string) => void;
};

const SelectedProjectContext = createContext<SelectedProjectContextType | undefined>(undefined);

export function SelectedProjectProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <SelectedProjectContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectedProjectContext.Provider>
  );
}

export function useSelectedProject() {
  const ctx = useContext(SelectedProjectContext);
  if (!ctx) throw new Error("useSelectedProject must be used within SelectedProjectProvider");
  return ctx;
}
