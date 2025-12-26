"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/lib/store";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CreditCard, Truck, Package } from "lucide-react";

export function CartSummary() {
  const total = useCartStore((state) => state.getTotal());
  const itemCount = useCartStore((state) => state.getItemCount());
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return null;
  }

  const shipping = total > 50 ? 0 : 5.99;
  const finalTotal = total + shipping;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
            </span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Shipping
            </span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          {total < 50 && (
            <p className="text-xs text-muted-foreground">
              Add ${(50 - total).toFixed(2)} more for free shipping
            </p>
          )}
          <div className="border-t pt-2">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <Link href="/checkout" className="block">
          <Button className="w-full">
            <CreditCard className="mr-2 h-4 w-4" />
            Proceed to Checkout
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

