import type { Metadata } from "next";
import { products } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://supplement-store.com";

  return {
    title: product.name,
    description: `${product.description} - $${product.price.toFixed(2)}. ${product.bestseller ? "Bestseller" : ""} ${product.category} supplement.`,
    keywords: [
      product.name,
      product.category,
      "supplements",
      "wellness",
      "fitness",
      product.bestseller ? "bestseller" : "",
    ].filter(Boolean),
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
      images: [
        {
          url: product.image,
          width: 1200,
          height: 1200,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.image],
    },
    alternates: {
      canonical: `${baseUrl}/products/${id}`,
    },
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

