export interface ServiceProfile {
  id: number;
  name: string;
  role: "consultant" | "fitter";
  avatar: string;
  location: string;
  status: "available" | "unavailable";
  rating?: number;
  experience?: string;
}

export const servicesData: ServiceProfile[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "consultant",
    avatar: "/images/avatar (1).jpg",
    location: "Bangalore",
    status: "available",
    rating: 4.8,
    experience: "8 years"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "fitter",
    avatar: "/images/avatar (2).jpg",
    location: "Mumbai",
    status: "available",
    rating: 4.9,
    experience: "6 years"
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "consultant",
    avatar: "/images/avatar (3).jpg",
    location: "Delhi",
    status: "unavailable",
    rating: 4.7,
    experience: "10 years"
  },
  {
    id: 4,
    name: "Sneha Gupta",
    role: "fitter",
    avatar: "/images/avatar (4).jpg",
    location: "Chennai",
    status: "available",
    rating: 4.6,
    experience: "5 years"
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "consultant",
    avatar: "/images/avatar (5).jpg",
    location: "Pune",
    status: "available",
    rating: 4.8,
    experience: "7 years"
  },
  {
    id: 6,
    name: "Meera Joshi",
    role: "fitter",
    avatar: "/images/avatar (6).jpg",
    location: "Hyderabad",
    status: "unavailable",
    rating: 4.5,
    experience: "4 years"
  }
];