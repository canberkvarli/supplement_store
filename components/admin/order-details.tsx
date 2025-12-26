"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Order } from "@/lib/types";
import { useOrderStore } from "@/lib/store";
import Image from "next/image";
import { User, Mail, MapPin, Calendar, Package, DollarSign, Phone, Building2 } from "lucide-react";

interface OrderDetailsProps {
  order: Order;
}

export function OrderDetails({ order: initialOrder }: OrderDetailsProps) {
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);
  const orders = useOrderStore((state) => state.orders);
  
  // Get the latest order from store to ensure reactivity
  const order = orders.find((o) => o.id === initialOrder.id) || initialOrder;

  const handleStatusChange = (newStatus: Order["status"]) => {
    updateOrderStatus(order.id, newStatus);
  };

  const getStatusVariant = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "processing":
        return "default";
      case "shipped":
        return "default";
      case "delivered":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <CardTitle className="text-xl sm:text-2xl break-all sm:break-normal">Order {order.id}</CardTitle>
            <Badge variant={getStatusVariant(order.status)} className="self-start sm:self-auto">{order.status}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <User className="h-4 w-4" />
                Customer Information
              </h3>
              <p className="text-sm flex items-center gap-2">
                <User className="h-3 w-3" />
                {order.customerName}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Mail className="h-3 w-3" />
                {order.email}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Phone className="h-3 w-3" />
                {order.phone}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Shipping Address
              </h3>
              <p className="text-sm">{order.address}</p>
              <p className="text-sm text-muted-foreground">
                {order.city}, {order.state} {order.zipCode}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Order Date
              </h3>
              <p className="text-sm">{new Date(order.date).toLocaleString()}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Update Status</h3>
              <Select
                value={order.status}
                onChange={(e) => handleStatusChange(e.target.value as Order["status"])}
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.products.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b pb-4">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 w-full sm:w-auto">
                  <h4 className="font-semibold truncate">{item.product.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.product.category} • Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto">
                  <p className="font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-lg font-semibold">
                <span className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Total
                </span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

