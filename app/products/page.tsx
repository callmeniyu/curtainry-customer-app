import React, { Suspense } from "react";

// Server wrapper: render client-only ProductsClient inside Suspense so Next can
// prerender the page without hitting useSearchParams() bailout errors.
import ProductsClient from "./ProductsClient";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[200px] flex items-center justify-center">
          Loading products...
        </div>
      }
    >
      <ProductsClient />
    </Suspense>
  );
}
