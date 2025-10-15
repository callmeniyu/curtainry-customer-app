"use client";

import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { useHeader } from "@/context/HeaderContext";
import { useBottomNav } from "@/context/BottomNavContext";

interface LayoutContentProps {
  children: ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const { transparent, pageTitle, showSearch } = useHeader();
  const { activeTab } = useBottomNav();

  return (
    <>
      <Header
        transparent={transparent}
        pageTitle={pageTitle}
        showSearch={showSearch}
      />
      <main className="min-h-screen">{children}</main>
      <BottomNav />
    </>
  );
}
