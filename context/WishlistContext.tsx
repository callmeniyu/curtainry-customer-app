"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { WishlistItem } from "@/types";

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: Omit<WishlistItem, "id" | "addedAt">) => void;
  removeFromWishlist: (itemId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        const parsedWishlist: any[] = JSON.parse(savedWishlist);
        // normalize images in stored wishlist (handle legacy names)
        const migrated = parsedWishlist.map((w) => {
          let image = w.image;
          if (image && typeof image === "string") {
            image = image.startsWith("/images/")
              ? image.replace("/images/", "")
              : image;
            const m = image.match(/^readymade_curtain(\d+)\.png$/);
            if (m) image = `readymade${m[1]}.png`;
          }
          return { ...w, image } as any;
        });
        setWishlistItems(migrated);
      } catch (error) {
        console.error("Error parsing wishlist from localStorage:", error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (item: Omit<WishlistItem, "id" | "addedAt">) => {
    // Check if already in wishlist
    if (isInWishlist(item.productId)) {
      return;
    }
    // sanitize image filename
    let image = item.image;
    if (image && typeof image === "string") {
      image = image.startsWith("/images/")
        ? image.replace("/images/", "")
        : image;
      const m = image.match(/^readymade_curtain(\d+)\.png$/);
      if (m) image = `readymade${m[1]}.png`;
    }
    const newItem: WishlistItem = {
      ...item,
      image: image as string,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      addedAt: new Date(),
    };
    setWishlistItems((prev) => [...prev, newItem]);
  };

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.productId === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
