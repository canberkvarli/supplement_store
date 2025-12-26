import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review your selected supplements and proceed to checkout. Free shipping on orders over $50.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Shopping Cart - Supplement Store",
    description: "Review your selected supplements and proceed to checkout.",
    type: "website",
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

