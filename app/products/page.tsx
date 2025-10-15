"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Search,
  Filter,
  MapPin,
  Star,
  X,
  SlidersHorizontal,
} from "lucide-react";
import ProductCard from "@/components/home/ProductCard";
import CustomCurtainCard from "@/components/home/CustomCurtainCard";
import Button from "@/components/ui/Button";
import { useBottomNav } from "@/context/BottomNavContext";
import { useHeader } from "@/context/HeaderContext";
import {
  readyMadeCurtainsData,
  customCurtainsData,
  cities,
  companies,
  types,
  colors,
  priceRanges,
  ratings,
  sortOptions,
  type ExtendedProduct,
} from "@/lib/productsData";

export default function ProductsPage() {
  const { setActiveTab } = useBottomNav();
  const {
    setTransparent,
    setPageTitle,
    setShowSearch,
    searchTerm,
    setSearchTerm,
  } = useHeader();
  const searchParams = useSearchParams();
  const [activeProductTab, setActiveProductTab] = useState<
    "readymade" | "custom"
  >("readymade");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedColor, setSelectedColor] = useState("All Colors");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
  const [selectedRating, setSelectedRating] = useState("All Ratings");
  const [sortBy, setSortBy] = useState("Recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    setActiveTab("products");
    setTransparent(false);
    setPageTitle(
      activeProductTab === "readymade" ? "Readymade" : "Custom Curtains"
    );
    setShowSearch(true);

    // Check for city param
    const cityParam = searchParams.get("city");
    if (cityParam && cities.includes(cityParam)) {
      setSelectedCity(cityParam);
    }

    // Check for tab param
    const tabParam = searchParams.get("tab");
    if (tabParam === "readymade" || tabParam === "custom") {
      setActiveProductTab(tabParam);
    }
  }, [
    setActiveTab,
    setTransparent,
    setPageTitle,
    setShowSearch,
    activeProductTab,
    searchParams,
  ]);

  // Get current products based on active tab
  const currentProducts =
    activeProductTab === "readymade"
      ? readyMadeCurtainsData
      : customCurtainsData;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = currentProducts.filter((product) => {
      // Search filter
      if (
        searchTerm &&
        !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !product.retailerName.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // City filter
      if (selectedCity !== "All Cities" && product.city !== selectedCity) {
        return false;
      }

      // Company filter
      if (
        selectedCompany !== "All Companies" &&
        product.retailerName !== selectedCompany
      ) {
        return false;
      }

      // Type filter
      if (selectedType !== "All Types" && product.type !== selectedType) {
        return false;
      }

      // Color filter
      if (selectedColor !== "All Colors" && product.color !== selectedColor) {
        return false;
      }

      // Price filter
      if (selectedPriceRange !== "All Prices") {
        const price = product.price;
        switch (selectedPriceRange) {
          case "Under ₹500":
            if (price >= 500) return false;
            break;
          case "₹500 - ₹1,000":
            if (price < 500 || price > 1000) return false;
            break;
          case "₹1,000 - ₹2,000":
            if (price < 1000 || price > 2000) return false;
            break;
          case "₹2,000 - ₹5,000":
            if (price < 2000 || price > 5000) return false;
            break;
          case "Above ₹5,000":
            if (price <= 5000) return false;
            break;
        }
      }

      // Rating filter
      if (selectedRating !== "All Ratings" && product.rating) {
        const minRating = parseFloat(selectedRating.split("+")[0]);
        if (product.rating < minRating) return false;
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case "Price: Low to High":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "Highest Rated":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "Newest First":
        filtered.reverse();
        break;
    }

    return filtered;
  }, [
    currentProducts,
    searchTerm,
    selectedCity,
    selectedCompany,
    selectedType,
    selectedColor,
    selectedPriceRange,
    selectedRating,
    sortBy,
  ]);

  const hasActiveFilters =
    searchTerm ||
    selectedCity !== "All Cities" ||
    selectedCompany !== "All Companies" ||
    selectedType !== "All Types" ||
    selectedColor !== "All Colors" ||
    selectedPriceRange !== "All Prices" ||
    selectedRating !== "All Ratings";

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCity("All Cities");
    setSelectedCompany("All Companies");
    setSelectedType("All Types");
    setSelectedColor("All Colors");
    setSelectedPriceRange("All Prices");
    setSelectedRating("All Ratings");
    setSortBy("Recommended");
  };

  return (
    <div className="bg-gray-50 pb-10">
      <main className="pt-16">
        {/* Product Tabs - Full Width */}
        <div className="bg-white border-b">
          <div className="flex">
            <button
              onClick={() => setActiveProductTab("readymade")}
              className={`flex-1 py-4 px-4 font-medium text-sm transition-colors ${
                activeProductTab === "readymade"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Ready-Made Curtains
            </button>
            <button
              onClick={() => setActiveProductTab("custom")}
              className={`flex-1 py-4 px-4 font-medium text-sm transition-colors ${
                activeProductTab === "custom"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Custom Curtains
            </button>
          </div>
        </div>

        {/* Cities Filter - Hidden Scrollbar */}
        <div className="bg-white py-3">
          <div className="w-full">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pl-4">
              <div className="flex flex-col items-center gap-2 p-2">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-gray-500" />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">
                  Location
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
                      onClick={() => setSelectedCity(city)}
                      className={`flex flex-col items-center gap-2 p-2 rounded-lg transition-all ${
                        selectedCity === city
                          ? "border-primary"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`relative w-16 h-16 rounded-full overflow-hidden border-2 flex-shrink-0 ${
                          selectedCity === city
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-gray-200"
                        }`}
                      >
                        <Image
                          src={`/images/${city.toLowerCase()}.jpg`}
                          alt={city}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <span
                        className={`text-sm text-center font-medium ${
                          selectedCity === city
                            ? "text-primary"
                            : "text-gray-700"
                        }`}
                      >
                        {city}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Sort - Single Line on Mobile */}
        <div className="bg-white border-b">
          <div className="section-padding py-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(true)}
                    className="flex items-center gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                    {hasActiveFilters && (
                      <span className="ml-1 bg-primary text-white text-xs rounded-full px-1.5 py-0.5">
                        {[
                          searchTerm ? 1 : 0,
                          selectedCity !== "All Cities" ? 1 : 0,
                          selectedCompany !== "All Companies" ? 1 : 0,
                          selectedType !== "All Types" ? 1 : 0,
                          selectedColor !== "All Colors" ? 1 : 0,
                          selectedPriceRange !== "All Prices" ? 1 : 0,
                          selectedRating !== "All Ratings" ? 1 : 0,
                        ].reduce((a, b) => a + b, 0)}
                      </span>
                    )}
                  </Button>

                  {hasActiveFilters && (
                    <span className="text-sm text-gray-600 hidden md:inline">
                      {filteredProducts.length} products found
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 hidden md:inline">
                    Sort by:
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSort(true)}
                    className="flex items-center gap-2"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="hidden md:inline">{sortBy}</span>
                    <span className="md:hidden">Sort</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="section-padding py-8">
          <div className="max-w-7xl mx-auto">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredProducts.map((product) =>
                  activeProductTab === "readymade" ? (
                    <ProductCard key={product.id} product={product} />
                  ) : (
                    <CustomCurtainCard key={product.id} product={product} />
                  )
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button variant="secondary" onClick={clearAllFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Filters Modal */}
      {showFilters && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowFilters(false)}
        >
          <div
            className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <select
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {companies.map((company) => (
                    <option key={company} value={company}>
                      {company}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {priceRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {ratings.map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 p-4 border-t">
              <Button
                variant="secondary"
                onClick={clearAllFilters}
                className="flex-1"
              >
                Clear All
              </Button>
              <Button onClick={() => setShowFilters(false)} className="flex-1">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Sort Modal */}
      {showSort && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowSort(false)}
        >
          <div
            className="bg-white rounded-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Sort By</h3>
              <button
                onClick={() => setShowSort(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSortBy(option);
                    setShowSort(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded mb-1 ${
                    sortBy === option
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
