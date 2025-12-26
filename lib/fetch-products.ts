import { Product } from "./types";
import { searchUnsplashPhotos } from "./unsplash";

// Product data structure
const productData = [
  // Protein products
  { name: "Whey Protein Isolate - Vanilla", price: 49.99, category: "protein" as const, bestseller: true, query: "protein powder supplement" },
  { name: "Whey Protein Concentrate - Chocolate", price: 44.99, category: "protein" as const, bestseller: true, query: "protein fitness nutrition" },
  { name: "Plant-Based Protein - Vanilla", price: 54.99, category: "protein" as const, bestseller: false, query: "plant protein vegan" },
  { name: "Casein Protein - Cookies & Cream", price: 52.99, category: "protein" as const, bestseller: true, query: "protein fitness nutrition" },
  { name: "Egg White Protein - Unflavored", price: 47.99, category: "protein" as const, bestseller: false, query: "protein powder supplement" },
  // Vitamin products
  { name: "Vitamin D3 + K2 Complex", price: 24.99, category: "vitamins" as const, bestseller: true, query: "vitamins supplements health" },
  { name: "Multivitamin for Men", price: 29.99, category: "vitamins" as const, bestseller: true, query: "vitamins wellness" },
  { name: "Multivitamin for Women", price: 29.99, category: "vitamins" as const, bestseller: false, query: "vitamins supplements health" },
  { name: "Vitamin B12 Complex", price: 19.99, category: "vitamins" as const, bestseller: false, query: "vitamins wellness" },
  { name: "Omega-3 Fish Oil", price: 34.99, category: "vitamins" as const, bestseller: true, query: "vitamins supplements health" },
  { name: "Vitamin C + Zinc", price: 22.99, category: "vitamins" as const, bestseller: false, query: "vitamins wellness" },
  // Pre-workout products
  { name: "Pre-Workout Energy - Caffeine Boost", price: 39.99, category: "pre-workout" as const, bestseller: true, query: "fitness workout energy" },
  { name: "Pre-Workout Pump - Nitric Oxide", price: 42.99, category: "pre-workout" as const, bestseller: false, query: "fitness gym workout" },
  { name: "Pre-Workout Endurance - Beta Alanine", price: 37.99, category: "pre-workout" as const, bestseller: false, query: "fitness workout energy" },
  { name: "Pre-Workout Focus - No Caffeine", price: 39.99, category: "pre-workout" as const, bestseller: false, query: "fitness gym workout" },
  // Post-workout products
  { name: "Post-Workout Recovery - BCAAs", price: 32.99, category: "post-workout" as const, bestseller: true, query: "recovery fitness" },
  { name: "Post-Workout Glutamine", price: 27.99, category: "post-workout" as const, bestseller: false, query: "recovery health" },
  { name: "Post-Workout Creatine Monohydrate", price: 24.99, category: "post-workout" as const, bestseller: false, query: "recovery fitness" },
  // Weight management products
  { name: "Fat Burner - Thermogenic", price: 44.99, category: "weight-management" as const, bestseller: false, query: "fitness health" },
  { name: "Appetite Suppressant", price: 39.99, category: "weight-management" as const, bestseller: false, query: "fitness wellness" },
  { name: "Metabolism Booster", price: 36.99, category: "weight-management" as const, bestseller: false, query: "fitness health" },
  // Health & wellness products
  { name: "Probiotics - Digestive Health", price: 29.99, category: "health-wellness" as const, bestseller: true, query: "health wellness supplements" },
  { name: "Magnesium Complex", price: 26.99, category: "health-wellness" as const, bestseller: false, query: "health wellness" },
  { name: "Collagen Peptides", price: 49.99, category: "health-wellness" as const, bestseller: false, query: "health wellness supplements" },
  { name: "Turmeric Curcumin", price: 31.99, category: "health-wellness" as const, bestseller: false, query: "health wellness" },
];

const descriptions: Record<Product["category"], string> = {
  protein: "High-quality protein powder to support muscle growth and recovery. Perfect for post-workout shakes or meal replacement.",
  vitamins: "Essential vitamins and minerals to support overall health and wellness. Formulated for optimal absorption.",
  "pre-workout": "Enhance your workout performance with this powerful pre-workout formula. Increases energy, focus, and endurance.",
  "post-workout": "Accelerate recovery and reduce muscle soreness with this post-workout supplement. Supports muscle repair and growth.",
  "weight-management": "Support your weight management goals with this scientifically-formulated supplement. Helps boost metabolism and control appetite.",
  "health-wellness": "Promote overall health and wellness with this premium supplement. Supports various aspects of your health journey.",
};

/**
 * Fetch products with images from Unsplash API
 * This function uses the Unsplash API to get real images for each product
 */
export async function fetchProductsWithImages(): Promise<Product[]> {
  const products: Product[] = [];
  
  // Group products by query to minimize API calls
  const queryGroups: Record<string, typeof productData> = {};
  productData.forEach((product) => {
    if (!queryGroups[product.query]) {
      queryGroups[product.query] = [];
    }
    queryGroups[product.query].push(product);
  });

  // Fetch images for each query group
  const imageCache: Record<string, string[]> = {};
  
  for (const [query, productsInGroup] of Object.entries(queryGroups)) {
    try {
      const images = await searchUnsplashPhotos(query, productsInGroup.length);
      imageCache[query] = images;
    } catch (error) {
      console.error(`Error fetching images for query "${query}":`, error);
      // Use fallback
      imageCache[query] = productsInGroup.map(() => 
        `https://source.unsplash.com/800x800/?${encodeURIComponent(query)}`
      );
    }
  }

  // Build products array
  productData.forEach((data, index) => {
    const images = imageCache[data.query] || [];
    const imageIndex = queryGroups[data.query].indexOf(data);
    const image = images[imageIndex] || images[0] || `https://source.unsplash.com/800x800/?${encodeURIComponent(data.query)}`;

    products.push({
      id: `prod-${index + 1}`,
      name: data.name,
      description: descriptions[data.category],
      price: data.price,
      category: data.category,
      bestseller: data.bestseller,
      image,
    });
  });

  return products;
}

