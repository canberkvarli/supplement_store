"use client";

import { OrdersTable } from "@/components/admin/orders-table";
import { Package } from "lucide-react";

export default function AdminOrdersPage() {
  return (
    <div className="container mx-auto py-8 max-w-7xl px-4">
      <div className="space-y-2 mb-8">
        <h1 className="text-4xl font-bold flex items-center gap-2">
          <Package className="h-8 w-8" />
          Order Management
        </h1>
        <p className="text-muted-foreground">
          View and manage all customer orders
        </p>
      </div>
      <OrdersTable />
    </div>
  );
}

