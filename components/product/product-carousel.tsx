"use client";

import { Carousel } from "@/components/ui/carousel";
import { ProductCard } from "./product-card";
import { Product } from "@/lib/types";

interface ProductCarouselProps {
  products: Product[];
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  return (
    <Carousel className="w-full">
      {products.map((product) => (
        <div key={product.id} className="px-4">
          <ProductCard product={product} />
        </div>
      ))}
    </Carousel>
  );
}

