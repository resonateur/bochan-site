import { createClient, SanityClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your_project_id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-03-01",
  useCdn: process.env.NODE_ENV === "production",
};

// Set up the client for fetching data
export const sanityClient: SanityClient = createClient(config);

// Set up a helper function for generating image URLs
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Helper function to fetch data from Sanity
export async function fetchSanity<T = any>(
  query: string,
  params?: Record<string, any>
): Promise<T> {
  return await sanityClient.fetch(query, params);
}
