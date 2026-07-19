import Header from '@/components/shared/Header/Header';
import ImageSlider from './components/ImageSlider';
import { Database } from '@/types/database'
import Properties from './components/Properties';
import BookRequest from './components/BookRequest';
import MapClient from '@/components/shared/map/MapClient';
import SimilarRoomsGrid from './components/SimilarRoomsGrid';
import { createSupabaseServerClient } from '@/lib/supabase/server-client';

interface Props {
  room: Database['public']['Tables']['rooms']['Row'];
  isLoggedIn: boolean;
}

async function RoomPage({ room, isLoggedIn }: Props) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // is the room already taken by someone (approved)?
  const { data: approvedBooking } = await supabase
    .from('bookings')
    .select('id')
    .eq('room_id', room.id)
    .eq('status', 'approved')
    .maybeSingle();

  // does the current user have their own request on this room?
  let myBookingStatus: 'none' | 'pending' | 'approved' | 'rejected' = 'none';
  if (user) {
    const { data: myBooking } = await supabase
      .from('bookings')
      .select('status')
      .eq('room_id', room.id)
      .eq('user_id', user.id)
      .in('status', ['pending', 'approved', 'rejected'])
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    myBookingStatus = (myBooking?.status as typeof myBookingStatus) ?? 'none';
  }

  const isRoomBooked = !!approvedBooking;

  return (
    <>
      <Header />
      <div className='flex flex-col lg:flex-row px-4 md:px-10 lg:px-16 gap-10 py-6'>
        {/* left side */}
        <div className='w-full lg:w-[55%] xl:w-[60%] shrink-0'>
          <ImageSlider roomImages={room.images} />
          <Properties room={room} />
        </div>

        {/* right side */}
        <div className='w-full lg:flex-1'>
          <BookRequest
            id={room.id}
            isLoggedIn={isLoggedIn}
            isRoomBooked={isRoomBooked}
            myBookingStatus={myBookingStatus}
          />
          <div className='hidden lg:block'>
            <MapClient rooms={room} />
          </div>
        </div>
      </div>

      {/* similar rooms grid */}
      <div className='hidden lg:block'>
        <SimilarRoomsGrid
          city={
            room.city && typeof room.city === 'object' && 'en' in room.city
              ? (room.city as { en?: string }).en ?? null
              : null
          }
          currentRoomId={room.id}
        />
      </div>
    </>
  )
}

export default RoomPage