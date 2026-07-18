import Header from '@/components/shared/Header/Header';
import ImageSlider from './components/ImageSlider';
import { Database } from '@/types/database'
import Properties from './components/Properties';
import BookRequest from './components/BookRequest';
import MapClient from '@/components/shared/map/MapClient';
import SimilarRoomsGrid from './components/SimilarRoomsGrid';

interface Props {
  room: Database['public']['Tables']['rooms']['Row'];
  isLoggedIn: boolean;
}

async function RoomPage({ room, isLoggedIn }: Props) {
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
            approvalStatusEn={
              room.approval_status && typeof room.approval_status === 'object' && 'en' in room.approval_status
                ? (room.approval_status as { en?: string }).en ?? 'none'
                : 'none'
            }
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