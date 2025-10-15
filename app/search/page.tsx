"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import { readyMadeCurtainsData, customCurtainsData } from "@/lib/productsData";
import { servicesData } from "@/lib/servicesData";
import { companiesData } from "@/lib/companiesData";
import { useHeader } from "@/context/HeaderContext";
import { useBottomNav } from "@/context/BottomNavContext";

interface SearchResult {
  id: string | number;
  name: string;
  type: "product" | "service" | "company" | "section";
  image?: string;
  avatar?: string;
  category?: string;
  price?: number;
  location?: string;
  specialty?: string;
  retailerName?: string;
  role?: string;
  sectionType?: "services" | "readymade" | "custom" | "companies";
}

// Search Result Item Component
const SearchResultItem = ({ result }: { result: SearchResult }) => {
  const getDetailPath = (result: SearchResult) => {
    switch (result.type) {
      case "product":
        return `/products/${result.id}`;
      case "service":
        return `/services/${result.id}`;
      case "company":
        return `/companies/${result.id}`;
      case "section":
        switch (result.sectionType) {
          case "services":
            return "/services";
          case "readymade":
            return "/products?tab=readymade";
          case "custom":
            return "/products?tab=custom";
          case "companies":
            return "/companies";
          default:
            return "/";
        }
      default:
        return "/";
    }
  };

  const getImageSrc = (result: SearchResult) => {
    // Handle section results
    if (result.type === "section") {
      switch (result.sectionType) {
        case "services":
          return "/images/services-icon.png"; // You might want to add these icons
        case "readymade":
          return "/images/readymade-icon.png";
        case "custom":
          return "/images/custom-icon.png";
        case "companies":
          return "/images/companies-icon.png";
        default:
          return "/images/default.jpg";
      }
    }

    // Products store image as filename (e.g. "readymade1.png") -> prefix with /images/
    if (result.type === "product") {
      const img = (result as any).image;
      if (!img) return "/images/default.jpg";
      return img.startsWith("/") ? img : `/images/${img}`;
    }

    // Services use `avatar` (already full path like '/images/avatar (1).jpg')
    if (result.type === "service") {
      const av = (result as any).avatar || (result as any).image;
      if (!av) return "/images/default.jpg";
      return av.startsWith("/") ? av : `/images/${av}`;
    }

    // Companies use `image` (usually already has leading '/images/...')
    if (result.type === "company") {
      const img = (result as any).image;
      if (!img) return "/images/default.jpg";
      return img.startsWith("/") ? img : `/images/${img}`;
    }

    return "/images/default.jpg";
  };

  return (
    <div
      onClick={() => (window.location.href = getDetailPath(result))}
      className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer ${
        result.type === "section" ? "border-primary/20 bg-primary/5" : ""
      }`}
    >
      <div className="p-4 flex items-center gap-4">
        {result.type === "section" ? (
          <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {result.name.charAt(0)}
              </span>
            </div>
          </div>
        ) : (
          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={getImageSrc(result)}
              alt={result.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        )}
        <div className="flex-1">
          <h3
            className={`font-semibold ${
              result.type === "section" ? "text-primary" : "text-gray-900"
            }`}
          >
            {result.name}
          </h3>
          <p className="text-sm text-gray-600 capitalize">
            {result.type === "section" ? "Category" : result.type}
          </p>
          {result.category && result.type !== "section" && (
            <p className="text-sm text-primary">{result.category}</p>
          )}
          {result.location && (
            <p className="text-sm text-gray-500">{result.location}</p>
          )}
          {result.price && (
            <p className="text-sm font-medium text-primary">
              ₹
              {typeof result.price === "number"
                ? result.price.toLocaleString()
                : result.price}
            </p>
          )}
        </div>
        <ArrowRight
          className={`h-5 w-5 ${
            result.type === "section" ? "text-primary" : "text-gray-400"
          }`}
        />
      </div>
    </div>
  );
};

export default function SearchPage() {
  const { setActiveTab } = useBottomNav();
  const { setTransparent } = useHeader();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setActiveTab("home"); // or create a search tab
    setTransparent(false);
  }, [setActiveTab, setTransparent]);

  // Combine all searchable data
  const allData = useMemo(() => {
    const products = [
      ...readyMadeCurtainsData.map((p) => ({
        ...p,
        type: "product" as const,
        category: "Readymade",
      })),
      ...customCurtainsData.map((p) => ({
        ...p,
        type: "product" as const,
        category: "Custom",
      })),
    ];
    const services = servicesData.map((s) => ({
      ...s,
      type: "service" as const,
    }));
    const companies = companiesData.map((c) => ({
      ...c,
      type: "company" as const,
    }));

    return [...products, ...services, ...companies];
  }, []);

  // Filter results based on search term (only by name/title)
  const searchResults = useMemo(() => {
    if (!searchTerm.trim())
      return { products: [], services: [], companies: [], sections: [] };

    const term = searchTerm.toLowerCase();

    const products = allData
      .filter(
        (item) =>
          item.type === "product" && item.name.toLowerCase().includes(term)
      )
      .slice(0, 10);

    const services = allData
      .filter(
        (item) =>
          item.type === "service" && item.name.toLowerCase().includes(term)
      )
      .slice(0, 10);

    const companies = allData
      .filter(
        (item) =>
          item.type === "company" && item.name.toLowerCase().includes(term)
      )
      .slice(0, 10);

    // Section results
    const sections: SearchResult[] = [];
    const sectionData = [
      {
        name: "Services",
        sectionType: "services" as const,
        keywords: [
          "service",
          "services",
          "consultation",
          "measurement",
          "installation",
        ],
      },
      {
        name: "Readymade Curtains",
        sectionType: "readymade" as const,
        keywords: ["readymade", "ready made", "curtain", "curtains", "ready"],
      },
      {
        name: "Custom Curtains",
        sectionType: "custom" as const,
        keywords: ["custom", "customized", "made to order", "bespoke"],
      },
      {
        name: "Companies",
        sectionType: "companies" as const,
        keywords: [
          "company",
          "companies",
          "retailer",
          "retailers",
          "store",
          "stores",
        ],
      },
    ];

    sectionData.forEach((section) => {
      if (
        section.keywords.some(
          (keyword) => keyword.includes(term) || term.includes(keyword)
        )
      ) {
        sections.push({
          id: section.sectionType,
          name: section.name,
          type: "section",
          sectionType: section.sectionType,
        });
      }
    });

    return { products, services, companies, sections };
  }, [searchTerm, allData]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setIsSearching(true);
    // Update URL
    const params = new URLSearchParams();
    if (term) params.set("q", term);
    router.replace(`/search?${params.toString()}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="pt-16">
        {/* Search Header */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for curtains, services, companies..."
                className="w-full pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none md:text-lg"
                autoFocus
              />
              {searchTerm && (
                <button
                  onClick={() => handleSearch("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          {searchTerm && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Search Results for "{searchTerm}"
              </h2>
              <p className="text-gray-600">
                {searchResults.products.length +
                  searchResults.services.length +
                  searchResults.companies.length +
                  searchResults.sections.length}{" "}
                results found
              </p>
            </div>
          )}

          {/* Sections */}
          {searchResults.sections.length > 0 && (
            <div className="mb-8">
              <h3 className="text-md font-semibold text-gray-800 mb-4">
                Browse Categories
              </h3>
              <div className="space-y-3">
                {searchResults.sections.map((result) => (
                  <SearchResultItem
                    key={`section-${result.id}`}
                    result={result}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Products Section */}
          {searchResults.products.length > 0 && (
            <div className="mb-8">
              <h3 className="text-md font-semibold text-gray-800 mb-4">
                Products
              </h3>
              <div className="space-y-3">
                {searchResults.products.map((result) => (
                  <SearchResultItem
                    key={`product-${result.id}`}
                    result={result}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Services Section */}
          {searchResults.services.length > 0 && (
            <div className="mb-8">
              <h3 className="text-md font-semibold text-gray-800 mb-4">
                Services
              </h3>
              <div className="space-y-3">
                {searchResults.services.map((result) => (
                  <SearchResultItem
                    key={`service-${result.id}`}
                    result={result}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Companies Section */}
          {searchResults.companies.length > 0 && (
            <div className="mb-8">
              <h3 className="text-md font-semibold text-gray-800 mb-4">
                Companies
              </h3>
              <div className="space-y-3">
                {searchResults.companies.map((result) => (
                  <SearchResultItem
                    key={`company-${result.id}`}
                    result={result}
                  />
                ))}
              </div>
            </div>
          )}

          {searchTerm &&
          searchResults.products.length === 0 &&
          searchResults.services.length === 0 &&
          searchResults.companies.length === 0 &&
          searchResults.sections.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-600">
                Try searching for product names, service names, or company names
              </p>
            </div>
          ) : !searchTerm ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Start searching
              </h3>
              <p className="text-gray-600">
                Search for curtains, services, and companies by name
              </p>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
