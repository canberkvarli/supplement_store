import Link from "next/link";
import { Package, Mail, Truck, RotateCcw } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-10 md:py-12 max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Supplement Store</h3>
            <p className="text-sm text-muted-foreground">
              Your trusted source for premium supplements and wellness products.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <Package className="h-4 w-4" />
              Shop
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/products" className="hover:text-primary">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=protein" className="hover:text-primary">
                  Protein
                </Link>
              </li>
              <li>
                <Link href="/products?category=vitamins" className="hover:text-primary">
                  Vitamins
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Customer Service
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#contact" className="hover:text-primary flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-primary flex items-center gap-2">
                  <Truck className="h-3 w-3" />
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-primary flex items-center gap-2">
                  <RotateCcw className="h-3 w-3" />
                  Returns
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Supplement Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

