"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/lib/store";
import { ShoppingCart, ArrowLeft, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const isInCart = items.some((item) => item.product.id === product?.id);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem({ product, quantity: 1 });
  };

  return (
    <div className="container mx-auto py-8 max-w-7xl px-4">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{product.category}</Badge>
              {product.bestseller && <Badge>Bestseller</Badge>}
            </div>
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground">{product.description}</p>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              className="flex-1"
              size="lg"
              onClick={handleAddToCart}
              disabled={isInCart}
            >
              {isInCart ? (
                "Already in Cart"
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </>
              )}
            </Button>
            <Link href="/products">
              <Button variant="outline" size="lg">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Continue Shopping
              </Button>
            </Link>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Free Shipping
                </span>
                <span>On orders over $50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Returns
                </span>
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Quality
                </span>
                <span>Third-party tested</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

