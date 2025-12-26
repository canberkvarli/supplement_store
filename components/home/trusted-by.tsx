"use client";

const trustedBy = [
  "Elite Fitness Gym",
  "Pro Athletes",
  "Wellness Coaches",
  "Nutrition Experts",
  "Fitness Trainers",
];

export function TrustedBy() {
  return (
    <section className="py-12 space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-center px-4">
        Trusted By Professionals
      </h2>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {trustedBy.map((brand, index) => (
            <div
              key={index}
              className="px-6 py-3 rounded-lg border bg-card text-muted-foreground font-medium text-sm md:text-base hover:text-primary transition-colors"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

