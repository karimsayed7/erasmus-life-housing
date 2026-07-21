import "server-only"
import { notFound } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server-client"
import { FACILITIES_OPTIONS, LANDLORD_RULES_OPTIONS } from "@/lib/constants/roomOptions"

export interface RoomForEdit {
  id: string
  title: { en: string; pt: string }
  description: { en: string; pt: string }
  location: { en: string; pt: string }
  roomType: "Studio" | "Apartment" | "Private Room"
  images: string[]
  lat: number
  lng: number
  attrs: { bedrooms: number; bathrooms: number; size: number }
  price: number
  fees: number
  bills: number
  total: number
  facilities: string[]
  landlordRules: string[]
}

export async function getRoomById(id: string): Promise<RoomForEdit> {
  const supabase = await createSupabaseServerClient()

  const { data: room, error } = await supabase.from("rooms").select("*").eq("id", id).single()

  if (error || !room) {
    notFound()
  }

  // title/description/location/room_type are jsonb columns typed generically
  // as `Json` by Supabase — createRoom always writes them as {en, pt} (or
  // {en, pt} wrapped further for room_type), so we cast to the known shape here.
  const title = room.title as { en: string; pt: string }
  const description = room.description as { en: string; pt: string }
  const location = room.location as { en: string; pt: string }
  const roomType = room.room_type as { en: "Studio" | "Apartment" | "Private Room"; pt: string }

  const attrByIcon = Object.fromEntries(
    (room.attributes as { icon: string; value: number }[]).map((a) => [a.icon, a.value])
  )

  const facilities = FACILITIES_OPTIONS.filter((o) =>
    (room.facilities as { icon: string }[]).some((f) => f.icon === o.icon)
  ).map((o) => o.key)

  const landlordRules = LANDLORD_RULES_OPTIONS.filter((o) =>
    (room.landlord_rules as { icon: string }[]).some((r) => r.icon === o.icon)
  ).map((o) => o.key)

  return {
    id: room.id,
    title,
    description,
    location,
    roomType: roomType.en,
    images: room.images ?? [],
    lat: room.lat ?? 0,
    lng: room.lng ?? 0,
    attrs: {
      bedrooms: attrByIcon["BedDouble"] ?? 0,
      bathrooms: attrByIcon["Bath"] ?? 0,
      size: attrByIcon["Maximize2"] ?? 0,
    },
    price: room.price ?? 0,
    fees: room.fee ?? 0,
    bills: room.bills ?? 0,
    total: room.total ?? 0,
    facilities,
    landlordRules,
  }
}