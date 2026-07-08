
"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export async function cancelRoomRequest(roomId: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("rooms")
    .update({ owner_id: null })
    .eq("id", roomId);

  if (error) throw new Error(error.message);
  revalidatePath("/applications");
}