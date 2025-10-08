import { ProductDetails } from "@/types";

interface SpecificationsSectionProps {
  specifications: ProductDetails["specifications"];
  selectedSize?: string;
  selectedHeader?: string;
  selectedLining?: string;
  selectedColor?: string;
  quantity?: number;
  totalPrice?: number;
  isReadymade?: boolean;
}

export default function SpecificationsSection({
  specifications,
  selectedSize,
  selectedHeader,
  selectedLining,
  selectedColor,
  quantity,
  totalPrice,
  isReadymade = false,
}: SpecificationsSectionProps) {
  const dynamicSpecs = [];

  if (isReadymade) {
    if (selectedSize)
      dynamicSpecs.push({ label: "Selected Size", value: selectedSize });
    if (selectedHeader)
      dynamicSpecs.push({ label: "Header Style", value: selectedHeader });
    if (selectedLining)
      dynamicSpecs.push({ label: "Lining", value: selectedLining });
    dynamicSpecs.push({ label: "Light Blocking", value: "Complete darkness" }); // Assuming
    if (quantity)
      dynamicSpecs.push({
        label: "Number of Units",
        value: quantity.toString(),
      });
    if (selectedColor)
      dynamicSpecs.push({ label: "Color", value: selectedColor });
    if (totalPrice)
      dynamicSpecs.push({
        label: "Price",
        value: `₹${totalPrice.toLocaleString()}`,
      });
  } else {
    // For custom, maybe different
    if (selectedColor)
      dynamicSpecs.push({ label: "Color", value: selectedColor });
    if (totalPrice)
      dynamicSpecs.push({
        label: "Total Price",
        value: `₹${totalPrice.toLocaleString()}`,
      });
  }

  const allSpecs = [...specifications, ...dynamicSpecs];

  return (
    <div className="bg-gray-50 border-t">
      <div className="section-padding py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {allSpecs.map((spec, index) => (
              <div
                key={index}
                className="flex justify-between py-2 border-b border-gray-200"
              >
                <span className="font-medium text-gray-900">{spec.label}</span>
                <span className="text-gray-700">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
