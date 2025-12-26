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
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Select value={categoryFilter} onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")}
            </option>
          ))}
        </Select>
        <Select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="bestseller">Bestsellers First</option>
        </Select>
        <label className="flex items-center space-x-2 cursor-pointer">
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
  );
}

