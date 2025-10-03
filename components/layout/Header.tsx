"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Search,
  Home,
  Package,
  Camera,
  Wrench,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  cartCount?: number;
}

export default function Header({ cartCount = 0 }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      // Consider scrolled if user has scrolled past 100px (roughly the hero section height)
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white shadow-sm border-b border-gray-100"
            : "bg-transparent"
        )}
      >
        <div className="section-padding">
          <div className="flex items-center justify-between h-16">
            {/* Left - Menu Button */}
            <button
              onClick={toggleMenu}
              className={cn(
                "p-2 rounded-lg transition-colors",
                isScrolled
                  ? "hover:bg-gray-100 text-gray-700"
                  : "hover:bg-white/10 text-white"
              )}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Center - Logo */}
            <div className="flex-1 flex justify-start">
              <h1
                className={cn(
                  "text-xl font-bold transition-colors",
                  isScrolled ? "text-primary" : "text-white drop-shadow-lg"
                )}
              >
                Curtainry
              </h1>
            </div>

            {/* Right - Cart & Profile */}
            <div className="flex items-center gap-2">
              <button
                className={cn(
                  "relative p-2 rounded-lg transition-colors",
                  isScrolled
                    ? "hover:bg-gray-100 text-gray-700"
                    : "hover:bg-white/10 text-white"
                )}
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>
              <button
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  isScrolled
                    ? "hover:bg-gray-100 text-gray-700"
                    : "hover:bg-white/10 text-white"
                )}
              >
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 transition-all duration-300",
          isMenuOpen ? "visible" : "invisible"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-black transition-opacity duration-300",
            isMenuOpen ? "opacity-50" : "opacity-0"
          )}
          onClick={toggleMenu}
        />

        {/* Sidebar */}
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300",
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-primary">Curtainry</h2>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="p-6">
            <div className="space-y-2">
              <SidebarLink icon={Home} label="Home" href="/" />
              <SidebarLink icon={Package} label="Products" href="/products" />
              <SidebarLink
                icon={Camera}
                label="AR Visualizer"
                href="/ar"
                badge="Coming Soon"
              />
              <SidebarLink icon={Wrench} label="Services" href="/services" />
              <SidebarLink
                icon={Building2}
                label="Companies"
                href="/companies"
              />
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="space-y-2">
                <SidebarLink icon={User} label="My Profile" href="/profile" />
                <SidebarLink
                  icon={ShoppingCart}
                  label="My Orders"
                  href="/orders"
                />
              </div>
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center">
              Need help? Contact support
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

interface SidebarLinkProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  badge?: string;
}

function SidebarLink({ icon: Icon, label, href, badge }: SidebarLinkProps) {
  return (
    <a
      href={href}
      className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group"
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-gray-600 group-hover:text-primary transition-colors" />
        <span className="font-medium text-gray-700 group-hover:text-primary transition-colors">
          {label}
        </span>
      </div>
      {badge && (
        <span className="text-xs bg-primary-shade text-primary px-2 py-1 rounded-full font-medium">
          {badge}
        </span>
      )}
    </a>
  );
}
