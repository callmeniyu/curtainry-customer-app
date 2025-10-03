import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface DealsSectionProps {
  title: string;
  subtitle: string;
  products: Product[];
}

export default function DealsSection({
  title,
  subtitle,
  products,
}: DealsSectionProps) {
  return (
    <section className="py-12 bg-gradient-to-r from-orange-50 to-red-50">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-lg text-gray-600">{subtitle}</p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
