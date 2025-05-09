import { createServerSupabaseClient } from "./supabase";
import type {
  Scholarship,
  InternationalScholarship,
} from "@/types/scholarship";

// Constants for table names
const SCHOLARSHIPS_TABLE = "scholarships";
const INTERNATIONAL_SCHOLARSHIPS_TABLE = "international_scholarships";

/**
 * Fetches all scholarships from the "scholarships" table.
 * @param limit - Optional limit for the number of scholarships to fetch.
 * @param offset - Optional offset for pagination.
 */
export async function getScholarships(
  limit?: number,
  offset?: number
): Promise<Scholarship[]> {
  const supabase = createServerSupabaseClient();
  let query = supabase.from(SCHOLARSHIPS_TABLE).select("*");

  if (limit) {
    query = query.limit(limit);
  }
  if (offset) {
    query = query.range(offset, offset + (limit || 10) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching scholarships:", error);
    return [];
  }

  return (data as Scholarship[]) || [];
}

/**
 * Fetches international scholarships, optionally filtered by category.
 * @param category - The category to filter scholarships by (optional).
 * @param limit - Optional limit for the number of scholarships to fetch.
 * @param offset - Optional offset for pagination.
 */
export async function getInternationalScholarships(
  category?: string,
  limit?: number,
  offset?: number
): Promise<InternationalScholarship[]> {
  const supabase = createServerSupabaseClient();

  // Start building the query
  let query = supabase.from(INTERNATIONAL_SCHOLARSHIPS_TABLE).select("*");

  // Add a filter for the category if provided
  if (category && typeof category === "string" && category.trim() !== "") {
    query = query.eq("category", category.trim());
  }

  if (limit) {
    query = query.limit(limit);
  }
  if (offset) {
    query = query.range(offset, offset + (limit || 10) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching international scholarships:", error.message);
    return [];
  }

  return (data as InternationalScholarship[]) || [];
}

/**
 * Fetches distinct scholarship categories.
 */
export async function getScholarshipCategories(): Promise<string[]> {
  const supabase = createServerSupabaseClient();

  try {
    const [rpcResult, fallbackResult] = await Promise.all([
      supabase.rpc("get_distinct_categories"),
      supabase.from(INTERNATIONAL_SCHOLARSHIPS_TABLE).select("category"),
    ]);

    if (!rpcResult.error) {
      return rpcResult.data as string[];
    }

    if (!fallbackResult.error) {
      const uniqueCategories = [
        ...new Set(
          (fallbackResult.data as { category: string }[])
            .map((item) => item.category)
            .filter(Boolean)
        ),
      ];
      return uniqueCategories;
    }

    console.error("Error fetching categories:", rpcResult.error || fallbackResult.error);
    return [];
  } catch (error) {
    console.error("Unexpected error fetching categories:", error);
    return [];
  }
}