import { Star, MapPin, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { Company } from "@/types";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Image from "next/image";

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <div className="p-3 sm:p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="relative flex-shrink-0">
            <Image
              src={company.logo}
              alt={`${company.name} logo`}
              width={50}
              height={50}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover border-2 border-gray-100"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm sm:text-base text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
              {company.name}
            </h3>
            <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 mb-1">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="truncate">{company.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                {company.rating}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button size="sm" className="w-full text-xs sm:text-sm py-2">
          View Profile
        </Button>
      </div>
    </Card>
  );
}

// Company Section Component
interface CompanySectionProps {
  companies: Company[];
  onSeeMore: () => void;
}

export function CompanySection({ companies, onSeeMore }: CompanySectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Trusted Partner Companies
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Work with verified curtain specialists and retailers who deliver
              exceptional quality and service
            </p>
          </div>

          {/* Companies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>

          {/* See More Button */}
          <div className="text-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={onSeeMore}
              className="inline-flex items-center gap-2"
            >
              View All Companies
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Mock data for demonstration
export const mockCompanies: Company[] = [
  {
    id: "1",
    name: "Elite Curtain Studio",
    description:
      "Premium curtain designers with 15+ years of experience in luxury interior solutions.",
    logo: "/images/retailer1.png",
    rating: 4.9,
    reviewCount: 234,
    location: "Koramangala, Bangalore",
  },
  {
    id: "2",
    name: "Modern Home Textiles",
    description:
      "Contemporary curtain solutions focusing on modern designs and smart home integration.",
    logo: "/images/retailer2.png",
    rating: 4.7,
    reviewCount: 189,
    location: "Indiranagar, Bangalore",
  },
  {
    id: "3",
    name: "Classic Interiors",
    description:
      "Traditional and classic curtain designs with handcrafted details and premium fabrics.",
    logo: "/images/retailer3.png",
    rating: 4.8,
    reviewCount: 156,
    location: "Whitefield, Bangalore",
  },
  {
    id: "4",
    name: "De Decour",
    description:
      "Traditional and classic curtain designs with handcrafted details and premium fabrics.",
    logo: "/images/retailer4.png",
    rating: 4.9,
    reviewCount: 156,
    location: "Whitefield, Bangalore",
  },
  {
    id: "5",
    name: "DrapeStort",
    description:
      "Traditional and classic curtain designs with handcrafted details and premium fabrics.",
    logo: "/images/retailer4.png",
    rating: 5.0,
    reviewCount: 156,
    location: "Whitefield, Bangalore",
  },
];
