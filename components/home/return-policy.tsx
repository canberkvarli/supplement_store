"use client";

import { RotateCcw, ShieldCheck, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ReturnPolicy() {
  return (
    <section className="py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div className="p-4 rounded-full bg-primary/10 text-primary">
                  <RotateCcw className="h-8 w-8" />
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">30-Day Money-Back Guarantee</h2>
                  <Badge variant="default">Risk-Free</Badge>
                </div>
                <p className="text-muted-foreground">
                  Not satisfied with your purchase? We offer a hassle-free 30-day
                  money-back guarantee on all unopened products. Your satisfaction
                  is our priority, and we stand behind the quality of every product
                  we sell.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Full Refund</p>
                      <p className="text-xs text-muted-foreground">
                        Get your money back, no questions asked
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">30 Days</p>
                      <p className="text-xs text-muted-foreground">
                        Plenty of time to try our products
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

