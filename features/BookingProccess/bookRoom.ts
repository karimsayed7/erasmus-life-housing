"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
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

  // room owner can't book their own room
  const { data: currentRoom, error: fetchError } = await supabase
    .from("rooms")
    .select("owner_id, is_hidden")
    .eq("id", roomId)
    .single();

  if (fetchError || !currentRoom) {
    return { success: false as const, error: "VERIFY_FAILED" };
  }

  if (currentRoom.owner_id === user.id) {
    return { success: false as const, error: "ALREADY_BOOKED" };
  }

  if (currentRoom.is_hidden) {
    return { success: false as const, error: "ROOM_UNAVAILABLE" };
  }

  // room already has a confirmed tenant -> no more requests accepted
  const { data: approvedBooking } = await supabase
    .from("bookings")
    .select("id")
    .eq("room_id", roomId)
    .eq("status", "approved")
    .maybeSingle();

  if (approvedBooking) {
    return { success: false as const, error: "ROOM_UNAVAILABLE" };
  }

  // this user already has a pending request on this room
  const { data: existingPending } = await supabase
    .from("bookings")
    .select("id")
    .eq("room_id", roomId)
    .eq("user_id", user.id)
    .eq("status", "pending")
    .maybeSingle();

  if (existingPending) {
    return { success: false as const, error: "ALREADY_BOOKED" };
  }

  const ptText = await translateToPortuguese("waiting approval");

  const serviceClient = createServiceRoleClient();
  const { error: insertError } = await serviceClient.from("bookings").insert({
    room_id: roomId,
    user_id: user.id,
    status: "pending",
    approval_status: { en: "waiting approval", pt: ptText },
  });

  if (insertError) {
    // race condition: unique_pending_booking_per_user was violated between the check above and the insert
    if (insertError.code === "23505") {
      return { success: false as const, error: "ALREADY_BOOKED" };
    }
    return { success: false as const, error: "UPDATE_FAILED" };
  }

  return { success: true as const };
}