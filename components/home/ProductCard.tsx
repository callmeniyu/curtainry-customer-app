import { ShoppingCart, Eye, Star, Heart } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import Card from "../ui/Card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ExtendedProduct extends Product {
  retailerName?: string;
  city?: string;
}

interface ProductCardProps {
  product: ExtendedProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlistItems, isInWishlist } =
    useWishlist();

  const handleAddToWishlist = () => {
    if (isInWishlist(product.id)) {
      const item = wishlistItems.find((item) => item.productId === product.id);
      if (item) {
        removeFromWishlist(item.id);
      }
    } else {
      const wishlistItem = {
        productId: product.id,
        productType: "readymade" as const,
        name: product.name,
        image: product.image || "readymade1.png",
        price: product.price,
      };
      addToWishlist(wishlistItem);
    }
  };

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative overflow-hidden aspect-square">
        <Image
          src={`/images/${product.image || "readymade1.png"}`}
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/products/${product.id}`);
            }}
          >
            <Eye className="h-5 w-5" />
          </button>
          <button
            className={`p-2 rounded-full transition-colors ${
              isInWishlist(product.id)
                ? "bg-red-500 text-white"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToWishlist();
            }}
          >
            <Heart
              className={`h-5 w-5 ${
                isInWishlist(product.id) ? "fill-current" : ""
              }`}
            />
          </button>
          <button
            className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              const cartItem = {
                productId: product.id,
                productType: "readymade" as const,
                name: product.name,
                image: product.image || "readymade1.png",
                quantity: 1,
                price: product.price,
                totalPrice: product.price,
                customizations: {
                  // Default selections
                  selectedSize: {
                    label: "5ft Width",
                    value: "5ft",
                    price: 3999,
                  },
                  selectedColor: {
                    name: "Midnight Black",
                    hex: "#000000",
                    image: "readymade1_black.jpg",
                  },
                  selectedLining: {
                    name: "Blackout",
                    description: "Complete light blockage, thermal insulation",
                    price: 0,
                  },
                  selectedHeader: {
                    name: "Standard Header",
                    description: "Standard header with hooks",
                    price: 0,
                  },
                },
              };
              addToCart(cartItem);
            }}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discountPercentage}% OFF
          </div>
        )}

        {/* Out of Stock Badge */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white text-sm font-medium px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3 space-y-2">
        {/* Product Title */}
        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Retailer */}
        {product.retailerName && (
          <p className="text-xs text-gray-600 truncate">
            by {product.retailerName}
          </p>
        )}

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-gray-700">
              {product.rating}
            </span>
            {product.reviewCount && (
              <span className="text-xs text-gray-500">
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-sm md:text-base text-primary font-bold">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
