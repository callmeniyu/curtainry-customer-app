"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface HeaderContextType {
  transparent: boolean;
  setTransparent: (transparent: boolean) => void;
  pageTitle: string;
  setPageTitle: (title: string) => void;
  showSearch: boolean;
  setShowSearch: (show: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [transparent, setTransparent] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <HeaderContext.Provider
      value={{
        transparent,
        setTransparent,
        pageTitle,
        setPageTitle,
        showSearch,
        setShowSearch,
        searchTerm,
        setSearchTerm,
      }}
    >
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
