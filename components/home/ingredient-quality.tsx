"use client";

import { CheckCircle2, Microscope, Leaf, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const qualityFeatures = [
  {
    icon: Microscope,
    title: "Third-Party Tested",
    description:
      "Every batch is tested by independent laboratories to verify purity, potency, and safety.",
  },
  {
    icon: Leaf,
    title: "Premium Sourcing",
    description:
      "We source ingredients from trusted suppliers worldwide, ensuring the highest quality standards.",
  },
  {
    icon: Shield,
    title: "GMP Certified",
    description:
      "Manufactured in FDA-registered, GMP-certified facilities following strict quality protocols.",
  },
  {
    icon: CheckCircle2,
    title: "Transparent Labeling",
    description:
      "Full ingredient disclosure with no hidden additives. You know exactly what you're getting.",
  },
];

export function IngredientQuality() {
  return (
    <section className="space-y-6 py-12">
      <div className="text-center space-y-2 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Ingredient Quality & Transparency
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We believe in complete transparency about what goes into our
          products. Your health and trust are our top priorities.
        </p>
      </div>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {qualityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-2">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

