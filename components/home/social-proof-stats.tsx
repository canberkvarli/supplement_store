"use client";

import { Users, Star, MessageSquare } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "50,000+",
    label: "Happy Customers",
  },
  {
    icon: Star,
    value: "4.8/5",
    label: "Average Rating",
  },
  {
    icon: MessageSquare,
    value: "10,000+",
    label: "Verified Reviews",
  },
];

export function SocialProofStats() {
  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-2"
              >
                <div className="p-4 rounded-full bg-primary/10 text-primary mb-2">
                  <Icon className="h-8 w-8" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

