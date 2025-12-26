"use client";

import { useState, useMemo, Suspense } from "react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/product/product-card";
import { Filters } from "@/components/product/filters";
import { Product } from "@/lib/types";
import { useSearchParams } from "next/navigation";

function ProductsContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [categoryFilter, setCategoryFilter] = useState(
    searchParams.get("category") || ""
  );
  const [sortBy, setSortBy] = useState("name");
  const [showBestsellerOnly, setShowBestsellerOnly] = useState(
    searchParams.get("bestseller") === "true"
  );
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered: Product[] = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter) {
      filtered = filtered.filter((product) => product.category === categoryFilter);
    }

    // Bestseller filter
    if (showBestsellerOnly) {
      filtered = filtered.filter((product) => product.bestseller);
    }

    // Price range filter
    if (minPrice !== null || maxPrice !== null) {
      filtered = filtered.filter((product) => {
        const meetsMin = minPrice === null || product.price >= minPrice;
        const meetsMax = maxPrice === null || product.price <= maxPrice;
        return meetsMin && meetsMax;
      });
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "bestseller":
          if (a.bestseller && !b.bestseller) return -1;
          if (!a.bestseller && b.bestseller) return 1;
          return 0;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return sorted;
  }, [searchQuery, categoryFilter, sortBy, showBestsellerOnly, minPrice, maxPrice]);

  return (
    <div className="container mx-auto py-8 space-y-8 max-w-7xl px-4">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold">All Products</h1>
        <p className="text-muted-foreground">
          Browse our complete selection of premium supplements
        </p>
      </div>

      <Filters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        showBestsellerOnly={showBestsellerOnly}
        onBestsellerToggle={setShowBestsellerOnly}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onPriceRangeChange={(min, max) => {
          setMinPrice(min);
          setMaxPrice(max);
        }}
      />

      {filteredAndSortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container py-8">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}

