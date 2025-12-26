/**
 * Get product image URL
 * Uses Unsplash API when available, falls back to placeholder service
 */

// Pre-defined Unsplash photo IDs for each category (these are real Unsplash photo IDs)
// These work without API key as direct image URLs
const categoryPhotoIds: Record<string, string[]> = {
  protein: [
    "1556909114-f6e7ad7d3136", // Protein/supplement related
    "1571019613454-1cb2f99b2d8b",
    "1593111774240-d529f12cf4bb",
    "1571019613454-1cb2f99b2d8b",
    "1556909114-f6e7ad7d3136",
  ],
  vitamins: [
    "1584308666744-24d5c474f2ae", // Vitamins/health related
    "1550572017-edd951b55104",
    "1584308666744-24d5c474f2ae",
    "1550572017-edd951b55104",
    "1584308666744-24d5c474f2ae",
    "1550572017-edd951b55104",
  ],
  "pre-workout": [
    "1571019613454-1cb2f99b2d8b", // Fitness/workout related
    "1556909114-f6e7ad7d3136",
    "1571019613454-1cb2f99b2d8b",
    "1556909114-f6e7ad7d3136",
  ],
  "post-workout": [
    "1571019613454-1cb2f99b2d8b", // Recovery/fitness
    "1556909114-f6e7ad7d3136",
    "1571019613454-1cb2f99b2d8b",
  ],
  "weight-management": [
    "1584308666744-24d5c474f2ae", // Health/fitness
    "1550572017-edd951b55104",
    "1584308666744-24d5c474f2ae",
  ],
  "health-wellness": [
    "1550572017-edd951b55104", // Wellness/health
    "1584308666744-24d5c474f2ae",
    "1550572017-edd951b55104",
    "1584308666744-24d5c474f2ae",
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
  return `https://images.unsplash.com/photo-${photoId}?w=800&h=800&fit=crop&q=80`;
}

