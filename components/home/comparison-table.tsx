"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const comparisonData = [
  {
    feature: "Third-Party Testing",
    us: true,
    competitors: false,
  },
  {
    feature: "GMP Certified",
    us: true,
    competitors: "Some",
  },
  {
    feature: "Money-Back Guarantee",
    us: true,
    competitors: false,
  },
  {
    feature: "Transparent Labeling",
    us: true,
    competitors: false,
  },
  {
    feature: "Free Shipping ($50+)",
    us: true,
    competitors: "Varies",
  },
  {
    feature: "Subscription Discounts",
    us: true,
    competitors: "Some",
  },
];

export function ComparisonTable() {
  return (
    <section className="space-y-6 py-12 bg-muted/30">
      <div className="text-center space-y-2 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold">Us vs. Competitors</h2>
        <p className="text-muted-foreground">
          See how we compare to other supplement brands
        </p>
      </div>
      <div className="container mx-auto max-w-4xl px-4">
        <Card>
          <CardHeader>
            <CardTitle>Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature</TableHead>
                  <TableHead className="text-center">Us</TableHead>
                  <TableHead className="text-center">Competitors</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{row.feature}</TableCell>
                    <TableCell className="text-center">
                      {row.us === true ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.competitors === true ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : row.competitors === false ? (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">
                          {row.competitors}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

