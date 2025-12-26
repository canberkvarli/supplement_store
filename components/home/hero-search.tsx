"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { Product } from "@/lib/types";
import Image from "next/image";

// Suggestions component to avoid duplication
function SuggestionsDropdown({
  showSuggestions,
  suggestions,
  onSuggestionClick,
}: {
  showSuggestions: boolean;
  suggestions: Product[];
  onSuggestionClick: (product: Product) => void;
}) {
  if (!showSuggestions || suggestions.length === 0) return null;
  
  return (
    <div className="absolute z-50 w-full mt-2 bg-background border rounded-lg shadow-lg max-h-80 overflow-y-auto">
      {suggestions.map((product) => (
        <button
          key={product.id}
          onClick={() => onSuggestionClick(product)}
          className="w-full px-4 py-3 text-left hover:bg-muted transition-colors border-b last:border-b-0 flex items-center gap-3"
        >
          <div className="relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium">{product.name}</div>
            <div className="text-sm text-muted-foreground line-clamp-1">
              {product.description}
            </div>
            <div className="text-sm font-semibold text-primary mt-1">
              ${product.price.toFixed(2)}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export function HeroSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const stickySearchRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const currentRef = isSticky ? stickySearchRef.current : searchRef.current;
      if (
        currentRef &&
        !currentRef.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSticky]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Header is h-16 (64px), so check if search bar has scrolled past header
        setIsSticky(rect.top < 64);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.length > 0) {
      const filtered = products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(value.toLowerCase()) ||
            product.description.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (product: Product) => {
    router.push(`/products/${product.id}`);
    setShowSuggestions(false);
    setSearchQuery("");
  };

  return (
    <>
      {/* Original position - hidden when sticky */}
      <div
        ref={containerRef}
        className={`relative w-full max-w-4xl mx-auto transition-opacity duration-300 ${
          isSticky ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div ref={searchRef} className="relative">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for supplements, vitamins, protein..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => {
                  if (suggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                className="w-full pl-16 pr-32 h-20 text-lg"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSuggestions([]);
                    setShowSuggestions(false);
                  }}
                  className="absolute right-28 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-6 w-6" />
                </button>
              )}
            </div>
            <Button
              type="submit"
              size="lg"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-16 px-8 text-base"
            >
              Search
            </Button>
          </form>

          {/* Only show suggestions when original search is visible (not sticky) */}
          {!isSticky && (
            <SuggestionsDropdown
              showSuggestions={showSuggestions}
              suggestions={suggestions}
              onSuggestionClick={handleSuggestionClick}
            />
          )}
        </div>
      </div>

      {/* Sticky version - shown when scrolled past */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b shadow-md transition-all duration-300 ${
          isSticky ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="container mx-auto max-w-4xl px-4 py-2">
          <div ref={stickySearchRef} className="relative">
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for supplements, vitamins, protein..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => {
                    if (suggestions.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                  className="w-full pl-10 pr-24 h-12 text-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSuggestions([]);
                      setShowSuggestions(false);
                    }}
                    className="absolute right-20 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 px-4 text-sm"
              >
                Search
              </Button>
            </form>

            {/* Only show suggestions when sticky search is visible */}
            {isSticky && (
              <SuggestionsDropdown
                showSuggestions={showSuggestions}
                suggestions={suggestions}
                onSuggestionClick={handleSuggestionClick}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

