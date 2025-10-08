import Card from "../ui/Card";
import { ProductDetails } from "@/types";

interface PoliciesSectionProps {
  policies: ProductDetails["policies"];
}

export default function PoliciesSection({ policies }: PoliciesSectionProps) {
  return (
    <div className="bg-gray-50 border-t">
      <div className="section-padding py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Policies & Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {policies.map((policy, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  {policy.title}
                </h3>
                <p className="text-gray-700 text-sm">{policy.content}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
