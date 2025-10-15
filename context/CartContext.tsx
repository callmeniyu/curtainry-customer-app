"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { CartItem } from "@/types";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart: any[] = JSON.parse(savedCart);
        // Migration: normalize image filenames and ensure numeric fields
        const migrated = parsedCart.map((c) => {
          const image = normalizeImageFilename(c.image);
          const quantity = typeof c.quantity === 'number' ? c.quantity : Number(c.quantity) || 1;
          const price = typeof c.price === 'number' ? c.price : Number(c.price) || 0;
          const totalPrice = typeof c.totalPrice === 'number' ? c.totalPrice : price * quantity;
          return { ...c, image, quantity, price, totalPrice } as any;
        });
        setCartItems(migrated);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Utility: normalize image filenames coming from different sources
  // Ensures we store a filename that exists in /public/images
  const normalizeImageFilename = (filename?: string | null) => {
    if (!filename) return "readymade1.png";
    // strip leading paths
    let name = filename.startsWith("/images/") ? filename.replace("/images/", "") : filename;
    // handle legacy names like readymade_curtain1.png -> readymade1.png
    const m = name.match(/^readymade_curtain(\d+)\.png$/);
    if (m) return `readymade${m[1]}.png`;
    return name;
  };

  const addToCart = (item: Omit<CartItem, "id">) => {
    const sanitized = { ...item, image: normalizeImageFilename(item.image) } as Omit<CartItem, "id">;
    const newItem: CartItem = {
      ...sanitized,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    setCartItems((prev) => [...prev, newItem]);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, quantity, totalPrice: item.price * quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
