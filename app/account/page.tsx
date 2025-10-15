"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  User,
  MapPin,
  Package,
  ShoppingCart,
  Heart,
  Edit3,
  Save,
  X,
  Camera,
  Plus,
  Trash2,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useBottomNav } from "@/context/BottomNavContext";
import { useHeader } from "@/context/HeaderContext";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

interface Address {
  id: string;
  type: "home" | "work" | "other";
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export default function AccountPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } =
    useCart();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { setActiveTab } = useBottomNav();
  const { setTransparent } = useHeader();

  const [activeTab, setActiveTabState] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data - in real app, this would come from context/API
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    avatar: "/images/avatar (1).jpg",
  });

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      type: "home",
      name: "John Doe",
      phone: "+91 9876543210",
      address: "123 Main Street, Apartment 4B",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      isDefault: true,
    },
  ]);

  // Mock orders data
  const [orders] = useState([
    {
      id: "ORD001",
      date: "2024-01-15",
      status: "Delivered",
      total: 7998,
      items: [
        { name: "Luxury Velvet Blackout Curtains", quantity: 2, price: 3999 },
      ],
    },
    {
      id: "ORD002",
      date: "2024-01-10",
      status: "In Transit",
      total: 12999,
      items: [{ name: "Custom Silk Curtains", quantity: 1, price: 12999 }],
    },
  ]);

  useEffect(() => {
    setTransparent(false);
  }, [setTransparent]);

  const handleSaveProfile = () => {
    // In real app, save to API
    setIsEditing(false);
  };

  const handleAddAddress = () => {
    const newAddress: Address = {
      id: Date.now().toString(),
      type: "home",
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: false,
    };
    setAddresses([...addresses, newAddress]);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "orders", label: "Orders", icon: Package },
    { id: "cart", label: "Cart", icon: ShoppingCart },
    { id: "wishlist", label: "Wishlist", icon: Heart },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="pt-16 pb-10">
        <div className="section-padding py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-3 md:gap-8">
              {/* Sidebar */}
              <div className="flex-shrink-0 lg:w-1/4">
                <Card className="p-2 md:p-6">
                  <nav className="space-y-2">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTabState(tab.id)}
                          className={`w-full flex items-center justify-center lg:justify-start gap-2 lg:gap-3 px-2 lg:px-4 py-3 rounded-lg text-left transition-colors ${
                            activeTab === tab.id
                              ? "bg-primary text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <Icon className="h-5 w-5 flex-shrink-0" />
                          <span className="hidden lg:inline">{tab.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </Card>
              </div>

              {/* Main Content */}
              <div className="w-full lg:flex-1">
                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <Card className="p-3 md:p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Personal Information
                      </h2>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center gap-2 px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                      >
                        <Edit3 className="h-4 w-4" />
                        {isEditing ? "Cancel" : "Edit"}
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Avatar */}
                      <div className="flex items-center gap-6">
                        <div className="relative w-20 h-20">
                          <Image
                            src={userProfile.avatar}
                            alt="Profile"
                            width={80}
                            height={80}
                            className="rounded-full object-cover w-full h-full"
                          />
                          {isEditing && (
                            <button className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full">
                              <Camera className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {userProfile.name}
                          </h3>
                          <p className="text-gray-600">{userProfile.email}</p>
                        </div>
                      </div>

                      {/* Form Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={userProfile.name}
                              onChange={(e) =>
                                setUserProfile({
                                  ...userProfile,
                                  name: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          ) : (
                            <p className="text-gray-900">{userProfile.name}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          {isEditing ? (
                            <input
                              type="email"
                              value={userProfile.email}
                              onChange={(e) =>
                                setUserProfile({
                                  ...userProfile,
                                  email: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          ) : (
                            <p className="text-gray-900">{userProfile.email}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone
                          </label>
                          {isEditing ? (
                            <input
                              type="tel"
                              value={userProfile.phone}
                              onChange={(e) =>
                                setUserProfile({
                                  ...userProfile,
                                  phone: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          ) : (
                            <p className="text-gray-900">{userProfile.phone}</p>
                          )}
                        </div>
                      </div>

                      {isEditing && (
                        <div className="flex gap-4">
                          <Button onClick={handleSaveProfile}>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setIsEditing(false)}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                )}

                {/* Addresses Tab */}
                {activeTab === "addresses" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">
                        My Addresses
                      </h2>
                      <Button onClick={handleAddAddress}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Address
                      </Button>
                    </div>

                    {addresses.map((address) => (
                      <Card key={address.id} className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-medium text-gray-700 capitalize">
                                {address.type}
                              </span>
                              {address.isDefault && (
                                <span className="text-xs bg-primary text-white px-2 py-1 rounded">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="font-medium text-gray-900 mb-1">
                              {address.name}
                            </p>
                            <p className="text-gray-600 text-sm mb-1">
                              {address.phone}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {address.address}, {address.city}, {address.state}{" "}
                              - {address.pincode}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 text-gray-500 hover:text-primary">
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteAddress(address.id)}
                              className="p-2 text-gray-500 hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Orders Tab */}
                {activeTab === "orders" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Order History
                    </h2>

                    {orders.map((order) => (
                      <Card key={order.id} className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              Order #{order.id}
                            </p>
                            <p className="text-sm text-gray-600">
                              Placed on{" "}
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">
                              ₹{order.total.toLocaleString()}
                            </p>
                            <span
                              className={`text-sm px-2 py-1 rounded ${
                                order.status === "Delivered"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between text-sm"
                            >
                              <span>
                                {item.name} × {item.quantity}
                              </span>
                              <span>₹{item.price.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Cart Tab */}
                {activeTab === "cart" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">
                        My Cart ({cartItems.length} items)
                      </h2>
                      {cartItems.length > 0 && (
                        <Button onClick={() => router.push("/cart")}>
                          View Full Cart
                        </Button>
                      )}
                    </div>

                    {cartItems.length === 0 ? (
                      <Card className="p-8 text-center">
                        <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Your cart is empty</p>
                        <Button
                          className="mt-4"
                          onClick={() => router.push("/products")}
                        >
                          Continue Shopping
                        </Button>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {cartItems.slice(0, 3).map((item) => (
                          <Card key={item.id} className="p-4">
                            <div className="flex gap-4">
                              <Image
                                src={`/images/${item.image}`}
                                alt={item.name}
                                width={60}
                                height={60}
                                className="rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <h3 className="font-medium text-gray-900">
                                  {item.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  Quantity: {item.quantity}
                                </p>
                                <p className="text-sm font-medium text-primary">
                                  ₹{item.totalPrice.toLocaleString()}
                                </p>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-2 text-gray-500 hover:text-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </Card>
                        ))}
                        {cartItems.length > 3 && (
                          <p className="text-center text-gray-600">
                            And {cartItems.length - 3} more items...
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Wishlist Tab */}
                {activeTab === "wishlist" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">
                        My Wishlist ({wishlistItems.length} items)
                      </h2>
                      {wishlistItems.length > 0 && (
                        <Button onClick={() => router.push("/wishlist")}>
                          View Full Wishlist
                        </Button>
                      )}
                    </div>

                    {wishlistItems.length === 0 ? (
                      <Card className="p-8 text-center">
                        <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Your wishlist is empty</p>
                        <Button
                          className="mt-4"
                          onClick={() => router.push("/products")}
                        >
                          Continue Shopping
                        </Button>
                      </Card>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {wishlistItems.slice(0, 6).map((item) => (
                          <Card key={item.id} className="p-4">
                            <div className="relative aspect-square mb-3">
                              <Image
                                src={`/images/${item.image}`}
                                alt={item.name}
                                fill
                                className="rounded-lg object-cover"
                              />
                            </div>
                            <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                              {item.name}
                            </h3>
                            <p className="text-sm font-medium text-primary mt-1">
                              ₹{item.price.toLocaleString()}
                            </p>
                          </Card>
                        ))}
                        {wishlistItems.length > 6 && (
                          <p className="text-center text-gray-600 col-span-full">
                            And {wishlistItems.length - 6} more items...
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
