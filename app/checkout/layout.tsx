import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order by providing shipping information. Secure checkout with free shipping on orders over $50.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Checkout - Supplement Store",
    description: "Complete your order by providing shipping information.",
    type: "website",
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

