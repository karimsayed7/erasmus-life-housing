import SidebarFilters from './components/sidebarFilter/SidebarFilter'
import MapClient from '@/components/shared/map/MapClient'
import RoomsGrid from './components/roomsGrid/RoomsGrid'
import { RoomSearchParams } from '../../types/room-search-params'
import { getRooms } from './services/GetRooms'
import Header from '../../components/shared/Header/Header'
import { FavoritesProvider } from "@/providers/FavoritesProvider";
import { createSupabaseServerClient } from '@/lib/supabase/server-client'

async function Rooms({ searchParams }: { searchParams: RoomSearchParams }) {
  const data = await getRooms(searchParams)

  const supabase = await createSupabaseServerClient();
  const roomIds = data.map((r) => r.id);
  const { data: approvedBookings } = roomIds.length
    ? await supabase
        .from("bookings")
        .select("room_id")
        .in("room_id", roomIds)
        .eq("status", "approved")
    : { data: [] };

  const bookedRoomIds = (approvedBookings ?? []).map((b) => b.room_id);

  return (
    <>
      <Header />
      <div className="flex gap-0 md:gap-4">
        {/* Sidebar */}
        <SidebarFilters />        
      
        {/* Main content */}
        <div className="flex flex-col pr-4 flex-1 z-20 pb-20">
          <MapClient rooms={data} />
          <FavoritesProvider>
            <RoomsGrid rooms={data} page={searchParams.page} bookedRoomIds={bookedRoomIds}/>
          </FavoritesProvider>
        </div>
      </div>
    </>
  )
}

export default Rooms