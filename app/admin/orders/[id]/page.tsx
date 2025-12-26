"use client";

import { notFound } from "next/navigation";
import { useOrderStore } from "@/lib/store";
import { OrderDetails } from "@/components/admin/order-details";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const orders = useOrderStore((state) => state.orders);
  const order = orders.find((o) => o.id === params.id);

  if (!order) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 max-w-7xl px-4">
      <Link href="/admin/orders">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
      </Link>
      <OrderDetails order={order} />
    </div>
  );
}

