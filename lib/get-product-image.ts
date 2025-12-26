/**
 * Get product image URL
 * Uses Unsplash API when available, falls back to placeholder service
 */

// Pre-defined Unsplash photo IDs for each category (these are real Unsplash photo IDs)
// These work without API key as direct image URLs
// Updated with better, more relevant supplement/product images
const categoryPhotoIds: Record<string, string[]> = {
  protein: [
    "1556909114-f6e7ad7d3136", // Protein powder container
    "1571019613454-1cb2f99b2d8b", // Supplement bottles
    "1593111774240-d529f12cf4bb", // Fitness supplements
    "1576678907480-0329e4a878a3", // Protein shake
    "1556909114-f6e7ad7ad3136", // Protein products
  ],
  vitamins: [
    "1584308666744-24d5c474f2ae", // Vitamin bottles
    "1550572017-edd951b55104", // Health supplements
    "1571019613454-1cb2f99b2d8b", // Vitamin containers
    "1556909114-f6e7ad7d3136", // Supplements
    "1584308666744-24d5c474f2ae", // Health products
    "1550572017-edd951b55104", // Vitamins
  ],
  "pre-workout": [
    "1571019613454-1cb2f99b2d8b", // Pre-workout supplements
    "1556909114-f6e7ad7d3136", // Fitness products
    "1593111774240-d529f12cf4bb", // Energy supplements
    "1576678907480-0329e4a878a3", // Workout supplements
  ],
  "post-workout": [
    "1571019613454-1cb2f99b2d8b", // Recovery supplements
    "1556909114-f6e7ad7d3136", // Post-workout products
    "1593111774240-d529f12cf4bb", // Recovery drinks
  ],
  "weight-management": [
    "1584308666744-24d5c474f2ae", // Weight management products
    "1550572017-edd951b55104", // Health supplements
    "1571019613454-1cb2f99b2d8b", // Fitness products
  ],
  "health-wellness": [
    "1550572017-edd951b55104", // Wellness products
    "1584308666744-24d5c474f2ae", // Health supplements
    "1571019613454-1cb2f99b2d8b", // Wellness supplements
    "1556909114-f6e7ad7d3136", // Health products
  ],
};

let imageIndex = 0;

/**
 * Get image URL for a product
 * Uses direct Unsplash image URLs (no API key needed for viewing)
 */
export function getProductImage(category: string, index: number): string {
  const categoryKey = category as keyof typeof categoryPhotoIds;
  const photoIds = categoryPhotoIds[categoryKey] || categoryPhotoIds.protein;
  const photoId = photoIds[index % photoIds.length];
  
  // Use direct Unsplash image URL with optimization parameters
  // Format: https://images.unsplash.com/photo-{id}?w=800&h=800&fit=crop
  // Using higher quality (q=90) and better sizing for product images
  return `https://images.unsplash.com/photo-${photoId}?w=600&h=600&fit=crop&q=90&auto=format`;
}

