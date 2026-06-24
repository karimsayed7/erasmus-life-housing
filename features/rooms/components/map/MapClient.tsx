// features/rooms/components/map/MapClient.tsx
'use client'

import dynamic from 'next/dynamic'
import { Database } from '@/features/types/database'

const LeafletMap = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 animate-pulse rounded-xl" />
  ),
})

type Props = {
  rooms: Database['public']['Tables']['rooms']['Row'][]
}

function MapClient({ rooms }: Props) {
  return (
    <div className="h-[360px] mt-8 w-full rounded-xl overflow-hidden border-b-4 border-gray-400 ">
      <LeafletMap rooms={rooms} />
    </div>
  )
}

export default MapClient