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
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { productDetailsData } from "@/lib/productsData";
import { ProductDetails } from "@/types";
import ServicesSection from "@/components/product/ServicesSection";
import ReviewsSection from "@/components/product/ReviewsSection";
import SpecificationsSection from "@/components/product/SpecificationsSection";
import PoliciesSection from "@/components/product/PoliciesSection";
import { useBottomNav } from "@/context/BottomNavContext";
import { useHeader } from "@/context/HeaderContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { setActiveTab } = useBottomNav();
  const { setTransparent } = useHeader();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlistItems, isInWishlist } =
    useWishlist();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedLining, setSelectedLining] = useState(0);
  const [selectedHeader, setSelectedHeader] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customRemarks, setCustomRemarks] = useState("");

  useEffect(() => {
    setActiveTab("products");
    setTransparent(false);
  }, [setActiveTab, setTransparent]);

  useEffect(() => {
    if (params.id && typeof params.id === "string") {
      const productData = productDetailsData[params.id];
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
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  const currentPrice =
    product.price +
    product.sizes[selectedSize].price +
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

  const handleAddToCart = () => {
    const cartItem = {
      productId: product.id,
      productType: "readymade" as const,
      name: product.name,
      image: product.images[0],
      quantity,
      price: totalPrice / quantity,
      totalPrice,
      customizations: {
        selectedSize: product.sizes[selectedSize],
        selectedColor: product.colors[selectedColor],
        selectedLining: product.lining[selectedLining],
        selectedHeader: product.header[selectedHeader],
      },
    };
    addToCart(cartItem);
    // Show success message or toast
  };

  const handleAddToWishlist = () => {
    if (isInWishlist(product.id)) {
      // Remove from wishlist - but useWishlist doesn't have removeFromWishlist by productId, only by itemId
      // Actually, the context has removeFromWishlist(itemId), but we need to find the itemId
      // For simplicity, since it's toggle, we can call addToWishlist which checks if already in
      // But the context addToWishlist checks and doesn't add if already in
      // To remove, we need the itemId. Let's modify the context or find another way.
      // Actually, the context addToWishlist already checks if in wishlist and doesn't add again.
      // But to remove, we need to call removeFromWishlist with the item id.
      // So, let's find the item and remove it.
      const item = wishlistItems.find((item) => item.productId === product.id);
      if (item) {
        removeFromWishlist(item.id);
      }
    } else {
      const wishlistItem = {
        productId: product.id,
        productType: "readymade" as const,
        name: product.name,
        image: product.images[0],
        price: product.price,
      };
      addToWishlist(wishlistItem);
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
                  <div className="absolute top-4 left-4 flex gap-2">
                    <button
                      onClick={handleAddToWishlist}
                      className={`p-2 rounded-full shadow-lg transition-all ${
                        isInWishlist(product.id)
                          ? "bg-red-500 text-white"
                          : "bg-white/90 hover:bg-white text-gray-700"
                      }`}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isInWishlist(product.id) ? "fill-current" : ""
                        }`}
                      />
                    </button>
                    <button className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-all">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>

                  {/* AR Try Button */}
                  <button className="absolute top-4 right-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all font-semibold text-sm flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    AR
                  </button>
                </div>

                {/* Thumbnail Images */}
                {product.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index
                            ? "border-primary"
                            : "border-gray-200"
                        }`}
                      >
                        <Image
                          src={`/images/${image}`}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-6 w-full">
                {/* Title and Rating */}
                <div className="w-full">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating || 0)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-lg font-semibold">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-gray-600">
                      ({product.reviewCount} reviews)
                    </span>
                  </div>
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
                  <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                          selectedColor === index
                            ? "border-primary scale-110"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColor === index && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {product.colors[selectedColor].name}
                  </p>
                </div>

                {/* Size Selection */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {product.sizes.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(index)}
                        className={`p-3 border rounded-lg text-center transition-all ${
                          selectedSize === index
                            ? "border-primary bg-primary text-white"
                            : "border-gray-300 hover:border-primary"
                        }`}
                      >
                        <div className="font-medium">{size.label}</div>
                        <div className="text-sm opacity-75">
                          {size.price === 0 ? "Base" : `+₹${size.price}`}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lining Selection */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Lining</h3>
                  <div className="space-y-2">
                    {product.lining.map((lining, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedLining(index)}
                        className={`w-full p-3 border rounded-lg text-left transition-all ${
                          selectedLining === index
                            ? "border-primary bg-primary/5"
                            : "border-gray-300 hover:border-primary"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{lining.name}</div>
                            <div className="text-sm text-gray-600">
                              {lining.description}
                            </div>
                          </div>
                          <div className="text-sm font-medium">
                            {lining.price === 0
                              ? "Included"
                              : lining.price > 0
                              ? `+₹${lining.price}`
                              : `₹${lining.price}`}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Header Selection */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Header Style
                  </h3>
                  <div className="space-y-2">
                    {product.header.map((header, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedHeader(index)}
                        className={`w-full p-3 border rounded-lg text-left transition-all ${
                          selectedHeader === index
                            ? "border-primary bg-primary/5"
                            : "border-gray-300 hover:border-primary"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{header.name}</div>
                            <div className="text-sm text-gray-600">
                              {header.description}
                            </div>
                          </div>
                          <div className="text-sm font-medium">
                            {header.price === 0
                              ? "Included"
                              : header.price > 0
                              ? `+₹${header.price}`
                              : `₹${header.price}`}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Remarks */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Custom Remarks
                  </h3>
                  <textarea
                    value={customRemarks}
                    onChange={(e) => setCustomRemarks(e.target.value)}
                    placeholder="Any special customization requests..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>

                {/* Quantity */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 border border-gray-300 rounded-lg hover:border-primary transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 border border-gray-300 rounded-lg min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 border border-gray-300 rounded-lg hover:border-primary transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="secondary"
                    className="flex-1 py-3"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button className="flex-1 bg-primary hover:bg-primary-dark text-white py-3">
                    Buy Now
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 text-center mt-6">
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

                {/* Services Section */}
                <ServicesSection />
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="bg-white border-t">
          <div className="section-padding py-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <SpecificationsSection
          specifications={product.specifications}
          selectedSize={product.sizes[selectedSize].label}
          selectedHeader={product.header[selectedHeader].name}
          selectedLining={product.lining[selectedLining].name}
          selectedColor={product.colors[selectedColor].name}
          quantity={quantity}
          totalPrice={totalPrice}
          isReadymade={true}
        />

        {/* Reviews */}
        <ReviewsSection reviews={product.reviews} />

        {/* Policies */}
        <PoliciesSection policies={product.policies} />
      </main>
    </div>
  );
}
