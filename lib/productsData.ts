import { Product, ProductDetails } from "@/types";

export interface ExtendedProduct extends Product {
  retailerName: string;
  city: string;
  type: string;
  color: string;
}

// Detailed product data for product details page
export const productDetailsData: Record<string, ProductDetails> = {
  "1": {
    id: "1",
    name: "Luxury Velvet Blackout Curtains",
    description: "Indulge in the opulence of our Luxury Velvet Blackout Curtains, meticulously crafted from premium velvet fabric that ensures complete darkness while adding a touch of sophistication to your space. Perfect for bedrooms, home theaters, or any room where light control is paramount. The rich texture and deep color options make these curtains not just functional but also a statement piece in your interior design.",
    price: 3999,
    originalPrice: 5999,
    image: "readymade1.png",
    category: "readymade",
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    tags: ["Blackout", "Velvet", "Luxury"],
    retailerName: "Elite Curtain Studio",
    city: "Bangalore",
    images: [
      "readymade1.png",
            "readymade1.png",
            "readymade2.png",
            "readymade3.png"
    ],
    colors: [
      { name: "Midnight Black", hex: "#000000", image: "readymade1_black.jpg" },
      { name: "Deep Burgundy", hex: "#800020", image: "readymade1_burgundy.jpg" },
      { name: "Forest Green", hex: "#228B22", image: "readymade1_green.jpg" },
      { name: "Royal Blue", hex: "#4169E1", image: "readymade1_blue.jpg" }
    ],
    sizes: [
      { label: "5ft Width", value: "5ft", price: 3999 },
      { label: "6ft Width", value: "6ft", price: 4599 },
      { label: "7ft Width", value: "7ft", price: 5199 },
      { label: "8ft Width", value: "8ft", price: 5799 },
      { label: "9ft Width", value: "9ft", price: 6399 },
      { label: "10ft Width", value: "10ft", price: 6999 }
    ],
    lining: [
      { name: "Blackout", description: "Complete light blockage, thermal insulation", price: 0 },
      { name: "Standard", description: "Light filtering, basic insulation", price: -500 },
      { name: "No Lining", description: "Sheer fabric, maximum light transmission", price: -1000 }
    ],
    header: [
      { name: "Pleat", description: "Classic pleated header for elegant folds", price: 0 },
      { name: "Rod Pocket", description: "Simple pocket for curtain rods", price: -200 },
      { name: "Pinch Pleat", description: "Sophisticated pinched pleats", price: 300 },
      { name: "Eyelet", description: "Modern metal eyelets for contemporary look", price: 400 },
      { name: "Tailored Pleat", description: "Clean, structured pleats", price: 250 },
      { name: "Goblet", description: "Luxurious goblet-style pleats", price: 600 }
    ],
    stockCount: 24,
    reviews: [
      {
        id: "1",
        userName: "Sarah Johnson",
        rating: 5,
        comment: "Absolutely stunning curtains! The blackout feature works perfectly, and the velvet texture is luxurious. Highly recommend for anyone looking for quality curtains.",
        date: "2024-10-01",
        verified: true
      },
      {
        id: "2",
        userName: "Michael Chen",
        rating: 5,
        comment: "Great quality and fast delivery. The color is exactly as shown online. Will definitely buy again.",
        date: "2024-09-28",
        verified: true
      },
      {
        id: "3",
        userName: "Priya Sharma",
        rating: 4,
        comment: "Beautiful curtains, but the length was slightly shorter than expected. Still very satisfied with the purchase.",
        date: "2024-09-25",
        verified: true
      }
    ],
    specifications: [
      { label: "Material", value: "100% Premium Velvet" },
      { label: "Light Blocking", value: "99.9% Blackout" },
      { label: "Care Instructions", value: "Dry clean only" },
      { label: "Origin", value: "Made in India" },
      { label: "Warranty", value: "2 years against manufacturing defects" }
    ],
    policies: [
      {
        title: "Return Policy",
        content: "30-day return policy for unused items in original packaging. Return shipping charges apply."
      },
      {
        title: "Warranty",
        content: "2-year warranty against manufacturing defects. Warranty covers material and workmanship issues."
      },
      {
        title: "Care Instructions",
        content: "Professional dry cleaning recommended. Avoid direct sunlight for extended periods to maintain color vibrancy."
      }
    ],
  },
  "2": {
    id: "2",
    name: "Sheer Elegance Window Panels",
    description: "Transform your living spaces with our Sheer Elegance Window Panels, crafted from premium sheer fabric that allows just the right amount of natural light while maintaining privacy. These panels add a touch of sophistication and airiness to any room, creating a serene and elegant atmosphere.",
    price: 1899,
    originalPrice: 2399,
    image: "readymade2.png",
    category: "readymade",
    rating: 4.5,
    reviewCount: 89,
    inStock: true,
    tags: ["Sheer", "Elegant", "Light"],
    retailerName: "Modern Home Textiles",
    city: "Mumbai",
    images: [
      "readymade4.png",
      "readymade5.png",
      "readymade6.png"
    ],
    colors: [
      { name: "Pure White", hex: "#FFFFFF", image: "readymade2_white.jpg" },
      { name: "Soft Ivory", hex: "#FFFFF0", image: "readymade2_ivory.jpg" },
      { name: "Light Gray", hex: "#D3D3D3", image: "readymade2_gray.jpg" },
      { name: "Champagne", hex: "#F7E7CE", image: "readymade2_champagne.jpg" }
    ],
    sizes: [
      { label: "5ft Width", value: "5ft", price: 1899 },
      { label: "6ft Width", value: "6ft", price: 2199 },
      { label: "7ft Width", value: "7ft", price: 2499 },
      { label: "8ft Width", value: "8ft", price: 2799 },
      { label: "9ft Width", value: "9ft", price: 3099 },
      { label: "10ft Width", value: "10ft", price: 3399 }
    ],
    lining: [
      { name: "Standard", description: "Light filtering, basic insulation", price: 0 },
      { name: "No Lining", description: "Sheer fabric, maximum light transmission", price: -300 }
    ],
    header: [
      { name: "Pleat", description: "Classic pleated header for elegant folds", price: 0 },
      { name: "Rod Pocket", description: "Simple pocket for curtain rods", price: -100 },
      { name: "Pinch Pleat", description: "Sophisticated pinched pleats", price: 200 },
      { name: "Eyelet", description: "Modern metal eyelets for contemporary look", price: 250 }
    ],
    stockCount: 15,
    reviews: [
      {
        id: "1",
        userName: "Emma Wilson",
        rating: 5,
        comment: "Perfect for our living room! The sheer fabric lets in just the right amount of light. Very elegant and well-made.",
        date: "2024-09-30",
        verified: true
      },
      {
        id: "2",
        userName: "Rajesh Kumar",
        rating: 4,
        comment: "Good quality and beautiful design. The fabric is lightweight and flows nicely.",
        date: "2024-09-27",
        verified: true
      }
    ],
    specifications: [
      { label: "Material", value: "100% Premium Sheer Fabric" },
      { label: "Light Transmission", value: "60% Light Filtering" },
      { label: "Care Instructions", value: "Machine washable, tumble dry low" },
      { label: "Origin", value: "Made in India" },
      { label: "Warranty", value: "1 year against manufacturing defects" }
    ],
    policies: [
      {
        title: "Return Policy",
        content: "30-day return policy for unused items in original packaging."
      },
      {
        title: "Warranty",
        content: "1-year warranty against manufacturing defects."
      },
      {
        title: "Care Instructions",
        content: "Machine washable on gentle cycle. Air dry or tumble dry on low heat."
      }
    ],
  }
};

// Mock data for Ready-Made Curtains
export const readyMadeCurtainsData: ExtendedProduct[] = [
  {
    id: "1",
    name: "Luxury Velvet Blackout Curtains",
    description: "Premium velvet curtains with complete blackout functionality, perfect for bedrooms.",
    price: 3999,
    originalPrice: 5999,
    image: "readymade1.png",
    category: "readymade",
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    tags: ["Blackout", "Velvet", "Luxury"],
    retailerName: "Elite Curtain Studio",
    city: "Bangalore",
    type: "Blackout",
    color: "Black",
  },
  {
    id: "2",
    name: "Sheer Elegance Window Panels",
    description: "Light and airy sheer curtains that add elegance while maintaining privacy.",
    price: 1899,
    originalPrice: 2399,
    image: "readymade2.png",
    category: "readymade",
    rating: 4.5,
    reviewCount: 89,
    inStock: true,
    tags: ["Sheer", "Elegant", "Light"],
    retailerName: "Modern Home Textiles",
    city: "Mumbai",
    type: "Sheer",
    color: "White",
  },
  {
    id: "3",
    name: "Modern Geometric Print Curtains",
    description: "Contemporary geometric patterns that complement modern interior designs.",
    price: 2499,
    originalPrice: 3199,
    image: "readymade3.png",
    category: "readymade",
    rating: 4.6,
    reviewCount: 203,
    inStock: true,
    tags: ["Modern", "Geometric", "Contemporary"],
    retailerName: "Classic Interiors",
    city: "Delhi",
    type: "Printed",
    color: "Blue",
  },
  {
    id: "4",
    name: "Classic Linen Blend Curtains",
    description: "Natural linen blend with timeless appeal, suitable for any room.",
    price: 2999,
    originalPrice: 3999,
    image: "readymade4.png",
    category: "readymade",
    rating: 4.7,
    reviewCount: 124,
    inStock: false,
    tags: ["Linen", "Classic", "Natural"],
    retailerName: "Premium Drapes",
    city: "Chennai",
    type: "Solid",
    color: "Beige",
  },
  {
    id: "5",
    name: "Floral Print Room Darkening Curtains",
    description: "Beautiful floral patterns with room darkening functionality.",
    price: 3299,
    originalPrice: 4299,
    image: "readymade5.png",
    category: "readymade",
    rating: 4.4,
    reviewCount: 78,
    inStock: true,
    tags: ["Floral", "Room Darkening", "Decorative"],
    retailerName: "Elite Curtain Studio",
    city: "Bangalore",
    type: "Room Darkening",
    color: "Pink",
  },
  {
    id: "6",
    name: "Thermal Insulation Curtains",
    description: "Energy-efficient curtains that help maintain room temperature.",
    price: 4599,
    image: "readymade6.png",
    category: "readymade",
    rating: 4.9,
    reviewCount: 145,
    inStock: true,
    tags: ["Thermal", "Insulation", "Energy Efficient"],
    retailerName: "Modern Home Textiles",
    city: "Mumbai",
    type: "Thermal",
    color: "Gray",
  },
];

// Mock data for Custom Curtains
export const customCurtainsData: ExtendedProduct[] = [
  {
    id: "7",
    name: "Royal Silk Collection",
    description: "Luxurious silk fabrics in various colors and patterns, custom-tailored to your specifications.",
    price: 899,
    image: "/images/custom_curtain1.jpg",
    category: "custom",
    rating: 4.9,
    reviewCount: 67,
    inStock: true,
    tags: ["Silk", "Luxury", "Custom"],
    retailerName: "Fabric World",
    city: "Bangalore",
    type: "Silk",
    color: "Red",
  },
  {
    id: "8",
    name: "Premium Cotton Blends",
    description: "High-quality cotton blend fabrics perfect for custom curtains with durability.",
    price: 549,
    image: "/images/custom_curtain2.jpg",
    category: "custom",
    rating: 4.6,
    reviewCount: 134,
    inStock: true,
    tags: ["Cotton", "Durable", "Custom"],
    retailerName: "Designer Textiles",
    city: "Mumbai",
    type: "Cotton",
    color: "Blue",
  },
  {
    id: "9",
    name: "Designer Lace Patterns",
    description: "Intricate lace designs that add sophistication and elegance to any space.",
    price: 1299,
    originalPrice: 1799,
    image: "/images/custom_curtain3.jpg",
    category: "custom",
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    tags: ["Lace", "Designer", "Elegant"],
    retailerName: "Custom Creations",
    city: "Delhi",
    type: "Lace",
    color: "White",
  },
  {
    id: "10",
    name: "Embroidered Heritage Fabrics",
    description: "Traditional embroidered patterns with modern appeal, handcrafted to perfection.",
    price: 1799,
    image: "custom_curtain4.jpg",
    category: "custom",
    rating: 4.7,
    reviewCount: 95,
    inStock: true,
    tags: ["Embroidered", "Heritage", "Handcrafted"],
    retailerName: "Heritage Fabrics",
    city: "Chennai",
    type: "Embroidered",
    color: "Gold",
  },
  {
    id: "11",
    name: "Velvet Luxury Fabrics",
    description: "Rich velvet fabrics for premium custom curtains with luxurious feel.",
    price: 1599,
    originalPrice: 1999,
    image: "custom_curtain5.jpg",
    category: "custom",
    rating: 4.8,
    reviewCount: 112,
    inStock: true,
    tags: ["Velvet", "Luxury", "Premium"],
    retailerName: "Fabric World",
    city: "Bangalore",
    type: "Velvet",
    color: "Black",
  },
  {
    id: "12",
    name: "Linen Natural Fabrics",
    description: "Natural linen fabrics for breathable and elegant custom curtains.",
    price: 799,
    image: "custom_curtain6.jpg",
    category: "custom",
    rating: 4.5,
    reviewCount: 76,
    inStock: true,
    tags: ["Linen", "Natural", "Breathable"],
    retailerName: "Designer Textiles",
    city: "Mumbai",
    type: "Linen",
    color: "Beige",
  },
];

// Filter options
export const cities = ["All Cities", "Bangalore", "Mumbai", "Delhi", "Chennai"];
export const companies = ["All Companies", "Elite Curtain Studio", "Modern Home Textiles", "Classic Interiors", "Premium Drapes", "Fabric World", "Designer Textiles", "Custom Creations", "Heritage Fabrics"];
export const types = ["All Types", "Blackout", "Sheer", "Room Darkening", "Thermal", "Printed", "Solid", "Silk", "Cotton", "Lace", "Embroidered", "Velvet", "Linen"];
export const colors = ["All Colors", "Black", "White", "Blue", "Beige", "Pink", "Gray", "Red", "Gold"];
export const priceRanges = ["All Prices", "Under ₹500", "₹500 - ₹1,000", "₹1,000 - ₹2,000", "₹2,000 - ₹5,000", "Above ₹5,000"];
export const ratings = ["All Ratings", "4.5+ Stars", "4.0+ Stars", "3.5+ Stars"];
export const sortOptions = ["Recommended", "Price: Low to High", "Price: High to Low", "Highest Rated", "Newest First"];