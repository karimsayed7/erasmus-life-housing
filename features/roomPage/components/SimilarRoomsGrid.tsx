import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { getTranslations } from "next-intl/server";
import RoomCard from '@/components/shared/RoomCard/RoomCard';

interface Props {
  city: string | null;
  currentRoomId: string;
}

export default async function SimilarRoomsGrid({ city, currentRoomId }: Props) {
  const supabase = await createSupabaseServerClient();

  let query = supabase
    .from("rooms")
    .select("*")
    .neq("id", currentRoomId)
    .eq("is_hidden", false)
    .limit(4);

  if (city) {
    query = query.eq("city->>en", city);
  }

  const { data: rooms } = await query;
  const roomsList = rooms ?? [];
  const tRoomPage = await getTranslations("roomPage");

  const roomIds = roomsList.map((r) => r.id);
  const { data: approvedBookings } = roomIds.length
    ? await supabase
        .from("bookings")
        .select("room_id")
        .in("room_id", roomIds)
        .eq("status", "approved")
    : { data: [] };

  const bookedRoomIds = new Set((approvedBookings ?? []).map((b) => b.room_id));

  return (
    <div>
      <h1 className='text-center my-8 text-xl font-bold'>{tRoomPage('similarRooms')}</h1>

      <div className="lg:grid gap-6 lg:gap-10 sm:grid-cols-2 lg:grid-cols-4 px-15 mb-30">
        {roomsList.map((room) => (
          <div key={room.id}>
            <RoomCard room={room} imgSize={40} isBooked={bookedRoomIds.has(room.id)} />
          </div>
        ))}
      </div>
    </div>
  )
}