/**
 * Get product image URL
 * Uses direct Unsplash image URLs (no API required)
 */

const categoryPhotoIds: Record<string, string[]> = {
  protein: [
    "1556909114-f6e7ad7d3136",
    "1571019613454-1cb2f99b2d8b",
    "1593111774240-d529f12cf4bb",
    "1576678907480-0329e4a878a3",
    "1584308666744-24d5c474f2ae",
  ],
  vitamins: [
    "1584308666744-24d5c474f2ae",
    "1550572017-edd951b55104",
    "1571019613454-1cb2f99b2d8b",
    "1556909114-f6e7ad7d3136",
    "1593111774240-d529f12cf4bb",
    "1576678907480-0329e4a878a3",
  ],
  "pre-workout": [
    "1571019613454-1cb2f99b2d8b",
    "1556909114-f6e7ad7d3136",
    "1593111774240-d529f12cf4bb",
    "1576678907480-0329e4a878a3",
  ],
  "post-workout": [
    "1571019613454-1cb2f99b2d8b",
    "1556909114-f6e7ad7d3136",
    "1593111774240-d529f12cf4bb",
  ],
  "weight-management": [
    "1584308666744-24d5c474f2ae",
    "1550572017-edd951b55104",
    "1571019613454-1cb2f99b2d8b",
  ],
  "health-wellness": [
    "1550572017-edd951b55104",
    "1584308666744-24d5c474f2ae",
    "1571019613454-1cb2f99b2d8b",
    "1556909114-f6e7ad7d3136",
  ],
};

export function getProductImage(category: string, index: number): string {
  const categoryKey = category as keyof typeof categoryPhotoIds;
  const photoIds = categoryPhotoIds[categoryKey] || categoryPhotoIds.protein;
  const photoId = photoIds[index % photoIds.length];
  
  return `https://images.unsplash.com/photo-${photoId}?w=800&h=800&fit=crop&q=90&auto=format`;
}

