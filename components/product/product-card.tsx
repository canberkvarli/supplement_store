"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const isInCart = items.some((item) => item.product.id === product.id);

  const handleAddToCart = () => {
    addItem({ product, quantity: 1 });
  };

  return (
    <Card className="flex flex-col overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square w-full overflow-hidden bg-muted rounded-t-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.bestseller && (
            <Badge className="absolute top-2 left-2 text-sm md:text-base px-3 py-1.5 font-semibold">
              Bestseller
            </Badge>
          )}
          {product.stock !== undefined && product.stock < 10 && (
            <Badge variant="destructive" className="absolute top-2 right-2 text-sm md:text-base px-3 py-1.5 font-semibold">
              Only {product.stock} left!
            </Badge>
          )}
        </div>
      </Link>
      <CardHeader>
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            {product.stock !== undefined && product.stock < 10 && (
              <span className="text-xs text-destructive font-medium mt-1">
                Low stock - {product.stock} remaining
              </span>
            )}
          </div>
          <Badge variant="outline">{product.category}</Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-4 pb-4">
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          {isInCart ? (
            "In Cart"
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

