"use client";

import { products } from "@/lib/data";
import { ProductCarousel } from "@/components/product/product-carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, HelpCircle, Truck, ShieldCheck, RotateCcw, Sparkles } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TrustBadges } from "@/components/home/trust-badges";
import { HeroSearch } from "@/components/home/hero-search";
import { BenefitsGrid } from "@/components/home/benefits-grid";
import { TestimonialsCarousel } from "@/components/home/testimonials-carousel";
import { IngredientQuality } from "@/components/home/ingredient-quality";
import { ComparisonTable } from "@/components/home/comparison-table";
import { ReturnPolicy } from "@/components/home/return-policy";

export default function Home() {
  const bestsellers = products.filter((p) => p.bestseller).slice(0, 5);

  const faqs = [
    {
      question: "What supplements do you offer?",
      answer: "We offer a wide range of supplements including protein powders, vitamins, pre-workout and post-workout supplements, weight management products, and health & wellness supplements.",
      icon: HelpCircle,
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 5-7 business days. Free shipping is available on orders over $50.",
      icon: Truck,
    },
    {
      question: "Are your products third-party tested?",
      answer: "Yes, all our products undergo rigorous third-party testing to ensure quality, purity, and safety.",
      icon: ShieldCheck,
    },
    {
      question: "Can I return products if I'm not satisfied?",
      answer: "Yes, we offer a 30-day money-back guarantee on all unopened products. Please contact our customer service for returns.",
      icon: RotateCcw,
    },
    {
      question: "Do you offer subscription discounts?",
      answer: "Yes, subscribe and save up to 20% on your favorite products with our subscription service.",
      icon: Sparkles,
    },
  ];

  return (
    <>
      <div className="container mx-auto py-8 space-y-12 max-w-7xl px-4">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl px-4">
            Premium Supplements for Your Wellness Journey
          </h1>
          <p className="mx-auto max-w-[700px] text-base sm:text-lg text-muted-foreground px-4">
            Discover our curated selection of high-quality supplements designed to support your health and fitness goals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <Link href="/products" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">Shop Now</Button>
            </Link>
            <Link href="/products?category=protein" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Browse Protein
              </Button>
            </Link>
          </div>
        </section>

        {/* Hero Search */}
        <section className="px-4 py-8">
          <HeroSearch />
        </section>

        {/* Bestsellers Carousel */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold">Bestsellers</h2>
            <Link href="/products?bestseller=true">
              <Button variant="ghost" className="w-full sm:w-auto">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <ProductCarousel products={bestsellers} />
        </section>

        {/* Trust Badges Bar */}
        <TrustBadges />

        {/* Benefits Grid */}
        <BenefitsGrid />

        {/* Testimonials Carousel */}
        <TestimonialsCarousel />

        {/* Ingredient Quality Showcase */}
        <IngredientQuality />

        {/* Comparison Table */}
        <ComparisonTable />

        {/* Return Policy Highlight */}
        <ReturnPolicy />

        {/* FAQ Section */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center px-4">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto px-4">
            <Accordion type="single">
              {faqs.map((faq, index) => {
                const Icon = faq.icon;
                return (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger itemValue={`faq-${index}`}>
                      <div className="flex items-start gap-3 text-left">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-medium">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent itemValue={`faq-${index}`}>
                      <p className="leading-relaxed pt-2">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="contact" className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center px-4">Contact Us</h2>
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}
