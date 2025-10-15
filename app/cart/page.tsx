"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useBottomNav } from "@/context/BottomNavContext";
import { useHeader } from "@/context/HeaderContext";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    clearCart,
  } = useCart();
  const { setActiveTab } = useBottomNav();
  const { setTransparent } = useHeader();
  const router = useRouter();

  useEffect(() => {
    setActiveTab("products");
    setTransparent(false);
  }, [setActiveTab, setTransparent]);

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <main className="pt-16 pb-10">
          <div className="section-padding py-16">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Your cart is empty
              </h1>
              <p className="text-gray-600 mb-8">
                Add some beautiful curtains to get started
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
                Shopping Cart ({cartItems.length} items)
              </h1>
            </div>
          </div>
        </div>

        <div className="section-padding py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm p-6"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {(() => {
                          // Ensure we pass a valid /images/... path to next/Image
                          const img = item.image?.startsWith("/images/")
                            ? item.image
                            : `/images/${item.image || "readymade1.png"}`;
                          return (
                            <Image
                              src={img}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          );
                        })()}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Type: {item.productType}
                        </p>

                        {/* Customizations */}
                        <div className="text-sm text-gray-600 space-y-1">
                          {item.customizations.selectedSize && (
                            <p>
                              Size: {item.customizations.selectedSize.label}
                            </p>
                          )}
                          {item.customizations.selectedColor && (
                            <p>
                              Color: {item.customizations.selectedColor.name}
                            </p>
                          )}
                          {item.customizations.width &&
                            item.customizations.height && (
                              <p>
                                Dimensions: {item.customizations.width}m x{" "}
                                {item.customizations.height}m
                              </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1 border border-gray-300 rounded hover:border-primary"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-1 border border-gray-300 rounded min-w-[50px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1 border border-gray-300 rounded hover:border-primary"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              ₹{item.totalPrice.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600">
                              ₹{item.price.toLocaleString()} each
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Subtotal ({cartItems.length} items)
                      </span>
                      <span className="font-medium">
                        ₹{getTotalPrice().toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">
                        ₹{Math.round(getTotalPrice() * 0.18).toLocaleString()}
                      </span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>
                        ₹
                        {(
                          getTotalPrice() + Math.round(getTotalPrice() * 0.18)
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      Proceed to Checkout
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
