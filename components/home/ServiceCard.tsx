import { MapPin, Star, CheckCircle, XCircle } from "lucide-react";
import { ServiceProfile } from "@/lib/servicesData";
import Card from "../ui/Card";
import Image from "next/image";

interface ServiceCardProps {
  profile: ServiceProfile;
}

export default function ServiceCard({ profile }: ServiceCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="p-4 text-center">
        {/* Avatar and Status */}
        <div className="flex justify-center mb-3">
          <div className="relative">
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            />
          </div>
        </div>

        {/* Name */}
        <h3 className="font-semibold text-gray-900 text-sm mb-2">
          {profile.name}
        </h3>

        {/* Role and Location on same line */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-xs text-gray-600 capitalize bg-gray-100 px-2 py-1 rounded-full">
            {profile.role}
          </span>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500">{profile.location}</span>
          </div>
        </div>

        {/* Rating and Experience on same line */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-900">
              {profile.rating}
            </span>
          </div>
          <span className="text-xs text-gray-600">
            {profile.experience} exp.
          </span>
        </div>
      </div>
    </Card>
  );
}
