"use client";

import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Star,
  Filter,
  SlidersHorizontal,
  X,
} from "lucide-react";
import CompanyProfileCard from "@/components/home/CompanyCard";
import Button from "@/components/ui/Button";
import { useBottomNav } from "@/context/BottomNavContext";
import { useHeader } from "@/context/HeaderContext";
import { companiesData, CompanyProfile } from "@/lib/companiesData";

export default function CompaniesPage() {
  const { setActiveTab } = useBottomNav();
  const { setTransparent } = useHeader();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedRating, setSelectedRating] = useState("All Ratings");
  const [sortBy, setSortBy] = useState("Recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    setActiveTab("companies");
    setTransparent(false);
  }, [setActiveTab, setTransparent]);

  // Get unique locations
  const locations = [
    "All Locations",
    ...Array.from(
      new Set(
        companiesData.map(
          (company) =>
            company.location.split(",")[1]?.trim() || company.location
        )
      )
    ),
  ];

  const ratings = ["All Ratings", "4.5+ Stars", "4.0+ Stars", "3.5+ Stars"];
  const sortOptions = [
    "Recommended",
    "Highest Rated",
    "Most Reviews",
    "Newest First",
  ];

  // Filter and sort companies
  const filteredCompanies = companiesData
    .filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.specialties.some((specialty) =>
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesLocation =
        selectedLocation === "All Locations" ||
        company.location.includes(selectedLocation);

      const matchesRating =
        selectedRating === "All Ratings" ||
        company.rating >= parseFloat(selectedRating.split("+")[0]);

      return matchesSearch && matchesLocation && matchesRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Highest Rated":
          return b.rating - a.rating;
        case "Most Reviews":
          return b.reviewCount - a.reviewCount;
        case "Newest First":
          return parseInt(b.established) - parseInt(a.established);
        default:
          return 0;
      }
    });

  const hasActiveFilters =
    searchTerm ||
    selectedLocation !== "All Locations" ||
    selectedRating !== "All Ratings";

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedLocation("All Locations");
    setSelectedRating("All Ratings");
    setSortBy("Recommended");
  };

  return (
    <div className="bg-gray-50 pb-10 md:pb-0">
      <main className="pt-16">
        {/* Search Bar */}
        <div className="bg-white">
          <div className="section-padding py-4">
            <div className="max-w-7xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search companies, locations, specialties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
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
                          selectedLocation !== "All Locations" ? 1 : 0,
                          selectedRating !== "All Ratings" ? 1 : 0,
                        ].reduce((a, b) => a + b, 0)}
                      </span>
                    )}
                  </Button>

                  {hasActiveFilters && (
                    <span className="text-sm text-gray-600 hidden md:inline">
                      {filteredCompanies.length} companies found
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

        {/* Companies Grid */}
        <div className="section-padding py-8">
          <div className="max-w-7xl mx-auto">
            {filteredCompanies.length > 0 ? (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredCompanies.map((company) => (
                    <CompanyProfileCard key={company.id} company={company} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No companies found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedLocation("All Locations");
                    setSelectedRating("All Ratings");
                    setSortBy("Recommended");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
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
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
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
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
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
