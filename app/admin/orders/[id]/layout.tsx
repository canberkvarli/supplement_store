import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  // Note: In a real app, you'd fetch order details from your database/API here
  // For now, we'll use a generic title
  return {
    title: `Order ${id}`,
    description: `View details for order ${id}`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function OrderDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

