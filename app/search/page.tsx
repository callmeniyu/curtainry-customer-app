import React, { Suspense } from "react";

// Server wrapper: render client-only SearchClient inside Suspense so Next can
// prerender the page without hitting useSearchParams() bailout errors.
import SearchClient from "./SearchClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center">Loading search...</div>}>
      <SearchClient />
    </Suspense>
  );
}
