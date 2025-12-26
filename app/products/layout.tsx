import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse our complete selection of premium supplements including protein powders, vitamins, pre-workout and post-workout supplements, weight management products, and health & wellness supplements.",
  keywords: [
    "supplements",
    "protein powder",
    "vitamins",
    "pre-workout",
    "post-workout",
    "weight management",
    "health wellness",
    "fitness supplements",
    "browse products",
  ],
  openGraph: {
    title: "All Products - Supplement Store",
    description: "Browse our complete selection of premium supplements including protein powders, vitamins, pre-workout and post-workout supplements.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "All Products - Supplement Store",
    description: "Browse our complete selection of premium supplements.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://supplement-store.com"}/products`,
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

