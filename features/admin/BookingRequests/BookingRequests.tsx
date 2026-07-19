import React from "react";
import { RoomSearchParams } from "@/types/room-search-params";
import RequestsTable from "./components/RequestsTable";
import RoomSearchBar from "../../../components/shared/RoomSearchBar";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { Database } from "@/types/database";

const PAGE_SIZE = 9;

export default async function BookingRequests({
  searchParams,
}: {
  searchParams: RoomSearchParams;
}) {
  const supabase = await createSupabaseServerClient();

  const currentPage = Math.max(1, parseInt(searchParams.page ?? "1", 10));
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  type BookingWithRoomAndApplicant =
    Database["public"]["Tables"]["bookings"]["Row"] & {
      room: Database["public"]["Tables"]["rooms"]["Row"];
      applicant: Pick<
        Database["public"]["Tables"]["profiles"]["Row"],
        "id" | "name" | "email" | "photo"
      > | null;
    };

  let query = supabase
    .from("bookings")
    .select(
      `*, room:rooms!inner(*), applicant:profiles!bookings_user_id_fkey(id, name, email, photo)`,
      { count: "exact" }
    )
    .in("status", ["pending", "approved"])
    .eq("room.is_hidden", false);

  const q = searchParams.q?.trim();

  if (q) {
    const term = q.replace(/[%_]/g, "\\$&");

    query = query.or(
      `title->>en.ilike.%${term}%,title->>pt.ilike.%${term}%`,
      {
        referencedTable: "rooms",
      }
    );
  }

  const { data: bookings, error, count } = await query
    .order("created_at", { ascending: false })
    .range(from, to)
    .overrideTypes<BookingWithRoomAndApplicant[], { merge: false }>();

  if (error) {
    throw new Error(error.message);
  }

  const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));

  return (
    <div className="border-l-2">
      <div className="flex items-center justify-end p-8">
        <RoomSearchBar />
      </div>

      {bookings.length === 0 ? (
        <div className="py-40 text-center text-lg font-semibold text-gray-400">
          No booking requests yet
        </div>
      ) : (
        <RequestsTable
          bookings={bookings}
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}