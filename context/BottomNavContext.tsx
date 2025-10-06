"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ActiveTab = "home" | "products" | "ar" | "services" | "companies";

interface BottomNavContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

const BottomNavContext = createContext<BottomNavContextType | undefined>(
  undefined
);

export function BottomNavProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");

  return (
    <BottomNavContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </BottomNavContext.Provider>
  );
}

export function useBottomNav() {
  const context = useContext(BottomNavContext);
  if (context === undefined) {
    throw new Error("useBottomNav must be used within a BottomNavProvider");
  }
  return context;
}
