import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Management",
  description: "View and manage all customer orders.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminOrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

