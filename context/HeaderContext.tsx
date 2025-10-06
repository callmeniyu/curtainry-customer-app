"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface HeaderContextType {
  transparent: boolean;
  setTransparent: (transparent: boolean) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [transparent, setTransparent] = useState(false);

  return (
    <HeaderContext.Provider value={{ transparent, setTransparent }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
}
