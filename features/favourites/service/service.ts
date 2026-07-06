// import { createClient } from "@/lib/supabase/client";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

export async function getFavorites(): Promise<string[]> {
  const supabase = getSupabaseBrowserClient();

  const { data, error } = await supabase
    .from("favorites")
    .select("room_id");

  if (error) {
    console.error("getFavorites error:", error.message);
    throw error;
  }

  return data.map((row) => row.room_id);
}

export async function addFavorite(roomId: string): Promise<void> {
  const supabase = getSupabaseBrowserClient();

  const { error } = await supabase
    .from("favorites")
    .insert({ room_id: roomId });

  if (error) {
    console.error("addFavorite error:", error.message);
    throw error;
  }
}

export async function removeFavorite(roomId: string): Promise<void> {
  const supabase = getSupabaseBrowserClient();

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("room_id", roomId);

  if (error) {
    console.error("removeFavorite error:", error.message);
    throw error;
  }
}