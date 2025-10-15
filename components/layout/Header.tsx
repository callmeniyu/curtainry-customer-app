"use client";

import { useState, useEffect } from "react";
import {
  AlignJustify,
  X,
  ShoppingCart,
  User,
  Search,
  Home,
  Package,
  Camera,
  Wrench,
  Building2,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useHeader } from "@/context/HeaderContext";
import { useRouter } from "next/navigation";
import { readyMadeCurtainsData, customCurtainsData } from "@/lib/productsData";

interface HeaderProps {
  transparent?: boolean;
  pageTitle?: string;
  showSearch?: boolean;
}

export default function Header({
  transparent = false,
  pageTitle,
  showSearch = false,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { searchTerm, setSearchTerm } = useHeader();
  const router = useRouter();

  const allProducts = [...readyMadeCurtainsData, ...customCurtainsData];
  const suggestions = searchTerm
    ? allProducts
        .filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.retailerName
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Focus search input when opening
      setTimeout(() => {
        const searchInput = document.getElementById("header-search-input");
        if (searchInput) searchInput.focus();
      }, 100);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to products page with search query
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
      setSearchTerm("");
    }
  };

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
          transparent && isScrolled
            ? "bg-white shadow-sm border-b border-gray-100"
            : transparent
            ? "bg-transparent"
            : "bg-white shadow-sm border-b border-gray-100"
        )}
      >
        <div className="px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left - Menu Button */}
            <button
              onClick={toggleMenu}
              className={cn(
                "p-2 rounded-lg transition-all duration-300 hover:scale-110",
                transparent && isScrolled
                  ? "hover:bg-gray-100 text-gray-700"
                  : transparent
                  ? "hover:bg-white/10 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              )}
              aria-label="Toggle menu"
            >
              <AlignJustify
                className={cn(
                  "h-6 w-6 transition-all duration-300",
                  isMenuOpen ? "rotate-90" : "rotate-0"
                )}
              />
            </button>

            {/* Center - Title or Logo */}
            <div
              className={cn(
                "flex-1 flex justify-start",
                isSearchOpen ? "hidden md:flex" : "flex"
              )}
            >
              {pageTitle ? (
                <h1
                  className={cn(
                    "text-xl font-bold transition-colors",
                    transparent && isScrolled
                      ? "text-gray-900"
                      : transparent
                      ? "text-white drop-shadow-lg"
                      : "text-gray-900"
                  )}
                >
                  {pageTitle}
                </h1>
              ) : (
                <button
                  onClick={() => router.push("/")}
                  className={cn(
                    "text-xl font-bold transition-colors hover:opacity-80",
                    transparent && isScrolled
                      ? "text-primary"
                      : transparent
                      ? "text-white drop-shadow-lg"
                      : "text-primary"
                  )}
                >
                  Curtainry
                </button>
              )}
            </div>

            {/* Right - Search, Cart & Profile */}
            <div className="flex items-center gap-2">
              {showSearch && (
                <div className="flex items-center">
                  {/* Search Button - Hidden when search is open */}
                  {!isSearchOpen && (
                    <button
                      onClick={toggleSearch}
                      className={cn(
                        "p-2 rounded-lg transition-colors",
                        transparent && isScrolled
                          ? "hover:bg-gray-100 text-gray-700"
                          : transparent
                          ? "hover:bg-white/10 text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      )}
                      aria-label="Toggle search"
                    >
                      <Search className="h-6 w-6" />
                    </button>
                  )}

                  {/* Expandable Search Field */}
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out relative",
                      isSearchOpen
                        ? "w-full md:w-64 opacity-100"
                        : "w-0 opacity-0"
                    )}
                  >
                    <form
                      onSubmit={handleSearch}
                      className="flex items-center relative"
                    >
                      <input
                        id="header-search-input"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search products..."
                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg outline-none bg-white text-sm text-gray-900 placeholder-gray-500 shadow-sm"
                      />
                      {isSearchOpen && (
                        <X
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer"
                          onClick={toggleSearch}
                        />
                      )}
                    </form>
                    {isSearchOpen && suggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                        {suggestions.map((product) => (
                          <button
                            key={product.id}
                            onClick={() => {
                              router.push(
                                `/products?search=${encodeURIComponent(
                                  product.name
                                )}`
                              );
                              setIsSearchOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-500">
                              by {product.retailerName}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={() => router.push("/cart")}
                className={cn(
                  "relative p-2 rounded-lg transition-colors",
                  transparent && isScrolled
                    ? "hover:bg-gray-100 text-gray-700"
                    : transparent
                    ? "hover:bg-white/10 text-white"
                    : "hover:bg-gray-100 text-gray-700",
                  isSearchOpen ? "hidden sm:flex" : ""
                )}
              >
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {getTotalItems() > 9 ? "9+" : getTotalItems()}
                  </span>
                )}
              </button>
              <button
                onClick={() => router.push("/account")}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  transparent && isScrolled
                    ? "hover:bg-gray-100 text-gray-700"
                    : transparent
                    ? "hover:bg-white/10 text-white"
                    : "hover:bg-gray-100 text-gray-700",
                  isSearchOpen ? "hidden sm:flex" : ""
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
            <h2 className="text-xl font-bold text-primary">Curtainary</h2>
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
                <SidebarLink icon={User} label="My Profile" href="/account" />
                <SidebarLink
                  icon={Heart}
                  label="My Wishlist"
                  href="/wishlist"
                />
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
