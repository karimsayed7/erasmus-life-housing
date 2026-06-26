
import SidebarFilters from './components/sidebarFilter/SidebarFilter'
import MapClient from '@/components/shared/map/MapClient'
import RoomsGrid from './components/roomsGrid/RoomsGrid'
import { RoomSearchParams } from './types/room-search-params'
import { getRooms } from './services/GetRooms'
import Header from '../../components/shared/Header/Header'


async function Rooms({ searchParams }: { searchParams: RoomSearchParams }) {
  const data = await getRooms(searchParams)

  return (
    <>
      <Header />
      <div className="flex gap-4  mb-20">
        {/* Sidebar */}
        <SidebarFilters />        
      
        {/* Main content */}
        <div className="flex flex-col pr-4 flex-1 z-20">
          <MapClient rooms={data} />
          <RoomsGrid rooms={data} page={searchParams.page}/>
        </div>
      </div>
    </>
  )
}

export default Rooms