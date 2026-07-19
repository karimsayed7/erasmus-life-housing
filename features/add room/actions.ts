"use server"

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@/lib/supabase/server-client"
import { translateToPortuguese } from "@/lib/translate/TranslateToPortugues"
import { createRoomSchema, type CreateRoomInput } from "@/schema/AddRoomSchema"
import { FACILITIES_OPTIONS, LANDLORD_RULES_OPTIONS, ROOM_TYPE_PT } from "@/lib/constants/roomOptions"

type ActionResult = { success: true; roomId: string } | { success: false; error: string }

export async function createRoom(input: CreateRoomInput): Promise<ActionResult> {
  const parsed = createRoomSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, error: "Invalid form data" }
  }
  const values = parsed.data

  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: "You must be signed in to add a room" }
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    return { success: false, error: "Only admins can add rooms from this form" }
  }

  const [titlePt, descriptionPt] = await Promise.all([
    translateToPortuguese(values.title),
    translateToPortuguese(values.description),
  ])

  const facilities = FACILITIES_OPTIONS.filter((o) => values.facilities.includes(o.key)).map(({ icon, en, pt }) => ({
    icon,
    name_en: en,
    name_pt: pt,
  }))

  const landlordRules = LANDLORD_RULES_OPTIONS.filter((o) => values.landlordRules.includes(o.key)).map(
    ({ icon, en, pt }) => ({ icon, name_en: en, name_pt: pt })
  )

  const today = new Date().toISOString().split("T")[0]

  const { data: room, error } = await supabase
    .from("rooms")
    .insert({
      owner_id: null,
      title: { en: values.title, pt: titlePt },
      description: { en: values.description, pt: descriptionPt },
      location: { en: values.location, pt: values.location },
      city: { en: "Porto", pt: "Porto" },
      room_type: { en: values.roomType, pt: ROOM_TYPE_PT[values.roomType] },
      attributes: [
        { icon: "BedDouble", value: values.attrs.bedrooms, name_en: "Bedrooms", name_pt: "Quartos" },
        { icon: "Maximize2", value: values.attrs.size, name_en: "m2", name_pt: "Área" },
        { icon: "Bath", value: values.attrs.bathrooms, name_en: "Bathrooms", name_pt: "Casas de Banho" },
      ],
      facilities,
      landlord_rules: landlordRules,
      amenities: {
        en: facilities.map((f) => f.name_en),
        pt: facilities.map((f) => f.name_pt),
      },
      images: values.imageUrls,
      lat: values.lat,
      lng: values.lng,
      price: values.price,
      fee: values.fees,
      bills: values.bills,
      total: values.total,
      date_from: today,
    })
    .select("id")
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard/rooms")
  return { success: true, roomId: room.id }
}