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
  const { transparent } = useHeader();
  const { activeTab } = useBottomNav();

  return (
    <>
      <Header cartCount={3} transparent={transparent} />
      <main className="min-h-screen">{children}</main>
      <BottomNav />
    </>
  );
}
