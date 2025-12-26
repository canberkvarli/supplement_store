"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Order } from "@/lib/types";
import { useOrderStore } from "@/lib/store";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search, Eye, Package, AlertCircle } from "lucide-react";

export function OrdersTable() {
  const orders = useOrderStore((state) => state.orders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dateError, setDateError] = useState<string>("");
  const itemsPerPage = 10;

  // Validate date range
  const validateDateRange = (from: string, to: string) => {
    if (!from && !to) {
      setDateError("");
      return true;
    }
    
    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      
      // Check if end date is earlier than start date
      if (toDate < fromDate) {
        setDateError("End date cannot be earlier than start date");
        return false;
      }
      
      // Check if dates are in the future
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (fromDate > today) {
        setDateError("Start date cannot be in the future");
        return false;
      }
      if (toDate > today) {
        setDateError("End date cannot be in the future");
        return false;
      }
    }
    
    setDateError("");
    return true;
  };

  const handleDateFromChange = (value: string) => {
    setDateFrom(value);
    setCurrentPage(1);
    validateDateRange(value, dateTo);
  };

  const handleDateToChange = (value: string) => {
    setDateTo(value);
    setCurrentPage(1);
    validateDateRange(dateFrom, value);
  };

  const filteredOrders = orders.filter((order) => {
    // Only filter if date range is valid
    if (dateError && dateFrom && dateTo) {
      return false;
    }

    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.products.some((item) =>
        item.product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesStatus = !statusFilter || order.status === statusFilter;

    const matchesDate =
      (!dateFrom || new Date(order.date) >= new Date(dateFrom)) &&
      (!dateTo || new Date(order.date) <= new Date(dateTo));

    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 items-end">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders, customers, or products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onChange={(e) => {
          setStatusFilter(e.target.value);
          setCurrentPage(1);
        }}>
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </Select>
        <div className="space-y-2">
          <label htmlFor="dateFrom" className="text-sm font-medium">
            Start Date
          </label>
          <Input
            id="dateFrom"
            type="date"
            placeholder="From Date"
            value={dateFrom}
            onChange={(e) => handleDateFromChange(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="dateTo" className="text-sm font-medium">
            End Date
          </label>
          <Input
            id="dateTo"
            type="date"
            placeholder="To Date"
            value={dateTo}
            onChange={(e) => handleDateToChange(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      {dateError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{dateError}</AlertDescription>
        </Alert>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              paginatedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>{order.products.length}</TableCell>
                  <TableCell>
                    <div className="relative group inline-block">
                      <Package className="h-5 w-5 text-muted-foreground cursor-help hover:text-foreground transition-colors" />
                      <div className="absolute left-full top-0 ml-2 w-64 p-3 bg-popover border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                        <div className="space-y-2">
                          <p className="text-sm font-semibold mb-2">Ordered Products:</p>
                          {order.products.map((item, idx) => (
                            <div key={idx} className="text-sm border-b pb-2 last:border-0">
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-muted-foreground">
                                Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/orders/${order.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of{" "}
            {filteredOrders.length} orders
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

