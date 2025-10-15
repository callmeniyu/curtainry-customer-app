import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import Button from "../ui/Button";
import ProductCard from "./ProductCard";
import CustomCurtainCard from "./CustomCurtainCard";

interface CategorySectionProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

export default function CategorySection({
  title,
  products,
  viewAllLink = "#",
}: CategorySectionProps) {
  const router = useRouter();

  return (
    <section className="py-5 bg-white">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <Button
              variant="secondary"
              size="sm"
              className="inline-flex items-center gap-2"
              onClick={() => router.push("/products")}
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) =>
              product.category === "custom" ? (
                <CustomCurtainCard key={product.id} product={product} />
              ) : (
                <ProductCard key={product.id} product={product} />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
