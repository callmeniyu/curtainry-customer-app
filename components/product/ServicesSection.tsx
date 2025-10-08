import { useRouter } from "next/navigation";
import Card from "../ui/Card";
import Button from "../ui/Button";

export default function ServicesSection() {
  const router = useRouter();

  return (
    <Card className="p-4">
      <h3 className="font-semibold text-gray-900 mb-3">
        Professional Services Available
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Enhance your curtain experience with our expert services
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 border border-gray-200 rounded-lg text-left">
          <div className="text-primary mb-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <span className="text-xs font-bold text-primary">⚙️</span>
            </div>
          </div>
          <div className="font-medium text-sm text-gray-900 mb-1">
            Expert Installation
          </div>
          <div className="text-xs text-gray-600">
            Professional hanging and setup by certified technicians
          </div>
        </div>

        <div className="p-3 border border-gray-200 rounded-lg text-left">
          <div className="text-primary mb-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <span className="text-xs font-bold text-primary">🎨</span>
            </div>
          </div>
          <div className="font-medium text-sm text-gray-900 mb-1">
            Design Consultation
          </div>
          <div className="text-xs text-gray-600">
            Personalized design advice from interior experts
          </div>
        </div>

        <div className="p-3 border border-gray-200 rounded-lg text-left">
          <div className="text-primary mb-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <span className="text-xs font-bold text-primary">🛡️</span>
            </div>
          </div>
          <div className="font-medium text-sm text-gray-900 mb-1">
            Maintenance & Care
          </div>
          <div className="text-xs text-gray-600">
            Regular cleaning and maintenance packages
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-200">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/services")}
          className="w-full"
        >
          View All Services →
        </Button>
      </div>
    </Card>
  );
}
