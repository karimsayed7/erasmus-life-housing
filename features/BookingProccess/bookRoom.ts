"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server-client"; 
import {createServiceRoleClient} from "@/lib/supabase/service-role"
import { translateToPortuguese } from "@/lib/translate/TranslateToPortugues";

export async function bookRoomAction(roomId: string) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false as const, error: "AUTH_REQUIRED" };
  }

  const { data: currentRoom, error: fetchError } = await supabase
    .from("rooms")
    .select("owner_id")
    .eq("id", roomId)
    .single();

  if (fetchError) {
    return { success: false as const, error: "VERIFY_FAILED" };
  }

  if (currentRoom?.owner_id === user.id) {
    return { success: false as const, error: "ALREADY_BOOKED" };
  }

  if (currentRoom?.owner_id !== null) {
    return { success: false as const, error: "ROOM_UNAVAILABLE" };
  }

  const ptText = await translateToPortuguese("waiting approval");

  const serviceClient = createServiceRoleClient();
  const { error: updateError } = await serviceClient
    .from("rooms")
    .update({
      owner_id: user.id,
      approval_status: { en: "waiting approval", pt: ptText },
    })
    .eq("id", roomId);

  if (updateError) {
    return { success: false as const, error: "UPDATE_FAILED" };
  }

  return { success: true as const };
}