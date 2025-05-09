import { createClient } from "@supabase/supabase-js";

// For server components
export const createServerSupabaseClient = () => {
  const supabaseUrl = String(process.env.NEXT_PUBLIC_SUPABASE_URL) || "https:";
  const supabaseKey = String(process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) || "";

  return createClient(supabaseUrl, supabaseKey);
};

// For client components (singleton pattern)
let clientInstance: ReturnType<typeof createClient> | null = null;

export const createClientSupabaseClient = () => {
  if (clientInstance) return clientInstance;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  clientInstance = createClient(supabaseUrl, supabaseKey);
  return clientInstance;
};
