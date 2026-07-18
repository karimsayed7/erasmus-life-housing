import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { FACILITIES_OPTIONS, LANDLORD_RULES_OPTIONS } from "@/lib/constants/roomOptions"

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"]

const facilityKeys = FACILITIES_OPTIONS.map((o) => o.key) as [string, ...string[]]
const landlordRuleKeys = LANDLORD_RULES_OPTIONS.map((o) => o.key) as [string, ...string[]]

export const baseRoomFields = {
  title: z.string().min(5, { error: "Title must be at least 5 characters" }).max(100, { error: "Title is too long" }),
  roomType: z.enum(["Studio", "Apartment", "Private Room"], { error: "Please select a room type" }),
  description: z.string().min(20, { error: "Description must be at least 20 characters" }).max(2000, { error: "Description is too long" }),
  location: z.string().min(3, { error: "Please specify the location" }),
  lat: z.number({ error: "Latitude must be a number" }).min(-90, { error: "Latitude must be between -90 and 90" }).max(90, { error: "Latitude must be between -90 and 90" }),
  lng: z.number({ error: "Longitude must be a number" }).min(-180, { error: "Longitude must be between -180 and 180" }).max(180, { error: "Longitude must be between -180 and 180" }),
  attrs: z.object({
    bedrooms: z.number({ error: "Must be a number" }).int().min(0),
    bathrooms: z.number({ error: "Must be a number" }).int().min(0),
    size: z.number({ error: "Must be a number" }).positive({ error: "Size must be greater than zero" }),
  }),
  price: z.number({ error: "Must be a number" }).positive({ error: "Price must be greater than zero" }),
  fees: z.number({ error: "Must be a number" }).nonnegative({ error: "Fee must be zero or greater" }),
  bills: z.number({ error: "Must be a number" }).nonnegative({ error: "Bills must be zero or greater" }),
  total: z.number({ error: "Must be a number" }).positive({ error: "Total must be greater than zero" }),
  facilities: z.array(z.enum(facilityKeys)).min(1, { error: "Select at least one facility" }),
  landlordRules: z.array(z.enum(landlordRuleKeys)), // no .default() — input/output types must match for zodResolver + useForm<T>
}

export const totalMatchesSum = (data: { price: number; fees: number; bills: number; total: number }) =>
  data.total === data.price + data.fees + data.bills

export const addRoomSchema = z
  .object({
    images: z
      .array(
        z
          .instanceof(File)
          .refine((file) => file.size <= MAX_FILE_SIZE, { error: "Image size must be less than 5MB" })
          .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), { error: "Image must be jpeg, png, or webp" })
      )
      .min(1, { error: "You must add at least one image" })
      .max(4, { error: "Maximum of 4 images allowed" }),
    ...baseRoomFields,
  })
  .refine(totalMatchesSum, { message: "Total must equal the sum of price, fee, and bills", path: ["total"] })

export type AddRoomFormValues = z.infer<typeof addRoomSchema>
export type AddRoomProp = { form: UseFormReturn<AddRoomFormValues> }

export const createRoomSchema = z
  .object({
    imageUrls: z.array(z.string().url()).min(1).max(4),
    ...baseRoomFields,
  })
  .refine(totalMatchesSum, { message: "Total must equal the sum of price, fee, and bills", path: ["total"] })

export type CreateRoomInput = z.infer<typeof createRoomSchema>

export type RoomSharedFields = Omit<AddRoomFormValues, "images">
export { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES }