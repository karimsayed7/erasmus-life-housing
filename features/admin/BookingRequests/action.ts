"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { transporter } from "@/lib/mailer";
import { revalidatePath } from "next/cache";

type ActionResult = { success: true } | { success: false; error: string };

type BookingWithRoomAndApplicant = {
  id: string;
  room: { id: string; title: { en?: string; pt?: string } | null };
  applicant: { id: string; name: string | null; email: string | null } | null;
};

export async function approveBooking(bookingId: string): Promise<ActionResult> {
  const supabase = await createSupabaseServerClient();

  const { data: booking, error: fetchError } = await supabase
    .from("bookings")
    .select("id, room:rooms(id, title), applicant:profiles!bookings_user_id_fkey(id, name, email)")
    .eq("id", bookingId)
    .eq("status", "pending")
    .single()
    .overrideTypes<BookingWithRoomAndApplicant, { merge: false }>();

  if (fetchError || !booking) {
    return { success: false, error: fetchError?.message ?? "Booking not found or already handled" };
  }

  if (!booking.applicant?.email) {
    return { success: false, error: "This booking has no applicant email on file" };
  }

  const { error: updateError } = await supabase
    .from("bookings")
    .update({ status: "approved", approval_status: { en: "booked", pt: "Reservado" } })
    .eq("id", bookingId);
  // The DB trigger (reject_other_pending_bookings) auto-rejects every other
  // pending booking on this room the moment this update lands.

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  const roomTitle = booking.room.title?.en ?? "your room";

  try {
    await transporter.sendMail({
      from: `"ErasmusLife" <${process.env.GMAIL_USER}>`,
      to: booking.applicant.email,
      subject: "Your booking request has been approved 🎉",
      html: `
        <p>Hi ${booking.applicant.name ?? "there"},</p>
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

export async function rejectBooking(bookingId: string): Promise<ActionResult> {
  const supabase = await createSupabaseServerClient();

  const { data: booking, error: fetchError } = await supabase
    .from("bookings")
    .select("id, room:rooms(id, title), applicant:profiles!bookings_user_id_fkey(id, name, email)")
    .eq("id", bookingId)
    .eq("status", "pending")
    .single()
    .overrideTypes<BookingWithRoomAndApplicant, { merge: false }>();

  if (fetchError || !booking) {
    return { success: false, error: fetchError?.message ?? "Booking not found or already handled" };
  }

  if (!booking.applicant?.email) {
    return { success: false, error: "This booking has no applicant email on file" };
  }

  const { error: updateError } = await supabase
    .from("bookings")
    .update({ status: "rejected", approval_status: { en: "rejected", pt: "Rejeitado" } })
    .eq("id", bookingId);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  const roomTitle = booking.room.title?.en ?? "your room";

  try {
    await transporter.sendMail({
      from: `"ErasmusLife" <${process.env.GMAIL_USER}>`,
      to: booking.applicant.email,
      subject: "Your booking request has been Rejected",
      html: `
        <p>Hi ${booking.applicant.name ?? "there"},</p>
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