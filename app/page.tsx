"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MapPin, Search } from "lucide-react";
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
import { cities } from "@/lib/productsData";
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

        {/* Search Section */}
        <div className="bg-white pt-6 pb-3 md:py-8 ">
          <div className="max-w-4xl mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for curtains, services, companies..."
                  onClick={() => router.push("/search")}
                  className="w-full py-2 px-3 md:px-6  md:py-4 text-lg border-2 border-gray-300 rounded-full outline-none bg-gray-50 hover:bg-white transition-colors cursor-pointer placeholder:text-sm md:placeholder:text-lg"
                  readOnly
                />
                <button
                  onClick={() => router.push("/search")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cities Section */}
        <div className="bg-white">
          <div className="w-full">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pl-4">
              <div className="flex flex-col items-center gap-2 p-2">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-gray-500" />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">
                  Nearby
                </span>
              </div>
              <div className="flex gap-2">
                {cities
                  .filter(
                    (city) =>
                      city !== "All Cities" &&
                      [
                        "Delhi",
                        "Mumbai",
                        "Bangalore",
                        "Chennai",
                        "Kochi",
                        "Hyderabad",
                      ].includes(city)
                  )
                  .map((city) => (
                    <button
                      key={city}
                      onClick={() => router.push(`/products?city=${city}`)}
                      className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                        <Image
                          src={`/images/${city.toLowerCase()}.jpg`}
                          alt={city}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700 text-center">
                        {city}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>

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
