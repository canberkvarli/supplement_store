"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
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
      // Normalize dates to local timezone for proper comparison
      const fromDateParts = from.split('-').map(Number);
      const fromDate = new Date(fromDateParts[0], fromDateParts[1] - 1, fromDateParts[2]);
      
      const toDateParts = to.split('-').map(Number);
      const toDate = new Date(toDateParts[0], toDateParts[1] - 1, toDateParts[2]);
      
      // Check if end date is earlier than start date
      if (toDate < fromDate) {
        setDateError("End date cannot be earlier than start date");
        return false;
      }
      
      // Check if dates are in the future (allow today's date)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayNormalized = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      
      if (fromDate > todayNormalized) {
        setDateError("Start date cannot be in the future");
        return false;
      }
      if (toDate > todayNormalized) {
        setDateError("End date cannot be in the future");
        return false;
      }
    } else if (from) {
      // Validate single date
      const fromDateParts = from.split('-').map(Number);
      const fromDate = new Date(fromDateParts[0], fromDateParts[1] - 1, fromDateParts[2]);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayNormalized = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      
      if (fromDate > todayNormalized) {
        setDateError("Start date cannot be in the future");
        return false;
      }
    } else if (to) {
      // Validate single date
      const toDateParts = to.split('-').map(Number);
      const toDate = new Date(toDateParts[0], toDateParts[1] - 1, toDateParts[2]);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayNormalized = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      
      if (toDate > todayNormalized) {
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

    // For date filtering, we need to compare dates properly
    // Normalize all dates to local timezone and compare only the date part (ignore time)
    let matchesDate = true;
    
    if (dateFrom || dateTo) {
      // Normalize order date to start of day in local timezone
      const orderDate = new Date(order.date);
      const orderDateNormalized = new Date(
        orderDate.getFullYear(),
        orderDate.getMonth(),
        orderDate.getDate()
      );
      
      if (dateFrom) {
        // dateFrom from input is in format YYYY-MM-DD, create date at start of day in local timezone
        const fromDateParts = dateFrom.split('-').map(Number);
        const fromDate = new Date(fromDateParts[0], fromDateParts[1] - 1, fromDateParts[2]);
        if (orderDateNormalized < fromDate) {
          matchesDate = false;
        }
      }
      
      if (dateTo && matchesDate) {
        // dateTo from input is in format YYYY-MM-DD, create date at start of day in local timezone
        const toDateParts = dateTo.split('-').map(Number);
        const toDate = new Date(toDateParts[0], toDateParts[1] - 1, toDateParts[2]);
        // Compare with order date normalized (both are at start of day, so same day will be equal)
        if (orderDateNormalized > toDate) {
          matchesDate = false;
        }
      }
    }

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
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

      <div className="hidden md:block rounded-md border-2">
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
                <TableRow key={order.id} className="border-b-2 hover:bg-muted/50 transition-colors">
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
      {/* Mobile Card View */}
      <div className="md:hidden space-y-6">
        {paginatedOrders.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No orders found
          </div>
        ) : (
          paginatedOrders.map((order) => (
            <Card key={order.id} className="p-4 border-2 shadow-md hover:shadow-lg transition-shadow">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-muted-foreground">Order ID</p>
                    <p className="font-semibold truncate">{order.id}</p>
                  </div>
                  <Badge variant={getStatusVariant(order.status)}>
                    {order.status}
                  </Badge>
                </div>
                <div>
                  <p className="font-medium text-sm text-muted-foreground">Customer</p>
                  <p className="font-semibold">{order.customerName}</p>
                </div>
                <div>
                  <p className="font-medium text-sm text-muted-foreground">Date</p>
                  <p>{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-medium text-sm text-muted-foreground">Items</p>
                  <p>{order.products.length} item{order.products.length !== 1 ? 's' : ''}</p>
                </div>
                <div>
                  <p className="font-medium text-sm text-muted-foreground mb-2">Products</p>
                  <div className="space-y-2">
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
                <div className="flex items-center justify-between pt-2 border-t">
                  <div>
                    <p className="font-medium text-sm text-muted-foreground">Total</p>
                    <p className="font-semibold text-lg">${order.total.toFixed(2)}</p>
                  </div>
                  <Link href={`/admin/orders/${order.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>


      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
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

