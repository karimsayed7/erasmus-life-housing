
"use client"

import { useMemo } from "react"
import RoomCard from "@/components/shared/RoomCard/RoomCard"
import { useFavorites } from "@/features/favourites/useFavorites"
import { Database } from "@/types/database"

type Room = Database['public']['Tables']['rooms']['Row']

export default function FavouritesList({ initialRooms }: { initialRooms: Room[] }) {
  const { favoriteIds } = useFavorites()

  const rooms = useMemo(
    () => initialRooms.filter((room) => favoriteIds.includes(room.id)),
    [initialRooms, favoriteIds]
  )

  if (rooms.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No favourite rooms yet.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 md:px-25">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} imgSize={45} />
      ))}
    </div>
  )
}