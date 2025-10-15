"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Star,
  MapPin,
  Calendar,
  Award,
  Phone,
  Share2,
  Building2,
  Package,
} from "lucide-react";
import { companiesData, CompanyProfile } from "@/lib/companiesData";
import {
  readyMadeCurtainsData,
  customCurtainsData,
  ExtendedProduct,
} from "@/lib/productsData";
import { useHeader } from "@/context/HeaderContext";
import ProductCard from "@/components/home/ProductCard";
import CustomCurtainCard from "@/components/home/CustomCurtainCard";
import CompanyCard from "@/components/home/CompanyCard";
import Link from "next/link";
import clsx from "clsx";

export default function CompanyDetailsPage() {
  const params = useParams();
  const { setTransparent } = useHeader();
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [readymadeProducts, setReadymadeProducts] = useState<ExtendedProduct[]>(
    []
  );
  const [customProducts, setCustomProducts] = useState<ExtendedProduct[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "readymade" | "custom">(
    "all"
  );
  const [otherCompanies, setOtherCompanies] = useState<CompanyProfile[]>([]);
  const [similarProducts, setSimilarProducts] = useState<ExtendedProduct[]>([]);

  useEffect(() => {
    setTransparent(false);
  }, [setTransparent]);

  useEffect(() => {
    if (params.id) {
      const companyId = parseInt(params.id as string);
      const foundCompany = companiesData.find((c) => c.id === companyId);

      if (foundCompany) {
        setCompany(foundCompany);

        // Filter products by company name
        const readymade = readyMadeCurtainsData.filter(
          (product) => product.retailerName === foundCompany.name
        );
        const custom = customCurtainsData.filter(
          (product) => product.retailerName === foundCompany.name
        );

        setReadymadeProducts(readymade);
        setCustomProducts(custom);

        // Get other companies (excluding current one)
        const other = companiesData.filter((c) => c.id !== companyId);
        setOtherCompanies(other);

        // Get similar products from other companies (same category/type)
        const allProducts = [...readyMadeCurtainsData, ...customCurtainsData];
        const similar = allProducts
          .filter((product) => product.retailerName !== foundCompany.name)
          .filter((product) => {
            // Find products with similar tags or types
            const companyProducts = [...readymade, ...custom];
            return companyProducts.some((cp) =>
              cp.tags?.some((tag) => product.tags?.includes(tag))
            );
          })
          .slice(0, 6); // Limit to 6 similar products

        setSimilarProducts(similar);
      }
    }
  }, [params.id]);

  if (!company) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading company details...</p>
        </div>
      </div>
    );
  }

  const filteredProducts =
    activeTab === "all"
      ? [...readymadeProducts, ...customProducts]
      : activeTab === "readymade"
      ? readymadeProducts
      : customProducts;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-primary/5 to-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Company Logo */}
            <div className="relative flex-shrink-0">
              <Image
                src={company.image}
                alt={company.name}
                width={160}
                height={160}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-3 left-4 bg-white px-3 py-1 rounded-lg text-sm text-gray-600 shadow-md border">
                {company.location.split(",")[0]}
              </div>
            </div>

            {/* Company Info */}
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  {company.name}
                </h1>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
                  {company.description}
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <div>
                    <div className="text-sm font-semibold">
                      {company.rating}
                    </div>
                    <div className="text-xs text-gray-500">
                      {company.reviewCount} reviews
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-semibold">Established</div>
                    <div className="text-xs text-gray-500">
                      {company.established}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <Package className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-semibold">Products</div>
                    <div className="text-xs text-gray-500">
                      {readymadeProducts.length + customProducts.length} items
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:1800123456`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-200"
                >
                  <MapPin className="h-5 w-5" />
                  Visit Store
                </a>
                <button
                  onClick={() =>
                    navigator.share?.({
                      title: company.name,
                      text: company.description,
                      url: window.location.href,
                    })
                  }
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* About Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            About {company.name}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="md:col-span-2">
              <p className="text-gray-700 leading-relaxed text-lg">
                {company.description}
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <div className="font-semibold text-gray-900">Address</div>
                  <div className="text-gray-600" id="contact">
                    {company.location}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Our Products</h2>
            <div className="flex flex-wrap bg-gray-100 rounded-xl p-1 gap-1">
              <button
                onClick={() => setActiveTab("all")}
                className={clsx(
                  "px-4 py-2 rounded-lg font-medium transition-colors text-sm",
                  activeTab === "all"
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                All ({readymadeProducts.length + customProducts.length})
              </button>
              <button
                onClick={() => setActiveTab("readymade")}
                className={clsx(
                  "px-4 py-2 rounded-lg font-medium transition-colors text-sm",
                  activeTab === "readymade"
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                Readymade ({readymadeProducts.length})
              </button>
              <button
                onClick={() => setActiveTab("custom")}
                className={clsx(
                  "px-4 py-2 rounded-lg font-medium transition-colors text-sm",
                  activeTab === "custom"
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                Custom ({customProducts.length})
              </button>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="overflow-x-auto pb-4 -mx-2 px-2">
              <div className="flex gap-4 min-w-max">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="flex-shrink-0 w-72 sm:w-80">
                    {product.category === "custom" ? (
                      <CustomCurtainCard product={product} />
                    ) : (
                      <ProductCard product={product} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products available
              </h3>
              <p className="text-gray-600">
                This company doesn't have any products in this category at the
                moment.
              </p>
            </div>
          )}
        </div>

        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <Package className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Similar Products from Other Companies
              </h2>
            </div>
            <div className="overflow-x-auto pb-4 -mx-2 px-2">
              <div className="flex gap-4 min-w-max">
                {similarProducts.map((product) => (
                  <div key={product.id} className="flex-shrink-0 w-72 sm:w-80">
                    {product.category === "custom" ? (
                      <CustomCurtainCard product={product} />
                    ) : (
                      <ProductCard product={product} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other Companies Section */}
        {otherCompanies.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Other Companies
              </h2>
            </div>
            <div className="overflow-x-auto pb-4 -mx-2 px-2">
              <div className="flex gap-4 min-w-max">
                {otherCompanies.slice(0, 4).map((otherCompany) => (
                  <div
                    key={otherCompany.id}
                    className="flex-shrink-0 w-72 sm:w-80"
                  >
                    <CompanyCard company={otherCompany} />
                  </div>
                ))}
              </div>
            </div>
            {otherCompanies.length > 4 && (
              <div className="text-center mt-8">
                <Link
                  href="/companies"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                >
                  View All Companies
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
