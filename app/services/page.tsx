"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Calendar, X, MapPin, Star } from "lucide-react";
import ServiceCard from "@/components/home/ServiceCard";
import Button from "@/components/ui/Button";
import { useBottomNav } from "@/context/BottomNavContext";
import { useHeader } from "@/context/HeaderContext";
import { servicesData, ServiceProfile } from "@/lib/servicesData";

export default function ServicesPage() {
  const { setActiveTab } = useBottomNav();
  const {
    setTransparent,
    setPageTitle,
    setShowSearch,
    searchTerm,
    setSearchTerm,
  } = useHeader();
  const [selectedRole, setSelectedRole] = useState<
    "all" | "consultant" | "fitter"
  >("all");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "available" | "unavailable"
  >("all");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    setActiveTab("services");
    setTransparent(false);
    setPageTitle("Services");
    setShowSearch(true);
  }, [setActiveTab, setTransparent, setPageTitle, setShowSearch]);

  // Get unique locations
  const locations = [
    "All Locations",
    ...Array.from(new Set(servicesData.map((service) => service.location))),
  ];

  // Filter services
  const filteredServices = servicesData.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || service.role === selectedRole;
    const matchesLocation =
      selectedLocation === "All Locations" ||
      service.location === selectedLocation;
    const matchesStatus =
      selectedStatus === "all" || service.status === selectedStatus;

    return matchesSearch && matchesRole && matchesLocation && matchesStatus;
  });

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedRole("all");
    setSelectedLocation("All Locations");
    setSelectedStatus("all");
    setSelectedDate(null);
  };

  const hasActiveFilters =
    searchTerm ||
    selectedRole !== "all" ||
    selectedLocation !== "All Locations" ||
    selectedStatus !== "all" ||
    selectedDate;

  return (
    <div className="bg-gray-50 pb-10">
      <main className="pt-16">
        {/* Filter Buttons */}
        <div className="bg-white border-b">
          <div className="section-padding py-2">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
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
                        {(searchTerm ? 1 : 0) +
                          (selectedRole !== "all" ? 1 : 0) +
                          (selectedLocation !== "All Locations" ? 1 : 0) +
                          (selectedStatus !== "all" ? 1 : 0) +
                          (selectedDate ? 1 : 0)}
                      </span>
                    )}
                  </Button>

                  {hasActiveFilters && (
                    <span className="text-sm text-gray-600">
                      {filteredServices.length} services found
                    </span>
                  )}
                </div>

                <Button
                  variant="ghost"
                  onClick={() => setShowCalendar(true)}
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  {selectedDate
                    ? selectedDate.toLocaleDateString()
                    : "Select Date"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="section-padding py-8">
          <div className="max-w-7xl mx-auto">
            {filteredServices.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {filteredServices.map((profile) => (
                    <ServiceCard key={profile.id} profile={profile} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No services found
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
                    Role
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: "all", label: "All Roles" },
                      { value: "consultant", label: "Consultants" },
                      { value: "fitter", label: "Fitters" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="role"
                          value={option.value}
                          checked={selectedRole === option.value}
                          onChange={(e) =>
                            setSelectedRole(e.target.value as any)
                          }
                          className="mr-2"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>

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
                    Status
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: "all", label: "All Status" },
                      { value: "available", label: "Available" },
                      { value: "unavailable", label: "Unavailable" },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value={option.value}
                          checked={selectedStatus === option.value}
                          onChange={(e) =>
                            setSelectedStatus(e.target.value as any)
                          }
                          className="mr-2"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
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
                <Button
                  onClick={() => setShowFilters(false)}
                  className="flex-1"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Calendar Modal */}
        {showCalendar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-sm w-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold">Select Date</h3>
                <button
                  onClick={() => setShowCalendar(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4">
                <input
                  type="date"
                  value={
                    selectedDate ? selectedDate.toISOString().split("T")[0] : ""
                  }
                  onChange={(e) => {
                    const date = e.target.value
                      ? new Date(e.target.value)
                      : null;
                    setSelectedDate(date);
                  }}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Select a date to find available service providers
                </p>
              </div>

              <div className="flex gap-3 p-4 border-t">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSelectedDate(null);
                    setShowCalendar(false);
                  }}
                  className="flex-1"
                >
                  Clear
                </Button>
                <Button
                  onClick={() => setShowCalendar(false)}
                  className="flex-1"
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
