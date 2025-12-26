/**
 * Unsplash API utility functions
 * Documentation: https://unsplash.com/documentation#search-photos
 * 
 * To use the Unsplash API:
 * 1. Register at https://unsplash.com/developers
 * 2. Create an application
 * 3. Get your Access Key
 * 4. Add NEXT_PUBLIC_UNSPLASH_ACCESS_KEY to your .env.local file
 * 
 * Without an API key, the functions will use Unsplash Source (deprecated but still works)
 */

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || "";
const UNSPLASH_API_URL = "https://api.unsplash.com";

interface UnsplashPhoto {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  width: number;
  height: number;
  description: string | null;
}

interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}

/**
 * Search for photos on Unsplash
 * @param query - Search query
 * @param perPage - Number of results per page (default: 10)
 * @returns Array of photo URLs
 */
export async function searchUnsplashPhotos(
  query: string,
  perPage: number = 10
): Promise<string[]> {
  try {
    const url = `${UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=squarish`;
    
    const headers: HeadersInit = {
      "Accept-Version": "v1",
    };

    // Add Authorization header if access key is provided
    if (UNSPLASH_ACCESS_KEY) {
      headers["Authorization"] = `Client-ID ${UNSPLASH_ACCESS_KEY}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      console.warn(`Unsplash API error: ${response.status} ${response.statusText}`);
      // Return fallback images if API fails
      return getFallbackImages(query, perPage);
    }

    const data: UnsplashSearchResponse = await response.json();
    
    if (data.results && data.results.length > 0) {
      // Use regular size images (1080px width) with optimization parameters
      return data.results.map((photo) => 
        `${photo.urls.regular}&w=800&h=800&fit=crop`
      );
    }

    return getFallbackImages(query, perPage);
  } catch (error) {
    console.error("Error fetching Unsplash photos:", error);
    return getFallbackImages(query, perPage);
  }
}

/**
 * Get a random photo from Unsplash
 * @param query - Optional search query
 * @returns Photo URL
 */
export async function getRandomUnsplashPhoto(query?: string): Promise<string> {
  try {
    let url = `${UNSPLASH_API_URL}/photos/random?orientation=squarish`;
    
    if (query) {
      url += `&query=${encodeURIComponent(query)}`;
    }

    const headers: HeadersInit = {
      "Accept-Version": "v1",
    };

    if (UNSPLASH_ACCESS_KEY) {
      headers["Authorization"] = `Client-ID ${UNSPLASH_ACCESS_KEY}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      console.warn(`Unsplash API error: ${response.status}`);
      return getFallbackImage(query || "supplement");
    }

    const photo: UnsplashPhoto = await response.json();
    return `${photo.urls.regular}&w=800&h=800&fit=crop`;
  } catch (error) {
    console.error("Error fetching random Unsplash photo:", error);
    return getFallbackImage(query || "supplement");
  }
}

/**
 * Get fallback images using placeholder service
 * Unsplash Source is deprecated, so we use picsum.photos as fallback
 */
function getFallbackImages(query: string, count: number): string[] {
  const images: string[] = [];
  // Use Picsum Photos (Lorem Picsum) as fallback - reliable placeholder service
  // Each image gets a unique ID based on the query hash
  const baseId = hashString(query);
  
  for (let i = 0; i < count; i++) {
    const imageId = (baseId + i) % 1000; // Use IDs 0-999
    images.push(`https://picsum.photos/800/800?random=${imageId}`);
  }

  return images;
}

function getFallbackImage(query: string): string {
  // Use Picsum Photos as fallback
  const imageId = hashString(query) % 1000;
  return `https://picsum.photos/800/800?random=${imageId}`;
}

// Simple hash function to convert string to number
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

