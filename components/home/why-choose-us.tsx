"use client";

import { Award, TestTube, Heart, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const differentiators = [
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "We source only the highest quality ingredients from trusted suppliers. Every product undergoes rigorous testing to ensure purity and potency.",
  },
  {
    icon: TestTube,
    title: "Scientifically Formulated",
    description:
      "Our supplements are backed by scientific research and formulated by nutrition experts to deliver optimal results.",
  },
  {
    icon: Heart,
    title: "Your Health First",
    description:
      "We're committed to your wellness journey. Our products are designed to support your health and fitness goals safely and effectively.",
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    description:
      "Quick shipping, secure packaging, and excellent customer service. We're here to support you every step of the way.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="space-y-6 py-12 bg-muted/30">
      <h2 className="text-2xl sm:text-3xl font-bold text-center px-4">
        Why Choose Us
      </h2>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

