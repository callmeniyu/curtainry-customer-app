import { MapPin, Star, Award } from "lucide-react";
import { CompanyProfile } from "@/lib/companiesData";
import Card from "../ui/Card";
import Image from "next/image";
import Link from "next/link";

interface CompanyCardProps {
  company: CompanyProfile;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link href={`/companies/${company.id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
        <div className="p-4 text-center">
          {/* Company Logo/Avatar */}
          <div className="flex justify-center mb-3">
            <div className="relative">
              <Image
                src={company.image}
                alt={company.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 group-hover:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Company Name */}
          <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {company.name}
          </h3>

          {/* Location */}
          <div className="flex items-center justify-center gap-1 mb-2">
            <MapPin className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500 line-clamp-1">
              {company.location.split(",")[0]}
            </span>
          </div>

          {/* Rating and Established */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-900">
                {company.rating}
              </span>
            </div>
            <span className="text-xs text-gray-600">
              Est. {company.established}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
