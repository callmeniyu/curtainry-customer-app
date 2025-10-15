"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart } from "lucide-react";
import Button from "@/components/ui/Button";
import { useWishlist } from "@/context/WishlistContext";
import { useBottomNav } from "@/context/BottomNavContext";
import { useHeader } from "@/context/HeaderContext";
import ProductCard from "@/components/home/ProductCard";
import CustomCurtainCard from "@/components/home/CustomCurtainCard";
import { productDetailsData } from "@/lib/productsData";
import { customCurtainDetailsData } from "@/lib/productsData";

export default function WishlistPage() {
  const { wishlistItems } = useWishlist();
  const { setActiveTab } = useBottomNav();
  const { setTransparent } = useHeader();
  const router = useRouter();

  useEffect(() => {
    setActiveTab("products");
    setTransparent(false);
  }, [setActiveTab, setTransparent]);

  if (wishlistItems.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <main className="pt-16 pb-10">
          <div className="section-padding py-16">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-12 w-12 text-gray-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Your wishlist is empty
              </h1>
              <p className="text-gray-600 mb-8">
                Save items you love for later
              </p>
              <Button onClick={() => router.push("/products")}>
                Continue Shopping
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="pt-16 pb-10">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="section-padding py-4">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-900">
                My Wishlist ({wishlistItems.length} items)
              </h1>
            </div>
          </div>
        </div>

        <div className="section-padding py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {wishlistItems.map((item) => {
                // Find the product data based on productId and productType
                const productData =
                  item.productType === "readymade"
                    ? productDetailsData[item.productId]
                    : customCurtainDetailsData[item.productId];

                if (!productData) return null;

                const extendedProduct = {
                  ...productData,
                  image: item.image,
                };

                return item.productType === "readymade" ? (
                  <ProductCard key={item.id} product={extendedProduct} />
                ) : (
                  <CustomCurtainCard key={item.id} product={extendedProduct} />
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
