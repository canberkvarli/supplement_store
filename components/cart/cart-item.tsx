"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/lib/types";
import { useCartStore } from "@/lib/store";
import { Trash2 } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b py-4">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0 w-full sm:w-auto">
        <h3 className="font-semibold truncate">{item.product.name}</h3>
        <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)} × {item.quantity}</p>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
        <div className="text-left sm:text-right">
          <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeItem(item.product.id)}
          className="h-8 w-8"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

