"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Star,
  Heart,
  Share2,
  Camera,
  Plus,
  Minus,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Ruler,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { customCurtainDetailsData } from "@/lib/productsData";
import { ProductDetails } from "@/types";
import { useBottomNav } from "@/context/BottomNavContext";
import { useHeader } from "@/context/HeaderContext";
import ServicesSection from "@/components/product/ServicesSection";
import ReviewsSection from "@/components/product/ReviewsSection";
import SpecificationsSection from "@/components/product/SpecificationsSection";
import PoliciesSection from "@/components/product/PoliciesSection";

export default function CustomCurtainDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { setActiveTab } = useBottomNav();
  const { setTransparent } = useHeader();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedLining, setSelectedLining] = useState(0);
  const [selectedHeader, setSelectedHeader] = useState(0);
  const [width, setWidth] = useState(2); // in meters
  const [height, setHeight] = useState(2.5); // in meters
  const [quantity, setQuantity] = useState(1);
  const [customRemarks, setCustomRemarks] = useState("");

  useEffect(() => {
    setActiveTab("products");
    setTransparent(false);
  }, [setActiveTab, setTransparent]);

  useEffect(() => {
    if (params.id && typeof params.id === "string") {
      const productData = customCurtainDetailsData[params.id];
      if (productData) {
        setProduct(productData);
      } else {
        // Handle product not found
        router.push("/products");
      }
    }
  }, [params.id, router]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading custom curtain details...</p>
        </div>
      </div>
    );
  }

  const area = width * height;
  const basePrice = product.price * area;
  const currentPrice =
    basePrice +
    product.lining[selectedLining].price +
    product.header[selectedHeader].price;
  const totalPrice = currentPrice * quantity;

  const handleImageNavigation = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setSelectedImage((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    } else {
      setSelectedImage((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="pt-16 pb-10">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="section-padding py-3">
            <div className="max-w-7xl mx-auto">
              <nav className="text-sm text-gray-600">
                <span
                  className="hover:text-primary cursor-pointer"
                  onClick={() => router.push("/")}
                >
                  Home
                </span>
                <span className="mx-2">/</span>
                <span
                  className="hover:text-primary cursor-pointer"
                  onClick={() => router.push("/products")}
                >
                  Products
                </span>
                <span className="mx-2">/</span>
                <span className="text-gray-900">{product.name}</span>
              </nav>
            </div>
          </div>
        </div>

        {/* Main Product Section */}
        <div className="section-padding py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Product Images */}
              <div className="space-y-4 lg:sticky lg:top-24">
                {/* Main Image */}
                <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={`/images/${product.images[selectedImage]}`}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />

                  {/* Navigation Arrows */}
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={() => handleImageNavigation("prev")}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleImageNavigation("next")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all">
                      <Heart className="h-5 w-5 text-gray-600" />
                    </button>
                    <button className="bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all">
                      <Share2 className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Thumbnail Images */}
                {product.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index
                            ? "border-primary"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Image
                          src={`/images/${image}`}
                          alt={`${product.name} ${index + 1}`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                {/* Title and Rating */}
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating || 0)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        {product.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({product.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600">{product.description}</p>
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-primary">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      % OFF
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      product.stockCount > 0 ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                  <span
                    className={
                      product.stockCount > 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {product.stockCount > 0
                      ? `${product.stockCount} in stock`
                      : "Out of stock"}
                  </span>
                </div>

                {/* Color Selection */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Color: {product.colors[selectedColor].name}
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`w-12 h-12 rounded-full border-2 transition-all ${
                          selectedColor === index
                            ? "border-primary scale-110"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Custom Remarks */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Special Instructions (Optional)
                  </h3>
                  <textarea
                    value={customRemarks}
                    onChange={(e) => setCustomRemarks(e.target.value)}
                    placeholder="Any special requirements or notes..."
                    className="w-full border border-gray-300 rounded px-3 py-2 h-20 resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button variant="secondary" className="flex-1 py-3">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button className="flex-1 bg-primary hover:bg-primary-dark text-white py-3">
                    Get a quote
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <Truck className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm font-medium">Free Delivery</span>
                    <span className="text-xs text-gray-500">
                      On orders above ₹5000
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Shield className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm font-medium">Quality Assured</span>
                    <span className="text-xs text-gray-500">
                      100% satisfaction
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <RotateCcw className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm font-medium">Easy Returns</span>
                    <span className="text-xs text-gray-500">30-day policy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white border-t border-b">
          <div className="section-padding py-8">
            <div className="max-w-7xl mx-auto">
              <ServicesSection />
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewsSection reviews={product.reviews} />

        {/* Specifications */}
        <SpecificationsSection
          specifications={product.specifications}
          selectedColor={product.colors[selectedColor].name}
          quantity={quantity}
          totalPrice={totalPrice}
          isReadymade={false}
        />

        {/* Policies */}
        <PoliciesSection policies={product.policies} />
      </main>
    </div>
  );
}
