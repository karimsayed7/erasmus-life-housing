'use client'

import dynamic from 'next/dynamic'
import { Database } from '@/types/database'

const LeafletMap = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 animate-pulse rounded-xl" />
  ),
})

type Room = Database['public']['Tables']['rooms']['Row']

type Props = {
  rooms: Room | Room[]  
}

function MapClient({ rooms }: Props) {
  
  const normalizedRooms = Array.isArray(rooms) ? rooms : [rooms]
  const validRooms = normalizedRooms.filter(Boolean)

  return (
    <div className="h-[360px] mt-8 w-full rounded-xl overflow-hidden border-b-4 border-gray-400">
      <LeafletMap rooms={validRooms} />
    </div>
  )
}

export default MapClient