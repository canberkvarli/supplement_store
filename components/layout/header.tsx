"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Moon, Sun, Home, Package, Settings } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const itemCount = useCartStore((state) => state.getItemCount());
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between max-w-7xl px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Supplement Store</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link
            href="/products"
            className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
              isActive("/products") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Package className="h-4 w-4" />
            Products
          </Link>
          <Link
            href="/cart"
            className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
              isActive("/cart") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            Cart
          </Link>
          <Link
            href="/admin/orders"
            className={`flex items-center justify-center text-sm font-medium transition-colors hover:text-primary ${
              pathname.startsWith("/admin") ? "text-primary" : "text-muted-foreground"
            }`}
            title="Admin"
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Admin</span>
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
          <Link href="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

