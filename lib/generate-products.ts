import { Product } from "./types";
import { searchUnsplashPhotos } from "./unsplash";

// Supplement product categories and names
const productNames = {
  protein: [
    "Whey Protein Isolate - Vanilla",
    "Whey Protein Concentrate - Chocolate",
    "Plant-Based Protein - Vanilla",
    "Casein Protein - Cookies & Cream",
    "Egg White Protein - Unflavored",
  ],
  vitamins: [
    "Vitamin D3 + K2 Complex",
    "Multivitamin for Men",
    "Multivitamin for Women",
    "Vitamin B12 Complex",
    "Omega-3 Fish Oil",
    "Vitamin C + Zinc",
  ],
  "pre-workout": [
    "Pre-Workout Energy - Caffeine Boost",
    "Pre-Workout Pump - Nitric Oxide",
    "Pre-Workout Endurance - Beta Alanine",
    "Pre-Workout Focus - No Caffeine",
  ],
  "post-workout": [
    "Post-Workout Recovery - BCAAs",
    "Post-Workout Glutamine",
    "Post-Workout Creatine Monohydrate",
  ],
  "weight-management": [
    "Fat Burner - Thermogenic",
    "Appetite Suppressant",
    "Metabolism Booster",
  ],
  "health-wellness": [
    "Probiotics - Digestive Health",
    "Magnesium Complex",
    "Collagen Peptides",
    "Turmeric Curcumin",
  ],
};

const descriptions = {
  protein: "High-quality protein powder to support muscle growth and recovery. Perfect for post-workout shakes or meal replacement.",
  vitamins: "Essential vitamins and minerals to support overall health and wellness. Formulated for optimal absorption.",
  "pre-workout": "Enhance your workout performance with this powerful pre-workout formula. Increases energy, focus, and endurance.",
  "post-workout": "Accelerate recovery and reduce muscle soreness with this post-workout supplement. Supports muscle repair and growth.",
  "weight-management": "Support your weight management goals with this scientifically-formulated supplement. Helps boost metabolism and control appetite.",
  "health-wellness": "Promote overall health and wellness with this premium supplement. Supports various aspects of your health journey.",
};

const prices = {
  protein: [49.99, 44.99, 54.99, 52.99, 47.99],
  vitamins: [24.99, 29.99, 29.99, 19.99, 34.99, 22.99],
  "pre-workout": [39.99, 42.99, 37.99, 39.99],
  "post-workout": [32.99, 27.99, 24.99],
  "weight-management": [44.99, 39.99, 36.99],
  "health-wellness": [29.99, 26.99, 49.99, 31.99],
};

const bestsellers = {
  protein: [true, true, false, true, false],
  vitamins: [true, true, false, false, true, false],
  "pre-workout": [true, false, false, false],
  "post-workout": [true, false, false],
  "weight-management": [false, false, false],
  "health-wellness": [true, false, false, false],
};

/**
 * Generate products with images from Unsplash API
 */
export async function generateProducts(): Promise<Product[]> {
  const products: Product[] = [];
  let productId = 1;

  // Fetch images for each category
  const categoryQueries: Record<string, string> = {
    protein: "protein powder supplement",
    vitamins: "vitamins supplements",
    "pre-workout": "fitness workout energy",
    "post-workout": "recovery fitness",
    "weight-management": "fitness health",
    "health-wellness": "health wellness supplements",
  };

  for (const [category, names] of Object.entries(productNames)) {
    const query = categoryQueries[category] || category;
    
    // Fetch images for this category
    const imageUrls = await searchUnsplashPhotos(query, names.length);
    
    // Create products for this category
    names.forEach((name, index) => {
      products.push({
        id: `prod-${productId}`,
        name,
        description: descriptions[category as keyof typeof descriptions],
        price: prices[category as keyof typeof prices][index],
        category: category as Product["category"],
        bestseller: bestsellers[category as keyof typeof bestsellers][index],
        image: imageUrls[index] || imageUrls[0] || `https://source.unsplash.com/800x800/?${encodeURIComponent(query)}`,
      });
      productId++;
    });
  }

  return products;
}

