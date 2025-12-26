"use client";

import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Product } from "@/lib/types";
import { Search } from "lucide-react";

interface FiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  showBestsellerOnly: boolean;
  onBestsellerToggle: (value: boolean) => void;
  minPrice: number | null;
  maxPrice: number | null;
  onPriceRangeChange: (min: number | null, max: number | null) => void;
}

export function Filters({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  sortBy,
  onSortChange,
  showBestsellerOnly,
  onBestsellerToggle,
  minPrice,
  maxPrice,
  onPriceRangeChange,
}: FiltersProps) {
  const categories: Product["category"][] = [
    "protein",
    "vitamins",
    "pre-workout",
    "post-workout",
    "weight-management",
    "health-wellness",
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products by name or description..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Category</label>
          <Select value={categoryFilter} onChange={(e) => onCategoryChange(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Sort By</label>
          <Select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            <option value="name">Alphabetical Order</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="bestseller">Bestsellers First</option>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Price Range</label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={minPrice ?? ""}
              onChange={(e) => {
                const value = e.target.value === "" ? null : Number(e.target.value);
                onPriceRangeChange(value, maxPrice);
              }}
              className="w-full"
              min="0"
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="number"
              placeholder="Max"
              value={maxPrice ?? ""}
              onChange={(e) => {
                const value = e.target.value === "" ? null : Number(e.target.value);
                onPriceRangeChange(minPrice, value);
              }}
              className="w-full"
              min="0"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Filter</label>
          <label className="flex items-center space-x-2 cursor-pointer h-10">
            <input
              type="checkbox"
              checked={showBestsellerOnly}
              onChange={(e) => onBestsellerToggle(e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-sm">Bestsellers Only</span>
          </label>
        </div>
      </div>
    </div>
  );
}

