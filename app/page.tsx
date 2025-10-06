"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
// Ensure the file exists at src/components/home/CompanyCard.tsx
import CompanyCard from "@/components/home/CompanyCard";
import ServiceCard from "@/components/home/ServiceCard";
import { ArrowRight } from "lucide-react";

import {
  mockReadymadeProducts,
  mockCustomProducts,
} from "@/components/home/ProductSection";
import { companiesData } from "@/lib/companiesData";
import { servicesData } from "@/lib/servicesData";
import Button from "@/components/ui/Button";
import { useHeader } from "@/context/HeaderContext";
import { useBottomNav } from "@/context/BottomNavContext";

export default function HomePage() {
  const { setTransparent } = useHeader();
  const { setActiveTab } = useBottomNav();
  const router = useRouter();

  useEffect(() => {
    setTransparent(true);
    setActiveTab("home");
  }, [setTransparent, setActiveTab]);

  return (
    <div className="bg-gray-50">
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

        {/* Services Section */}
        <section className="py-8 bg-gray-50">
          <div className="section-padding">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Our Services
                </h2>
                <Button
                  variant="secondary"
                  onClick={() => router.push("/services")}
                  className="inline-flex items-center gap-2"
                >
                  Services
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {servicesData.map((profile) => (
                  <ServiceCard key={profile.id} profile={profile} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Partner Companies Section */}
        <section className="py-8 bg-white">
          <div className="section-padding">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Partner Companies
                </h2>
                <Button
                  variant="secondary"
                  onClick={() => router.push("/companies")}
                  className="inline-flex items-center gap-2"
                >
                  Companies
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>

              {/* Companies Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {companiesData.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
