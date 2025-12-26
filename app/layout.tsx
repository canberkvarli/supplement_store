import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Supplement Store - Premium Supplements & Wellness Products",
    template: "%s | Supplement Store",
  },
  description: "Your trusted source for premium supplements and wellness products. Shop high-quality protein powders, vitamins, pre-workout supplements, and more. Free shipping on orders over $50.",
  keywords: [
    "supplements",
    "protein powder",
    "vitamins",
    "pre-workout",
    "post-workout",
    "wellness products",
    "fitness supplements",
    "health supplements",
    "nutrition",
    "sports nutrition",
  ],
  authors: [{ name: "Supplement Store" }],
  creator: "Supplement Store",
  publisher: "Supplement Store",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://supplement-store.com",
    siteName: "Supplement Store",
    title: "Supplement Store - Premium Supplements & Wellness Products",
    description: "Your trusted source for premium supplements and wellness products. Shop high-quality protein powders, vitamins, pre-workout supplements, and more.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Supplement Store - Premium Supplements & Wellness Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Supplement Store - Premium Supplements & Wellness Products",
    description: "Your trusted source for premium supplements and wellness products. Shop high-quality protein powders, vitamins, pre-workout supplements, and more.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://supplement-store.com",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://supplement-store.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
