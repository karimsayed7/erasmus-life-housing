import { getTranslations } from "next-intl/server";
import RoomCard from "@/components/shared/RoomCard/RoomCard";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { ScrollReveal } from "@/features/Landing/animations/ScrollReveal";
import { StaggerReveal } from "@/features/Landing/animations/StaggerReveal";

export async function Rooms() {
  const t = await getTranslations("Rooms");
  const supabase = await createSupabaseServerClient();
  const { data: rooms, error } = await supabase.from("rooms").select("*").eq('is_hidden', false).limit(6);

  if (error) {
    return <h1>{t("error")}</h1>;
  }

  const roomIds = rooms.map((r) => r.id);
  const { data: approvedBookings } = roomIds.length
    ? await supabase
        .from("bookings")
        .select("room_id")
        .in("room_id", roomIds)
        .eq("status", "approved")
    : { data: [] };

  const bookedRoomIds = new Set((approvedBookings ?? []).map((b) => b.room_id));

  return (
    <section id="rooms" className="px-6 md:px-12 lg:px-20 max-w-[1580px] mx-auto mt-10 mb-30">
      <ScrollReveal direction="up">
        <h1 className="mb-10 text-2xl font-bold">{t("heading")}</h1>
      </ScrollReveal>

      <StaggerReveal
        className="grid grid-cols-1 gap-12 lg:gap-18 sm:grid-cols-2 lg:grid-cols-3"
        staggerDelay={0.1}
      >
        {rooms.map((room, index) => (
          <div key={index}>
            <RoomCard room={room} imgSize={57} isBooked={bookedRoomIds.has(room.id)} />
          </div>
        ))}
      </StaggerReveal>
    </section>
  );
}

export default Rooms;