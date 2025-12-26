import { NextResponse } from "next/server";
import { searchUnsplashPhotos, getRandomUnsplashPhoto } from "@/lib/unsplash";

/**
 * API route to fetch Unsplash images
 * GET /api/unsplash?query=protein&count=5
 * GET /api/unsplash/random?query=supplement
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "supplement";
  const count = parseInt(searchParams.get("count") || "1", 10);
  const type = searchParams.get("type") || "search"; // 'search' or 'random'

  try {
    if (type === "random") {
      const imageUrl = await getRandomUnsplashPhoto(query);
      return NextResponse.json({ imageUrl });
    } else {
      const imageUrls = await searchUnsplashPhotos(query, count);
      return NextResponse.json({ imageUrls });
    }
  } catch (error) {
    console.error("Error in Unsplash API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}

