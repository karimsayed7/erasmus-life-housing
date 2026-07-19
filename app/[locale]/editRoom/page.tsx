import React from "react"
import EditRoom from "@/features/edit room/EditRoom"
import { getRoomById } from "@/features/edit room/server/getRoomById"

interface PageProps {
  searchParams: Promise<{ id: string }>
}

export default async function Page({ searchParams  }: PageProps) {
  const { id } = await searchParams 
  const room = await getRoomById(id)

  return (
    <div>
      <EditRoom room={room} />
    </div>
  )
}