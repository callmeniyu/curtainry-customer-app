export interface CompanyProfile {
  id: number;
  name: string;
  image: string;
  location: string;
  rating: number;
  reviewCount: number;
  description: string;
  specialties: string[];
  established: string;
}

export const companiesData: CompanyProfile[] = [
  {
    id: 1,
    name: "Elite Curtain Studio",
    image: "/images/retailer1.png",
    location: "Bangalore, Karnataka",
    rating: 4.8,
    reviewCount: 156,
    description: "Premium curtain solutions with over 15 years of experience in custom and ready-made curtains.",
    specialties: ["Custom Curtains", "Sheer Curtains", "Blackout Curtains"],
    established: "2008"
  },
  {
    id: 2,
    name: "Modern Home Textiles",
    image: "/images/retailer2.png",
    location: "Mumbai, Maharashtra",
    rating: 4.7,
    reviewCount: 203,
    description: "Contemporary designs meeting traditional craftsmanship for modern homes.",
    specialties: ["Designer Curtains", "Window Treatments", "Fabric Consultation"],
    established: "2010"
  },
  {
    id: 3,
    name: "Classic Interiors",
    image: "/images/retailer3.png",
    location: "Delhi, NCR",
    rating: 4.6,
    reviewCount: 189,
    description: "Timeless elegance with premium fabrics and expert installation services.",
    specialties: ["Luxury Curtains", "Drapery", "Interior Design"],
    established: "2005"
  },
  {
    id: 4,
    name: "Premium Drapes",
    image: "/images/retailer4.png",
    location: "Chennai, Tamil Nadu",
    rating: 4.9,
    reviewCount: 134,
    description: "Specializing in high-quality drapery solutions for residential and commercial spaces.",
    specialties: ["Commercial Curtains", "Motorized Curtains", "Blinds"],
    established: "2012"
  },
  {
    id: 5,
    name: "Fabric World",
    image: "/images/retailer5.png",
    location: "Pune, Maharashtra",
    rating: 4.5,
    reviewCount: 98,
    description: "Wide range of fabrics and curtain styles to match every budget and taste.",
    specialties: ["Budget Curtains", "Custom Fabrics", "Ready-Made"],
    established: "2015"
  },
  {
    id: 6,
    name: "Designer Textiles",
    image: "/images/retailer1.png",
    location: "Hyderabad, Telangana",
    rating: 4.7,
    reviewCount: 167,
    description: "Creative textile solutions with focus on unique designs and patterns.",
    specialties: ["Designer Fabrics", "Printed Curtains", "Embroidered"],
    established: "2009"
  }
];