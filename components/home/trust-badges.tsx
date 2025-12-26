"use client";

import { ShieldCheck, FileCheck, Award, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/card";

const trustBadges = [
  {
    icon: ShieldCheck,
    title: "Third-Party Tested",
    description: "Verified by independent labs",
  },
  {
    icon: FileCheck,
    title: "FDA Registered",
    description: "FDA registered facility",
  },
  {
    icon: Award,
    title: "GMP Certified",
    description: "Good Manufacturing Practices",
  },
  {
    icon: RotateCcw,
    title: "Money-Back Guarantee",
    description: "30-day satisfaction guarantee",
  },
];

export function TrustBadges() {
  return (
    <section className="border-b bg-muted/30 py-6">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-2"
              >
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{badge.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

