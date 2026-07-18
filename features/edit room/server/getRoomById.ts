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

  // attributes[] -> {bedrooms, bathrooms, size}. Matched by icon since that's
  // the stable identifier createRoom writes (labels are locale-dependent).
  const attrByIcon = Object.fromEntries(
    (room.attributes as { icon: string; value: number }[]).map((a) => [a.icon, a.value])
  )

  // facilities/landlord_rules are stored as {icon, name_en, name_pt} — map
  // back to the option `key` the form/checkboxes work with.
  const facilities = FACILITIES_OPTIONS.filter((o) =>
    (room.facilities as { icon: string }[]).some((f) => f.icon === o.icon)
  ).map((o) => o.key)

  const landlordRules = LANDLORD_RULES_OPTIONS.filter((o) =>
    (room.landlord_rules as { icon: string }[]).some((r) => r.icon === o.icon)
  ).map((o) => o.key)

  return {
    id: room.id,
    title: room.title,
    description: room.description,
    location: room.location,
    roomType: room.room_type.en,
    images: room.images,
    lat: room.lat,
    lng: room.lng,
    attrs: {
      bedrooms: attrByIcon["BedDouble"] ?? 0,
      bathrooms: attrByIcon["Bath"] ?? 0,
      size: attrByIcon["Maximize2"] ?? 0,
    },
    price: room.price,
    fees: room.fee,
    bills: room.bills,
    total: room.total,
    facilities,
    landlordRules,
  }
}