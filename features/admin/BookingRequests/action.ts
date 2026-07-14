"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { transporter } from "@/lib/mailer";
import { revalidatePath } from "next/cache";

type ActionResult = { success: true } | { success: false; error: string };

type RoomWithOwnerEmail = {
  id: string;
  title: { en?: string; pt?: string } | null;
  owner: { id: string; name: string | null; email: string | null } | null;
};

export async function approveBooking(roomId: string): Promise<ActionResult> {
  const supabase = await createSupabaseServerClient();

  const { data: room, error: fetchError } = await supabase
    .from("rooms")
    .select("id, title, owner:profiles!rooms_owner_id_fkey(id, name, email)")
    .eq("id", roomId)
    .single()
    .overrideTypes<RoomWithOwnerEmail, { merge: false }>();

  if (fetchError || !room) {
    return { success: false, error: fetchError?.message ?? "Room not found" };
  }

  if (!room.owner) {
    return { success: false, error: "This room has no pending request to approve" };
  }

  const { error: updateError } = await supabase
    .from("rooms")
    .update({ approval_status: { en: "approved", pt: "aprovado" } })
    .eq("id", roomId);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  const roomTitle = room.title?.en ?? "your room";

  try {
    await transporter.sendMail({
      from: `"ErasmusLife" <${process.env.GMAIL_USER}>`,
      to: room.owner.email!,
      subject: "Your booking request has been approved 🎉",
      html: `
        <p>Hi ${room.owner.name ?? "there"},</p>
        <p>Great news — your booking request for <strong>${roomTitle}</strong> has been <strong>approved</strong>.</p>
        <p>Welcome to ErasmusLife!</p>
      `,
    });
  } catch (emailError) {
    console.error("Failed to send approval email:", emailError);
  }

  revalidatePath("/admin/BookingRequests");
  return { success: true };
}

export async function rejectBooking(roomId: string): Promise<ActionResult> {
  const supabase = await createSupabaseServerClient();

  const { data: room, error: fetchError } = await supabase
    .from("rooms")
    .select("id, title, owner:profiles!rooms_owner_id_fkey(id, name, email)")
    .eq("id", roomId)
    .single()
    .overrideTypes<RoomWithOwnerEmail, { merge: false }>();

  if (fetchError || !room) {
    return { success: false, error: fetchError?.message ?? "Room not found" };
  }

  if (!room.owner) {
    return { success: false, error: "This room has no pending request to reject" };
  }

  const ownerEmail = room.owner.email;
  const ownerName = room.owner.name;
  const roomTitle = room.title?.en ?? "your room";

  const { error: updateError } = await supabase
    .from("rooms")
    .update({ owner_id: null, approval_status: null })
    .eq("id", roomId);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  try {
    await transporter.sendMail({
      from: `"ErasmusLife" <${process.env.GMAIL_USER}>`,
      to: ownerEmail!,
      subject: "Your booking request has been Rejected",
      html: `
        <p>Hi ${ownerName ?? "there"},</p>
        <p>Unfortunately your booking request for <strong>${roomTitle}</strong> was <strong>rejected</strong>.</p>
        <p>Feel free to browse other available rooms on ErasmusLife.</p>
      `,
    });
  } catch (emailError) {
    console.error("Failed to send rejection email:", emailError);
  }

  revalidatePath("/admin/BookingRequests");
  return { success: true };
}