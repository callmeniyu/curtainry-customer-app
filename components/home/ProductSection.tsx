import { ArrowRight } from "lucide-react";
import { Product } from "@/types";
import Button from "../ui/Button";

interface ProductSectionProps {
  title: string;
  subtitle: string;
  products: Product[];
  buttonText: string;
  onSeeMore: () => void;
}

export default function ProductSection({
  title,
  subtitle,
  products,
  buttonText,
  onSeeMore,
}: ProductSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          {/* Products Grid */}

          {/* See More Button */}
          <div className="text-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={onSeeMore}
              className="inline-flex items-center gap-2"
            >
              {buttonText}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Mock data for demonstration
export const mockReadymadeProducts: Product[] = [
  {
    id: "1",
    name: "Luxury Velvet Blackout Curtains",
    description:
      "Premium velvet curtains with complete blackout functionality, perfect for bedrooms.",
    price: 3999,
    originalPrice: 5999,
    image: "/images/readymade_curtain1.png",
    category: "readymade",
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    tags: ["Blackout", "Velvet", "Luxury"],
  },
  {
    id: "2",
    name: "Sheer Elegance Window Panels",
    description:
      "Light and airy sheer curtains that add elegance while maintaining privacy.",
    price: 1899,
    originalPrice: 2399,
    image: "/images/readymade_curtain2.png",
    category: "readymade",
    rating: 4.5,
    reviewCount: 89,
    inStock: true,
    tags: ["Sheer", "Elegant", "Light"],
  },
  {
    id: "3",
    name: "Modern Geometric Print Curtains",
    description:
      "Contemporary geometric patterns that complement modern interior designs.",
    price: 2499,
    originalPrice: 3199,
    image: "/images/readymade_curtain3.png",
    category: "readymade",
    rating: 4.6,
    reviewCount: 203,
    inStock: true,
    tags: ["Modern", "Geometric", "Contemporary"],
  },
  {
    id: "4",
    name: "Classic Linen Blend Curtains",
    description:
      "Natural linen blend with timeless appeal, suitable for any room.",
    price: 2999,
    originalPrice: 3999,
    image: "/images/readymade_curtain4.png",
    category: "readymade",
    rating: 4.7,
    reviewCount: 124,
    inStock: false,
    tags: ["Linen", "Classic", "Natural"],
  },
  {
    id: "5",
    name: "De Decour Stitched Curtains",
    description:
      "Natural linen blend with timeless appeal, suitable for any room.",
    price: 999,
    originalPrice: 5999,
    image: "/images/readymade_curtain4.png",
    category: "readymade",
    rating: 4.2,
    reviewCount: 124,
    inStock: true,
    tags: ["Linen", "Classic", "Natural"],
  },
];

export const mockCustomProducts: Product[] = [
  {
    id: "1",
    name: "Royal Silk Collection",
    description:
      "Luxurious silk fabrics in various colors and patterns, custom-tailored to your specifications.",
    price: 899, // per sq ft
    image: "/images/custom_curtain1.jpg",
    category: "custom",
    rating: 4.9,
    reviewCount: 67,
    originalPrice: 999,
    inStock: true,
    tags: ["Silk", "Luxury", "Custom"],
  },
  {
    id: "2",
    name: "Premium Cotton Blends",
    description:
      "High-quality cotton blend fabrics perfect for custom curtains with durability.",
    price: 549,
    originalPrice: 2299,

    image: "/images/custom_curtain2.jpg",
    category: "custom",
    rating: 4.6,
    reviewCount: 134,
    inStock: true,
    tags: ["Cotton", "Durable", "Custom"],
  },
  {
    id: "3",
    name: "Designer Lace Patterns",
    description:
      "Intricate lace designs that add sophistication and elegance to any space.",
    price: 1299,
    originalPrice: 1799,
    image: "/images/custom_curtain3.jpg",
    category: "custom",
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    tags: ["Lace", "Designer", "Elegant"],
  },
  {
    id: "4",
    name: "Embroidered Heritage Fabrics",
    description:
      "Traditional embroidered patterns with modern appeal, handcrafted to perfection.",
    price: 1799,
    originalPrice: 1999,

    image: "/images/custom_curtain4.jpg",
    category: "custom",
    rating: 4.7,
    reviewCount: 95,
    inStock: true,
    tags: ["Embroidered", "Heritage", "Handcrafted"],
  },
  {
    id: "5",
    name: "Premium Cotton Blends",
    description:
      "Traditional embroidered patterns with modern appeal, handcrafted to perfection.",
    price: 1799,
    originalPrice: 3299,

    image: "/images/custom_curtain5.jpg",
    category: "custom",
    rating: 4.7,
    reviewCount: 95,
    inStock: true,
    tags: ["Embroidered", "Heritage", "Handcrafted"],
  },
  // {
  //   id: "6",
  //   name: "Royal Silk Collection",
  //   description:
  //     "Traditional embroidered patterns with modern appeal, handcrafted to perfection.",
  //   price: 1799,
  //   image: "/images/custom_curtain6.jpg",
  //   category: "custom",
  //   rating: 4.7,
  //   reviewCount: 95,
  //   inStock: true,
  //   tags: ["Embroidered", "Heritage", "Handcrafted"],
  // },
];
