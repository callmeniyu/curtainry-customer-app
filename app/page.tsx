"use client";

import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
// Ensure the file exists at src/components/home/CompanyCard.tsx
import CompanyCard from "@/components/home/CompanyCard";
import {
  mockReadymadeProducts,
  mockCustomProducts,
} from "@/components/home/ProductSection";
import { mockCompanies } from "@/components/home/CompanyCard";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header cartCount={3} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Ready-Made Curtains Category */}
        <CategorySection
          title="Ready-Made Curtains"
          products={mockReadymadeProducts}
        />

        {/* Custom Curtains Category */}
        <CategorySection
          title="Custom Curtains"
          products={mockCustomProducts}
        />

        {/* Partner Companies Section */}
        <section className="py-8 bg-white">
          <div className="section-padding">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Partner Companies
                </h2>
                <button className="text-primary hover:text-primary-dark font-medium text-sm">
                  View All →
                </button>
              </div>

              {/* Companies Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {mockCompanies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Bottom Navigation */}
      <BottomNav activeTab="home" />
    </div>
  );
}
