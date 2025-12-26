"use client";

import { Carousel } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  rating: number;
  review: string;
  location: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    rating: 5,
    review: "Amazing quality products! I've been using their protein powder for 3 months and I can really see the difference. Fast shipping and great customer service.",
    location: "New York, NY",
  },
  {
    name: "Michael Chen",
    rating: 5,
    review: "Best supplements I've ever tried. The pre-workout gives me incredible energy without the crash. Highly recommend to anyone serious about fitness.",
    location: "Los Angeles, CA",
  },
  {
    name: "Emily Rodriguez",
    rating: 5,
    review: "I love how transparent they are about their ingredients. Third-party tested and I can trust what I'm putting in my body. The vitamins have improved my energy levels significantly.",
    location: "Chicago, IL",
  },
  {
    name: "David Thompson",
    rating: 5,
    review: "Great prices and even better quality. The subscription service saves me money and I never run out. Customer support is always helpful when I have questions.",
    location: "Houston, TX",
  },
  {
    name: "Jessica Martinez",
    rating: 5,
    review: "I've tried many supplement brands, but this one stands out. The results speak for themselves - better recovery, more energy, and I feel great overall.",
    location: "Phoenix, AZ",
  },
];

export function TestimonialsCarousel() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-center px-4">
        What Our Customers Say
      </h2>
      <Carousel className="w-full">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="px-4 flex justify-center">
            <Card className="w-full max-w-2xl">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.review}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </Carousel>
    </section>
  );
}

