import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import {
  baseRoomFields,
  totalMatchesSum,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
} from "./AddRoomSchema"

const editImageSchema = z.union([
  z.string().url(),
  z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, { error: "Image size must be less than 5MB" })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), { error: "Image must be jpeg, png, or webp" }),
])

export const editRoomSchema = z
  .object({
    images: z
      .array(editImageSchema)
      .min(1, { error: "You must add at least one image" })
      .max(4, { error: "Maximum of 4 images allowed" }),
    ...baseRoomFields,
  })
  .refine(totalMatchesSum, { message: "Total must equal the sum of price, fee, and bills", path: ["total"] })

export type EditRoomFormValues = z.infer<typeof editRoomSchema>
export type EditRoomProp = { form: UseFormReturn<EditRoomFormValues> }

export const updateRoomSchema = z
  .object({
    roomId: z.string().uuid(),
    imageUrls: z.array(z.string().url()).min(1).max(4),
    ...baseRoomFields,
  })
  .refine(totalMatchesSum, { message: "Total must equal the sum of price, fee, and bills", path: ["total"] })

export type UpdateRoomInput = z.infer<typeof updateRoomSchema>