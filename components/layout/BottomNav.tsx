"use client";

import { Home, Package, Camera, Wrench, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBottomNav } from "@/context/BottomNavContext";

export default function BottomNav() {
  const { activeTab } = useBottomNav();
  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      href: "/",
    },
    {
      id: "products",
      label: "Products",
      icon: Package,
      href: "/products",
    },
    {
      id: "ar",
      label: "AR",
      icon: Camera,
      href: "/ar",
      badge: true,
    },
    {
      id: "services",
      label: "Services",
      icon: Wrench,
      href: "/services",
    },
    {
      id: "companies",
      label: "Companies",
      icon: Building2,
      href: "/companies",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40 md:hidden">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 transition-colors relative",
                isActive ? "text-primary" : "text-gray-500 hover:text-primary"
              )}
            >
              <div className="relative">
                <item.icon className="h-5 w-5" />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"></div>
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
